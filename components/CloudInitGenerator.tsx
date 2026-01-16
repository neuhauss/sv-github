
import React, { useState, useRef } from 'react';
import { CloudInitConfig, MountPoint, NetworkInterface, HardwareSpecs, NetworkSpecs } from '../types';
import { FileCode, Plus, Trash2, Save, Copy, Network, Info, Settings, Check, Upload, Layers, Box, Database, Image as ImageIcon, HelpCircle, HardDrive, Package, Terminal } from 'lucide-react';

interface Props {
  lang?: string;
  config: CloudInitConfig;
  updateConfig: (config: CloudInitConfig) => void;
  onComplete: () => void;
  hwSpecs?: HardwareSpecs;
  netSpecs?: NetworkSpecs;
}

const YamlPreview: React.FC<{ code: string }> = ({ code }) => {
  const highlightLine = (line: string) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('#')) {
      return <span className="text-slate-500 italic">{line}</span>;
    }

    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const keyPart = line.substring(0, colonIndex + 1);
      const valuePart = line.substring(colonIndex + 1);

      const isPrimaryDirective = /^(apiVersion|kind|metadata|spec|status|hostname|users|network|packages|timezone|locale|mounts|runcmd|bootcmd):/.test(trimmed);
      const keyColor = isPrimaryDirective ? 'text-amber-400' : 'text-sky-400';

      const isBool = /^\s*(true|false)\s*$/.test(valuePart);
      const valueColor = isBool ? 'text-purple-400 font-bold' : 'text-emerald-400';

      return (
        <>
          <span className={`${keyColor} font-bold`}>{keyPart}</span>
          <span className={valueColor}>{valuePart}</span>
        </>
      );
    }

    if (trimmed.startsWith('-')) {
      return <span className="text-emerald-300 font-medium">{line}</span>;
    }

    return <span className="text-slate-300">{line}</span>;
  };

  return (
    <div className="font-mono text-[11px] leading-6 overflow-x-auto whitespace-pre font-medium text-slate-300">
      {code.split('\n').map((line, i) => {
        const lineNum = (
          <span className="inline-block w-8 text-right pr-3 mr-4 text-slate-600 select-none border-r border-slate-800">
            {i + 1}
          </span>
        );
        return (
          <div key={i} className="hover:bg-white/5 transition-colors group px-1">
            {lineNum}
            {highlightLine(line)}
          </div>
        );
      })}
    </div>
  );
};

const Tooltip: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="group relative inline-block ml-1.5 align-middle">
    <HelpCircle className="w-3.5 h-3.5 text-slate-300 hover:text-suse-base cursor-help transition-colors" />
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-900 text-white text-[10px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none shadow-2xl leading-relaxed">
      <div className="font-bold text-suse-base uppercase tracking-widest mb-1">{title}</div>
      {children}
      <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
    </div>
  </div>
);

