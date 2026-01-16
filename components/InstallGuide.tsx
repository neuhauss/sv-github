
import React, { useState } from 'react';
/* Added AlertTriangle and Plus to imports from lucide-react */
import { Server, Settings, Network, HardDrive, Disc, LayoutTemplate, Play, Database, Cloud, ArrowRight, ShieldCheck, Cpu, Shuffle, Lock, Globe, Zap, Monitor, Search, Terminal, Copy, Check, Key, Layers, RefreshCw, Target, FileCheck, Eye, Link as LinkIcon, Download, AlertCircle, AlertTriangle, Plus, ShieldAlert, Wifi, Activity, BookOpen, Wrench, Bug, ShieldX, ExternalLink, Info, CheckCircle2, ChevronRight, ListChecks } from 'lucide-react';
import { UISnapshot } from './ui/UISnapshot';
import { NetworkSpecs, Language } from '../types';
import { translations, GOAL_PROCEDURES_LOCALIZED } from '../i18n';

interface Props {
  lang: Language;
  netSpecs?: NetworkSpecs;
  goals?: string[];
}

export const InstallGuide: React.FC<Props> = ({ lang, netSpecs, goals = [] }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const t = translations[lang];

  const sections = [
    { id: 'overview', icon: <LayoutTemplate className="w-4 h-4" />, label: t.installGuide.sections.overview },
    { id: 'planning', icon: <Cpu className="w-4 h-4" />, label: t.installGuide.sections.planning },
    { id: 'install', icon: <Play className="w-4 h-4" />, label: t.installGuide.sections.install },
    { id: 'config', icon: <Settings className="w-4 h-4" />, label: t.installGuide.sections.config },
    { id: 'storage', icon: <HardDrive className="w-4 h-4" />, label: t.installGuide.sections.storage },
    { id: 'poc-goals', icon: <FileCheck className="w-4 h-4" />, label: t.installGuide.sections.pocGoals, count: goals.length },
    { id: 'rancher', icon: <Cloud className="w-4 h-4" />, label: t.installGuide.sections.rancher },
    { id: 'troubleshooting', icon: <Bug className="w-4 h-4" />, label: t.installGuide.sections.troubleshooting },
  ];

  const handleNext = () => {
    const idx = sections.findIndex(s => s.id === activeSection);
    if (idx < sections.length - 1) {
      setActiveSection(sections[idx + 1].id);
      window.scrollTo(0, 0);
    }
  };

  const StepBox = ({ title, desc, icon: Icon, colorClass = "bg-slate-50 border-slate-200" }: any) => (
    <div className={`p-5 rounded-2xl border flex gap-4 ${colorClass} animate-fade-in transition-all hover:shadow-md`}>
        {Icon && <div className="shrink-0"><Icon className="w-6 h-6 opacity-80" /></div>}
        <div>
            <h4 className="font-bold text-sm mb-1">{title}</h4>
            <p className="text-[11px] leading-relaxed opacity-70">{desc}</p>
        </div>
    </div>
  );

  const SectionHeader = ({ title, subtitle, icon: Icon, docUrl }: any) => (
    <div className="mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-suse-base/10 rounded-2xl">
                    <Icon className="w-8 h-8 text-suse-base" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-suse-dark">{title}</h1>
                    <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
                </div>
            </div>
            {docUrl && (
                <a 
                  href={docUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-suse-base hover:text-white transition-all shadow-sm shrink-0"
                >
                    <BookOpen className="w-4 h-4" /> Official Docs <ExternalLink className="w-3.5 h-3.5" />
                </a>
            )}
        </div>
        <div className="h-0.5 bg-gradient-to-r from-suse-base/20 to-transparent w-full"></div>
    </div>
  );

  const renderContent = () => {
    switch(activeSection) {
      case 'overview':
        return (
          <div className="space-y-6 animate-fade-in">
            <SectionHeader title={t.installGuide.overview.title} subtitle={t.installGuide.overview.subtitle} icon={LayoutTemplate} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 flex gap-5 shadow-sm">
                <Zap className="w-12 h-12 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-emerald-800 text-lg">{t.installGuide.overview.hciTitle}</h4>
                  <p className="text-xs text-emerald-700 mt-2 leading-relaxed">{t.installGuide.overview.hciDesc}</p>
                </div>
              </div>
              <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex gap-5 shadow-sm">
                <ShieldCheck className="w-12 h-12 text-blue-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-blue-800 text-lg">{t.installGuide.overview.prodTitle}</h4>
                  <p className="text-xs text-blue-700 mt-2 leading-relaxed">{t.installGuide.overview.prodDesc}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'planning':
          return (
              <div className="space-y-8 animate-fade-in">
                  <SectionHeader title={t.installGuide.planning.title} subtitle={t.installGuide.planning.desc} icon={Cpu} docUrl="https://docs.harvesterhci.io/v1.7/install/requirements/" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <StepBox icon={Monitor} title="Compute / CPU" desc={t.installGuide.planning.cpu} />
                      <StepBox icon={Activity} title="Memory / RAM" desc={t.installGuide.planning.ram} />
                      <StepBox icon={Network} title="Fabric / 10G" desc={t.installGuide.planning.network} />
                      <StepBox icon={Shuffle} title="Switch Tuning" desc={t.installGuide.planning.mtu} colorClass="bg-amber-50 border-amber-100 text-amber-900" />
                      <StepBox icon={Settings} title="BIOS/UEFI" desc={t.installGuide.planning.bios} />
                      <StepBox icon={Globe} title="Connectivity" desc={t.installGuide.planning.internet} />
                  </div>
                  <div className="p-6 bg-suse-dark text-white rounded-[2.5rem] flex flex-col md:flex-row gap-6 items-center shadow-xl border border-suse-base/20">
                      <div className="p-4 bg-suse-base/20 rounded-2xl"><Info className="w-8 h-8 text-suse-base shrink-0" /></div>
                      <div>
                        <h5 className="font-bold text-suse-light mb-1">Expert Planning Note</h5>
                        <p className="text-xs leading-relaxed opacity-80 italic">Precision in network planning is the #1 success factor. If utilizing PXE boot for large clusters, Harvester v1.7 supports standard iPXE and Matchbox integration for fully automated zero-touch provisioning.</p>
                      </div>
                  </div>
              </div>
          );

      case 'install':
          return (
              <div className="space-y-8 animate-fade-in">
                  <SectionHeader title={t.installGuide.install.title} subtitle="Detailed workflow for cluster initialization." icon={Play} docUrl="https://docs.harvesterhci.io/v1.7/install/iso-install/" />
                  <div className="space-y-8">
                      <div className="flex gap-8 items-start relative">
                          <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-slate-100 -z-10"></div>
                          <div className="w-12 h-12 rounded-2xl bg-suse-base text-white flex items-center justify-center font-black text-xl shrink-0 shadow-lg shadow-suse-base/20">1</div>
                          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex-1">
                              <h4 className="font-bold text-lg mb-3">Cluster Genesis (Seed Node)</h4>
                              <p className="text-sm text-gray-600 leading-relaxed">{t.installGuide.install.node1}</p>
                              <div className="mt-4 p-4 bg-blue-50 text-blue-700 rounded-2xl text-[10px] font-bold flex items-start gap-3 border border-blue-100">
                                 <AlertCircle className="w-4 h-4 shrink-0" /> 
                                 <div>
                                    <span className="block mb-1 text-blue-900 uppercase tracking-widest">VIP Warning</span>
                                    Ensure the VIP is statically assigned in your switch/router and doesn't conflict with any active DHCP pools. etcd relies heavily on this IP stability.
                                 </div>
                              </div>
                          </div>
                      </div>
                      <div className="flex gap-8 items-start">
                          <div className="w-12 h-12 rounded-2xl bg-suse-dark text-white flex items-center justify-center font-black text-xl shrink-0 shadow-lg shadow-suse-dark/20">2</div>
                          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex-1">
                              <h4 className="font-bold text-lg mb-3">Expansion (Joining Nodes)</h4>
                              <p className="text-sm text-gray-600 leading-relaxed">{t.installGuide.install.node2}</p>
                          </div>
                      </div>
                  </div>
                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-3xl flex items-center gap-5 italic text-sm text-gray-500 shadow-inner">
                      <RefreshCw className="w-6 h-6 animate-spin-slow text-suse-base" /> {t.installGuide.install.reboot}
                  </div>
              </div>
          );

      case 'config':
          return (
              <div className="space-y-8 animate-fade-in">
                  <SectionHeader title={t.installGuide.config.title} subtitle="Post-installation optimization and network fabric setup." icon={Settings} docUrl="https://docs.harvesterhci.io/v1.7/networking/harvester-network/" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <StepBox icon={Globe} title="Web Access" desc={t.installGuide.config.url} />
                        <StepBox icon={Lock} title="Admin Auth" desc={t.installGuide.config.password} />
                        <StepBox icon={Shuffle} title="VLAN & Bridge" desc={t.installGuide.config.settings} />
                        <StepBox icon={Database} title="Backup Target" desc={t.installGuide.config.backup} colorClass="bg-purple-50 border-purple-100 text-purple-900" />
                    </div>
                    <div className="space-y-6">
                        <UISnapshot type="dashboard" title="Settings -> Management Network" imageSrc="https://raw.githubusercontent.com/rancher/harvester/master/docs/static/img/initial-settings.png" />
                        <div className="bg-amber-50 p-6 rounded-[2rem] border border-amber-100">
                            <h5 className="text-[11px] font-black text-amber-800 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4" /> Config Troubleshooting
                            </h5>
                            <ul className="text-[10px] text-amber-700 space-y-2 font-medium leading-relaxed">
                                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1"></div> If VMs lose connectivity during large file transfers, verify that the Harvester Bridge MTU matches the physical switch MTU.</li>
                                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1"></div> Ensure the NTP servers are reachable. Time drift > 500ms will cause etcd to crash.</li>
                            </ul>
                        </div>
                    </div>
                  </div>
              </div>
          );

      case 'storage':
          return (
              <div className="space-y-8 animate-fade-in">
                  <SectionHeader title={t.installGuide.storage.title} subtitle="Managing the Longhorn Software-Defined Storage layer." icon={HardDrive} docUrl="https://docs.harvesterhci.io/v1.7/storage/storage-class/" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                          <StepBox icon={Layers} title="Replica Policy" desc={t.installGuide.storage.replica} />
                          <StepBox icon={Disc} title="High Performance Media" desc={t.installGuide.storage.ssd} />
                          <StepBox icon={Plus} title="Online Expansion" desc={t.installGuide.storage.expansion} />
                      </div>
                      <div className="flex flex-col gap-6">
                          <div className="p-8 bg-red-50 border border-red-100 rounded-[2.5rem] shadow-sm space-y-4">
                              <h4 className="font-bold text-red-800 text-lg flex items-center gap-3"><ShieldAlert className="w-6 h-6" /> etcd Stability Check</h4>
                              <p className="text-xs text-red-700 leading-relaxed font-medium">{t.installGuide.storage.bench}</p>
                              <div className="bg-white/50 p-4 rounded-xl border border-red-200 text-[10px] font-mono text-red-800 shadow-inner">
                                  <span className="block mb-2 opacity-50"># Command to verify disk performance:</span>
                                  fio --name=etcd --rw=write --bs=4k --size=10M --sync=1
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          );

      case 'poc-goals':
        const procedures = GOAL_PROCEDURES_LOCALIZED[lang];
        return (
          <div className="space-y-8 animate-fade-in">
            <SectionHeader title={t.installGuide.sections.pocGoals} subtitle="Functional validation for client acceptance." icon={FileCheck} />

            {goals.length === 0 ? (
              <div className="py-24 text-center border-4 border-dotted border-gray-100 rounded-[3rem] bg-gray-50/50">
                 <Target className="w-20 h-20 mx-auto text-gray-200 mb-6 opacity-30" />
                 <h3 className="text-gray-400 font-bold text-xl">{lang === 'en' ? "No objectives selected" : "Nenhum objetivo selecionado"}</h3>
                 <p className="text-gray-400 text-sm max-w-xs mx-auto mt-2">{lang === 'en' ? "Go back to 'Project' and select items to validate." : "Volte ao menu de Projeto e selecione os itens desejados."}</p>
              </div>
            ) : (
              <div className="space-y-10">
                {goals.map((goal, idx) => {
                  const data = procedures[goal] || { steps: ["Consult official documentation at docs.harvesterhci.io."], icon: Target, dependencies: [], docsUrl: "https://docs.harvesterhci.io", tip: "", resourceLinks: [] };
                  const Icon = data.icon || Target;
                  return (
                    <div key={idx} className="bg-white border-2 border-gray-100 rounded-[2.5rem] shadow-sm overflow-hidden group hover:border-suse-base transition-all duration-500">
                      <div className="bg-gray-50/80 px-10 py-6 border-b border-gray-100 flex items-center justify-between group-hover:bg-suse-base/5 transition-colors">
                        <div className="flex items-center gap-6">
                            <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 text-suse-base transition-transform group-hover:rotate-6">
                                <Icon className="w-7 h-7" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800 text-xl leading-tight">{goal}</h4>
                                <div className="flex items-center gap-3 mt-2">
                                    <a href={data.docsUrl} target="_blank" rel="noreferrer" className="text-[10px] text-gray-400 uppercase font-black tracking-widest hover:text-suse-base flex items-center gap-1.5 transition-colors">
                                        <BookOpen className="w-3 h-3" /> {t.common.officialDocs} <ExternalLink className="w-2.5 h-2.5" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="hidden sm:block">
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Step {idx + 1}</span>
                        </div>
                      </div>

                      <div className="p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
                        <div className="lg:col-span-7 space-y-8">
                            <div>
                                <div className="flex items-center gap-3 text-gray-900 font-black text-xs uppercase tracking-widest mb-6">
                                    <Monitor className="w-4.5 h-4.5 text-suse-base" /> {lang === 'en' ? "Technical Procedure" : "Procedimento Técnico"}
                                </div>
                                <ul className="space-y-5">
                                {data.steps.map((s: string, sIdx: number) => (
                                    <li key={sIdx} className="flex gap-5 text-sm text-gray-600 leading-relaxed group/item">
                                        <span className="w-7 h-7 bg-slate-100 rounded-xl flex items-center justify-center shrink-0 font-black text-xs text-slate-500 group-hover/item:bg-suse-base group-hover/item:text-white transition-all shadow-sm">{sIdx + 1}</span>
                                        <span className="pt-1">{s}</span>
                                    </li>
                                ))}
                                </ul>
                            </div>
                            
                            {data.tip && (
                                <div className="p-6 bg-amber-50/50 border-l-8 border-amber-400 rounded-2xl flex gap-5 items-start shadow-sm">
                                    <Wrench className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-[11px] text-amber-800 font-black uppercase tracking-[0.2em] mb-1.5">{t.common.expertTip}</p>
                                        <p className="text-[11px] text-amber-900/80 leading-relaxed font-medium">{data.tip}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="lg:col-span-5 space-y-10 lg:border-l lg:pl-10 border-gray-100">
                            <div>
                                <div className="flex items-center gap-3 text-gray-900 font-black text-[10px] uppercase tracking-widest mb-6">
                                    <AlertCircle className="w-4 h-4 text-orange-500" /> {t.common.techDependencies}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {data.dependencies.map((dep: string, dIdx: number) => (
                                        <span key={dIdx} className="text-[9px] font-bold text-gray-500 bg-gray-50 px-3 py-2 rounded-xl border border-gray-200 flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                                            {dep}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {data.resourceLinks && data.resourceLinks.length > 0 && (
                                <div>
                                    <div className="flex items-center gap-3 text-gray-900 font-black text-[10px] uppercase tracking-widest mb-6">
                                        <Download className="w-4 h-4 text-blue-500" /> {t.common.resourceLinks}
                                    </div>
                                    <div className="grid grid-cols-1 gap-3">
                                        {data.resourceLinks.map((link: any, lIdx: number) => (
                                            <a 
                                                key={lIdx}
                                                href={link.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center justify-between bg-blue-50/40 border border-blue-100 px-5 py-4 rounded-2xl hover:bg-blue-100 hover:border-blue-200 transition-all group/link shadow-sm"
                                            >
                                                <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest">{link.label}</span>
                                                <ExternalLink className="w-4 h-4 text-blue-400 group-hover/link:translate-x-1 group-hover/link:text-blue-600 transition-all" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );

      case 'rancher':
        return (
          <div className="space-y-12 animate-fade-in">
             <SectionHeader 
                title={t.installGuide.rancher.title} 
                subtitle={t.installGuide.rancher.subtitle} 
                icon={Cloud} 
                docUrl="https://docs.harvesterhci.io/v1.7/rancher/rancher-integration/"
             />

             <div className="space-y-20">
                {/* Step 1: Feature Flags */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <span className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-blue-200">1</span>
                            <h3 className="text-2xl font-bold text-gray-800">{t.installGuide.rancher.step1}</h3>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed bg-slate-50 p-6 rounded-[2rem] border border-slate-100">{t.installGuide.rancher.step1Desc}</p>
                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                           <CheckCircle2 className="w-4 h-4 text-suse-base" /> Requires Rancher v2.8.0 or newer
                        </div>
                    </div>
                    <UISnapshot 
                        type="dashboard" 
                        title="Rancher Global Settings -> Feature Flags" 
                        imageSrc="https://raw.githubusercontent.com/rancher/harvester/master/docs/static/img/rancher-feature-flag.png" 
                    />
                </div>

                {/* Step 2: Import */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="order-2 lg:order-1">
                        <UISnapshot 
                            type="dashboard" 
                            title="Importing Harvester Cluster via Dashboard" 
                            imageSrc="https://raw.githubusercontent.com/rancher/harvester/master/docs/static/img/rancher-import-harvester.png" 
                        />
                    </div>
                    <div className="space-y-6 order-1 lg:order-2">
                        <div className="flex items-center gap-4">
                            <span className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-blue-200">2</span>
                            <h3 className="text-2xl font-bold text-gray-800">{t.installGuide.rancher.step2}</h3>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed bg-slate-50 p-6 rounded-[2rem] border border-slate-100">{t.installGuide.rancher.step2Desc}</p>
                        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-3">
                            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            <span className="text-[10px] text-amber-800 font-medium italic">Important: If using self-signed certificates, ensure 'Skip TLS verification' is checked or the Harvester CA is imported into Rancher.</span>
                        </div>
                    </div>
                </div>

                {/* Step 3: Cloud Credentials */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <span className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-blue-200">3</span>
                            <h3 className="text-2xl font-bold text-gray-800">{t.installGuide.rancher.step3}</h3>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed bg-slate-50 p-6 rounded-[2rem] border border-slate-100">{t.installGuide.rancher.step3Desc}</p>
                    </div>
                    <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
                        <div className="relative z-10 space-y-4">
                            <div className="flex items-center gap-3 text-suse-light">
                                <Key className="w-6 h-6" />
                                <span className="text-xs font-black uppercase tracking-widest">Credential Flow</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="bg-white/10 px-4 py-3 rounded-xl border border-white/10 text-white text-[10px] font-mono">1. Cluster Mgmt > Cloud Credentials</div>
                                <div className="bg-white/10 px-4 py-3 rounded-xl border border-white/10 text-white text-[10px] font-mono">2. Select 'Harvester' provider</div>
                                <div className="bg-white/10 px-4 py-3 rounded-xl border border-white/10 text-white text-[10px] font-mono">3. Paste Harvester Bearer Token</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Step 4: RKE2 Provisioning */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="order-2 lg:order-1">
                        <UISnapshot 
                            type="dashboard" 
                            title="Deploying Downstream RKE2 Clusters" 
                            imageSrc="https://raw.githubusercontent.com/rancher/harvester/master/docs/static/img/rancher-provision-rke2.png" 
                        />
                    </div>
                    <div className="space-y-6 order-1 lg:order-2">
                        <div className="flex items-center gap-4">
                            <span className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-blue-200">4</span>
                            <h3 className="text-2xl font-bold text-gray-800">4. {lang === 'en' ? "Provision RKE2 Clusters" : "Provisionar Clusters RKE2"}</h3>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed bg-slate-50 p-6 rounded-[2rem] border border-slate-100">{t.installGuide.rancher.step4Desc}</p>
                    </div>
                </div>

                {/* Troubleshooting Integration Deep Dive */}
                <div className="bg-slate-900 text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
                    <div className="absolute -right-10 -bottom-10 opacity-10">
                        <ShieldCheck className="w-80 h-80" />
                    </div>
                    <h4 className="text-2xl font-bold mb-6 flex items-center gap-4 text-suse-light">
                        <Bug className="w-8 h-8" /> Integration Troubleshooting
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center shrink-0 font-black text-xs">!</div>
                                <div>
                                    <h5 className="font-bold text-sm text-white">Certificate Trust Issues</h5>
                                    <p className="text-[10px] text-slate-400 leading-relaxed mt-1">If the cluster stays in 'Pending' for > 10m, check the cattle-cluster-agent pods for "x509: certificate signed by unknown authority". Add your Rancher CA to Harvester Settings > Additional-CA.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center shrink-0 font-black text-xs">!</div>
                                <div>
                                    <h5 className="font-bold text-sm text-white">VIP Connectivity (Port 443)</h5>
                                    <p className="text-[10px] text-slate-400 leading-relaxed mt-1">Ensure Rancher can reach the Harvester VIP on port 443. Some firewalls block Gratuitous ARP packets used by kube-vip.</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                             <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center shrink-0 font-black text-xs">!</div>
                                <div>
                                    <h5 className="font-bold text-sm text-white">Agent Sync Latency</h5>
                                    <p className="text-[10px] text-slate-400 leading-relaxed mt-1">If using Rancher v2.7 or older, certain Harvester v1.7 dashboard components might not render correctly. Upgrade to v2.8.x for full compatibility.</p>
                                </div>
                            </div>
                            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                                <p className="text-[10px] font-black uppercase tracking-widest text-suse-base mb-2">Support Tip</p>
                                <p className="text-[10px] text-slate-300 italic">"Always verify that Harvester can resolve the Rancher URL via DNS before starting the import process."</p>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
          </div>
        );

      case 'troubleshooting':
          return (
            <div className="space-y-8 animate-fade-in">
                <SectionHeader title={t.installGuide.troubleshooting.title} subtitle="Resolving common environmental blockers." icon={Bug} docUrl="https://docs.harvesterhci.io/v1.7/troubleshooting/" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <StepBox icon={ShieldX} title="Kernel / Initrd" desc={t.installGuide.troubleshooting.initrd} colorClass="bg-red-50 border-red-100 text-red-900" />
                    <StepBox icon={Wifi} title="Network / VIP" desc={t.installGuide.troubleshooting.vip} colorClass="bg-red-50 border-red-100 text-red-900" />
                    <StepBox icon={Activity} title="SDS Performance" desc={t.installGuide.troubleshooting.etcd} colorClass="bg-red-50 border-red-100 text-red-900" />
                    <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white flex flex-col justify-center gap-4 border border-slate-800 shadow-xl">
                        <h4 className="font-bold flex items-center gap-3 text-suse-base"><CheckCircle2 className="w-5 h-5" /> Need Support Evidence?</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">Run <code>harvester-generate-bundle</code> from any node and provide the .tar.gz file to SUSE Support via SCC.</p>
                        <div className="flex gap-2 mt-2">
                             <span className="px-3 py-1 bg-white/10 rounded-full text-[9px] font-black uppercase">SCC Required</span>
                             <span className="px-3 py-1 bg-white/10 rounded-full text-[9px] font-black uppercase">Full Cluster Logs</span>
                        </div>
                    </div>
                </div>
            </div>
          );

      default:
        return (
            <div className="py-20 text-center opacity-50">
                <Search className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-400 italic">{lang === 'en' ? "Select a section from the sidebar." : "Selecione uma seção no menu lateral."}</p>
            </div>
        );
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-[600px] pb-20">
      <aside className="lg:w-72 flex-shrink-0">
        <nav className="space-y-2 sticky top-28">
          <div className="px-4 py-3 mb-4 bg-slate-900 text-white rounded-2xl flex items-center gap-3 shadow-lg">
             <ListChecks className="w-5 h-5 text-suse-base" />
             <span className="text-xs font-black uppercase tracking-widest">Guide Navigator</span>
          </div>
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 text-sm font-bold rounded-2xl transition-all text-left ${
                activeSection === section.id
                  ? 'bg-suse-base text-white shadow-xl translate-x-2 shadow-suse-base/20'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center gap-4 flex-1">
                {section.icon}
                <span className="tracking-tight">{section.label}</span>
              </div>
              {section.count !== undefined && section.count > 0 && (
                <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg ${activeSection === section.id ? 'bg-white text-suse-base' : 'bg-suse-base/10 text-suse-base shadow-sm'}`}>
                  {section.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </aside>

      <div className="flex-1 bg-white p-12 rounded-[3.5rem] border border-gray-200 shadow-sm min-h-[600px] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
            <LayoutTemplate className="w-64 h-64" />
        </div>
        
        <div className="relative z-10">
            {renderContent()}
        </div>

        <div className="mt-16 pt-8 border-t border-gray-100 flex justify-between items-center no-print">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Manual v1.7.0 r03</p>
            {activeSection !== 'troubleshooting' && (
                <button 
                    onClick={handleNext}
                    className="flex items-center gap-3 bg-suse-dark text-white px-10 py-5 rounded-[2rem] hover:bg-black transition-all font-black text-sm shadow-2xl hover:scale-105 active:scale-95 group"
                >
                    {t.common.next} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            )}
        </div>
      </div>
    </div>
  );
};
