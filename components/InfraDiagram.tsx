
import React, { useState, useRef } from 'react';
import { HardwareSpecs, NetworkSpecs, ArchitectureExtras } from '../types';
import { Server, Cloud, HardDrive, Cpu, Network, Shield, Shuffle, Database, Clock, Lock, Globe, Zap, Info, Activity } from 'lucide-react';

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
  const containerRef = useRef<HTMLDivElement>(null);

  const nodes = networkSpecs?.nodes && networkSpecs.nodes.length > 0 
    ? networkSpecs.nodes 
    : Array.from({ length: specs.nodeCount }, (_, i) => ({ name: `node-${i + 1}`, ip: '', role: 'Hybrid' as const }));

  const displayNodes = nodes.slice(0, 4); 
  const remainingNodes = nodes.length - 4;

  const handleMouseEnter = (e: React.MouseEvent, title: string, items: { label: string; value: string; icon?: any }[]) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
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

  const hasExtras = extras && (extras.hasRancher || extras.hasExternalStorage || extras.hasNTP);

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="bg-white p-8 rounded-3xl border border-slate-200 overflow-visible print:border-none print:p-0 transition-all duration-500 relative select-none"
    >
      {/* Tooltip Dinâmico */}
      {tooltip && (
        <div 
          className="absolute z-[100] pointer-events-none transform -translate-x-1/2 -translate-y-full bg-slate-900/95 backdrop-blur-md text-white p-4 rounded-2xl shadow-2xl border border-white/20 animate-fade-in ring-1 ring-white/10 min-w-[180px]"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <div className="text-[10px] font-bold text-suse-base mb-2 uppercase tracking-widest flex items-center gap-2">
            <Info className="w-3 h-3" /> {tooltip.title}
          </div>
          <div className="space-y-1.5">
            {tooltip.items.map((item, i) => (
              <div key={i} className="flex justify-between items-center gap-4 border-b border-white/5 pb-1 last:border-0">
                <span className="text-[9px] text-gray-400 font-bold uppercase">{item.label}</span>
                <span className="text-[10px] font-mono text-white">{item.value || 'N/A'}</span>
              </div>
            ))}
          </div>
          <div className="absolute left-1/2 -bottom-1 transform -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border-r border-b border-white/10"></div>
        </div>
      )}

      <div className="flex flex-col items-center space-y-6 min-w-[700px] print:min-w-0">
        
        {/* Camada de Rede Externa */}
        <div className="relative z-10 flex flex-col items-center">
          <div 
            onMouseEnter={(e) => handleMouseEnter(e, "Internet / WAN", [
              { label: "Gateway", value: networkSpecs?.gatewayIp || 'Pendente' },
              { label: "Status", value: extras?.hasAirGap ? 'Air-Gapped' : 'Online' },
              { label: "Uplink", value: `${specs.networkSpeedGb} Gbps` }
            ])}
            onMouseLeave={() => setTooltip(null)}
            className={`px-10 py-4 rounded-3xl border-2 flex flex-col items-center gap-2 shadow-sm transition-all duration-500 cursor-help group ${extras?.hasAirGap ? 'bg-gray-50 border-gray-300 text-gray-400' : 'bg-blue-50 border-blue-200 text-blue-800 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-100'}`}
          >
            <div className="flex items-center gap-3">
              {extras?.hasAirGap ? <Lock className="w-7 h-7" /> : <Globe className="w-7 h-7 group-hover:animate-pulse" />}
              <span className="font-bold text-lg">{extras?.hasAirGap ? 'Rede Isolada' : 'Rede Corporativa'}</span>
            </div>
          </div>
          <div className="h-10 w-0.5 bg-slate-200"></div>
        </div>

        {/* Segurança */}
        {(extras?.hasFirewall || extras?.hasProxy) && (
             <div className="flex gap-10 relative z-10 animate-fade-in mb-4">
                 {extras.hasFirewall && (
                     <div 
                        onMouseEnter={(e) => handleMouseEnter(e, "Firewall", [{ label: "Tipo", value: "Enterprise L7" }, { label: "Policy", value: "Restrictive" }])}
                        onMouseLeave={() => setTooltip(null)}
                        className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-3 rounded-2xl flex flex-col items-center shadow-lg cursor-help hover:scale-105 transition-transform"
                     >
                         <Shield className="w-6 h-6 mb-1.5" />
                         <span className="text-[10px] font-bold uppercase tracking-widest">Firewall</span>
                     </div>
                 )}
                 {extras.hasProxy && (
                     <div 
                        onMouseEnter={(e) => handleMouseEnter(e, "Proxy Gateway", [{ label: "Proxy URL", value: networkSpecs?.httpProxy || 'Configurável' }])}
                        onMouseLeave={() => setTooltip(null)}
                        className="bg-orange-50 border-2 border-orange-200 text-orange-700 px-6 py-3 rounded-2xl flex flex-col items-center shadow-lg cursor-help hover:scale-105 transition-transform"
                     >
                         <Shuffle className="w-6 h-6 mb-1.5" />
                         <span className="text-[10px] font-bold uppercase tracking-widest">Proxy</span>
                     </div>
                 )}
                 <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-slate-200 -z-10"></div>
             </div>
        )}

        {/* Management Fabric & VIP */}
        <div className="flex items-start justify-center gap-12 w-full">
            <div className="relative flex flex-col items-center w-full max-w-2xl">
                <div 
                  onMouseEnter={(e) => handleMouseEnter(e, "Management Fabric", [
                    { label: "VIP do Cluster", value: networkSpecs?.clusterVip || 'Não definido' },
                    { label: "CIDR", value: networkSpecs?.managementCidr || 'Pendente' },
                    { label: "Mascara", value: networkSpecs?.subnetMask || '255.255.255.0' }
                  ])}
                  onMouseLeave={() => setTooltip(null)}
                  className="bg-slate-900 text-white py-5 px-10 rounded-3xl text-center shadow-xl w-full z-20 border-b-8 border-suse-base cursor-help hover:shadow-2xl hover:-translate-y-1 transition-all group"
                >
                    <div className="flex items-center justify-center gap-4">
                        <Network className="w-8 h-8 text-suse-base group-hover:scale-110 transition-transform" /> 
                        <div className="text-left">
                            <span className="font-bold text-lg block">Management Network</span>
                            <span className="text-xs text-suse-light font-mono opacity-80">VIP: {networkSpecs?.clusterVip || '0.0.0.0'}</span>
                        </div>
                    </div>
                </div>
                
                <div className="absolute left-[15%] right-[15%] top-full h-10 border-l-2 border-r-2 border-t-2 border-slate-200 rounded-t-2xl"></div>
                <div className="absolute left-1/2 -translate-x-1/2 top-full h-10 w-0.5 bg-slate-200"></div>
            </div>

            {/* Serviços Laterais */}
            {hasExtras && (
                <div className="flex flex-col gap-4 mt-2 animate-fade-in border-l-2 border-dashed border-slate-200 pl-8">
                    {extras.hasRancher && (
                        <div 
                          onMouseEnter={(e) => handleMouseEnter(e, "Rancher", [{ label: "Modo", value: "Management" }])}
                          onMouseLeave={() => setTooltip(null)}
                          className="flex items-center gap-3 text-[11px] bg-blue-50 border border-blue-200 text-blue-800 p-3 rounded-xl shadow-sm cursor-help hover:bg-blue-100 transition-colors"
                        >
                            <Cloud className="w-4 h-4" /> Rancher Manager
                        </div>
                    )}
                    {extras.hasExternalStorage && (
                        <div 
                          onMouseEnter={(e) => handleMouseEnter(e, "Backup Target", [{ label: "Target", value: "NFS/S3" }])}
                          onMouseLeave={() => setTooltip(null)}
                          className="flex items-center gap-3 text-[11px] bg-purple-50 border border-purple-200 text-purple-800 p-3 rounded-xl shadow-sm cursor-help hover:bg-purple-100 transition-colors"
                        >
                            <Database className="w-4 h-4" /> Storage Externo
                        </div>
                    )}
                </div>
            )}
        </div>

        {/* Nós Físicos */}
        <div className="flex justify-center gap-6 w-full px-4 pt-10">
          {displayNodes.map((node, i) => (
            <div key={i} className="relative">
              <div className="absolute left-1/2 -translate-x-1/2 -top-10 h-10 w-0.5 bg-slate-200"></div>
              
              <div 
                onMouseEnter={(e) => handleMouseEnter(e, `Nó ${i + 1}: ${node.name}`, [
                  { label: "IP Estático", value: node.ip || 'Pendente' },
                  { label: "Papel", value: i === 0 ? 'Bootstrap (Master)' : 'Cluster Node' },
                  { label: "CPU", value: `${specs.cpuCores} Cores` },
                  { label: "RAM", value: `${specs.ramGb} GB` },
                  { label: "Role", value: node.role || 'Hybrid' }
                ])}
                onMouseLeave={() => setTooltip(null)}
                className={`border-2 rounded-3xl p-6 w-52 shadow-lg transition-all duration-300 relative z-10 bg-white group cursor-help hover:shadow-2xl hover:-translate-y-2 ${i === 0 ? 'border-purple-400 ring-4 ring-purple-50' : 'border-suse-base hover:border-emerald-500'}`}
              >
                <div className={`absolute -top-3 -right-3 text-white text-[10px] font-bold w-8 h-8 flex items-center justify-center rounded-full shadow-lg ${i === 0 ? 'bg-purple-600' : 'bg-suse-dark'}`}>
                  {i + 1}
                </div>
                
                <div className="flex justify-center mb-4">
                  <div className={`p-4 rounded-2xl transition-all group-hover:scale-110 ${i === 0 ? 'bg-purple-50 text-purple-600' : 'bg-suse-base/10 text-suse-base'}`}>
                    <Server className="w-10 h-10" />
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <div className="font-bold text-gray-800 text-sm truncate" title={node.name}>{node.name}</div>
                  <div className="text-[10px] font-mono text-blue-600 bg-blue-50 py-1.5 px-3 rounded-xl border border-blue-100">
                    {node.ip || 'DHCP'}
                  </div>
                  
                  {viewMode === 'physical' && (
                    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100">
                        <div className="flex flex-col items-center">
                            <Cpu className="w-3 h-3 text-gray-400 mb-1" />
                            <span className="text-[9px] font-bold text-gray-600 uppercase">{specs.cpuCores}C</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <HardDrive className="w-3 h-3 text-gray-400 mb-1" />
                            <span className="text-[9px] font-bold text-gray-600 uppercase">{specs.ramGb}G</span>
                        </div>
                    </div>
                  )}
                  
                  {viewMode === 'logical' && (
                    <div className="pt-2 text-[8px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 rounded-lg py-1">
                      {i === 0 ? 'Master / API' : 'Worker / Data'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {remainingNodes > 0 && (
             <div className="relative">
               <div className="absolute left-1/2 -translate-x-1/2 -top-10 h-10 w-0.5 bg-slate-200"></div>
               <div 
                  onMouseEnter={(e) => handleMouseEnter(e, "Nós Adicionais", [{ label: "Contagem", value: `+${remainingNodes} nós` }, { label: "Configuração", value: "Idêntica" }])}
                  onMouseLeave={() => setTooltip(null)}
                  className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-6 w-52 h-full flex flex-col items-center justify-center text-slate-400 cursor-help hover:bg-slate-100 transition-colors"
                >
                 <Server className="w-12 h-12 mb-3 opacity-20" />
                 <span className="font-bold text-sm">+{remainingNodes} Nós Extra</span>
                 <span className="text-[10px] mt-1">Configuração Uniforme</span>
               </div>
             </div>
          )}
        </div>

        {/* Distributed Storage Layer */}
        <div className="w-full max-w-4xl mt-12 bg-slate-900 rounded-3xl p-8 text-white flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <Database className="w-32 h-32" />
           </div>
           <div className="flex items-center gap-6 z-10">
              <div className="p-5 bg-suse-base rounded-2xl shadow-xl shadow-suse-base/20">
                <Database className="w-10 h-10 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-xl leading-tight">Longhorn Distributed Fabric</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-xs leading-relaxed">Persistência distribuída em nível de bloco replicada em tempo real entre os nós do cluster.</p>
              </div>
           </div>
           <div className="text-right flex flex-col items-end gap-1 z-10">
              <span className="text-xs text-slate-500 uppercase font-bold tracking-widest">Capacidade Bruta Clusterizada</span>
              <span className="text-4xl font-bold text-suse-light">~{(specs.diskGb * specs.nodeCount).toLocaleString()} GB</span>
              <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold bg-white/5 px-3 py-1 rounded-full mt-2">
                <Zap className="w-3 h-3 text-suse-base" /> Camada {specs.diskType} Enterprise
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};
