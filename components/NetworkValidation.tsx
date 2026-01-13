
import React, { useEffect, useState } from 'react';
import { NetworkSpecs, ValidationStatus, IpPool, NodeNetworkConfig } from '../types';
import { Network, AlertTriangle, CheckCircle2, Trash2, Plus, Info, Globe, Layers, Shield, Lock, Shuffle, Settings, Server, Activity, Clock, Sliders, Monitor, Terminal, Zap, Cloud, Database, Wifi, ExternalLink, RefreshCw, Check, X, AlertCircle, HelpCircle } from 'lucide-react';
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

  const getStatusColorClasses = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 border-green-200 text-green-700 shadow-[0_0_15px_-3px_rgba(34,197,94,0.3)]';
      case 'failed': return 'bg-red-100 border-red-200 text-red-700 shadow-[0_0_15px_-3px_rgba(239,68,68,0.3)]';
      case 'checking': return 'bg-blue-100 border-blue-200 text-blue-700 animate-pulse';
      case 'manual': return 'bg-slate-100 border-slate-200 text-slate-600';
      default: return 'bg-gray-50 border-gray-200 text-gray-400';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-suse-dark flex items-center gap-2">
                <Network className="w-6 h-6 text-suse-base" /> Network & Validation
              </h2>
              <p className="text-xs text-gray-500 mt-1">Configure your deployment fabric and validate connectivity requirements.</p>
            </div>
            <div className="flex bg-gray-100 p-1 rounded-2xl w-full md:w-auto overflow-x-auto no-scrollbar">
                <button onClick={() => setActiveTab('topology')} className={`flex-1 md:flex-none px-4 py-2 text-[10px] font-bold rounded-xl transition-all whitespace-nowrap ${activeTab === 'topology' ? 'bg-white text-suse-dark shadow-md' : 'text-gray-400 hover:text-gray-600'}`}>Topology Preview</button>
                <button onClick={() => setActiveTab('addressing')} className={`flex-1 md:flex-none px-4 py-2 text-[10px] font-bold rounded-xl transition-all whitespace-nowrap ${activeTab === 'addressing' ? 'bg-white text-suse-dark shadow-md' : 'text-gray-400 hover:text-gray-600'}`}>Global Parameters</button>
                <button onClick={() => setActiveTab('nodes')} className={`flex-1 md:flex-none px-4 py-2 text-[10px] font-bold rounded-xl transition-all whitespace-nowrap ${activeTab === 'nodes' ? 'bg-white text-suse-dark shadow-md' : 'text-gray-400 hover:text-gray-600'}`}>IP Inventory</button>
                <button onClick={() => setActiveTab('connectivity')} className={`flex-1 md:flex-none px-4 py-2 text-[10px] font-bold rounded-xl transition-all whitespace-nowrap ${activeTab === 'connectivity' ? 'bg-white text-suse-dark shadow-md' : 'text-gray-400 hover:text-gray-600'}`}>Connectivity & Ports</button>
                <button onClick={() => setActiveTab('proxy')} className={`flex-1 md:flex-none px-4 py-2 text-[10px] font-bold rounded-xl transition-all whitespace-nowrap ${activeTab === 'proxy' ? 'bg-white text-suse-dark shadow-md' : 'text-gray-400 hover:text-gray-600'}`}>Proxy / Air-Gap</button>
            </div>
        </div>

        {activeTab === 'topology' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
            <div className="lg:col-span-4 space-y-4">
              <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-suse-base" /> Environment Configuration
              </h3>
              
              <div className="grid grid-cols-1 gap-3">
                {[
                  { id: 'hasFirewall', label: 'Firewall Enabled', desc: 'Cluster sits behind an external L7 firewall.', icon: Shield, color: 'text-red-500', bg: 'bg-red-50' },
                  { id: 'hasAirGap', label: 'Air-Gapped Mode', desc: 'No direct internet access (fully offline).', icon: Lock, color: 'text-gray-700', bg: 'bg-gray-100' },
                  { id: 'hasRancher', label: 'Rancher Management', desc: 'Upstream Rancher integration for management.', icon: Cloud, color: 'text-blue-500', bg: 'bg-blue-50' },
                  { id: 'hasExternalStorage', label: 'External Backup (S3/NFS)', desc: 'Storage target located outside the cluster.', icon: Database, color: 'text-purple-500', bg: 'bg-purple-50' },
                  { id: 'hasProxy', label: 'HTTP/HTTPS Proxy', desc: 'All outbound traffic routed via Proxy server.', icon: Shuffle, color: 'text-orange-500', bg: 'bg-orange-50' },
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
                      {specs[item.id as keyof NetworkSpecs] && <CheckCircle2 className="w-3 h-3" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-8 bg-slate-50 rounded-3xl border border-gray-200 overflow-hidden relative min-h-[500px]">
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                    <button onClick={() => setDiagramView('logical')} className={`px-3 py-1.5 text-[10px] font-bold rounded-lg border transition-all ${diagramView === 'logical' ? 'bg-suse-dark text-white border-suse-dark' : 'bg-white text-gray-500 border-gray-200'}`}>Logical View</button>
                    <button onClick={() => setDiagramView('physical')} className={`px-3 py-1.5 text-[10px] font-bold rounded-lg border transition-all ${diagramView === 'physical' ? 'bg-suse-dark text-white border-suse-dark' : 'bg-white text-gray-500 border-gray-200'}`}>Physical View</button>
                </div>
                <div className="p-8 flex items-center justify-center h-full">
                  <div className="scale-90 transform origin-center transition-all duration-500 w-full">
                    <InfraDiagram 
                      specs={{ nodeCount, cpuCores: 8, ramGb: 32, diskGb: 250, diskType: 'SSD', networkSpeedGb: 10, hasGpu: false }}
                      networkSpecs={specs}
                      projectName="Environment Topology Preview"
                      viewMode={diagramView}
                      extras={{ hasFirewall: specs.hasFirewall, hasProxy: specs.hasProxy, hasAirGap: specs.hasAirGap, hasRancher: specs.hasRancher, hasExternalStorage: specs.hasExternalStorage, hasBastion: false, hasNTP: true }}
                    />
                  </div>
                </div>
            </div>
          </div>
        )}

        {activeTab === 'connectivity' && (
          <div className="animate-fade-in space-y-6">
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
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

                    <div className="grid grid-cols-1 gap-4">
                        {tests.map(test => (
                            <div key={test.id} className="group relative bg-white p-4 rounded-2xl border-2 border-slate-50 flex items-center justify-between hover:border-gray-200 hover:shadow-md transition-all duration-300">
                                <div className="flex items-center gap-5">
                                    <div className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all duration-500 ${getStatusColorClasses(test.status)}`}>
                                        {test.status === 'success' ? <Check className="w-6 h-6 stroke-[3]" /> : 
                                         test.status === 'failed' ? <X className="w-6 h-6 stroke-[3]" /> : 
                                         test.status === 'checking' ? <RefreshCw className="w-6 h-6 animate-spin" /> : 
                                         test.status === 'manual' ? <Settings className="w-6 h-6" /> :
                                         <Clock className="w-6 h-6" />}
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold text-gray-800">{test.name}</span>
                                            {test.type === 'internal' && <span className="text-[8px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Internal Fabric</span>}
                                            <div className="group/info relative cursor-help">
                                                <HelpCircle className="w-3.5 h-3.5 text-gray-300 hover:text-suse-base" />
                                                <div className="absolute left-0 bottom-full mb-2 w-64 p-3 bg-slate-900 text-white text-[10px] rounded-xl opacity-0 group-hover/info:opacity-100 transition-opacity z-50 pointer-events-none shadow-2xl leading-relaxed">
                                                    <div className="font-bold text-suse-base uppercase tracking-widest mb-1">Purpose</div>
                                                    {test.description}
                                                    <div className="absolute left-2 -bottom-1 w-2 h-2 bg-slate-900 rotate-45"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-[10px] text-gray-400 font-mono flex items-center gap-2">
                                            <code className="bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">{test.endpoint || `TCP:${test.port}`}</code>
                                        </div>
                                    </div>
                                </div>
                                
                                {test.type === 'internal' ? (
                                    <button 
                                        onClick={() => toggleManualVerify(test.id)}
                                        className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${test.status === 'success' ? 'bg-green-600 text-white shadow-lg shadow-green-200' : 'bg-white border-2 border-gray-100 text-gray-400 hover:border-suse-base hover:text-suse-base'}`}
                                    >
                                        {test.status === 'success' ? 'Verified' : 'Verify Port'}
                                    </button>
                                ) : (
                                    <div className="flex flex-col items-end gap-1">
                                        <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                                            test.status === 'success' ? 'bg-green-100 text-green-700' : 
                                            test.status === 'failed' ? 'bg-red-100 text-red-700' : 
                                            'bg-gray-100 text-gray-400'
                                        }`}>
                                            {test.status === 'success' ? 'Reachable' : 
                                             test.status === 'failed' ? (specs.hasAirGap ? 'Air-Gapped' : 'Unreachable') : 
                                             test.status === 'checking' ? 'Testing...' : 'Pending'}
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-slate-900 rounded-3xl p-6 text-white space-y-6 shadow-xl relative overflow-hidden group">
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-suse-base/10 rounded-full blur-3xl group-hover:bg-suse-base/20 transition-all"></div>
                        <h4 className="font-bold flex items-center gap-2 z-10 relative">
                            <Activity className="w-5 h-5 text-suse-base" /> Diagnostic Health
                        </h4>
                        <div className="space-y-5 z-10 relative">
                            <div className="flex justify-between items-end">
                                <div className="space-y-0.5">
                                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Test Coverage</div>
                                    <div className="text-2xl font-bold">{Math.round((tests.filter(t => t.status !== 'pending' && t.status !== 'checking').length / tests.length) * 100)}%</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Success Rate</div>
                                    <div className="text-2xl font-bold text-suse-base">{successCount}/{tests.length}</div>
                                </div>
                            </div>
                            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5">
                                <div className="bg-suse-base h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(48,186,120,0.5)]" style={{ width: `${(successCount / tests.length) * 100}%` }}></div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/10 z-10 relative">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-3 uppercase tracking-tighter">
                                <Zap className="w-3 h-3 text-amber-500" /> System Recommendation
                            </div>
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-[10px] text-slate-300 leading-relaxed italic">
                                {successCount === tests.length ? 
                                    "Architecture validated. All upstream registries and internal fabric ports are functional. Harvester bootstrap will proceed normally." : 
                                    "Validation failed for some endpoints. Inaccessible registries (like registry.suse.com) will prevent cluster initialization. Please verify your DNS and Firewall rules."}
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-amber-50 border border-amber-200 rounded-3xl space-y-4 shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-amber-100 rounded-xl">
                                <AlertCircle className="w-5 h-5 text-amber-600" />
                            </div>
                            <h4 className="text-sm font-bold text-amber-900">Internal Port Testing</h4>
                        </div>
                        <p className="text-[11px] text-amber-800/80 leading-relaxed">Browser-based testing for internal node-to-node ports is not possible. Use the <strong>Shell Toolbox</strong> one-liners on your physical nodes to validate <code>etcd</code> and <code>Longhorn</code> ports via CLI.</p>
                        <button onClick={() => setActiveTab('nodes')} className="flex items-center gap-2 text-[10px] font-bold text-amber-900 underline hover:text-black transition-colors">
                            Access CLI Test Commands <ArrowRight className="w-3 h-3" />
                        </button>
                    </div>
                </div>
             </div>
          </div>
        )}

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
                    <label className={labelClasses}>Subnet Mask</label>
                    <input value={specs.subnetMask} onChange={(e) => updateSpecs({ subnetMask: e.target.value })} className={inputClasses} placeholder="255.255.255.0" />
                </div>
                <div>
                    <label className={labelClasses}>Default Gateway IP</label>
                    <input value={specs.gatewayIp} onChange={(e) => updateSpecs({ gatewayIp: e.target.value })} className={inputClasses} placeholder="192.168.1.1" />
                </div>
                <div>
                    <label className={labelClasses}>DNS Servers (Comma separated)</label>
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
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
              <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Server className="w-4 h-4 text-suse-base" /> Static IP Assignment (Minimum {nodeCount} nodes)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {specs.nodes.map((node, i) => (
                  <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3 hover:border-suse-base transition-all">
                    <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">Node #{i+1}</div>
                    <input value={node.name} onChange={(e) => {
                        const newNodes = [...specs.nodes];
                        newNodes[i].name = e.target.value;
                        updateSpecs({ nodes: newNodes });
                      }} className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs" />
                    <input 
                        value={node.ip} 
                        onChange={(e) => updateNodeIp(i, e.target.value)}
                        className={`w-full px-3 py-2 bg-white border rounded-lg text-xs font-mono outline-none focus:ring-2 focus:ring-suse-base/20 ${node.ip ? 'border-suse-base/30' : 'border-gray-200'}`}
                        placeholder="Ex: 192.168.1.11"
                      />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'proxy' && (
          <div className="animate-fade-in space-y-6">
            {!specs.hasProxy ? (
              <div className="py-24 text-center border-2 border-dashed border-gray-100 rounded-3xl bg-gray-50/30">
                <Shuffle className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                <h3 className="text-gray-500 font-bold">Proxy Configuration Not Required</h3>
                <p className="text-xs text-gray-400 mt-2">Enable Proxy in the Topology Preview tab to configure settings.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-gray-800">HTTP/HTTPS Outbound Proxy</h3>
                  <div className="space-y-4">
                    <div>
                        <label className={labelClasses}>HTTP Proxy URL</label>
                        <input value={specs.httpProxy} onChange={(e) => updateSpecs({ httpProxy: e.target.value })} className={inputClasses} placeholder="http://proxy:8080" />
                    </div>
                    <div>
                        <label className={labelClasses}>HTTPS Proxy URL</label>
                        <input value={specs.httpsProxy} onChange={(e) => updateSpecs({ httpsProxy: e.target.value })} className={inputClasses} placeholder="https://proxy:8443" />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-gray-800">No Proxy (Exceptions)</h3>
                  <textarea value={specs.noProxy} onChange={(e) => updateSpecs({ noProxy: e.target.value })} className={`${inputClasses} h-32 resize-none font-mono text-[10px]`} placeholder="localhost, 127.0.0.1, .cluster.local, .internal" />
                  <p className="text-[10px] text-gray-400">Specify domains or IP ranges that should bypass the proxy server.</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const ArrowRight = ({className}: {className: string}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
)
const PlayCircle = ({className}: {className: string}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
)
