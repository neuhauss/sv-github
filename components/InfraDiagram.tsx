
import React, { useState, useRef } from 'react';
import { HardwareSpecs, NetworkSpecs, ArchitectureExtras } from '../types';
import { Server, Cloud, HardDrive, Cpu, Network, Shield, Shuffle, Database, Clock, Lock, Globe, Zap, Info, Activity, ArrowUpRight, CheckCircle2, AlertCircle } from 'lucide-react';

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

  const nodes = networkSpecs?.nodes && networkSpecs.nodes.length > 0 
    ? networkSpecs.nodes 
    : Array.from({ length: specs.nodeCount }, (_, i) => ({ name: `node-${i + 1}`, ip: '', role: 'Hybrid' as const }));

  const displayNodes = nodes.slice(0, 4); 
  const remainingNodes = nodes.length - 4;

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
      {/* Dynamic Tooltip */}
      {tooltip && (
        <div 
          className="absolute z-[100] pointer-events-none transform -translate-x-1/2 -translate-y-full bg-slate-900/95 backdrop-blur-md text-white p-4 rounded-2xl shadow-2xl border border-white/20 animate-fade-in ring-1 ring-white/10 min-w-[200px]"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <div className="text-[10px] font-bold text-suse-base mb-2 uppercase tracking-widest flex items-center gap-2 border-b border-white/10 pb-2">
            <Info className="w-3.5 h-3.5" /> {tooltip.title}
          </div>
          <div className="space-y-2">
            {tooltip.items.map((item, i) => (
              <div key={i} className="flex justify-between items-center gap-4">
                <span className="text-[9px] text-gray-400 font-bold uppercase">{item.label}</span>
                <span className={`text-[10px] font-mono ${item.value === 'Pendente' ? 'text-amber-400 font-bold' : 'text-white'}`}>
                    {item.value || 'N/A'}
                </span>
              </div>
            ))}
          </div>
          <div className="absolute left-1/2 -bottom-1 transform -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border-r border-b border-white/10"></div>
        </div>
      )}

      <div className="flex flex-col items-center space-y-6 min-w-[750px] print:min-w-0">
        
        {/* Layer 1: Internet / WAN */}
        <div className="relative z-10 flex flex-col items-center">
          <div 
            onMouseEnter={(e) => handleMouseEnter(e, 'wan', "External Access / WAN", [
              { label: "IP Gateway", value: networkSpecs?.gatewayIp || 'Pendente' },
              { label: "DNS Servers", value: networkSpecs?.dnsServers || '8.8.8.8' },
              { label: "Security", value: extras?.hasFirewall ? 'Restrictive' : 'Open' }
            ])}
            onMouseLeave={clearHover}
            className={`px-12 py-5 rounded-3xl border-2 flex flex-col items-center gap-2 shadow-sm transition-all duration-500 cursor-help group ${activeElement === 'wan' ? 'scale-105 border-blue-400 shadow-blue-100' : ''} ${extras?.hasAirGap ? 'bg-gray-50 border-gray-300 text-gray-400' : 'bg-blue-50 border-blue-200 text-blue-800 hover:border-blue-400 hover:shadow-lg'}`}
          >
            <div className="flex items-center gap-3">
              {extras?.hasAirGap ? <Lock className="w-7 h-7" /> : <Globe className={`w-7 h-7 ${activeElement === 'wan' ? 'animate-spin-slow' : ''}`} />}
              <span className="font-black text-lg tracking-tight">{extras?.hasAirGap ? 'Isolated Network' : 'Corporate WAN'}</span>
            </div>
            {!extras?.hasAirGap && <div className="text-[9px] font-bold uppercase tracking-tighter opacity-60">Uplink: {specs.networkSpeedGb} Gbps</div>}
          </div>
          <div className={`h-10 w-0.5 transition-colors duration-500 ${activeElement === 'wan' ? 'bg-blue-400' : 'bg-slate-200'}`}></div>
        </div>

        {/* Security / Middle Layer */}
        {(extras?.hasFirewall || extras?.hasProxy) && (
             <div className="flex gap-12 relative z-10 animate-fade-in mb-4">
                 {extras.hasFirewall && (
                     <div 
                        onMouseEnter={(e) => handleMouseEnter(e, 'fw', "Network Firewall", [
                            { label: "Policy", value: "Stateful L7" },
                            { label: "Inbound", value: "Blocked" },
                            { label: "Outbound", value: "TCP:443, 6443" }
                        ])}
                        onMouseLeave={clearHover}
                        className={`bg-red-50 border-2 text-red-700 px-8 py-3.5 rounded-2xl flex flex-col items-center shadow-lg cursor-help transition-all ${activeElement === 'fw' ? 'scale-110 border-red-400 ring-4 ring-red-50' : 'border-red-200'}`}
                     >
                         <Shield className="w-6 h-6 mb-1.5" />
                         <span className="text-[10px] font-black uppercase tracking-widest">Firewall</span>
                     </div>
                 )}
                 {extras.hasProxy && (
                     <div 
                        onMouseEnter={(e) => handleMouseEnter(e, 'proxy', "HTTP/HTTPS Proxy", [
                            { label: "Protocol", value: "Connect" },
                            { label: "Endpoint", value: networkSpecs?.httpProxy || 'Pending Configuration' }
                        ])}
                        onMouseLeave={clearHover}
                        className={`bg-orange-50 border-2 text-orange-700 px-8 py-3.5 rounded-2xl flex flex-col items-center shadow-lg cursor-help transition-all ${activeElement === 'proxy' ? 'scale-110 border-orange-400 ring-4 ring-orange-50' : 'border-orange-200'}`}
                     >
                         <Shuffle className="w-6 h-6 mb-1.5" />
                         <span className="text-[10px] font-black uppercase tracking-widest">Proxy Gateway</span>
                     </div>
                 )}
                 <div className={`absolute top-0 bottom-0 left-1/2 w-0.5 -z-10 transition-colors duration-500 ${activeElement ? 'bg-slate-400' : 'bg-slate-200'}`}></div>
             </div>
        )}

        {/* Layer 2: Management Fabric & VIP */}
        <div className="flex items-start justify-center gap-12 w-full">
            <div className="relative flex flex-col items-center w-full max-w-2xl">
                <div 
                  onMouseEnter={(e) => handleMouseEnter(e, 'fabric', "Management Network Fabric", [
                    { label: "Cluster VIP", value: networkSpecs?.clusterVip || 'Não Definido' },
                    { label: "CIDR Range", value: networkSpecs?.managementCidr || 'Pendente' },
                    { label: "VLAN ID", value: networkSpecs?.vlanId || 'Native' },
                    { label: "Availability", value: specs.nodeCount >= 3 ? 'High' : 'Standard' }
                  ])}
                  onMouseLeave={clearHover}
                  className={`bg-slate-900 text-white py-6 px-12 rounded-[2.5rem] text-center shadow-xl w-full z-20 border-b-8 transition-all duration-300 cursor-help group ${activeElement === 'fabric' ? 'border-suse-base shadow-suse-base/20 -translate-y-1' : 'border-slate-800'}`}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-5">
                            <div className={`p-4 rounded-2xl transition-all duration-500 ${networkSpecs?.clusterVip ? 'bg-suse-base text-white shadow-[0_0_20px_rgba(48,186,120,0.3)]' : 'bg-slate-800 text-slate-500'}`}>
                                <Network className={`w-8 h-8 ${activeElement === 'fabric' ? 'scale-110' : ''}`} /> 
                            </div>
                            <div className="text-left">
                                <span className="font-black text-xl block tracking-tight uppercase">Management Fabric</span>
                                <span className="text-xs text-suse-light font-mono opacity-80 flex items-center gap-2">
                                    <Zap className="w-3 h-3" /> VIP: {networkSpecs?.clusterVip || '0.0.0.0'}
                                </span>
                            </div>
                        </div>
                        <div className="hidden lg:flex items-center gap-4">
                            <div className="flex flex-col items-end">
                                <span className="text-[9px] text-slate-500 font-bold uppercase">Fabric Status</span>
                                <span className="text-xs font-bold text-suse-base flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3" /> Operational
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Visual Connector Logic */}
                <div className={`absolute left-[10%] right-[10%] top-full h-10 border-l-2 border-r-2 border-t-2 rounded-t-3xl transition-colors duration-500 ${activeElement === 'fabric' ? 'border-suse-base' : 'border-slate-200'}`}></div>
                <div className={`absolute left-1/2 -translate-x-1/2 top-full h-10 w-0.5 transition-colors duration-500 ${activeElement === 'fabric' ? 'bg-suse-base' : 'bg-slate-200'}`}></div>
            </div>

            {/* Side Services */}
            {hasExtras && (
                <div className="flex flex-col gap-3 mt-2 animate-fade-in border-l-2 border-dashed border-slate-200 pl-8 transition-opacity duration-300">
                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">External Systems</div>
                    {extras.hasRancher && (
                        <div 
                          onMouseEnter={(e) => handleMouseEnter(e, 'rancher', "Upstream Rancher Manager", [{ label: "Protocol", value: "HTTPS/443" }, { label: "State", value: "External" }])}
                          onMouseLeave={clearHover}
                          className="flex items-center gap-3 text-[10px] font-bold bg-blue-50 border border-blue-100 text-blue-800 py-2.5 px-4 rounded-xl shadow-sm cursor-help hover:bg-blue-100 transition-all hover:scale-105"
                        >
                            <Cloud className="w-4 h-4" /> Rancher Manager
                        </div>
                    )}
                    {extras.hasExternalStorage && (
                        <div 
                          onMouseEnter={(e) => handleMouseEnter(e, 'storage', "Backup Target", [{ label: "Mode", value: "S3 / NFS" }, { label: "Storage", value: "Persistent" }])}
                          onMouseLeave={clearHover}
                          className="flex items-center gap-3 text-[10px] font-bold bg-purple-50 border border-purple-100 text-purple-800 py-2.5 px-4 rounded-xl shadow-sm cursor-help hover:bg-purple-100 transition-all hover:scale-105"
                        >
                            <Database className="w-4 h-4" /> External Storage
                        </div>
                    )}
                </div>
            )}
        </div>

        {/* Layer 3: Physical Compute Nodes */}
        <div className="flex justify-center gap-8 w-full px-4 pt-10">
          {displayNodes.map((node, i) => (
            <div key={i} className="relative">
              <div className={`absolute left-1/2 -translate-x-1/2 -top-10 h-10 w-0.5 transition-colors duration-500 ${activeElement === `node-${i}` || activeElement === 'fabric' ? 'bg-suse-base' : 'bg-slate-200'}`}></div>
              
              <div 
                onMouseEnter={(e) => handleMouseEnter(e, `node-${i}`, `Node ${i + 1}: ${node.name}`, [
                  { label: "IP Address", value: node.ip || 'Pendente' },
                  { label: "Cluster Role", value: i === 0 ? 'Bootstrap / Master' : 'Worker / Data' },
                  { label: "Specs", value: `${specs.cpuCores}vCPU / ${specs.ramGb}GB` },
                  { label: "Management", value: i === 0 ? 'API Server' : 'Kubelet' }
                ])}
                onMouseLeave={clearHover}
                className={`border-2 rounded-[2rem] p-6 w-56 shadow-lg transition-all duration-300 relative z-10 bg-white group cursor-help hover:shadow-2xl hover:-translate-y-2 ${activeElement === `node-${i}` ? 'border-suse-base ring-8 ring-suse-base/5' : i === 0 ? 'border-purple-200' : 'border-slate-100 hover:border-suse-base'}`}
              >
                <div className={`absolute -top-3 -right-3 text-white text-[10px] font-black w-9 h-9 flex items-center justify-center rounded-2xl shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform ${i === 0 ? 'bg-purple-600' : 'bg-suse-dark'}`}>
                  #{i + 1}
                </div>
                
                <div className="flex justify-center mb-5">
                  <div className={`p-5 rounded-2xl transition-all duration-500 ${i === 0 ? 'bg-purple-50 text-purple-600' : 'bg-emerald-50 text-suse-base'} ${activeElement === `node-${i}` ? 'scale-110 shadow-inner' : ''}`}>
                    <Server className="w-10 h-10" />
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <div className="font-black text-gray-800 text-sm tracking-tight truncate px-2" title={node.name}>{node.name}</div>
                  <div className={`text-[10px] font-mono py-1.5 px-3 rounded-xl border flex items-center justify-center gap-2 ${node.ip ? 'text-blue-600 bg-blue-50 border-blue-100' : 'text-amber-600 bg-amber-50 border-amber-100 animate-pulse'}`}>
                    {node.ip ? node.ip : <><AlertCircle className="w-3 h-3" /> Pending IP</>}
                  </div>
                  
                  {viewMode === 'physical' && (
                    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100 mt-2">
                        <div className="flex flex-col items-center">
                            <Cpu className="w-3.5 h-3.5 text-slate-300 mb-1" />
                            <span className="text-[9px] font-black text-slate-500 uppercase">{specs.cpuCores} vCPU</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <HardDrive className="w-3.5 h-3.5 text-slate-300 mb-1" />
                            <span className="text-[9px] font-black text-slate-500 uppercase">{specs.ramGb} GB</span>
                        </div>
                    </div>
                  )}
                  
                  {viewMode === 'logical' && (
                    <div className="pt-2">
                        <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${i === 0 ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-500'}`}>
                            {i === 0 ? 'Master Node' : 'Worker Node'}
                        </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {remainingNodes > 0 && (
             <div className="relative">
               <div className={`absolute left-1/2 -translate-x-1/2 -top-10 h-10 w-0.5 transition-colors duration-500 ${activeElement === 'fabric' ? 'bg-suse-base' : 'bg-slate-200'}`}></div>
               <div 
                  onMouseEnter={(e) => handleMouseEnter(e, 'nodes-extra', `${remainingNodes} Additional Nodes`, [
                    { label: "Configuration", value: "Uniform" },
                    { label: "Total Cluster", value: `${specs.nodeCount} Servers` }
                  ])}
                  onMouseLeave={clearHover}
                  className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] p-6 w-52 h-full flex flex-col items-center justify-center text-slate-400 cursor-help hover:bg-slate-100 hover:border-slate-300 transition-all shadow-sm"
                >
                 <div className="relative mb-3">
                    <Server className="w-12 h-12 opacity-20" />
                    <Zap className="w-5 h-5 text-suse-base absolute -bottom-1 -right-1" />
                 </div>
                 <span className="font-black text-sm text-slate-600">+{remainingNodes} Physical Nodes</span>
                 <div className="flex items-center gap-1 mt-1 opacity-50">
                    <CheckCircle2 className="w-3 h-3" />
                    <span className="text-[8px] font-bold uppercase tracking-widest">HA Scale Ready</span>
                 </div>
               </div>
             </div>
          )}
        </div>

        {/* Distributed Persistence Layer */}
        <div className={`w-full max-w-4xl mt-12 bg-slate-900 rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl relative overflow-hidden transition-all duration-700 ${activeElement === 'storage' ? 'ring-8 ring-purple-500/10' : ''}`}>
           <div className="absolute -top-10 -right-10 opacity-5 pointer-events-none">
              <Database className="w-64 h-64" />
           </div>
           <div className="flex items-center gap-8 z-10">
              <div className="p-6 bg-suse-base rounded-3xl shadow-2xl shadow-suse-base/40 group-hover:scale-110 transition-transform">
                <Database className="w-12 h-12 text-white" />
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-2xl leading-tight tracking-tight">Longhorn SDS Fabric</h4>
                <p className="text-xs text-slate-400 max-w-sm leading-relaxed font-medium">Hyper-converged distributed block storage with real-time synchronous replication across {specs.nodeCount} nodes.</p>
              </div>
           </div>
           <div className="text-right flex flex-col items-end gap-1 z-10 shrink-0">
              <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1 bg-white/5 px-2 py-0.5 rounded">Total Cluster Capacity</span>
              <span className="text-5xl font-black text-suse-light tracking-tighter">~{(specs.diskGb * specs.nodeCount).toLocaleString()} GB</span>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-2 text-[10px] text-white font-bold bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                    <Activity className="w-3 h-3 text-suse-base" /> Self-Healing
                </div>
                <div className="flex items-center gap-2 text-[10px] text-white font-bold bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                    <Zap className="w-3 h-3 text-suse-base" /> {specs.diskType} Engine
                </div>
              </div>
           </div>
        </div>

        {/* Diagram Footer */}
        <div className="pt-6 flex items-center justify-between w-full border-t border-slate-100 mt-4 px-2">
            <div className="flex items-center gap-6 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                    <CheckCircle2 className="w-3 h-3" /> SUSE HCI Validated
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                    <CheckCircle2 className="w-3 h-3" /> Harvester v1.7.0
                </div>
            </div>
            <div className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.2em]">Generated Infrastructure Topology</div>
        </div>
      </div>
    </div>
  );
};
