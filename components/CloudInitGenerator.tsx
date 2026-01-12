
import React, { useState, useRef } from 'react';
import { CloudInitConfig, MountPoint, NetworkInterface, HardwareSpecs, NetworkSpecs } from '../types';
import { FileCode, Plus, Trash2, Save, Copy, Globe, Network, Info, AlertCircle, Settings, Check, Upload, Layers, Box, Database, Image as ImageIcon } from 'lucide-react';

interface Props {
  config: CloudInitConfig;
  updateConfig: (config: CloudInitConfig) => void;
  onComplete: () => void;
  hwSpecs?: HardwareSpecs;
  netSpecs?: NetworkSpecs;
}

const YamlPreview: React.FC<{ code: string }> = ({ code }) => {
  return (
    <div className="font-mono text-[10px] leading-5 overflow-x-auto whitespace-pre font-medium text-gray-300">
      {code.split('\n').map((line, i) => {
        const lineNum = <span className="inline-block w-6 text-right pr-2 mr-3 text-gray-700 select-none border-r border-gray-800">{i + 1}</span>;
        return <div key={i}>{lineNum}{line}</div>;
      })}
    </div>
  );
};

const isValidHostname = (h: string) => /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/.test(h.replace(/{.*}/g, 'node'));

export const CloudInitGenerator: React.FC<Props> = ({ config, updateConfig, onComplete, hwSpecs, netSpecs }) => {
  const [activeMainTab, setActiveMainTab] = useState<'cloud-init' | 'harvester-crd'>('cloud-init');
  const [activeTab, setActiveTab] = useState<'users' | 'system' | 'network' | 'storage' | 'files'>('users');
  const [activeCrdType, setActiveCrdType] = useState<'vm' | 'network' | 'image'>('vm');
  const [newSshKey, setNewSshKey] = useState('');
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddItem = (field: keyof CloudInitConfig, value: any) => {
    if (!value) return;
    updateConfig({ ...config, [field]: [...(config[field] as any[]), value] });
  };

  const handleRemoveItem = (field: keyof CloudInitConfig, index: number) => {
    const newArray = [...(config[field] as any[])];
    newArray.splice(index, 1);
    updateConfig({ ...config, [field]: newArray });
  };

  const updateInterface = (index: number, updates: Partial<NetworkInterface>) => {
    const newInterfaces = [...config.networkInterfaces];
    newInterfaces[index] = { ...newInterfaces[index], ...updates };
    updateConfig({ ...config, networkInterfaces: newInterfaces });
  };

  const addInterface = () => {
    const nextIdx = config.networkInterfaces.length;
    handleAddItem('networkInterfaces', {
      name: `eth${nextIdx}`,
      dhcp: true,
      ip: '',
      gateway: '',
      nameservers: ''
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (content) {
        handleAddItem('sshKeys', content.trim());
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const generateCloudInitYaml = () => {
    let yaml = `#cloud-config\n`;
    yaml += `hostname: ${config.hostnamePattern}\n`;
    yaml += `timezone: ${config.timezone}\n`;
    yaml += `locale: ${config.locale}\n`;
    
    yaml += `users:\n`;
    yaml += `  - name: ${config.user}\n`;
    yaml += `    sudo: ALL=(ALL) NOPASSWD:ALL\n`;
    yaml += `    shell: /bin/bash\n`;
    if (config.sshKeys.length > 0) {
      yaml += `    ssh_authorized_keys:\n`;
      config.sshKeys.forEach(k => {
        yaml += `      - ${k}\n`;
      });
    }

    if (config.networkInterfaces.length > 0) {
      yaml += `network:\n`;
      yaml += `  version: 2\n`;
      yaml += `  ethernets:\n`;
      config.networkInterfaces.forEach(iface => {
        yaml += `    ${iface.name}:\n`;
        if (iface.dhcp) {
          yaml += `      dhcp4: true\n`;
        } else {
          yaml += `      dhcp4: false\n`;
          if (iface.ip) {
            yaml += `      addresses:\n`;
            yaml += `        - ${iface.ip}\n`;
          }
          if (iface.gateway) {
            yaml += `      gateway4: ${iface.gateway}\n`;
          }
          if (iface.nameservers) {
            const nsList = iface.nameservers.split(',').map(s => s.trim());
            yaml += `      nameservers:\n`;
            yaml += `        addresses: [${nsList.join(', ')}]\n`;
          }
        }
      });
    }

    if (config.packages.length > 0) {
      yaml += `packages:\n`;
      config.packages.forEach(p => {
        yaml += `  - ${p}\n`;
      });
    }

    return yaml;
  };

  const generateCrdYaml = () => {
    if (activeCrdType === 'vm') {
      return `apiVersion: kubevirt.io/v1
kind: VirtualMachine
metadata:
  name: poc-workload-01
  namespace: default
spec:
  running: true
  template:
    spec:
      domain:
        cpu:
          cores: ${hwSpecs?.cpuCores || 2}
        resources:
          requests:
            memory: ${hwSpecs?.ramGb || 4}Gi
        devices:
          disks:
            - disk:
                bus: virtio
              name: containerdisk
            - disk:
                bus: virtio
              name: cloudinitdisk
          interfaces:
            - bridge: {}
              name: default
      networks:
        - multus:
            networkName: ${netSpecs?.vlanId ? 'vlan-' + netSpecs.vlanId : 'default'}
          name: default
      volumes:
        - containerDisk:
            image: registry.suse.com/suse/sles15sp5-cloud:latest
          name: containerdisk
        - cloudInitNoCloud:
            userData: |
${generateCloudInitYaml().split('\n').map(l => '              ' + l).join('\n')}
          name: cloudinitdisk`;
    }

    if (activeCrdType === 'network') {
      return `apiVersion: harvesterhci.io/v1beta1
kind: Network
metadata:
  name: vlan-${netSpecs?.vlanId || '100'}
  namespace: harvester-public
spec:
  config: |
    {
      "cniVersion": "0.3.1",
      "name": "vlan-${netSpecs?.vlanId || '100'}",
      "type": "bridge",
      "bridge": "harvester-br0",
      "promiscMode": true,
      "vlan": ${netSpecs?.vlanId || 100}
    }`;
    }

    if (activeCrdType === 'image') {
      return `apiVersion: harvesterhci.io/v1beta1
kind: VirtualMachineImage
metadata:
  name: opensuse-leap-15-5
  namespace: harvester-public
spec:
  displayName: "openSUSE Leap 15.5 Cloud"
  sourceType: download
  url: "https://download.opensuse.org/repositories/Cloud:/Images:/Leap_15.5/images/openSUSE-Leap-15.5-NoCloud.x86_64.qcow2"`;
    }

    return "";
  };

  const handleCopy = () => {
    const text = activeMainTab === 'cloud-init' ? generateCloudInitYaml() : generateCrdYaml();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputClasses = "w-full px-3 py-2 border border-gray-200 rounded-md text-sm outline-none focus:ring-2 focus:ring-suse-base/20 focus:border-suse-base transition-all";

  return (
    <div className="space-y-6 animate-fade-in">
       <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-suse-dark flex items-center gap-2">
                <FileCode className="w-6 h-6 text-suse-base" /> Cloud Init & CRD Generator
              </h2>
              <p className="text-sm text-gray-500 mt-1">Gerador unificado para automação de SO e manifestos Kubernetes do Harvester.</p>
            </div>
            <div className="flex gap-2">
               <button onClick={onComplete} className="flex items-center gap-2 px-4 py-2 bg-suse-base text-white rounded hover:bg-emerald-600 text-sm font-bold shadow-md shadow-suse-base/20 transition-all">
                  <Save className="w-4 h-4"/> Concluir Configuração
               </button>
            </div>
          </div>

          {/* Main Module Tabs */}
          <div className="flex gap-4 mb-8">
              <button 
                onClick={() => setActiveMainTab('cloud-init')}
                className={`flex-1 py-4 px-6 rounded-2xl border-2 transition-all flex items-center justify-center gap-3 font-bold ${activeMainTab === 'cloud-init' ? 'bg-suse-dark text-white border-suse-dark shadow-xl' : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200'}`}
              >
                  <FileCode className="w-5 h-5" /> Cloud-Init YAML
              </button>
              <button 
                onClick={() => setActiveMainTab('harvester-crd')}
                className={`flex-1 py-4 px-6 rounded-2xl border-2 transition-all flex items-center justify-center gap-3 font-bold ${activeMainTab === 'harvester-crd' ? 'bg-suse-dark text-white border-suse-dark shadow-xl' : 'bg-white text-gray-400 border-gray-100 hover:border-gray-200'}`}
              >
                  <Layers className="w-5 h-5" /> Harvester CRD Manifests
              </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
               {activeMainTab === 'cloud-init' ? (
                 <>
                   <div className="flex border-b border-gray-200 mb-4 overflow-x-auto no-scrollbar">
                      {[
                        { id: 'users', label: 'Users & Access' },
                        { id: 'system', label: 'System' },
                        { id: 'network', label: 'Network' },
                        { id: 'storage', label: 'Storage' },
                        { id: 'files', label: 'Files' }
                      ].map((tab) => (
                        <button 
                          key={tab.id} 
                          onClick={() => setActiveTab(tab.id as any)} 
                          className={`px-4 py-2 text-xs font-bold capitalize transition-all whitespace-nowrap ${activeTab === tab.id ? 'border-b-2 border-suse-base text-suse-base bg-emerald-50/30' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                          {tab.label}
                        </button>
                      ))}
                   </div>

                   <div className="space-y-6 h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                      {activeTab === 'users' && (
                        <div className="space-y-6 animate-fade-in">
                           <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                             <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Default OS User</label>
                             <input 
                               value={config.user} 
                               onChange={(e) => updateConfig({...config, user: e.target.value.replace(/\s/g, '').toLowerCase()})}
                               className={inputClasses}
                               placeholder="e.g. opensuse"
                             />
                           </div>

                           <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                             <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Authorized SSH Keys</label>
                             <textarea 
                               value={newSshKey} 
                               onChange={(e) => setNewSshKey(e.target.value)}
                               className={`${inputClasses} font-mono text-[10px] h-24 mb-2 resize-none`}
                               placeholder="Paste public key (ssh-rsa ...)"
                             />
                             <div className="flex gap-2">
                               <button 
                                  onClick={() => { handleAddItem('sshKeys', newSshKey.trim()); setNewSshKey(''); }} 
                                  className="text-xs font-bold bg-white border border-gray-300 px-4 py-1.5 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm"
                               >
                                  <Plus className="w-3.5 h-3.5" /> Adicionar Key
                               </button>
                               <button 
                                  onClick={() => fileInputRef.current?.click()} 
                                  className="text-xs font-bold bg-suse-dark text-white border border-transparent px-4 py-1.5 rounded-md hover:bg-emerald-900 transition-colors flex items-center gap-2 shadow-sm"
                               >
                                  <Upload className="w-3.5 h-3.5" /> Upload Key
                               </button>
                               <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} accept=".pub,.key,.txt" />
                             </div>
                             
                             <div className="mt-4 space-y-2">
                                {config.sshKeys.map((key, idx) => (
                                   <div key={idx} className="flex items-center justify-between bg-white p-2 rounded border border-gray-100 text-[10px] font-mono group">
                                      <span className="truncate flex-1 pr-4">{key.substring(0, 40)}...</span>
                                      <button onClick={() => handleRemoveItem('sshKeys', idx)} className="text-gray-400 hover:text-red-500"><Trash2 className="w-3.5 h-3.5"/></button>
                                   </div>
                                ))}
                             </div>
                           </div>
                        </div>
                      )}
                      
                      {activeTab === 'system' && (
                        <div className="space-y-6 animate-fade-in">
                           <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                             <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Hostname Pattern</label>
                             <input 
                               value={config.hostnamePattern} 
                               onChange={(e) => updateConfig({...config, hostnamePattern: e.target.value.toLowerCase().replace(/[^a-z0-9-{}]/g, '')})}
                               className={inputClasses}
                             />
                             <p className="text-[10px] text-gray-400 mt-2">Use <code>{'{dsp}'}</code> para índice do cluster.</p>
                           </div>
                        </div>
                      )}

                      {activeTab === 'network' && (
                        <div className="space-y-6 animate-fade-in">
                           <button onClick={addInterface} className="w-full py-3 bg-blue-50 text-blue-600 rounded-xl border border-blue-200 text-xs font-bold flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors">
                              <Plus className="w-4 h-4" /> Adicionar Interface de Rede
                           </button>
                           {config.networkInterfaces.map((iface, idx) => (
                             <div key={idx} className="bg-slate-50 rounded-xl border border-slate-200 p-4 relative group">
                                <button onClick={() => handleRemoveItem('networkInterfaces', idx)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                                <div className="grid grid-cols-2 gap-4">
                                   <div>
                                      <label className="block text-[9px] font-bold text-slate-500 mb-1 uppercase">Device</label>
                                      <input value={iface.name} onChange={(e) => updateInterface(idx, { name: e.target.value })} className={inputClasses} />
                                   </div>
                                   <div className="flex items-end pb-2">
                                      <label className="flex items-center gap-2 cursor-pointer text-xs font-bold">
                                         <input type="checkbox" checked={iface.dhcp} onChange={(e) => updateInterface(idx, { dhcp: e.target.checked })} /> DHCP
                                      </label>
                                   </div>
                                </div>
                             </div>
                           ))}
                        </div>
                      )}
                      
                      {(activeTab === 'storage' || activeTab === 'files') && (
                        <div className="py-20 text-center opacity-30">
                           <Settings className="w-12 h-12 mx-auto mb-2" />
                           <p className="text-xs">Módulos avançados em otimização.</p>
                        </div>
                      )}
                   </div>
                 </>
               ) : (
                 <div className="space-y-6 animate-fade-in">
                    <div className="bg-slate-900 rounded-3xl p-8 text-white space-y-6 shadow-2xl">
                        <h3 className="text-lg font-bold flex items-center gap-3"><Box className="w-6 h-6 text-suse-base" /> Resource Manifests</h3>
                        <p className="text-xs text-slate-400 leading-relaxed">Selecione o tipo de recurso Harvester para gerar o manifesto YAML compatível com GitOps e <code>kubectl apply</code>.</p>
                        
                        <div className="grid grid-cols-1 gap-3">
                            <button 
                                onClick={() => setActiveCrdType('vm')}
                                className={`flex items-center gap-4 p-4 rounded-2xl border transition-all text-left ${activeCrdType === 'vm' ? 'bg-suse-base border-suse-base text-white shadow-lg' : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'}`}
                            >
                                <Box className="w-6 h-6" />
                                <div>
                                    <div className="text-sm font-bold">Virtual Machine</div>
                                    <div className="text-[10px] opacity-60">Manifesto KubeVirt / Harvester VM</div>
                                </div>
                            </button>
                            <button 
                                onClick={() => setActiveCrdType('network')}
                                className={`flex items-center gap-4 p-4 rounded-2xl border transition-all text-left ${activeCrdType === 'network' ? 'bg-suse-base border-suse-base text-white shadow-lg' : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'}`}
                            >
                                <Network className="w-6 h-6" />
                                <div>
                                    <div className="text-sm font-bold">L2 VLAN Network</div>
                                    <div className="text-[10px] opacity-60">Configuração de Network Multus</div>
                                </div>
                            </button>
                            <button 
                                onClick={() => setActiveCrdType('image')}
                                className={`flex items-center gap-4 p-4 rounded-2xl border transition-all text-left ${activeCrdType === 'image' ? 'bg-suse-base border-suse-base text-white shadow-lg' : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'}`}
                            >
                                <ImageIcon className="w-6 h-6" />
                                <div>
                                    <div className="text-sm font-bold">VM Image</div>
                                    <div className="text-[10px] opacity-60">Registro de Imagem Cloud</div>
                                </div>
                            </button>
                        </div>

                        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-start gap-3">
                            <Info className="w-5 h-5 text-suse-base shrink-0 mt-0.5" />
                            <p className="text-[10px] text-gray-400 leading-relaxed">Estes manifestos utilizam os dados de CPU ({hwSpecs?.cpuCores} cores), RAM ({hwSpecs?.ramGb}GB) e VLAN ({netSpecs?.vlanId || 'N/A'}) já configurados.</p>
                        </div>
                    </div>
                 </div>
               )}
            </div>

            {/* YAML Preview Pane */}
            <div className="bg-gray-900 rounded-xl flex flex-col h-[600px] shadow-2xl overflow-hidden border border-gray-800">
               <div className="px-4 py-3 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                     <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                     <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                     <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                     <span className="text-gray-400 text-[10px] font-bold ml-2 uppercase tracking-widest">
                        {activeMainTab === 'cloud-init' ? 'user-data.yaml' : `${activeCrdType}.yaml`}
                     </span>
                  </div>
                  <button 
                    onClick={handleCopy}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded text-[10px] font-bold transition-all ${copied ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'}`}
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copied ? 'Copiado!' : 'Copiar YAML'}
                  </button>
               </div>
               <div className="flex-1 overflow-auto bg-[#0d1117] p-4 custom-scrollbar">
                  <YamlPreview code={activeMainTab === 'cloud-init' ? generateCloudInitYaml() : generateCrdYaml()} />
               </div>
               <div className="bg-gray-800 px-4 py-2 border-t border-gray-700">
                  <p className="text-[9px] text-gray-500 italic">Manifestos prontos para importação via Dashboard ou CLI.</p>
               </div>
            </div>
          </div>
       </div>
    </div>
  );
};
