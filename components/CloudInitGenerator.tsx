
import React, { useState, useRef } from 'react';
import { CloudInitConfig, MountPoint, NetworkInterface } from '../types';
import { FileCode, Plus, Trash2, Save, Copy, Globe, Network, Info, AlertCircle, Settings, Check, Upload } from 'lucide-react';

interface Props {
  config: CloudInitConfig;
  updateConfig: (config: CloudInitConfig) => void;
  onComplete: () => void;
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

export const CloudInitGenerator: React.FC<Props> = ({ config, updateConfig, onComplete }) => {
  const [activeTab, setActiveTab] = useState<'users' | 'system' | 'network' | 'storage' | 'files'>('users');
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
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const generateYaml = () => {
    let yaml = `#cloud-config\n`;
    yaml += `hostname: ${config.hostnamePattern}\n`;
    yaml += `timezone: ${config.timezone}\n`;
    yaml += `locale: ${config.locale}\n`;
    
    // Users
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

    // Network Config (V2)
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

    // Packages
    if (config.packages.length > 0) {
      yaml += `packages:\n`;
      config.packages.forEach(p => {
        yaml += `  - ${p}\n`;
      });
    }

    return yaml;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateYaml());
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
                <FileCode className="w-6 h-6 text-suse-base" /> Cloud-Init Generator
              </h2>
              <p className="text-sm text-gray-500 mt-1">Generate user-data YAML for VM initialization and post-install automation.</p>
            </div>
            <div className="flex gap-2">
               <button onClick={onComplete} className="flex items-center gap-2 px-4 py-2 bg-suse-base text-white rounded hover:bg-emerald-600 text-sm font-bold shadow-md shadow-suse-base/20 transition-all">
                  <Save className="w-4 h-4"/> Save Configuration
               </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
               <div className="flex border-b border-gray-200 mb-4 overflow-x-auto no-scrollbar">
                  {[
                    { id: 'users', label: 'Users & Access', icon: <Plus className="w-3 h-3"/> },
                    { id: 'system', label: 'System', icon: <Settings className="w-3 h-3"/> },
                    { id: 'network', label: 'Network', icon: <Network className="w-3 h-3"/> },
                    { id: 'storage', label: 'Storage', icon: <Plus className="w-3 h-3"/> },
                    { id: 'files', label: 'Files', icon: <Plus className="w-3 h-3"/> }
                  ].map((tab) => (
                    <button 
                      key={tab.id} 
                      onClick={() => setActiveTab(tab.id as any)} 
                      className={`px-4 py-2 text-xs font-bold capitalize transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === tab.id ? 'border-b-2 border-suse-base text-suse-base bg-emerald-50/30' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      {tab.label}
                    </button>
                  ))}
               </div>

               <div className="space-y-6 h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  {activeTab === 'users' && (
                    <div className="space-y-6 animate-fade-in">
                       <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                         <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Default OS User <span className="text-red-500">*</span></label>
                         <div className="relative">
                            <input 
                              value={config.user} 
                              onChange={(e) => updateConfig({...config, user: e.target.value.replace(/\s/g, '').toLowerCase()})}
                              className={`${inputClasses} ${!config.user ? 'border-red-400 bg-red-50' : ''}`}
                              placeholder="e.g. opensuse"
                            />
                         </div>
                         <p className="text-[10px] text-gray-500 mt-2">Common defaults: <code>opensuse</code>, <code>suse</code>, or <code>rancher</code>.</p>
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
                              <Plus className="w-3.5 h-3.5" /> Add SSH Key
                           </button>
                           <button 
                              onClick={() => fileInputRef.current?.click()} 
                              className="text-xs font-bold bg-suse-dark text-white border border-transparent px-4 py-1.5 rounded-md hover:bg-emerald-900 transition-colors flex items-center gap-2 shadow-sm"
                           >
                              <Upload className="w-3.5 h-3.5" /> Upload Key File
                           </button>
                           <input 
                              type="file" 
                              ref={fileInputRef} 
                              className="hidden" 
                              onChange={handleFileUpload}
                              accept=".pub,.key,.txt"
                           />
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
                         <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Hostname Pattern <span className="text-red-500">*</span></label>
                         <input 
                           value={config.hostnamePattern} 
                           onChange={(e) => updateConfig({...config, hostnamePattern: e.target.value.toLowerCase().replace(/[^a-z0-9-{}]/g, '')})}
                           className={`${inputClasses} ${!isValidHostname(config.hostnamePattern) ? 'border-red-400' : ''}`}
                         />
                         <p className="text-[10px] text-gray-400 mt-2">Use <code>{'{dsp}'}</code> as a placeholder for cluster index.</p>
                       </div>
                       
                       <div className="grid grid-cols-2 gap-4">
                          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                             <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Timezone</label>
                             <input 
                                value={config.timezone} 
                                onChange={(e) => updateConfig({...config, timezone: e.target.value})}
                                className={inputClasses}
                                placeholder="e.g. UTC"
                             />
                          </div>
                          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                             <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Locale</label>
                             <input 
                                value={config.locale} 
                                onChange={(e) => updateConfig({...config, locale: e.target.value})}
                                className={inputClasses}
                                placeholder="en_US.UTF-8"
                             />
                          </div>
                       </div>
                    </div>
                  )}

                  {activeTab === 'network' && (
                    <div className="space-y-6 animate-fade-in">
                       <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg border border-blue-100 mb-4">
                          <div className="flex items-center gap-2 text-blue-800 text-xs font-bold">
                             <Globe className="w-4 h-4" /> Multi-NIC Configuration
                          </div>
                          <button 
                            onClick={addInterface}
                            className="text-[10px] font-bold bg-white text-blue-600 px-2 py-1 rounded border border-blue-200 hover:bg-blue-100 transition-colors"
                          >
                            + Add Interface
                          </button>
                       </div>

                       <div className="space-y-4">
                          {config.networkInterfaces.map((iface, idx) => (
                             <div key={idx} className="bg-slate-50 rounded-xl border border-slate-200 p-5 relative group shadow-sm transition-all hover:shadow-md">
                                <button 
                                  onClick={() => handleRemoveItem('networkInterfaces', idx)}
                                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                   <div>
                                      <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Device Name</label>
                                      <input 
                                        value={iface.name}
                                        onChange={(e) => updateInterface(idx, { name: e.target.value.toLowerCase() })}
                                        className={`${inputClasses} font-mono`}
                                        placeholder="eth0"
                                      />
                                   </div>
                                   <div className="flex items-end pb-1.5">
                                      <label className="flex items-center gap-2 cursor-pointer select-none">
                                         <input 
                                           type="checkbox"
                                           checked={iface.dhcp}
                                           onChange={(e) => updateInterface(idx, { dhcp: e.target.checked })}
                                           className="w-4 h-4 rounded border-gray-300 text-suse-base focus:ring-suse-base"
                                         />
                                         <span className="text-sm font-bold text-slate-700">Enable DHCP</span>
                                      </label>
                                   </div>
                                </div>

                                {!iface.dhcp && (
                                   <div className="space-y-3 pt-2 border-t border-slate-200 mt-2 animate-fade-in">
                                      <div>
                                         <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Static IP / CIDR</label>
                                         <input 
                                           value={iface.ip}
                                           onChange={(e) => updateInterface(idx, { ip: e.target.value })}
                                           className={`${inputClasses} font-mono text-xs`}
                                           placeholder="192.168.1.10/24"
                                         />
                                      </div>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                         <div>
                                            <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">Gateway</label>
                                            <input 
                                              value={iface.gateway}
                                              onChange={(e) => updateInterface(idx, { gateway: e.target.value })}
                                              className={`${inputClasses} font-mono text-xs`}
                                              placeholder="192.168.1.1"
                                            />
                                         </div>
                                         <div>
                                            <label className="block text-[10px] font-bold text-slate-500 mb-1 uppercase">DNS Servers</label>
                                            <input 
                                              value={iface.nameservers}
                                              onChange={(e) => updateInterface(idx, { nameservers: e.target.value })}
                                              className={`${inputClasses} font-mono text-xs`}
                                              placeholder="8.8.8.8, 1.1.1.1"
                                            />
                                         </div>
                                      </div>
                                   </div>
                                )}
                             </div>
                          ))}
                          
                          {config.networkInterfaces.length === 0 && (
                            <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
                               <Network className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                               <p className="text-sm text-gray-400">No network interfaces configured.</p>
                               <button onClick={addInterface} className="mt-4 text-xs font-bold text-suse-base hover:underline">+ Add First Interface</button>
                            </div>
                          )}
                       </div>
                    </div>
                  )}

                  {(activeTab === 'storage' || activeTab === 'files') && (
                     <div className="flex flex-col items-center justify-center h-full text-center space-y-3 opacity-50 animate-fade-in">
                        <div className="p-4 bg-gray-100 rounded-full">
                           <AlertCircle className="w-8 h-8 text-gray-400" />
                        </div>
                        <div>
                           <h4 className="font-bold text-gray-600">Advanced Module Inactive</h4>
                           <p className="text-xs text-gray-400 max-w-[250px] mx-auto">Storage and Custom File modules are currently being optimized for v1.6 schema.</p>
                        </div>
                     </div>
                  )}
               </div>
            </div>

            {/* YAML Preview Pane */}
            <div className="bg-gray-900 rounded-xl flex flex-col h-[600px] shadow-2xl overflow-hidden border border-gray-800">
               <div className="px-4 py-3 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                     <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                     <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                     <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                     <span className="text-gray-400 text-[10px] font-bold ml-2 uppercase tracking-widest">user-data.yaml</span>
                  </div>
                  <button 
                    onClick={handleCopy}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded text-[10px] font-bold transition-all ${copied ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'}`}
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copied ? 'Copied!' : 'Copy YAML'}
                  </button>
               </div>
               <div className="flex-1 overflow-auto bg-[#0d1117] p-4 custom-scrollbar">
                  <YamlPreview code={generateYaml()} />
               </div>
               <div className="bg-gray-800 px-4 py-2 border-t border-gray-700">
                  <p className="text-[9px] text-gray-500 italic">Verify this YAML in a validator before deploying to production.</p>
               </div>
            </div>
          </div>
       </div>
    </div>
  );
};
