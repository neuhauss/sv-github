
import { Language } from './types';
import { 
  Play, 
  Image as ImageIcon, 
  Database, 
  Network, 
  Monitor, 
  RefreshCw, 
  Cloud, 
  HardDrive, 
  Key, 
  Terminal, 
  ShieldCheck, 
  Save, 
  Server, 
  Settings, 
  FileCode, 
  Zap, 
  Cpu 
} from 'lucide-react';

export const translations = {
  en: {
    common: {
      next: "Continue",
      back: "Back",
      finish: "Finish",
      step: "Step",
      of: "of",
      home: "Home",
      planningMode: "Planning Mode",
      enterprisePlanner: "Harvester v1.7 Enterprise Planner",
      required: "Required",
      completed: "Completed",
      pending: "Pending",
      reference: "Reference",
      expertTip: "Expert Tip",
      techDependencies: "Technical Dependencies",
      resourceLinks: "Resource Links",
      officialDocs: "Official Documentation",
      copy: "Copy",
      copied: "Copied!",
      print: "Print Report / PDF",
      exportJson: "Export JSON",
      aiContext: "AI Context",
      newProject: "New Planning"
    },
    dashboard: {
      welcome: "Welcome to SUSE Virtualization",
      subtitle: "This assistant guides you through planning, installation, and validation of your POC.",
      import: "Import Project (JSON)",
      reportTitle: "Generate Final POC Report",
      reportDesc: "Combine configuration and validation results into a professional report."
    },
    nav: {
      project: "Project",
      hardware: "Hardware",
      network: "Network",
      topology: "Topology",
      installation: "Installation",
      automation: "Automation",
      validation: "Validation",
      tests: "Tests",
      report: "Report"
    },
    pocDetails: {
      title: "Project & POC Goals",
      subtitle: "Define the base parameters for the validation.",
      projectName: "Project / POC Name",
      projectPlaceholder: "Ex: Datacenter Core Migration v1.7",
      leadTitle: "SUSE/Partner Technical Lead",
      leadName: "Lead Engineer",
      leadEmail: "Corporate Email",
      clientTitle: "Client Information",
      clientOrg: "Organization / Client",
      clientContact: "Contact Person",
      clientPhone: "Phone",
      scheduleTitle: "Planned Schedule",
      startDate: "Start Date",
      targetDate: "Target Date",
      goalsTitle: "POC Objectives",
      goalsSubtitle: "Select the success criteria to be validated.",
      selectAll: "Select All",
      clearAll: "Clear Selection",
      goalRequired: "Select at least one objective."
    },
    hardware: {
        title: "Hardware Validation v1.7",
        profile: "Enterprise Profile",
        nodes: "Physical Nodes",
        cores: "Cores per Node",
        ram: "RAM GB per Node",
        gpu: "GPU Acceleration (AI Readiness)",
        gpuEnabled: "GPU Enabled (Pass-through)",
        gpuDisabled: "Disabled",
        storageType: "Storage Type",
        compatible: "Hardware Compatible v1.7",
        notMet: "Requirements Not Met"
    },
    network: {
      title: "Network & Connectivity",
      subtitle: "Configure the network fabric and validate inter-node communication requirements.",
      tabs: {
        topology: "Infrastructure Design",
        addressing: "Global Parameters",
        nodes: "IP Inventory",
        connectivity: "Connectivity Suite"
      },
      labels: {
        vip: "Cluster Virtual IP (VIP)",
        cidr: "Management CIDR",
        gateway: "Default Gateway IP",
        vlan: "VLAN ID (Optional)",
        dns: "DNS Servers",
        ntp: "NTP Servers",
        hostname: "Hostname",
        staticIp: "Static IP",
        nodeCapacity: "Node Capacity",
        minNodesInfo: "Minimum 3 nodes required for HA (High Availability)."
      },
      diagnostic: {
        title: "Diagnostic Tests",
        desc: "Verify that critical ports and download URLs are reachable from your workstation.",
        run: "Run Connectivity Suite",
        testing: "Testing..."
      }
    },
    installGuide: {
      sections: {
        overview: "Overview",
        planning: "Planning",
        install: "Installation (ISO)",
        config: "Initial Setup",
        storage: "Storage",
        pocGoals: "POC Procedures",
        rancher: "Rancher Integration",
        troubleshooting: "Troubleshooting"
      },
      overview: {
        title: "Technical Documentation v1.7",
        subtitle: "This guide centralizes official procedures for SUSE Virtualization (Harvester) implementation.",
        hciTitle: "Modern HCI",
        hciDesc: "100% open-source Hyperconverged Infrastructure based on KubeVirt and Longhorn.",
        prodTitle: "Production Ready",
        prodDesc: "Native high availability and direct integration with Rancher for multi-cluster management."
      },
      planning: {
        title: "Infrastructure Planning & Prerequisites",
        desc: "Precision in planning prevents most installation failures. Follow Harvester v1.7 specifications strictly.",
        cpu: "Minimum 8 Physical Cores (x86_64). Ensure VT-x (Intel) or AMD-V (AMD) and AVX are enabled in BIOS. For v1.7, verify if IOMMU is enabled for GPU/PCI passthrough tasks.",
        ram: "32GB RAM minimum for management. Enterprise production recommends 64GB+ per node for workload density. Monitor memory pressure during initial cluster bootstrap.",
        network: "10Gbps fabric for Storage/Longhorn replication is mandatory for performance. Use separate NICs for Management and Data (vlan-network) if possible. Bond 2x NICs for redundancy using LACP (802.3ad).",
        mtu: "MTU 9000 (Jumbo Frames) must be configured on all physical switches to avoid etcd and Longhorn performance degradation. Ensure end-to-end support or stick to MTU 1500.",
        bios: "Set SATA/Disk controllers to HBA/JBOD mode. Software RAID is NOT supported. Disable Secure Boot for initial install. Enable SR-IOV if high-performance networking for specific VMs is required.",
        internet: "Outbound access to registry.suse.com and docker.io is required unless using the Air-Gap install method. Verify DNS resolution for these domains before starting."
      },
      install: {
        title: "Step-by-Step ISO Installation",
        node1: "1st Node (Seed): Select 'Create a new Harvester cluster'. Define a persistent Cluster VIP. This IP must be in the same management subnet as the node IPs but outside the DHCP pool range.",
        node2: "Subsequent Nodes: Select 'Join an existing Harvester cluster'. You will need the Cluster VIP and the secret Cluster Token (available on Node 1 at /var/lib/rancher/k3s/server/node-token).",
        reboot: "After the text-based installer finishes, remove the media and reboot. The system will perform final initialization. This stage formats all local disks allocated during setup.",
        tip: "Wait for the login prompt on the physical console. If the Dashboard is not reachable, check if the VIP has successfully migrated to the healthy node (ping [VIP])."
      },
      config: {
        title: "Access & Initial Setup",
        url: "Navigate to https://[VIP] to access the Dashboard. Use a modern browser and expect a self-signed certificate warning if no external CA is provided.",
        password: "Set the admin password. Important: This password applies to the Web UI and the 'root' user in the Linux shell. Record it securely.",
        settings: "Network: Create a 'Network Config' under Settings to bind physical NICs to the bridge (harvester-br0). Define a ClusterNetwork to enable L2VLAN support for VM workloads.",
        backup: "Configure an S3 or NFS Backup Target immediately. Without it, VM snapshots are local and won't survive a node disk failure. Test the target connectivity after saving."
      },
      storage: {
        title: "Longhorn SDS Optimization",
        replica: "Default replica count is 3. In a 3-node cluster, this ensures that data is replicated across all nodes. Data remains available even if one node is offline.",
        bench: "Disk latency (Fsync) must be below 10ms. High latency on the OS disk will cause etcd to panic. Run 'fio' benchmarks before moving to production.",
        ssd: "Enterprise NVMe or SSDs are mandatory for data partitions. Standard HDDs are unsuitable for etcd storage due to low IOPS, leading to cluster instability.",
        expansion: "To add storage: Add a physical disk to a node, then in the UI go to Host -> Storage -> Edit. Select the new disk and add it to the Longhorn pool."
      },
      troubleshooting: {
        title: "Common Fixes & Diagnostics",
        initrd: "Stalled at 'Loading initrd'? Check BIOS for UEFI vs Legacy mismatch. Ensure the ISO was written using DD mode if using Rufus.",
        vip: "VIP unreachable? Ensure the IP is not in use elsewhere and that the switch doesn't block gratuitous ARP. Check if 'kube-vip' pods are running.",
        etcd: "Cluster shows 'NotReady'? Check node logs (journalctl -u harvester). Verify if disk space is 100% full on the /var/lib/harvester partition."
      },
      rancher: {
        title: "Rancher Manager Integration",
        subtitle: "Rancher acts as the centralized control plane for multi-cluster virtualization management.",
        step1: "Requirements & Flags",
        step1Desc: "Ensure Rancher v2.8.0+ is installed. Go to Global Settings -> Feature Flags. Enable the 'harvester' flag. Refresh your browser to see the 'Virtualization Management' menu appear in the sidebar.",
        step2: "Import Cluster",
        step2Desc: "In Virtualization Management, click 'Import'. Provide the Harvester Cluster VIP and credentials. Rancher will generate a manifest to be applied on the Harvester cluster or handle the handshake automatically via API.",
        step3: "Cloud Credentials",
        step3Desc: "Navigate to Cluster Management -> Cloud Credentials. Create a new credential using the 'Harvester' provider. This allows Rancher to authenticate with Harvester to provision downstream RKE2/K3s clusters.",
        step4: "Provisioning RKE2",
        step4Desc: "Go to Cluster Management -> Create. Select 'Harvester' as the infrastructure. Define your node pools (CPU, RAM, Image, Network). Rancher will automatically create the VMs and bootstrap Kubernetes on top.",
        trouble: "Integration Troubleshooting: 1. Cert Validation: If Rancher uses a private CA, you must add it to Harvester's 'Additional CA' settings. 2. Port 443: Bi-directional HTTPS communication between Rancher and Harvester VIP is mandatory. 3. Agent Sync: If the cluster stays 'Pending', check the 'cattle-cluster-agent' logs inside the Harvester cluster."
      }
    },
    shell: {
      title: "Shell Toolbox",
      subtitle: "Access nodes via SSH and use the following commands for validation and troubleshooting.",
      categories: {
        bench: "Benchmarking (Etcd Performance)",
        storage: "Longhorn Storage Troubleshooting",
        diag: "Advanced Cluster Diagnostics",
        net: "Network & Connectivity",
        health: "Node & Workload Health",
        rancher_cleanup: "Rancher Integration Cleanup"
      }
    },
    testPlan: {
      title: "Test Plan & Acceptance",
      subtitle: "Result mapping based on selected objectives.",
      summary: {
        planned: "Total Planned",
        success: "Success (Pass)",
        fail: "Failures (Fail)"
      },
      table: {
        criteria: "Success Criteria",
        procedure: "Technical Procedure",
        expected: "Expected Result",
        validate: "Validate"
      }
    },
    summary: {
      execSummary: "Executive Summary of Hyper-Converged Infrastructure (HCI) v1.7",
      stakeholders: "Stakeholders & Timeline",
      techDetails: "Technical Configuration Details",
      topology: "Planned Topology Diagram",
      acceptance: "Formalization and Acceptance of the POC Plan",
      authorized: "Authorized Representative",
      generatedBy: "Document electronically generated via SUSE Virtualization Enterprise Planner.",
      aiTitle: "Export Context for AI",
      aiDesc: "Copy this prompt for ChatGPT or Claude.",
      aiPromptHeader: "You are a Senior Solutions Architect assisting with a SUSE Virtualization Proof of Concept (POC)."
    }
  },
  pt: {
    common: {
      next: "Continuar",
      back: "Voltar",
      finish: "Finalizar",
      step: "Etapa",
      of: "de",
      home: "Início",
      planningMode: "Modo Planejamento",
      enterprisePlanner: "Harvester v1.7 Planejador Enterprise",
      required: "Obrigatório",
      completed: "Concluído",
      pending: "Pendente",
      reference: "Referência",
      expertTip: "Dica de Especialista",
      techDependencies: "Dependências Técnicas",
      resourceLinks: "Links de Recurso",
      officialDocs: "Documentação Oficial",
      copy: "Copiar",
      copied: "Copiado!",
      print: "Imprimir Relatório / PDF",
      exportJson: "Exportar JSON",
      aiContext: "Contexto para IA",
      newProject: "Novo Planejamento"
    },
    dashboard: {
      welcome: "Bem-vindo ao SUSE Virtualization",
      subtitle: "Este assistente guia você pelo planejamento, instalação e validação da sua POC.",
      import: "Importar Projeto (JSON)",
      reportTitle: "Gerar Relatório Final da POC",
      reportDesc: "Combine configurações e resultados de validação em um relatório profissional."
    },
    nav: {
      project: "Projeto",
      hardware: "Hardware",
      network: "Rede",
      topology: "Topologia",
      installation: "Instalação",
      automation: "Automação",
      validation: "Validação",
      tests: "Testes",
      report: "Relatório"
    },
    pocDetails: {
      title: "Projeto & Objetivos da POC",
      subtitle: "Defina os parâmetros base para a validação.",
      projectName: "Nome do Projeto / POC",
      projectPlaceholder: "Ex: Migração Datacenter Core v1.7",
      leadTitle: "Líder Técnico SUSE/Parceiro",
      leadName: "Engenheiro Responsável",
      leadEmail: "E-mail Corporativo",
      clientTitle: "Informações do Cliente",
      clientOrg: "Organização / Cliente",
      clientContact: "Ponto de Contato",
      clientPhone: "Telefone",
      scheduleTitle: "Cronograma Previsto",
      startDate: "Data de Início",
      targetDate: "Meta de Conclusão",
      goalsTitle: "Objetivos da POC",
      goalsSubtitle: "Selecione os critérios de sucesso a serem validados.",
      selectAll: "Selecionar Todos",
      clearAll: "Limpar Seleção",
      goalRequired: "Selecione pelo menos um objetivo."
    },
    hardware: {
        title: "Validação de Hardware v1.7",
        profile: "Perfil Enterprise",
        nodes: "Nós Físicos",
        cores: "Cores p/ Nó",
        ram: "RAM GB p/ Nó",
        gpu: "Aceleração GPU (AI Readiness)",
        gpuEnabled: "GPU Habilitada (Pass-through)",
        gpuDisabled: "Desabilitado",
        storageType: "Tipo de Storage",
        compatible: "Hardware Compatível v1.7",
        notMet: "Requisitos Não Atendidos"
    },
    network: {
      title: "Rede & Conectividade",
      subtitle: "Configure o fabric de rede e valide os requisitos de comunicação inter-nós.",
      tabs: {
        topology: "Design da Infraestrutura",
        addressing: "Parâmetros Globais",
        nodes: "Inventário de IPs",
        connectivity: "Connectivity Suite"
      },
      labels: {
        vip: "Cluster Virtual IP (VIP)",
        cidr: "Management CIDR",
        gateway: "Default Gateway IP",
        vlan: "VLAN ID (Opcional)",
        dns: "Servidores DNS",
        ntp: "Servidores NTP",
        hostname: "Hostname",
        staticIp: "IP Estático",
        nodeCapacity: "Capacidade de Nós",
        minNodesInfo: "Mínimo de 3 nós necessário para HA (Alta Disponibilidade)."
      },
      diagnostic: {
        title: "Testes de Diagnóstico",
        desc: "Verifique se as portas críticas e URLs de download estão acessíveis da sua estação.",
        run: "Executar Diagnóstico",
        testing: "Testando..."
      }
    },
    installGuide: {
      sections: {
        overview: "Visão Geral",
        planning: "Planejamento",
        install: "Instalação (ISO)",
        config: "Configuração Inicial",
        storage: "Armazenamento",
        pocGoals: "Procedimentos POC",
        rancher: "Integração Rancher",
        troubleshooting: "Solução de Problemas"
      },
      overview: {
        title: "Documentação Técnica v1.7",
        subtitle: "Este guia centraliza os procedimentos oficiais para a implementação do SUSE Virtualization (Harvester).",
        hciTitle: "HCI Moderno",
        hciDesc: "Infraestrutura Hiperconvergente 100% open-source baseada em KubeVirt e Longhorn.",
        prodTitle: "Pronto para Produção",
        prodDesc: "Alta disponibilidade nativa e integração direta com Rancher para gestão multicluster."
      },
      planning: {
        title: "Planejamento e Pré-requisitos",
        desc: "Precisão no planejamento previne a maioria das falhas de instalação. Siga as especificações rigorosamente.",
        cpu: "Mínimo 8 Cores Físicos (x86_64). Garanta que VT-x (Intel) ou AMD-V (AMD) e AVX estejam ativos no BIOS. Para v1.7, verifique se IOMMU está ativo para tarefas de passthrough GPU/PCI.",
        ram: "Mínimo 32GB de RAM para gerência. Ambientes de produção recomendam 64GB+ por nó para densidade de workloads. Monitore a pressão de memória durante o bootstrap inicial.",
        network: "Fabric de 10Gbps dedicado para replicação de Storage/Longhorn é obrigatório para performance. Use NICs separadas para Gerência e Dados se possível. Bond 2x NICs para redundância usando LACP.",
        mtu: "MTU 9000 (Jumbo Frames) deve ser configurado em todos os switches físicos para evitar degradação do etcd e Longhorn. Garanta suporte de ponta a ponta ou use MTU 1500.",
        bios: "Configure controladoras SATA/Disk em modo HBA/JBOD. RAID por software NÃO é suportado. Desative o Secure Boot. Ative SR-IOV se rede de alta performance para VMs for necessária.",
        internet: "Acesso externo para registry.suse.com e docker.io é necessário, a menos que use o método Air-Gap. Verifique a resolução DNS para estes domínios antes de começar."
      },
      install: {
        title: "Passo-a-passo Instalação ISO",
        node1: "1º Nó (Seed): Escolha 'Create a new Harvester cluster'. Defina um VIP de Cluster persistente. Este IP deve estar na mesma sub-rede de gerência mas fora do range DHCP.",
        node2: "Nós seguintes: Escolha 'Join an existing cluster'. Você precisará do Cluster VIP e do Token do Cluster (disponível no Nó 1 em /var/lib/rancher/k3s/server/node-token).",
        reboot: "Após o término do instalador, remova a mídia e reinicie. O sistema fará a inicialização final. Este estágio formata todos os discos locais alocados.",
        tip: "Aguarde o prompt de login no console físico. Se o Dashboard não estiver acessível, verifique se o VIP migrou com sucesso para o nó saudável (ping [VIP])."
      },
      config: {
        title: "Acesso e Configuração Inicial",
        url: "Navegue para https://[VIP] para acessar o Dashboard. Ignore o aviso de SSL caso não tenha fornecido uma CA externa no setup.",
        password: "Defina a senha de admin. Importante: Esta senha se aplica à UI Web e ao usuário 'root' no shell Linux. Guarde-a com segurança.",
        settings: "Rede: Crie um 'Network Config' em Settings para vincular NICs físicas à bridge (harvester-br0). Defina um ClusterNetwork para habilitar suporte L2VLAN para as VMs.",
        backup: "Configure um destino de Backup S3 ou NFS imediatamente. Sem isso, snapshots são locais e não sobrevivem à falha do disco do nó. Teste a conectividade após salvar."
      },
      storage: {
        title: "Otimização Longhorn SDS",
        replica: "O número padrão de réplicas é 3. Em um cluster de 3 nós, isso garante que os dados existam em todos os nós. Os dados permanecem disponíveis se um nó falhar.",
        bench: "Latência de disco (Fsync) deve ser menor que 10ms. Latência alta no disco do SO causará pânico no etcd. Execute o benchmark 'fio' antes de ir para produção.",
        ssd: "SSDs ou NVMe corporativos são mandatórios para partições de dados. HDDs comuns não são adequados para o etcd, levando à instabilidade do cluster.",
        expansion: "Para expandir: Adicione um disco físico ao nó, então na UI vá em Host -> Storage -> Edit. Selecione o novo disco e adicione-o ao pool do Longhorn."
      },
      troubleshooting: {
        title: "Correções Comuns",
        initrd: "Travado em 'Loading initrd'? Verifique UEFI/Legacy no BIOS. Garanta que a ISO foi gravada em modo DD se usar Rufus.",
        vip: "VIP inacessível? Verifique se o IP já está em uso e se o switch não bloqueia pacotes Gratuitous ARP. Cheque se os pods 'kube-vip' estão rodando.",
        etcd: "Cluster em 'NotReady'? Verifique logs do nó (journalctl -u harvester). Cheque se o espaço em disco está 100% cheio na partição /var/lib/harvester."
      },
      rancher: {
        title: "Integração com Rancher Manager",
        subtitle: "O Rancher atua como plano de controle centralizado para gestão multicluster.",
        step1: "Requisitos & Flags",
        step1Desc: "Garanta o Rancher v2.8.0+ instalado. Vá em Global Settings -> Feature Flags. Ative a flag 'harvester'. Atualize o navegador para ver o menu 'Virtualization Management' na barra lateral.",
        step2: "Importar Cluster",
        step2Desc: "Em Virtualization Management, clique em 'Import'. Forneça o VIP do cluster Harvester e as credenciais. O Rancher gerará um manifesto para ser aplicado ou fará o handshake via API.",
        step3: "Cloud Credentials",
        step3Desc: "Vá em Cluster Management -> Cloud Credentials. Crie uma nova credencial usando o provedor 'Harvester'. Isso permite ao Rancher provisionar clusters RKE2 sobre o Harvester.",
        step4: "Provisionamento RKE2",
        step4Desc: "Vá em Cluster Management -> Create. Selecione 'Harvester' como infraestrutura. Defina seus node pools (CPU, RAM, Imagem, Rede). O Rancher criará as VMs e o K8s automaticamente.",
        trouble: "Solução de Problemas: 1. Certificados: Se o Rancher usa CA privada, adicione-a no Harvester em 'Additional CA'. 2. Porta 443: Comunicação HTTPS bi-direcional entre Rancher e VIP é mandatória. 3. Sincronia: Se o cluster ficar 'Pending', cheque logs do 'cattle-cluster-agent' no Harvester."
      }
    },
    shell: {
      title: "Shell Toolbox",
      subtitle: "Acesse os nós via SSH e use os comandos abaixo para validação e troubleshooting.",
      categories: {
        bench: "Benchmarking (Etcd Performance)",
        storage: "Troubleshooting Longhorn Storage",
        diag: "Diagnósticos Avançados do Cluster",
        net: "Rede & Conectividade",
        health: "Saúde de Nós & Workloads",
        rancher_cleanup: "Limpeza de Integração Rancher"
      }
    },
    testPlan: {
      title: "Plano de Testes & Aceite",
      subtitle: "Mapeamento dos resultados baseados nos objetivos selecionados.",
      summary: {
        planned: "Total Planejado",
        success: "Sucesso (Pass)",
        fail: "Falhas (Fail)"
      },
      table: {
        criteria: "Success Criteria",
        procedure: "Technical Procedure",
        expected: "Expected Result",
        validate: "Validate"
      }
    },
    summary: {
      execSummary: "Resumo Executivo da Infraestrutura Hyper-Converged (HCI) v1.7",
      stakeholders: "Stakeholders & Cronograma",
      techDetails: "Detalhes de Configuração Técnica",
      topology: "Diagrama de Topologia Planejada",
      acceptance: "Formalização e Aceite do Plano de POC",
      authorized: "Representante Autorizado",
      generatedBy: "Documento gerado eletronicamente via SUSE Virtualization Enterprise Planner.",
      aiTitle: "Exportar Contexto para IA",
      aiDesc: "Copie este prompt para o ChatGPT ou Claude.",
      aiPromptHeader: "Você é um Arquiteto de Soluções Sênior auxiliando em uma Prova de Conceito (POC) do SUSE Virtualization."
    }
  },
  es: {
    common: { next: "Continuar", back: "Volver", finish: "Finalizar", step: "Paso", of: "de", home: "Inicio", planningMode: "Modo de Planificación", enterprisePlanner: "Planificador Enterprise Harvester v1.7", required: "Obligatorio", completed: "Completado", pending: "Pendiente", reference: "Referencia", expertTip: "Consejo de Experto", techDependencies: "Dependencias Técnicas", resourceLinks: "Enlaces de Recursos", officialDocs: "Documentación Oficial", copy: "Copiar", copied: "¡Copiado!", print: "Imprimir Informe / PDF", exportJson: "Exportar JSON", aiContext: "Contexto para IA", newProject: "Nueva Planificación" },
    dashboard: { welcome: "Bienvenido a SUSE Virtualization", subtitle: "Este asistente le guía a través de la planificación, instalación y validación de su POC.", import: "Importar Proyecto (JSON)", reportTitle: "Generar Informe Final de la POC", reportDesc: "Combine la configuración y los resultados de la validación en un informe profesional." },
    nav: { project: "Proyecto", hardware: "Hardware", network: "Red", topology: "Topología", installation: "Instalación", automation: "Automación", validation: "Validación", tests: "Pruebas", report: "Informe" },
    shell: { title: "Caja de Herramientas", subtitle: "Acceda a los nodos vía SSH y use los comandos para diagnóstico.", categories: { bench: "Benchmarking (Etcd)", storage: "Almacenamiento Longhorn", diag: "Diagnóstico Avanzado", net: "Red y Conectividad", health: "Salud de Nodos", rancher_cleanup: "Limpieza de Rancher" } },
    testPlan: { title: "Plan de pruebas", subtitle: "Mapeo de resultados.", summary: { planned: "Total planificado", success: "Éxito", fail: "Fallos" }, table: { criteria: "Criterios", procedure: "Procedimiento", expected: "Esperado", validate: "Validar" } },
    summary: { execSummary: "Resumen ejecutivo de HCI v1.7", stakeholders: "Stakeholders y Cronograma", techDetails: "Configuración técnica", topology: "Diagrama de topología", acceptance: "Formalización y aceptación", authorized: "Representante autorizado", generatedBy: "Generado por SUSE Virtualization Planner.", aiTitle: "Contexto de IA", aiDesc: "Copie para ChatGPT.", aiPromptHeader: "Usted es un Arquitecto Senior de Soluciones." },
    pocDetails: { title: "Detalles de la POC", subtitle: "Defina los parámetros para la validación.", goalRequired: "Seleccione al menos um objetivo." }
  }
};

