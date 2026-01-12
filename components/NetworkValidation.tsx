
import React, { useEffect, useState } from 'react';
import { NetworkSpecs, ValidationStatus, IpPool, NodeNetworkConfig } from '../types';
import { Network, AlertTriangle, CheckCircle2, Trash2, Plus, Info, Globe, Layers, Shield, Lock, Shuffle, Settings, Server, Activity, Clock, Sliders, Monitor, Terminal, Zap, Cloud, Database, Wifi, ExternalLink, RefreshCw, Check, X, AlertCircle } from 'lucide-react';
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
    { id: 'dns', name: 'Resolução DNS Google', endpoint: 'https://8.8.8.8', port: 443, type: 'public', status: 'pending', description: 'Valida se o cluster consegue resolver nomes externos.' },
    { id: 'suse-reg', name: 'SUSE Registry', endpoint: 'https://registry.suse.com', port: 443, type: 'public', status: 'pending', description: 'Necessário para download de imagens de container oficiais.' },
    { id: 'opensuse-reg', name: 'openSUSE Registry', endpoint: 'https://registry.opensuse.org', port: 443, type: 'public', status: 'pending', description: 'Imagens base para diversos workloads Harvester.' },
    { id: 'suse-download', name: 'SUSE Download', endpoint: 'https://download.suse.com', port: 443, type: 'public', status: 'pending', description: 'Acesso a atualizações de kernel e pacotes OS.' },
    { id: 'harvester-docs', name: 'Harvester Documentation', endpoint: 'https://docs.harvesterhci.io', port: 443, type: 'public', status: 'pending', description: 'Valida acesso ao repositório de documentação.' },
    { id: 'k8s-api', name: 'Kubernetes API Server', endpoint: '', port: 6443, type: 'internal', status: 'manual', description: 'Porta crítica para comunicação entre nós. Deve estar aberta no firewall interno.' },
    { id: 'etcd', name: 'Etcd Quorum', endpoint: '', port: 2379, type: 'internal', status: 'manual', description: 'Porta de sincronização de estado. Essencial para clusters com mais de 1 nó.' },
    { id: 'longhorn', name: 'Longhorn Replicação', endpoint: '', port: 9500, type: 'internal', status: 'manual', description: 'Utilizado para o tráfego de dados distribuído entre os discos.' },
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
    
    if (!specs.clusterVip) { messages.push("VIP do Cluster é obrigatório."); isValid = false; }
    if (!specs.managementCidr) { messages.push("CIDR de gerência é necessário."); isValid = false; }
    if (!specs.gatewayIp) { messages.push("Gateway padrão é obrigatório."); isValid = false; }
    
    const nodesWithIp = specs.nodes.filter(n => n.ip);
    if (nodesWithIp.length < nodeCount) {
      messages.push(`Aviso: ${nodeCount - nodesWithIp.length} nós sem IP definido.`);
    }

    // Validação de conectividade
    const failedTests = tests.filter(t => t.type === 'public' && t.status === 'failed' && !specs.hasAirGap);
    if (failedTests.length > 0) {
      messages.push(`Alerta: ${failedTests.length} testes de conectividade externa falharam.`);
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
  const totalPublic = tests.filter(t => t.type === 'public').length;
  const totalInternal = tests.filter(t => t.type === 'internal').length;

  const inputClasses = "w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-suse-base outline-none transition-all shadow-sm";
  const labelClasses = "block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5";

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-suse-dark flex items-center gap-2">
                <Network className="w-6 h-6 text-suse-base" /> Configuração & Validação de Rede
              </h2>
              <p className="text-xs text-gray-500 mt-1">Defina a topologia, IPs dos nós e parâmetros de segurança.</p>
            </div>
            <div className="flex bg-gray-100 p-1 rounded-2xl w-full md:w-auto overflow-x-auto no-scrollbar">
                <button onClick={() => setActiveTab('topology')} className={`flex-1 md:flex-none px-4 py-2 text-[10px] font-bold rounded-xl transition-all whitespace-nowrap ${activeTab === 'topology' ? 'bg-white text-suse-dark shadow-md' : 'text-gray-400 hover:text-gray-600'}`}>Topologia Gráfica</button>
                <button onClick={() => setActiveTab('addressing')} className={`flex-1 md:flex-none px-4 py-2 text-[10px] font-bold rounded-xl transition-all whitespace-nowrap ${activeTab === 'addressing' ? 'bg-white text-suse-dark shadow-md' : 'text-gray-400 hover:text-gray-600'}`}>Parâmetros Gerais</button>
                <button onClick={() => setActiveTab('nodes')} className={`flex-1 md:flex-none px-4 py-2 text-[10px] font-bold rounded-xl transition-all whitespace-nowrap ${activeTab === 'nodes' ? 'bg-white text-suse-dark shadow-md' : 'text-gray-400 hover:text-gray-600'}`}>Inventário de IPs</button>
                <button onClick={() => setActiveTab('connectivity')} className={`flex-1 md:flex-none px-4 py-2 text-[10px] font-bold rounded-xl transition-all whitespace-nowrap ${activeTab === 'connectivity' ? 'bg-white text-suse-dark shadow-md' : 'text-gray-400 hover:text-gray-600'}`}>Conectividade & Portas</button>
                <button onClick={() => setActiveTab('proxy')} className={`flex-1 md:flex-none px-4 py-2 text-[10px] font-bold rounded-xl transition-all whitespace-nowrap ${activeTab === 'proxy' ? 'bg-white text-suse-dark shadow-md' : 'text-gray-400 hover:text-gray-600'}`}>Proxy / Air-Gap</button>
            </div>
        </div>

        {activeTab === 'topology' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
            {/* Opções Gráficas */}
            <div className="lg:col-span-4 space-y-4">
              <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-suse-base" /> Características da Instalação
              </h3>
              
              <div className="grid grid-cols-1 gap-3">
                {[
                  { id: 'hasFirewall', label: 'Firewall Habilitado', desc: 'Instalação atrás de firewall corporativo.', icon: Shield, color: 'text-red-500', bg: 'bg-red-50' },
                  { id: 'hasAirGap', label: 'Modo Air-Gapped', desc: 'Sem acesso direto à internet (Offline).', icon: Lock, color: 'text-gray-700', bg: 'bg-gray-100' },
                  { id: 'hasRancher', label: 'Gestão via Rancher', desc: 'Gerenciamento multicluster integrado.', icon: Cloud, color: 'text-blue-500', bg: 'bg-blue-50' },
                  { id: 'hasExternalStorage', label: 'Storage Externo (S3/NFS)', desc: 'Backup fora do cluster principal.', icon: Database, color: 'text-purple-500', bg: 'bg-purple-50' },
                  { id: 'hasProxy', label: 'Proxy HTTP/HTTPS', desc: 'Toda saída via servidor Proxy.', icon: Shuffle, color: 'text-orange-500', bg: 'bg-orange-50' },
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

            {/* Organograma Preview */}
            <div className="lg:col-span-8 bg-slate-50 rounded-3xl border border-gray-200 overflow-hidden relative min-h-[500px]">
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                    <button onClick={() => setDiagramView('logical')} className={`px-3 py-1.5 text-[10px] font-bold rounded-lg border transition-all ${diagramView === 'logical' ? 'bg-suse-dark text-white border-suse-dark' : 'bg-white text-gray-500 border-gray-200'}`}>Visão Lógica</button>
                    <button onClick={() => setDiagramView('physical')} className={`px-3 py-1.5 text-[10px] font-bold rounded-lg border transition-all ${diagramView === 'physical' ? 'bg-suse-dark text-white border-suse-dark' : 'bg-white text-gray-500 border-gray-200'}`}>Visão Física</button>
                </div>
                <div className="p-8 flex items-center justify-center h-full">
                  <div className="scale-90 transform origin-center transition-all duration-500 w-full">
                    <InfraDiagram 
                      specs={{ nodeCount, cpuCores: 8, ramGb: 32, diskGb: 250, diskType: 'SSD', networkSpeedGb: 10, hasGpu: false }}
                      networkSpecs={specs}
                      projectName="Organograma da Instalação"
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
                    <div className="flex justify-between items-center mb-4">
                        <div>
                           <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2"><Wifi className="w-5 h-5 text-suse-base" /> Outbound URLs & Ports</h3>
                           <p className="text-xs text-gray-500 mt-1">Valide se as portas de gerência e URLs de download estão liberadas.</p>
                        </div>
                        <button 
                          onClick={runConnectivityTests}
                          disabled={isRunningTests || specs.hasAirGap}
                          className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl font-bold text-sm transition-all ${isRunningTests || specs.hasAirGap ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-suse-dark text-white hover:bg-black shadow-lg shadow-suse-dark/20'}`}
                        >
                          {isRunningTests ? <RefreshCw className="w-4 h-4 animate-spin" /> : <PlayCircle className="w-4 h-4" />}
                          {isRunningTests ? 'Validando...' : 'Testar Conexão'}
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        {tests.map(test => (
                            <div key={test.id} className="bg-slate-50 p-4 rounded-2xl border border-gray-100 flex items-center justify-between group hover:border-gray-200 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-xl border ${test.status === 'success' ? 'bg-green-50 border-green-200 text-green-600' : test.status === 'failed' ? 'bg-red-50 border-red-200 text-red-600' : test.status === 'checking' ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-white border-gray-200 text-gray-400'}`}>
                                        {test.status === 'success' ? <Check className="w-5 h-5" /> : test.status === 'failed' ? <X className="w-5 h-5" /> : test.status === 'checking' ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Globe className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-gray-800">{test.name} {test.type === 'internal' && <span className="ml-1 text-[8px] bg-slate-200 text-slate-600 px-1 py-0.5 rounded uppercase">Porta Interna</span>}</div>
                                        <div className="text-[10px] text-gray-500 font-mono">{test.endpoint || `Porta TCP/${test.port}`}</div>
                                    </div>
                                </div>
                                
                                {test.type === 'internal' ? (
                                    <button 
                                        onClick={() => toggleManualVerify(test.id)}
                                        className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase transition-all ${test.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-white border border-gray-200 text-gray-400 hover:border-suse-base'}`}
                                    >
                                        {test.status === 'success' ? 'Verificado' : 'Marcar como Aberta'}
                                    </button>
                                ) : (
                                    <span className={`text-[9px] font-bold uppercase px-3 py-1 rounded-full ${test.status === 'success' ? 'bg-green-100 text-green-700' : test.status === 'failed' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-400'}`}>
                                        {test.status === 'success' ? 'Acessível' : test.status === 'failed' ? (specs.hasAirGap ? 'N/A - Offline' : 'Erro') : 'Pendente'}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-slate-900 rounded-3xl p-6 text-white space-y-6 shadow-xl">
                        <h4 className="font-bold flex items-center gap-2"><Activity className="w-5 h-5 text-suse-base" /> Resumo de Conectividade</h4>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-400">Total de Testes</span>
                                <span className="font-bold">{tests.length}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-400">Aprovados</span>
                                <span className="font-bold text-suse-base">{successCount}</span>
                            </div>
                            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                                <div className="bg-suse-base h-full transition-all duration-1000" style={{ width: `${(successCount / tests.length) * 100}%` }}></div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-white/10">
                            <h5 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">Recomendação</h5>
                            <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-[10px] text-slate-300 leading-relaxed">
                                {successCount === tests.length ? 
                                    "Ambiente validado! Todas as portas e URLs críticas estão acessíveis para o Harvester." : 
                                    "Existem requisitos pendentes. A falha no download de imagens (registry.suse.com) impedirá a inicialização do cluster."}
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-amber-50 border border-amber-200 rounded-3xl space-y-3">
                        <h4 className="text-xs font-bold text-amber-800 flex items-center gap-2"><AlertCircle className="w-4 h-4" /> Portas Internas</h4>
                        <p className="text-[10px] text-amber-700 leading-relaxed">O teste de portas internas via browser é limitado. Use o <strong>Shell Toolbox</strong> em cada nó para validar via <code>nc</code> ou <code>telnet</code>.</p>
                        <button onClick={() => setActiveTab('nodes')} className="text-[10px] font-bold text-amber-900 underline">Copiar comandos de teste</button>
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
                    <input value={specs.clusterVip} onChange={(e) => updateSpecs({ clusterVip: e.target.value })} className={inputClasses} placeholder="192.168.1.10" />
                </div>
                <div>
                    <label className={labelClasses}>Management CIDR / Rede</label>
                    <input value={specs.managementCidr} onChange={(e) => updateSpecs({ managementCidr: e.target.value })} className={inputClasses} placeholder="192.168.1.0/24" />
                </div>
                <div>
                    <label className={labelClasses}>Mascara de Subrede</label>
                    <input value={specs.subnetMask} onChange={(e) => updateSpecs({ subnetMask: e.target.value })} className={inputClasses} placeholder="255.255.255.0" />
                </div>
                <div>
                    <label className={labelClasses}>Gateway Padrão</label>
                    <input value={specs.gatewayIp} onChange={(e) => updateSpecs({ gatewayIp: e.target.value })} className={inputClasses} placeholder="192.168.1.1" />
                </div>
                <div>
                    <label className={labelClasses}>Servidores DNS (Vírgula)</label>
                    <input value={specs.dnsServers} onChange={(e) => updateSpecs({ dnsServers: e.target.value })} className={inputClasses} placeholder="8.8.8.8, 1.1.1.1" />
                </div>
                <div>
                    <label className={labelClasses}>Servidores NTP</label>
                    <input value={specs.ntpServers} onChange={(e) => updateSpecs({ ntpServers: e.target.value })} className={inputClasses} placeholder="pool.ntp.org" />
                </div>
            </div>
          </div>
        )}

        {activeTab === 'nodes' && (
          <div className="animate-fade-in space-y-6">
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
              <h3 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Server className="w-4 h-4 text-suse-base" /> Atribuição de IPs Estáticos (Mínimo {nodeCount} nós)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {specs.nodes.map((node, i) => (
                  <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3 hover:border-suse-base transition-all">
                    <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">Nó #{i+1}</div>
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
                <h3 className="text-gray-500 font-bold">Proxy Não Requerido</h3>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-gray-800">HTTP/S Proxy</h3>
                  <input value={specs.httpProxy} onChange={(e) => updateSpecs({ httpProxy: e.target.value })} className={inputClasses} placeholder="http://proxy:8080" />
                  <input value={specs.httpsProxy} onChange={(e) => updateSpecs({ httpsProxy: e.target.value })} className={inputClasses} placeholder="https://proxy:8443" />
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-gray-800">No Proxy (Exceptions)</h3>
                  <textarea value={specs.noProxy} onChange={(e) => updateSpecs({ noProxy: e.target.value })} className={`${inputClasses} h-32 resize-none font-mono text-[10px]`} placeholder="localhost, 127.0.0.1, .internal" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const PlayCircle = ({className}: {className: string}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
)
