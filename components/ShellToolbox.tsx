
import React from 'react';
import { Terminal, Copy, Check, Search, ExternalLink } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n';

interface Props {
  lang: Language;
}

export const ShellToolbox: React.FC<Props> = ({ lang }) => {
  const [copied, setCopied] = React.useState<string | null>(null);
  const t = translations[lang];

  // Comandos são universais, mas os textos de auxílio não
  const TOOLS = [
    {
      category: t.shell.categories.bench,
      items: [
        {
          label: lang === 'en' ? "Check etcd write latency" : lang === 'pt' ? "Checar latência de escrita do etcd" : "Comprobar latencia de etcd",
          cmd: "fio --filename=/var/lib/etcd/test --rw=write --bs=4k --size=50M --name=etcd_check --iodepth=1 --runtime=10 --time_based --fsync=1",
          desc: lang === 'en' ? "Crucial for stability. Fsync latency > 10ms causes cluster failures." : "Latência de fsync > 10ms causa falhas no cluster.",
          doc: "https://longhorn.io/docs/1.7.0/best-practices/#etcd-performance"
        }
      ]
    },
    {
      category: t.shell.categories.storage,
      items: [
        {
          label: "Storage Pool Health",
          cmd: "kubectl get nodes.longhorn.io -n longhorn-system",
          desc: lang === 'en' ? "Displays health and available space for storage pool." : "Mostra saúde e espaço disponível para o pool de storage."
        }
      ]
    }
  ];

  const handleCopy = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopied(cmd);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-suse-dark mb-2 flex items-center gap-2">
          <Terminal className="w-6 h-6 text-suse-base" /> {t.shell.title}
        </h2>
        <p className="text-gray-600 mb-8 text-sm">
          {t.shell.subtitle}
        </p>

        <div className="space-y-8">
          {TOOLS.map((group, idx) => (
            <div key={idx} className="space-y-4">
              <h3 className="font-bold text-gray-800 border-b border-gray-100 pb-2 flex items-center gap-2">
                {group.category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {group.items.map((item, iIdx) => (
                  <div key={iIdx} className="bg-slate-50 rounded-lg p-4 border border-slate-200 group transition-all hover:bg-white hover:shadow-md">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-slate-700">{item.label}</span>
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleCopy(item.cmd)} className="text-slate-400 hover:text-suse-base transition-colors p-1">
                          {copied === item.cmd ? <Check className="w-4 h-4 text-suse-base" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="bg-slate-900 rounded p-3 font-mono text-[10px] text-green-400 overflow-x-auto mb-2 border-l-4 border-suse-base">
                      {item.cmd}
                    </div>
                    <div className="flex gap-1.5 items-start">
                        <Search className="w-3 h-3 text-slate-300 shrink-0 mt-0.5" />
                        <p className="text-[10px] text-slate-500 italic leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
