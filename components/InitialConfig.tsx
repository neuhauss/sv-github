
import React, { useState, useEffect } from 'react';
import { ChecklistItem, NetworkSpecs } from '../types';
import { Database, MousePointer, Terminal, CheckCircle, ChevronDown, ChevronUp, CheckSquare, Square, Flag, ExternalLink, HelpCircle, ArrowRight, Play, Settings, Monitor, Image as ImageIcon, Search, Target } from 'lucide-react';

interface StepDetail {
  type: 'action' | 'command' | 'verify';
  label: string;
  description?: React.ReactNode;
  code?: string;
}

interface DocLink {
  title: string;
  url: string;
}

interface GoalConfig {
  goal: string;
  steps: (net?: NetworkSpecs) => StepDetail[];
  docs: DocLink[];
}

interface Props {
  onComplete: (isComplete: boolean) => void;
  goals: string[];
  netSpecs: NetworkSpecs;
}

const GOAL_DATA: Record<string, GoalConfig> = {
  "Provision hosts through the ISO installer": {
    goal: "Install SUSE Virtualization on bare metal nodes.",
    steps: (net) => [
      { 
        type: 'action', 
        label: "1. Hostname & Network Setup", 
        description: <span>Configure o primeiro nó com o IP <strong>{net?.nodes[0]?.ip || '(não definido)'}</strong> e Gateway <strong>{net?.gatewayIp || '(não definido)'}</strong> durante a instalação via ISO.</span> 
      },
      { 
        type: 'action', 
        label: "2. Cluster Virtual IP (VIP)", 
        description: <span>Configure o VIP como <strong>{net?.clusterVip || '(não definido)'}</strong>. Este IP deve estar disponível na rede de gerência.</span> 
      },
      {
        type: 'verify',
        label: "3. Validação de Acesso Web",
        description: <span>Após o reinício, tente acessar o dashboard em: <code className="bg-emerald-100 px-1 rounded text-emerald-800 font-bold">https://{net?.clusterVip || 'SEU-VIP'}</code>.</span>
      }
    ],
    docs: [{ title: "Harvester Installation Guide", url: "https://docs.harvesterhci.io/v1.4/install/iso-install/" }]
  },
  "Create a VM": {
    goal: "Deploy and run a Virtual Machine instance.",
    steps: (net) => [
      { type: 'action', label: "1. Wizard de Criação", description: "Vá em 'Virtual Machines' &gt; 'Create'. Selecione a imagem e recursos desejados." },
      { type: 'action', label: "2. Atribuição de Rede", description: <span>Associe a interface de rede à rede <strong>{net?.vlanId ? `VLAN ${net.vlanId}` : 'Management Default'}</strong>.</span> },
      { type: 'verify', label: "3. Verificação Funcional", description: "Abra o VNC Console e confirme que o sistema operacional da VM iniciou corretamente." }
    ],
    docs: [{ title: "VM Management", url: "https://docs.harvesterhci.io/v1.4/vm/" }]
  },
  "Create a VLAN network in SUSE Virtualization": {
    goal: "Configure Layer 2 isolated networks for VMs.",
    steps: (net) => [
      { type: 'action', label: "1. Criação do Recurso", description: <span>Vá em 'Networks' &gt; 'VM Networks'. Crie uma 'L2VlanNetwork' com o ID <strong>{net?.vlanId || 'configurado'}</strong>.</span> },
      { type: 'verify', label: "2. Validação Multus", description: "Verifique se o status da rede está 'Active' e se os pods do 'network-controller' estão rodando sem erros." }
    ],
    docs: [{ title: "Networking Guide", url: "https://docs.harvesterhci.io/v1.4/networking/harvester-network/" }]
  }
};

const DEFAULT_STEPS: ChecklistItem[] = [
    { 
      id: 'login', 
      label: 'Primeiro Acesso ao Cluster', 
      description: 'Aceite os certificados e configure a senha do usuário admin.', 
      details: 'default-init',
      checked: false 
    },
];

