
import React, { useState, useMemo } from 'react';
import { Server, Settings, Network, HardDrive, Disc, LayoutTemplate, Play, Database, Cloud, ArrowRight, ShieldCheck, Cpu, Shuffle, Lock, Globe, Clock, CheckCircle, Sliders, Laptop, ExternalLink, Info, Calculator, Zap, Monitor, Search, Terminal, Copy, Check, Key, Layers, RefreshCw, Target, FileCheck, Eye, Link as LinkIcon, Download, AlertCircle, ShieldAlert, Wifi, Activity, BookOpen, FileText, AlertTriangle, Wrench, Bug } from 'lucide-react';
import { UISnapshot } from './ui/UISnapshot';
import { NetworkSpecs } from '../types';

interface GoalProcedure {
  steps: string[];
  tip: string;
  icon: any;
  dependencies: string[];
  docsUrl: string;
  resourceLinks?: { label: string; url: string }[];
}

interface Props {
  netSpecs?: NetworkSpecs;
  goals?: string[];
}

const GOAL_PROCEDURES: Record<string, GoalProcedure> = {
  "Provision hosts through the ISO installer": {
    icon: Disc,
    steps: [
      "Prepare um pendrive bootável com a ISO do Harvester v1.7.",
      "No primeiro nó, escolha 'Create a new Harvester cluster'.",
      "Configure o VIP do cluster, IP estático do nó e Gateway conforme o planejamento.",
      "Para os nós 2 e 3, escolha 'Join an existing cluster' e insira o VIP e o Cluster Token gerado pelo primeiro nó.",
      "Aguarde o reboot e a tela final com a URL de acesso ao Dashboard."
    ],
    dependencies: ["Hardware compatível (BIOS com VT-x/AMD-V habilitado)", "Pendrive de no mínimo 8GB", "Acesso físico ou via IPMI/iDRAC"],
    docsUrl: "https://docs.harvesterhci.io/v1.7/install/iso-install/",
    resourceLinks: [
      { label: "Download Harvester ISO v1.7", url: "https://harvesterhci.io/releases" },
      { label: "Guia de Preparação de Hardware", url: "https://docs.harvesterhci.io/v1.7/install/requirements/" },
      { label: "Harvester v1.7 Release Notes", url: "https://github.com/harvester/harvester/releases/tag/v1.7.0" }
    ],
    tip: "Se usar IPMI, certifique-se que o Virtual Media não tenha latência alta, pois isso pode corromper a instalação."
  },
  "Optional. Provision hosts through PXE boot": {
    icon: Network,
    steps: [
      "Configure um servidor DHCP com opções 66 (TFTP Server) e 67 (Boot File).",
      "Prepare os arquivos 'vmlinuz' e 'initrd' extraídos da ISO v1.7.",
      "Crie o arquivo de configuração iPXE apontando para o script de auto-instalação (harvester-config.yaml).",
      "Inicie o host via rede e monitore a instalação automatizada."
    ],
    dependencies: ["Servidor PXE/TFTP funcional", "Rede local com suporte a DHCP", "Harvester Config YAML válido"],
    docsUrl: "https://docs.harvesterhci.io/v1.7/install/pxe-boot-install/",
    resourceLinks: [
      { label: "Documentação PXE Boot", url: "https://docs.harvesterhci.io/v1.7/install/pxe-boot-install/" },
      { label: "Exemplos de Harvester Config", url: "https://docs.harvesterhci.io/v1.7/install/harvester-configuration/" }
    ],
    tip: "O PXE boot é ideal para implementações em larga escala (Edge/Bare Metal) onde a inserção manual de ISOs é inviável."
  },
  "Register an image to use for VMs": {
    icon: Target,
    steps: [
      "Acesse 'Images' no menu lateral e clique em 'Create'.",
      "Utilize a opção 'Download from URL' para performance ou 'Upload' para arquivos locais.",
      "Insira o nome (ex: openSUSE-Leap-15.5) e a URL da imagem Cloud.",
      "Aguarde o status mudar de 'Downloading' para 'Active'."
    ],
    dependencies: ["Conectividade externa do cluster para download de imagens", "Imagem no formato .qcow2, .raw ou .img"],
    docsUrl: "https://docs.harvesterhci.io/v1.7/vm/create-vm/#images",
    resourceLinks: [
      { label: "openSUSE Leap 15.5 Cloud Images", url: "https://download.opensuse.org/repositories/Cloud:/Images:/Leap_15.5/images/" },
      { label: "SLES 15 SP5 Cloud Images (Trial)", url: "https://www.suse.com/download/sles/" },
      { label: "Ubuntu Cloud Images", url: "https://cloud-images.ubuntu.com/releases/" }
    ],
    tip: "Imagens Cloud (.qcow2) são preferíveis pois permitem o uso de Cloud-Init para injetar chaves SSH automaticamente."
  },
  "Create a Storage Class and Volume": {
    icon: Database,
    steps: [
      "Vá em 'Storage' > 'StorageClasses' e clique em 'Create'.",
      "Defina o número de réplicas. O padrão é 3 para HA total em 3 nós.",
      "Em 'Volumes', crie um novo volume manual ou deixe o wizard da VM criar automaticamente.",
      "Verifique no dashboard do Longhorn se o volume está 'Healthy' e replicado corretamente."
    ],
    dependencies: ["Nós com discos SSD/NVMe de performance similar", "Cluster em estado estável"],
    docsUrl: "https://docs.harvesterhci.io/v1.7/storage/storage-class/",
    resourceLinks: [
      { label: "Longhorn 1.7 Documentation", url: "https://longhorn.io/docs/1.7.0/" },
      { label: "Best Practices for Storage", url: "https://docs.harvesterhci.io/v1.7/storage/storage-class/#best-practices" }
    ],
    tip: "Evite misturar tipos de discos (ex: misturar SSD com HDD) na mesma Storage Class para não criar gargalos."
  },
  "Create a VLAN network in SUSE Virtualization": {
    icon: Layers,
    steps: [
      "Navegue até 'Networks' > 'VM Networks'.",
      "Crie uma nova 'L2VlanNetwork'.",
      "Insira o VLAN ID (deve coincidir com a configuração Trunk da Switch Física).",
      "Anexe esta rede a uma VM e teste o tráfego externo."
    ],
    dependencies: ["Switch física configurada como Trunk (802.1Q)", "VLAN ID liberado nas portas dos nós"],
    docsUrl: "https://docs.harvesterhci.io/v1.7/networking/harvester-network/",
    resourceLinks: [
      { label: "Configurando Redes VLAN", url: "https://docs.harvesterhci.io/v1.7/networking/vm-network/" },
      { label: "Harvester Network Controller Docs", url: "https://github.com/harvester/harvester-network-controller" }
    ],
    tip: "Se a VM não pegar IP, verifique se existe um servidor DHCP ativo na VLAN específica ou configure IP estático na VM."
  },
  "Create a VM": {
    icon: Laptop,
    steps: [
      "Menu 'Virtual Machines' > 'Create'.",
      "Selecione 'Basics': CPU, RAM e Imagem.",
      "Em 'Networks', escolha a rede criada (Management ou VLAN).",
      "Em 'Cloud Config', cole o script YAML para definir senha e SSH.",
      "Inicie a VM e acesse via 'Console' > 'Open in VNC'."
    ],
    dependencies: ["Pelo menos uma imagem registrada", "Recursos de CPU/RAM disponíveis no cluster"],
    docsUrl: "https://docs.harvesterhci.io/v1.7/vm/create-vm/",
    resourceLinks: [
      { label: "VM Management Guide", url: "https://docs.harvesterhci.io/v1.7/vm/create-vm/" },
      { label: "Cloud-Init Examples", url: "https://cloudinit.readthedocs.io/en/latest/topics/examples.html" }
    ],
    tip: "Use o recurso de 'Hot Plug' no v1.7 para adicionar discos ou memória sem precisar reiniciar a VM."
  },
  "Configure a backup target": {
    icon: RefreshCw,
    steps: [
      "Settings > 'backup-target'.",
      "Para NFS: Use o formato 'nfs://1.2.3.4:/path/to/share'.",
      "Para S3: Insira Access Key, Secret Key, Bucket e Endpoint.",
      "Clique em 'Save' e verifique se o status é 'Ready'."
    ],
    dependencies: ["Servidor NFS externo ou Bucket S3/RadosGW disponível"],
    docsUrl: "https://docs.harvesterhci.io/v1.7/advanced/backup-restore/",
    resourceLinks: [
      { label: "Backup and Restore Guide", url: "https://docs.harvesterhci.io/v1.7/advanced/backup-restore/" },
      { label: "MinIO S3 Quickstart", url: "https://min.io/docs/minio/linux/index.html" }
    ],
    tip: "O backup target é essencial para mover VMs entre clusters ou recuperar de falha total do hardware."
  },
  "Perform a live migration of a VM (requires multi-host)": {
    icon: Shuffle,
    steps: [
      "Certifique-se de que a VM está rodando em um nó específico.",
      "Clique em '...' na VM e selecione 'Migrate'.",
      "Escolha o nó de destino e confirme.",
      "Observe o status 'Migrating' e valide que a VM não parou de responder (ping constante)."
    ],
    dependencies: ["Mínimo de 2 nós ativos", "Storage replicado (Longhorn)", "Rede estável entre os nós"],
    docsUrl: "https://docs.harvesterhci.io/v1.7/vm/live-migration/",
    resourceLinks: [
      { label: "Live Migration Documentation", url: "https://docs.harvesterhci.io/v1.7/vm/live-migration/" },
      { label: "Troubleshooting Migration", url: "https://docs.harvesterhci.io/v1.7/troubleshooting/vm/#vm-migration-failures" }
    ],
    tip: "Se a migração falhar, verifique se a VM possui dispositivos locais (como CD-ROM de ISO local) que impedem a movimentação."
  },
  "Integration with Rancher. Provision a RKE2 Kubernetes cluster on top of a SUSE Virtualization cluster": {
    icon: Cloud,
    steps: [
      "No Rancher v2.8+, vá em 'Virtualization Management' e importe o Harvester.",
      "Em 'Cluster Management' > 'Create' > 'Harvester'.",
      "Defina o pool de máquinas (VMs worker) e a versão do RKE2.",
      "Aguarde o Rancher criar as VMs no Harvester e provisionar o K8s automaticamente."
    ],
    dependencies: ["Rancher Manager v2.8.0 ou superior", "Connectivity entre Rancher e VIP do Harvester"],
    docsUrl: "https://docs.harvesterhci.io/v1.7/rancher/rancher-integration/",
    resourceLinks: [
      { label: "Rancher v2.8 Installation Guide", url: "https://ranchermanager.docs.rancher.com/v2.8/how-to-guides/new-user-guides/kubernetes-clusters-in-rancher-setup/virtualization-management" },
      { label: "Harvester Node Driver Guide", url: "https://docs.harvesterhci.io/v1.7/rancher/node-driver/" },
      { label: "Harvester Cloud Provider", url: "https://docs.harvesterhci.io/v1.7/rancher/cloud-provider/" }
    ],
    tip: "O uso de Cloud Credentials no Rancher é o que permite a automação total do ciclo de vida das VMs de nó."
  },
  "Create a backup of a VM": {
    icon: Database,
    steps: [
      "Vá na VM desejada e clique em 'Actions' > 'Take Backup'.",
      "Insira um nome para o snapshot de backup.",
      "Acompanhe o progresso na aba 'Backups'.",
      "Verifique se o backup foi enviado com sucesso para o target configurado."
    ],
    dependencies: ["Backup Target configurado e saudável", "VM em estado estável"],
    docsUrl: "https://docs.harvesterhci.io/v1.7/advanced/backup-restore/#backing-up-a-virtual-machine",
    resourceLinks: [
      { label: "Guia de Backup de VM", url: "https://docs.harvesterhci.io/v1.7/advanced/backup-restore/#backing-up-a-virtual-machine" }
    ],
    tip: "Backups podem ser realizados com a VM ligada (Snapshot-based), mas recomenda-se cautela com bancos de dados de alta escrita."
  },
  "Restore a VM from a backup": {
    icon: RefreshCw,
    steps: [
      "Navegue até 'Backups' no menu lateral.",
      "Selecione o backup desejado e clique em 'Restore'.",
      "Escolha se deseja restaurar para uma nova VM ou sobrescrever a existente.",
      "Aguarde o provisionamento e valide os dados."
    ],
    dependencies: ["Backup anterior concluído com sucesso", "Recursos disponíveis para nova VM"],
    docsUrl: "https://docs.harvesterhci.io/v1.7/advanced/backup-restore/#restoring-a-virtual-machine",
    resourceLinks: [
      { label: "Guia de Restauração de VM", url: "https://docs.harvesterhci.io/v1.7/advanced/backup-restore/#restoring-a-virtual-machine" }
    ],
    tip: "A restauração para uma 'New VM' é a forma mais segura de validar backups sem afetar o ambiente de produção."
  }
};

