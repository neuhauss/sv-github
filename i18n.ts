
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
  Cpu,
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
      report: "Report"
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
        tip: "Wait for the login prompt on the physical console. Use the VIP to access the Web UI."
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
      report: "Relatório"
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
        network: "Fabric de 10Gbps dedicado para replicação de Storage/Longhorn é obrigatório.",
        mtu: "MTU 9000 (Jumbo Frames) deve ser configurado em todos os switches físicos.",
        bios: "Configure controladoras SATA/Disk em modo HBA/JBOD. RAID por software NÃO é suportado.",
        internet: "Acesso externo para registry.suse.com e docker.io é necessário, exceto em Air-Gap."
      },
      install: {
        title: "Passo-a-passo Instalação ISO",
        node1: "1º Nó (Seed): Escolha 'Create a new Harvester cluster'. Defina um VIP de Cluster persistente.",
        node2: "Nós seguintes: Escolha 'Join an existing cluster'. Você precisará do VIP e do Token.",
        reboot: "Após o término do instalador, remova a mídia e reinicie.",
        tip: "Aguarde o prompt de login no console físico. Use the VIP to access the Web UI."
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
      report: "Informe"
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
        obsStrategy: "Estrategia de observabilidad"
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
        tip: "Espere al prompt en consola. Use la VIP para acceder a la Web UI."
      },
      config: {
        title: "Access & Initial Setup",
        url: "Navegue a https://[VIP] para el Dashboard.",
        password: "Defina la contraseña de admin y guárdela.",
        settings: "Red: Cree una 'Network Config' para vincular NICs al puente.",
        backup: "Configure un destino de Backup S3 or NFS inmediatamente."
      },
      storage: {
        title: "Optimización Longhorn SDS",
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
        "Include directives like 'users', 'ssh_authorized_keys' and 'runcmd'.",
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
      steps: [
        "Prepare um pendrive bootável com a ISO do Harvester v1.7.",
        "Boot via UEFI. Selecione 'Create a new Harvester cluster' no Nó 1.",
        "Configure Hostname, IP Estático, Gateway e o VIP do Cluster.",
        "Defina o 'Cluster Token' (usado para admissão de novos nós).",
        "Aguarde o reboot e o prompt final com a URL do Dashboard."
      ],
      tip: "Se o instalador travar em 'Loading initrd', verifique se o UEFI está habilitado e o Secure Boot desabilitado.",
      dependencies: ["VT-x/AMD-V ativo", "Pendrive 8GB", "Conexão cabeada"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/install/iso-install/",
      icon: Play,
      resourceLinks: [{ label: "Download Harvester ISO", url: "https://harvesterhci.io/releases" }]
    },
    "Opcional. Provisionar hosts através do boot PXE": {
      steps: [
        "Configure um servidor iPXE ou HTTP acessível pelos nós.",
        "Prepare o arquivo de configuração (formato YAML) com as definições de rede.",
        "Configure os nós para boot via PXE no BIOS/UEFI.",
        "Disponibilize kernel, initrd e rootfs via servidor PXE.",
        "Monitore o progresso da instalação automatizada."
      ],
      tip: "Use a integração 'Matchbox' se precisar de uma forma escalável de gerenciar múltiplas configurações via PXE.",
      dependencies: ["Servidor HTTP/TFTP", "Opção DHCP 67 configurada", "config.yaml do Harvester"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/install/pxe-boot-install/",
      icon: Network,
      resourceLinks: []
    },
    "Registrar uma imagem para uso em VMs": {
      steps: [
        "Login no Dashboard -> Images -> Create.",
        "Opção 1: 'Download from URL'. Use uma URL raw/qcow2.",
        "Opção 2: 'Upload' da sua estação local.",
        "Aguarde o status mudar para 'Active'."
      ],
      tip: "Imagens Cloud-optimized são preferíveis para injeção automática de credenciais via Cloud-Init.",
      dependencies: ["Acesso internet para download", "Suporte qcow2/img/iso"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/create-vm/#images",
      icon: ImageIcon,
      resourceLinks: []
    },
    "Criar uma Storage Class e Volume": {
      steps: [
        "O Harvester provê a StorageClass 'longhorn' por padrão.",
        "Para criar nova: Settings -> StorageClass -> Create.",
        "Defina 'Number of Replicas' como 3 (Obrigatório para HA).",
        "Criar Volume: Volumes -> Create. Selecione o tamanho e a StorageClass.",
        "Anexe o volume a uma VM na aba 'Disks'."
      ],
      tip: "Evite reduzir o número de réplicas para 1 em produção, pois falhas de nó causarão perda permanente de dados.",
      dependencies: ["Nós SDS saudáveis", "Espaço em disco disponível"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/storage/storage-class/",
      icon: Database,
      resourceLinks: []
    },
    "Criar uma rede VLAN no SUSE Virtualization": {
      steps: [
        "Passo 1: Criar ClusterNetwork (Settings -> ClusterNetwork).",
        "Passo 2: Criar NetworkConfig e vincular às NICs físicas.",
        "Passo 3: Criar rede VM (Networks -> Create) tipo 'L2Vlan' com o ID desejado.",
        "Atribua esta rede à VM durante a criação."
      ],
      tip: "A porta do switch físico DEVE estar configurada como TRUNK se usar VLAN IDs diferentes de 0.",
      dependencies: ["Switch com suporte 802.1Q", "Disponibilidade de NIC física"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/networking/harvester-network/",
      icon: Network,
      resourceLinks: []
    },
    "Criar uma VM": {
      steps: [
        "Virtual Machines -> Create.",
        "Básico: Nome, Cores de CPU e Memória.",
        "Volumes: Selecione a imagem para o disco raiz.",
        "Redes: Escolha Management Network ou a VLAN criada.",
        "Avançado: Cole sua chave SSH pública."
      ],
      tip: "Use drivers 'VirtIO' para melhor performance de disco e rede.",
      dependencies: ["Imagem ativa", "Rede definida"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/create-vm/",
      icon: Monitor,
      resourceLinks: []
    },
    "Configurar um destino de backup": {
      steps: [
        "Settings -> Backup Target.",
        "Escolha 'S3' ou 'NFS'.",
        "NFS: Informe o IP e o caminho exportado.",
        "S3: Informe Endpoint, Bucket e chaves de acesso.",
        "Salve e verifique se o status é 'Ready'."
      ],
      tip: "NFS v4 é recomendado para melhor confiabilidade com Longhorn.",
      dependencies: ["Storage externo NFS/S3 acessível"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/storage/backup-target/",
      icon: Save,
      resourceLinks: []
    },
    "Configurar um script cloud-config de dados do usuário": {
      steps: [
        "Cloud Config Templates -> Create.",
        "Insira o YAML iniciando com '#cloud-config'.",
        "Inclua 'users', 'ssh_authorized_keys' e 'runcmd'.",
        "Selecione o template na aba 'Advanced' da VM."
      ],
      tip: "Sempre use 'NoCloud' como fonte de dados no Harvester para a maioria das imagens cloud Linux.",
      dependencies: ["Conhecimento YAML", "Imagem compatível com Cloud-Init"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/create-vm/#advanced",
      icon: FileCode,
      resourceLinks: []
    },
    "Criar um backup de uma VM": {
      steps: [
        "Garanta que o Backup Target esteja saudável.",
        "Virtual Machines -> Menu da VM -> Take Backup.",
        "Monitore no menu 'Backups' até o status 'Ready'."
      ],
      tip: "Backups são armazenados externamente, snapshots permanecem locais.",
      dependencies: ["Backup Target configurado"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/backup-restore/#taking-a-backup",
      icon: Database,
      resourceLinks: []
    },
    "Restaurar uma VM de um backup": {
      steps: [
        "Menu Backups -> Selecione um backup saudável.",
        "Restore to a new VM.",
        "Defina o novo nome e aguarde o processo.",
        "Verifique a integridade dos dados."
      ],
      tip: "Você também pode restaurar 'in-place' para reverter uma VM existente.",
      dependencies: ["Backup saudável"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/backup-restore/#restoring-from-a-backup",
      icon: RefreshCw,
      resourceLinks: []
    },
    "Realizar migração ao vivo de uma VM (requer multi-host)": {
      steps: [
        "Certifique-se de ter pelo menos 2 nós saudáveis.",
        "Virtual Machines -> Menu da VM -> Migrate.",
        "Monitore até que o estado 'Running' seja restaurado."
      ],
      tip: "A migração falhará se a VM tiver hardware pass-through local (USB/PCI).",
      dependencies: ["Cluster multi-nó", "Storage Distribuído"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/live-migration/",
      icon: RefreshCw,
      resourceLinks: []
    },
    "Usar o console serial/VNC de uma VM": {
      steps: [
        "Dashboard Virtual Machines -> Selecione a VM.",
        "Clique no botão 'Console' no canto superior direito.",
        "Alterne entre abas 'VNC' e 'Serial'."
      ],
      tip: "Habilite o console serial no kernel Linux convidado (console=ttyS0) se não funcionar.",
      dependencies: ["Acesso via browser ao VIP"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/create-vm/#access-vm-via-console",
      icon: Terminal,
      resourceLinks: []
    },
    "Importar a chave SSH e acessar uma VM usando a chave (apenas Linux)": {
      steps: [
        "Settings -> SSH Keys -> Create.",
        "Selecione a chave durante a criação da VM.",
        "Acesse via terminal: ssh [user]@[VM_IP]."
      ],
      tip: "Verifique se a imagem possui cloud-init instalado.",
      dependencies: ["Chave Pública", "Conetividade de rede com a VM"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/create-vm/#ssh-key",
      icon: Key,
      resourceLinks: []
    },
    "Gerenciamento multi-cluster, multi-tenancy e suporte multi-disco": {
      steps: [
        "Multi-disk: Adicione volumes secundários em 'Disks'.",
        "Multi-tenancy: Use Namespaces para isolar workloads.",
        "Multi-cluster: Importe o Harvester no Rancher."
      ],
      tip: "Separe arquivos de log em discos secundários para melhor performance.",
      dependencies: ["Integração Rancher", "Espaço SDS"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/create-vm/#disks",
      icon: HardDrive,
      resourceLinks: []
    },
    "Integração com Rancher. Provisionar um cluster RKE2 Kubernetes sobre o SUSE Virtualization": {
      steps: [
        "Ative o Harvester no Rancher (Feature Flags).",
        "Importe o Harvester no menu Virtualization Management.",
        "Crie Cloud Credentials no Rancher.",
        "Cluster Management -> Create -> Harvester.",
        "Defina Node Pools e crie o cluster."
      ],
      tip: "Garanta que o certificado do Rancher seja confiado pelo Harvester.",
      dependencies: ["Rancher v2.8+", "VIP do Harvester funcional"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/rancher/rancher-integration/",
      icon: Cloud,
      resourceLinks: []
    }
  },
  es: {
    "Provisionar hosts mediante el instalador ISO": {
      steps: [
        "Prepare una unidad USB con la ISO de Harvester v1.7.",
        "Arranque desde UEFI. Seleccione 'Create a new Harvester cluster' para el Nodo 1.",
        "Configure Hostname, IP estática, Gateway y la VIP del clúster.",
        "Defina el 'Cluster Token'.",
        "Espere al reinicio y al prompt de la URL del Dashboard."
      ],
      tip: "Si el instalador se detiene en 'Loading initrd', verifique que UEFI esté habilitado.",
      dependencies: ["VT-x/AMD-V activo", "Unidad USB de 8GB"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/install/iso-install/",
      icon: Play,
      resourceLinks: [{ label: "Descargar Harvester ISO", url: "https://harvesterhci.io/releases" }]
    },
    "Opcional. Provisionar hosts mediante arranque PXE": {
      steps: [
        "Configure un servidor iPXE o HTTP.",
        "Prepare el archivo config.yaml con los ajustes de red.",
        "Configure el arranque PXE en la BIOS/UEFI.",
        "Monitoree la instalación automatizada."
      ],
      tip: "Use la integración con 'Matchbox' para despliegues a gran escala.",
      dependencies: ["Servidor HTTP/TFTP", "DHCP configurado"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/install/pxe-boot-install/",
      icon: Network,
      resourceLinks: []
    },
    "Registrar una imagen para usar en máquinas virtuales": {
      steps: [
        "Dashboard -> Images -> Create.",
        "Opción: Descarga desde URL o carga local.",
        "Espere a que el estado sea 'Active'."
      ],
      tip: "Se prefieren imágenes optimizadas para la nube (Cloud-Init).",
      dependencies: ["Acceso a internet para descargas"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/create-vm/#images",
      icon: ImageIcon,
      resourceLinks: []
    },
    "Crear una Storage Class y un volumen": {
      steps: [
        "Use la StorageClass 'longhorn' por defecto o cree una nueva.",
        "Establezca réplicas en 3 para HA.",
        "Cree un volumen y asígnelo a una VM."
      ],
      tip: "No reduzca las réplicas a 1 en entornos de producción.",
      dependencies: ["Nodos SDS saludables"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/storage/storage-class/",
      icon: Database,
      resourceLinks: []
    },
    "Crear una red VLAN en SUSE Virtualization": {
      steps: [
        "Cree la ClusterNetwork en Settings.",
        "Configure el NetworkConfig vinculado a las NICs físicas.",
        "Cree la red VM de tipo 'L2Vlan' con el ID correspondiente."
      ],
      tip: "El puerto del switch debe ser TRUNK para VLAN IDs distintos de 0.",
      dependencies: ["Soporte de switch 802.1Q"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/networking/harvester-network/",
      icon: Network,
      resourceLinks: []
    },
    "Crear una VM": {
      steps: [
        "Virtual Machines -> Create.",
        "Defina CPU, Memoria e Imagen de disco.",
        "Seleccione la red (Management o VLAN).",
        "Pegue su clave pública SSH."
      ],
      tip: "Use drivers VirtIO para máximo rendimiento.",
      dependencies: ["Imagen activa", "Red definida"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/create-vm/",
      icon: Monitor,
      resourceLinks: []
    },
    "Configurar un destino de respaldo": {
      steps: [
        "Settings -> Backup Target.",
        "Configure NFS o S3.",
        "Verifique que el estado sea 'Ready'."
      ],
      tip: "NFS v4 es la versión recomendada.",
      dependencies: ["Almacenamiento externo NFS/S3"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/storage/backup-target/",
      icon: Save,
      resourceLinks: []
    },
    "Configurar un script cloud-config de datos de usuario": {
      steps: [
        "Cree un Cloud Config Template.",
        "Use el formato YAML #cloud-config.",
        "Asigne el template al crear la VM."
      ],
      tip: "Use 'NoCloud' como fuente de datos en la mayoría de imágenes Linux.",
      dependencies: ["Conocimiento de YAML"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/create-vm/#advanced",
      icon: FileCode,
      resourceLinks: []
    },
    "Crear un respaldo de una VM": {
      steps: [
        "Asegure que the Backup Target esté activo.",
        "VM Menu -> Take Backup.",
        "Verifique en el menú 'Backups'."
      ],
      tip: "Los respaldos son externos; los snapshots son locales.",
      dependencies: ["Backup Target configurado"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/backup-restore/#taking-a-backup",
      icon: Database,
      resourceLinks: []
    },
    "Restaurar una VM desde un respaldo": {
      steps: [
        "Seleccione un respaldo saludable.",
        "Restore to a new VM.",
        "Verifique el inicio de la nueva VM."
      ],
      tip: "Puede restaurar sobre una VM existente para revertir cambios.",
      dependencies: ["Respaldo saludable"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/backup-restore/#restoring-from-a-backup",
      icon: RefreshCw,
      resourceLinks: []
    },
    "Realizar una migración en vivo de una VM (requiere multi-host)": {
      steps: [
        "Requiere al menos 2 nodos saludables.",
        "VM Menu -> Migrate.",
        "Monitoree hasta que el estado sea 'Running'."
      ],
      tip: "La migración requiere almacenamiento compartido (Longhorn).",
      dependencies: ["Clúster multi-nodo"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/live-migration/",
      icon: RefreshCw,
      resourceLinks: []
    },
    "Usar la consola serial/VNC de una VM": {
      steps: [
        "Abra el dashboard de VMs.",
        "Haga clic en 'Console' y elija VNC o Serial."
      ],
      tip: "Habilite la consola serial en el kernel invitado si es necesario.",
      dependencies: ["Acceso al VIP vía navegador"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/create-vm/#access-vm-via-console",
      icon: Terminal,
      resourceLinks: []
    },
    "Importar la clave SSH e acceder a una VM usando la clave (solo Linux)": {
      steps: [
        "Settings -> SSH Keys -> Create.",
        "Asigne la clave al crear la VM.",
        "Acceda vía SSH: ssh [user]@[VM_IP]."
      ],
      tip: "Asegúrese de que la imagen tenga cloud-init.",
      dependencies: ["Clave pública SSH"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/create-vm/#ssh-key",
      icon: Key,
      resourceLinks: []
    },
    "Gestión multi-cluster, multi-tenancy y soporte multi-disco": {
      steps: [
        "Añada discos secundarios en la pestaña 'Disks'.",
        "Use Namespaces para aislamiento.",
        "Importe en Rancher para gestión centralizada."
      ],
      tip: "Use discos separados para bases de datos pesadas.",
      dependencies: ["Integración con Rancher"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/create-vm/#disks",
      icon: HardDrive,
      resourceLinks: []
    },
    "Integración con Rancher. Provisionar un clúster RKE2 Kubernetes sobre SUSE Virtualization": {
      steps: [
        "Habilite el flag 'harvester' en Rancher.",
        "Importe el clúster en Virtualization Management.",
        "Cree Cloud Credentials y provisione el clúster RKE2."
      ],
      tip: "Verifique la confianza de certificados entre Rancher e Harvester.",
      dependencies: ["Rancher v2.8+", "VIP de Harvester funcional"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/rancher/rancher-integration/",
      icon: Cloud,
      resourceLinks: []
    }
  }
};
