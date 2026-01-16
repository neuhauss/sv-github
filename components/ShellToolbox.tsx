
import React from 'react';
import { Terminal, Copy, Check, Zap, Shield, Network, HardDrive, Search, FileText, Activity, Database, ExternalLink } from 'lucide-react';

const TOOLS = [
  {
    category: "Benchmarking (Etcd Performance)",
    icon: <HardDrive className="w-5 h-5 text-orange-500" />,
    items: [
      {
        label: "Check etcd write latency",
        cmd: "fio --filename=/var/lib/etcd/test --rw=write --bs=4k --size=50M --name=etcd_check --iodepth=1 --runtime=10 --time_based --fsync=1",
        desc: "Crucial para estabilidade. Latência de fsync > 10ms causa falhas no cluster.",
        doc: "https://longhorn.io/docs/1.7.0/best-practices/#etcd-performance"
      }
    ]
  },
  {
    category: "Longhorn Storage Troubleshooting",
    icon: <Database className="w-5 h-5 text-purple-600" />,
    items: [
      {
        label: "Check Storage Pool Health",
        cmd: "kubectl get nodes.longhorn.io -n longhorn-system",
        desc: "Displays the health, scheduling status, and available space for the storage pool on each node.",
        doc: "https://longhorn.io/docs/1.7.0/monitoring/node-status/"
      },
      {
        label: "List Volume Health Status",
        cmd: "kubectl get volumes.longhorn.io -n longhorn-system",
        desc: "Lists all volumes and their current health state (Healthy, Degraded, or Faulted).",
        doc: "https://longhorn.io/docs/1.7.0/monitoring/volume-status/"
      },
      {
        label: "Detailed Disk Usage & Scheduling",
        cmd: "kubectl describe nodes.longhorn.io -n longhorn-system",
        desc: "Provides granular details on disk reservations, usage thresholds, and scheduling issues.",
        doc: "https://longhorn.io/docs/1.7.0/volumes-and-nodes/node-management/"
      },
      {
        label: "Verify Replica Distribution",
        cmd: "kubectl get replicas.longhorn.io -n longhorn-system",
        desc: "Verifies the physical location of each data replica across the nodes in the cluster.",
        doc: "https://longhorn.io/docs/1.7.0/concepts/#replicas"
      }
    ]
  },
  {
    category: "Diagnóstico & Suporte (Evidências)",
    icon: <Search className="w-5 h-5 text-purple-500" />,
    items: [
      {
        label: "Gerar Support Bundle",
        cmd: "harvester-support-bundle",
        desc: "Gera um arquivo .zip com logs de todos os componentes para análise técnica.",
        doc: "https://docs.harvesterhci.io/v1.7/troubleshooting/harvester-support-bundle/"
      },
      {
        label: "Logs do Instalador (Pós-reboot)",
        cmd: "cat /var/log/cloud-init-output.log",
        desc: "Verifique aqui se o nó falhou ao aplicar as configurações iniciais de rede ou tokens."
      },
      {
        label: "Status dos Pods de Storage",
        cmd: "kubectl get pods -n longhorn-system",
        desc: "Confirma se o sistema de storage distribuído está saudável em todos os nós."
      }
    ]
  },
  {
    category: "Network & Connectivity",
    icon: <Network className="w-5 h-5 text-blue-500" />,
    items: [
      {
        label: "Verificar MTU da Interface",
        cmd: "ip a | grep mtu",
        desc: "Diferenças de MTU entre nós causam perda de pacotes no tráfego VXLAN."
      },
      {
        label: "Teste de Conectividade VIP",
        cmd: "ip addr show kube-ipvs0",
        desc: "Mostra se o Virtual IP (VIP) está corretamente mapeado na interface lógica."
      },
      {
        label: "Listar Listeners TCP",
        cmd: "ss -tulpn",
        desc: "Verifique se as portas 6443 (API) e 443 (Dashboard) estão em modo LISTEN."
      }
    ]
  },
  {
      category: "Node Health Check",
      icon: <Activity className="w-5 h-5 text-suse-base" />,
      items: [
          {
              label: "Versão e Status do Kubelet",
              cmd: "systemctl status kubelet",
              desc: "Verifique se o agente do Kubernetes está rodando sem erros críticos."
          },
          {
              label: "Verificar Recursos via CLI",
              cmd: "kubectl top nodes",
              desc: "Visualiza consumo de CPU/RAM de cada nó físico via métricas."
          }
      ]
  }
];

export const ShellToolbox: React.FC = () => {
  const [copied, setCopied] = React.useState<string | null>(null);

  const handleCopy = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopied(cmd);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-suse-dark mb-2 flex items-center gap-2">
          <Terminal className="w-6 h-6 text-suse-base" /> Shell Toolbox
        </h2>
        <p className="text-gray-600 mb-8 text-sm">
          Acesse os nós via SSH (usuário configurado no Cloud-Init) e use os comandos abaixo para validação e troubleshooting.
        </p>

        <div className="space-y-8">
          {TOOLS.map((group, idx) => (
            <div key={idx} className="space-y-4">
              <h3 className="flex items-center gap-2 font-bold text-gray-800 border-b border-gray-100 pb-2">
                {group.icon} {group.category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {group.items.map((item, iIdx) => (
                  <div key={iIdx} className="bg-slate-50 rounded-lg p-4 border border-slate-200 group transition-all hover:bg-white hover:shadow-md">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-slate-700">{item.label}</span>
                      <div className="flex items-center gap-2">
                        {item.doc && (
                          <a 
                            href={item.doc} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-slate-400 hover:text-blue-500 transition-colors p-1"
                            title="Official Documentation"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <button 
                          onClick={() => handleCopy(item.cmd)} 
                          className="text-slate-400 hover:text-suse-base transition-colors p-1"
                          title="Copy Command"
                        >
                          {copied === item.cmd ? <Check className="w-4 h-4 text-suse-base" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="bg-slate-900 rounded p-3 font-mono text-[10px] text-green-400 overflow-x-auto mb-2 border-l-4 border-suse-base shadow-inner">
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
