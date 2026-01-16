
import React, { useState, useEffect } from 'react';
import { ChecklistItem, NetworkSpecs, Language } from '../types';
import { Target, CheckSquare, Square, ChevronDown, ChevronUp, Flag, Settings } from 'lucide-react';
import { translations } from '../i18n';

interface Props {
  lang: Language;
  onComplete: (isComplete: boolean) => void;
  goals: string[];
  netSpecs: NetworkSpecs;
}

export const InitialConfig: React.FC<Props> = ({ lang, onComplete, goals = [], netSpecs }) => {
  const [configSteps, setConfigSteps] = useState<ChecklistItem[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const t = translations[lang];

  useEffect(() => {
    const goalSteps: ChecklistItem[] = goals.map((goal, index) => ({
      id: `goal-${index}`,
      label: goal,
      description: lang === 'en' ? 'Technical Steps for validation' : lang === 'pt' ? 'Etapas Técnicas para Validação' : 'Pasos técnicos de validación',
      details: goal,
      checked: false
    }));
    setConfigSteps([{ id: 'init', label: lang === 'en' ? 'Initial Cluster Access' : 'Acesso Inicial ao Cluster', checked: false }, ...goalSteps]);
  }, [goals, lang]);

  const toggleCheck = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = configSteps.map(step => step.id === id ? { ...step, checked: !step.checked } : step);
    setConfigSteps(updated);
    onComplete(updated.every(s => s.checked));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-8 animate-fade-in">
      <h2 className="text-2xl font-bold text-suse-dark flex items-center gap-2">
          <Target className="w-6 h-6 text-suse-accent" /> {t.nav.validation}
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {configSteps.map((step) => {
          const isExpanded = expandedId === step.id;
          const isGoal = step.id.startsWith('goal-');
          return (
            <div key={step.id} className={`border rounded-xl transition-all ${step.checked ? 'border-suse-base bg-emerald-50/20' : 'border-gray-200'}`}>
              <div className="p-4 cursor-pointer flex items-center justify-between" onClick={() => setExpandedId(isExpanded ? null : step.id)}>
                 <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${step.checked ? 'bg-suse-base text-white' : 'bg-gray-100 text-gray-500'}`}>
                      {isGoal ? <Flag className="w-5 h-5" /> : <Settings className="w-5 h-5" />}
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 leading-tight">{step.label}</h3>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">{isGoal ? (lang === 'en' ? 'POC Objective' : 'Objetivo da POC') : 'System Init'}</p>
                    </div>
                 </div>
                 <button onClick={(e) => toggleCheck(e, step.id)} className={`transition-colors ${step.checked ? 'text-suse-base' : 'text-gray-300'}`}>
                    {step.checked ? <CheckSquare className="w-7 h-7" /> : <Square className="w-7 h-7" />}
                 </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
