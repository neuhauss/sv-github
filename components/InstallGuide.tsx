
import React, { useState } from 'react';
/* Added Info to the imports from lucide-react to resolve the missing component error */
import { Server, Settings, Network, HardDrive, Disc, LayoutTemplate, Play, Database, Cloud, ArrowRight, ShieldCheck, Cpu, Shuffle, Lock, Globe, Zap, Monitor, Search, Terminal, Copy, Check, Key, Layers, RefreshCw, Target, FileCheck, Eye, Link as LinkIcon, Download, AlertCircle, ShieldAlert, Wifi, Activity, BookOpen, Wrench, Bug, ShieldX, ExternalLink, Info } from 'lucide-react';
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
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(text);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const handleNext = () => {
    const idx = sections.findIndex(s => s.id === activeSection);
    if (idx < sections.length - 1) {
      setActiveSection(sections[idx + 1].id);
      window.scrollTo(0, 0);
    }
  };

  const renderContent = () => {
    switch(activeSection) {
      case 'overview':
        return (
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-3xl font-bold text-suse-dark">{t.installGuide.overview.title}</h1>
            <p className="text-gray-600 leading-relaxed">{t.installGuide.overview.subtitle}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100 flex gap-4">
                <Zap className="w-10 h-10 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-emerald-800 text-sm">{t.installGuide.overview.hciTitle}</h4>
                  <p className="text-[11px] text-emerald-700 mt-1">{t.installGuide.overview.hciDesc}</p>
                </div>
              </div>
              <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 flex gap-4">
                <ShieldCheck className="w-10 h-10 text-blue-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-blue-800 text-sm">{t.installGuide.overview.prodTitle}</h4>
                  <p className="text-[11px] text-blue-700 mt-1">{t.installGuide.overview.prodDesc}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'poc-goals':
        const procedures = GOAL_PROCEDURES_LOCALIZED[lang];
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-between border-b pb-4">
                <h1 className="text-3xl font-bold text-suse-dark">{t.installGuide.sections.pocGoals}</h1>
                <div className="px-3 py-1 bg-suse-base/10 text-suse-base rounded-full text-[10px] font-bold uppercase tracking-widest border border-suse-base/20">
                    {goals.length} {t.pocDetails.goalsTitle}
                </div>
            </div>

            {goals.length === 0 ? (
              <div className="py-24 text-center border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50/50">
                 <Target className="w-16 h-16 mx-auto text-gray-300 mb-4 opacity-40" />
                 <h3 className="text-gray-500 font-bold">{lang === 'en' ? "No objectives selected" : "Nenhum objetivo selecionado"}</h3>
                 <p className="text-gray-400 text-sm max-w-xs mx-auto mt-1">{lang === 'en' ? "Go back to 'Project' and select items to validate." : "Volte ao menu de Projeto e selecione os itens desejados."}</p>
              </div>
            ) : (
              <div className="space-y-8">
                {goals.map((goal, idx) => {
                  const data = procedures[goal] || { steps: ["Consult official docs."], icon: Target, dependencies: [], docsUrl: "https://docs.harvesterhci.io", tip: "" };
                  const Icon = data.icon || Target;
                  return (
                    <div key={idx} className="bg-white border-2 border-gray-100 rounded-3xl shadow-sm overflow-hidden group hover:border-suse-base transition-all duration-300">
                      <div className="bg-gray-50/80 px-8 py-5 border-b border-gray-100 flex items-center justify-between group-hover:bg-suse-base/5 transition-colors">
                        <div className="flex items-center gap-5">
                            <div className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 text-suse-base">
                                <Icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800 text-lg leading-tight">{goal}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <LinkIcon className="w-3 h-3 text-gray-400" />
                                    <a href={data.docsUrl} target="_blank" rel="noreferrer" className="text-[10px] text-gray-400 uppercase font-bold tracking-widest hover:text-suse-base flex items-center gap-1 transition-colors">
                                        {t.common.officialDocs} <ExternalLink className="w-2.5 h-2.5" />
                                    </a>
                                </div>
                            </div>
                        </div>
                      </div>

                      <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-8 space-y-6">
                            <div className="flex items-center gap-2 text-gray-700 font-bold text-xs uppercase tracking-widest mb-2">
                                <Monitor className="w-4 h-4 text-suse-base" /> {lang === 'en' ? "Execution Steps" : "Procedimento de Execução"}
                            </div>
                            <ul className="space-y-4">
                            {data.steps.map((s: string, sIdx: number) => (
                                <li key={sIdx} className="flex gap-4 text-sm text-gray-600 leading-relaxed group/item">
                                    <span className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center shrink-0 font-bold text-xs text-slate-500 group-hover/item:bg-suse-base group-hover/item:text-white transition-colors">{sIdx + 1}</span>
                                    <span className="pt-0.5">{s}</span>
                                </li>
                            ))}
                            </ul>
                            {data.tip && (
                                <div className="mt-8 p-5 bg-amber-50/50 border border-amber-100 rounded-2xl flex gap-4 items-start">
                                    <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-[11px] text-amber-800 font-bold uppercase tracking-widest mb-1">{t.common.expertTip}</p>
                                        <p className="text-[11px] text-amber-900/80 leading-relaxed">{data.tip}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="lg:col-span-4 space-y-8 lg:border-l lg:pl-8 border-gray-100">
                            <div>
                                <div className="flex items-center gap-2 text-gray-700 font-bold text-[10px] uppercase tracking-widest mb-4">
                                    <AlertCircle className="w-3.5 h-3.5 text-orange-500" /> {t.common.techDependencies}
                                </div>
                                <ul className="space-y-2">
                                    {data.dependencies.map((dep: string, dIdx: number) => (
                                        <li key={dIdx} className="flex items-center gap-2 text-[11px] text-gray-500 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                                            <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                                            {dep}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {data.resourceLinks && (
                                <div>
                                    <div className="flex items-center gap-2 text-gray-700 font-bold text-[10px] uppercase tracking-widest mb-4">
                                        <Download className="w-3.5 h-3.5 text-blue-500" /> {t.common.resourceLinks}
                                    </div>
                                    <div className="space-y-2">
                                        {data.resourceLinks.map((link: any, lIdx: number) => (
                                            <a 
                                                key={lIdx}
                                                href={link.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center justify-between bg-blue-50/50 border border-blue-100 px-4 py-3 rounded-xl hover:bg-blue-100 transition-colors group/link"
                                            >
                                                <span className="text-[11px] font-bold text-blue-700">{link.label}</span>
                                                <ExternalLink className="w-3.5 h-3.5 text-blue-400 group-hover/link:translate-x-0.5 transition-transform" />
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
             <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200">
                   <Cloud className="w-8 h-8 text-white" />
                </div>
                <div>
                   <h1 className="text-3xl font-bold text-suse-dark">{t.installGuide.rancher.title}</h1>
                   <p className="text-sm text-gray-500 leading-relaxed">{t.installGuide.rancher.subtitle}</p>
                </div>
             </div>

             <div className="space-y-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">1</span>
                            <h3 className="text-xl font-bold text-gray-800">{t.installGuide.rancher.step1}</h3>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{t.installGuide.rancher.step1Desc}</p>
                    </div>
                    <UISnapshot 
                        type="dashboard" 
                        title="Rancher Global Settings - Feature Flags" 
                        imageSrc="https://raw.githubusercontent.com/rancher/harvester/master/docs/static/img/rancher-feature-flag.png" 
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <div className="order-2 lg:order-1">
                        <UISnapshot 
                            type="dashboard" 
                            title="Importing Harvester Cluster" 
                            imageSrc="https://raw.githubusercontent.com/rancher/harvester/master/docs/static/img/rancher-import-harvester.png" 
                        />
                    </div>
                    <div className="space-y-6 order-1 lg:order-2">
                        <div className="flex items-center gap-3">
                            <span className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">2</span>
                            <h3 className="text-xl font-bold text-gray-800">{t.installGuide.rancher.step2}</h3>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{t.installGuide.rancher.step2Desc}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <span className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">3</span>
                            <h3 className="text-xl font-bold text-gray-800">{t.installGuide.rancher.step3}</h3>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">{t.installGuide.rancher.step3Desc}</p>
                    </div>
                    <UISnapshot 
                        type="dashboard" 
                        title="Provisioning RKE2 on Harvester" 
                        imageSrc="https://raw.githubusercontent.com/rancher/harvester/master/docs/static/img/rancher-provision-rke2.png" 
                    />
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
    <div className="flex flex-col lg:flex-row gap-8 min-h-[600px]">
      <aside className="lg:w-64 flex-shrink-0">
        <nav className="space-y-1 sticky top-24">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-4 text-sm font-medium rounded-2xl transition-all text-left ${
                activeSection === section.id
                  ? 'bg-suse-base text-white shadow-xl translate-x-1 shadow-suse-base/20'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                {section.icon}
                <span className="font-bold">{section.label}</span>
              </div>
              {section.count !== undefined && section.count > 0 && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${activeSection === section.id ? 'bg-white text-suse-base' : 'bg-suse-base/10 text-suse-base'}`}>
                  {section.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </aside>

      <div className="flex-1 bg-white p-10 rounded-3xl border border-gray-200 shadow-sm min-h-[500px]">
        {renderContent()}
        <div className="mt-16 pt-8 border-t border-gray-100 flex justify-end no-print">
            {activeSection !== 'troubleshooting' && (
                <button 
                    onClick={handleNext}
                    className="flex items-center gap-3 bg-suse-dark text-white px-8 py-4 rounded-2xl hover:bg-black transition-all font-bold shadow-xl hover:scale-105 active:scale-95"
                >
                    {t.common.next} <ArrowRight className="w-5 h-5" />
                </button>
            )}
        </div>
      </div>
    </div>
  );
};
