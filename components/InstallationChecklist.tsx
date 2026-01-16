
import React, { useState, useEffect, useMemo } from 'react';
import { Language } from '../types';
import { CheckSquare, Square, Info, Server, Settings, PlayCircle, ChevronDown, ChevronUp, Wrench, AlertTriangle, AlertCircle, Search, ExternalLink, ShieldAlert, Cpu, Activity } from 'lucide-react';
import { translations } from '../i18n';

interface Props {
  lang: Language;
  onComplete: (isComplete: boolean) => void;
}

export const InstallationChecklist: React.FC<Props> = ({ lang, onComplete }) => {
  const t = translations[lang];
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());
  
  const groups = useMemo(() => t.installation.groups, [t]);
  
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set([groups[0].title]));

  const toggleCheck = (id: string) => {
    const next = new Set(checkedIds);
    next.has(id) ? next.delete(id) : next.add(id);
    setCheckedIds(next);
  };

  const toggleExpand = (title: string) => {
      const next = new Set(expandedIds);
      next.has(title) ? next.delete(title) : next.add(title);
      setExpandedIds(next);
  };

  useEffect(() => {
    const allIds = groups.flatMap(g => g.steps.map(s => s.id));
    onComplete(allIds.length > 0 && allIds.every(id => checkedIds.has(id)));
  }, [checkedIds, onComplete, groups]);

  const totalSteps = groups.flatMap(g => g.steps).length;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-suse-dark">{t.installation.title}</h2>
          <p className="text-sm text-gray-500 mt-1">{t.installation.subtitle}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t.installation.progress}</div>
          <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
             <div 
               className="h-full bg-suse-base transition-all duration-500" 
               style={{ width: `${totalSteps > 0 ? (checkedIds.size / totalSteps) * 100 : 0}%` }}
             ></div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {groups.map((group, gIdx) => (
          <div key={gIdx} className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm transition-all">
            <div 
                className="bg-gray-50 px-5 py-4 border-b border-gray-200 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => toggleExpand(group.title)}
            >
              <div className="flex items-center gap-3 font-bold text-gray-800">
                <div className="p-1.5 bg-white rounded border border-gray-200 text-suse-base">
                    <Server className="w-5 h-5" />
                </div>
                {group.title}
              </div>
              <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-gray-400 bg-gray-200 px-2 py-0.5 rounded-full uppercase">
                      {group.steps.filter(s => checkedIds.has(s.id)).length} / {group.steps.length}
                  </span>
                  {expandedIds.has(group.title) ? <ChevronUp className="w-4 h-4 text-gray-400"/> : <ChevronDown className="w-4 h-4 text-gray-400"/>}
              </div>
            </div>

            {expandedIds.has(group.title) && (
                <div className="animate-slide-down">
                    <div className="p-4 bg-amber-50 border-b border-amber-100 flex flex-col gap-2">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                          <div className="text-xs text-amber-900 leading-relaxed">
                              <span className="font-bold uppercase tracking-widest text-[9px] block mb-0.5 text-amber-700">{t.installation.pitfallLabel}</span>
                              {group.pitfall}
                          </div>
                        </div>
                    </div>

                    <div className="divide-y divide-gray-100">
                    {group.steps.map(step => (
                        <div 
                            key={step.id} 
                            className={`p-5 flex items-start gap-4 transition-colors hover:bg-slate-50 cursor-pointer ${checkedIds.has(step.id) ? 'bg-emerald-50/10' : ''}`} 
                            onClick={() => toggleCheck(step.id)}
                        >
                        <div className={`mt-0.5 transition-colors ${checkedIds.has(step.id) ? 'text-suse-base' : 'text-gray-300'}`}>
                            {checkedIds.has(step.id) ? <CheckSquare className="w-6 h-6"/> : <Square className="w-6 h-6"/>}
                        </div>
                        <div className="flex-1">
                            <div className={`text-sm font-bold transition-colors ${checkedIds.has(step.id) ? 'text-gray-900' : 'text-gray-700'}`}>{step.label}</div>
                            <div className="text-xs text-gray-600 mt-1 leading-relaxed bg-white/50 p-2 rounded border border-gray-100 italic">{step.description}</div>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center gap-4">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
              <Info className="w-5 h-5" />
          </div>
          <div className="text-xs text-blue-800 leading-relaxed">
              <strong>{t.installation.nextStep}:</strong> {t.installation.nextStepDesc}
          </div>
      </div>
    </div>
  );
};
