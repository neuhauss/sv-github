
import React, { useState, useEffect } from 'react';
import { ChecklistItem } from '../types';
import { CheckSquare, Square, Info, Server, Settings, PlayCircle, ChevronDown, ChevronUp, Wrench, AlertTriangle, AlertCircle, Search } from 'lucide-react';

interface Props {
  onComplete: (isComplete: boolean) => void;
}

interface StepGroup {
  title: string;
  icon: React.ReactNode;
  pitfall: string;
  steps: ChecklistItem[];
}

const INITIAL_GROUPS: StepGroup[] = [
  {
    title: "1. Inicialização do Instalador",
    icon: <Server className="w-5 h-5" />,
    pitfall: "O BIOS deve ter 'Secure Boot' desativado. Use UEFI em vez de Legacy sempre que possível.",
    steps: [
      { id: 'boot', label: 'Boot via ISO / Pendrive', description: 'Inicie o servidor físico usando a ISO do SUSE Virtualization.', checked: false, details: 'Verifique se o hardware suporta virtualização (VT-x/AMD-V) e está habilitado no BIOS.' },
      { id: 'mode', label: 'Modo de Instalação', description: 'Selecione "Create a new cluster" para o primeiro nó.', checked: false, details: 'Para nós subsequentes, selecione "Join an existing cluster".' },
    ]
  },
  {
    title: "2. Discos e Persistência",
    icon: <Settings className="w-5 h-5" />,
    pitfall: "Não use cartões SD ou Pendrives para instalação persistente do sistema. Requer SSD/NVMe de alta performance.",
    steps: [
      { id: 'disk', label: 'Seleção de Discos', description: 'Defina o disco de instalação e o disco de dados.', checked: false, details: 'Se usar um único disco, reserve espaço suficiente para a partição de dados (mínimo 150GB recomendados).' },
    ]
  },
  {
      title: "3. Redes e Acesso (First Node)",
      icon: <Settings className="w-5 h-5" />,
      pitfall: "O IP do VIP e o IP do Nó devem estar na mesma subnet de gerência.",
      steps: [
        { id: 'vip', label: 'Configuração do Cluster VIP', description: 'Atribua um IP estático para acesso ao dashboard.', checked: false, details: 'Este IP será usado para acessar o painel mesmo se o nó master mudar.' },
        { id: 'token', label: 'Token de Segurança', description: 'Defina um token forte para admissão de novos nós.', checked: false, details: 'Anote este token, ele será necessário para escalar o cluster.' },
      ]
  }
];

export const InstallationChecklist: React.FC<Props> = ({ onComplete }) => {
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(['1. Inicialização do Instalador']));

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
    const allIds = INITIAL_GROUPS.flatMap(g => g.steps.map(s => s.id));
    onComplete(allIds.every(id => checkedIds.has(id)));
  }, [checkedIds, onComplete]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-suse-dark">Procedimento de Instalação Física</h2>
        <p className="text-sm text-gray-500 mt-1">Siga este checklist durante a execução em datacenter para garantir que nada seja esquecido.</p>
      </div>

      <div className="space-y-6">
        {INITIAL_GROUPS.map((group, gIdx) => (
          <div key={gIdx} className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm transition-all">
            <div 
                className="bg-gray-50 px-5 py-4 border-b border-gray-200 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => toggleExpand(group.title)}
            >
              <div className="flex items-center gap-3 font-bold text-gray-800">
                <div className="p-1.5 bg-white rounded border border-gray-200 text-suse-base">
                    {group.icon}
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
                    <div className="p-4 bg-amber-50 border-b border-amber-100 flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                        <div className="text-xs text-amber-900 leading-relaxed">
                            <span className="font-bold uppercase tracking-widest text-[9px] block mb-0.5 text-amber-700">Atenção (Common Pitfall)</span>
                            {group.pitfall}
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
                            <div className="text-xs text-gray-500 mt-1 leading-relaxed">{step.description}</div>
                            {step.details && (
                                <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase mb-1">
                                        <Search className="w-3 h-3"/> Como Validar
                                    </div>
                                    <div className="text-[11px] text-gray-600 italic whitespace-pre-line">{step.details}</div>
                                </div>
                            )}
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
              <strong>Próximo Passo:</strong> Após concluir este checklist físico, o nó irá reiniciar e o dashboard web estará disponível. Use o <strong>"Goal Validation"</strong> no menu principal para validar as funcionalidades do cliente.
          </div>
      </div>
    </div>
  );
};
