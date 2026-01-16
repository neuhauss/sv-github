
import React, { useState } from 'react';
import { Terminal, Copy, Check, Search, ExternalLink, Activity, Network, HardDrive, Trash2, AlertCircle, Info, ShieldAlert, Cpu, Database, Cloud } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n';

interface Props {
  lang: Language;
}

export const ShellToolbox: React.FC<Props> = ({ lang }) => {
  const [copied, setCopied] = useState<string | null>(null);
  const t = translations[lang];

  const handleCopy = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopied(cmd);
    setTimeout(() => setCopied(null), 2000);
  };

  const CATEGORIES = [
    {
      id: 'bench',
      title: t.shell.categories.bench,
      icon: Cpu,
      color: "text-blue-500",
      items: [
        {
          label: "Etcd Fsync Latency Test",
          cmd: "fio --filename=/var/lib/etcd/test --rw=write --bs=4k --size=50M --name=etcd_check --iodepth=1 --runtime=10 --time_based --fsync=1",
          desc: "Measures disk sync latency. Result must be < 10ms for etcd stability.",
          urgent: true
        }
      ]
    },
    {
        id: 'net',
        title: t.shell.categories.net,
        icon: Network,
        color: "text-orange-500",
        items: [
          {
            label: "Check Management Bridge",
            cmd: "brctl show harvester-br0",
            desc: "Verifies if physical NICs are correctly bound to the Harvester bridge."
          },
          {
            label: "Test VIP Visibility",
            cmd: "arping -I mgmt -c 3 [CLUSTER_VIP]",
            desc: "Checks if the Floating VIP is responding to Layer 2 requests."
          },
          {
            label: "MTU Validation",
            cmd: "ip link show harvester-br0",
            desc: "Verifies if Jumbo Frames (MTU 9000) are correctly configured."
          }
        ]
    },
    {
        id: 'health',
        title: t.shell.categories.health,
        icon: Activity,
        color: "text-emerald-500",
        items: [
          {
            label: "Cluster Node Status",
            cmd: "kubectl get nodes -o wide",
            desc: "Checks internal K8s node state and Harvester OS version."
          },
          {
            label: "Longhorn Replica Health",
            cmd: "kubectl get volumes.longhorn.io -n longhorn-system",
            desc: "Lists all volumes and shows if they are 'Healthy' or 'Degraded'."
          },
          {
            label: "Check KubeVirt Pods",
            cmd: "kubectl get pods -n harvester-system -l app=virt-launcher",
            desc: "Lists active VM processes running on the host."
          }
        ]
    },
    {
        id: 'diag',
        title: t.shell.categories.diag,
        icon: ShieldAlert,
        color: "text-red-500",
        items: [
          {
            label: "Generate Support Bundle",
            cmd: "harvester-generate-bundle",
            desc: "Creates a complete log archive for SUSE Support (SCC)."
          },
          {
            label: "Journal Logs (Harvester)",
            cmd: "journalctl -u harvester -f",
            desc: "Streams live logs from the Harvester management service."
          }
        ]
    },
    {
        id: 'rancher_cleanup',
        title: t.shell.categories.rancher_cleanup,
        icon: Trash2,
        color: "text-purple-500",
        items: [
          {
            label: "Force Remove Namespace",
            cmd: "kubectl delete ns cattle-system --grace-period=0 --force",
            desc: "Aggressive removal of Rancher agent namespace if stuck in 'Terminating'."
          },
          {
            label: "Clear Cluster Finalizers",
            cmd: "kubectl patch clusters.management.cattle.io [CLUSTER_ID] -p '{\"metadata\":{\"finalizers\":[]}}' --type=merge",
            desc: "Removes blockages when deleting a cluster from Rancher UI."
          },
          {
            label: "Wipe Rancher Agents",
            cmd: "docker stop $(docker ps -q --filter name=cattle) && docker rm $(docker ps -aq --filter name=cattle)",
            desc: "Stops and deletes all Rancher-related containers from the node."
          }
        ]
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div className="flex items-center gap-5">
                <div className="p-4 bg-slate-900 text-suse-base rounded-2xl shadow-xl">
                    <Terminal className="w-8 h-8" />
                </div>
                <div>
                    <h2 className="text-3xl font-black text-suse-dark uppercase tracking-tight">{t.shell.title}</h2>
                    <p className="text-gray-500 font-medium">{t.shell.subtitle}</p>
                </div>
            </div>
            <div className="bg-amber-50 px-5 py-3 rounded-2xl border border-amber-100 flex items-center gap-3">
                <Info className="w-5 h-5 text-amber-600" />
                <span className="text-[10px] text-amber-800 font-bold uppercase tracking-widest leading-none">Login: root / admin-password</span>
            </div>
        </div>

        <div className="space-y-12">
          {CATEGORIES.map((cat) => (
            <section key={cat.id} className="space-y-6">
              <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                <cat.icon className={`w-5 h-5 ${cat.color}`} />
                <h3 className="text-lg font-black text-gray-800 uppercase tracking-widest">{cat.title}</h3>
              </div>
              
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                {cat.items.map((item, iIdx) => (
                  <div 
                    key={iIdx} 
                    className={`group relative bg-slate-50 rounded-3xl p-6 border-2 transition-all duration-300 hover:bg-white hover:shadow-xl hover:border-suse-base/30 ${item.urgent ? 'border-amber-200 bg-amber-50/30' : 'border-transparent'}`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-slate-800 uppercase tracking-wide">{item.label}</span>
                        {item.urgent && <span className="px-2 py-0.5 bg-amber-500 text-white text-[8px] font-black rounded-full uppercase">Critical Test</span>}
                      </div>
                      <button 
                        onClick={() => handleCopy(item.cmd)} 
                        className={`p-2 rounded-xl transition-all ${copied === item.cmd ? 'bg-suse-base text-white shadow-lg' : 'bg-white border border-gray-200 text-slate-400 hover:text-suse-base hover:border-suse-base shadow-sm'}`}
                        title="Copy command"
                      >
                        {copied === item.cmd ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>

                    <div className="bg-slate-900 rounded-2xl p-4 font-mono text-[11px] text-emerald-400 overflow-x-auto shadow-inner border border-slate-800 mb-4 group-hover:border-suse-base/20 transition-colors">
                      <span className="text-slate-600 mr-2 select-none">$</span> {item.cmd}
                    </div>

                    <div className="flex items-start gap-3">
                        <Search className="w-3.5 h-3.5 text-slate-300 shrink-0 mt-0.5" />
                        <p className="text-[10px] text-slate-500 font-medium leading-relaxed italic">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Rancher Cleanup Explainer Session */}
        <div className="mt-20 bg-slate-900 rounded-[3.5rem] p-12 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-12 opacity-5">
                <Trash2 className="w-64 h-64" />
            </div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-1 space-y-6">
                    <div className="p-4 bg-purple-600/20 text-purple-400 rounded-3xl w-fit border border-purple-500/30">
                        <Cloud className="w-10 h-10" />
                    </div>
                    <h4 className="text-2xl font-black uppercase tracking-tight">Rancher Integration Cleanup</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        If a Harvester cluster is deleted in Rancher but remains in a &quot;Removing&quot; or &quot;Terminating&quot; state, local cleanup is required to release physical node resources.
                    </p>
                    <div className="p-5 bg-red-500/10 border-l-4 border-red-500 rounded-xl">
                        <p className="text-[10px] text-red-400 font-bold uppercase mb-1 flex items-center gap-2"><AlertCircle className="w-3.5 h-3.5"/> Warning</p>
                        <p className="text-[10px] text-slate-300">These commands are destructive. Only run them if you intend to permanently detach the cluster from Rancher.</p>
                    </div>
                </div>
                
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4 hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-3 text-purple-400">
                           <span className="w-8 h-8 rounded-xl bg-purple-600/20 flex items-center justify-center font-black text-xs border border-purple-500/20">1</span>
                           <span className="text-xs font-black uppercase tracking-widest">Manual Purge</span>
                        </div>
                        <p className="text-[10px] text-slate-400">Use this if the cluster doesn&apos;t disappear from the Harvester UI after Rancher removal.</p>
                        <div className="bg-black/40 p-3 rounded-xl font-mono text-[9px] text-purple-300 border border-purple-500/10">
                            kubectl delete cluster.management.cattle.io [ID] --force
                        </div>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4 hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-3 text-purple-400">
                           <span className="w-8 h-8 rounded-xl bg-purple-600/20 flex items-center justify-center font-black text-xs border border-purple-500/20">2</span>
                           <span className="text-xs font-black uppercase tracking-widest">Agent Wipe</span>
                        </div>
                        <p className="text-[10px] text-slate-400">Removes Rancher-deployed system pods and configuration from the local cluster.</p>
                        <div className="bg-black/40 p-3 rounded-xl font-mono text-[9px] text-purple-300 border border-purple-500/10">
                            kubectl delete ns cattle-system cattle-impersonation-system
                        </div>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4 hover:bg-white/10 transition-colors md:col-span-2">
                        <h5 className="text-[10px] font-black text-suse-base uppercase tracking-[0.2em]">Full Cleanup Procedure</h5>
                        <ol className="text-[10px] text-slate-300 space-y-2 list-decimal list-inside leading-relaxed opacity-80">
                            <li>Remove Harvester cluster from Rancher UI (Virtualization Management).</li>
                            <li>If stuck, remove the finalizers from the cluster object using <code>kubectl patch</code>.</li>
                            <li>On the Harvester nodes, delete the <code>cattle-system</code> namespace.</li>
                            <li>Restart the Harvester service to ensure a clean state: <code>systemctl restart harvester</code>.</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