export const POC_GOALS_LOCALIZED = {
  en: [
    "Provision hosts through the ISO installer",
    "Optional. Provision hosts through PXE boot",
    "Register an image to use for VMs",
    "Create a Storage Class and Volume",
    "Create a VLAN network in SUSE Virtualization",
    "Create a VM",
    "Configure a backup target",
    "Configure a user-data cloud-config script",
    "Create a backup of a VM",
    "Restore a VM from a backup",
    "Perform a live migration of a VM (requires multi-host)",
    "Use the serial/VNC console of a VM",
    "Import the SSH key and access a VM using the key (Linux only)",
    "Multi-cluster management, multi-tenancy for VM management, multi-disk support",
    "Integration with Rancher. Provision a RKE2 Kubernetes cluster on top of a SUSE Virtualization cluster"
  ],
  pt: [
    "Provisionar hosts através do instalador ISO",
    "Opcional. Provisionar hosts através do boot PXE",
    "Registrar uma imagem para uso em VMs",
    "Criar uma Storage Class e Volume",
    "Criar uma rede VLAN no SUSE Virtualization",
    "Criar uma VM",
    "Configurar um destino de backup",
    "Configurar um script cloud-config de dados do usuário",
    "Criar um backup de uma VM",
    "Restaurar uma VM de um backup",
    "Realizar migração ao vivo de uma VM (requer multi-host)",
    "Usar o console serial/VNC de uma VM",
    "Importar a chave SSH e acessar uma VM usando a chave (apenas Linux)",
    "Gerenciamento multi-cluster, multi-tenancy e suporte multi-disco",
    "Integração com Rancher. Provisionar um cluster RKE2 Kubernetes sobre o SUSE Virtualization"
  ],
  es: [
    "Provisionar hosts mediante el instalador ISO",
    "Opcional. Provisionar hosts mediante arranque PXE",
    "Registrar una imagen para usar en máquinas virtuales",
    "Crear una Storage Class y un volumen",
    "Crear una red VLAN en SUSE Virtualization",
    "Crear una VM",
    "Configurar un destino de respaldo",
    "Configurar un script cloud-config de datos de usuario",
    "Crear un respaldo de una VM",
    "Restaurar una VM desde un respaldo",
    "Realizar una migración en vivo de una VM (requiere multi-host)",
    "Usar la consola serial/VNC de una VM",
    "Importar la clave SSH e acceder a una VM usando la clave (solo Linux)",
    "Gestión multi-cluster, multi-tenancy y soporte multi-disco",
    "Integración con Rancher. Provisionar un clúster RKE2 Kubernetes sobre SUSE Virtualization"
  ]
};

