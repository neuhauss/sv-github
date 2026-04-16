
import { Language } from './types';
import { 
  Play, 
  Plus,
  Shuffle,
  Image as ImageIcon, 
  Database, 
  Network, 
  Globe,
  Activity,
  Monitor, 
  RefreshCw, 
  Cloud, 
  HardDrive, 
  Cpu,
  Target,
  Layers,
  Lock,
  Settings,
  Wifi,
  Zap,
  Search,
  ShieldAlert,
  Key, 
  Terminal, 
  ShieldCheck, 
  Save, 
  Server, 
  FileCode, 
  CheckCircle2,
  Bug
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
      newProject: "New Planning",
      notSpecified: "Not Specified"
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
      report: "Report",
      guide: "Guide"
    },
    pocDetails: {
      title: "Project & POC Goals",
      subtitle: "Define the base parameters and technical discovery.",
      tabs: {
        basic: "Basic Information",
        discovery: "Technical Discovery"
      },
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
    discovery: {
      title: "VMware Discovery Questionnaire",
      subtitle: "Gather deep insights into current infrastructure to ensure SUSE compatibility.",
      categories: {
        general: "General Discovery",
        human: "Human Knowledge",
        compute: "Compute Layer",
        storage: "Storage",
        network: "Network",
        backup: "Backup",
        dr: "Disaster Recovery",
        automation: "Automation & Ops",
        observability: "Observability"
      },
      questions: {
        vcfSub: "Subscription type",
        vcfRunning: "Are you running VCF components?",
        deployedByVcf: "Deployment method",
        vcfVersion: "VCF version",
        vvfStorage: "Primary storage type",
        vsanOption: "vSAN storage option",
        stretchedCluster: "Using stretched cluster?",
        tanzuUsed: "Using Tanzu?",
        workloads: "Current Workloads",
        operators: "Active operators",
        responsibilities: "Team structure",
        skills: "Kubernetes skills",
        serverVendors: "Server vendors",
        generation: "Server generation",
        cpuArch: "CPU Architecture",
        gpu: "GPU present?",
        localStorage: "Local storage present?",
        vcenterIntegrations: "vCenter integrations",
        criticalWorkloads: "Performance critical workloads?",
        overcommitRatio: "vCPU overcommit ratio",
        storageTransports: "Storage transports",
        storagePlatforms: "Storage platforms",
        storageProvisioning: "Storage provisioning method",
        storageAutomation: "Storage automation tools",
        storageManagement: "Storage managed from",
        storageTiers: "Storage policies/tiers?",
        networkVendors: "Network vendors",
        networkFunctions: "Required network functions",
        nsxUsage: "NSX usage profile",
        networkPolicy: "Policy management",
        backupSolution: "Backup solution",
        backupCoverage: "VM backup coverage",
        backupIntegration: "vCenter integration",
        backupK8s: "Kubernetes protection",
        drConcept: "DR Concept",
        drHa: "Multi-DC HA Architecture?",
        drSolution: "DR Solution",
        drTested: "DR tested regularly?",
        drApproach: "DR primary approach",
        drRpo: "RPO/RTO defined?",
        provMethod: "Provisioning method",
        autoTools: "Automation tools",
        traceable: "Traceable Changes?",
        monTools: "Monitoring tools",
        logTools: "Logging tools",
        obsStrategy: "Observability strategy"
      },
      options: {
        yes: "Yes",
        no: "No",
        partially: "Partially",
        none: "None / Not specified",
        vcf: "VCF (Cloud Foundation)",
        vvf: "VVF (vSphere Foundation)",
        vcf_deployed: "Deployed as VCF",
        vcf_standalone: "Standalone components",
        vsan: "vSAN",
        external: "External storage",
        legacy: "Legacy (5+ years)",
        mixed: "Mixed generations",
        recent: "Recent / Homogeneous",
        manual: "Manual (LUNs, zoning)",
        semi: "Semi-automated (Scripts)",
        policy: "Policy-based",
        iac: "IaC (Terraform/Ansible)",
        centralized: "Centralized infra team",
        split: "Split (Infra/Net/Sec)",
        shared: "Shared (DevOps/Cloud)",
        basic_k8s: "Basic theoretical",
        admin_k8s: "Currently administrating",
        none_k8s: "No K8s experience"
      }
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
    installation: {
      title: "Installation Checklist",
      subtitle: "Track the physical deployment steps.",
      progress: "Installation Progress",
      pitfallLabel: "Common Pitfall",
      nextStep: "Next Up",
      nextStepDesc: "Once hardware is provisioned, proceed to Cluster Configuration.",
      groups: [
        {
          title: "Hardware Preparation",
          pitfall: "Ensure virtualization extensions (VT-x/AMD-V) are enabled in BIOS.",
          steps: [
            { id: 'bios-virt', label: "Enable Virtualization in BIOS", description: "Enable VT-x/AMD-V and IOMMU for PCI passthrough." },
            { id: 'nic-prep', label: "Cable 10GbE Interfaces", description: "Storage replication requires 10G throughput for stability." }
          ]
        },
        {
          title: "ISO Deployment",
          pitfall: "Use DD mode if writing the ISO to a USB drive using Rufus.",
          steps: [
            { id: 'boot-iso', label: "Boot from ISO", description: "Select the first node to 'Create a new cluster'." },
            { id: 'vip-config', label: "Configure VIP", description: "Assign the static cluster Virtual IP." }
          ]
        }
      ]
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
        advanced: "Advanced Ops",
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
        cpu: "Minimum 8 Physical Cores (x86_64). Ensure VT-x (Intel) or AMD-V (AMD) and AVX are enabled in BIOS.",
        ram: "32GB RAM minimum for management. Enterprise production recommends 64GB+ per node.",
        network: "10Gbps fabric for Storage/Longhorn replication is mandatory for performance.",
        mtu: "MTU 9000 (Jumbo Frames) must be configured on all physical switches.",
        bios: "Set SATA/Disk controllers to HBA/JBOD mode. Software RAID is NOT supported.",
        internet: "Outbound access to registry.suse.com and docker.io is required unless using Air-Gap."
      },
      install: {
        title: "Step-by-Step ISO Installation",
        node1: "1st Node (Seed): Select 'Create a new Harvester cluster'. Define a persistent Cluster VIP.",
        node2: "Subsequent Nodes: Select 'Join an existing Harvester cluster'. You will need the VIP and Token.",
        reboot: "After the installer finishes, remove the media and reboot.",
        tip: "Wait for the login prompt on the physical console. Use the VIP to access the Web UI.",
        consoleTitle: "Console Output Example",
        consoleDesc: "What you see on the physical monitor after successful boot.",
        tuiTitle: "TUI Configuration Reference",
        tuiDesc: "Key parameters to configure during the ISO wizard."
      },
      config: {
        title: "Access & Initial Setup",
        url: "Navigate to https://[VIP] to access the Dashboard.",
        password: "Set the admin password. Record it securely.",
        settings: "Network: Create a 'Network Config' to bind physical NICs to the bridge.",
        backup: "Configure an S3 or NFS Backup Target immediately."
      },
      storage: {
        title: "Longhorn SDS Optimization",
        replica: "Default replica count is 3. Ensures data availability even if one node is offline.",
        bench: "Disk latency (Fsync) must be below 10ms to avoid etcd panics.",
        ssd: "Enterprise NVMe or SSDs are mandatory for data partitions.",
        expansion: "Add physical disks and edit node storage in the UI to expand the pool."
      },
      troubleshooting: {
        title: "Common Fixes & Diagnostics",
        initrd: "Stalled at 'Loading initrd'? Check BIOS for UEFI vs Legacy mismatch.",
        vip: "VIP unreachable? Ensure the IP is not in use elsewhere.",
        etcd: "Cluster shows 'NotReady'? Check if disk space is full on /var/lib/harvester."
      },
      rancher: {
        title: "Rancher Manager Integration",
        subtitle: "Rancher acts as the centralized control plane for multi-cluster management.",
        step1: "Requirements & Flags",
        step1Desc: "Enable the 'harvester' feature flag in Rancher Global Settings.",
        step2: "Import Cluster",
        step2Desc: "Import the Harvester cluster into Rancher via the Virtualization Management menu.",
        step3: "Cloud Credentials",
        step3Desc: "Crie Credenciais de Nuvem Harvester no Rancher para provisionamento downstream.",
        step4: "Provisioning RKE2",
        step4Desc: "Provision RKE2 clusters directly on top of Harvester nodes via Rancher UI.",
        trouble: "Verify DNS resolution and port 443 connectivity between Rancher and Harvester VIP."
      },
      advanced: {
        title: "Advanced Operations & Air-Gap",
        subtitle: "Enterprise features for restricted environments and multi-user governance.",
        airgap: "Air-Gapped Setup",
        airgapDesc: "Harvester ISO is self-contained. Configure HTTP Proxy in 'Advanced Settings' for external image/backup access.",
        tenancy: "Multi-Tenancy",
        tenancyDesc: "Define 'Project Owner' and 'Read-Only' roles in Rancher to delegate VM management per department.",
        rke2: "RKE2 Provisioning",
        rke2Desc: "Use Harvester Cloud Credentials to deploy downstream Kubernetes clusters with native CSI/CCM support."
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
      discoverySection: "Technical Discovery Assessment",
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
      newProject: "Novo Planejamento",
      notSpecified: "Não Especificado"
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
      report: "Relatório",
      guide: "Guia"
    },
    pocDetails: {
      title: "Projeto & Objetivos da POC",
      subtitle: "Defina os parâmetros base e o discovery técnico.",
      tabs: {
        basic: "Informações Básicas",
        discovery: "Technical Discovery"
      },
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
    discovery: {
      title: "Questionário de Discovery VMware",
      subtitle: "Colete informações profundas sobre a infraestrutura atual para garantir compatibilidade.",
      categories: {
        general: "Discovery Geral",
        human: "Conhecimento Humano",
        compute: "Camada de Computação",
        storage: "Armazenamento",
        network: "Rede",
        backup: "Backup",
        dr: "Disaster Recovery",
        automation: "Automação & Ops",
        observability: "Observabilidade"
      },
      questions: {
        vcfSub: "Tipo de assinatura",
        vcfRunning: "Roda componentes VCF?",
        deployedByVcf: "Método de implantação",
        vcfVersion: "Versão do VCF",
        vvfStorage: "Tipo de storage primário",
        vsanOption: "Opção de storage vSAN",
        stretchedCluster: "Usa cluster estendido (stretched)?",
        tanzuUsed: "Usa Tanzu?",
        workloads: "Workloads atuais",
        operators: "Operadores ativos",
        responsibilities: "Estrutura do time",
        skills: "Conhecimento Kubernetes",
        serverVendors: "Fabricantes de servidor",
        generation: "Geração dos servidores",
        cpuArch: "Arquitectura de CPU",
        gpu: "Possui GPU?",
        localStorage: "Possui storage local?",
        vcenterIntegrations: "Integrações vCenter",
        criticalWorkloads: "Workloads críticos de performance?",
        overcommitRatio: "Taxa de overcommit vCPU",
        storageTransports: "Transportes de storage",
        storagePlatforms: "Plataformas de storage",
        storageProvisioning: "Método de provisionamento",
        storageAutomation: "Ferramentas de automação",
        storageManagement: "Storage gerenciado via",
        storageTiers: "Políticas/Tiers de storage?",
        networkVendors: "Fabricantes de rede",
        networkFunctions: "Funções de rede necessárias",
        nsxUsage: "Perfil de uso do NSX",
        networkPolicy: "Gestão de políticas",
        backupSolution: "Solução de backup",
        backupCoverage: "Cobertura de backup VMs",
        backupIntegration: "Integração vCenter",
        backupK8s: "Proteção Kubernetes",
        drConcept: "Conceito de DR",
        drHa: "Arquitetura HA Multi-DC?",
        drSolution: "Solução de DR",
        drTested: "DR testado regularmente?",
        drApproach: "Abordagem primária de DR",
        drRpo: "RPO/RTO definidos?",
        provMethod: "Método de provisionamento",
        autoTools: "Ferramentas de automação",
        traceable: "Mudanças rastreáveis?",
        monTools: "Ferramentas de monitoramento",
        logTools: "Ferramentas de logging",
        obsStrategy: "Estratégia de observabilidade"
      },
      options: {
        yes: "Sim",
        no: "Não",
        partially: "Parcialmente",
        none: "Nenhum / Não especificado",
        vcf: "VCF (Cloud Foundation)",
        vvf: "VVF (vSphere Foundation)",
        vcf_deployed: "Implantado como VCF",
        vcf_standalone: "Componentes isolados",
        vsan: "vSAN",
        external: "Storage Externo",
        legacy: "Legado (5+ anos)",
        mixed: "Gerações mistas",
        recent: "Recente / Homogêneo",
        manual: "Manual (LUNs, zoning)",
        semi: "Semi-automatizado (Scripts)",
        policy: "Baseado em políticas",
        iac: "IaC (Terraform/Ansible)",
        centralized: "Time de infra centralizado",
        split: "Dividido (Infra/Rede/Seg)",
        shared: "Compartilhado (DevOps/Cloud)",
        basic_k8s: "Conhecimento teórico",
        admin_k8s: "Administra atualmente",
        none_k8s: "Sem experiência K8s"
      }
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
    installation: {
      title: "Checklist de Instalação",
      subtitle: "Acompanhe as etapas de implantação física.",
      progress: "Progresso da Instalação",
      pitfallLabel: "Erro Comum",
      nextStep: "Próxima Etapa",
      nextStepDesc: "Após o provisionamento do hardware, prossiga para a Configuração do Cluster.",
      groups: [
        {
          title: "Preparação de Hardware",
          pitfall: "Garanta que as extensões de virtualização (VT-x/AMD-V) estejam ativas no BIOS.",
          steps: [
            { id: 'bios-virt', label: "Ativar Virtualização no BIOS", description: "Habilite VT-x/AMD-V e IOMMU para passthrough PCI." },
            { id: 'nic-prep', label: "Cabeamento interfaces 10GbE", description: "Replicação de storage exige 10G de banda para estabilidade." }
          ]
        },
        {
          title: "Implantação via ISO",
          pitfall: "Use o modo DD ao gravar a ISO no pendrive via Rufus.",
          steps: [
            { id: 'boot-iso', label: "Boot via ISO", description: "Selecione o primeiro nó para 'Create a new cluster'." },
            { id: 'vip-config', label: "Configurar VIP", description: "Atribua o IP Virtual estático do cluster." }
          ]
        }
      ]
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
        advanced: "Operações Avançadas",
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
        cpu: "Mínimo 8 Cores Físicos (x86_64). Garanta que VT-x (Intel) ou AMD-V (AMD) e AVX estejam ativos no BIOS.",
        ram: "Mínimo 32GB de RAM para gerência. Ambientes de produção recomendam 64GB+ por nó.",
        network: "Fabric de 10Gbps dedicado para replicação de Storage/Longhorn em rede dedicada é obrigatório.",
        mtu: "MTU 9000 (Jumbo Frames) deve ser configurado em todos os switches físicos.",
        bios: "Configure controladoras SATA/Disk em modo HBA/JBOD. RAID por software NÃO é suportado.",
        internet: "Acesso externo para registry.suse.com e docker.io é necessário, exceto em Air-Gap."
      },
      install: {
        title: "Passo-a-passo Instalação ISO",
        node1: "1º Nó (Seed): Escolha 'Create a new Harvester cluster'. Defina um VIP de Cluster persistente.",
        node2: "Nós seguintes: Escolha 'Join an existing cluster'. Você precisará do VIP e do Token.",
        reboot: "Após o término do instalador, remova a mídia e reinicie.",
        tip: "Aguarde o prompt de login no console físico. Use o VIP para acessar a interface Web.",
        consoleTitle: "Exemplo de Saída do Console",
        consoleDesc: "O que você vê no monitor físico após o boot bem-sucedido.",
        tuiTitle: "Referência de Configuração TUI",
        tuiDesc: "Parâmetros principais para configurar durante o assistente ISO."
      },
      config: {
        title: "Acesso e Configuração Inicial",
        url: "Navegue para https://[VIP] para acessar o Dashboard.",
        password: "Defina a senha de admin. Guarde-a com segurança.",
        settings: "Rede: Crie um 'Network Config' para vincular NICs físicas à bridge.",
        backup: "Configure um destino de Backup S3 ou NFS imediatamente."
      },
      storage: {
        title: "Otimização Longhorn SDS",
        replica: "O número padrão de réplicas é 3. Garante disponibilidade mesmo se um nó falhar.",
        bench: "Latência de disco (Fsync) deve ser menor que 10ms para evitar pânico no etcd.",
        ssd: "SSDs ou NVMe corporativos são mandatórios para partições de dados.",
        expansion: "Adicione discos físicos e edite o armazenamento do nó na UI para expandir o pool."
      },
      troubleshooting: {
        title: "Correções Comuns",
        initrd: "Travado em 'Loading initrd'? Verifique UEFI/Legacy no BIOS.",
        vip: "VIP inacessível? Verifique se o IP já está em uso em outro lugar.",
        etcd: "Cluster em 'NotReady'? Cheque se o espaço em disco está cheio em /var/lib/harvester."
      },
      rancher: {
        title: "Integração com Rancher Manager",
        subtitle: "O Rancher atua como plano de controle centralizado para gestão multicluster.",
        step1: "Requisitos & Flags",
        step1Desc: "Ative a flag de recurso 'harvester' nas Configurações Globais do Rancher.",
        step2: "Importar Cluster",
        step2Desc: "Importe o cluster Harvester para o Rancher via menu de Virtualization Management.",
        step3: "Cloud Credentials",
        step3Desc: "Crie Credenciais de Nuvem Harvester no Rancher para provisionamento downstream.",
        step4: "Provisionamento RKE2",
        step4Desc: "Provisione clusters RKE2 diretamente sobre os nós Harvester via UI do Rancher.",
        trouble: "Verifique resolução DNS e conectividade na porta 443 entre Rancher e VIP do Harvester."
      },
      advanced: {
        title: "Operações Avançadas & Air-Gap",
        subtitle: "Recursos corporativos para ambientes restritos e governança multi-usuário.",
        airgap: "Configuração Air-Gap",
        airgapDesc: "A ISO do Harvester é auto-contida. Configure o Proxy HTTP em 'Advanced Settings' para acesso a imagens/backups externos.",
        tenancy: "Multi-Tenancy",
        tenancyDesc: "Defina papéis de 'Project Owner' e 'Read-Only' no Rancher para delegar gestão de VMs por departamento.",
        rke2: "Provisionamento RKE2",
        rke2Desc: "Use Credenciais de Nuvem Harvester para implantar clusters Kubernetes downstream com suporte nativo a CSI/CCM."
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
        criteria: "Critério de Sucesso",
        procedure: "Procedimento Técnico",
        expected: "Resultado Esperado",
        validate: "Validar"
      }
    },
    summary: {
      execSummary: "Resumo Executivo da Infraestrutura Hyper-Converged (HCI) v1.7",
      stakeholders: "Stakeholders & Cronograma",
      techDetails: "Detalhes de Configuração Técnica",
      topology: "Diagrama de Topologia Planejada",
      acceptance: "Formalização e Aceite do Plano de POC",
      discoverySection: "Avaliação do Technical Discovery",
      authorized: "Representante Autorizado",
      generatedBy: "Documento gerado eletronicamente via SUSE Virtualization Enterprise Planner.",
      aiTitle: "Exportar Contexto para IA",
      aiDesc: "Copie este prompt para o ChatGPT ou Claude.",
      aiPromptHeader: "Você é um Arquiteto de Soluções Sênior auxiliando em uma Prova de Conceito (POC) do SUSE Virtualization."
    }
  },
  es: {
    common: {
      next: "Continuar",
      back: "Volver",
      finish: "Finalizar",
      step: "Paso",
      of: "de",
      home: "Inicio",
      planningMode: "Modo Planificación",
      enterprisePlanner: "Planificador Enterprise Harvester v1.7",
      required: "Obligatorio",
      completed: "Completado",
      pending: "Pendiente",
      reference: "Referencia",
      expertTip: "Consejo experto",
      techDependencies: "Dependencias técnicas",
      resourceLinks: "Enlaces de recursos",
      officialDocs: "Documentación oficial",
      copy: "Copiar",
      copied: "¡Copiado!",
      print: "Imprimir Informe / PDF",
      exportJson: "Exportar JSON",
      aiContext: "Contexto de IA",
      newProject: "Nueva planificación",
      notSpecified: "No especificado"
    },
    dashboard: {
      welcome: "Bienvenido a SUSE Virtualization",
      subtitle: "Este asistente le guía a través de la planificación, instalación y validación de su POC.",
      import: "Importar proyecto (JSON)",
      reportTitle: "Generar informe final de POC",
      reportDesc: "Combine la configuración y los resultados de la validación en un informe profesional."
    },
    nav: {
      project: "Proyecto",
      hardware: "Hardware",
      network: "Red",
      topology: "Topología",
      installation: "Instalación",
      automation: "Automatización",
      validation: "Validación",
      tests: "Pruebas",
      report: "Informe",
      guide: "Guía"
    },
    pocDetails: {
      title: "Detalles de la POC",
      subtitle: "Defina los parámetros para la validación.",
      tabs: {
        basic: "Información Básica",
        discovery: "Discovery Técnico"
      },
      projectName: "Nombre del Proyecto / POC",
      projectPlaceholder: "Ej: Migración Datacenter Core v1.7",
      leadTitle: "Líder Técnico SUSE/Socio",
      leadName: "Ingeniero Responsable",
      leadEmail: "Correo Corporativo",
      clientTitle: "Información del Cliente",
      clientOrg: "Organización / Cliente",
      clientContact: "Punto de Contacto",
      clientPhone: "Teléfono",
      scheduleTitle: "Cronograma Previsto",
      startDate: "Fecha de Inicio",
      targetDate: "Meta de Finalización",
      goalsTitle: "Objetivos de la POC",
      goalsSubtitle: "Seleccione los criterios de éxito a validar.",
      selectAll: "Seleccionar Todo",
      clearAll: "Limpiar Selección",
      goalRequired: "Seleccione al menos un objetivo."
    },
    discovery: {
      title: "Cuestionario de Discovery VMware",
      subtitle: "Obtenga información detallada sobre la infraestructura actual para garantizar la compatibilidad con SUSE.",
      categories: {
        general: "Discovery General",
        human: "Conocimiento Humano",
        compute: "Capa de Computación",
        storage: "Almacenamiento",
        network: "Red",
        backup: "Respaldo",
        dr: "Recuperación ante Desastres",
        automation: "Automatización y Ops",
        observability: "Observabilidad"
      },
      questions: {
        vcfSub: "Tipo de suscripción",
        vcfRunning: "¿Ejecuta componentes VCF?",
        deployedByVcf: "Método de despliegue",
        vcfVersion: "Versión de VCF",
        vvfStorage: "Tipo de almacenamiento primario",
        vsanOption: "Opción de almacenamiento vSAN",
        stretchedCluster: "¿Utiliza clúster extendido?",
        tanzuUsed: "¿Utiliza Tanzu?",
        workloads: "Cargas de trabajo actuales",
        operators: "Operadores activos",
        responsibilities: "Estructura del equipo",
        skills: "Conocimientos de Kubernetes",
        serverVendors: "Fabricantes de servidores",
        generation: "Generación de servidores",
        cpuArch: "Arquitectura de CPU",
        gpu: "¿Tiene GPU?",
        localStorage: "¿Tiene almacenamiento local?",
        vcenterIntegrations: "Integraciones vCenter",
        criticalWorkloads: "¿Cargas críticas de rendimiento?",
        overcommitRatio: "Ratio de overcommit vCPU",
        storageTransports: "Transportes de almacenamiento",
        storagePlatforms: "Plataformas de almacenamiento",
        storageProvisioning: "Método de provisión",
        storageAutomation: "Herramientas de automatización",
        storageManagement: "Almacenamiento gestionado desde",
        storageTiers: "¿Políticas/Tiers de almacenamiento?",
        networkVendors: "Fabricantes de red",
        networkFunctions: "Funciones de red requeridas",
        nsxUsage: "Perfil de uso de NSX",
        networkPolicy: "Gestión de políticas",
        backupSolution: "Solución de respaldo",
        backupCoverage: "Cobertura de respaldo VMs",
        backupIntegration: "Integración vCenter",
        backupK8s: "Protección Kubernetes",
        drConcept: "Concepto de DR",
        drHa: "¿Arquitectura HA Multi-DC?",
        drSolution: "Solución de DR",
        drTested: "¿DR probado regularmente?",
        drApproach: "Enfoque primario de DR",
        drRpo: "¿RPO/RTO definidos?",
        provMethod: "Método de provisión",
        autoTools: "Herramientas de automatización",
        traceable: "¿Cambios rastreables?",
        monTools: "Herramientas de monitoreo",
        logTools: "Herramientas de logging",
        obsStrategy: "Estratégia de observabilidade"
      },
      options: {
        yes: "Sí",
        no: "No",
        partially: "Parcialmente",
        none: "Ninguno / No especificado",
        vcf: "VCF (Cloud Foundation)",
        vvf: "VVF (vSphere Foundation)",
        vcf_deployed: "Desplegado como VCF",
        vcf_standalone: "Componentes independientes",
        vsan: "vSAN",
        external: "Almacenamiento Externo",
        legacy: "Legado (5+ anos)",
        mixed: "Generaciones mixtas",
        recent: "Reciente / Homogêneo",
        manual: "Manual (LUNs, zoning)",
        semi: "Semi-automatizado (Scripts)",
        policy: "Basado em políticas",
        iac: "IaC (Terraform/Ansible)",
        centralized: "Equipo de infra centralizado",
        split: "Dividido (Infra/Red/Seg)",
        shared: "Compartido (DevOps/Cloud)",
        basic_k8s: "Conocimiento teórico",
        admin_k8s: "Administra actualmente",
        none_k8s: "Sin experiencia en K8s"
      }
    },
    hardware: {
        title: "Validación de Hardware v1.7",
        profile: "Perfil Enterprise",
        nodes: "Nodos Físicos",
        cores: "Núcleos por Nodo",
        ram: "RAM GB por Nodo",
        gpu: "Aceleración GPU (IA Ready)",
        gpuEnabled: "GPU Habilitada (Pass-through)",
        gpuDisabled: "Deshabilitado",
        storageType: "Tipo de Almacenamiento",
        compatible: "Hardware Compatible v1.7",
        notMet: "Requisitos No Cumplidos"
    },
    network: {
      title: "Red y Conectividad",
      subtitle: "Configure el tejido de red y valide los requisitos de comunicación entre nodos.",
      tabs: {
        topology: "Diseño de Infraestructura",
        addressing: "Parâmetros Globais",
        nodes: "Inventário de IPs",
        connectivity: "Suite de Conectividad"
      },
      labels: {
        vip: "IP Virtual del Clúster (VIP)",
        cidr: "CIDR de Gestión",
        gateway: "Puerta de Enlace",
        vlan: "VLAN ID (Opcional)",
        dns: "Servidores DNS",
        ntp: "Servidores NTP",
        hostname: "Nombre de Host",
        staticIp: "IP Estática",
        nodeCapacity: "Capacidad de Nodos",
        minNodesInfo: "Se requieren mínimo 3 nodos para HA (Alta Disponibilidad)."
      },
      diagnostic: {
        title: "Pruebas de Diagnóstico",
        desc: "Verifique que los puertos críticos y las URL de descarga sean accesibles desde su estación.",
        run: "Ejecutar Diagnóstico",
        testing: "Probando..."
      }
    },
    installation: {
      title: "Lista de Verificación de Instalación",
      subtitle: "Seguimiento de los pasos de despliegue físico.",
      progress: "Progreso de la Instalación",
      pitfallLabel: "Error Común",
      nextStep: "Siguiente Paso",
      nextStepDesc: "Una vez aprovisionado el hardware, proceda a la Configuración del Clúster.",
      groups: [
        {
          title: "Preparación del Hardware",
          pitfall: "Asegúrese de que las extensiones de virtualización (VT-x/AMD-V) estén habilitadas en la BIOS.",
          steps: [
            { id: 'bios-virt', label: "Habilitar Virtualización en BIOS", description: "Habilite VT-x/AMD-V e IOMMU para passthrough PCI." },
            { id: 'nic-prep', label: "Cableado de Interfaces 10GbE", description: "La replicación del almacenamiento requiere 10G para estabilidad." }
          ]
        },
        {
          title: "Despliegue de ISO",
          pitfall: "Utilice el modo DD si graba la ISO en una unidad USB con Rufus.",
          steps: [
            { id: 'boot-iso', label: "Arrancar desde ISO", description: "Seleccione the first node to 'Create a new cluster'." },
            { id: 'vip-config', label: "Configurar VIP", description: "Asigne la IP Virtual estática del clúster." }
          ]
        }
      ]
    },
    installGuide: {
      sections: {
        overview: "Resumen",
        planning: "Planificación",
        install: "Instalación (ISO)",
        config: "Configuración Inicial",
        storage: "Almacenamiento",
        pocGoals: "Procedimientos POC",
        rancher: "Integración con Rancher",
        advanced: "Operaciones Avanzadas",
        troubleshooting: "Resolución de Problemas"
      },
      overview: {
        title: "Documentación Técnica v1.7",
        subtitle: "Esta guía centraliza los procedimientos oficiales para la implementación de SUSE Virtualization (Harvester).",
        hciTitle: "HCI Moderno",
        hciDesc: "Infraestructura hiperconvergente 100% de código abierto basada en KubeVirt e Longhorn.",
        prodTitle: "Listo para Producción",
        prodDesc: "Alta disponibilidad nativa e integración directa con Rancher para gestión multi-clúster."
      },
      planning: {
        title: "Planificación e Infraestructura",
        desc: "La precisión en la planificación evita fallos. Siga estrictamente las especificaciones de Harvester v1.7.",
        cpu: "Mínimo 8 núcleos físicos (x86_64). Active VT-x/AMD-V en BIOS.",
        ram: "Mínimo 32GB RAM. Se recomiendan 64GB+ para producción.",
        network: "Red de 10Gbps mandatoria para replicación de Longhorn.",
        mtu: "MTU 9000 (Jumbo Frames) en todos los switches físicos.",
        bios: "Controladoras de disco en modo HBA/JBOD. RAID por software NO soportado.",
        internet: "Acceso a registry.suse.com y docker.io necesario (excepto Air-Gap)."
      },
      install: {
        title: "Instalación paso a paso",
        node1: "1er Nodo (Seed): Elija 'Crear nuevo clúster'. Defina la VIP del clúster.",
        node2: "Nodos Siguientes: Elija 'Unirse a clúster existente'. Necesitará VIP y Token.",
        reboot: "Tras finalizar la instalación, retire el medio y reinicie.",
        tip: "Espere al prompt en consola. Use la VIP para acceder a la Web UI.",
        consoleTitle: "Ejemplo de Salida de Consola",
        consoleDesc: "Lo que se ve en el monitor físico tras un arranque correcto.",
        tuiTitle: "Referencia de Configuración TUI",
        tuiDesc: "Parámetros clave a configurar durante el asistente ISO."
      },
      config: {
        title: "Access & Initial Setup",
        url: "Navegue a https://[VIP] para el Dashboard.",
        password: "Defina la contraseña de admin y guárdela.",
        settings: "Red: Cree una 'Network Config' para vincular NICs al puente.",
        backup: "Configure un destino de Backup S3 or NFS inmediatamente."
      },
      storage: {
        title: "Optimização Longhorn SDS",
        replica: "Réplicas por defecto: 3. Garantiza disponibilidad si falla un nodo.",
        bench: "Latência de disco (Fsync) inferior a 10ms para evitar pânico no etcd.",
        ssd: "SSDs o NVMe empresariales obligatorios para datos.",
        expansion: "Añada discos físicos en la UI para expandir el pool."
      },
      troubleshooting: {
        title: "Soluciones Comunes",
        initrd: "¿Bloqueado en 'Loading initrd'? Verifique UEFI vs Legacy en BIOS.",
        vip: "¿VIP inaccesible? Verifique que la IP no esté en uso.",
        etcd: "¿Clúster 'NotReady'? Verifique espacio en disco en /var/lib/harvester."
      },
      rancher: {
        title: "Integración con Rancher",
        subtitle: "Rancher como plano de control para gestión multi-clúster.",
        step1: "Requisitos",
        step1Desc: "Active el flag 'harvester' en Rancher Global Settings.",
        step2: "Importar",
        step2Desc: "Importe el clúster Harvester vía Virtualization Management.",
        step3: "Cloud Credentials",
        step3Desc: "Cree credenciales de Harvester en Rancher.",
        step4: "RKE2",
        step4Desc: "Provisione clústeres RKE2 sobre Harvester vía Rancher UI.",
        trouble: "Verifique DNS y puerto 443 entre Rancher e VIP de Harvester."
      },
      advanced: {
        title: "Operaciones Avanzadas y Air-Gap",
        subtitle: "Funciones empresariales para entornos restringidos y gobernanza multiusuario.",
        airgap: "Configuración Air-Gap",
        airgapDesc: "La ISO de Harvester es autónoma. Configure el Proxy HTTP en 'Advanced Settings' para el acceso a imágenes/respaldos externos.",
        tenancy: "Multitenencia",
        tenancyDesc: "Defina roles de 'Project Owner' y 'Read-Only' en Rancher para delegar la gestión de VM por departamento.",
        rke2: "Provisión de RKE2",
        rke2Desc: "Utilice las credenciales de nube de Harvester para desplegar clústeres de Kubernetes con soporte nativo de CSI/CCM."
      }
    },
    shell: {
      title: "Caja de Herramientas",
      subtitle: "Acceda a los nodos vía SSH y use los comandos para diagnóstico.",
      categories: {
        bench: "Benchmarking (Rendimiento de Etcd)",
        storage: "Almacenamiento Longhorn",
        diag: "Diagnóstico Avanzado",
        net: "Red e Conectividad",
        health: "Salud de Nodos",
        rancher_cleanup: "Limpieza de Rancher"
      }
    },
    testPlan: {
      title: "Plan de pruebas",
      subtitle: "Mapeo de resultados.",
      summary: {
        planned: "Total planificado",
        success: "Éxito",
        fail: "Fallos"
      },
      table: {
        criteria: "Criterios",
        procedure: "Procedimiento",
        expected: "Esperado",
        validate: "Validar"
      }
    },
    summary: {
      execSummary: "Resumen ejecutivo de HCI v1.7",
      stakeholders: "Stakeholders y Cronograma",
      techDetails: "Configuración técnica",
      topology: "Diagrama de topologia",
      acceptance: "Formalización y aceptación",
      discoverySection: "Evaluación del Discovery Técnico",
      authorized: "Representante autorizado",
      generatedBy: "Generado por SUSE Virtualization Planner.",
      aiTitle: "Contexto de IA",
      aiDesc: "Copie para ChatGPT.",
      aiPromptHeader: "Usted es un Arquitecto Senior de Soluciones."
    }
  }
};

export const POC_GOALS_LOCALIZED = {
  en: [
    "Installing Harvester from ISO",
    "Adding additional Nodes",
    "Configuring HTTP Proxy",
    "Network card interface binding for mgmt.",
    "Allocate a dedicated storage network",
    "Create a VLAN network for the VM",
    "Verify VLAN configuration across nodes",
    "VM Resource Extensions (CPU, memory, disk)",
    "VM Storage Extensions (Add/Remove/Enlarge)",
    "Testing FIO Longhorn disk performance",
    "VM Resource Quota (CPU Pinning)",
    "VM Live Migration",
    "VM Backup to S3 Minio",
    "Restoring a VM from an S3 backup",
    "Support Container workload",
    "Deploy Rancher Manager",
    "Account Passwords and Lockout Policy",
    "Managing Harvester clusters with Rancher",
    "Define VM behavior during node maintenance",
    "Perform network addition, removal, and failover",
    "Shut down the node to trigger VM failover",
    "Power on the Harvester node and monitor rebuild",
    "Execute node failover with failback",
    "Perform network packet and session analysis",
    "Test VM failover during network failure"
  ],
  pt: [
    "Instalando Harvester via ISO",
    "Adicionando Nós Adicionais",
    "Configurando Proxy HTTP",
    "Vinculação de interface de rede para gerência",
    "Alocar uma rede de armazenamento dedicada",
    "Criar uma rede VLAN para a VM",
    "Verificar configuração de VLAN entre nós",
    "Extensões de recursos de VM (CPU, memória, disco)",
    "Extensões de armazenamento de VM (Adicionar/Remover/Ampliar)",
    "Testando performance de disco FIO Longhorn",
    "Cota de recursos de VM (CPU Pinning)",
    "Migração ao vivo de VM",
    "Backup de VM para S3 Minio",
    "Restaurando uma VM de um backup S3",
    "Suporte a carga de trabalho de contêiner",
    "Implantar Rancher Manager",
    "Senhas de conta e política de bloqueio",
    "Gerenciando clusters Harvester com Rancher",
    "Definir comportamento da VM durante manutenção do nó",
    "Realizar adição, remoção e failover de rede",
    "Desligar o nó para disparar failover da VM",
    "Ligar o nó Harvester e monitorar reconstrução",
    "Executar failover de nó com failback",
    "Realizar análise de pacotes e sessão de rede",
    "Testar failover de VM durante falha de rede"
  ],
  es: [
    "Instalación de Harvester desde ISO",
    "Agregar nodos adicionales",
    "Configuración de proxy HTTP",
    "Vinculación de interfaz de red para administración",
    "Asignar una red de almacenamiento dedicada",
    "Crear una red VLAN para la VM",
    "Verificar la configuración de VLAN entre nodos",
    "Extensiones de recursos de VM (CPU, memoria, disco)",
    "Extensiones de almacenamiento de VM (Agregar/Eliminar/Ampliar)",
    "Prueba de rendimiento de disco FIO Longhorn",
    "Cuota de recursos de VM (CPU Pinning)",
    "Migración en vivo de VM",
    "Respaldo de VM a S3 Minio",
    "Restaurar una VM desde un respaldo S3",
    "Soporte para carga de trabajo de contenedores",
    "Implementar Rancher Manager",
    "Contraseñas de cuenta y política de bloqueo",
    "Gestión de clústeres Harvester con Rancher",
    "Definir el comportamiento de la VM durante el mantenimiento del nodo",
    "Realizar adición, eliminación y failover de red",
    "Apagar el nodo para activar el failover de la VM",
    "Encender el nodo Harvester y monitorear la reconstrucción",
    "Ejecutar failover de nodo con failback",
    "Realizar análisis de paquetes y sesiones de red",
    "Probar el failover de la VM durante una falla de red"
  ]
};

export const TEST_CASES_LOCALIZED: Record<Language, Record<string, { steps: string, expected: string }>> = {
  en: {
    "Installing Harvester from ISO": { steps: "Boot from ISO media on a bare-metal server.", expected: "Harvester console displays management URL and status." },
    "Adding additional Nodes": { steps: "Join subsequent nodes to the cluster using VIP and token.", expected: "Nodes appear as 'Ready' in the dashboard." },
    "Configuring HTTP Proxy": { steps: "Set proxy in Advanced Settings or during installation.", expected: "External images can be downloaded via proxy." },
    "Network card interface binding for mgmt.": { steps: "Configure mgmt-bo bond with specific NICs.", expected: "Management traffic flows through selected interfaces." },
    "Allocate a dedicated storage network": { steps: "Create a separate network config for storage traffic.", expected: "Storage replication is isolated from management traffic." },
    "Create a VLAN network for the VM": { steps: "Create a new L2VlanNetwork in the Networks tab.", expected: "VMs can communicate over the specified VLAN." },
    "Verify VLAN configuration across nodes": { steps: "Test connectivity between VMs on different nodes using the same VLAN.", expected: "Ping/Traffic successful between nodes." },
    "VM Resource Extensions (CPU, memory, disk)": { steps: "Hot-plug or restart VM after increasing CPU/RAM.", expected: "OS recognizes new resources correctly." },
    "VM Storage Extensions (Add/Remove/Enlarge)": { steps: "Modify VM volumes in the Volumes tab.", expected: "Storage changes are reflected in the guest OS." },
    "Testing FIO Longhorn disk performance": { steps: "Run FIO benchmark inside a VM.", expected: "Performance meets the 5000+ IOPS requirement." },
    "VM Resource Quota (CPU Pinning)": { steps: "Configure CPU pinning in VM advanced settings.", expected: "VM processes are locked to specific physical cores." },
    "VM Live Migration": { steps: "Migrate a running VM to another node.", expected: "Zero downtime migration completed successfully." },
    "VM Backup to S3 Minio": { steps: "Configure S3 backup target and trigger backup.", expected: "Backup archive appears in the S3 bucket." },
    "Restoring a VM from an S3 backup": { steps: "Restore a deleted VM from the S3 backup target.", expected: "VM is restored with all data and config intact." },
    "Support Container workload": { steps: "Deploy a containerized app using Harvester's internal K8s.", expected: "Pods are running and accessible." },
    "Deploy Rancher Manager": { steps: "Install Rancher on top of Harvester or as a separate VM.", expected: "Rancher UI is accessible." },
    "Account Passwords and Lockout Policy": { steps: "Configure AD integration and test lockout.", expected: "Users are locked out after failed attempts." },
    "Managing Harvester clusters with Rancher": { steps: "Import Harvester into Rancher Virtualization Management.", expected: "Harvester resources visible in Rancher." },
    "Define VM behavior during node maintenance": { steps: "Put a node in maintenance mode.", expected: "VMs are automatically migrated to other nodes." },
    "Perform network addition, removal, and failover": { steps: "Simulate NIC failure on a bonded interface.", expected: "Network connectivity remains stable." },
    "Shut down the node to trigger VM failover": { steps: "Power off a management or worker node.", expected: "VMs restart on healthy nodes (HA)." },
    "Power on the Harvester node and monitor rebuild": { steps: "Power on a previously failed node.", expected: "Longhorn replicas rebuild automatically." },
    "Execute node failover with failback": { steps: "Test full failover and subsequent recovery.", expected: "Services return to original state after failback." },
    "Perform network packet and session analysis": { steps: "Use tcpdump or Wireshark to analyze VM traffic.", expected: "Traffic follows expected network paths." },
    "Test VM failover during network failure": { steps: "Disconnect network cables from a node.", expected: "HA triggers and moves workloads." }
  },
  pt: {
    "Instalando Harvester via ISO": { steps: "Boot via mídia ISO em um servidor bare-metal.", expected: "Console do Harvester exibe URL de gerência e status." },
    "Adicionando Nós Adicionais": { steps: "Junte nós subsequentes ao cluster usando VIP e token.", expected: "Nós aparecem como 'Ready' no dashboard." },
    "Configurando Proxy HTTP": { steps: "Configure o proxy em Advanced Settings ou durante a instalação.", expected: "Imagens externas podem ser baixadas via proxy." },
    "Vinculação de interface de rede para gerência": { steps: "Configure o bond mgmt-bo com NICs específicas.", expected: "Tráfego de gerência flui pelas interfaces selecionadas." },
    "Alocar uma rede de armazenamento dedicada": { steps: "Crie um network config separado para tráfego de storage.", expected: "Replicação de storage isolada do tráfego de gerência." },
    "Criar uma rede VLAN para a VM": { steps: "Crie uma nova L2VlanNetwork na aba Networks.", expected: "VMs conseguem se comunicar pela VLAN especificada." },
    "Verificar configuração de VLAN entre nós": { steps: "Teste conectividade entre VMs em nós diferentes usando a mesma VLAN.", expected: "Ping/Tráfego com sucesso entre nós." },
    "Extensões de recursos de VM (CPU, memória, disco)": { steps: "Aumente CPU/RAM e verifique no SO convidado.", expected: "SO reconhece novos recursos corretamente." },
    "Extensões de armazenamento de VM (Adicionar/Remover/Ampliar)": { steps: "Modifique volumes da VM na aba Volumes.", expected: "Mudanças de storage refletidas no SO convidado." },
    "Testando performance de disco FIO Longhorn": { steps: "Rode benchmark FIO dentro de uma VM.", expected: "Performance atende ao requisito de 5000+ IOPS." },
    "Cota de recursos de VM (CPU Pinning)": { steps: "Configure CPU pinning nas configurações avançadas da VM.", expected: "Processos da VM travados em cores físicos específicos." },
    "Migração ao vivo de VM": { steps: "Migre uma VM ligada para outro nó.", expected: "Migração concluída com sucesso sem downtime." },
    "Backup de VM para S3 Minio": { steps: "Configure destino S3 e dispare o backup.", expected: "Arquivo de backup aparece no bucket S3." },
    "Restaurando uma VM de um backup S3": { steps: "Restaure uma VM deletada a partir do backup S3.", expected: "VM restaurada com todos os dados e config." },
    "Suporte a carga de trabalho de contêiner": { steps: "Implante app conteinerizado usando o K8s interno do Harvester.", expected: "Pods rodando e acessíveis." },
    "Implantar Rancher Manager": { steps: "Instale o Rancher sobre o Harvester ou como VM separada.", expected: "Interface do Rancher acessível." },
    "Senhas de conta e política de bloqueio": { steps: "Configure integração AD e teste bloqueio.", expected: "Usuários bloqueados após tentativas falhas." },
    "Gerenciando clusters Harvester com Rancher": { steps: "Importe o Harvester no Virtualization Management do Rancher.", expected: "Recursos do Harvester visíveis no Rancher." },
    "Definir comportamento da VM durante manutenção do nó": { steps: "Coloque um nó em modo de manutenção.", expected: "VMs são migradas automaticamente para outros nós." },
    "Realizar adição, remoção e failover de rede": { steps: "Simule falha de NIC em uma interface em bond.", expected: "Conectividade de rede permanece estável." },
    "Desligar o nó para disparar failover da VM": { steps: "Desligue um nó de gerência ou worker.", expected: "VMs reiniciam em nós saudáveis (HA)." },
    "Ligar o nó Harvester e monitorar reconstrução": { steps: "Ligue um nó que falhou anteriormente.", expected: "Réplicas do Longhorn reconstroem automaticamente." },
    "Executar failover de nó com failback": { steps: "Teste failover total e recuperação subsequente.", expected: "Serviços retornam ao estado original após failback." },
    "Realizar análise de pacotes e sessão de rede": { steps: "Use tcpdump ou Wireshark para analisar tráfego da VM.", expected: "Tráfego segue os caminhos de rede esperados." },
    "Testar failover de VM durante falha de rede": { steps: "Desconecte cabos de rede de um nó.", expected: "HA dispara e move os workloads." }
  },
  es: {
    "Instalación de Harvester desde ISO": { steps: "Arranque desde el medio ISO en un servidor bare-metal.", expected: "La consola de Harvester muestra la URL de administración y el estado." },
    "Agregar nodos adicionales": { steps: "Una los nodos subsiguientes al clúster usando VIP y token.", expected: "Los nodos aparecen como 'Ready' en el tablero." },
    "Configuración de proxy HTTP": { steps: "Establezca el proxy en Configuración avanzada o durante la instalación.", expected: "Las imágenes externas se pueden descargar a través del proxy." },
    "Vinculación de interfaz de red para administración": { steps: "Configure el enlace mgmt-bo con NIC específicas.", expected: "El tráfico de administración fluye a través de las interfaces seleccionadas." },
    "Asignar una red de almacenamiento dedicada": { steps: "Cree una configuración de red separada para el tráfico de almacenamiento.", expected: "La replicación de almacenamiento está aislada del tráfico de administración." },
    "Crear una red VLAN para la VM": { steps: "Cree una nueva L2VlanNetwork en la pestaña Redes.", expected: "Las VM pueden comunicarse a través de la VLAN especificada." },
    "Verificar la configuración de VLAN entre nodos": { steps: "Pruebe la conectividad entre VM en diferentes nodos usando la misma VLAN.", expected: "Ping/Tráfico exitoso entre nodos." },
    "Extensiones de recursos de VM (CPU, memoria, disco)": { steps: "Conexión en caliente o reinicio de la VM después de aumentar la CPU/RAM.", expected: "El sistema operativo reconoce los nuevos recursos correctamente." },
    "Extensiones de almacenamiento de VM (Agregar/Eliminar/Ampliar)": { steps: "Modifique los volúmenes de la VM en la pestaña Volúmenes.", expected: "Los cambios de almacenamiento se reflejan en el sistema operativo invitado." },
    "Prueba de rendimiento de disco FIO Longhorn": { steps: "Ejecute el benchmark FIO dentro de una VM.", expected: "El rendimiento cumple con el requisito de 5000+ IOPS." },
    "Cuota de recursos de VM (CPU Pinning)": { steps: "Configure el anclaje de CPU en la configuración avanzada de la VM.", expected: "Los procesos de la VM están bloqueados en núcleos físicos específicos." },
    "Migración en vivo de VM": { steps: "Migre una VM en ejecución a otro nodo.", expected: "Migración sin tiempo de inactividad completada con éxito." },
    "Respaldo de VM a S3 Minio": { steps: "Configure el destino de respaldo S3 y active el respaldo.", expected: "El archivo de respaldo aparece en el bucket S3." },
    "Restaurar una VM desde un respaldo S3": { steps: "Restaure una VM eliminada desde el destino de respaldo S3.", expected: "La VM se restaura con todos los datos y la configuración intactos." },
    "Soporte para carga de trabajo de contenedores": { steps: "Implemente una aplicación en contenedores utilizando el K8s interno de Harvester.", expected: "Los pods están funcionando y son accesibles." },
    "Implementar Rancher Manager": { steps: "Instale Rancher sobre Harvester o como una VM separada.", expected: "La interfaz de usuario de Rancher es accesible." },
    "Contraseñas de cuenta y política de bloqueo": { steps: "Configure la integración de AD y pruebe el bloqueo.", expected: "Los usuarios se bloquean después de intentos fallidos." },
    "Gestión de clústeres Harvester con Rancher": { steps: "Importe Harvester en la Gestión de Virtualización de Rancher.", expected: "Recursos de Harvester visibles en Rancher." },
    "Definir el comportamiento de la VM durante el mantenimiento del nodo": { steps: "Ponga un nodo en modo de mantenimiento.", expected: "Las VM se migran automáticamente a otros nodos." },
    "Realizar adición, eliminación y failover de red": { steps: "Simule una falla de NIC en una interfaz vinculada.", expected: "La conectividad de red permanece estable." },
    "Apagar el nodo para activar el failover de la VM": { steps: "Apague un nodo de administración o de trabajo.", expected: "Las VM se reinician en nodos sanos (HA)." },
    "Encender el nodo Harvester y monitorear la reconstrucción": { steps: "Encienda un nodo que falló anteriormente.", expected: "Las réplicas de Longhorn se reconstruyen automáticamente." },
    "Ejecutar failover de nodo con failback": { steps: "Pruebe el failover completo y la recuperación posterior.", expected: "Los servicios vuelven al estado original después del failback." },
    "Realizar análisis de paquetes y sesiones de red": { steps: "Use tcpdump o Wireshark para analizar el tráfico de la VM.", expected: "El tráfico sigue las rutas de red esperadas." },
    "Probar el failover de la VM durante una falla de red": { steps: "Desconecte los cables de red de un nodo.", expected: "HA se activa y mueve las cargas de trabajo." }
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

// Fix the Record<Language, Record<string, any>> error by adding the 'es' key
export const GOAL_PROCEDURES_LOCALIZED: Record<Language, Record<string, any>> = {
  en: {
    "Installing Harvester from ISO": {
      steps: [
        "Download the official Harvester v1.7.0 ISO.",
        "Prepare a bootable USB drive (minimum 8GB) using Rufus (DD Mode) or Etcher.",
        "Insert media into physical server, enable Virtualization (VT-x/AMD-V) in BIOS.",
        "Boot from USB and select 'Create a new Harvester cluster'.",
        "Configure Management NIC, Hostname, and Static IP.",
        "Define Cluster VIP and shared Cluster Token.",
        "Complete install and wait for the Management URL on console."
      ],
      tip: "Ensure Secure Boot is disabled in BIOS to avoid boot hangs.",
      dependencies: ["Physical Server", "8GB USB", "Static IP"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/install/iso-install/",
      icon: Play,
      imageSrc: "https://picsum.photos/seed/harvester-iso/800/600",
      resourceLinks: [{ label: "Download ISO", url: "https://harvesterhci.io/releases" }]
    },
    "Adding additional Nodes": {
      steps: [
        "Boot the second/third node from the Harvester ISO.",
        "Select 'Join an existing Harvester cluster'.",
        "Enter the Cluster VIP and the Cluster Token created on the first node.",
        "Configure the local node network and hostname.",
        "Wait for the node to appear as 'Ready' in the dashboard."
      ],
      tip: "For a highly available cluster, you need at least 3 nodes.",
      dependencies: ["Active Harvester Cluster", "Cluster Token"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/install/iso-install/#join-an-existing-cluster",
      icon: Plus,
      resourceLinks: []
    },
    "Configuring HTTP Proxy": {
      steps: [
        "Go to 'Settings' -> 'Advanced Settings'.",
        "Find 'http-proxy' and click 'Edit Setting'.",
        "Enter the HTTP and HTTPS proxy URLs.",
        "Add internal domains to 'no-proxy' to avoid routing local traffic through the proxy."
      ],
      tip: "Proxy settings are essential for air-gapped environments with limited internet access.",
      dependencies: ["Proxy Server details"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/install/settings/#http-proxy",
      icon: Shuffle,
      resourceLinks: []
    },
    "Network card interface binding for mgmt.": {
      steps: [
        "Go to 'Settings' -> 'Management Network'.",
        "Select the bond mode (e.g., Active-Backup or LACP).",
        "Select the physical NICs to include in the management bond.",
        "Save and wait for the network to reconfigure (may cause brief disconnect)."
      ],
      tip: "LACP requires configuration on the physical switch side as well.",
      dependencies: ["Multiple NICs", "Switch Config"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/networking/harvester-network/",
      icon: Network,
      resourceLinks: []
    },
    "Allocate a dedicated storage network": {
      steps: [
        "Create a new ClusterNetwork for storage.",
        "Create a NetworkConfig and bind it to dedicated storage NICs.",
        "Configure the storage network in Longhorn settings to use this network."
      ],
      tip: "Isolating storage traffic improves performance and cluster stability.",
      dependencies: ["Dedicated Storage NICs"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/networking/harvester-network/#storage-network",
      icon: Database,
      resourceLinks: []
    },
    "Create a VLAN network for the VM": {
      steps: [
        "Create a ClusterNetwork for VLANs.",
        "Create a NetworkConfig binding physical NICs to the ClusterNetwork.",
        "Create a new Network of type 'L2Vlan' with the desired VLAN ID."
      ],
      tip: "Ensure the physical switch ports are in Trunk mode.",
      dependencies: ["VLAN ID", "Trunk Ports"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/networking/harvester-network/#vlan-network",
      icon: Globe,
      imageSrc: "https://picsum.photos/seed/harvester-vlan/800/600",
      resourceLinks: []
    },
    "Verify VLAN configuration across nodes": {
      steps: [
        "Deploy two VMs on different nodes using the same VLAN network.",
        "Assign IPs in the same subnet to both VMs.",
        "Perform a ping test between the VMs."
      ],
      tip: "If ping fails, check if the VLAN is allowed on the physical switch inter-connects.",
      dependencies: ["VLAN Network", "2 VMs on different nodes"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/networking/harvester-network/",
      icon: Activity,
      resourceLinks: []
    },
    "VM Resource Extensions (CPU, memory, disk)": {
      steps: [
        "Shut down the VM.",
        "Edit VM settings and increase CPU/RAM or Disk size.",
        "Start the VM and verify the new resources in the guest OS."
      ],
      tip: "Harvester supports hot-plugging for some resources, but a restart is safer for OS recognition.",
      dependencies: ["Running VM"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/create-vm/",
      icon: Cpu,
      resourceLinks: []
    },
    "VM Storage Extensions (Add/Remove/Enlarge)": {
      steps: [
        "Go to the VM's 'Disks' tab.",
        "Click 'Add Volume' to attach a new disk.",
        "To enlarge, go to 'Volumes', find the disk, and click 'Expand'."
      ],
      tip: "Always back up your data before expanding a partition.",
      dependencies: ["VM Volume"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/storage/storage-class/",
      icon: HardDrive,
      resourceLinks: []
    },
    "Testing FIO Longhorn disk performance": {
      steps: [
        "Install 'fio' in a Linux VM.",
        "Run: fio --name=test --rw=randwrite --bs=4k --size=1G --numjobs=1 --iodepth=1 --runtime=60 --time_based.",
        "Analyze the IOPS and latency results."
      ],
      tip: "Aim for < 10ms latency for optimal etcd and VM performance.",
      dependencies: ["Linux VM", "fio tool"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/troubleshooting/performance/",
      icon: Activity,
      resourceLinks: []
    },
    "VM Resource Quota (CPU Pinning)": {
      steps: [
        "Edit the VM YAML configuration.",
        "Add 'dedicatedCpuPlacement: true' under spec.domain.cpu.",
        "Restart the VM and check core usage."
      ],
      tip: "CPU pinning is useful for latency-sensitive workloads.",
      dependencies: ["Advanced VM Config"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/create-vm/#advanced-settings",
      icon: Target,
      resourceLinks: []
    },
    "VM Live Migration": {
      steps: [
        "Select a running VM.",
        "Click 'Migrate' and choose the target node.",
        "Monitor the migration progress in the dashboard."
      ],
      tip: "Live migration requires shared storage (Longhorn) and compatible CPU models.",
      dependencies: ["Multiple Nodes", "Running VM"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/live-migration/",
      icon: Shuffle,
      resourceLinks: []
    },
    "VM Backup to S3 Minio": {
      steps: [
        "Configure an S3 Backup Target in 'Settings'.",
        "Go to 'Virtual Machines' -> 'Backup'.",
        "Select 'Create Backup' and wait for completion."
      ],
      tip: "Minio is a great local S3-compatible option for POCs.",
      dependencies: ["S3 Bucket", "Access Keys"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/backup-restore/",
      icon: Database,
      resourceLinks: []
    },
    "Restoring a VM from an S3 backup": {
      steps: [
        "Go to 'Virtual Machines' -> 'Backups'.",
        "Select a backup and click 'Restore'.",
        "Provide a new VM name or overwrite the existing one."
      ],
      tip: "Restoring to a new VM allows you to verify data without affecting production.",
      dependencies: ["Existing Backup"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/backup-restore/#restore",
      icon: RefreshCw,
      resourceLinks: []
    },
    "Support Container workload": {
      steps: [
        "Harvester runs on Kubernetes; you can deploy pods directly if needed.",
        "Use 'kubectl' to apply a deployment YAML to the Harvester cluster.",
        "Verify the pods are running using 'kubectl get pods'."
      ],
      tip: "For production workloads, it is better to run RKE2 clusters on top of Harvester.",
      dependencies: ["kubectl access"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/introduction/",
      icon: Layers,
      resourceLinks: []
    },
    "Deploy Rancher Manager": {
      steps: [
        "Create a VM with at least 4 vCPU and 8GB RAM.",
        "Install Docker or RKE2 on the VM.",
        "Deploy Rancher using the official Helm chart or Docker command."
      ],
      tip: "Rancher v2.8+ is recommended for the best Harvester integration experience.",
      dependencies: ["VM", "Docker/K8s"],
      docsUrl: "https://ranchermanager.docs.rancher.com/v2.8/pages-for-subheaders/install-upgrade-rancher",
      icon: Cloud,
      imageSrc: "https://picsum.photos/seed/rancher-rke2/800/600",
      resourceLinks: []
    },
    "Account Passwords and Lockout Policy": {
      steps: [
        "Go to 'Settings' -> 'Authentication'.",
        "Configure password complexity and lockout thresholds.",
        "Test by attempting failed logins."
      ],
      tip: "Integrate with LDAP/AD for centralized user management.",
      dependencies: ["Admin Access"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/rancher/authentication/",
      icon: Lock,
      resourceLinks: []
    },
    "Managing Harvester clusters with Rancher": {
      steps: [
        "In Rancher, go to 'Virtualization Management'.",
        "Click 'Import Cluster' and follow the instructions.",
        "Provide the Harvester VIP and credentials."
      ],
      tip: "Rancher provides a single pane of glass for multi-cluster management.",
      dependencies: ["Rancher Server", "Harvester Cluster"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/rancher/rancher-integration/",
      icon: Monitor,
      resourceLinks: []
    },
    "Define VM behavior during node maintenance": {
      steps: [
        "Go to 'Nodes' and select a node.",
        "Click 'Maintenance Mode' -> 'Enable'.",
        "Observe VMs being automatically migrated to other nodes."
      ],
      tip: "Maintenance mode ensures zero downtime for workloads during hardware updates.",
      dependencies: ["Multiple Nodes", "Running VMs"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/host/maintenance-mode/",
      icon: Settings,
      resourceLinks: []
    },
    "Perform network addition, removal, and failover": {
      steps: [
        "Configure a bond with two NICs.",
        "Disconnect one physical cable.",
        "Verify that network traffic continues without interruption."
      ],
      tip: "Use 'Active-Backup' mode for simple failover without switch configuration.",
      dependencies: ["Bonded Network"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/networking/harvester-network/",
      icon: Wifi,
      resourceLinks: []
    },
    "Shut down the node to trigger VM failover": {
      steps: [
        "Identify a node running HA-enabled VMs.",
        "Forcefully power off the node.",
        "Verify that VMs are restarted on other nodes by the HA controller."
      ],
      tip: "HA requires at least 3 nodes to maintain a quorum.",
      dependencies: ["3-Node Cluster", "HA VMs"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/high-availability/",
      icon: Zap,
      resourceLinks: []
    },
    "Power on the Harvester node and monitor rebuild": {
      steps: [
        "Power on the previously failed node.",
        "Wait for it to join the cluster and show 'Ready'.",
        "Check Longhorn dashboard to monitor data synchronization."
      ],
      tip: "Longhorn will automatically rebuild replicas to ensure data redundancy.",
      dependencies: ["Recovered Node"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/storage/storage-class/",
      icon: RefreshCw,
      resourceLinks: []
    },
    "Execute node failover with failback": {
      steps: [
        "Trigger a failover by putting a node in maintenance.",
        "After maintenance, disable maintenance mode.",
        "Optionally migrate VMs back to the original node."
      ],
      tip: "Failback can be manual or automatic depending on your scheduling policies.",
      dependencies: ["Maintenance Mode"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/host/maintenance-mode/",
      icon: Shuffle,
      resourceLinks: []
    },
    "Perform network packet and session analysis": {
      steps: [
        "Access the Harvester node via SSH.",
        "Use 'tcpdump -i [interface]' to capture traffic.",
        "Analyze the output to troubleshoot connectivity issues."
      ],
      tip: "Use '-w' to save the capture to a file for analysis in Wireshark.",
      dependencies: ["SSH Access", "tcpdump"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/troubleshooting/network/",
      icon: Search,
      resourceLinks: []
    },
    "Test VM failover during network failure": {
      steps: [
        "Simulate a total network failure on one node (e.g., disconnect all NICs).",
        "Verify that the cluster detects the node as 'Unreachable'.",
        "Confirm that VMs are rescheduled to healthy nodes."
      ],
      tip: "Network fencing is critical to prevent split-brain scenarios.",
      dependencies: ["3-Node Cluster"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/high-availability/",
      icon: ShieldAlert,
      resourceLinks: []
    }
  },
  pt: {
    "Instalando Harvester via ISO": {
      steps: [
        "Baixe a ISO oficial do Harvester v1.7.0.",
        "Prepare um pendrive bootável (mínimo 8GB) usando Rufus (Modo DD) ou Etcher.",
        "Insira a mídia no servidor físico, ative a Virtualização (VT-x/AMD-V) na BIOS.",
        "Dê boot pelo USB e selecione 'Create a new Harvester cluster'.",
        "Configure a NIC de Gerência, Hostname e IP Estático.",
        "Defina o Cluster VIP e o Cluster Token compartilhado.",
        "Finalize a instalação e aguarde a URL de Gerência no console."
      ],
      tip: "Certifique-se de que o Secure Boot esteja desativado na BIOS para evitar travamentos no boot.",
      dependencies: ["Servidor Físico", "USB de 8GB", "IP Estático"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/install/iso-install/",
      icon: Play,
      imageSrc: "https://picsum.photos/seed/harvester-iso/800/600",
      resourceLinks: [{ label: "Download ISO", url: "https://harvesterhci.io/releases" }]
    },
    "Adicionando Nós Adicionais": {
      steps: [
        "Dê boot no segundo/terceiro nó a partir da ISO do Harvester.",
        "Selecione 'Join an existing Harvester cluster'.",
        "Insira o Cluster VIP e o Cluster Token criados no primeiro nó.",
        "Configure a rede local do nó e o hostname.",
        "Aguarde o nó aparecer como 'Ready' no dashboard."
      ],
      tip: "Para um cluster de alta disponibilidade, você precisa de pelo menos 3 nós.",
      dependencies: ["Cluster Harvester Ativo", "Cluster Token"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/install/iso-install/#join-an-existing-cluster",
      icon: Plus,
      resourceLinks: []
    },
    "Configurando Proxy HTTP": {
      steps: [
        "Vá em 'Settings' -> 'Advanced Settings'.",
        "Encontre 'http-proxy' e clique em 'Edit Setting'.",
        "Insira as URLs de proxy HTTP e HTTPS.",
        "Adicione domínios internos ao 'no-proxy' para evitar rotear tráfego local pelo proxy."
      ],
      tip: "Configurações de proxy são essenciais para ambientes air-gapped com acesso limitado à internet.",
      dependencies: ["Detalhes do Servidor Proxy"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/install/settings/#http-proxy",
      icon: Shuffle,
      resourceLinks: []
    },
    "Vinculação de interface de rede para gerência": {
      steps: [
        "Vá em 'Settings' -> 'Management Network'.",
        "Selecione o modo de bond (ex: Active-Backup ou LACP).",
        "Selecione as NICs físicas para incluir no bond de gerência.",
        "Salve e aguarde a reconfiguração da rede (pode causar desconexão breve)."
      ],
      tip: "LACP requer configuração no lado do switch físico também.",
      dependencies: ["Múltiplas NICs", "Configuração de Switch"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/networking/harvester-network/",
      icon: Network,
      resourceLinks: []
    },
    "Alocar uma rede de armazenamento dedicada": {
      steps: [
        "Crie uma nova ClusterNetwork para armazenamento.",
        "Crie um NetworkConfig e vincule-o a NICs de armazenamento dedicadas.",
        "Configure a rede de armazenamento nas configurações do Longhorn para usar esta rede."
      ],
      tip: "Isolar o tráfego de armazenamento melhora a performance e a estabilidade do cluster.",
      dependencies: ["NICs de Armazenamento Dedicadas"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/networking/harvester-network/#storage-network",
      icon: Database,
      resourceLinks: []
    },
    "Criar uma rede VLAN para a VM": {
      steps: [
        "Crie uma ClusterNetwork para VLANs.",
        "Crie um NetworkConfig vinculando NICs físicas à ClusterNetwork.",
        "Crie uma nova Rede do tipo 'L2Vlan' com o ID da VLAN desejado."
      ],
      tip: "Certifique-se de que as portas do switch físico estejam em modo Trunk.",
      dependencies: ["ID da VLAN", "Portas Trunk"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/networking/harvester-network/#vlan-network",
      icon: Globe,
      resourceLinks: []
    },
    "Verificar configuração de VLAN entre nós": {
      steps: [
        "Implante duas VMs em nós diferentes usando a mesma rede VLAN.",
        "Atribua IPs na mesma sub-rede para ambas as VMs.",
        "Realize um teste de ping entre as VMs."
      ],
      tip: "Se o ping falhar, verifique se a VLAN é permitida nos inter-connects do switch físico.",
      dependencies: ["Rede VLAN", "2 VMs em nós diferentes"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/networking/harvester-network/",
      icon: Activity,
      resourceLinks: []
    },
    "Extensões de recursos de VM (CPU, memória, disco)": {
      steps: [
        "Desligue a VM.",
        "Edite as configurações da VM e aumente o CPU/RAM ou o tamanho do disco.",
        "Inicie a VM e verifique os novos recursos no SO convidado."
      ],
      tip: "O Harvester suporta hot-plug para alguns recursos, mas um reinício é mais seguro para o reconhecimento pelo SO.",
      dependencies: ["VM em Execução"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/create-vm/",
      icon: Cpu,
      resourceLinks: []
    },
    "Extensões de armazenamento de VM (Adicionar/Remover/Ampliar)": {
      steps: [
        "Vá na aba 'Disks' da VM.",
        "Clique em 'Add Volume' para anexar um novo disco.",
        "Para ampliar, vá em 'Volumes', encontre o disco e clique em 'Expand'."
      ],
      tip: "Sempre faça backup dos seus dados antes de expandir uma partição.",
      dependencies: ["Volume da VM"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/storage/storage-class/",
      icon: HardDrive,
      resourceLinks: []
    },
    "Testando performance de disco FIO Longhorn": {
      steps: [
        "Instale o 'fio' em uma VM Linux.",
        "Execute: fio --name=test --rw=randwrite --bs=4k --size=1G --numjobs=1 --iodepth=1 --runtime=60 --time_based.",
        "Analise os resultados de IOPS e latência."
      ],
      tip: "Busque latência < 10ms para performance ideal do etcd e das VMs.",
      dependencies: ["VM Linux", "ferramenta fio"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/troubleshooting/performance/",
      icon: Activity,
      resourceLinks: []
    },
    "Cota de recursos de VM (CPU Pinning)": {
      steps: [
        "Edite a configuração YAML da VM.",
        "Adicione 'dedicatedCpuPlacement: true' sob spec.domain.cpu.",
        "Reinicie a VM e verifique o uso dos cores."
      ],
      tip: "O CPU pinning é útil para cargas de trabalho sensíveis à latência.",
      dependencies: ["Configuração Avançada de VM"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/create-vm/#advanced-settings",
      icon: Target,
      resourceLinks: []
    },
    "Migração ao vivo de VM": {
      steps: [
        "Selecione uma VM em execução.",
        "Clique em 'Migrate' e escolha o nó de destino.",
        "Monitore o progresso da migração no dashboard."
      ],
      tip: "A migração ao vivo requer armazenamento compartilhado (Longhorn) e modelos de CPU compatíveis.",
      dependencies: ["Múltiplos Nós", "VM em Execução"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/live-migration/",
      icon: Shuffle,
      resourceLinks: []
    },
    "Backup de VM para S3 Minio": {
      steps: [
        "Configure um S3 Backup Target em 'Settings'.",
        "Vá em 'Virtual Machines' -> 'Backup'.",
        "Selecione 'Create Backup' e aguarde a conclusão."
      ],
      tip: "O Minio é uma ótima opção local compatível com S3 para POCs.",
      dependencies: ["Bucket S3", "Chaves de Acesso"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/backup-restore/",
      icon: Database,
      imageSrc: "https://picsum.photos/seed/harvester-backup/800/600",
      resourceLinks: []
    },
    "Restaurando uma VM de um backup S3": {
      steps: [
        "Vá em 'Virtual Machines' -> 'Backups'.",
        "Selecione um backup e clique em 'Restore'.",
        "Forneça um novo nome para a VM ou sobrescreva a existente."
      ],
      tip: "Restaurar para uma nova VM permite verificar os dados sem afetar a produção.",
      dependencies: ["Backup Existente"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/backup-restore/#restore",
      icon: RefreshCw,
      resourceLinks: []
    },
    "Suporte a carga de trabalho de contêiner": {
      steps: [
        "O Harvester roda sobre Kubernetes; você pode implantar pods diretamente se necessário.",
        "Use o 'kubectl' para aplicar um YAML de deployment no cluster Harvester.",
        "Verifique se os pods estão rodando usando 'kubectl get pods'."
      ],
      tip: "Para cargas de trabalho de produção, é melhor rodar clusters RKE2 sobre o Harvester.",
      dependencies: ["acesso kubectl"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/introduction/",
      icon: Layers,
      resourceLinks: []
    },
    "Implantar Rancher Manager": {
      steps: [
        "Crie uma VM com pelo menos 4 vCPU e 8GB de RAM.",
        "Instale Docker ou RKE2 na VM.",
        "Implante o Rancher usando o Helm chart oficial ou comando Docker."
      ],
      tip: "O Rancher v2.8+ é recomendado para a melhor experiência de integração com o Harvester.",
      dependencies: ["VM", "Docker/K8s"],
      docsUrl: "https://ranchermanager.docs.rancher.com/v2.8/pages-for-subheaders/install-upgrade-rancher",
      icon: Cloud,
      resourceLinks: []
    },
    "Senhas de conta e política de bloqueio": {
      steps: [
        "Vá em 'Settings' -> 'Authentication'.",
        "Configure a complexidade de senha e limites de bloqueio.",
        "Teste tentando logins com falha."
      ],
      tip: "Integre com LDAP/AD para gerenciamento centralizado de usuários.",
      dependencies: ["Acesso Admin"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/rancher/authentication/",
      icon: Lock,
      resourceLinks: []
    },
    "Gerenciando clusters Harvester com Rancher": {
      steps: [
        "No Rancher, vá em 'Virtualization Management'.",
        "Clique em 'Import Cluster' e siga as instruções.",
        "Forneça o VIP do Harvester e as credenciais."
      ],
      tip: "O Rancher fornece uma visão única para gerenciamento de múltiplos clusters.",
      dependencies: ["Servidor Rancher", "Cluster Harvester"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/rancher/rancher-integration/",
      icon: Monitor,
      resourceLinks: []
    },
    "Definir comportamento da VM durante manutenção do nó": {
      steps: [
        "Vá em 'Nodes' e selecione um nó.",
        "Clique em 'Maintenance Mode' -> 'Enable'.",
        "Observe as VMs sendo migradas automaticamente para outros nós."
      ],
      tip: "O modo de manutenção garante tempo de inatividade zero para as cargas de trabalho durante atualizações de hardware.",
      dependencies: ["Múltiplos Nós", "VMs em Execução"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/host/maintenance-mode/",
      icon: Settings,
      resourceLinks: []
    },
    "Realizar adição, remoção e failover de rede": {
      steps: [
        "Configure um bond com duas NICs.",
        "Desconecte um cabo físico.",
        "Verifique se o tráfego de rede continua sem interrupção."
      ],
      tip: "Use o modo 'Active-Backup' para failover simples sem configuração de switch.",
      dependencies: ["Rede em Bond"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/networking/harvester-network/",
      icon: Wifi,
      resourceLinks: []
    },
    "Desligar o nó para disparar failover da VM": {
      steps: [
        "Identifique um nó rodando VMs com HA habilitado.",
        "Desligue o nó forçadamente.",
        "Verifique se as VMs são reiniciadas em outros nós pelo controlador de HA."
      ],
      tip: "O HA requer pelo menos 3 nós para manter o quorum.",
      dependencies: ["Cluster de 3 Nós", "VMs com HA"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/high-availability/",
      icon: Zap,
      resourceLinks: []
    },
    "Ligar o nó Harvester e monitorar reconstrução": {
      steps: [
        "Ligue o nó que falhou anteriormente.",
        "Aguarde ele se juntar ao cluster e mostrar 'Ready'.",
        "Verifique o dashboard do Longhorn para monitorar a sincronização de dados."
      ],
      tip: "O Longhorn reconstruirá automaticamente as réplicas para garantir a redundância dos dados.",
      dependencies: ["Nó Recuperado"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/storage/storage-class/",
      icon: RefreshCw,
      resourceLinks: []
    },
    "Executar failover de nó com failback": {
      steps: [
        "Dispare um failover colocando um nó em manutenção.",
        "Após a manutenção, desative o modo de manutenção.",
        "Opcionalmente, migre as VMs de volta para o nó original."
      ],
      tip: "O failback pode ser manual ou automático dependendo das suas políticas de agendamento.",
      dependencies: ["Modo de Manutenção"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/host/maintenance-mode/",
      icon: Shuffle,
      resourceLinks: []
    },
    "Realizar análise de pacotes e sessão de rede": {
      steps: [
        "Acesse o nó Harvester via SSH.",
        "Use 'tcpdump -i [interface]' para capturar o tráfego.",
        "Analise a saída para diagnosticar problemas de conectividade."
      ],
      tip: "Use '-w' para salvar a captura em um arquivo para análise no Wireshark.",
      dependencies: ["Acesso SSH", "tcpdump"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/troubleshooting/network/",
      icon: Search,
      resourceLinks: []
    },
    "Testar failover de VM durante falha de rede": {
      steps: [
        "Simule uma falha total de rede em um nó (ex: desconecte todas as NICs).",
        "Verifique se o cluster detecta o nó como 'Unreachable'.",
        "Confirme se as VMs são reagendadas para nós saudáveis."
      ],
      tip: "O isolamento de rede (fencing) é crítico para evitar cenários de split-brain.",
      dependencies: ["Cluster de 3 Nós"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/high-availability/",
      icon: ShieldAlert,
      resourceLinks: []
    }
  },
  es: {
    "Instalación de Harvester desde ISO": {
      steps: [
        "Descargue la ISO oficial de Harvester v1.7.0.",
        "Prepare una unidad USB de arranque (mínimo 8GB) usando Rufus (Modo DD) o Etcher.",
        "Inserte el medio en el servidor físico, habilite la Virtualización (VT-x/AMD-V) en la BIOS.",
        "Arranque desde el USB y seleccione 'Create a new Harvester cluster'.",
        "Configure la NIC de administración, el nombre de host y la IP estática.",
        "Defina la VIP del clúster y el token del clúster compartido.",
        "Complete la instalación y espere a la URL de administración en la consola."
      ],
      tip: "Asegúrese de que el Secure Boot esté desactivado en la BIOS para evitar bloqueos en el arranque.",
      dependencies: ["Servidor físico", "USB de 8GB", "IP estática"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/install/iso-install/",
      icon: Play,
      imageSrc: "https://picsum.photos/seed/harvester-iso/800/600",
      resourceLinks: [{ label: "Descargar ISO", url: "https://harvesterhci.io/releases" }]
    },
    "Agregar nodos adicionales": {
      steps: [
        "Arranque el segundo/tercer nodo desde la ISO de Harvester.",
        "Seleccione 'Join an existing Harvester cluster'.",
        "Ingrese la VIP del clúster y el token del clúster creados en el primer nodo.",
        "Configure la red del nodo local y el nombre de host.",
        "Espere a que el nodo aparezca como 'Ready' en el tablero."
      ],
      tip: "Para un clúster de alta disponibilidad, necesita al menos 3 nodos.",
      dependencies: ["Clúster Harvester activo", "Token del clúster"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/install/iso-install/#join-an-existing-cluster",
      icon: Plus,
      resourceLinks: []
    },
    "Configuración de proxy HTTP": {
      steps: [
        "Vaya a 'Settings' -> 'Advanced Settings'.",
        "Busque 'http-proxy' y haga clic en 'Edit Setting'.",
        "Ingrese las URL de proxy HTTP y HTTPS.",
        "Agregue dominios internos a 'no-proxy' para evitar enrutar el tráfico local a través del proxy."
      ],
      tip: "La configuración del proxy es esencial for entornos con acceso limitado a Internet.",
      dependencies: ["Detalles del servidor proxy"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/install/settings/#http-proxy",
      icon: Shuffle,
      resourceLinks: []
    },
    "Vinculación de interfaz de red para administración": {
      steps: [
        "Vaya a 'Settings' -> 'Management Network'.",
        "Seleccione el modo de enlace (por ejemplo, Active-Backup o LACP).",
        "Seleccione las NIC físicas para incluir en el enlace de administración.",
        "Guarde y espere a que la red se reconfigure (puede causar una breve desconexión)."
      ],
      tip: "LACP también requiere configuración en el lado del switch físico.",
      dependencies: ["Múltiples NIC", "Configuración del switch"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/networking/harvester-network/",
      icon: Network,
      resourceLinks: []
    },
    "Asignar una red de almacenamiento dedicada": {
      steps: [
        "Cree una nueva ClusterNetwork para el almacenamiento.",
        "Cree un NetworkConfig y vincúlelo a NIC de almacenamiento dedicadas.",
        "Configure la red de almacenamiento en los ajustes de Longhorn para usar esta red."
      ],
      tip: "Aislar el tráfico de almacenamiento mejora el rendimiento y la estabilidad del clúster.",
      dependencies: ["NIC de almacenamiento dedicadas"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/networking/harvester-network/#storage-network",
      icon: Database,
      resourceLinks: []
    },
    "Crear una red VLAN para la VM": {
      steps: [
        "Cree una ClusterNetwork para VLAN.",
        "Cree un NetworkConfig vinculando NIC físicas a la ClusterNetwork.",
        "Cree una nueva red de tipo 'L2Vlan' con el ID de VLAN deseado."
      ],
      tip: "Asegúrese de que los puertos del switch físico estén en modo Trunk.",
      dependencies: ["ID de VLAN", "Puertos Trunk"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/networking/harvester-network/#vlan-network",
      icon: Globe,
      resourceLinks: []
    },
    "Verificar la configuración de VLAN entre nodos": {
      steps: [
        "Implemente dos VM en diferentes nodos usando la misma red VLAN.",
        "Asigne IP en la misma subred a ambas VM.",
        "Realice una prueba de ping entre las VM."
      ],
      tip: "Si el ping falla, verifique si la VLAN está permitida en las interconexiones del switch físico.",
      dependencies: ["Red VLAN", "2 VM en diferentes nodos"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/networking/harvester-network/",
      icon: Activity,
      resourceLinks: []
    },
    "Extensiones de recursos de VM (CPU, memoria, disco)": {
      steps: [
        "Apague la VM.",
        "Edite la configuración de la VM y aumente la CPU/RAM o el tamaño del disco.",
        "Inicie la VM y verifique los nuevos recursos en el SO invitado."
      ],
      tip: "Harvester admite la conexión en caliente para algunos recursos, pero un reinicio es más seguro para el reconocimiento del SO.",
      dependencies: ["VM en ejecución"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/create-vm/",
      icon: Cpu,
      resourceLinks: []
    },
    "Extensiones de almacenamiento de VM (Agregar/Eliminar/Ampliar)": {
      steps: [
        "Vaya a la pestaña 'Disks' de la VM.",
        "Haga clic en 'Add Volume' para adjuntar un nuevo disco.",
        "Para ampliar, vaya a 'Volumes', busque el disco y haga clic en 'Expand'."
      ],
      tip: "Siempre haga una copia de seguridad de sus datos antes de ampliar una partición.",
      dependencies: ["Volumen de la VM"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/storage/storage-class/",
      icon: HardDrive,
      resourceLinks: []
    },
    "Prueba de rendimiento de disco FIO Longhorn": {
      steps: [
        "Instale 'fio' en una VM Linux.",
        "Ejecute: fio --name=test --rw=randwrite --bs=4k --size=1G --numjobs=1 --iodepth=1 --runtime=60 --time_based.",
        "Analice los resultados de IOPS y latencia."
      ],
      tip: "Busque una latencia < 10ms para un rendimiento óptimo de etcd y las VM.",
      dependencies: ["VM Linux", "herramienta fio"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/troubleshooting/performance/",
      icon: Activity,
      resourceLinks: []
    },
    "Cuota de recursos de VM (CPU Pinning)": {
      steps: [
        "Edite la configuración YAML de la VM.",
        "Agregue 'dedicatedCpuPlacement: true' bajo spec.domain.cpu.",
        "Reinicie la VM y verifique el uso de los núcleos."
      ],
      tip: "El anclaje de CPU es útil para cargas de trabajo sensibles a la latencia.",
      dependencies: ["Configuración avanzada de VM"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/create-vm/#advanced-settings",
      icon: Target,
      resourceLinks: []
    },
    "Migración en vivo de VM": {
      steps: [
        "Seleccione una VM en ejecución.",
        "Haga clic en 'Migrate' y elija el nodo de destino.",
        "Monitoree el progreso de la migración en el tablero."
      ],
      tip: "La migración en vivo requiere almacenamiento compartido (Longhorn) y modelos de CPU compatibles.",
      dependencies: ["Múltiples nodos", "VM en ejecución"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/live-migration/",
      icon: Shuffle,
      resourceLinks: []
    },
    "Respaldo de VM a S3 Minio": {
      steps: [
        "Configure un destino de respaldo S3 en 'Settings'.",
        "Vaya a 'Virtual Machines' -> 'Backup'.",
        "Seleccione 'Create Backup' y espere a que finalice."
      ],
      tip: "Minio es una excelente opción local compatible con S3 para POC.",
      dependencies: ["Bucket S3", "Claves de acceso"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/backup-restore/",
      icon: Database,
      imageSrc: "https://picsum.photos/seed/harvester-backup/800/600",
      resourceLinks: []
    },
    "Restaurar una VM desde un respaldo S3": {
      steps: [
        "Vaya a 'Virtual Machines' -> 'Backups'.",
        "Seleccione un respaldo y haga clic en 'Restore'.",
        "Proporcione un nuevo nombre de VM o sobrescriba la existente."
      ],
      tip: "Restaurar a una nueva VM le permite verificar los datos sin afectar la producción.",
      dependencies: ["Respaldo existente"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/backup-restore/#restore",
      icon: RefreshCw,
      resourceLinks: []
    },
    "Soporte para carga de trabajo de contenedores": {
      steps: [
        "Harvester se ejecuta sobre Kubernetes; puede implementar pods directamente si es necesario.",
        "Use 'kubectl' para aplicar un YAML de implementación al clúster Harvester.",
        "Verifique que los pods se estén ejecutando con 'kubectl get pods'."
      ],
      tip: "Para cargas de trabajo de producción, es mejor ejecutar clústeres RKE2 sobre Harvester.",
      dependencies: ["acceso a kubectl"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/introduction/",
      icon: Layers,
      resourceLinks: []
    },
    "Implementar Rancher Manager": {
      steps: [
        "Cree una VM con al menos 4 vCPU y 8GB de RAM.",
        "Instale Docker o RKE2 en la VM.",
        "Implemente Rancher usando el Helm chart oficial o el comando Docker."
      ],
      tip: "Se recomienda Rancher v2.8+ para la mejor experiencia de integración con Harvester.",
      dependencies: ["VM", "Docker/K8s"],
      docsUrl: "https://ranchermanager.docs.rancher.com/v2.8/pages-for-subheaders/install-upgrade-rancher",
      icon: Cloud,
      resourceLinks: []
    },
    "Contraseñas de cuenta y política de bloqueo": {
      steps: [
        "Vaya a 'Settings' -> 'Authentication'.",
        "Configure la complejidad de la contraseña y los umbrales de bloqueo.",
        "Pruebe intentando inicios de sesión fallidos."
      ],
      tip: "Integre con LDAP/AD para una gestión de usuarios centralizada.",
      dependencies: ["Acceso de administrador"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/rancher/authentication/",
      icon: Lock,
      resourceLinks: []
    },
    "Gestión de clústeres Harvester con Rancher": {
      steps: [
        "En Rancher, vaya a 'Virtualization Management'.",
        "Haga clic en 'Import Cluster' y siga las instrucciones.",
        "Proporcione la VIP de Harvester y las credenciales."
      ],
      tip: "Rancher proporciona un panel único para la gestión de múltiples clústeres.",
      dependencies: ["Servidor Rancher", "Clúster Harvester"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/rancher/rancher-integration/",
      icon: Monitor,
      resourceLinks: []
    },
    "Definir el comportamiento de la VM durante el mantenimiento del nodo": {
      steps: [
        "Vaya a 'Nodes' y seleccione un nodo.",
        "Haga clic en 'Maintenance Mode' -> 'Enable'.",
        "Observe cómo las VM se migran automáticamente a otros nodos."
      ],
      tip: "El modo de mantenimiento garantiza un tiempo de inactividad cero para las cargas de trabajo durante las actualizaciones de hardware.",
      dependencies: ["Múltiples nodos", "VM en ejecución"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/host/maintenance-mode/",
      icon: Settings,
      resourceLinks: []
    },
    "Realizar adición, eliminación y failover de red": {
      steps: [
        "Configure un enlace con dos NIC.",
        "Desconecte un cable físico.",
        "Verifique que el tráfico de red continúe sin interrupciones."
      ],
      tip: "Use el modo 'Active-Backup' para un failover simple sin configuración del switch.",
      dependencies: ["Red enlazada"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/networking/harvester-network/",
      icon: Wifi,
      resourceLinks: []
    },
    "Apagar el nodo para activar el failover de la VM": {
      steps: [
        "Identifique un nodo que ejecute VM con HA habilitado.",
        "Apague el nodo por la fuerza.",
        "Verifique que las VM se reinicien en otros nodos mediante el controlador de HA."
      ],
      tip: "HA requiere al menos 3 nodos para mantener el quórum.",
      dependencies: ["Clúster de 3 nodos", "VM con HA"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/high-availability/",
      icon: Zap,
      resourceLinks: []
    },
    "Encender el nodo Harvester y monitorear la reconstrucción": {
      steps: [
        "Encienda el nodo que falló anteriormente.",
        "Espere a que se una al clúster y se muestre como 'Ready'.",
        "Consulte el tablero de Longhorn para monitorear la sincronización de datos."
      ],
      tip: "Longhorn reconstruirá automáticamente las réplicas para garantizar la redundancia de los datos.",
      dependencies: ["Nodo recuperado"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/storage/storage-class/",
      icon: RefreshCw,
      resourceLinks: []
    },
    "Ejecutar failover de nodo con failback": {
      steps: [
        "Active un failover poniendo un nodo en mantenimiento.",
        "Después del mantenimiento, desactive el modo de mantenimiento.",
        "Opcionalmente, migre las VM de regreso al nodo original."
      ],
      tip: "El failback puede ser manual o automático según sus políticas de programación.",
      dependencies: ["Modo de mantenimiento"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/host/maintenance-mode/",
      icon: Shuffle,
      resourceLinks: []
    },
    "Realizar análisis de paquetes y sesiones de red": {
      steps: [
        "Acceda al nodo Harvester a través de SSH.",
        "Use 'tcpdump -i [interfaz]' para capturar el tráfico.",
        "Analice la salida para diagnosticar problemas de conectividad."
      ],
      tip: "Use '-w' para guardar la captura en un archivo para analizarlo en Wireshark.",
      dependencies: ["Acceso SSH", "tcpdump"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/troubleshooting/network/",
      icon: Search,
      resourceLinks: []
    },
    "Probar el failover de la VM durante una falla de red": {
      steps: [
        "Simule una falla de red total en un nodo (por ejemplo, desconecte todas las NIC).",
        "Verifique que el clúster detecte el nodo como 'Unreachable'.",
        "Confirme que las VM se reprogramen en nodos sanos."
      ],
      tip: "El aislamiento de red (fencing) es fundamental para evitar escenarios de cerebro dividido.",
      dependencies: ["Clúster de 3 nodos"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/high-availability/",
      icon: ShieldAlert,
      resourceLinks: []
    }
  }
};
