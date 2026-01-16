
import React, { useEffect, useState } from 'react';
import { HardwareSpecs, ValidationStatus, Language } from '../types';
import { translations } from '../i18n';
import { Server, Cpu, HardDrive, CheckCircle2, AlertTriangle, Check, Zap, Cpu as GpuIcon, ShieldCheck } from 'lucide-react';

interface Props {
  lang: Language;
  specs: HardwareSpecs;
  updateSpecs: (specs: Partial<HardwareSpecs>) => void;
  onValidationChange: (status: ValidationStatus) => void;
}

const ValidatedInput = ({ 
    type = "number", 
    value, 
    onChange, 
    isValid, 
    min,
    label,
    placeholder,
    icon: Icon 
  }: any) => (
    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors">
      <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
         {Icon && <Icon className="w-4 h-4 text-gray-500" />} {label}
      </label>
      <div className="relative">
        <input 
          type={type}
          min={min}
          value={value || ''}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full pl-3 pr-10 py-3 bg-white border rounded-lg outline-none transition-all shadow-sm placeholder-gray-400 ${isValid ? 'border-green-400 ring-1 ring-green-400/30' : 'border-gray-300 focus:border-suse-base focus:ring-2 focus:ring-suse-base/20'}`}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-300">
          {isValid ? (
             <div className="bg-green-100 p-1 rounded-full">
               <Check className="w-4 h-4 text-green-600" />
             </div>
          ) : (
            <span className="text-xs text-gray-400 font-medium">Min: {min}</span>
          )}
        </div>
      </div>
    </div>
);

export const HardwareValidation: React.FC<Props> = ({ lang, specs, updateSpecs, onValidationChange }) => {
  const t = translations[lang];
  const [validation, setValidation] = useState<ValidationStatus>({ isValid: false, messages: [] });

  const REQ = {
    CPU_CORES: 8,
    RAM_GB: 32,
    DISK_GB: 250,
    NETWORK_GB: 1,
  };

  useEffect(() => {
    const messages: string[] = [];
    let isValid = true;

    if (specs.nodeCount < 3) {
      messages.push(lang === 'pt' ? "Mínimo de 3 nós recomendado." : lang === 'es' ? "Mínimo de 3 nodos recomendado." : "Min 3 nodes recommended.");
    }

    if (specs.cpuCores < REQ.CPU_CORES) {
      messages.push(`${t.common.required}: ${REQ.CPU_CORES} Cores.`);
      isValid = false;
    }

    if (specs.ramGb < REQ.RAM_GB) {
      messages.push(`${t.common.required}: ${REQ.RAM_GB} GB RAM.`);
      isValid = false;
    }

    setValidation({ isValid, messages });
    onValidationChange({ isValid, messages });
  }, [specs, onValidationChange, lang]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-suse-dark flex items-center gap-2">
                <Server className="w-6 h-6 text-suse-base" /> {t.hardware.title}
            </h2>
            <span className="text-[10px] font-bold bg-suse-base/10 text-suse-base px-2 py-1 rounded">{t.hardware.profile}</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
           <ValidatedInput label={t.hardware.nodes} value={specs.nodeCount} onChange={(e: any) => updateSpecs({ nodeCount: parseInt(e.target.value) || 0 })} isValid={specs.nodeCount >= 3} min={3} />
           <ValidatedInput label={t.hardware.cores} icon={Cpu} value={specs.cpuCores} onChange={(e: any) => updateSpecs({ cpuCores: parseInt(e.target.value) || 0 })} isValid={specs.cpuCores >= REQ.CPU_CORES} min={REQ.CPU_CORES} />
           <ValidatedInput label={t.hardware.ram} value={specs.ramGb} onChange={(e: any) => updateSpecs({ ramGb: parseInt(e.target.value) || 0 })} isValid={specs.ramGb >= REQ.RAM_GB} min={REQ.RAM_GB} />
           
           <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
             <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <GpuIcon className="w-4 h-4 text-purple-500" /> {t.hardware.gpu}
             </label>
             <button 
                onClick={() => updateSpecs({ hasGpu: !specs.hasGpu })}
                className={`w-full py-3 px-4 rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-2 ${specs.hasGpu ? 'bg-purple-600 text-white shadow-lg shadow-purple-200' : 'bg-white border border-gray-200 text-gray-400'}`}
             >
                {specs.hasGpu ? <ShieldCheck className="w-4 h-4"/> : null}
                {specs.hasGpu ? t.hardware.gpuEnabled : t.hardware.gpuDisabled}
             </button>
           </div>

           <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
            <label className="block text-sm font-bold text-gray-700 mb-2">{t.hardware.storageType}</label>
            <select 
              value={specs.diskType}
              onChange={(e) => updateSpecs({ diskType: e.target.value as any })}
              className="w-full p-3 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-suse-base"
            >
              <option value="NVMe">NVMe</option>
              <option value="SSD">SSD</option>
              <option value="HDD">HDD</option>
            </select>
           </div>
        </div>

        <div className={`p-4 rounded-md transition-all duration-300 ${validation.isValid ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
          <h3 className="font-bold flex items-center gap-2 mb-2">
            {validation.isValid ? <CheckCircle2 className="text-green-600"/> : <AlertTriangle className="text-orange-600"/>}
            {validation.isValid ? t.hardware.compatible : t.hardware.notMet}
          </h3>
          <ul className="space-y-1 ml-6 list-disc text-sm text-gray-700">
            {validation.messages.map((msg, idx) => <li key={idx}>{msg}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
};