export const InstallGuide: React.FC<Props> = ({ netSpecs, goals = [] }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const sections = [
    { id: 'overview', icon: <LayoutTemplate className="w-4 h-4" />, label: 'Visão Geral' },
    { id: 'planning', icon: <Cpu className="w-4 h-4" />, label: 'Planejamento' },
    { id: 'install', icon: <Play className="w-4 h-4" />, label: 'Instalação (ISO)' },
    { id: 'config', icon: <Settings className="w-4 h-4" />, label: 'Configuração Inicial' },
    { id: 'storage', icon: <HardDrive className="w-4 h-4" />, label: 'Armazenamento' },
    { id: 'poc-goals', icon: <FileCheck className="w-4 h-4" />, label: 'Procedimentos da POC', count: goals.length },
    { id: 'rancher', icon: <Cloud className="w-4 h-4" />, label: 'Integração Rancher' },
    { id: 'troubleshooting', icon: <Bug className="w-4 h-4" />, label: 'Troubleshooting' },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(text);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const handleNext = () => {
    const idx = sections.findIndex(s => s.id === activeSection);
    if (idx < sections.length - 1) {
      setActiveSection(sections[idx + 1].id);
      window.scrollTo(0, 0);
    }
  };

  const renderContent = () => {
    switch(activeSection) {
      case 'overview':
        return (
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-3xl font-bold text-suse-dark">Documentação Técnica v1.7</h1>
            <p className="text-gray-600 leading-relaxed">
              Este guia centraliza os procedimentos oficiais para a implementação do <strong>SUSE Virtualization (Harvester)</strong>. 
              As seções abaixo foram adaptadas dinamicamente com base nos objetivos da sua POC.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100 flex gap-4">
                <Zap className="w-10 h-10 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-emerald-800 text-sm">HCI Moderno</h4>
                  <p className="text-[11px] text-emerald-700 mt-1">Infraestrutura Hiperconvergente 100% open-source baseada em KubeVirt e Longhorn.</p>
                </div>
              </div>
              <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 flex gap-4">
                <ShieldCheck className="w-10 h-10 text-blue-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-blue-800 text-sm">Pronto para Produção</h4>
                  <p className="text-[11px] text-blue-700 mt-1">Alta disponibilidade nativa e integração direta com Rancher para gestão multicluster.</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'planning':
        return (
          <div className="space-y-8 animate-fade-in">
             <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-slate-800 rounded-2xl shadow-lg">
                   <Cpu className="w-8 h-8 text-white" />
                </div>
                <div>
                   <h1 className="text-3xl font-bold text-suse-dark">Planejamento & Pré-requisitos</h1>
                   <p className="text-sm text-gray-500">Prepare o ambiente antes de iniciar a instalação física.</p>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                   <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                      <h3 className="font-bold text-gray-800 flex items-center gap-2">
                         <ShieldCheck className="w-4 h-4 text-suse-base" /> Hardware Mínimo (Por Nó)
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="p-3 bg-slate-50 rounded-xl">
                            <div className="text-[9px] uppercase text-slate-400 font-bold">CPU</div>
                            <div className="text-sm font-bold">8 Cores x86_64</div>
                         </div>
                         <div className="p-3 bg-slate-50 rounded-xl">
                            <div className="text-[9px] uppercase text-slate-400 font-bold">RAM</div>
                            <div className="text-sm font-bold">32 GB</div>
                         </div>
                         <div className="p-3 bg-slate-50 rounded-xl">
                            <div className="text-[9px] uppercase text-slate-400 font-bold">Storage</div>
                            <div className="text-sm font-bold">250 GB SSD/NVMe</div>
                         </div>
                         <div className="p-3 bg-slate-50 rounded-xl">
                            <div className="text-[9px] uppercase text-slate-400 font-bold">Network</div>
                            <div className="text-sm font-bold">10 Gbps (Rec.)</div>
                         </div>
                      </div>
                      <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3 items-start">
                         <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                         <p className="text-[10px] text-amber-800">VT-x ou AMD-V deve estar habilitado na BIOS. Harvester não suporta instalação em VMs sem Nested Virtualization.</p>
                      </div>
                   </div>

                   <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                      <h3 className="font-bold text-gray-800 flex items-center gap-2">
                         <Network className="w-4 h-4 text-suse-base" /> Tabela de Portas Críticas
                      </h3>
                      <div className="overflow-hidden border border-gray-100 rounded-xl">
                        <table className="min-w-full text-[10px]">
                           <thead className="bg-gray-50 text-gray-500 font-bold">
                              <tr>
                                 <th className="px-3 py-2 text-left">Porta</th>
                                 <th className="px-3 py-2 text-left">Uso</th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-gray-50 text-gray-700">
                              <tr><td className="px-3 py-2 font-mono font-bold text-blue-600">443</td><td className="px-3 py-2">Dashboard UI & API</td></tr>
                              <tr><td className="px-3 py-2 font-mono font-bold text-blue-600">6443</td><td className="px-3 py-2">K8s API Server</td></tr>
                              <tr><td className="px-3 py-2 font-mono font-bold text-blue-600">2379-80</td><td className="px-3 py-2">Etcd Client/Peer</td></tr>
                              <tr><td className="px-3 py-2 font-mono font-bold text-blue-600">8443</td><td className="px-3 py-2">Network Controller</td></tr>
                           </tbody>
                        </table>
                      </div>
                   </div>
                </div>

                <div className="space-y-6">
                   <div className="bg-slate-900 text-white p-8 rounded-3xl space-y-4">
                      <h3 className="font-bold text-suse-base flex items-center gap-2">
                         <Search className="w-5 h-5" /> Pre-flight Checklist
                      </h3>
                      <ul className="space-y-3">
                         {[
                            "IPs estáticos reservados para cada nó",
                            "IP VIP disponível na mesma subnet",
                            "Acesso à internet ou Proxy configurado",
                            "DNS configurado (Resolução direta e reversa)",
                            "NTP sincronizado entre os nós"
                         ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-xs text-slate-300">
                               <div className="w-4 h-4 rounded border border-slate-700 flex items-center justify-center"><Check className="w-3 h-3"/></div>
                               {item}
                            </li>
                         ))}
                      </ul>
                   </div>
                   
                   <a 
                     href="https://docs.harvesterhci.io/v1.7/install/requirements/" 
                     target="_blank" 
                     rel="noreferrer"
                     className="flex items-center justify-between bg-white border border-gray-200 p-5 rounded-3xl hover:border-suse-base transition-all group"
                   >
                      <div className="flex items-center gap-3">
                         <BookOpen className="w-6 h-6 text-suse-base" />
                         <span className="text-sm font-bold text-gray-800">Documentação de Requisitos</span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-suse-base" />
                   </a>
                </div>
             </div>
          </div>
        );

      case 'install':
        return (
          <div className="space-y-8 animate-fade-in">
             <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-emerald-600 rounded-2xl shadow-lg shadow-emerald-200">
                   <Play className="w-8 h-8 text-white" />
                </div>
                <div>
                   <h1 className="text-3xl font-bold text-suse-dark">Instalação via ISO (Manual)</h1>
                   <p className="text-sm text-gray-500">Passo-a-passo detalhado do wizard de instalação.</p>
                </div>
             </div>

             <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-6">
                      <h3 className="font-bold text-gray-800 flex items-center gap-2"><Disc className="w-5 h-5 text-suse-base"/> Processo do Primeiro Nó</h3>
                      <div className="space-y-4">
                         {[
                            { t: "Boot & Menu", d: "Inicie pela ISO e selecione 'Harvester Installer'." },
                            { t: "Create Mode", d: "Escolha 'Create a new Harvester cluster'." },
                            { t: "Instalação de Disco", d: "Selecione o disco de instalação. Cuidado: Todos os dados serão apagados." },
                            { t: "Configuração de Rede", d: "Defina Hostname, Interface de Gerência e IP Estático." },
                            { t: "VIP & Token", d: "Defina o Cluster VIP e o Cluster Token (necessário para adicionar outros nós)." },
                            { t: "Senha Admin", d: "Defina a senha que será usada no primeiro login do Dashboard." }
                         ].map((s, i) => (
                            <div key={i} className="flex gap-4">
                               <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-[10px] shrink-0 border border-emerald-100">{i+1}</div>
                               <div>
                                  <h4 className="text-xs font-bold text-gray-800">{s.t}</h4>
                                  <p className="text-[10px] text-gray-500 leading-relaxed">{s.d}</p>
                               </div>
                            </div>
                         ))}
                      </div>
                   </div>

                   <div className="space-y-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <h3 className="font-bold text-slate-800 flex items-center gap-2"><Layers className="w-5 h-5 text-blue-600"/> Adicionando Nós (2 e 3)</h3>
                      <p className="text-[11px] text-slate-600 leading-relaxed">Para formar um cluster de alta disponibilidade, você deve repetir o processo nos outros nós, mas selecionando a opção <strong>'Join an existing cluster'</strong>.</p>
                      <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-3">
                         <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest"><Key className="w-3 h-3"/> Info de Join</div>
                         <p className="text-[10px] text-slate-500 italic">Você precisará do <strong>Cluster VIP</strong> e do <strong>Cluster Token</strong> definidos no primeiro nó.</p>
                      </div>
                      <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex gap-3">
                         <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
                         <div>
                            <h4 className="text-xs font-bold text-red-800">Troubleshooting: Boot Loops</h4>
                            <p className="text-[10px] text-red-700 mt-1">Se o servidor reiniciar infinitamente, verifique se a ordem de boot na BIOS está configurada para o disco rígido após a instalação, e não para o USB/ISO.</p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        );

      case 'config':
        return (
          <div className="space-y-8 animate-fade-in">
             <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-suse-dark rounded-2xl shadow-lg">
                   <Settings className="w-8 h-8 text-suse-base" />
                </div>
                <div>
                   <h1 className="text-3xl font-bold text-suse-dark">Configuração Inicial Pós-Instalação</h1>
                   <p className="text-sm text-gray-500">Primeiro acesso ao dashboard e ajustes essenciais.</p>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                   <h3 className="font-bold text-gray-800 flex items-center gap-2"><Monitor className="w-5 h-5 text-suse-base"/> Primeiro Login</h3>
                   <div className="space-y-4">
                      {[
                         "Acesse https://<CLUSTER_VIP> via navegador.",
                         "Ignore o aviso de certificado auto-assinado (ou importe o seu).",
                         "Defina a senha do usuário 'admin' (se solicitado novamente).",
                         "Aceite os Termos e Condições."
                      ].map((step, i) => (
                         <div key={i} className="flex gap-3 text-xs text-gray-600">
                            <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center font-bold text-[10px] text-gray-400 shrink-0">{i+1}</div>
                            {step}
                         </div>
                      ))}
                   </div>
                   <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl space-y-2">
                      <h4 className="text-xs font-bold text-blue-800">Backup Target (Crucial)</h4>
                      <p className="text-[10px] text-blue-700 leading-relaxed">Vá em <strong>Settings > backup-target</strong>. Configure um servidor NFS ou S3. Sem isso, você não pode realizar snapshots externos ou recuperação de desastres.</p>
                   </div>
                </div>

                <div className="space-y-6">
                   <div className="bg-slate-900 p-8 rounded-3xl space-y-4 text-white">
                      <h3 className="font-bold text-emerald-400 flex items-center gap-2"><RefreshCw className="w-5 h-5"/> Configurações de Rede</h3>
                      <ul className="space-y-4">
                         <li className="space-y-1">
                            <div className="text-xs font-bold uppercase tracking-widest text-slate-500">VLAN Networks</div>
                            <p className="text-[10px] text-slate-300">Navegue até <strong>Networks > VM Networks</strong> para criar redes L2 isoladas.</p>
                         </li>
                         <li className="space-y-1">
                            <div className="text-xs font-bold uppercase tracking-widest text-slate-500">IP Pools (v1.7)</div>
                            <p className="text-[10px] text-slate-300">Configure pools de IPs para o serviço de Load Balancer integrado ao Harvester.</p>
                         </li>
                      </ul>
                   </div>
                   <div className="bg-amber-50 border border-amber-200 p-6 rounded-3xl flex gap-4">
                      <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
                      <div>
                         <h4 className="text-xs font-bold text-amber-800">Dica: Repositórios</h4>
                         <p className="text-[10px] text-amber-700 mt-1 leading-relaxed">Se o cluster estiver atrás de um proxy, configure-o em <strong>Settings > http-proxy</strong> para que o download de imagens Cloud funcione corretamente.</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        );

      case 'storage':
        return (
          <div className="space-y-8 animate-fade-in">
             <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-purple-600 rounded-2xl shadow-lg shadow-purple-200">
                   <HardDrive className="w-8 h-8 text-white" />
                </div>
                <div>
                   <h1 className="text-3xl font-bold text-suse-dark">Armazenamento com Longhorn 1.7</h1>
                   <p className="text-sm text-gray-500">Gestão de volumes distribuídos e alta disponibilidade de dados.</p>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                   <h3 className="font-bold text-gray-800 flex items-center gap-2"><Database className="w-5 h-5 text-purple-600"/> Arquitetura Longhorn</h3>
                   <p className="text-xs text-gray-600 leading-relaxed">O Longhorn transforma discos locais em volumes de bloco distribuídos. Ele é gerenciado nativamente pelo Harvester.</p>
                   
                   <div className="space-y-4">
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                         <h4 className="text-xs font-bold text-slate-800 mb-1">Storage Classes</h4>
                         <p className="text-[10px] text-slate-500">Defina classes com diferentes números de réplicas. Para HA, use <strong>Number of Replicas: 3</strong>.</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                         <h4 className="text-xs font-bold text-slate-800 mb-1">Volume Health</h4>
                         <p className="text-[10px] text-slate-500">Volumes em 'Healthy' possuem todas as réplicas sincronizadas. 'Degraded' indica que uma réplica falhou, mas o dado ainda está acessível.</p>
                      </div>
                   </div>
                </div>

                <div className="space-y-6">
                   <div className="bg-purple-50 border border-purple-200 p-8 rounded-3xl space-y-4">
                      <h3 className="font-bold text-purple-800 flex items-center gap-2"><ShieldAlert className="w-5 h-5"/> Manutenção & Discos</h3>
                      <ul className="space-y-3">
                         {[
                            "Evite remover discos sem antes colocar o nó em modo manutenção.",
                            "O Longhorn requer discos formatados em EXT4 ou XFS.",
                            "Verifique o status do Longhorn Dashboard via 'Advanced' no Harvester.",
                            "Mantenha pelo menos 20% de espaço livre nos discos para evitar erros de escrita."
                         ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-xs text-purple-700">
                               <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                               {item}
                            </li>
                         ))}
                      </ul>
                   </div>
                   <div className="bg-white border border-gray-200 p-6 rounded-3xl flex items-center justify-between group hover:border-purple-600 transition-all">
                      <div className="flex items-center gap-3">
                         <Activity className="w-6 h-6 text-purple-600" />
                         <div>
                            <h4 className="text-xs font-bold text-gray-800">Monitoramento de I/O</h4>
                            <p className="text-[9px] text-gray-400">Acompanhe a latência de escrita em tempo real.</p>
                         </div>
                      </div>
                      <a href="https://longhorn.io/docs/1.7.0/" target="_blank" rel="noreferrer" className="p-2 bg-purple-50 rounded-lg text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all">
                         <ExternalLink className="w-4 h-4" />
                      </a>
                   </div>
                </div>
             </div>
          </div>
        );

      case 'poc-goals':
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-between border-b pb-4">
                <h1 className="text-3xl font-bold text-suse-dark">Manual de Execução da POC</h1>
                <div className="px-3 py-1 bg-suse-base/10 text-suse-base rounded-full text-[10px] font-bold uppercase tracking-widest border border-suse-base/20">
                    {goals.length} Itens de Validação
                </div>
            </div>

            {goals.length === 0 ? (
              <div className="py-24 text-center border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50/50">
                 <Target className="w-16 h-16 mx-auto text-gray-300 mb-4 opacity-40" />
                 <h3 className="text-gray-500 font-bold">Nenhum objetivo selecionado</h3>
                 <p className="text-gray-400 text-sm max-w-xs mx-auto mt-1">Volte ao menu "Client Information" e selecione os itens que deseja validar nesta prova de conceito.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {goals.map((goal, idx) => {
                  const data = GOAL_PROCEDURES[goal] || { steps: ["Procedimento em elaboração. Consulte o docs.harvesterhci.io."], icon: Target, dependencies: ["Nenhuma registrada."], docsUrl: "https://docs.harvesterhci.io", tip: "Consulte o manual oficial." };
                  const Icon = data.icon;
                  return (
                    <div key={idx} className="bg-white border-2 border-gray-100 rounded-3xl shadow-sm overflow-hidden group hover:border-suse-base transition-all duration-300">
                      
                      {/* Header do Objetivo */}
                      <div className="bg-gray-50/80 px-8 py-5 border-b border-gray-100 flex items-center justify-between group-hover:bg-suse-base/5 transition-colors">
                        <div className="flex items-center gap-5">
                            <div className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100 text-suse-base">
                            <Icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800 text-lg leading-tight">{goal}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <LinkIcon className="w-3 h-3 text-gray-400" />
                                    <a href={data.docsUrl} target="_blank" rel="noreferrer" className="text-[10px] text-gray-400 uppercase font-bold tracking-widest hover:text-suse-base flex items-center gap-1 transition-colors">
                                        Documentação Oficial <ExternalLink className="w-2.5 h-2.5" />
                                    </a>
                                </div>
                            </div>
                        </div>
                      </div>

                      <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                        
                        {/* Passo a Passo */}
                        <div className="lg:col-span-8 space-y-6">
                            <div className="flex items-center gap-2 text-gray-700 font-bold text-xs uppercase tracking-widest mb-2">
                                <Monitor className="w-4 h-4 text-suse-base" /> Procedimento de Execução
                            </div>
                            <ul className="space-y-4">
                            {data.steps.map((s, sIdx) => (
                                <li key={sIdx} className="flex gap-4 text-sm text-gray-600 leading-relaxed group/item">
                                <span className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center shrink-0 font-bold text-xs text-slate-500 group-hover/item:bg-suse-base group-hover/item:text-white transition-colors">{sIdx + 1}</span>
                                <span className="pt-0.5">{s}</span>
                                </li>
                            ))}
                            </ul>
                            <div className="mt-8 p-5 bg-amber-50/50 border border-amber-100 rounded-2xl flex gap-4 items-start">
                                <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-[11px] text-amber-800 font-bold uppercase tracking-widest mb-1">Dica de Especialista</p>
                                    <p className="text-[11px] text-amber-900/80 leading-relaxed">{data.tip}</p>
                                </div>
                            </div>
                        </div>

                        {/* Dependências e Recursos */}
                        <div className="lg:col-span-4 space-y-8 lg:border-l lg:pl-8 border-gray-100">
                            
                            {/* Dependências */}
                            <div>
                                <div className="flex items-center gap-2 text-gray-700 font-bold text-[10px] uppercase tracking-widest mb-4">
                                    <AlertCircle className="w-3.5 h-3.5 text-orange-500" /> Dependências Técnicas
                                </div>
                                <ul className="space-y-2">
                                    {data.dependencies.map((dep, dIdx) => (
                                        <li key={dIdx} className="flex items-center gap-2 text-[11px] text-gray-500 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                                            <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                                            {dep}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Recursos Úteis */}
                            {data.resourceLinks && (
                                <div>
                                    <div className="flex items-center gap-2 text-gray-700 font-bold text-[10px] uppercase tracking-widest mb-4">
                                        <Download className="w-3.5 h-3.5 text-blue-500" /> Links de Recurso
                                    </div>
                                    <div className="space-y-2">
                                        {data.resourceLinks.map((link, lIdx) => (
                                            <a 
                                                key={lIdx}
                                                href={link.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center justify-between bg-blue-50/50 border border-blue-100 px-4 py-3 rounded-xl hover:bg-blue-100 transition-colors group/link"
                                            >
                                                <span className="text-[11px] font-bold text-blue-700">{link.label}</span>
                                                <ExternalLink className="w-3.5 h-3.5 text-blue-400 group-hover/link:translate-x-0.5 transition-transform" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );

      case 'rancher':
        return (
          <div className="space-y-8 animate-fade-in">
             <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200">
                   <Cloud className="w-8 h-8 text-white" />
                </div>
                <div>
                   <h1 className="text-3xl font-bold text-suse-dark">Integração Rancher Manager v2.8+</h1>
                   <p className="text-sm text-gray-500 leading-relaxed">O Rancher Manager fornece uma interface única para gerenciar clusters Harvester e clusters Kubernetes RKE2/K3s executados sobre o Harvester.</p>
                </div>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Tutorial de Integração */}
                <div className="lg:col-span-7 space-y-6">
                   <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-8">
                      <h3 className="text-lg font-bold text-gray-800 flex items-center gap-3">
                         <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Play className="w-5 h-5" /></div> 
                         Workflow de Implementação Detalhado
                      </h3>
                      
                      <div className="space-y-8 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-0.5 before:bg-blue-50">
                         {[
                            { 
                              title: "Habilitação da Feature de Virtualização", 
                              desc: "No Rancher Manager, navegue até 'Global Settings' > 'Feature Flags'. Localize a flag 'harvester' (ou 'virtualization' em versões mais recentes). Certifique-se que o status é 'Enabled'. Isso habilita o painel de Virtualização no menu lateral esquerdo do Rancher.",
                              doc: "https://ranchermanager.docs.rancher.com/v2.8/how-to-guides/new-user-guides/kubernetes-clusters-in-rancher-setup/virtualization-management"
                            },
                            { 
                              title: "Importação do Cluster Harvester", 
                              desc: "No menu lateral 'Virtualization Management', clique em 'Import Cluster'. Insira um nome identificável para o cluster Harvester. Você precisará do arquivo Kubeconfig do seu cluster Harvester (disponível no canto inferior esquerdo do Harvester Dashboard). O Rancher implantará agentes especializados (harvester-cloud-provider) no cluster.",
                              doc: "https://docs.harvesterhci.io/v1.7/rancher/rancher-integration/#importing-harvester-cluster"
                            },
                            { 
                              title: "Criação de Cloud Credentials", 
                              desc: "Para que o Rancher gerencie máquinas no Harvester, você deve criar credenciais. Vá em 'Cluster Management' > 'Cloud Credentials' > 'Create'. Selecione 'Harvester'. O Rancher usará essas credenciais para interagir com a API do Harvester via seu Virtual IP (VIP).",
                              doc: "https://ranchermanager.docs.rancher.com/v2.8/how-to-guides/new-user-guides/kubernetes-clusters-in-rancher-setup/set-up-cloud-providers/harvester"
                            },
                            { 
                              title: "Provisionamento de Cluster RKE2", 
                              desc: "Agora, em 'Cluster Management' > 'Create', escolha 'Harvester' como the Cloud Provider. Configure o 'Machine Pool' definindo CPU, Memória e a Imagem de SO (ex: SLES 15 ou openSUSE). O Rancher criará automaticamente as VMs no Harvester e as configurará como nós do seu novo cluster K8s.",
                              doc: "https://docs.harvesterhci.io/v1.7/rancher/node-driver/"
                            },
                            {
                              title: "Habilitação do Harvester Cloud Provider",
                              desc: "Durante a criação do cluster no Rancher, na aba 'Cloud Provider', certifique-se de selecionar 'Harvester'. Isso integra o cluster convidado com o Load Balancer e o Storage (Longhorn) do Harvester de forma nativa.",
                              doc: "https://docs.harvesterhci.io/v1.7/rancher/cloud-provider/"
                            }
                         ].map((s, i) => (
                            <div key={i} className="flex gap-6 relative z-10 group">
                               <div className="w-10 h-10 rounded-full bg-white border-4 border-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0 shadow-sm group-hover:border-blue-200 transition-all">
                                  {i + 1}
                               </div>
                               <div className="space-y-2">
                                  <div className="flex items-center gap-3">
                                    <h4 className="text-base font-bold text-gray-800">{s.title}</h4>
                                    <a href={s.doc} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-600"><LinkIcon className="w-3 h-3"/></a>
                                  </div>
                                  <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                               </div>
                            </div>
                         ))}
                      </div>

                      <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <img src="https://rancher.com/assets/img/logos/rancher-logo-stacked-color.svg" className="h-6 opacity-40" alt="Rancher" />
                            <div className="w-0.5 h-4 bg-gray-200"></div>
                            <img src="https://harvesterhci.io/img/logo_horizontal.svg" className="h-4 opacity-40" alt="Harvester" />
                         </div>
                         <a 
                           href="https://docs.harvesterhci.io/v1.7/rancher/rancher-integration/" 
                           target="_blank" 
                           rel="noreferrer"
                           className="flex items-center gap-2 text-xs font-bold text-blue-600 hover:underline"
                         >
                            Guia Oficial de Integração <ExternalLink className="w-3 h-3" />
                         </a>
                      </div>
                   </div>
                </div>

                {/* Troubleshooting & Requisitos */}
                <div className="lg:col-span-5 space-y-6">
                   <div className="bg-slate-900 text-white p-8 rounded-3xl space-y-6 shadow-xl">
                      <h3 className="font-bold text-suse-base flex items-center gap-3 text-lg">
                         <ShieldCheck className="w-6 h-6" /> Pré-requisitos de Arquitetura
                      </h3>
                      <ul className="space-y-4">
                         {[
                            { l: "Versão do Rancher", d: "Rancher v2.8.0+ é necessário para integração total com Harvester v1.7.0+." },
                            { l: "Acesso à API (VIP)", d: "O Rancher Manager deve conseguir acessar o Cluster VIP do Harvester na porta 443 sem interrupções." },
                            { l: "Porta 8443 (Webhook)", d: "Crucial para a comunicação de admissão de recursos entre Rancher e Harvester." },
                            { l: "Certificados Confiáveis", d: "Se usar certificados auto-assinados no Harvester, você deve importar a CA no Rancher or habilitar 'Allow Insecure' nas credenciais." }
                         ].map((req, i) => (
                            <li key={i} className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                               <div className="w-2 h-2 rounded-full bg-suse-base mt-1.5 shrink-0"></div>
                               <div>
                                  <div className="text-xs font-bold text-white">{req.l}</div>
                                  <div className="text-[10px] text-gray-400 mt-1">{req.d}</div>
                               </div>
                            </li>
                         ))}
                      </ul>
                   </div>

                   <div className="bg-red-50 border border-red-100 p-8 rounded-3xl space-y-6">
                      <h3 className="font-bold text-red-800 flex items-center gap-3 text-lg">
                         <ShieldAlert className="w-6 h-6" /> Troubleshooting Comum
                      </h3>
                      <div className="space-y-4">
                         <div className="bg-white p-4 rounded-2xl border border-red-100 shadow-sm">
                            <div className="flex items-center gap-2 mb-2">
                               <AlertCircle className="w-4 h-4 text-red-600" />
                               <h4 className="text-xs font-bold text-red-900">Erro x509: Unknown Authority</h4>
                            </div>
                            <p className="text-[10px] text-red-700 leading-relaxed">Causa: O Rancher não confia no certificado do Harvester. Solução: Em 'Cloud Credentials', adicione a CA do Harvester no campo 'Certificate Authority' ou marque 'Ignore Certificate Errors'.</p>
                         </div>
                         <div className="bg-white p-4 rounded-2xl border border-red-100 shadow-sm">
                            <div className="flex items-center gap-2 mb-2">
                               <Lock className="w-4 h-4 text-red-600" />
                               <h4 className="text-xs font-bold text-red-900">Stuck in 'Provisioning'</h4>
                            </div>
                            <p className="text-[10px] text-red-700 leading-relaxed">Causa: A VM no Harvester não consegue baixar pacotes do Rancher ou via Internet. Solução: Verifique as configurações de rede da VM e certifique-se que o VIP do Rancher é acessível a partir da VLAN da VM.</p>
                         </div>
                         <div className="bg-white p-4 rounded-2xl border border-red-100 shadow-sm">
                            <div className="flex items-center gap-2 mb-2">
                               <Layers className="w-4 h-4 text-red-600" />
                               <h4 className="text-xs font-bold text-red-900">Cloud Provider não inicia</h4>
                            </div>
                            <p className="text-[10px] text-red-700 leading-relaxed">Causa: Falha na comunicação entre o cluster convidado e a API do Harvester. Solução: Verifique se os nós worker têm rota para o VIP do Harvester e se as portas 6443/443 estão abertas.</p>
                         </div>
                      </div>
                   </div>

                   <div className="p-6 bg-blue-50 border border-blue-200 rounded-3xl">
                      <h4 className="text-xs font-bold text-blue-800 flex items-center gap-2 mb-3">
                        <Info className="w-4 h-4" /> Dica de Topologia
                      </h4>
                      <p className="text-[10px] text-blue-700 leading-relaxed">
                        Para melhor performance em produção, recomenda-se que o Rancher Manager seja executado fora do próprio cluster Harvester que ele gerencia, evitando loops de dependência em caso de falha total do hardware.
                      </p>
                   </div>
                </div>
             </div>
          </div>
        );

      case 'troubleshooting':
        return (
          <div className="space-y-8 animate-fade-in">
             <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-red-600 rounded-2xl shadow-lg">
                   <Wrench className="w-8 h-8 text-white" />
                </div>
                <div>
                   <h1 className="text-3xl font-bold text-suse-dark">Troubleshooting & Diagnóstico</h1>
                   <p className="text-sm text-gray-500">Comandos essenciais para identificar e resolver problemas comuns no Harvester.</p>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Diagnóstico de Instalação */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                  <h3 className="font-bold text-gray-800 flex items-center gap-2 text-sm">
                    <Terminal className="w-4 h-4 text-red-500" /> Logs de Instalação e Boot
                  </h3>
                  <div className="space-y-4">
                    {[
                      { 
                        label: "Logs do Cloud-Init", 
                        cmd: "cat /var/log/cloud-init-output.log", 
                        desc: "Primeiro lugar para checar se scripts de pós-instalação falharam." 
                      },
                      { 
                        label: "Journal do Instalador", 
                        cmd: "journalctl -u harvester-installer -f", 
                        desc: "Monitora logs do wizard de instalação em tempo real." 
                      }
                    ].map((item, i) => (
                      <div key={i} className="group bg-slate-50 p-3 rounded-xl border border-slate-100 hover:border-red-200 transition-all">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.label}</span>
                          <button onClick={() => copyToClipboard(item.cmd)} className="text-slate-300 hover:text-red-500 transition-colors">
                            {copiedCmd === item.cmd ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                        <code className="block bg-slate-900 text-red-400 p-2 rounded text-[10px] font-mono break-all mb-1">{item.cmd}</code>
                        <p className="text-[9px] text-slate-400 italic leading-tight">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status do Cluster e Pods */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                  <h3 className="font-bold text-gray-800 flex items-center gap-2 text-sm">
                    <Layers className="w-4 h-4 text-blue-500" /> Status de Pods e K8s Interno
                  </h3>
                  <div className="space-y-4">
                    {[
                      { 
                        label: "Pods com Erro", 
                        cmd: "kubectl get pods -A | grep -v Running | grep -v Completed", 
                        desc: "Lista apenas pods que estão em CrashLoopBackOff ou Error." 
                      },
                      { 
                        label: "Eventos do Cluster", 
                        cmd: "kubectl get events -A --sort-by='.lastTimestamp'", 
                        desc: "Mostra os últimos eventos significativos (erros de agendamento, etc)." 
                      }
                    ].map((item, i) => (
                      <div key={i} className="group bg-slate-50 p-3 rounded-xl border border-slate-100 hover:border-blue-200 transition-all">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.label}</span>
                          <button onClick={() => copyToClipboard(item.cmd)} className="text-slate-300 hover:text-blue-500 transition-colors">
                            {copiedCmd === item.cmd ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                        <code className="block bg-slate-900 text-blue-300 p-2 rounded text-[10px] font-mono break-all mb-1">{item.cmd}</code>
                        <p className="text-[9px] text-slate-400 italic leading-tight">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rede e Conectividade */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                  <h3 className="font-bold text-gray-800 flex items-center gap-2 text-sm">
                    <Wifi className="w-4 h-4 text-emerald-500" /> Conectividade e VIP
                  </h3>
                  <div className="space-y-4">
                    {[
                      { 
                        label: "Verificar VIP do Cluster", 
                        cmd: "ip addr show kube-ipvs0", 
                        desc: "Confirma se o VIP está atribuído corretamente ao nó master." 
                      },
                      { 
                        label: "Teste de Saída DNS", 
                        cmd: "nslookup registry.suse.com", 
                        desc: "Valida se a resolução de nomes externa está funcionando." 
                      }
                    ].map((item, i) => (
                      <div key={i} className="group bg-slate-50 p-3 rounded-xl border border-slate-100 hover:border-emerald-200 transition-all">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.label}</span>
                          <button onClick={() => copyToClipboard(item.cmd)} className="text-slate-300 hover:text-emerald-500 transition-colors">
                            {copiedCmd === item.cmd ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                        <code className="block bg-slate-900 text-emerald-400 p-2 rounded text-[10px] font-mono break-all mb-1">{item.cmd}</code>
                        <p className="text-[9px] text-slate-400 italic leading-tight">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Armazenamento Longhorn */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                  <h3 className="font-bold text-gray-800 flex items-center gap-2 text-sm">
                    <Database className="w-4 h-4 text-purple-500" /> Armazenamento (Longhorn)
                  </h3>
                  <div className="space-y-4">
                    {[
                      { 
                        label: "Status dos Volumes", 
                        cmd: "kubectl get volumes.longhorn.io -n longhorn-system", 
                        desc: "Checa se existem volumes Degraded ou Detached indevidamente." 
                      },
                      { 
                        label: "Nós do Longhorn", 
                        cmd: "kubectl get nodes.longhorn.io -n longhorn-system", 
                        desc: "Verifica o espaço disponível em disco para o storage distribuído." 
                      }
                    ].map((item, i) => (
                      <div key={i} className="group bg-slate-50 p-3 rounded-xl border border-slate-100 hover:border-purple-200 transition-all">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.label}</span>
                          <button onClick={() => copyToClipboard(item.cmd)} className="text-slate-300 hover:text-purple-500 transition-colors">
                            {copiedCmd === item.cmd ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                        <code className="block bg-slate-900 text-purple-300 p-2 rounded text-[10px] font-mono break-all mb-1">{item.cmd}</code>
                        <p className="text-[9px] text-slate-400 italic leading-tight">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
             </div>

             <div className="p-6 bg-slate-900 text-white rounded-3xl flex gap-6 items-center">
               <div className="p-4 bg-white/10 rounded-2xl">
                 <ShieldAlert className="w-10 h-10 text-suse-base" />
               </div>
               <div>
                 <h4 className="font-bold text-lg">Support Bundle (Evidência Final)</h4>
                 <p className="text-xs text-slate-400 mt-1 leading-relaxed">Se o problema persistir, gere o bundle de suporte completo para enviar aos especialistas. O comando abaixo cria um pacote zipado com todos os logs do cluster.</p>
                 <code className="inline-block bg-slate-800 px-3 py-1.5 rounded mt-3 text-suse-base font-mono text-xs">harvester-support-bundle</code>
               </div>
             </div>
          </div>
        );

      default:
        return (
            <div className="py-20 text-center opacity-50">
                <Search className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-400 italic">Selecione uma seção no menu lateral para visualizar os detalhes técnicos.</p>
            </div>
        );
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-[600px]">
      <aside className="lg:w-64 flex-shrink-0">
        <nav className="space-y-1 sticky top-24">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-4 text-sm font-medium rounded-2xl transition-all text-left ${
                activeSection === section.id
                  ? 'bg-suse-base text-white shadow-xl translate-x-1 shadow-suse-base/20'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                {section.icon}
                <span className="font-bold">{section.label}</span>
              </div>
              {section.count !== undefined && section.count > 0 && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${activeSection === section.id ? 'bg-white text-suse-base' : 'bg-suse-base/10 text-suse-base'}`}>
                  {section.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </aside>

      <div className="flex-1 bg-white p-10 rounded-3xl border border-gray-200 shadow-sm min-h-[500px]">
        {renderContent()}
        <div className="mt-16 pt-8 border-t border-gray-100 flex justify-end no-print">
            {activeSection !== 'troubleshooting' && (
                <button 
                    onClick={handleNext}
                    className="flex items-center gap-3 bg-suse-dark text-white px-8 py-4 rounded-2xl hover:bg-black transition-all font-bold shadow-xl hover:scale-105 active:scale-95"
                >
                    Próximo Tópico <ArrowRight className="w-5 h-5" />
                </button>
            )}
        </div>
      </div>
    </div>
  );
};
