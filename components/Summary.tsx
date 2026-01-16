
import React, { useState } from 'react';
import { POCData, HardwareSpecs, NetworkSpecs, CloudInitConfig, Language } from '../types';
import { 
  Download, 
  RotateCcw, 
  Server, 
  Activity, 
  Network, 
  FileCode, 
  FileJson, 
  Zap, 
  ShieldCheck, 
  MessageSquare, 
  X, 
  Copy, 
  CheckCircle, 
  Package, 
  Terminal, 
  Target, 
  CheckSquare, 
  User, 
  Building, 
  Calendar, 
  HardDrive, 
  Globe, 
  Layers, 
  Lock 
} from 'lucide-react';
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

  const val = (value: any) => {
    if (value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) {
      return <span className="text-gray-400 italic">{t.common.notSpecified}</span>;
    }
    return value;
  };

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
Name: ${pocData.projectName || 'N/A'}
Organization: ${pocData.clientOrganization || 'N/A'}
Lead: ${pocData.leadEngineer}

--- ${lang === 'en' ? "TECH SPECS" : "ESPECIFICAÇÕES"} ---
Nodes: ${specs.nodeCount} | CPU: ${specs.cpuCores} | RAM: ${specs.ramGb}GB
VIP: ${netSpecs.clusterVip} | CIDR: ${netSpecs.managementCidr}