export const CloudInitGenerator: React.FC<Props> = ({ config, updateConfig, onComplete, hwSpecs, netSpecs }) => {
  const [activeMainTab, setActiveMainTab] = useState<'cloud-init' | 'harvester-crd'>('cloud-init');
  const [activeTab, setActiveTab] = useState<'users' | 'system' | 'network' | 'storage' | 'packages' | 'commands'>('users');
  const [activeCrdType, setActiveCrdType] = useState<'vm' | 'network' | 'image'>('vm');
  const [newSshKey, setNewSshKey] = useState('');
  const [newPackage, setNewPackage] = useState('');
  const [newBootCmd, setNewBootCmd] = useState('');
  const [newRunCmd, setNewRunCmd] = useState('');
  const [newMount, setNewMount] = useState<MountPoint>({ device: '', mountPath: '', fsType: 'ext4' });
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

    if (config.bootCmds && config.bootCmds.length > 0) {
      yaml += `bootcmd:\n`;
      config.bootCmds.forEach(cmd => {
        yaml += `  - ${cmd}\n`;
      });
    }

    if (config.mounts.length > 0) {
      yaml += `mounts:\n`;
      config.mounts.forEach(m => {
        yaml += `  - [ "${m.device}", "${m.mountPath}", "${m.fsType}", "defaults", "0", "2" ]\n`;
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
            const nsList = iface.nameservers.split(',').map(s => s.trim()).filter(s => s !== '');
            if (nsList.length > 0) {
              yaml += `      nameservers:\n`;
              yaml += `        addresses: [${nsList.join(', ')}]\n`;
            }
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

    if (config.runCmds && config.runCmds.length > 0) {
      yaml += `runcmd:\n`;
      config.runCmds.forEach(cmd => {
        yaml += `  - ${cmd}\n`;
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
                        { id: 'packages', label: 'Packages' },
                        { id: 'commands', label: 'Run Commands' }
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
                             <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                               Default OS User
                               <Tooltip title="Usuário do Sistema">
                                 Define o nome do usuário principal que será criado no sistema operacional. Este usuário terá permissões sudo sem senha.
                               </Tooltip>
                             </label>
                             <input 
                               value={config.user} 
                               onChange={(e) => updateConfig({...config, user: e.target.value.replace(/\s/g, '').toLowerCase()})}
                               className={inputClasses}
                               placeholder="e.g. opensuse"
                             />
                           </div>

                           <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                             <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                               Authorized SSH Keys
                               <Tooltip title="Chaves SSH Públicas">
                                 Chaves RSA/Ed25519 para acesso remoto sem senha. Essencial para automação e segurança no gerenciamento de nós.
                               </Tooltip>
                             </label>
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
                               <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (ev) => handleAddItem('sshKeys', ev.target?.result as string);
                                    reader.readAsText(file);
                                  }
                               }} />
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
                             <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                               Hostname Pattern
                               <Tooltip title="Padrão de Nome de Host">
                                 Define como a VM será nomeada no nível do SO. O token <code>{'{dsp}'}</code> é substituído pelo índice ou identificador único do nó durante o provisionamento.
                               </Tooltip>
                             </label>
                             <input 
                               value={config.hostnamePattern} 
                               onChange={(e) => updateConfig({...config, hostnamePattern: e.target.value.toLowerCase().replace(/[^a-z0-9-{}]/g, '')})}
                               className={inputClasses}
                             />
                           </div>
                           <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                             <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Timezone</label>
                             <input 
                               value={config.timezone} 
                               onChange={(e) => updateConfig({...config, timezone: e.target.value})}
                               className={inputClasses}
                               placeholder="e.g. UTC"
                             />
                           </div>
                        </div>
                      )}

                      {activeTab === 'network' && (
                        <div className="space-y-6 animate-fade-in">
                           <div className="flex items-center justify-between mb-2">
                              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                                Interfaces de Rede
                              </h4>
                              <button onClick={addInterface} className="py-1.5 px-4 bg-blue-50 text-blue-600 rounded-lg border border-blue-200 text-[10px] font-bold flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors">
                                <Plus className="w-3.5 h-3.5" /> Nova Interface
                              </button>
                           </div>
                           
                           {config.networkInterfaces.length === 0 ? (
                             <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-xl">
                               <p className="text-xs text-slate-400">Nenhuma interface configurada.</p>
                             </div>
                           ) : config.networkInterfaces.map((iface, idx) => (
                             <div key={idx} className="bg-slate-50 rounded-xl border border-slate-200 p-5 relative group space-y-4">
                                <button 
                                  onClick={() => handleRemoveItem('networkInterfaces', idx)} 
                                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                                
                                <div className="grid grid-cols-2 gap-4">
                                   <div>
                                      <label className="block text-[9px] font-bold text-slate-500 mb-1 uppercase">Interface Device</label>
                                      <input value={iface.name} onChange={(e) => updateInterface(idx, { name: e.target.value })} className={inputClasses} placeholder="eth0" />
                                   </div>
                                   <div className="flex items-end pb-2">
                                      <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                                         <input 
                                            type="checkbox" 
                                            checked={iface.dhcp} 
                                            onChange={(e) => updateInterface(idx, { dhcp: e.target.checked })}
                                            className="rounded border-gray-300 text-suse-base focus:ring-suse-base"
                                          /> 
                                          Enable DHCP v4
                                      </label>
                                   </div>
                                </div>

                                {!iface.dhcp && (
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-200 mt-2 animate-fade-in">
                                     <div className="col-span-1">
                                        <label className="block text-[9px] font-bold text-slate-500 mb-1 uppercase">IPv4 Address / CIDR</label>
                                        <input 
                                          value={iface.ip} 
                                          onChange={(e) => updateInterface(idx, { ip: e.target.value })} 
                                          className={inputClasses} 
                                          placeholder="192.168.1.10/24" 
                                        />
                                     </div>
                                     <div className="col-span-1">
                                        <label className="block text-[9px] font-bold text-slate-500 mb-1 uppercase">Gateway</label>
                                        <input 
                                          value={iface.gateway} 
                                          onChange={(e) => updateInterface(idx, { gateway: e.target.value })} 
                                          className={inputClasses} 
                                          placeholder="192.168.1.1" 
                                        />
                                     </div>
                                  </div>
                                )}
                             </div>
                           ))}
                        </div>
                      )}
                      
                      {activeTab === 'storage' && (
                        <div className="space-y-6 animate-fade-in">
                           <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
                              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                                <HardDrive className="w-4 h-4 text-suse-base" /> Adicionar Ponto de Montagem
                              </h4>
                              <div className="grid grid-cols-3 gap-3">
                                 <div>
                                    <label className="block text-[9px] font-bold text-slate-500 mb-1 uppercase">Device</label>
                                    <input value={newMount.device} onChange={(e) => setNewMount({...newMount, device: e.target.value})} className={inputClasses} placeholder="/dev/vdb1" />
                                 </div>
                                 <div>
                                    <label className="block text-[9px] font-bold text-slate-500 mb-1 uppercase">Mount Path</label>
                                    <input value={newMount.mountPath} onChange={(e) => setNewMount({...newMount, mountPath: e.target.value})} className={inputClasses} placeholder="/data" />
                                 </div>
                                 <div>
                                    <label className="block text-[9px] font-bold text-slate-500 mb-1 uppercase">FS Type</label>
                                    <select value={newMount.fsType} onChange={(e) => setNewMount({...newMount, fsType: e.target.value})} className={inputClasses}>
                                       <option value="ext4">ext4</option>
                                       <option value="xfs">xfs</option>
                                       <option value="btrfs">btrfs</option>
                                    </select>
                                 </div>
                              </div>
                              <button 
                                onClick={() => { handleAddItem('mounts', newMount); setNewMount({ device: '', mountPath: '', fsType: 'ext4' }); }} 
                                className="w-full py-2 bg-suse-dark text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-colors"
                              >
                                Adicionar Mount
                              </button>
                           </div>

                           <div className="space-y-2">
                              {config.mounts.map((m, idx) => (
                                <div key={idx} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                                   <div className="flex gap-4">
                                      <div className="text-[10px]"><span className="font-bold text-gray-400 mr-2">DEVICE:</span> {m.device}</div>
                                      <div className="text-[10px]"><span className="font-bold text-gray-400 mr-2">PATH:</span> {m.mountPath}</div>
                                      <div className="text-[10px]"><span className="font-bold text-gray-400 mr-2">TYPE:</span> {m.fsType}</div>
                                   </div>
                                   <button onClick={() => handleRemoveItem('mounts', idx)} className="text-gray-400 hover:text-red-500 transition-colors">
                                      <Trash2 className="w-3.5 h-3.5" />
                                   </button>
                                </div>
                              ))}
                           </div>
                        </div>
                      )}

                      {activeTab === 'packages' && (
                        <div className="space-y-6 animate-fade-in">
                           <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
                              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                                <Package className="w-4 h-4 text-suse-base" /> Adicionar Pacotes OS
                              </h4>
                              <div className="flex gap-2">
                                 <input 
                                   value={newPackage} 
                                   onChange={(e) => setNewPackage(e.target.value)} 
                                   onKeyDown={(e) => e.key === 'Enter' && (handleAddItem('packages', newPackage), setNewPackage(''))}
                                   className={inputClasses} 
                                   placeholder="e.g. nginx, docker, git" 
                                 />
                                 <button 
                                   onClick={() => { handleAddItem('packages', newPackage); setNewPackage(''); }} 
                                   className="px-4 bg-suse-dark text-white rounded-lg text-xs font-bold"
                                 >
                                   Adicionar
                                 </button>
                              </div>
                              <p className="text-[9px] text-gray-400">Estes pacotes serão instalados automaticamente via <code>zypper</code> ou <code>apt</code> durante o primeiro boot.</p>
                           </div>

                           <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              {config.packages.map((pkg, idx) => (
                                <div key={idx} className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-gray-100 shadow-sm group">
                                   <span className="text-[10px] font-bold text-slate-700">{pkg}</span>
                                   <button onClick={() => handleRemoveItem('packages', idx)} className="text-gray-300 group-hover:text-red-500 transition-colors">
                                      <Trash2 className="w-3 h-3" />
                                   </button>
                                </div>
                              ))}
                           </div>
                        </div>
                      )}

                      {activeTab === 'commands' && (
                        <div className="space-y-6 animate-fade-in">
                           <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-6">
                              <div>
                                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2 mb-2">
                                  <Terminal className="w-4 h-4 text-amber-500" /> Early Commands (Pre-Network)
                                  <Tooltip title="bootcmd">Executados muito cedo no processo de boot, antes da configuração de rede ser aplicada.</Tooltip>
                                </h4>
                                <div className="flex gap-2">
                                   <input 
                                     value={newBootCmd} 
                                     onChange={(e) => setNewBootCmd(e.target.value)} 
                                     onKeyDown={(e) => e.key === 'Enter' && (handleAddItem('bootCmds', newBootCmd), setNewBootCmd(''))}
                                     className={inputClasses} 
                                     placeholder="e.g. modprobe br_netfilter" 
                                   />
                                   <button 
                                     onClick={() => { handleAddItem('bootCmds', newBootCmd); setNewBootCmd(''); }} 
                                     className="px-4 bg-slate-700 text-white rounded-lg text-xs font-bold"
                                   >
                                     Add
                                   </button>
                                </div>
                                <div className="mt-3 space-y-1">
                                   {config.bootCmds?.map((cmd, idx) => (
                                     <div key={idx} className="flex items-center justify-between bg-white px-3 py-1.5 rounded-lg border border-gray-100 text-[10px] font-mono group">
                                        <span>{cmd}</span>
                                        <button onClick={() => handleRemoveItem('bootCmds', idx)} className="text-gray-300 group-hover:text-red-500"><Trash2 className="w-3 h-3" /></button>
                                     </div>
                                   ))}
                                </div>
                              </div>

                              <div className="pt-4 border-t border-slate-200">
                                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2 mb-2">
                                  <Terminal className="w-4 h-4 text-emerald-500" /> Late Commands (Post-Network)
                                  <Tooltip title="runcmd">Executados após a rede estar configurada. Ideal para finalização de setup e deploy de aplicações.</Tooltip>
                                </h4>
                                <div className="flex gap-2">
                                   <input 
                                     value={newRunCmd} 
                                     onChange={(e) => setNewRunCmd(e.target.value)} 
                                     onKeyDown={(e) => e.key === 'Enter' && (handleAddItem('runCmds', newRunCmd), setNewRunCmd(''))}
                                     className={inputClasses} 
                                     placeholder="e.g. systemctl restart nginx" 
                                   />
                                   <button 
                                     onClick={() => { handleAddItem('runCmds', newRunCmd); setNewRunCmd(''); }} 
                                     className="px-4 bg-suse-dark text-white rounded-lg text-xs font-bold"
                                   >
                                     Add
                                   </button>
                                </div>
                                <div className="mt-3 space-y-1">
                                   {config.runCmds?.map((cmd, idx) => (
                                     <div key={idx} className="flex items-center justify-between bg-white px-3 py-1.5 rounded-lg border border-gray-100 text-[10px] font-mono group">
                                        <span>{cmd}</span>
                                        <button onClick={() => handleRemoveItem('runCmds', idx)} className="text-gray-300 group-hover:text-red-500"><Trash2 className="w-3 h-3" /></button>
                                     </div>
                                   ))}
                                </div>
                              </div>
                           </div>
                        </div>
                      )}
                   </div>
                 </>
               ) : (
                 <div className="space-y-6 animate-fade-in">
                    <div className="bg-slate-900 rounded-3xl p-8 text-white space-y-6 shadow-2xl">
                        <h3 className="text-lg font-bold flex items-center gap-3">
                          <Box className="w-6 h-6 text-suse-base" /> Resource Manifests
                        </h3>
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
                    </div>
                 </div>
               )}
            </div>

            <div className="bg-slate-900 rounded-xl flex flex-col h-[600px] shadow-2xl overflow-hidden border border-slate-800">
               <div className="px-4 py-3 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                     <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                     <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                     <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                     <span className="text-slate-400 text-[10px] font-bold ml-2 uppercase tracking-widest">
                        {activeMainTab === 'cloud-init' ? 'user-data.yaml' : `${activeCrdType}.yaml`}
                     </span>
                  </div>
                  <button 
                    onClick={handleCopy}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded text-[10px] font-bold transition-all ${copied ? 'bg-green-50 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'}`}
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copied ? 'Copiado!' : 'Copiar YAML'}
                  </button>
               </div>
               <div className="flex-1 overflow-auto bg-[#0d1117] p-4 custom-scrollbar">
                  <YamlPreview code={activeMainTab === 'cloud-init' ? generateCloudInitYaml() : generateCrdYaml()} />
               </div>
               <div className="bg-slate-800 px-4 py-2 border-t border-slate-700">
                  <p className="text-[9px] text-slate-500 italic">Manifestos prontos para importação via Dashboard ou CLI.</p>
               </div>
            </div>
          </div>
       </div>
    </div>
  );
};
