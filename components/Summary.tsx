
import React, { useState } from 'react';
import { POCData, HardwareSpecs, NetworkSpecs, CloudInitConfig, Language } from '../types';
import { Download, RotateCcw, Server, Activity, Network, FileCode, FileJson, Zap, ShieldCheck, MessageSquare, X, Copy, CheckCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { InfraDiagram } from './InfraDiagram';
import { translations } from '../i18n';

interface Props {
  lang: Language;
  pocData: POCData;
  specs: HardwareSpecs;
  netSpecs: NetworkSpecs;
  cloudInitConfig: CloudInitConfig;
  onReset: () => void;
}

export const Summary: React.FC<Props> = ({ lang, pocData, specs, netSpecs, cloudInitConfig, onReset }) => {
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const t = translations[lang];

  const handlePrint = () => setTimeout(() => window.print(), 100);

  const generateAiPrompt = () => {
    return `${t.summary.aiPromptHeader}

--- ${lang === 'en' ? "PROJECT CONTEXT" : lang === 'pt' ? "CONTEXTO DO PROJETO" : "CONTEXTO DEL PROYECTO"} ---
${lang === 'en' ? "Name" : lang === 'pt' ? "Nome" : "Nombre"}: ${pocData.projectName || 'N/A'}
${lang === 'en' ? "Organization" : lang === 'pt' ? "Cliente" : "Cliente"}: ${pocData.clientOrganization || 'N/A'}
Lead: ${pocData.leadEngineer}

--- ${lang === 'en' ? "TECH SPECS" : "ESPECIFICAÇÕES"} ---
Nodes: ${specs.nodeCount} | CPU: ${specs.cpuCores} | RAM: ${specs.ramGb}GB
VIP: ${netSpecs.clusterVip} | CIDR: ${netSpecs.managementCidr}

--- ${lang === 'en' ? "REQUEST" : "SOLICITAÇÃO"} ---
${lang === 'en' ? "Based on this HCI architecture, please help me with..." : "Com base nesta arquitetura HCI, ajude-me com..."}`;
  };

  return (
    <div className="print-container bg-white p-10 rounded-2xl shadow-xl border-t-8 border-suse-base max-w-5xl mx-auto animate-fade-in">
      {/* Modal Prompt AI */}
      {showPromptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm no-print">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl flex flex-col p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2"><MessageSquare className="w-5 h-5 text-purple-600" /> {t.summary.aiTitle}</h3>
                    <button onClick={() => setShowPromptModal(false)}><X className="w-5 h-5" /></button>
                </div>
                <textarea readOnly className="w-full h-48 p-4 text-xs font-mono bg-gray-50 border rounded-lg resize-none" value={generateAiPrompt()} />
                <div className="mt-4 flex justify-end gap-3">
                    <button onClick={() => { navigator.clipboard.writeText(generateAiPrompt()); setCopySuccess(true); setTimeout(() => setCopySuccess(false), 2000); }} className="px-4 py-2 bg-suse-base text-white rounded-lg text-xs font-bold">
                        {copySuccess ? t.common.copied : t.common.copy}
                    </button>
                    <button onClick={() => setShowPromptModal(false)} className="px-4 py-2 bg-gray-100 rounded-lg text-xs font-bold">Close</button>
                </div>
            </div>
        </div>
      )}

      <div className="text-center mb-12 print:text-left">
        <ShieldCheck className="mx-auto w-16 h-16 text-suse-base mb-4 print:hidden" />
        <h2 className="text-3xl font-black text-suse-dark">{pocData.projectName || "HCI v1.7 POC"}</h2>
        <p className="text-gray-500 font-medium">{t.summary.execSummary}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
           <h3 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-500" /> {t.summary.stakeholders}
           </h3>
           <div className="space-y-4">
              <div><div className="text-[9px] font-black uppercase text-slate-400">Lead</div><div className="font-bold">{pocData.leadEngineer}</div></div>
              <div><div className="text-[9px] font-black uppercase text-slate-400">{t.pocDetails.clientOrg}</div><div className="font-bold">{pocData.clientOrganization}</div></div>
           </div>
        </div>
        <div className="bg-suse-dark text-white p-6 rounded-2xl shadow-xl flex flex-col justify-center">
           <div className="text-[10px] text-slate-400 font-bold uppercase">{lang === 'en' ? "Infrastructure Capacity" : "Capacidade Infra"}</div>
           <div className="text-4xl font-black">{specs.nodeCount} {lang === 'en' ? "Nodes" : "Nós"}</div>
           <div className="mt-2 text-xs text-suse-light">{specs.cpuCores * specs.nodeCount} vCPU | {specs.ramGb * specs.nodeCount}GB RAM</div>
        </div>
      </div>

      <div className="mb-12">
          <h3 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-6">{t.summary.topology}</h3>
          <div className="bg-slate-50 rounded-3xl p-8 border border-gray-100 flex justify-center">
              <div className="scale-90 transform origin-center">
                <InfraDiagram specs={specs} networkSpecs={netSpecs} projectName={pocData.projectName} />
              </div>
          </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 no-print mt-12 pt-8 border-t">
          <Button variant="outline" onClick={onReset} className="rounded-xl px-6 py-3"><RotateCcw className="w-4 h-4 mr-2" /> {t.common.newProject}</Button>
          <Button variant="secondary" onClick={() => setShowPromptModal(true)} className="bg-purple-600 border-none"><MessageSquare className="w-4 h-4 mr-2" /> {t.common.aiContext}</Button>
          <Button onClick={handlePrint} className="bg-suse-dark shadow-xl"><Download className="w-4 h-4 mr-2" /> {t.common.print}</Button>
      </div>
    </div>
  );
};
