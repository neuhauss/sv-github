import React, { useState } from 'react';
import { HardwareSpecs, POCData, NetworkSpecs, ArchitectureExtras } from '../types';
import { InfraDiagram } from './InfraDiagram';
// Add missing Zap icon to imports
import { CheckCircle, Sliders, Shield, Shuffle, Database, Cloud, Laptop, Lock, Clock, Info, Eye, Layers, Zap } from 'lucide-react';

interface Props {
  specs: HardwareSpecs;
  pocData: POCData;
  netSpecs: NetworkSpecs;
}

export const ArchitecturePreview: React.FC<Props> = ({ specs, pocData, netSpecs }) => {
  const [extras, setExtras] = useState<ArchitectureExtras>({
    hasFirewall: netSpecs.hasFirewall,
    hasProxy: netSpecs.hasProxy,
    hasAirGap: netSpecs.hasAirGap,
    hasRancher: netSpecs.hasRancher,
    hasExternalStorage: netSpecs.hasExternalStorage,
    hasBastion: false,
    hasNTP: true,
  });

  const toggle = (key: keyof ArchitectureExtras) => {
    setExtras(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <div className="mb-8">
            <h2 className="text-3xl font-black text-suse-dark flex items-center gap-3">
              <Eye className="w-8 h-8 text-suse-base" />
              Visualização da Topologia
            </h2>
            <p className="text-gray-500 mt-2">
              Confirme a arquitetura lógica e física antes de prosseguir para a instalação. 
              Adicione componentes Enterprise para refletir o ambiente real do datacenter.
            </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Control Panel */}
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-200">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                        <Sliders className="w-3.5 h-3.5" /> Componentes de Rede
                    </h3>
                    
                    <div className="space-y-3">
                        {[
                            { id: 'hasFirewall', label: 'External Firewall', icon: Shield, color: 'text-red-500' },
                            { id: 'hasAirGap', label: 'Air-Gapped Mode', icon: Lock, color: 'text-gray-700' },
                            { id: 'hasProxy', label: 'HTTP/HTTPS Proxy', icon: Shuffle, color: 'text-orange-500' },
                            { id: 'hasRancher', label: 'Upstream Rancher', icon: Cloud, color: 'text-blue-500' },
                            { id: 'hasExternalStorage', label: 'External S3/NFS', icon: Database, color: 'text-purple-500' },
                            { id: 'hasBastion', label: 'Bastion / Jump', icon: Laptop, color: 'text-slate-600' },
                            { id: 'hasNTP', label: 'Local NTP', icon: Clock, color: 'text-emerald-500' },
                        ].map((item) => (
                            <div 
                              key={item.id}
                              className={`flex items-center justify-between p-3.5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${extras[item.id as keyof ArchitectureExtras] ? 'bg-white border-suse-base shadow-lg scale-105' : 'bg-transparent border-transparent opacity-50 grayscale hover:opacity-100 hover:grayscale-0'}`}
                              onClick={() => toggle(item.id as keyof ArchitectureExtras)}
                            >
                                <div className="flex items-center gap-3 text-xs font-black text-slate-800">
                                    <item.icon className={`w-4 h-4 ${item.color}`} /> {item.label}
                                </div>
                                <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${extras[item.id as keyof ArchitectureExtras] ? 'bg-suse-base' : 'bg-slate-300'}`}>
                                    <div className={`w-3 h-3 bg-white rounded-full shadow-md transform transition-transform ${extras[item.id as keyof ArchitectureExtras] ? 'translate-x-4' : 'translate-x-0'}`}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-5 bg-blue-50 border border-blue-100 rounded-2xl space-y-3">
                    <h4 className="text-[10px] font-black text-blue-800 uppercase tracking-widest flex items-center gap-2">
                        <Info className="w-3.5 h-3.5" /> Dica de v1.7
                    </h4>
                    <p className="text-[10px] text-blue-700 leading-relaxed font-medium">
                        Ambientes Air-Gapped exigem a configuração de um repositório local e proxy HTTPS durante o bootstrap para download das imagens do Harvester.
                    </p>
                </div>
            </div>

            {/* Diagram Area */}
            <div className="lg:col-span-3 flex flex-col gap-6">
                <div className="flex-1 flex justify-center py-10 bg-slate-900 rounded-[3rem] border-8 border-slate-800 relative overflow-hidden shadow-2xl group">
                    <div className="absolute top-6 left-8 z-20 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-suse-base animate-pulse"></div>
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Visualizador em Tempo Real</span>
                    </div>
                    <div className="scale-90 transform origin-center transition-all duration-700 group-hover:scale-95">
                        <InfraDiagram specs={specs} projectName={pocData.projectName} networkSpecs={netSpecs} extras={extras} />
                    </div>
                    <div className="absolute bottom-6 right-8 opacity-20 group-hover:opacity-40 transition-opacity">
                        <Layers className="w-16 h-16 text-white" />
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100 flex gap-4 items-center">
                        <div className="p-3 bg-suse-base text-white rounded-xl shadow-lg shadow-suse-base/20"><CheckCircle className="w-6 h-6" /></div>
                        <div>
                            <div className="text-sm font-black text-emerald-900">Design Validado</div>
                            <div className="text-[10px] text-emerald-700 font-medium">A topologia atende aos requisitos de HA para Harvester v1.7.</div>
                        </div>
                    </div>
                    <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex gap-4 items-center">
                        <div className="p-3 bg-slate-800 text-suse-base rounded-xl"><Zap className="w-6 h-6" /></div>
                        <div>
                            <div className="text-sm font-black text-white">Pronto para Datacenter</div>
                            <div className="text-[10px] text-slate-400 font-medium">Configuração compatível com switches Trunk 802.1Q.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
