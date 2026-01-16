
import React, { useEffect } from 'react';
import { POCData, Language } from '../types';
import { translations, POC_GOALS_LOCALIZED } from '../i18n';
import { ClipboardList, Target, User, Building, CheckSquare, Square, Flag, Calendar, Phone, Mail, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Props {
  lang: Language;
  data: POCData;
  updateData: (data: Partial<POCData>) => void;
  onValidationChange: (isValid: boolean) => void;
}

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const PocDetailsForm: React.FC<Props> = ({ lang, data, updateData, onValidationChange }) => {
  const t = translations[lang];
  const goalOptions = POC_GOALS_LOCALIZED[lang];

  useEffect(() => {
    const isValid = !!(
      data.projectName && 
      data.leadEngineer && 
      isValidEmail(data.leadEmail) && 
      data.clientOrganization && 
      data.goals.length > 0
    );
    onValidationChange(isValid);
  }, [data, onValidationChange]);

  const toggleGoal = (goal: string) => {
    const currentGoals = data.goals || [];
    if (currentGoals.includes(goal)) {
      updateData({ goals: currentGoals.filter(g => g !== goal) });
    } else {
      updateData({ goals: [...currentGoals, goal] });
    }
  };

  const toggleAllGoals = () => {
    if (data.goals.length === goalOptions.length) {
      updateData({ goals: [] });
    } else {
      updateData({ goals: [...goalOptions] });
    }
  };

  const getBorderClass = (val: string, type: 'text' | 'email' | 'required' = 'text') => {
    if (!val) return "border-gray-300 focus:ring-suse-base";
    if (type === 'email' && !isValidEmail(val)) return "border-red-500 ring-1 ring-red-100 focus:ring-red-500";
    if (type === 'required' && val.length < 2) return "border-red-500 ring-1 ring-red-100 focus:ring-red-500";
    return "border-green-400 focus:ring-suse-base";
  };

  const inputClasses = "w-full pl-3 pr-3 py-2.5 bg-white border rounded-lg focus:ring-2 placeholder-gray-400 shadow-sm transition-all outline-none";
  const allSelected = data.goals.length === goalOptions.length;

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <div className="mb-8">
            <h2 className="text-3xl font-bold text-suse-dark flex items-center gap-3">
              <ClipboardList className="w-8 h-8 text-suse-base" />
              {t.pocDetails.title}
            </h2>
            <p className="text-gray-500 mt-2">
              {t.pocDetails.subtitle}
            </p>
        </div>

        {/* Global Project Name */}
        <div className="mb-10">
            <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-3">
              {t.pocDetails.projectName} <span className="text-red-500">*</span>
            </label>
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-suse-base transition-colors">
                <Target className="w-6 h-6"/>
              </span>
              <input 
                type="text" 
                value={data.projectName}
                onChange={(e) => updateData({ projectName: e.target.value })}
                className={`${inputClasses} pl-14 text-xl font-bold py-4 ${getBorderClass(data.projectName, 'required')}`}
                placeholder={t.pocDetails.projectPlaceholder}
              />
            </div>
            {!data.projectName && <p className="text-[10px] text-red-500 mt-2 font-bold flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5"/> {t.common.required}</p>}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Responsável */}
            <div className="space-y-6">
                <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest flex items-center gap-2 pb-2 border-b border-gray-100">
                   <User className="w-4 h-4 text-blue-600" /> {t.pocDetails.leadTitle}
                </h3>
                <div className="space-y-5">
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 mb-1.5 uppercase tracking-wide">{t.pocDetails.leadName}</label>
                        <input 
                            type="text" 
                            value={data.leadEngineer}
                            onChange={(e) => updateData({ leadEngineer: e.target.value })}
                            className={`${inputClasses} ${getBorderClass(data.leadEngineer, 'required')}`}
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 mb-1.5 uppercase tracking-wide">{t.pocDetails.leadEmail}</label>
                        <input 
                            type="email" 
                            value={data.leadEmail}
                            onChange={(e) => updateData({ leadEmail: e.target.value })}
                            className={`${inputClasses} ${getBorderClass(data.leadEmail, 'email')}`}
                        />
                    </div>
                </div>
            </div>

            {/* Cliente */}
            <div className="space-y-6">
                <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest flex items-center gap-2 pb-2 border-b border-gray-100">
                   <Building className="w-4 h-4 text-orange-600" /> {t.pocDetails.clientTitle}
                </h3>
                <div className="space-y-5">
                    <div>
                        <label className="block text-[10px] font-bold text-gray-400 mb-1.5 uppercase tracking-wide">{t.pocDetails.clientOrg}</label>
                        <input 
                            type="text" 
                            value={data.clientOrganization}
                            onChange={(e) => updateData({ clientOrganization: e.target.value })}
                            className={`${inputClasses} ${getBorderClass(data.clientOrganization, 'required')}`}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 mb-1.5 uppercase tracking-wide">{t.pocDetails.clientContact}</label>
                            <input 
                                type="text" 
                                value={data.clientContactName}
                                onChange={(e) => updateData({ clientContactName: e.target.value })}
                                className={`${inputClasses} ${getBorderClass(data.clientContactName)}`}
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 mb-1.5 uppercase tracking-wide">{t.pocDetails.clientPhone}</label>
                            <input 
                                type="tel"
                                value={data.clientContactPhone}
                                onChange={(e) => updateData({ clientContactPhone: e.target.value })}
                                className={inputClasses}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Datas */}
        <div className="mt-12 bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
                <Calendar className="w-32 h-32" />
            </div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-3">
                <div className="p-2 bg-suse-base rounded-xl text-white shadow-lg shadow-suse-base/20">
                    <Calendar className="w-5 h-5" />
                </div>
                {t.pocDetails.scheduleTitle}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <div className="space-y-2">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.1em]">{t.pocDetails.startDate}</label>
                    <input 
                      type="date" 
                      value={data.startDate}
                      onChange={(e) => updateData({ startDate: e.target.value })}
                      className="w-full bg-slate-800 border-none rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-suse-base"
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.1em]">{t.pocDetails.targetDate}</label>
                    <input 
                      type="date" 
                      value={data.targetDate}
                      onChange={(e) => updateData({ targetDate: e.target.value })}
                      className="w-full bg-slate-800 border-none rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-suse-base"
                    />
                </div>
            </div>
        </div>

        {/* Goals Selection */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
             <div className="flex items-center gap-3">
                <div className="p-2.5 bg-suse-accent/10 rounded-2xl">
                    <Flag className="w-7 h-7 text-suse-accent" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-gray-800">{t.pocDetails.goalsTitle}</h3>
                    <p className="text-sm text-gray-500">{t.pocDetails.goalsSubtitle}</p>
                </div>
             </div>
             
             <button 
                onClick={toggleAllGoals}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all duration-300 border ${allSelected ? 'bg-suse-base border-suse-base text-white shadow-xl shadow-suse-base/20' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}
             >
                {allSelected ? <CheckCircle2 className="w-4 h-4" /> : <CheckSquare className="w-4 h-4" />}
                {allSelected ? t.pocDetails.clearAll : t.pocDetails.selectAll}
             </button>
          </div>
          
          <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {goalOptions.map((goal, index) => {
                const isSelected = data.goals.includes(goal);
                return (
                  <div 
                    key={index}
                    onClick={() => toggleGoal(goal)}
                    className={`flex items-center p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${isSelected ? 'bg-white border-suse-base shadow-xl ring-4 ring-suse-base/5' : 'bg-white border-transparent hover:border-gray-200 hover:shadow-md'}`}
                  >
                    <div className={`mr-4 transition-colors ${isSelected ? 'text-suse-base' : 'text-gray-200'}`}>
                      {isSelected ? <CheckSquare className="w-6 h-6 stroke-[2.5px]" /> : <Square className="w-6 h-6 stroke-[2px]" />}
                    </div>
                    <span className={`text-sm leading-snug ${isSelected ? 'text-gray-900 font-black' : 'text-gray-500 font-medium'}`}>
                      {goal}
                    </span>
                  </div>
                );
              })}
            </div>
            {data.goals.length === 0 && (
              <div className="mt-8 p-4 bg-orange-50 border border-orange-200 rounded-2xl flex items-center gap-3 animate-pulse">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <span className="text-xs font-bold text-orange-800">{t.pocDetails.goalRequired}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
