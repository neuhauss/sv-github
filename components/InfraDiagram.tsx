
import React, { useState, useRef } from 'react';
import { HardwareSpecs, NetworkSpecs, ArchitectureExtras } from '../types';
import { Server, Cloud, HardDrive, Cpu, Network, Shield, Shuffle, Database, Clock, Lock, Globe, Zap, Info, Activity, CheckCircle2, AlertCircle } from 'lucide-react';

interface Props {
  specs: HardwareSpecs;
  networkSpecs?: NetworkSpecs;
  projectName: string;
  extras?: ArchitectureExtras;
  viewMode?: 'logical' | 'physical';
}

interface TooltipInfo {
  title: string;
  items: { label: string; value: string; icon?: any }[];
  x: number;
  y: number;
}

export const InfraDiagram: React.FC<Props> = ({ specs, networkSpecs, projectName, extras, viewMode = 'logical' }) => {
  const [tooltip, setTooltip] = useState<TooltipInfo | null>(null);
  const [activeElement, setActiveElement] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Usa os nós configurados ou gera placeholders baseados no nodeCount
  const nodes = networkSpecs?.nodes && networkSpecs.nodes.length > 0 
    ? networkSpecs.nodes 
    : Array.from({ length: specs.nodeCount }, (_, i) => ({ name: `node-${i + 1}`, ip: '', role: (i === 0 ? 'Master' : 'Worker') as any }));

  const handleMouseEnter = (e: React.MouseEvent, id: string, title: string, items: { label: string; value: string; icon?: any }[]) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    setActiveElement(id);
    setTooltip({
      title,
      items,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top - 10
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!tooltip || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setTooltip({
      ...tooltip,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top - 10
    });
  };

  const clearHover = () => {
    setTooltip(null);
    setActiveElement(null);
  };

  const hasExtras = extras && (extras.hasRancher || extras.hasExternalStorage || extras.hasNTP);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="bg-white p-8 rounded-3xl border border-slate-200 overflow-visible print:border-none print:p-0 transition-all duration-500 relative select-none"
    >
      {/* Tooltip Dinâmico Customizado */}
      {tooltip && (
        <div 
          className="absolute z-[100] pointer-events-none transform -translate-x-1/2 -translate-y-full bg-slate-900/95 backdrop-blur-md text-white p-4 rounded-2xl shadow-2xl border border-white/20 animate-fade-in ring-1 ring-white/10 min-w-[220px]"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <div className="text-[10px] font-bold text-suse-base mb-2 uppercase tracking-widest flex items-center gap-2 border-b border-white/10 pb-2">
            <Zap className="w-3.5 h-3.5" /> {tooltip.title}
          </div>
          <div className="space-y-2">
            {tooltip.items.map((item, i) => (
              <div key={i} className="flex justify-between items-center gap-4">
                <span className="text-[9px] text-gray-400 font-bold uppercase">{item.label}</span>
                <span className={`text-[10px] font-mono ${item.value === 'Pendente' || item.value.includes('missing') ? 'text-amber-400 font-bold' : 'text-white'}`}>
                    {item.value || 'N/A'}
                </span>
              </div>
            ))}
          </div>
          <div className="absolute left-1/2 -bottom-1 transform -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border-r border-b border-white/10"></div>
        </div>
      )}

      <div className="flex flex-col items-center space-y-8 min-w-[700px] print:min-w-0">
        
        {/* Camada 1: Gateway / WAN */}
        <div className="relative z-10 flex flex-col items-center">
          <div 
            onMouseEnter={(e) => handleMouseEnter(e, 'wan', "Gateway de Saída", [
              { label: "IP Gateway", value: networkSpecs?.gatewayIp || 'Pendente' },
              { label: "DNS Servers", value: networkSpecs?.dnsServers || '8.8.8.8' },
              { label: "Segurança", value: extras?.hasFirewall ? 'Firewall Ativo' : 'Acesso Direto' }
            ])}
            onMouseLeave={clearHover}
            className={`px-12 py-5 rounded-3xl border-2 flex flex-col items-center gap-2 shadow-sm transition-all duration-500 cursor-help group ${activeElement === 'wan' ? 'scale-105 border-blue-400 shadow-blue-100 bg-blue-50' : extras?.hasAirGap ? 'bg-slate-50 border-slate-200 grayscale' : 'bg-blue-50/30 border-blue-100 text-blue-800'}`}
          >
            <div className="flex items-center gap-3">
              {extras?.hasAirGap ? <Lock className="w-7 h-7 text-slate-400" /> : <Globe className={`w-7 h-7 text-blue-500 ${activeElement === 'wan' ? 'animate-spin-slow' : ''}`} />}
              <span className={`font-black text-lg tracking-tight ${extras?.hasAirGap ? 'text-slate-400' : 'text-blue-900'}`}>{extras?.hasAirGap ? 'Rede Isolada (Air-Gap)' : 'Corporate WAN'}</span>
            </div>
          </div>
          <div className={`h-12 w-0.5 transition-colors duration-500 ${activeElement === 'wan' ? 'bg-blue-400' : 'bg-slate-200'}`}></div>
        </div>

        {/* Camada 2: Management Fabric & VIP */}
        <div className="relative flex flex-col items-center w-full max-w-2xl">
            <div 
              onMouseEnter={(e) => handleMouseEnter(e, 'fabric', "Cluster Management Fabric", [
                { label: "Cluster VIP", value: networkSpecs?.clusterVip || 'Não Definido' },
                { label: "CIDR de Gerência", value: networkSpecs?.managementCidr || 'Pendente' },
                { label: "VLAN ID", value: networkSpecs?.vlanId || 'Untagged' },
                { label: "Disponibilidade", value: specs.nodeCount >= 3 ? 'Alta Disponibilidade' : 'Single Node / Standard' }
              ])}
              onMouseLeave={clearHover}
              className={`bg-slate-900 text-white py-6 px-10 rounded-[2.5rem] shadow-xl w-full z-20 border-b-8 transition-all duration-300 cursor-help group ${activeElement === 'fabric' ? 'border-suse-base shadow-suse-base/20 -translate-y-1' : 'border-slate-800'}`}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                        <div className={`p-4 rounded-2xl transition-all duration-500 ${networkSpecs?.clusterVip ? 'bg-suse-base text-white shadow-[0_0_20px_rgba(48,186,120,0.3)]' : 'bg-slate-800 text-slate-500'}`}>
                            <Network className={`w-8 h-8 ${activeElement === 'fabric' ? 'scale-110' : ''}`} /> 
                        </div>
                        <div className="text-left">
                            <span className="font-black text-xl block tracking-tight uppercase">Management Fabric</span>
                            <span className="text-xs text-suse-light font-mono opacity-80 flex items-center gap-2">
                                <Zap className="w-3 h-3 text-amber-400" /> VIP: {networkSpecs?.clusterVip || '0.0.0.0'}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[9px] text-slate-500 font-bold uppercase">Status Lógica</span>
                        <span className="text-xs font-bold text-suse-base flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Operacional
                        </span>
                    </div>
                </div>
            </div>
            
            {/* Conectores Visuais para os Nós */}
            <div className={`absolute left-[15%] right-[15%] top-full h-10 border-l-2 border-r-2 border-t-2 rounded-t-3xl transition-colors duration-500 ${activeElement === 'fabric' ? 'border-suse-base' : 'border-slate-200'}`}></div>
            <div className={`absolute left-1/2 -translate-x-1/2 top-full h-10 w-0.5 transition-colors duration-500 ${activeElement === 'fabric' ? 'bg-suse-base' : 'bg-slate-200'}`}></div>
        </div>

        {/* Camada 3: Nós Físicos (Grade Dinâmica) */}
        <div className="flex flex-wrap justify-center gap-6 w-full px-4 pt-10">
          {nodes.map((node, i) => {
            const isMaster = i === 0 || node.role === 'Master' || node.role === 'Hybrid';
            const hasMissingIp = !node.ip;
            
            return (
              <div key={i} className="relative group/node">
                <div className={`absolute left-1/2 -translate-x-1/2 -top-10 h-10 w-0.5 transition-colors duration-500 ${activeElement === `node-${i}` || activeElement === 'fabric' ? 'bg-suse-base' : 'bg-slate-200'}`}></div>
                
                <div 
                  onMouseEnter={(e) => handleMouseEnter(e, `node-${i}`, `Nó Físico #${i + 1}`, [
                    { label: "Nome do Host", value: node.name },
                    { label: "Endereço IP", value: node.ip || 'Pendente' },
                    { label: "Papel no Cluster", value: isMaster ? 'Master / Control-Plane' : 'Worker / Data-Plane' },
                    { label: "Hardware", value: `${specs.cpuCores} vCPU | ${specs.ramGb}GB RAM` }
                  ])}
                  onMouseLeave={clearHover}
                  className={`border-2 rounded-[2rem] p-6 w-52 shadow-lg transition-all duration-300 relative z-10 bg-white cursor-help hover:shadow-2xl hover:-translate-y-2 
                    ${activeElement === `node-${i}` ? 'border-suse-base ring-8 ring-suse-base/5' : isMaster ? 'border-purple-200' : 'border-slate-100'}
                    ${hasMissingIp ? 'animate-pulse border-amber-200 shadow-amber-50' : ''}`}
                >
                  <div className={`absolute -top-3 -right-3 text-white text-[10px] font-black w-9 h-9 flex items-center justify-center rounded-2xl shadow-lg transform rotate-12 group-hover/node:rotate-0 transition-transform ${isMaster ? 'bg-purple-600' : 'bg-suse-dark'}`}>
                    #{i + 1}
                  </div>
                  
                  <div className="flex justify-center mb-5">
                    <div className={`p-4 rounded-2xl transition-all duration-500 ${isMaster ? 'bg-purple-50 text-purple-600' : 'bg-emerald-50 text-suse-base'} ${activeElement === `node-${i}` ? 'scale-110 shadow-inner' : ''}`}>
                      <Server className="w-10 h-10" />
                    </div>
                  </div>

                  <div className="text-center space-y-2">
                    <div className="font-black text-gray-800 text-sm tracking-tight truncate px-2">{node.name}</div>
                    <div className={`text-[10px] font-mono py-1.5 px-3 rounded-xl border flex items-center justify-center gap-2 ${node.ip ? 'text-blue-600 bg-blue-50 border-blue-100' : 'text-amber-600 bg-amber-50 border-amber-100'}`}>
                      {node.ip ? node.ip : <><AlertCircle className="w-3 h-3" /> Sem IP</>}
                    </div>
                    
                    <div className="pt-2">
                        <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${isMaster ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-500'}`}>
                            {isMaster ? 'Master Node' : 'Worker Node'}
                        </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Camada de Armazenamento Hiperconvergente */}
        <div 
          onMouseEnter={(e) => handleMouseEnter(e, 'storage', "Storage Fabric (Longhorn)", [
            { label: "Tecnologia", value: "SDS - Software Defined Storage" },
            { label: "Capacidade Bruta", value: `${(specs.diskGb * specs.nodeCount).toLocaleString()} GB` },
            { label: "Réplicas", value: specs.nodeCount >= 3 ? "3 (HA Estável)" : "Custom" }
          ])}
          onMouseLeave={clearHover}
          className={`w-full max-w-4xl mt-10 bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col md:flex-row justify-between items-center gap-6 shadow-2xl relative overflow-hidden transition-all duration-700 cursor-help ${activeElement === 'storage' ? 'ring-8 ring-suse-base/10 border-suse-base' : 'border-transparent'}`}
        >
           <div className="absolute -top-10 -right-10 opacity-5 pointer-events-none">
              <Database className="w-64 h-64" />
           </div>
           <div className="flex items-center gap-6 z-10">
              <div className="p-5 bg-suse-base rounded-3xl shadow-2xl shadow-suse-base/40">
                <Database className="w-10 h-10 text-white" />
              </div>
              <div className="space-y-1 text-left">
                <h4 className="font-black text-xl tracking-tight">Longhorn Distributed SDS</h4>
                <p className="text-[11px] text-slate-400 max-w-sm leading-relaxed font-medium">Volumes de bloco distribuídos com replicação síncrona entre os {specs.nodeCount} nós físicos.</p>
              </div>
           </div>
           <div className="text-right flex flex-col items-end gap-1 z-10 shrink-0">
              <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Capacidade Total Cluster</span>
              <span className="text-4xl font-black text-suse-light tracking-tighter">~{(specs.diskGb * specs.nodeCount).toLocaleString()} GB</span>
           </div>
        </div>

        {/* Rodapé do Diagrama */}
        <div className="pt-6 flex items-center justify-between w-full border-t border-slate-100 mt-4 px-2 opacity-50">
            <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> Topologia Validada Harvester v1.7
            </div>
            <div className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.2em]">Passe o mouse para detalhes técnicos</div>
        </div>
      </div>
    </div>
  );
};