--- ${lang === 'en' ? "REQUEST" : "SOLICITAÇÃO"} ---
Based on this HCI architecture, please help me with...`;
  };

  const passCount = Object.values(testResults).filter(v => v === 'pass').length;
  const totalTests = pocData.goals.length;

  // Fix: Made children optional in the type definition to resolve "missing children" TS errors.
  // This is a common workaround for locally defined components where TS JSX parser doesn't correctly map nested children to required props.
  const ReportSection = ({ title, icon: Icon, children }: { title: string, icon: any, children?: React.ReactNode }) => (
    <div className="mb-12 break-inside-avoid">
       <h3 className="font-bold text-sm uppercase tracking-[0.2em] text-suse-dark border-b-2 border-suse-base/20 pb-2 mb-6 flex items-center gap-3">
          <Icon className="w-5 h-5 text-suse-base" /> {title}
       </h3>
       {children}
    </div>
  );

  const DataGrid = ({ items }: { items: { label: string, value: any }[] }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, idx) => (
        <div key={idx} className="space-y-1">
          <div className="text-[9px] font-black uppercase text-gray-400 tracking-wider">{item.label}</div>
          <div className="text-xs font-bold text-gray-800">{val(item.value)}</div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="print-container bg-white p-10 rounded-2xl shadow-xl border-t-8 border-suse-base max-w-6xl mx-auto animate-fade-in pb-20">
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

      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-b-4 border-slate-900 pb-10">
        <div className="text-center md:text-left">
           <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
              <ShieldCheck className="w-12 h-12 text-suse-base" />
              <h1 className="text-4xl font-black text-suse-dark uppercase tracking-tighter leading-none">POC REPORT</h1>
           </div>
           <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px] ml-16">SUSE Virtualization v1.7 Implementation</p>
        </div>
        <div className="bg-slate-900 text-white p-4 rounded-2xl flex items-center gap-4 shadow-xl">
           <div className="text-right">
              <div className="text-[8px] font-black uppercase text-suse-light opacity-60">Generation Date</div>
              <div className="text-xs font-mono font-bold">{new Date().toLocaleDateString()}</div>
           </div>
           <div className="w-px h-8 bg-white/20"></div>
           <div className="text-right">
              <div className="text-[8px] font-black uppercase text-suse-light opacity-60">Status</div>
              <div className="text-xs font-bold flex items-center gap-1"><CheckCircle className="w-3 h-3 text-suse-base" /> Validated</div>
           </div>
        </div>
      </div>

      {/* 1. Project Information */}
      <ReportSection title={t.summary.stakeholders} icon={Activity}>
         <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
               <div className="space-y-8">
                  <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
                     <User className="w-3 h-3" /> Technical Leads
                  </h4>
                  <DataGrid items={[
                    { label: t.pocDetails.leadName, value: pocData.leadEngineer },
                    { label: t.pocDetails.leadEmail, value: pocData.leadEmail },
                    { label: "Lead Organization", value: pocData.organization }
                  ]} />
               </div>
               <div className="space-y-8">
                  <h4 className="text-[10px] font-black text-orange-600 uppercase tracking-widest flex items-center gap-2">
                     <Building className="w-3 h-3" /> Client Information
                  </h4>
                  <DataGrid items={[
                    { label: t.pocDetails.clientOrg, value: pocData.clientOrganization },
                    { label: t.pocDetails.clientContact, value: pocData.clientContactName },
                    { label: "Contact Role", value: pocData.clientContactRole },
                    { label: "Contact Email", value: pocData.clientContactEmail },
                    { label: "Contact Phone", value: pocData.clientContactPhone }
                  ]} />
               </div>
            </div>
            <div className="mt-12 pt-8 border-t border-slate-200">
                <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2 mb-6">
                    <Calendar className="w-3 h-3" /> Execution Timeline
                </h4>
                <DataGrid items={[
                  { label: t.pocDetails.startDate, value: pocData.startDate },
                  { label: t.pocDetails.targetDate, value: pocData.targetDate }
                ]} />
            </div>
         </div>
      </ReportSection>

      {/* 2. Infrastructure Inventory */}
      <ReportSection title="Detailed Technical Inventory" icon={Server}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             {/* Hardware Specs */}
             <div className="bg-white p-6 rounded-3xl border-2 border-gray-100 space-y-6">
                <div className="flex items-center justify-between">
                   <h4 className="text-[10px] font-black text-purple-600 uppercase tracking-widest">Hardware Profile</h4>
                   <Zap className="w-4 h-4 text-purple-200" />
                </div>
                <DataGrid items={[
                   { label: "Total Nodes", value: specs.nodeCount },
                   { label: "CPU Cores / Node", value: specs.cpuCores },
                   { label: "RAM / Node", value: `${specs.ramGb} GB` },
                   { label: "Storage Media", value: specs.diskType },
                   { label: "Disk Size", value: specs.diskGb ? `${specs.diskGb} GB` : null },
                   { label: "Networking", value: specs.networkSpeedGb ? `${specs.networkSpeedGb} Gbps` : null },
                   { label: "GPU Capability", value: specs.hasGpu ? `Enabled (${specs.gpuType || 'Generic'})` : "Disabled" }
                ]} />
             </div>

             {/* Network Specs */}
             <div className="bg-white p-6 rounded-3xl border-2 border-gray-100 space-y-6">
                <div className="flex items-center justify-between">
                   <h4 className="text-[10px] font-black text-orange-600 uppercase tracking-widest">Network Fabric</h4>
                   <Globe className="w-4 h-4 text-orange-200" />
                </div>
                <DataGrid items={[
                   { label: "Cluster VIP", value: netSpecs.clusterVip },
                   { label: "Management CIDR", value: netSpecs.managementCidr },
                   { label: "Subnet Mask", value: netSpecs.subnetMask },
                   { label: "Gateway", value: netSpecs.gatewayIp },
                   { label: "VLAN ID", value: netSpecs.vlanId },
                   { label: "DNS Servers", value: netSpecs.dnsServers },
                   { label: "NTP Servers", value: netSpecs.ntpServers },
                   { label: "HTTP Proxy", value: netSpecs.httpProxy },
                   { label: "No Proxy", value: netSpecs.noProxy }
                ]} />
             </div>
          </div>

          {/* Node Inventory Table */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200">
             <table className="w-full text-xs text-left">
                <thead className="bg-slate-900 text-white uppercase text-[9px] font-black tracking-widest">
                   <tr>
                      <th className="px-6 py-4">Physical Hostname</th>
                      <th className="px-6 py-4">Management IP</th>
                      <th className="px-6 py-4">Role</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                   {netSpecs.nodes.map((node, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                         <td className="px-6 py-4 font-bold">{val(node.name)}</td>
                         <td className="px-6 py-4 font-mono text-[10px]">{val(node.ip)}</td>
                         <td className="px-6 py-4">
                            <span className="bg-gray-100 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter">{val(node.role)}</span>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
      </ReportSection>

      {/* 3. Topology Diagram */}
      <ReportSection title={t.summary.topology} icon={Network}>
          <div className="bg-slate-50 rounded-[3rem] p-10 border border-gray-100 flex justify-center shadow-inner relative overflow-hidden group">
              <div className="absolute top-6 left-6 opacity-40">
                  <div className="flex items-center gap-2 text-[9px] font-black uppercase text-gray-400">
                      <Layers className="w-3 h-3" /> System Logic
                  </div>
              </div>
              <div className="scale-90 transform origin-center transition-transform duration-1000 group-hover:scale-95">
                <InfraDiagram specs={specs} networkSpecs={netSpecs} projectName={pocData.projectName} />
              </div>
          </div>
      </ReportSection>

      {/* 4. Automation & Automation Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Test Result Detail */}
        <ReportSection title="POC Validation Results" icon={CheckSquare}>
          <div className="bg-white p-8 rounded-3xl border-2 border-gray-100 space-y-6">
             <div className="flex items-center gap-8 mb-4">
                <div className={`w-24 h-24 rounded-full border-[10px] flex items-center justify-center font-black text-2xl transition-all duration-1000 ${passCount === totalTests ? 'border-suse-base text-suse-base' : 'border-amber-400 text-amber-600'}`}>
                    {Math.round((passCount / (totalTests || 1)) * 100)}%
                </div>
                <div>
                   <div className="text-2xl font-black text-gray-800 leading-tight">{passCount} / {totalTests} Passed</div>
                   <p className="text-xs text-gray-400 font-medium">Criteria validated by {pocData.leadEngineer}</p>
                </div>
             </div>
             <div className="space-y-3">
                {pocData.goals.map((goal, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-gray-50 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                    <span className="text-[10px] font-bold text-gray-700 pr-4">{goal}</span>
                    <span className={`text-[9px] font-black px-2 py-1 rounded-full uppercase tracking-tighter ${testResults[goal] === 'pass' ? 'bg-green-100 text-green-700' : testResults[goal] === 'fail' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-400'}`}>
                        {testResults[goal] || 'PENDING'}
                    </span>
                  </div>
                ))}
             </div>
          </div>
        </ReportSection>

        {/* Automation Summary */}
        <ReportSection title="Automation Blueprint" icon={FileCode}>
            <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl space-y-6 relative overflow-hidden">
                <div className="absolute -bottom-10 -right-10 opacity-5">
                   <Terminal className="w-48 h-48" />
                </div>
                <div className="space-y-6 relative z-10">
                   <DataGrid items={[
                      { label: "Default User", value: cloudInitConfig.user },
                      { label: "SSH Keys Integrated", value: cloudInitConfig.sshKeys.length > 0 ? `${cloudInitConfig.sshKeys.length} Keys` : "None" },
                      { label: "Timezone", value: cloudInitConfig.timezone },
                      { label: "Locale", value: cloudInitConfig.locale },
                      { label: "Package Modules", value: cloudInitConfig.packages.length > 0 ? `${cloudInitConfig.packages.length} Packages` : "Core Standard" },
                      { label: "Custom Scripts", value: `${(cloudInitConfig.runCmds?.length || 0) + (cloudInitConfig.bootCmds?.length || 0)} Cmds` }
                   ]} />
                   
                   <div className="pt-6 border-t border-white/10 space-y-3">
                       <h5 className="text-[9px] font-black uppercase text-suse-base tracking-widest">Automation Modules</h5>
                       <div className="flex flex-wrap gap-2">
                          {['Cloud-Init Generator', 'Harvester CRD v1.7', 'KubeVirt Manifests', 'NetworkMultus'].map(tag => (
                             <span key={tag} className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[8px] font-bold text-white/40">{tag}</span>
                          ))}
                       </div>
                   </div>
                </div>
            </div>
        </ReportSection>
      </div>

      {/* 5. Signature Section */}
      <ReportSection title="Formalization & Acceptance" icon={Lock}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10">
             <div className="space-y-12">
                <div className="w-full border-b-2 border-slate-200 pb-2"></div>
                <div className="text-center">
                   <div className="text-xs font-black text-gray-800 uppercase">{pocData.leadEngineer || "Technical Lead"}</div>
                   <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">SUSE / Partner Representative</div>
                </div>
             </div>
             <div className="space-y-12">
                <div className="w-full border-b-2 border-slate-200 pb-2"></div>
                <div className="text-center">
                   <div className="text-xs font-black text-gray-800 uppercase">{pocData.clientContactName || "Client Lead"}</div>
                   <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Client Organization ({pocData.clientOrganization || 'TBD'})</div>
                </div>
             </div>
          </div>
      </ReportSection>

      {/* Print Footer */}
      <div className="mt-20 pt-10 text-center space-y-4 border-t-2 border-slate-100">
         <p className="text-[10px] text-gray-300 font-bold uppercase tracking-[0.4em]">{t.summary.generatedBy}</p>
         <div className="flex justify-center gap-12 opacity-30">
            <ShieldCheck className="w-8 h-8 text-slate-400" />
            <Package className="w-8 h-8 text-slate-400" />
            <HardDrive className="w-8 h-8 text-slate-400" />
         </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 no-print mt-12 pt-8 border-t">
          <Button variant="outline" onClick={onReset} className="rounded-xl px-6 py-3"><RotateCcw className="w-4 h-4 mr-2" /> {t.common.newProject}</Button>
          <Button variant="secondary" onClick={() => setShowPromptModal(true)} className="bg-purple-600 border-none hover:bg-purple-700 shadow-xl"><MessageSquare className="w-4 h-4 mr-2" /> {t.common.aiContext}</Button>
          <Button onClick={handleExportJson} className="bg-blue-600 border-none hover:bg-blue-700 shadow-xl"><FileJson className="w-4 h-4 mr-2" /> {t.common.exportJson}</Button>
          <Button onClick={handlePrint} className="bg-suse-dark hover:bg-black shadow-xl"><Download className="w-4 h-4 mr-2" /> {t.common.print}</Button>
      </div>
    </div>
  );
};
