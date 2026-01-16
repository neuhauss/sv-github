
import React, { useState } from 'react';
import { CheckCircle2, XCircle, CheckSquare, Printer, AlertTriangle } from 'lucide-react';
import { Language } from '../types';
import { translations, TEST_CASES_LOCALIZED } from '../i18n';

interface Props {
  lang: Language;
  goals: string[];
}

export const TestPlan: React.FC<Props> = ({ lang, goals }) => {
  const [results, setResults] = useState<Record<string, 'pass' | 'fail' | 'pending'>>({});
  const t = translations[lang];
  const testCases = TEST_CASES_LOCALIZED[lang];

  const toggleResult = (goal: string, status: 'pass' | 'fail') => {
    setResults(prev => ({
      ...prev,
      [goal]: prev[goal] === status ? 'pending' : status
    }));
  };

  const passCount = Object.values(results).filter(v => v === 'pass').length;
  const failCount = Object.values(results).filter(v => v === 'fail').length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-6">
          <div className="flex items-center gap-4">
             <div className="p-3 bg-suse-base/10 rounded-2xl">
                <CheckSquare className="w-8 h-8 text-suse-base" />
             </div>
             <div>
                <h2 className="text-2xl font-bold text-suse-dark">{t.testPlan.title}</h2>
                <p className="text-sm text-gray-500">{t.testPlan.subtitle}</p>
             </div>
          </div>
          <button onClick={() => window.print()} className="no-print flex items-center gap-2 px-6 py-3 bg-suse-dark text-white rounded-xl text-sm font-bold shadow-lg">
            <Printer className="w-4 h-4" /> {t.common.print}
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t.testPlan.summary.planned}</div>
                <div className="text-3xl font-bold text-slate-800">{goals.length}</div>
            </div>
            <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl">
                <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-1">{t.testPlan.summary.success}</div>
                <div className="text-3xl font-bold text-emerald-700">{passCount}</div>
            </div>
            <div className="p-5 bg-red-50 border border-red-200 rounded-2xl">
                <div className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-1">{t.testPlan.summary.fail}</div>
                <div className="text-3xl font-bold text-red-700">{failCount}</div>
            </div>
        </div>

        <div className="overflow-hidden border border-gray-200 rounded-2xl">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
              <tr>
                <th className="px-6 py-4">{t.testPlan.table.criteria}</th>
                <th className="px-6 py-4">{t.testPlan.table.procedure}</th>
                <th className="px-6 py-4">{t.testPlan.table.expected}</th>
                <th className="px-6 py-4 text-center no-print">{t.testPlan.table.validate}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {goals.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-24 text-center text-gray-400 italic">
                    <div className="flex flex-col items-center gap-3">
                        <AlertTriangle className="w-12 h-12 opacity-10" />
                        <p>{t.pocDetails.goalRequired}</p>
                    </div>
                  </td>
                </tr>
              ) : goals.map((goal, idx) => {
                const testCase = testCases[goal] || { steps: "Exec: Dashboard v1.7.", expected: "Success." };
                const status = results[goal] || 'pending';
                
                return (
                  <tr key={idx} className={`hover:bg-slate-50/50 ${status === 'pass' ? 'bg-emerald-50/30' : status === 'fail' ? 'bg-red-50/30' : ''}`}>
                    <td className="px-6 py-5 font-bold text-slate-800 text-xs">{goal}</td>
                    <td className="px-6 py-5 text-slate-500 text-[11px]">{testCase.steps}</td>
                    <td className="px-6 py-5 text-slate-500 text-[11px] italic">{testCase.expected}</td>
                    <td className="px-6 py-5 no-print">
                      <div className="flex justify-center gap-3">
                        <button onClick={() => toggleResult(goal, 'pass')} className={`p-2 rounded-lg border ${status === 'pass' ? 'bg-emerald-600 border-emerald-700 text-white' : 'bg-white text-gray-300'}`}>
                          <CheckCircle2 className="w-5 h-5" />
                        </button>
                        <button onClick={() => toggleResult(goal, 'fail')} className={`p-2 rounded-lg border ${status === 'fail' ? 'bg-red-600 border-red-700 text-white' : 'bg-white text-gray-300'}`}>
                          <XCircle className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
