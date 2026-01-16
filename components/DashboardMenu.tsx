
import React, { useRef } from 'react';
import { POCStep, Language } from '../types';
import { translations } from '../i18n';
import { ClipboardList, Server, Network, LayoutTemplate, FileText, CheckCircle2, Clock, ArrowRight, FileCode, Target, BookOpen, Upload, Terminal, CheckSquare, Layers } from 'lucide-react';
import { Button } from './ui/Button';

interface Props {
  lang: Language;
  onSelectStep: (step: POCStep) => void;
  onImport: (file: File) => void;
  status: {
    details: boolean;
    hardware: boolean;
    network: boolean;
    install: boolean;
    config: boolean;
  };
}

export const DashboardMenu: React.FC<Props> = ({ lang, onSelectStep, onImport, status }) => {
  const t = translations[lang];
  const fileInputRef = useRef<HTMLInputElement>(null);

  const menuItems = [
    {
      step: POCStep.POC_DETAILS,
      title: t.nav.project,
      desc: t.pocDetails.subtitle,
      icon: <ClipboardList className="w-6 h-6 text-blue-600" />,
      isValid: status.details,
      colorClass: "hover:border-blue-400 hover:shadow-blue-100",
      iconBg: "bg-blue-50"
    },
    {
      step: POCStep.HARDWARE_VALIDATION,
      title: t.nav.hardware,
      desc: t.hardware.profile,
      icon: <Server className="w-6 h-6 text-purple-600" />,
      isValid: status.hardware,
      colorClass: "hover:border-purple-400 hover:shadow-purple-100",
      iconBg: "bg-purple-50"
    },
    {
      step: POCStep.NETWORK_CONFIG,
      title: t.nav.network,
      desc: "Configure IPs, VLANs, and validate topology.",
      icon: <Network className="w-6 h-6 text-orange-600" />,
      isValid: status.network,
      colorClass: "hover:border-orange-400 hover:shadow-orange-100",
      iconBg: "bg-orange-50"
    },
    {
      step: POCStep.SHELL_TOOLBOX,
      title: "Shell Toolbox",
      desc: "One-liner commands for hardware benchmarks & etcd checks.",
      icon: <Terminal className="w-6 h-6 text-slate-600" />,
      isValid: true,
      colorClass: "hover:border-slate-400 hover:shadow-slate-100",
      iconBg: "bg-slate-50"
    },
    {
      step: POCStep.INSTALL_GUIDE,
      title: "Installation Guide",
      desc: "Comprehensive documentation and step-by-step manual.",
      icon: <BookOpen className="w-6 h-6 text-emerald-600" />,
      isValid: true, 
      colorClass: "hover:border-emerald-400 hover:shadow-emerald-100",
      iconBg: "bg-emerald-50"
    },
    {
      step: POCStep.CLOUD_INIT_CRD,
      title: t.nav.automation,
      desc: "Generate Cloud-Init YAML and Harvester K8s Manifests (CRDs).",
      icon: <div className="relative"><FileCode className="w-6 h-6 text-teal-600" /><Layers className="w-3 h-3 text-teal-400 absolute -bottom-1 -right-1" /></div>,
      isValid: true,
      colorClass: "hover:border-teal-400 hover:shadow-teal-100",
      iconBg: "bg-teal-50"
    },
    {
      step: POCStep.TEST_PLAN,
      title: t.nav.tests,
      desc: "Detailed test cases for your specific POC goals.",
      icon: <CheckSquare className="w-6 h-6 text-amber-600" />,
      isValid: true,
      colorClass: "hover:border-amber-400 hover:shadow-amber-100",
      iconBg: "bg-amber-50"
    },
    {
      step: POCStep.INITIAL_CONFIG,
      title: t.nav.validation,
      desc: "Step-by-step guides for specific POC success criteria.",
      icon: <Target className="w-6 h-6 text-cyan-600" />,
      isValid: status.config,
      colorClass: "hover:border-cyan-400 hover:shadow-cyan-100",
      iconBg: "bg-cyan-50"
    },
  ];

  const StatusBadge = ({ valid, label }: { valid?: boolean, label?: string }) => {
     if (valid === undefined) {
         return <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full border border-gray-200 flex items-center gap-1">{t.common.reference}</span>;
     }
     return valid ? (
         <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full border border-green-200 flex items-center gap-1">
             <CheckCircle2 className="w-3 h-3"/> {label || t.common.completed}
         </span>
     ) : (
         <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full border border-gray-200 flex items-center gap-1">
             <Clock className="w-3 h-3"/> {t.common.pending}
         </span>
     );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onImport(file);
  };

  return (
    <div className="animate-fade-in pb-12">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept=".json" 
        className="hidden" 
      />
      
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-suse-dark">{t.dashboard.welcome}</h2>
        <p className="text-gray-600 mt-3 text-lg">
            {t.dashboard.subtitle}
        </p>
        
        <div className="mt-6 flex justify-center gap-3">
            <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50">
                <Upload className="w-4 h-4" /> {t.dashboard.import}
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {menuItems.map((item) => (
          <button
            key={item.step}
            onClick={() => onSelectStep(item.step)}
            className={`group relative p-6 rounded-2xl border border-gray-200 bg-white text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${item.colorClass}`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl transition-colors ${item.iconBg}`}>
                {item.icon}
              </div>
              <StatusBadge valid={item.isValid} />
            </div>
            
            <h3 className="text-base font-bold text-gray-800 mb-2 group-hover:text-black">{item.title}</h3>
            <p className="text-[11px] text-gray-500 mb-6 leading-relaxed min-h-[40px]">{item.desc}</p>
            
            <div className="flex items-center text-[10px] font-bold text-gray-400 group-hover:text-suse-base transition-colors uppercase tracking-widest">
              {t.common.home} <ArrowRight className="w-3 h-3 ml-2 transition-transform group-hover:translate-x-1" />
            </div>
          </button>
        ))}

        <button
            onClick={() => onSelectStep(POCStep.COMPLETED)}
            className="group relative p-6 rounded-2xl border border-slate-700 bg-suse-dark text-left transition-all duration-300 shadow-lg hover:shadow-2xl hover:bg-[#0f3d36] hover:-translate-y-1 md:col-span-2 lg:col-span-2"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <span className="text-[10px] font-bold text-white/80 bg-white/10 px-2 py-0.5 rounded-full border border-white/20">{t.nav.report}</span>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">{t.dashboard.reportTitle}</h3>
            <p className="text-sm text-gray-300 mb-6 leading-relaxed">{t.dashboard.reportDesc}</p>
            
            <div className="flex items-center text-sm font-bold text-white/70 group-hover:text-white transition-colors">
              {t.common.finish} <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </div>
        </button>
      </div>
    </div>
  );
};