export const TEST_CASES_LOCALIZED: Record<Language, Record<string, { steps: string, expected: string }>> = {
  en: {
    "Provision hosts through the ISO installer": {
      steps: "Boot via ISO, static network config, hostname and VIP.",
      expected: "Node accessible via local console and Web HTTPS interface after reboot."
    },
    "Register an image to use for VMs": {
      steps: ".qcow2 file upload or Cloud image URL download.",
      expected: "Image appears with 'Active' status ready for use."
    }
  },
  pt: {
    "Provisionar hosts através do instalador ISO": {
      steps: "Boot via ISO, configuração de rede estática, hostname e VIP.",
      expected: "Nó acessível via console local e interface Web HTTPS após reboot."
    },
    "Registrar uma imagem para uso em VMs": {
      steps: "Upload de arquivo .qcow2 ou download via URL de imagem Cloud.",
      expected: "Imagem aparece com status 'Active' pronta para uso."
    }
  },
  es: {
    "Provisionar hosts mediante el instalador ISO": {
      steps: "Arranque vía ISO, configuración de red estática, nombre de host y VIP.",
      expected: "Nodo accesible vía consola local e interfaz Web HTTPS tras el reinicio."
    },
    "Registrar una imagen para usar en máquinas virtuales": {
      steps: "Carga de archivo .qcow2 o descarga de URL de imagen Cloud.",
      expected: "La imagen aparece con estado 'Active' lista para su uso."
    }
  }
};

