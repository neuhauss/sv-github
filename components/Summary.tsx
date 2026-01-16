import React, { useState } from 'react';
import { POCData, HardwareSpecs, NetworkSpecs, CloudInitConfig } from '../types';
// Add missing Zap icon to imports
import { CheckCircle, Download, RotateCcw, Server, Activity, Network, HardDrive, Cpu, FileCode, FileJson, Calendar, User, Building, Mail, Phone, MessageSquare, Copy, X, ShieldCheck, PenTool, Zap } from 'lucide-react';
import { Button } from './ui/Button';
import { InfraDiagram } from './InfraDiagram';

interface Props {
  pocData: POCData;
  specs: HardwareSpecs;
  netSpecs: NetworkSpecs;
  cloudInitConfig: CloudInitConfig;
  onReset: () => void;
}

export const Summary: React.FC<Props> = ({ pocData, specs, netSpecs, cloudInitConfig, onReset }) => {
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handlePrint = () => {
    setTimeout(() => window.print(), 100);
  };

  const handleExportJson = () => {
    const exportData = {
      pocData,
      hardwareSpecs: specs,
      networkSpecs: netSpecs,
      cloudInitConfig,
      exportDate: new Date().toISOString()
    };
    
    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    const filename = pocData.projectName 
      ? `${pocData.projectName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-config.json` 
      : 'suse-poc-config.json';
      
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const generateAiPrompt = () => {
    return `Você é um Arquiteto de Soluções Sênior auxiliando em uma Prova de Conceito (POC) do SUSE Virtualization.
Aqui está o contexto completo da configuração atual. Use esses dados para me ajudar com documentação ou próximos passos.

--- CONTEXTO DO PROJETO ---
Nome: ${pocData.projectName || 'N/A'}
Cliente: ${pocData.clientOrganization || 'N/A'}
Lead: ${pocData.leadEngineer}
Metas selecionadas:
${pocData.goals.map(g => `- ${g}`).join('\n')}

--- ESPECIFICAÇÕES TÉCNICAS ---
Nós: ${specs.nodeCount} | CPU: ${specs.cpuCores} | RAM: ${specs.ramGb}GB | Disco: ${specs.diskGb}GB (${specs.diskType})
VIP: ${netSpecs.clusterVip} | Rede: ${netSpecs.managementCidr} | VLAN: ${netSpecs.vlanId || 'Padrão'}

--- SOLICITAÇÃO ---
Com base nesta arquitetura de HCI, por favor [INSIRA SUA PERGUNTA AQUI].`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateAiPrompt());
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const currentDate = new Date().toLocaleDateString('pt-BR');

  const renderValue = (value: string | number | undefined, placeholder: string = "Não especificado") => {
      if (value === undefined || value === null || value === '' || (typeof value === 'number' && isNaN(value))) {
          return <span className="text-gray-400 italic text-sm font-normal print:text-gray-500">({placeholder})</span>;
      }
      return value;
  };

  return (
    <>
      <style>
        {`
          @media print {
            @page { margin: 15mm; size: auto; }
            body { background-color: white !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
            header, footer, .no-print { display: none !important; }
            .print-container { width: 100% !important; max-width: none !important; box-shadow: none !important; border: none !important; margin: 0 !important; padding: 0 !important; }
            .print-grid { display: grid !important; grid-template-columns: repeat(2, 1fr) !important; gap: 2rem !important; }
            .break-after { page-break-after: always; }
          }
        `}
      </style>
      
      {/* AI Prompt Modal */}
      {showPromptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in no-print">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center p-4 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <MessageSquare className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800">Exportar Contexto para AI</h3>
                            <p className="text-xs text-gray-500">Copie este prompt para o ChatGPT ou Claude.</p>
                        </div>
                    </div>
                    <button onClick={() => setShowPromptModal(false)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>
                
                <div className="p-4 flex-1 overflow-hidden flex flex-col">
                    <div className="relative flex-1 border border-gray-200 rounded-lg bg-gray-50">
                        <textarea 
                            readOnly
                            className="w-full h-full p-4 text-xs font-mono text-gray-700 bg-transparent resize-none focus:outline-none"
                            value={generateAiPrompt()}
                        />
                        <div className="absolute top-2 right-2">
                            <button 
                                onClick={copyToClipboard}
                                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded shadow-sm transition-all ${copySuccess ? 'bg-green-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'}`}
                            >
                                {copySuccess ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                {copySuccess ? 'Copiado!' : 'Copiar Texto'}
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="p-4 bg-gray-50 border-t border-gray-100 rounded-b-xl flex justify-end">
                    <Button variant="secondary" onClick={() => setShowPromptModal(false)}>Fechar</Button>
                </div>
            </div>
        </div>
      )}

      <div className="print-container bg-white p-10 rounded-2xl shadow-xl border-t-8 border-suse-base animate-fade-in print:animate-none max-w-5xl mx-auto">
        
        {/* Print Header */}
        <div className="hidden print:flex justify-between items-center mb-12 border-b-2 border-slate-100 pb-6">
            <div className="flex items-center gap-3 text-suse-dark">
               <div className="p-2 bg-suse-base rounded-lg"><Server className="w-8 h-8 text-white" /></div>
               <div>
                  <div className="text-2xl font-black uppercase tracking-tight">SUSE Virtualization</div>
                  <div className="text-[10px] font-bold text-suse-base uppercase tracking-widest">Relatório de Planejamento de POC</div>
               </div>
            </div>
            <div className="text-right">
               <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Data de Geração</div>
               <div className="text-sm font-bold text-slate-700">{currentDate}</div>
            </div>
        </div>

        <div className="text-center mb-12 print:text-left print:mb-10">
          <div className="mx-auto w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 print:hidden">
            <ShieldCheck className="w-12 h-12 text-suse-base" />
          </div>
          <h2 className="text-4xl font-black text-suse-dark mb-3 print:text-3xl print:text-black">
              {renderValue(pocData.projectName, "Projeto Sem Nome")}
          </h2>
          <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto print:mx-0 print:text-gray-700">
            Resumo Executivo da Infraestrutura Hyper-Converged (HCI) v1.7
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 print-grid">
           <div className="md:col-span-2 bg-slate-50 p-6 rounded-2xl border border-slate-100 print:bg-white print:border-slate-200">
              <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-200 pb-3 uppercase text-xs tracking-widest">
                  <Activity className="w-4 h-4 text-blue-500"/> Stakeholders & Cronograma
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                     <div className="group">
                        <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Engenheiro Responsável</div>
                        <div className="font-bold text-slate-900">{renderValue(pocData.leadEngineer)}</div>
                        <div className="text-xs text-blue-600 font-medium">{renderValue(pocData.leadEmail)}</div>
                     </div>
                     <div className="group">
                        <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Cliente / Organização</div>
                        <div className="font-bold text-slate-900">{renderValue(pocData.clientOrganization)}</div>
                        <div className="text-xs text-slate-500">{renderValue(pocData.clientContactName)}</div>
                     </div>
                  </div>
                  <div className="space-y-4">
                      <div className="bg-white p-4 rounded-xl border border-slate-200 print:border-slate-300">
                         <div className="flex justify-between items-center mb-2">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Início Previsto</span>
                            <span className="text-xs font-bold text-slate-700">{renderValue(pocData.startDate)}</span>
                         </div>
                         <div className="flex justify-between items-center">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Meta de Conclusão</span>
                            <span className="text-xs font-bold text-suse-base">{renderValue(pocData.targetDate)}</span>
                         </div>
                      </div>
                  </div>
              </div>
           </div>
           
           <div className="bg-suse-dark text-white p-6 rounded-2xl shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -top-6 -right-6 opacity-10"><Zap className="w-32 h-32" /></div>
              <h3 className="font-bold text-suse-light flex items-center gap-2 uppercase text-[10px] tracking-widest mb-4">
                  <Server className="w-4 h-4"/> Hardware Total
              </h3>
              <div className="space-y-4 relative z-10">
                  <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Total de Nós</div>
                      <div className="text-3xl font-black text-white">{specs.nodeCount} Servidores</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white/5 p-2 rounded-lg border border-white/10 text-center">
                          <div className="text-[8px] text-slate-500 font-black uppercase">vCPU</div>
                          <div className="text-sm font-bold">{specs.cpuCores * specs.nodeCount}</div>
                      </div>
                      <div className="bg-white/5 p-2 rounded-lg border border-white/10 text-center">
                          <div className="text-[8px] text-slate-500 font-black uppercase">RAM</div>
                          <div className="text-sm font-bold">{specs.ramGb * specs.nodeCount}GB</div>
                      </div>
                  </div>
              </div>
           </div>
        </div>

        {/* Technical Detail Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 print-grid">
            <div className="space-y-6">
                <h3 className="font-bold text-slate-800 border-b-2 border-slate-100 pb-3 flex items-center gap-2 text-sm uppercase tracking-widest">
                    <Network className="w-5 h-5 text-suse-base"/> Configurações de Rede
                </h3>
                <div className="grid grid-cols-1 gap-3">
                    {[
                        { l: "Cluster VIP", v: netSpecs.clusterVip, m: true },
                        { l: "Management CIDR", v: netSpecs.managementCidr },
                        { l: "Default Gateway", v: netSpecs.gatewayIp },
                        { l: "VLAN ID", v: netSpecs.vlanId || "Padrão / Untagged" },
                        { l: "Servidores DNS", v: netSpecs.dnsServers },
                    ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center py-2 border-b border-slate-50">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter">{item.l}</span>
                            <span className={`text-sm font-mono ${item.m ? 'font-black text-suse-base' : 'text-slate-700'}`}>{renderValue(item.v)}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-6">
                <h3 className="font-bold text-slate-800 border-b-2 border-slate-100 pb-3 flex items-center gap-2 text-sm uppercase tracking-widest">
                    <FileCode className="w-5 h-5 text-suse-base"/> Sistema Operacional & Cloud-Init
                </h3>
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 print:bg-white print:border-slate-200 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Usuário Default</div>
                            <div className="text-sm font-mono font-bold text-slate-700">{renderValue(cloudInitConfig.user, "opensuse")}</div>
                        </div>
                        <div>
                            <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Timezone</div>
                            <div className="text-sm font-mono font-bold text-slate-700">{renderValue(cloudInitConfig.timezone, "UTC")}</div>
                        </div>
                    </div>
                    <div>
                        <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Pacotes Adicionais</div>
                        <div className="text-[10px] font-mono text-slate-600 bg-white p-2 rounded border border-slate-200">
                            {cloudInitConfig.packages.length > 0 ? cloudInitConfig.packages.join(', ') : 'Nenhum'}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Diagram (Force new page on print if needed) */}
        <div className="mb-12 print:break-inside-avoid">
          <h3 className="font-bold text-slate-800 mb-6 border-b-2 border-slate-100 pb-3 text-sm uppercase tracking-widest">Diagrama de Topologia Planejada</h3>
          <div className="bg-slate-50 rounded-3xl p-8 print:bg-white print:border print:border-slate-200">
            <div className="transform scale-90 origin-top-left">
                <InfraDiagram specs={specs} networkSpecs={netSpecs} projectName={pocData.projectName} />
            </div>
          </div>
        </div>

        {/* Goals / Success Criteria */}
        <div className="mb-12 print:break-inside-avoid">
           <h3 className="font-bold text-slate-800 mb-6 border-b-2 border-slate-100 pb-3 text-sm uppercase tracking-widest">Critérios de Sucesso (Objetivos da POC)</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
               {pocData.goals.length > 0 ? pocData.goals.map((g, i) => (
                   <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs font-bold text-slate-700">
                       <CheckCircle className="w-4 h-4 text-suse-base shrink-0" />
                       {g}
                   </div>
               )) : (
                   <div className="col-span-2 italic text-slate-400 text-sm p-8 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                       Nenhum objetivo específico definido para este projeto.
                   </div>
               )}
           </div>
        </div>

        {/* Signature Sign-off */}
        <div className="mt-20 pt-12 border-t-2 border-slate-100 print:break-inside-avoid">
            <h3 className="font-bold text-slate-800 mb-10 text-center uppercase tracking-widest text-sm">Formalização e Aceite do Plano de POC</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 px-10">
                <div className="text-center space-y-4">
                    <div className="h-px bg-slate-300 w-full mb-2"></div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Responsável Técnico (SUSE/Parceiro)</div>
                    <div className="text-xs font-bold text-slate-700">{pocData.leadEngineer}</div>
                </div>
                <div className="text-center space-y-4">
                    <div className="h-px bg-slate-300 w-full mb-2"></div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Aprovação Cliente ({pocData.clientOrganization})</div>
                    <div className="text-xs font-bold text-slate-700">{pocData.clientContactName || 'Representante Autorizado'}</div>
                </div>
            </div>
            <div className="mt-12 text-center text-[10px] text-slate-400 font-medium italic">
                Documento gerado eletronicamente via SUSE Virtualization Enterprise Planner. 
                Válido como planejamento técnico de arquitetura HCI v1.7.
            </div>
        </div>

        {/* Footer Buttons (Hidden in Print) */}
        <div className="flex flex-wrap justify-center gap-4 print:hidden mt-16 border-t pt-10">
          <Button variant="outline" onClick={onReset} className="rounded-xl px-6 py-3 border-slate-200 text-slate-600 hover:bg-slate-50">
            <RotateCcw className="w-4 h-4 mr-2" /> Novo Planejamento
          </Button>
          <Button variant="secondary" onClick={handleExportJson} className="rounded-xl px-6 py-3 bg-slate-800">
            <FileJson className="w-4 h-4 mr-2" /> Exportar JSON
          </Button>
          <Button variant="secondary" onClick={() => setShowPromptModal(true)} className="rounded-xl px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white border-none shadow-lg shadow-purple-200">
            <MessageSquare className="w-4 h-4 mr-2" /> Contexto para IA
          </Button>
          <Button onClick={handlePrint} className="rounded-xl px-8 py-3 bg-suse-dark shadow-xl hover:scale-105 transition-all">
            <Download className="w-4 h-4 mr-2" /> Imprimir Relatório / PDF
          </Button>
        </div>
      </div>
    </>
  );
};
