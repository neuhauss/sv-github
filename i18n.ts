
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
        staticIp: "Static IP"
      },
      diagnostic: {
        title: "Diagnostic Tests",
        desc: "Verify that critical ports and download URLs are reachable from your workstation.",
        run: "Run Connectivity Suite",
        testing: "Testing..."
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
        staticIp: "IP Estático"
      },
      diagnostic: {
        title: "Testes de Diagnóstico",
        desc: "Verifique se as portas críticas e URLs de download estão acessíveis da sua estação.",
        run: "Executar Diagnóstico",
        testing: "Testando..."
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
      clientOrg: "Organización / Cliente",
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
        staticIp: "IP Estática"
      },
      diagnostic: {
        title: "Pruebas de Diagnóstico",
        desc: "Verifique que los puertos críticos y las URL de descarga sean accesibles desde su estación.",
        run: "Ejecutar Diagnóstico",
        testing: "Probando..."
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
      topology: "Diagrama de Topología Planificada",
      acceptance: "Formalización y Aceptación del Plan POC",
      authorized: "Representante Autorizado",
      generatedBy: "Documento generado electrónicamente mediante SUSE Virtualization Enterprise Planner.",
      aiTitle: "Exportar Contexto para IA",
      aiDesc: "Copie este prompt para ChatGPT o Claude.",
      aiPromptHeader: "Usted es un Arquitecto de Soluciones Senior que asiste en una Prueba de Concepto (POC) de SUSE Virtualization."
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