export const SHELL_TOOLBOX_LOCALIZED: Record<Language, any[]> = {
  en: [
    {
        category: "Benchmarking (Etcd Performance)",
        items: [{ label: "Check etcd write latency", desc: "Crucial for stability. Fsync latency > 10ms causes cluster failures." }]
    }
  ],
  pt: [
    {
        category: "Benchmarking (Performance do Etcd)",
        items: [{ label: "Checar latência de escrita do etcd", desc: "Crucial para estabilidade. Latência de fsync > 10ms causa falhas no cluster." }]
    }
  ],
  es: [
    {
        category: "Benchmarking (Rendimiento de Etcd)",
        items: [{ label: "Comprobar latencia de escritura de etcd", desc: "Crucial para la estabilidad. Una latencia de fsync > 10ms provoca fallos en el clúster." }]
    }
  ]
};

// Fixed Missing translations for pt and es to satisfy Record<Language, Record<string, any>>
export const GOAL_PROCEDURES_LOCALIZED: Record<Language, Record<string, any>> = {
  en: {
    "Provision hosts through the ISO installer": {
      steps: [
        "Prepare a bootable USB drive with Harvester v1.7 ISO.",
        "Boot from UEFI. Select 'Create a new Harvester cluster' for Node 1.",
        "Configure Hostname, Static IP, Gateway, and most importantly, the Cluster VIP.",
        "Define the 'Cluster Token' (used for node admission).",
        "Wait for reboot and final Dashboard URL prompt."
      ],
      tip: "If the installer hangs at 'Loading initrd', verify that UEFI is enabled and Secure Boot is disabled.",
      dependencies: ["VT-x/AMD-V active", "8GB USB drive", "Wired connection"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/install/iso-install/",
      icon: Play,
      resourceLinks: [{ label: "Download Harvester ISO", url: "https://harvesterhci.io/releases" }]
    },
    "Optional. Provision hosts through PXE boot": {
      steps: [
        "Setup an iPXE or HTTP server reachable by the cluster nodes.",
        "Prepare the configuration file (YAML format) containing cluster and network settings.",
        "Configure the nodes to boot via PXE in the BIOS/UEFI settings.",
        "Provide the kernel, initrd, and rootfs images via the PXE server.",
        "Monitor the automated installation progress."
      ],
      tip: "Use the 'Matchbox' integration if you need a scalable way to manage multiple cluster configurations via PXE.",
      dependencies: ["HTTP/TFTP Server", "DHCP Option 67 configured", "Harvester config.yaml"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/install/pxe-boot-install/",
      icon: Network,
      resourceLinks: [{ label: "Matchbox Integration Guide", url: "https://docs.harvesterhci.io/v1.7/install/pxe-boot-install/#matchbox-example" }]
    },
    "Register an image to use for VMs": {
      steps: [
        "Login to Dashboard -> Images -> Create.",
        "Option 1: 'Download from URL' (Recommended). Use a raw/qcow2 URL.",
        "Option 2: 'Upload' from local workstation.",
        "Wait for status to transition from 'Downloading' to 'Active'."
      ],
      tip: "Cloud-optimized images (NoCloud/Cloud-Init) are preferred for automatic credential injection.",
      dependencies: ["Internet access for URL download", "qcow2/img/iso support"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/create-vm/#images",
      icon: ImageIcon,
      resourceLinks: [{ label: "openSUSE Cloud Images", url: "https://download.opensuse.org/repositories/Cloud:/Images:/Leap_15.5/images/" }]
    },
    "Create a Storage Class and Volume": {
      steps: [
        "Harvester provides a default 'longhorn' StorageClass.",
        "To create a new one: Settings -> StorageClass -> Create.",
        "Set 'Number of Replicas' to 3 (Required for HA).",
        "Create a Volume: Volumes -> Create. Select size and the StorageClass.",
        "Attach the volume to a VM under 'Disks' tab."
      ],
      tip: "Avoid reducing replica count to 1 in production, as node failure will cause permanent data loss.",
      dependencies: ["Healthy SDS nodes", "Available disk space"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/storage/storage-class/",
      icon: Database,
      resourceLinks: [{ label: "Longhorn Best Practices", url: "https://longhorn.io/docs/1.7.0/best-practices/" }]
    },
    "Create a VLAN network in SUSE Virtualization": {
      steps: [
        "Step 1: Create ClusterNetwork. Settings -> ClusterNetwork -> Create (e.g. 'vlan-network').",
        "Step 2: Create NetworkConfig. Settings -> NetworkConfig -> Create. Select the ClusterNetwork and bind to physical NICs (e.g. eth1).",
        "Step 3: Create VM Network. Networks -> Create. Select type 'L2Vlan', provide VLAN ID (e.g. 100).",
        "Assign this network to a VM during creation."
      ],
      tip: "The physical switch port MUST be configured as a TRUNK port if using VLAN IDs other than 0.",
      dependencies: ["802.1Q switch support", "Physical NIC availability"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/networking/harvester-network/",
      icon: Network,
      resourceLinks: [{ label: "Networking Troubleshooting", url: "https://docs.harvesterhci.io/v1.7/troubleshooting/networking/" }]
    },
    "Create a VM": {
      steps: [
        "Virtual Machines -> Create.",
        "Basics: Provide Name, CPU cores, and Memory.",
        "Volumes: Select an Image for the root disk.",
        "Networks: Choose Management Network or a previously created VLAN.",
        "Advanced: Paste SSH Public Key for passwordless access."
      ],
      tip: "Use the 'VirtIO' driver for all disks and network interfaces to ensure high performance.",
      dependencies: ["Active Image", "Defined Network"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/create-vm/",
      icon: Monitor,
      resourceLinks: []
    },
    "Configure a backup target": {
      steps: [
        "Go to Settings -> Backup Target.",
        "Choose 'S3' or 'NFS'.",
        "For NFS: Provide the server IP and the exported path (e.g., 192.168.1.50:/backups).",
        "For S3: Provide Endpoint, Bucket Name, and Access/Secret Keys.",
        "Click Save and ensure the status is 'Ready'."
      ],
      tip: "NFS version 4 is recommended for better reliability and performance with Longhorn.",
      dependencies: ["External NFS/S3 storage reachable by cluster nodes"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/storage/backup-target/",
      icon: Save,
      resourceLinks: []
    },
    "Configure a user-data cloud-config script": {
      steps: [
        "Go to Cloud Config Templates -> Create.",
        "Enter the YAML content starting with '#cloud-config'.",
        "Include directives like 'users', 'ssh_authorized_keys', and 'runcmd'.",
        "Save the template to reuse it across multiple VMs.",
        "Select the template during VM creation in the 'Advanced' tab."
      ],
      tip: "Always use 'NoCloud' data source in Harvester for most Linux cloud images.",
      dependencies: ["YAML knowledge", "Cloud-Init compatible guest image"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/create-vm/#advanced",
      icon: FileCode,
      resourceLinks: [{ label: "Cloud-Init Official Docs", url: "https://cloudinit.readthedocs.io/" }]
    },
    "Create a backup of a VM": {
      steps: [
        "Ensure a Backup Target is configured and healthy.",
        "Go to Virtual Machines. Find your VM and click '...'.",
        "Select 'Take Backup'.",
        "Enter a name for the backup or use the auto-generated one.",
        "Monitor progress in the 'Backups' menu until state is 'Ready'."
      ],
      tip: "Taking a backup is different from a snapshot. Backups are stored externally on the Backup Target, while snapshots remain local.",
      dependencies: ["Backup Target configured", "VM Volume consistency"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/backup-restore/#taking-a-backup",
      icon: Database,
      resourceLinks: []
    },
    "Restore a VM from a backup": {
      steps: [
        "Go to the 'Backups' menu and select a healthy backup.",
        "Click '...' and select 'Restore to a new VM'.",
        "Define the new VM name and resource specifications if needed.",
        "Wait for the restore process to complete and the new VM to start.",
        "Verify data integrity within the guest OS."
      ],
      tip: "You can also restore 'in-place' by clicking 'Restore' directly on an existing VM, which will revert its volumes to the backup state.",
      dependencies: ["Healthy Backup", "Sufficient cluster resources"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/backup-restore/#restoring-from-a-backup",
      icon: RefreshCw,
      resourceLinks: []
    },
    "Perform a live migration of a VM (requires multi-host)": {
      steps: [
        "Ensure the VM is running and the cluster has at least 2 healthy nodes.",
        "Go to Virtual Machines. Click the '...' menu on the VM and select 'Migrate'.",
        "Optionally select a target node or let the system choose automatically.",
        "Monitor the migration progress until the 'Running' state is restored."
      ],
      tip: "Live migration requires shared storage (Longhorn) and will fail if the VM has local passthrough hardware (USB/PCI).",
      dependencies: ["Multi-node cluster", "Distributed Storage", "No hardware passthrough"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/live-migration/",
      icon: RefreshCw,
      resourceLinks: []
    },
    "Use the serial/VNC console of a VM": {
      steps: [
        "Open Virtual Machines dashboard.",
        "Click on the VM name to open details.",
        "Click 'Console' button on the top right.",
        "Switch between 'VNC' (for GUI) and 'Serial' (for terminal) tabs.",
        "Verify terminal responsiveness and OS login prompt."
      ],
      tip: "Enable the serial console in your guest Linux kernel by adding 'console=ttyS0' to the boot params if it's not working.",
      dependencies: ["Web browser access to VIP"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/create-vm/#access-vm-via-console",
      icon: Terminal,
      resourceLinks: []
    },
    "Import the SSH key and access a VM using the key (Linux only)": {
      steps: [
        "Import SSH Key: Settings -> SSH Keys -> Create.",
        "Select this key during VM creation in the 'Basics' or 'Advanced' tab.",
        "Wait for VM to reach 'Running' state.",
        "From your workstation terminal: ssh [user]@[VM_IP].",
        "Verify access without password prompts."
      ],
      tip: "If access fails, ensure the security group or firewall allows port 22 and that the image has cloud-init installed.",
      dependencies: ["Public Key", "Network connectivity to VM"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/create-vm/#ssh-key",
      icon: Key,
      resourceLinks: []
    },
    "Multi-cluster management, multi-tenancy for VM management, multi-disk support": {
      steps: [
        "Multi-disk: During VM creation or Edit, go to 'Disks' -> 'Add Disk' to create secondary volumes.",
        "Multi-tenancy: Use Projects/Namespaces to isolate workloads and users (integrated with Rancher).",
        "Multi-cluster: Import Harvester into Rancher to manage multiple Harvester clusters from a single pane.",
        "Verify that resources are allocated and billed (if applicable) correctly per project."
      ],
      tip: "Add secondary disks for heavy database workloads to separate log files from data files for better performance.",
      dependencies: ["Rancher integration for multi-cluster", "Available SDS storage"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/create-vm/#disks",
      icon: HardDrive,
      resourceLinks: []
    },
    "Integration with Rancher. Provision a RKE2 Kubernetes cluster on top of a SUSE Virtualization cluster": {
      steps: [
        "Step 1: Enable Harvester in Rancher (Global Settings -> Feature Flags -> Harvester).",
        "Step 2: Import Harvester (Virtualization Management -> Import).",
        "Step 3: Create Cloud Credentials in Rancher for the Harvester cluster.",
        "Step 4: Go to Cluster Management -> Create. Select 'Harvester' as the infrastructure.",
        "Step 5: Define Node Pools (roles, CPU, RAM) and click Create.",
        "Monitor the automated VM creation and RKE2 bootstrap in the Harvester UI."
      ],
      tip: "Ensure the Rancher CA certificate is trusted by Harvester if using private CAs, otherwise the agents won't connect.",
      dependencies: ["Upstream Rancher v2.8+", "Working Harvester VIP", "Network routing between Rancher and Harvester"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/rancher/rancher-integration/",
      icon: Cloud,
      resourceLinks: [{ label: "Rancher Harvester Driver Docs", url: "https://rancher.com/docs/rancher/v2.8/en/cluster-provisioning/hosted-kubernetes-clusters/harvester/" }]
    }
  },
  pt: {
    "Provisionar hosts através do instalador ISO": {
      steps: ["Prepare um pendrive com o Harvester ISO.", "Boot via UEFI. Escolha 'Create a new Harvester cluster'.", "Configure Hostname, IP Estático e o Cluster VIP.", "Defina o Token do Cluster.", "Aguarde o reboot e acesso à URL do Dashboard."],
      tip: "Se o instalador travar em 'Loading initrd', verifique se UEFI está habilitado e Secure Boot desabilitado.",
      dependencies: ["VT-x/AMD-V ativo", "Pen-drive 8GB"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/pt/install/iso-install/",
      icon: Play,
      resourceLinks: []
    },
    "Criar uma VM": {
      steps: ["Vá em Virtual Machines -> Create.", "Insira Nome, Cores e Memória.", "Selecione uma imagem para o disco.", "Escolha a rede e adicione chaves SSH."],
      tip: "Use drivers VirtIO para máxima performance.",
      dependencies: ["Imagem Ativa", "Rede Configurada"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/pt/vm/create-vm/",
      icon: Monitor,
      resourceLinks: []
    }
    // Note: Other pt keys will fallback to default if not defined here
  },
  es: {
    "Provisionar hosts mediante el instalador ISO": {
      steps: ["Prepare un USB con Harvester ISO.", "Arranque desde UEFI. Elija 'Create a new Harvester cluster'.", "Configure Hostname, IP estática y el Cluster VIP.", "Defina el Token del Cluster.", "Espere al reinicio y acceda al Dashboard."],
      tip: "Si el instalador se cuelga en 'Loading initrd', verifique UEFI y Secure Boot.",
      dependencies: ["VT-x/AMD-V activo", "USB 8GB"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/es/install/iso-install/",
      icon: Play,
      resourceLinks: []
    },
    "Crear una VM": {
      steps: ["Vaya a Virtual Machines -> Create.", "Ingrese Nombre, Cores y Memoria.", "Seleccione una imagen de disco.", "Elija la red y agregue llaves SSH."],
      tip: "Use controladores VirtIO para mejor rendimiento.",
      dependencies: ["Imagen Activa", "Red Configurada"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/es/vm/create-vm/",
      icon: Monitor,
      resourceLinks: []
    }
    // Note: Other es keys will fallback to default if not defined here
  }
};
