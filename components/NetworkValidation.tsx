
import React, { useEffect, useState } from 'react';
import { NetworkSpecs, HardwareSpecs, ValidationStatus, NodeNetworkConfig, Language } from '../types';
import { Network, Shield, Lock, Cloud, Database, Shuffle, Wifi, Activity, Check, X, Sliders, Server, Clock, Plus, Minus, AlertCircle } from 'lucide-react';
import { InfraDiagram } from './InfraDiagram';
import { translations } from '../i18n';

interface Props {
  lang: Language;
  specs: NetworkSpecs;
  updateSpecs: (specs: Partial<NetworkSpecs>) => void;
  onValidationChange: (status: ValidationStatus) => void;
  nodeCount: number;
  updateHwSpecs?: (specs: Partial<HardwareSpecs>) => void;
}

export const NetworkValidation: React.FC<Props> = ({ lang, specs, updateSpecs, onValidationChange, nodeCount, updateHwSpecs }) => {
  const t = translations[lang];
  const [activeTab, setActiveTab] = useState<'topology' | 'addressing' | 'nodes' | 'connectivity'>('topology');
  const [isRunningTests, setIsRunningTests] = useState(false);

  useEffect(() => {
    if (specs.nodes.length !== nodeCount) {
      const newNodes: NodeNetworkConfig[] = Array.from({ length: nodeCount }, (_, i) => {
        return specs.nodes[i] || { name: `node-${i + 1}`, ip: '', role: 'Hybrid' };
      });
      updateSpecs({ nodes: newNodes });
    }
  }, [nodeCount]);

  useEffect(() => {
    const messages: string[] = [];
    let isValid = true;
    if (!specs.clusterVip) { messages.push("VIP Required"); isValid = false; }
    onValidationChange({ isValid, messages });
  }, [specs]);

  const toggleFlag = (key: keyof NetworkSpecs) => {
    updateSpecs({ [key]: !specs[key] });
  };

  const handleNodeCountChange = (newValue: number) => {
    if (newValue >= 3 && updateHwSpecs) {
      updateHwSpecs({ nodeCount: newValue });
    }
  };

  const inputClasses = "w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-suse-base outline-none";
  const labelClasses = "block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5";

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-suse-dark flex items-center gap-2">
                <Network className="w-6 h-6 text-suse-base" /> {t.network.title}
              </h2>
              <p className="text-xs text-gray-500 mt-1">{t.network.subtitle}</p>
            </div>
            <div className="flex bg-gray-100 p-1.5 rounded-2xl w-full md:w-auto overflow-x-auto no-scrollbar">
                <button onClick={() => setActiveTab('topology')} className={`px-6 py-2.5 text-[10px] font-black uppercase rounded-xl transition-all ${activeTab === 'topology' ? 'bg-white shadow-lg' : 'text-gray-400'}`}>{t.network.tabs.topology}</button>
                <button onClick={() => setActiveTab('addressing')} className={`px-6 py-2.5 text-[10px] font-black uppercase rounded-xl transition-all ${activeTab === 'addressing' ? 'bg-white shadow-lg' : 'text-gray-400'}`}>{t.network.tabs.addressing}</button>
                <button onClick={() => setActiveTab('nodes')} className={`px-6 py-2.5 text-[10px] font-black uppercase rounded-xl transition-all ${activeTab === 'nodes' ? 'bg-white shadow-lg' : 'text-gray-400'}`}>{t.network.tabs.nodes}</button>
                <button onClick={() => setActiveTab('connectivity')} className={`px-6 py-2.5 text-[10px] font-black uppercase rounded-xl transition-all ${activeTab === 'connectivity' ? 'bg-white shadow-lg' : 'text-gray-400'}`}>{t.network.tabs.connectivity}</button>
            </div>
        </div>

        {activeTab === 'topology' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 space-y-3">
              <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-suse-base" /> {t.nav.topology}
              </h3>
              {[
                { id: 'hasFirewall', label: 'Firewall', icon: Shield, color: 'text-red-500' },
                { id: 'hasAirGap', label: 'Air-Gap', icon: Lock, color: 'text-gray-700' },
                { id: 'hasRancher', label: 'Rancher', icon: Cloud, color: 'text-blue-500' },
                { id: 'hasExternalStorage', label: 'Backup S3', icon: Database, color: 'text-purple-500' },
                { id: 'hasProxy', label: 'Proxy', icon: Shuffle, color: 'text-orange-500' },
              ].map((item) => (
                <div key={item.id} onClick={() => toggleFlag(item.id as keyof NetworkSpecs)} className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${specs[item.id as keyof NetworkSpecs] ? 'border-suse-base bg-emerald-50/20' : 'border-gray-50'}`}>
                  <div className="flex items-center gap-3">
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                    <span className="text-xs font-bold">{item.label}</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${specs[item.id as keyof NetworkSpecs] ? 'bg-suse-base text-white' : 'bg-white'}`}>
                    {specs[item.id as keyof NetworkSpecs] && <Check className="w-3 h-3" />}
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-8 bg-slate-50 rounded-3xl p-4 border border-gray-100 flex items-center justify-center min-h-[400px]">
                <InfraDiagram specs={{ nodeCount, cpuCores: 8, ramGb: 32, diskGb: 250, diskType: 'SSD', networkSpeedGb: 10, hasGpu: false }} networkSpecs={specs} projectName="Topology" />
            </div>
          </div>
        )}

        {activeTab === 'addressing' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              <div>
                  <label className={labelClasses}>{t.network.labels.vip}</label>
                  <input value={specs.clusterVip} onChange={(e) => updateSpecs({ clusterVip: e.target.value })} className={inputClasses} placeholder="192.168.1.10" />
              </div>
              <div>
                  <label className={labelClasses}>{t.network.labels.cidr}</label>
                  <input value={specs.managementCidr} onChange={(e) => updateSpecs({ managementCidr: e.target.value })} className={inputClasses} placeholder="192.168.1.0/24" />
              </div>
              <div>
                  <label className={labelClasses}>{t.network.labels.gateway}</label>
                  <input value={specs.gatewayIp} onChange={(e) => updateSpecs({ gatewayIp: e.target.value })} className={inputClasses} placeholder="192.168.1.1" />
              </div>
          </div>
        )}

        {activeTab === 'nodes' && (
           <div className="space-y-8 animate-fade-in">
              {/* Dynamic Node Count Adjuster */}
              <div className="bg-suse-dark text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-suse-base rounded-2xl text-white">
                    <Server className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{t.network.labels.nodeCapacity}</h4>
                    <p className="text-xs text-suse-light opacity-80">{t.network.labels.minNodesInfo}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 bg-white/10 p-2 rounded-2xl border border-white/10">
                  <button 
                    onClick={() => handleNodeCountChange(nodeCount - 1)}
                    disabled={nodeCount <= 3}
                    className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <div className="w-12 text-center font-black text-2xl">{nodeCount}</div>
                  <button 
                    onClick={() => handleNodeCountChange(nodeCount + 1)}
                    className="w-10 h-10 rounded-xl bg-suse-base flex items-center justify-center hover:scale-110 transition-all"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {specs.nodes.map((node, i) => (
                  <div key={i} className="bg-slate-50 p-5 rounded-2xl border border-gray-100 space-y-3 transition-all hover:border-suse-base/30">
                      <div className="flex justify-between items-center">
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Node #{i+1}</div>
                        {i === 0 && <span className="text-[9px] font-bold bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full uppercase">Seed / Master</span>}
                      </div>
                      <label className="text-[9px] font-bold text-gray-400 uppercase">{t.network.labels.staticIp}</label>
                      <input 
                          value={node.ip} 
                          onChange={(e) => {
                              const newNodes = [...specs.nodes];
                              newNodes[i].ip = e.target.value;
                              updateSpecs({ nodes: newNodes });
                          }}
                          className={inputClasses}
                          placeholder={`192.168.1.1${i+1}`}
                      />
                  </div>
                ))}
              </div>
           </div>
        )}

        {activeTab === 'connectivity' && (
           <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-lg font-bold flex items-center gap-2"><Wifi className="w-5 h-5 text-suse-base" /> {t.network.diagnostic.title}</h3>
                    <p className="text-xs text-gray-500">{t.network.diagnostic.desc}</p>
                  </div>
                  <button onClick={() => setIsRunningTests(true)} className="px-6 py-2 bg-suse-dark text-white rounded-xl font-bold text-xs">
                    {isRunningTests ? t.network.diagnostic.testing : t.network.diagnostic.run}
                  </button>
              </div>
           </div>
        )}
      </div>
    </div>
  );
};