export const InitialConfig: React.FC<Props> = ({ onComplete, goals = [], netSpecs }) => {
  const [configSteps, setConfigSteps] = useState<ChecklistItem[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const goalSteps: ChecklistItem[] = goals.map((goal, index) => ({
      id: `goal-${index}`,
      label: goal,
      description: 'Etapas Técnicas para Validação do Objetivo',
      details: goal,
      checked: false
    }));
    setConfigSteps([...DEFAULT_STEPS, ...goalSteps]);
  }, [goals]);

  const toggleCheck = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const updated = configSteps.map(step => step.id === id ? { ...step, checked: !step.checked } : step);
    setConfigSteps(updated);
    onComplete(updated.every(s => s.checked));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-suse-dark flex items-center gap-2">
            <Target className="w-6 h-6 text-suse-accent" /> Validação Funcional (POC)
        </h2>
        <div className="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
            Dinamismo Ativo: {netSpecs?.clusterVip ? 'Sim (Dados Injetados)' : 'Não (Preencha passo de Rede)'}
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {configSteps.map((step) => {
          const isExpanded = expandedId === step.id;
          const isGoal = step.id.startsWith('goal-');
          const goalConfig = isGoal ? GOAL_DATA[step.details || ''] : null;

          return (
            <div key={step.id} className={`border rounded-xl transition-all ${step.checked ? 'border-suse-base bg-emerald-50/20' : 'border-gray-200 hover:border-gray-300'}`}>
              <div className="p-4 cursor-pointer flex items-center justify-between" onClick={() => setExpandedId(isExpanded ? null : step.id)}>
                 <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg transition-colors ${step.checked ? 'bg-suse-base text-white' : 'bg-gray-100 text-gray-500'}`}>
                      {isGoal ? <Flag className="w-5 h-5" /> : <Settings className="w-5 h-5" />}
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 leading-tight">{step.label}</h3>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">{isGoal ? 'Objetivo do Cliente' : 'Setup Inicial'}</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <button onClick={(e) => toggleCheck(e, step.id)} className={`transition-colors ${step.checked ? 'text-suse-base' : 'text-gray-300 hover:text-gray-400'}`}>
                      {step.checked ? <CheckSquare className="w-7 h-7" /> : <Square className="w-7 h-7" />}
                    </button>
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400"/> : <ChevronDown className="w-5 h-5 text-gray-400"/>}
                 </div>
              </div>

              {isExpanded && (
                <div className="px-10 pb-6 animate-slide-down">
                  <div className="bg-white border border-gray-100 rounded-lg p-5 shadow-inner">
                    <p className="text-xs text-gray-500 mb-4">{step.description}</p>
                    
                    {goalConfig ? (
                      <div className="space-y-4">
                        <div className="text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-tighter flex items-center gap-1">
                            <Monitor className="w-3 h-3"/> Passo-a-passo Executável
                        </div>
                        {goalConfig.steps(netSpecs).map((s, idx) => (
                          <div key={idx} className={`flex gap-4 p-3 rounded-lg border border-l-4 ${s.type === 'verify' ? 'bg-green-50 border-green-200 border-l-green-500' : 'bg-slate-50 border-slate-200 border-l-blue-500'}`}>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${s.type === 'verify' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}>
                              {s.type === 'verify' ? <Search className="w-3 h-3"/> : idx + 1}
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-bold text-gray-800 flex items-center gap-2">
                                {s.label}
                                {s.type === 'verify' && <span className="text-[9px] bg-green-200 text-green-800 px-1.5 py-0.5 rounded font-bold uppercase tracking-widest">Verificação</span>}
                              </div>
                              <div className="text-xs text-gray-600 mt-1 leading-relaxed">{s.description}</div>
                              {s.code && (
                                <div className="mt-2 group relative">
                                    <pre className="p-2 bg-gray-900 text-green-400 rounded text-[10px] font-mono border border-gray-700">{s.code}</pre>
                                    <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white transition-opacity"><Terminal className="w-3 h-3"/></button>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-600 p-4 border-2 border-dashed border-gray-100 rounded text-center italic">
                        Não existem passos específicos cadastrados para este item. Siga o guia manual.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
