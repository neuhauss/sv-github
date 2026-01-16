
import { Language } from './types';

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
    installation: {
      title: "Physical Installation Checklist",
      subtitle: "Follow this checklist during datacenter execution to ensure a production-ready baseline.",
      progress: "Overall Progress",
      pitfallLabel: "Common Pitfall / Attention",
      docsLink: "Consult Technical Documentation",
      validateLabel: "Troubleshooting / How to Validate",
      nextStep: "Next Step",
      nextStepDesc: "After completing this physical checklist, the node will reboot and the web dashboard will be available. Use the \"Validation\" menu to verify client functionality.",
      groups: [
        {
          title: "1. Installer Initialization",
          pitfall: "BIOS must have 'Secure Boot' disabled. Use UEFI instead of Legacy. If stalled at 'Loading initrd', verify CPU microcode/firmware is up to date.",
          steps: [
            { id: 'boot', label: 'ISO / USB Boot', description: 'Action: Insert bootable media and select UEFI boot from BIOS. Outcome: Harvester installer splash screen loads successfully.' },
            { id: 'mode', label: 'Installation Mode', description: 'Action: Choose \"Create a new cluster\" (1st node) or \"Join\" (others). Outcome: Logic for cluster genesis or expansion is established.' },
          ]
        },
        {
          title: "2. Storage & Persistence",
          pitfall: "Do not use SD cards or USB sticks for OS persistence. v1.7 requires SSD/NVMe. Ensure RAID controllers are in 'HBA' or 'JBOD' mode (Software RAID is not supported).",
          steps: [
            { id: 'disk', label: 'Disk Allocation', description: 'Action: Identify high-performance SSD/NVMe for OS and Data partitions. Outcome: Partitions for KubeVirt and Longhorn are defined.' },
          ]
        },
        {
          title: "3. Cluster Networking (1st Node)",
          pitfall: "The VIP and Node IP must reside in the same management subnet. Verify switch configuration allows gratuitous ARP for VIP transitions.",
          steps: [
            { id: 'vip', label: 'Cluster VIP Assignment', description: 'Action: Assign a dedicated static IP for the Cluster VIP. Outcome: Unified access point for the dashboard is established.' },
            { id: 'token', label: 'Security Cluster Token', description: 'Action: Define a secure token for node admission. Outcome: Encryption secret for secure cluster joining is generated.' },
          ]
        },
        {
          title: "4. Post-Reboot Service Health",
          pitfall: "If the dashboard takes >10min to load, pods in 'harvester-system' may be failing due to resource constraints or DNS issues.",
          steps: [
            { id: 'webui', label: 'HTTPS Dashboard Access', description: 'Action: Navigate to https://[VIP] in your browser. Outcome: Secure Harvester login interface is rendered.' },
            { id: 'pods', label: 'Critical Pod Status', description: 'Action: Verify all pods via SSH (kubectl get pods -A). Outcome: Every harvester-system pod is in \"Running\" state.' },
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
      rancher: {
        title: "Rancher Manager Integration",
        subtitle: "Rancher v2.8+ acts as the centralized control plane for Harvester virtualization and RKE2 clusters.",
        step1: "Enable Virtualization Dashboard",
        step1Desc: "In Rancher, virtualization management is a feature flag. You must enable it to see the 'Virtualization Management' menu.",
        step2: "Import Harvester Cluster",
        step2Desc: "Import your Harvester cluster so Rancher can orchestrate VMs and Cloud Credentials.",
        step3: "Cloud Credentials & RKE2",
        step3Desc: "Create cloud credentials to allow Rancher to automatically create the VMs for your new Kubernetes cluster."
      }
    },
    shell: {
      title: "Shell Toolbox",
      subtitle: "Access nodes via SSH and use the following commands for validation and troubleshooting.",
      categories: {
        bench: "Benchmarking (Etcd Performance)",
        storage: "Longhorn Storage Troubleshooting",
        diag: "Diagnosis & Support (Evidence)",
        net: "Network & Connectivity",
        health: "Node Health Check"
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
    installation: {
      title: "Checklist de Instalação Física",
      subtitle: "Siga este checklist durante a execução em datacenter para garantir uma base pronta para produção.",
      progress: "Progresso Geral",
      pitfallLabel: "Atenção / Armadilha Comum",
      docsLink: "Consultar Documentação Técnica",
      validateLabel: "Troubleshooting / Como Validar",
      nextStep: "Próximo Passo",
      nextStepDesc: "Após concluir este checklist físico, o nó irá reiniciar e o dashboard web estará disponível. Use o menu \"Validação\" para verificar as funcionalidades do cliente.",
      groups: [
        {
          title: "1. Inicialização do Instalador",
          pitfall: "O BIOS deve ter 'Secure Boot' desativado. Use UEFI em vez de Legacy. Se travar em 'Loading initrd', verifique se o firmware da CPU está atualizado.",
          steps: [
            { id: 'boot', label: 'Boot via ISO / USB', description: 'Ação: Insira a mídia bootável e selecione boot UEFI no BIOS. Resultado: A tela inicial do instalador Harvester carrega com sucesso.' },
            { id: 'mode', label: 'Modo de Instalação', description: 'Ação: Escolha \"Create a new cluster\" (1º nó) ou \"Join\" (outros). Resultado: A lógica de gênese ou expansão do cluster é definida.' },
          ]
        },
        {
          title: "2. Armazenamento e Persistência",
          pitfall: "Não use cartões SD ou pendrives para persistência do SO. v1.7 exige SSD/NVMe. Certifique-se que controladoras RAID estão em modo 'HBA' ou 'JBOD'.",
          steps: [
            { id: 'disk', label: 'Alocação de Discos', description: 'Ação: Identifique SSD/NVMe de alta performance para partições de SO e Dados. Resultado: Partições para KubeVirt e Longhorn são preparadas.' },
          ]
        },
        {
          title: "3. Rede do Cluster (1º Nó)",
          pitfall: "O VIP e o IP do Nó devem estar na mesma subnet de gerência. Verifique se o switch permite gratuitous ARP para transições de VIP.",
          steps: [
            { id: 'vip', label: 'Atribuição de Cluster VIP', description: 'Ação: Atribua um IP estático dedicado para o VIP do Cluster. Resultado: O ponto unificado de acesso ao dashboard é estabelecido.' },
            { id: 'token', label: 'Token de Segurança do Cluster', description: 'Ação: Defina um token seguro para admissão de nós. Resultado: O segredo de criptografia para junção segura é gerado.' },
          ]
        },
        {
          title: "4. Saúde pós-Reboot",
          pitfall: "Se o dashboard demorar >10min, pods em 'harvester-system' podem estar falhando por falta de recursos ou DNS.",
          steps: [
            { id: 'webui', label: 'Acesso ao Dashboard HTTPS', description: 'Ação: Navegue para https://[VIP] no seu navegador. Resultado: A interface de login segura do Harvester é renderizada.' },
            { id: 'pods', label: 'Status de Pods Críticos', description: 'Ação: Verifique todos os pods via SSH (kubectl get pods -A). Resultado: Todos os pods do harvester-system estão em estado \"Running\".' },
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
        troubleshooting: "Troubleshooting"
      },
      overview: {
        title: "Documentação Técnica v1.7",
        subtitle: "Este guia centraliza os procedimentos oficiais para a implementação do SUSE Virtualization (Harvester).",
        hciTitle: "HCI Moderno",
        hciDesc: "Infraestrutura Hiperconvergente 100% open-source baseada em KubeVirt e Longhorn.",
        prodTitle: "Pronto para Produção",
        prodDesc: "Alta disponibilidade nativa e integração direta com Rancher para gestão multicluster."
      },
      rancher: {
        title: "Integração com Rancher Manager",
        subtitle: "O Rancher v2.8+ atua como plano de controle centralizado para virtualização Harvester e clusters RKE2.",
        step1: "Habilitar Dashboard de Virtualização",
        step1Desc: "No Rancher, a gestão de virtualização é uma feature flag. Você deve ativá-la para ver o menu 'Virtualization Management'.",
        step2: "Importar Cluster Harvester",
        step2Desc: "Importe o seu cluster Harvester para que o Rancher possa orquestrar VMs e Cloud Credentials.",
        step3: "Cloud Credentials & RKE2",
        step3Desc: "Crie credenciais de nuvem para permitir que o Rancher crie automaticamente as VMs para seu novo cluster Kubernetes."
      }
    },
    shell: {
      title: "Shell Toolbox",
      subtitle: "Acesse os nós via SSH e use os comandos abaixo para validação e troubleshooting.",
      categories: {
        bench: "Benchmarking (Etcd Performance)",
        storage: "Troubleshooting Longhorn Storage",
        diag: "Diagnóstico & Suporte (Evidências)",
        net: "Rede & Conectividade",
        health: "Health Check do Nó"
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
      planningMode: "Modo de Planificación",
      enterprisePlanner: "Planificador Enterprise Harvester v1.7",
      required: "Obligatorio",
      completed: "Completado",
      pending: "Pendiente",
      reference: "Referencia",
      expertTip: "Consejo de Experto",
      techDependencies: "Dependencias Técnicas",
      resourceLinks: "Enlaces de Recursos",
      officialDocs: "Documentación Oficial",
      copy: "Copiar",
      copied: "¡Copiado!",
      print: "Imprimir Informe / PDF",
      exportJson: "Exportar JSON",
      aiContext: "Contexto para IA",
      newProject: "Nueva Planificación"
    },
    dashboard: {
      welcome: "Bienvenido a SUSE Virtualization",
      subtitle: "Este asistente le guía a través de la planificación, instalación y validación de su POC.",
      import: "Importar Proyecto (JSON)",
      reportTitle: "Generar Informe Final de la POC",
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
      title: "Proyecto y Objetivos de la POC",
      subtitle: "Defina los parámetros base para la validación.",
      projectName: "Nombre del Proyecto / POC",
      projectPlaceholder: "Ej: Migración de Datacenter Core v1.7",
      leadTitle: "Líder Técnico SUSE/Socio",
      leadName: "Ingeniero Responsable",
      leadEmail: "Correo Corporativo",
      clientTitle: "Información del Cliente",
      clientOrg: "Organization / Cliente",
      clientContact: "Punto de Contacto",
      clientPhone: "Teléfono",
      scheduleTitle: "Cronograma Previsto",
      startDate: "Fecha de Inicio",
      targetDate: "Meta de Finalización",
      goalsTitle: "Objetivos de la POC",
      goalsSubtitle: "Seleccione los criterios de éxito a validar.",
      selectAll: "Seleccionar Todos",
      clearAll: "Limpiar Selección",
      goalRequired: "Seleccione al menos un objetivo."
    },
    hardware: {
        title: "Validación de Hardware v1.7",
        profile: "Perfil Enterprise",
        nodes: "Nodos Físicos",
        cores: "Cores por Nodo",
        ram: "RAM GB por Nodo",
        gpu: "Aceleración GPU (AI Readiness)",
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
        addressing: "Parámetros Globales",
        nodes: "Inventario de IPs",
        connectivity: "Suite de Conectividad"
      },
      labels: {
        vip: "IP Virtual del Clúster (VIP)",
        cidr: "CIDR de Gestión",
        gateway: "Puerta de Enlace IP",
        vlan: "ID de VLAN (Opcional)",
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
      title: "Checklist de Instalación Física",
      subtitle: "Siga esta lista durante la ejecución en el centro de datos para garantizar una línea base lista para producción.",
      progress: "Progreso General",
      pitfallLabel: "Atención / Error Común",
      docsLink: "Consultar Documentación Técnica",
      validateLabel: "Troubleshooting / Cómo Validar",
      nextStep: "Próximo Paso",
      nextStepDesc: "Después de completar esta lista física, el nodo se reiniciará y el panel web estará disponible. Use el menú \"Validación\" para verificar la funcionalidad del cliente.",
      groups: [
        {
          title: "1. Inicialización del Instalador",
          pitfall: "BIOS debe tener 'Secure Boot' desactivado. Use UEFI en lugar de Legacy. Si se detiene en 'Loading initrd', verifique que el firmware de la CPU esté actualizado.",
          steps: [
            { id: 'boot', label: 'Arranque ISO / USB', description: 'Acción: Inserte el medio de arranque y seleccione el arranque UEFI en el BIOS. Resultado: La pantalla de bienvenida del instalador de Harvester se carga correctamente.' },
            { id: 'mode', label: 'Modo de Instalación', description: 'Acción: Elija \"Create a new cluster\" (1er nodo) o \"Join\" (otros). Resultado: Se establece la lógica para la génesis o expansión del clúster.' },
          ]
        },
        {
          title: "2. Almacenamiento y Persistencia",
          pitfall: "No use tarjetas SD o memorias USB para la persistencia del SO. v1.7 requiere SSD/NVMe. Asegúrese de que las controladoras RAID estén en modo 'HBA' o 'JBOD'.",
          steps: [
            { id: 'disk', label: 'Asignación de Discos', description: 'Acción: Identifique SSD/NVMe de alto rendimiento para las particiones de SO y Datos. Resultado: Se definen las particiones para KubeVirt y Longhorn.' },
          ]
        },
        {
          title: "3. Red del Clúster (1er Nodo)",
          pitfall: "La VIP y la IP del nodo deben estar en la misma subred de gestión. Verifique que la configuración del switch permita ARP gratuito para las transiciones de VIP.",
          steps: [
            { id: 'vip', label: 'Asignación de Cluster VIP', description: 'Acción: Asigne una IP estática dedicada para la VIP del clúster. Resultado: Se establece el punto de acceso unificado para el panel.' },
            { id: 'token', label: 'Token de Seguridad del Clúster', description: 'Acción: Defina un token seguro para la admisión de nodos. Resultado: Se genera el secreto de cifrado para la unión segura de nodos.' },
          ]
        },
        {
          title: "4. Salud post-Reinicio",
          pitfall: "Si el panel tarda >10 min en cargar, los pods en 'harvester-system' pueden estar fallando debido a límites de recursos o DNS.",
          steps: [
            { id: 'webui', label: 'Acceso al Panel HTTPS', description: 'Acción: Navegue a https://[VIP] en su navegador. Resultado: Se renderiza la interfaz de inicio de sesión segura de Harvester.' },
            { id: 'pods', label: 'Estado de Pods Críticos', description: 'Acción: Verifique todos los pods vía SSH (kubectl get pods -A). Resultado: Todos los pods de harvester-system están en estado \"Running\".' },
          ]
        }
      ]
    },
    installGuide: {
      sections: {
        overview: "Visión Geral",
        planning: "Planificación",
        install: "Instalación (ISO)",
        config: "Configuración Inicial",
        storage: "Almacenamiento",
        pocGoals: "Procedimientos POC",
        rancher: "Integración Rancher",
        troubleshooting: "Solución de Problemas"
      },
      overview: {
        title: "Documentación Técnica v1.7",
        subtitle: "Esta guía centraliza los procedimientos oficiales para la implementación de SUSE Virtualization (Harvester).",
        hciTitle: "HCI Moderno",
        hciDesc: "Infraestructura Hiperconvergente 100% de código abierto basada en KubeVirt y Longhorn.",
        prodTitle: "Listo para Producción",
        prodDesc: "Alta disponibilidad nativa e integración directa con Rancher para gestión multicluster."
      },
      rancher: {
        title: "Integración con Rancher Manager",
        subtitle: "Rancher v2.8+ actúa como plano de control centralizado para la virtualización de Harvester y clusters RKE2.",
        step1: "Habilitar Panel de Virtualización",
        step1Desc: "En Rancher, la gestión de la virtualización es una feature flag. Debe activarla para ver el menú 'Virtualization Management'.",
        step2: "Importar Cluster Harvester",
        step2Desc: "Importe su clúster Harvester para que Rancher pueda orquestar máquinas virtuales y credenciales de nube.",
        step3: "Cloud Credentials y RKE2",
        step3Desc: "Cree credenciales de nube para permitir que Rancher cree automáticamente las VM para su nuevo clúster de Kubernetes."
      }
    },
    shell: {
      title: "Caja de Herramientas Shell",
      subtitle: "Acceda a los nodos vía SSH y use los comandos para validación y resolución de problemas.",
      categories: {
        bench: "Benchmarking (Rendimiento Etcd)",
        storage: "Resolución de Almacenamiento Longhorn",
        diag: "Diagnóstico y Soporte (Evidencias)",
        net: "Red y Conectividade",
        health: "Chequeo de Salud del Nodo"
      }
    },
    testPlan: {
      title: "Plan de Pruebas y Aceptación",
      subtitle: "Mapeo de resultados basado en los objetivos seleccionados.",
      summary: {
        planned: "Total Planificado",
        success: "Éxito (Pass)",
        fail: "Fallos (Fail)"
      },
      table: {
        criteria: "Criterios de Éxito",
        procedure: "Procedimiento Técnico",
        expected: "Resultado Esperado",
        validate: "Validar"
      }
    },
    summary: {
      execSummary: "Resumen Ejecutivo de Infraestructura Hiperconvergente (HCI) v1.7",
      stakeholders: "Partes Interesadas y Cronograma",
      techDetails: "Detalles de Configuración Técnica",
      topology: "Diagrama de Topología Planejada",
      acceptance: "Formalización y Aceptación del Plan POC",
      authorized: "Representante Autorizado",
      generatedBy: "Documento generado electrónicamente mediante SUSE Virtualization Enterprise Planner.",
      aiTitle: "Exportar Contexto para IA",
      aiDesc: "Copie este prompt para ChatGPT o Claude.",
      aiPromptHeader: "Usted es un Arquitecto de Solucciones Senior que asiste en una Prueba de Concepto (POC) de SUSE Virtualization."
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
    "Importar la clave SSH y acceder a una VM usando la clave (solo Linux)",
    "Gestión multi-cluster, multi-tenancy y soporte multi-disco",
    "Integración con Rancher. Provisionar un cluster RKE2 Kubernetes sobre SUSE Virtualization"
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
    // ... more test cases
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
        "Prepare a bootable USB drive with the Harvester v1.7 ISO.",
        "On the first node, select 'Create a new Harvester cluster'.",
        "Configure the cluster VIP, static node IP, and Gateway according to the planning.",
        "For nodes 2 and 3, select 'Join an existing cluster' and enter the VIP and Cluster Token generated by the first node.",
        "Wait for reboot and the final screen with the Dashboard access URL."
      ],
      tip: "If using IPMI, ensure that Virtual Media does not have high latency, as this can corrupt the installation.",
      dependencies: ["VT-x/AMD-V enabled hardware", "Minimum 8GB USB drive", "IPMI/iDRAC access"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/install/iso-install/",
      resourceLinks: [
        { label: "Download Harvester ISO v1.7", url: "https://harvesterhci.io/releases" },
        { label: "Hardware Requirements Guide", url: "https://docs.harvesterhci.io/v1.7/install/requirements/" }
      ]
    },
    "Register an image to use for VMs": {
      steps: [
        "Go to 'Images' in the side menu and click 'Create'.",
        "Use 'Download from URL' for performance or 'Upload' for local files.",
        "Enter the name (e.g., openSUSE-Leap-15.5) and the Cloud image URL.",
        "Wait for status to change from 'Downloading' to 'Active'."
      ],
      tip: "Cloud Images (.qcow2) are preferred as they allow Cloud-Init to inject SSH keys automatically.",
      dependencies: ["Cluster external connectivity", "qcow2, raw or img format image"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/create-vm/#images",
      resourceLinks: [
        { label: "openSUSE Leap 15.5 Cloud Images", url: "https://download.opensuse.org/repositories/Cloud:/Images:/Leap_15.5/images/" },
        { label: "SLES 15 SP5 Cloud Images (Trial)", url: "https://www.suse.com/download/sles/" }
      ]
    }
  },
  pt: {
    "Provisionar hosts através do instalador ISO": {
      steps: [
        "Prepare um pendrive bootável com a ISO do Harvester v1.7.",
        "No primeiro nó, escolha 'Create a new Harvester cluster'.",
        "Configure o VIP do cluster, IP estático do nó e Gateway conforme o planejamento.",
        "Para os nós 2 e 3, escolha 'Join an existing cluster' e insira o VIP e o Cluster Token gerado pelo primeiro nó.",
        "Aguarde o reboot e a tela final com a URL de acesso ao Dashboard."
      ],
      tip: "Se usar IPMI, certifique-se que o Virtual Media não tenha latência alta, pois isso pode corromper a instalação.",
      dependencies: ["Hardware com VT-x/AMD-V habilitado", "Pendrive de no mínimo 8GB", "Acesso IPMI/iDRAC"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/install/iso-install/",
      resourceLinks: [
        { label: "Download Harvester ISO v1.7", url: "https://harvesterhci.io/releases" },
        { label: "Guia de Requisitos de Hardware", url: "https://docs.harvesterhci.io/v1.7/install/requirements/" }
      ]
    },
    "Registrar uma imagem para uso em VMs": {
      steps: [
        "Acesse 'Images' no menu lateral e clique em 'Create'.",
        "Utilize a opção 'Download from URL' para performance ou 'Upload' para arquivos locais.",
        "Insira o nome (ex: openSUSE-Leap-15.5) e a URL da imagem Cloud.",
        "Aguarde o status mudar de 'Downloading' para 'Active'."
      ],
      tip: "Imagens Cloud (.qcow2) são preferíveis pois permitem o uso de Cloud-Init para injetar chaves SSH automaticamente.",
      dependencies: ["Conectividade externa do cluster", "Imagem no formato qcow2, raw ou img"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/create-vm/#images",
      resourceLinks: [
        { label: "openSUSE Leap 15.5 Cloud Images", url: "https://download.opensuse.org/repositories/Cloud:/Images:/Leap_15.5/images/" },
        { label: "SLES 15 SP5 Cloud Images (Trial)", url: "https://www.suse.com/download/sles/" }
      ]
    }
  },
  es: {
    "Provisionar hosts mediante el instalador ISO": {
      steps: [
        "Prepare una unidad USB de arranque con la ISO de Harvester v1.7.",
        "En el primer nodo, seleccione 'Create a new Harvester cluster'.",
        "Configure la VIP del clúster, la IP estática del nodo y la puerta de enlace según la planificación.",
        "Para los nodos 2 y 3, seleccione 'Join an existing cluster' e ingrese la VIP y el Token del clúster generado por el primer nodo.",
        "Espere el reinicio y la pantalla final con la URL de acceso al panel."
      ],
      tip: "Si usa IPMI, asegúrese de que Virtual Media no tenga una latencia alta, ya que esto puede corromper la instalación.",
      dependencies: ["Hardware con VT-x/AMD-V habilitado", "Unidad USB de mínimo 8GB", "Acceso IPMI/iDRAC"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/install/iso-install/",
      resourceLinks: [
        { label: "Descargar Harvester ISO v1.7", url: "https://harvesterhci.io/releases" },
        { label: "Guía de requisitos de hardware", url: "https://docs.harvesterhci.io/v1.7/install/requirements/" }
      ]
    },
    "Registrar una imagen para usar en máquinas virtuales": {
      steps: [
        "Vaya a 'Images' en el menú lateral y haga clic en 'Create'.",
        "Use 'Download from URL' para el rendimiento o 'Upload' para archivos locales.",
        "Ingrese el nombre (ej., openSUSE-Leap-15.5) e la URL de la imagen Cloud.",
        "Espere a que el estado cambie de 'Downloading' a 'Active'."
      ],
      tip: "Se prefieren las imágenes Cloud (.qcow2) ya que permiten que Cloud-Init inyecte claves SSH automáticamente.",
      dependencies: ["Conectividad externa del clúster", "Imagen en formato qcow2, raw o img"],
      docsUrl: "https://docs.harvesterhci.io/v1.7/vm/create-vm/#images",
      resourceLinks: [
        { label: "Imágenes Cloud openSUSE Leap 15.5", url: "https://download.opensuse.org/repositories/Cloud:/Images:/Leap_15.5/images/" },
        { label: "Imágenes Cloud SLES 15 SP5 (Prueba)", url: "https://www.suse.com/download/sles/" }
      ]
    }
  }
};
