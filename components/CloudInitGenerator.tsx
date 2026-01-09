
import React, { useState, useRef } from 'react';
import { CloudInitConfig, MountPoint, NetworkInterface } from '../types';
import { FileCode, Plus, Trash2, Download, Copy, Terminal, FileText, User, Save, Key, Upload, HardDrive, Network, Globe, Info, Settings, AlertCircle } from 'lucide-react';

interface Props {
  config: CloudInitConfig;
  updateConfig: (config: CloudInitConfig) => void;
  onComplete: () => void;
}

const YamlPreview: React.FC<{ code: string }> = ({ code }) => {
  const TOP_LEVEL_KEYS = ['users', 'write_files', 'runcmd', 'packages', 'hostname', 'timezone', 'locale', 'disk_setup', 'fs_setup', 'mounts', 'network'];
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
  const [activeTab, setActiveTab] = useState<'users' | 'system' | 'storage' | 'network' | 'files'>('users');
  const [newSshKey, setNewSshKey] = useState('');
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

  const generateYaml = () => {
    let yaml = `#cloud-config\nhostname: ${config.hostnamePattern}\ntimezone: ${config.timezone}\nlocale: ${config.locale}\nusers:\n  - name: ${config.user}\n    sudo: ALL=(ALL) NOPASSWD:ALL\n    shell: /bin/bash\n`;
    if (config.sshKeys.length > 0) yaml += `    ssh_authorized_keys:\n${config.sshKeys.map(k => `      - ${k}`).join('\n')}\n`;
    if (config.packages.length > 0) yaml += `packages:\n${config.packages.map(p => `  - ${p}`).join('\n')}\n`;
    return yaml;
  };

  return (
    <div className="space-y-6 animate-fade-in">
       <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-suse-dark flex items-center gap-2"><FileCode className="w-6 h-6 text-suse-base" /> Cloud-Init Generator</h2>
            <div className="flex gap-2">
               <button onClick={onComplete} className="flex items-center gap-2 px-4 py-2 bg-suse-base text-white rounded hover:bg-emerald-600 text-sm font-bold shadow-md shadow-suse-base/20"><Save className="w-4 h-4"/> Save Configuration</button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
               <div className="flex border-b border-gray-200 mb-4 overflow-x-auto">
                  {['users', 'system', 'storage', 'network', 'files'].map((id) => (
                    <button key={id} onClick={() => setActiveTab(id as any)} className={`px-4 py-2 text-xs font-bold capitalize transition-all ${activeTab === id ? 'border-b-2 border-suse-base text-suse-base' : 'text-gray-400'}`}>{id}</button>
                  ))}
               </div>

               <div className="space-y-6 h-[450px] overflow-y-auto pr-2">
                  {activeTab === 'users' && (
                    <div className="space-y-4">
                       <div>
                         <label className="block text-xs font-bold text-gray-700 mb-1">OS Username <span className="text-red-500">*</span></label>
                         <input 
                           value={config.user} 
                           onChange={(e) => updateConfig({...config, user: e.target.value.replace(/\s/g, '')})}
                           className={`w-full px-3 py-2 border rounded-md text-sm outline-none ${!config.user ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                         />
                         {!config.user && <p className="text-[9px] text-red-500 font-bold mt-1">Username is required for Linux login</p>}
                       </div>
                       <div>
                         <label className="block text-xs font-bold text-gray-700 mb-1">Add SSH Key</label>
                         <textarea 
                           value={newSshKey} 
                           onChange={(e) => setNewSshKey(e.target.value)}
                           className="w-full px-3 py-2 border rounded-md font-mono text-[10px] h-20 outline-none focus:ring-1 focus:ring-suse-base"
                           placeholder="ssh-rsa AAAAB3N..."
                         />
                         <button onClick={() => { handleAddItem('sshKeys', newSshKey.trim()); setNewSshKey(''); }} className="mt-2 text-xs font-bold bg-gray-100 px-3 py-1 rounded">Add Key</button>
                       </div>
                    </div>
                  )}

                  {activeTab === 'system' && (
                    <div className="space-y-4">
                       <div>
                         <label className="block text-xs font-bold text-gray-700 mb-1">Hostname Pattern <span className="text-red-500">*</span></label>
                         <input 
                           value={config.hostnamePattern} 
                           onChange={(e) => updateConfig({...config, hostnamePattern: e.target.value.toLowerCase().replace(/[^a-z0-9-{}]/g, '')})}
                           className={`w-full px-3 py-2 border rounded-md text-sm outline-none ${!isValidHostname(config.hostnamePattern) ? 'border-red-400' : 'border-gray-200'}`}
                         />
                         <p className="text-[10px] text-gray-400 mt-1">RFC 1123 compliant names only. Use {'{dsp}'} for index.</p>
                       </div>
                    </div>
                  )}
               </div>
            </div>

            <div className="bg-gray-900 rounded-lg flex flex-col h-[520px] shadow-xl overflow-hidden">
               <div className="px-4 py-2 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
                  <span className="text-gray-300 text-[10px] font-bold">user-data.yaml PREVIEW</span>
                  <Copy className="w-3.5 h-3.5 text-gray-500 cursor-pointer hover:text-white" onClick={() => {navigator.clipboard.writeText(generateYaml()); alert('Copied!');}} />
               </div>
               <div className="flex-1 overflow-auto bg-[#0d1117] p-4">
                  <YamlPreview code={generateYaml()} />
               </div>
            </div>
          </div>
       </div>
    </div>
  );
};
