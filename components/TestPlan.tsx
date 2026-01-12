
import React, { useState, useEffect } from 'react';
import { Target, CheckCircle2, XCircle, FileText, CheckSquare, Square, Save, Download, Clock, AlertTriangle, Printer } from 'lucide-react';

interface Props {
  goals: string[];
}

const TEST_CASES: Record<string, { steps: string, expected: string }> = {
  "Provision hosts through the ISO installer": {
    steps: "Boot via ISO, configuração de rede estática, hostname e VIP.",
    expected: "Nó acessível via console local e interface Web HTTPS após reboot."
  },
  "Optional. Provision hosts through PXE boot": {
    steps: "Configuração do servidor iPXE para carregar kernel/initrd remoto.",
    expected: "Nó provisionado sem intervenção manual (Unattended Installation)."
  },
  "Register an image to use for VMs": {
    steps: "Upload de arquivo .qcow2 ou download via URL de imagem Cloud.",
    expected: "Imagem aparece com status 'Active' pronta para uso."
  },
  "Create a Storage Class and Volume": {
    steps: "Configuração de réplicas e criação de volume persistente.",
    expected: "Volume disponível para anexação e replicado entre os nós."
  },
  "Create a VLAN network in SUSE Virtualization": {
    steps: "Criação de rede L2 e atribuição de VLAN ID.",
    expected: "Conectividade externa via switch trunk operacional na VM."
  },
  "Create a VM": {
    steps: "Wizard de criação utilizando recursos e imagem pré-carregados.",
    expected: "VM em estado 'Running' com acesso via console VNC."
  },
  "Configure a backup target": {
    steps: "Configuração de endpoint NFS ou S3 externo.",
    expected: "Conexão estabelecida e armazenamento externo pronto."
  },
  "Configure a user-data cloud-config script": {
    steps: "Injeção de script YAML para configuração de usuários e pacotes.",
    expected: "VM inicia com customizações aplicadas automaticamente."
  },
  "Create a backup of a VM": {
    steps: "Execução de backup completo para o target externo.",
    expected: "Arquivo de backup gerado e íntegro no storage remoto."
  },
  "Restore a VM from a backup": {
    steps: "Processo de restauração de imagem a partir do backup.",
    expected: "VM restaurada funcional com dados idênticos ao ponto do backup."
  },
  "Perform a live migration of a VM (requires multi-host)": {
    steps: "Migração de VM ativa entre nós físicos diferentes.",
    expected: "Zero downtime durante a transição de memória e vCPU."
  },
  "Use the serial/VNC console of a VM": {
    steps: "Acesso direto à interface de linha de comando via Dashboard.",
    expected: "Interatividade total com o sistema operacional convidado."
  },
  "Import the SSH key and access a VM using the key (Linux only)": {
    steps: "Configuração de chave SSH via Cloud-Init.",
    expected: "Acesso via SSH sem senha utilizando o par de chaves."
  },
  "Multi-cluster management, multi-tenancy for VM management, multi-disk support": {
    steps: "Uso de Namespaces e quotas para isolamento de recursos.",
    expected: "Segregação lógica funcional entre projetos/equipes."
  },
  "Integration with Rancher. Provision a RKE2 Kubernetes cluster on top of a SUSE Virtualization cluster": {
    steps: "Provisionamento de cluster RKE2 via driver Harvester no Rancher.",
    expected: "Guest Cluster 'Active' e VMs de worker orquestradas automaticamente."
  }
};

export const TestPlan: React.FC<Props> = ({ goals }) => {
  const [results, setResults] = useState<Record<string, 'pass' | 'fail' | 'pending'>>({});

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
                <h2 className="text-2xl font-bold text-suse-dark">Plano de Testes & Aceite</h2>
                <p className="text-sm text-gray-500">Mapeamento dos resultados baseados nos objetivos selecionados.</p>
             </div>
          </div>
          <div className="flex gap-2 no-print">
            <button 
                onClick={() => window.print()}
                className="flex items-center gap-2 px-6 py-3 bg-suse-dark text-white rounded-xl text-sm font-bold hover:bg-black transition-all shadow-lg"
            >
              <Printer className="w-4 h-4" /> Imprimir Relatório
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Planejado</div>
                <div className="text-3xl font-bold text-slate-800">{goals.length}</div>
            </div>
            <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl">
                <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-1">Sucesso (Pass)</div>
                <div className="text-3xl font-bold text-emerald-700">{passCount}</div>
            </div>
            <div className="p-5 bg-red-50 border border-red-200 rounded-2xl">
                <div className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-1">Falhas (Fail)</div>
                <div className="text-3xl font-bold text-red-700">{failCount}</div>
            </div>
        </div>

        <div className="overflow-hidden border border-gray-200 rounded-2xl shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-widest text-[10px] border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 w-1/4">Critério de Sucesso</th>
                <th className="px-6 py-4 w-1/3">Procedimento Técnico</th>
                <th className="px-6 py-4">Resultado Esperado</th>
                <th className="px-6 py-4 text-center no-print">Validar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {goals.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-24 text-center text-gray-400 italic">
                    <div className="flex flex-col items-center gap-3">
                        <AlertTriangle className="w-12 h-12 opacity-10" />
                        <p>Nenhum objetivo foi selecionado na etapa de informações iniciais.</p>
                    </div>
                  </td>
                </tr>
              ) : goals.map((goal, idx) => {
                const testCase = TEST_CASES[goal] || { steps: "Execução via dashboard v1.7.", expected: "Funcionalidade operando conforme documentação." };
                const status = results[goal] || 'pending';
                
                return (
                  <tr key={idx} className={`hover:bg-slate-50/50 transition-colors ${status === 'pass' ? 'bg-emerald-50/30' : status === 'fail' ? 'bg-red-50/30' : ''}`}>
                    <td className="px-6 py-5 font-bold text-slate-800 text-xs">{goal}</td>
                    <td className="px-6 py-5 text-slate-500 text-[11px] leading-relaxed">{testCase.steps}</td>
                    <td className="px-6 py-5 text-slate-500 text-[11px] italic">{testCase.expected}</td>
                    <td className="px-6 py-5 no-print">
                      <div className="flex items-center justify-center gap-3">
                        <button 
                          onClick={() => toggleResult(goal, 'pass')}
                          className={`p-2.5 rounded-xl border transition-all ${status === 'pass' ? 'bg-emerald-600 border-emerald-700 text-white shadow-lg' : 'bg-white text-gray-300 hover:text-emerald-600'}`}
                        >
                          <CheckCircle2 className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => toggleResult(goal, 'fail')}
                          className={`p-2.5 rounded-xl border transition-all ${status === 'fail' ? 'bg-red-600 border-red-700 text-white shadow-lg' : 'bg-white text-gray-300 hover:text-red-600'}`}
                        >
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
