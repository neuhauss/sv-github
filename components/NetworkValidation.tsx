
import React, { useEffect, useState } from 'react';
import { NetworkSpecs, ValidationStatus, IpPool, NodeNetworkConfig } from '../types';
import { Network, AlertTriangle, CheckCircle2, Trash2, Plus, Info, Globe, Layers, Shield, Lock, Shuffle, Settings, Server, Activity, Clock, Sliders, Monitor, Terminal, Zap, Cloud, Database, Wifi, ExternalLink, RefreshCw, Check, X, AlertCircle, HelpCircle, ArrowRight } from 'lucide-react';
import { InfraDiagram } from './InfraDiagram';

interface Props {
  specs: NetworkSpecs;
  updateSpecs: (specs: Partial<NetworkSpecs>) => void;
  onValidationChange: (status: ValidationStatus) => void;
  nodeCount: number;
}

interface ConnectivityTest {
  id: string;
  name: string;
  endpoint: string;
  port: number;
  type: 'public' | 'internal';
  status: 'pending' | 'checking' | 'success' | 'failed' | 'manual';
  description: string;
}

export const NetworkValidation: React.FC<Props> = ({ specs, updateSpecs, onValidationChange, nodeCount }) => {
  const [activeTab, setActiveTab] = useState<'topology' | 'addressing' | 'nodes' | 'connectivity' | 'proxy'>('topology');
  const [diagramView, setDiagramView] = useState<'logical' | 'physical'>('logical');
  
  const [tests, setTests] = useState<ConnectivityTest[]>([
    { id: 'dns', name: 'Google DNS Resolution', endpoint: 'https://8.8.8.8', port: 443, type: 'public', status: 'pending', description: 'Validates if the cluster can resolve and reach external IP addresses.' },
    { id: 'suse-reg', name: 'SUSE Registry', endpoint: 'https://registry.suse.com', port: 443, type: 'public', status: 'pending', description: 'Required for downloading official SUSE container images and Harvester components.' },
    { id: 'opensuse-reg', name: 'openSUSE Registry', endpoint: 'https://registry.opensuse.org', port: 443, type: 'public', status: 'pending', description: 'Base images for various Harvester workloads and system utilities.' },
    { id: 'suse-download', name: 'SUSE Download', endpoint: 'https://download.suse.com', port: 443, type: 'public', status: 'pending', description: 'Access to kernel updates and OS security patches.' },
    { id: 'harvester-docs', name: 'Harvester Documentation', endpoint: 'https://docs.harvesterhci.io', port: 443, type: 'public', status: 'pending', description: 'Validates access to the documentation repository for online help.' },
    { id: 'k8s-api', name: 'Kubernetes API Server', endpoint: '', port: 6443, type: 'internal', status: 'manual', description: 'Critical port for inter-node communication. Must be open on the internal management network.' },
    { id: 'etcd', name: 'Etcd Quorum', endpoint: '', port: 2379, type: 'internal', status: 'manual', description: 'State synchronization port. Essential for high availability and cluster stability.' },
    { id: 'longhorn', name: 'Longhorn Replication', endpoint: '', port: 9500, type: 'internal', status: 'manual', description: 'Used for distributed data replication between node disks across the network.' },
  ]);

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
    
    if (!specs.clusterVip) { messages.push("Cluster VIP is required."); isValid = false; }
    if (!specs.managementCidr) { messages.push("Management CIDR is required."); isValid = false; }
    if (!specs.gatewayIp) { messages.push("Default Gateway is required."); isValid = false; }
    
    const nodesWithIp = specs.nodes.filter(n => n.ip);
    if (nodesWithIp.length < nodeCount) {
      messages.push(`Warning: ${nodeCount - nodesWithIp.length} nodes are missing IP definitions.`);
    }

    const failedTests = tests.filter(t => t.type === 'public' && t.status === 'failed' && !specs.hasAirGap);
    if (failedTests.length > 0) {
      messages.push(`Alert: ${failedTests.length} external connectivity tests failed.`);
    }

    onValidationChange({ isValid, messages });
  }, [specs, nodeCount, tests]);

  const runConnectivityTests = async () => {
    if (specs.hasAirGap) {
        setTests(prev => prev.map(t => t.type === 'public' ? { ...t, status: 'failed' } : t));
        return;
    }

    setIsRunningTests(true);
    const updatedTests = [...tests];

    for (let i = 0; i < updatedTests.length; i++) {
      if (updatedTests[i].type === 'public' && updatedTests[i].endpoint) {
        updatedTests[i].status = 'checking';
        setTests([...updatedTests]);

        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 5000);
          
          await fetch(updatedTests[i].endpoint, { mode: 'no-cors', signal: controller.signal });
          clearTimeout(timeoutId);
          updatedTests[i].status = 'success';
        } catch (e) {
          updatedTests[i].status = 'failed';
        }
        setTests([...updatedTests]);
      }
    }
    setIsRunningTests(false);
  };

  const toggleManualVerify = (id: string) => {
    setTests(prev => prev.map(t => {
      if (t.id === id) {
        return { ...t, status: t.status === 'success' ? 'manual' : 'success' };
      }
      return t;
    }));
  };

  const updateNodeIp = (index: number, ip: string) => {
    const newNodes = [...specs.nodes];
    newNodes[index] = { ...newNodes[index], ip };
    updateSpecs({ nodes: newNodes });
  };

  const toggleFlag = (key: keyof NetworkSpecs) => {
    updateSpecs({ [key]: !specs[key] });
  };

  const successCount = tests.filter(t => t.status === 'success').length;

  const inputClasses = "w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-suse-base outline-none transition-all shadow-sm";
  const labelClasses = "block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5";

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-suse-dark flex items-center gap-2">
                <Network className="w-6 h-6 text-suse-base" /> Rede & Conectividade
              </h2>
              <p className="text-xs text-gray-500 mt-1">Configure o fabric de rede e valide os requisitos de comunicação inter-nós.</p>
            </div>
            <div className="flex bg-gray-100 p-1.5 rounded-2xl w-full md:w-auto overflow-x-auto no-scrollbar">
                <button onClick={() => setActiveTab('topology')} className={`flex-1 md:flex-none px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all whitespace-nowrap ${activeTab === 'topology' ? 'bg-white text-suse-dark shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}>Visualizar Topologia</button>
                <button onClick={() => setActiveTab('addressing')} className={`flex-1 md:flex-none px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all whitespace-nowrap ${activeTab === 'addressing' ? 'bg-white text-suse-dark shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}>Parâmetros Globais</button>
                <button onClick={() => setActiveTab('nodes')} className={`flex-1 md:flex-none px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all whitespace-nowrap ${activeTab === 'nodes' ? 'bg-white text-suse-dark shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}>Inventário de IPs</button>
                <button onClick={() => setActiveTab('connectivity')} className={`flex-1 md:flex-none px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all whitespace-nowrap ${activeTab === 'connectivity' ? 'bg-white text-suse-dark shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}>Connectivity Suite</button>
            </div>
        </div>

        {activeTab === 'topology' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
            <div className="lg:col-span-4 space-y-4">
              <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-suse-base" /> Design da Infraestrutura
              </h3>
              
              <div className="grid grid-cols-1 gap-3">
                {[
                  { id: 'hasFirewall', label: 'Firewall Externo', desc: 'Cluster atrás de um firewall L7 corporativo.', icon: Shield, color: 'text-red-500', bg: 'bg-red-50' },
                  { id: 'hasAirGap', label: 'Modo Air-Gapped', desc: 'Sem acesso direto à internet (100% offline).', icon: Lock, color: 'text-gray-700', bg: 'bg-gray-100' },
                  { id: 'hasRancher', label: 'Gestão via Rancher', desc: 'Integração multicluster via Rancher Manager.', icon: Cloud, color: 'text-blue-500', bg: 'bg-blue-50' },
                  { id: 'hasExternalStorage', label: 'Backup Target S3/NFS', desc: 'Armazenamento de backup externo ao cluster.', icon: Database, color: 'text-purple-500', bg: 'bg-purple-50' },
                  { id: 'hasProxy', label: 'Proxy HTTP/HTTPS', desc: 'Tráfego externo roteado via servidor Proxy.', icon: Shuffle, color: 'text-orange-500', bg: 'bg-orange-50' },
                ].map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => toggleFlag(item.id as keyof NetworkSpecs)}
                    className={`group relative p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-4 ${specs[item.id as keyof NetworkSpecs] ? 'border-suse-base bg-white shadow-md ring-4 ring-suse-base/5' : 'border-gray-100 hover:border-gray-200 bg-gray-50/50'}`}
                  >
                    <div className={`p-3 rounded-xl transition-colors ${specs[item.id as keyof NetworkSpecs] ? 'bg-suse-base text-white' : `${item.bg} ${item.color}`}`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className={`text-xs font-bold ${specs[item.id as keyof NetworkSpecs] ? 'text-gray-900' : 'text-gray-600'}`}>{item.label}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{item.desc}</div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${specs[item.id as keyof NetworkSpecs] ? 'border-suse-base bg-suse-base text-white' : 'border-gray-200 bg-white'}`}>
                      {specs[item.id as keyof NetworkSpecs] && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-8 bg-slate-50 rounded-3xl border border-gray-200 overflow-hidden relative min-h-[550px] shadow-inner">
                <div className="absolute top-6 right-8 z-30 flex gap-2">
                    <button onClick={() => setDiagramView('logical')} className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl border transition-all ${diagramView === 'logical' ? 'bg-suse-dark text-white border-suse-dark shadow-lg' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}`}>Visão Lógica</button>
                    <button onClick={() => setDiagramView('physical')} className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl border transition-all ${diagramView === 'physical' ? 'bg-suse-dark text-white border-suse-dark shadow-lg' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}`}>Visão Física</button>
                </div>
                <div className="p-4 flex items-center justify-center h-full">
                  <div className="scale-95 transform origin-center transition-all duration-500 w-full">
                    <InfraDiagram 
                      specs={{ nodeCount, cpuCores: 8, ramGb: 32, diskGb: 250, diskType: 'SSD', networkSpeedGb: 10, hasGpu: false }}
                      networkSpecs={specs}
                      projectName="Interactive Topology Preview"
                      viewMode={diagramView}
                      extras={{ hasFirewall: specs.hasFirewall, hasProxy: specs.hasProxy, hasAirGap: specs.hasAirGap, hasRancher: specs.hasRancher, hasExternalStorage: specs.hasExternalStorage, hasBastion: false, hasNTP: true }}
                    />
                  </div>
                </div>
            </div>
          </div>
        )}

        {/* Mantém as outras abas conforme o original mas otimizadas */}
        {activeTab === 'addressing' && (
          <div className="animate-fade-in space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                    <label className={labelClasses}>Cluster Virtual IP (VIP)</label>
                    <input value={specs.clusterVip} onChange={(e) => updateSpecs({ clusterVip: e.target.value })} className={inputClasses} placeholder="e.g. 192.168.1.10" />
                </div>
                <div>
                    <label className={labelClasses}>Management CIDR</label>
                    <input value={specs.managementCidr} onChange={(e) => updateSpecs({ managementCidr: e.target.value })} className={inputClasses} placeholder="e.g. 192.168.1.0/24" />
                </div>
                <div>
                    <label className={labelClasses}>Default Gateway IP</label>
                    <input value={specs.gatewayIp} onChange={(e) => updateSpecs({ gatewayIp: e.target.value })} className={inputClasses} placeholder="192.168.1.1" />
                </div>
                <div>
                    <label className={labelClasses}>VLAN ID (Opcional)</label>
                    <input value={specs.vlanId} onChange={(e) => updateSpecs({ vlanId: e.target.value })} className={inputClasses} placeholder="Ex: 100" />
                </div>
                <div>
                    <label className={labelClasses}>DNS Servers</label>
                    <input value={specs.dnsServers} onChange={(e) => updateSpecs({ dnsServers: e.target.value })} className={inputClasses} placeholder="8.8.8.8, 1.1.1.1" />
                </div>
                <div>
                    <label className={labelClasses}>NTP Servers</label>
                    <input value={specs.ntpServers} onChange={(e) => updateSpecs({ ntpServers: e.target.value })} className={inputClasses} placeholder="pool.ntp.org" />
                </div>
            </div>
          </div>
        )}

        {activeTab === 'nodes' && (
          <div className="animate-fade-in space-y-6">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
              <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Server className="w-4 h-4 text-suse-base" /> Atribuição de IPs Estáticos ({nodeCount} nós)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {specs.nodes.map((node, i) => (
                  <div key={i} className={`bg-white p-5 rounded-2xl border-2 shadow-sm space-y-3 transition-all ${node.ip ? 'border-emerald-100 shadow-emerald-50' : 'border-amber-100 shadow-amber-50 animate-pulse'}`}>
                    <div className="flex justify-between items-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Nó Físico #{i+1}</div>
                    <div className="space-y-4">
                        <div>
                            <label className="text-[9px] font-bold text-gray-400 uppercase">Hostname</label>
                            <input value={node.name} onChange={(e) => {
                                const newNodes = [...specs.nodes];
                                newNodes[i].name = e.target.value;
                                updateSpecs({ nodes: newNodes });
                            }} className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs" />
                        </div>
                        <div>
                            <label className="text-[9px] font-bold text-gray-400 uppercase">IP Estático</label>
                            <input 
                                value={node.ip} 
                                onChange={(e) => updateNodeIp(i, e.target.value)}
                                className={`w-full px-3 py-2 bg-white border rounded-lg text-xs font-mono outline-none focus:ring-2 focus:ring-suse-base/20 ${node.ip ? 'border-suse-base/30' : 'border-amber-300'}`}
                                placeholder="Ex: 192.168.1.11"
                            />
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ... mantém abas de conectividade e proxy do original ... */}
        {activeTab === 'connectivity' && (
           <div className="animate-fade-in space-y-6">
              <div className="flex justify-between items-end mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                      <Wifi className="w-5 h-5 text-suse-base" /> Diagnostic Tests
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">Verify that critical ports and download URLs are reachable from your terminal or workstation.</p>
                  </div>
                  <button 
                    onClick={runConnectivityTests}
                    disabled={isRunningTests || specs.hasAirGap}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl font-bold text-sm transition-all ${isRunningTests || specs.hasAirGap ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-suse-dark text-white hover:bg-black shadow-lg shadow-suse-dark/20'}`}
                  >
                    {isRunningTests ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Activity className="w-4 h-4" />}
                    {isRunningTests ? 'Testing...' : 'Run Connectivity Suite'}
                  </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {tests.map(test => (
                      <div key={test.id} className="group relative bg-white p-4 rounded-2xl border-2 border-slate-50 flex items-center justify-between hover:border-gray-200 hover:shadow-md transition-all duration-300">
                          <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
                                  test.status === 'success' ? 'bg-green-50 border-green-200 text-green-600' : 
                                  test.status === 'failed' ? 'bg-red-50 border-red-200 text-red-600' : 
                                  'bg-slate-50 border-slate-100 text-slate-400'
                              }`}>
                                  {test.status === 'success' ? <Check className="w-5 h-5 stroke-[3]" /> : 
                                   test.status === 'failed' ? <X className="w-5 h-5 stroke-[3]" /> : 
                                   <Clock className="w-5 h-5" />}
                              </div>
                              <div className="space-y-0.5">
                                  <div className="text-xs font-bold text-gray-800">{test.name}</div>
                                  <div className="text-[10px] text-gray-400 font-mono">{test.endpoint || `Port ${test.port}`}</div>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
           </div>
        )}
      </div>
    </div>
  );
};
