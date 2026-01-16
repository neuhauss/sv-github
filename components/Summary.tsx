
import React, { useState } from 'react';
import { POCData, HardwareSpecs, NetworkSpecs, CloudInitConfig, Language } from '../types';
// Fixed: Added CheckSquare to the import list from lucide-react
import { Download, RotateCcw, Server, Activity, Network, FileCode, FileJson, Zap, ShieldCheck, MessageSquare, X, Copy, CheckCircle, Package, Terminal, Target, CheckSquare } from 'lucide-react';
import { Button } from './ui/Button';
import { InfraDiagram } from './InfraDiagram';
import { translations } from '../i18n';

interface Props {
  lang: Language;
  pocData: POCData;
  specs: HardwareSpecs;
  netSpecs: NetworkSpecs;
  cloudInitConfig: CloudInitConfig;
  testResults: Record<string, 'pass' | 'fail' | 'pending'>;
  status: any;
  onReset: () => void;
}

export const Summary: React.FC<Props> = ({ lang, pocData, specs, netSpecs, cloudInitConfig, testResults, status, onReset }) => {
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const t = translations[lang];

  const handlePrint = () => setTimeout(() => window.print(), 100);

  const handleExportJson = () => {
    const fullState = {
      pocData,
      specs,
      netSpecs,
      cloudInitConfig,
      testResults,
      status,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(fullState, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `POC_${pocData.projectName.replace(/\s+/g, '_') || 'Report'}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

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

  const passCount = Object.values(testResults).filter(v => v === 'pass').length;
  const totalTests = pocData.goals.length;

  return (
    <div className="print-container bg-white p-10 rounded-2xl shadow-xl border-t-8 border-suse-base max-w-5xl mx-auto animate-fade-in pb-20">
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
        <h2 className="text-3xl font-black text-suse-dark uppercase tracking-tight">{pocData.projectName || "SUSE Virtualization POC Report"}</h2>
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
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-200">
                <div><div className="text-[9px] font-black uppercase text-slate-400">{t.pocDetails.startDate}</div><div className="text-xs font-bold">{pocData.startDate}</div></div>
                <div><div className="text-[9px] font-black uppercase text-slate-400">{t.pocDetails.targetDate}</div><div className="text-xs font-bold">{pocData.targetDate || 'TBD'}</div></div>
              </div>
           </div>
        </div>
        <div className="bg-suse-dark text-white p-6 rounded-2xl shadow-xl flex flex-col justify-center">
           <div className="text-[10px] text-slate-400 font-bold uppercase">{lang === 'en' ? "Infrastructure Capacity" : "Capacidade Infra"}</div>
           <div className="text-4xl font-black">{specs.nodeCount} {lang === 'en' ? "Nodes" : "Nós"}</div>
           <div className="mt-2 text-xs text-suse-light uppercase tracking-widest font-bold">
              {specs.cpuCores * specs.nodeCount} vCPU | {specs.ramGb * specs.nodeCount}GB RAM | {specs.diskType} Storage
           </div>
           <div className="mt-4 pt-4 border-t border-white/10 flex gap-4">
              <div className="flex-1">
                 <div className="text-[8px] text-white/50 uppercase font-bold">Cluster VIP</div>
                 <div className="text-[10px] font-mono">{netSpecs.clusterVip}</div>
              </div>
              <div className="flex-1">
                 <div className="text-[8px] text-white/50 uppercase font-bold">Management CIDR</div>
                 <div className="text-[10px] font-mono">{netSpecs.managementCidr}</div>
              </div>
           </div>
        </div>
      </div>

      <div className="mb-12">
          <h3 className="font-bold text-xs uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
            <Network className="w-4 h-4 text-suse-base" /> {t.summary.topology}
          </h3>
          <div className="bg-slate-50 rounded-3xl p-8 border border-gray-100 flex justify-center shadow-inner">
              <div className="scale-90 transform origin-center">
                <InfraDiagram specs={specs} networkSpecs={netSpecs} projectName={pocData.projectName} />
              </div>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Test results Summary */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200 space-y-4">
          <h3 className="font-bold text-xs uppercase tracking-widest text-gray-400 flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-amber-500" /> {t.nav.tests} Result Summary
          </h3>
          <div className="flex items-center gap-6">
            <div className={`w-24 h-24 rounded-full border-8 flex items-center justify-center font-black text-2xl ${passCount === totalTests ? 'border-suse-base text-suse-base' : 'border-amber-400 text-amber-600'}`}>
              {Math.round((passCount / (totalTests || 1)) * 100)}%
            </div>
            <div>
              <div className="text-xl font-black text-gray-800">{passCount} / {totalTests} {t.testPlan.summary.success}</div>
              <p className="text-xs text-gray-500">Success criteria validated against technical requirements.</p>
            </div>
          </div>
          <div className="pt-4 space-y-2">
            {pocData.goals.map((goal, i) => (
              <div key={i} className="flex items-center justify-between text-[10px] font-bold py-2 border-b border-gray-50 last:border-0">
                <span className="text-gray-600">{goal}</span>
                <span className={`px-2 py-0.5 rounded-full uppercase ${testResults[goal] === 'pass' ? 'bg-green-100 text-green-700' : testResults[goal] === 'fail' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-400'}`}>
                  {testResults[goal] || 'pending'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Automation & Config Summary */}
        <div className="bg-slate-900 p-6 rounded-3xl text-white space-y-4 shadow-xl">
          <h3 className="font-bold text-xs uppercase tracking-widest text-slate-500 flex items-center gap-2">
            <FileCode className="w-4 h-4 text-suse-base" /> {t.nav.automation} Summary
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
              <Terminal className="w-8 h-8 text-suse-base" />
              <div>
                <div className="text-xs font-bold">Default OS User</div>
                <div className="text-[10px] text-slate-400 font-mono">{cloudInitConfig.user} (sudo enabled)</div>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
              <Package className="w-8 h-8 text-blue-400" />
              <div>
                <div className="text-xs font-bold">Automation Packages</div>
                <div className="text-[10px] text-slate-400 font-mono">{cloudInitConfig.packages.join(', ') || 'Standard Core'}</div>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
              <Target className="w-8 h-8 text-amber-400" />
              <div>
                <div className="text-xs font-bold">Cluster Resource Manifests</div>
                <div className="text-[10px] text-slate-400">Harvester Virtualization CRDs generated for node provisioning.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print Footer */}
      <div className="mt-20 border-t-2 border-slate-100 pt-10 text-center space-y-4">
         <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em]">{t.summary.generatedBy}</p>
         <div className="flex justify-center gap-20 pt-10">
            <div className="w-64 border-t border-gray-300 pt-2 text-[10px] font-black uppercase tracking-widest text-gray-400">{t.summary.authorized} (SUSE)</div>
            <div className="w-64 border-t border-gray-300 pt-2 text-[10px] font-black uppercase tracking-widest text-gray-400">{t.summary.authorized} (Client)</div>
         </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 no-print mt-12 pt-8 border-t">
          <Button variant="outline" onClick={onReset} className="rounded-xl px-6 py-3"><RotateCcw className="w-4 h-4 mr-2" /> {t.common.newProject}</Button>
          <Button variant="secondary" onClick={() => setShowPromptModal(true)} className="bg-purple-600 border-none"><MessageSquare className="w-4 h-4 mr-2" /> {t.common.aiContext}</Button>
          <Button onClick={handleExportJson} className="bg-blue-600 border-none shadow-xl"><FileJson className="w-4 h-4 mr-2" /> {t.common.exportJson}</Button>
          <Button onClick={handlePrint} className="bg-suse-dark shadow-xl"><Download className="w-4 h-4 mr-2" /> {t.common.print}</Button>
      </div>
    </div>
  );
};
