
export type Language = 'en' | 'pt' | 'es';

export enum POCStep {
  DASHBOARD = -1,
  POC_DETAILS = 0,
  HARDWARE_VALIDATION = 1,
  NETWORK_CONFIG = 2,
  ARCHITECTURE_PREVIEW = 3,
  INSTALLATION_PROCESS = 4,
  INITIAL_CONFIG = 5,
  CLOUD_INIT_CRD = 6,
  INSTALL_GUIDE = 7,
  SHELL_TOOLBOX = 8,
  TEST_PLAN = 9,
  COMPLETED = 10,
  AI_ASSISTANT = 11
}

export interface POCData {
  projectName: string;
  leadEngineer: string;
  leadEmail: string;
  organization: string;
  clientOrganization: string;
  clientContactName: string;
  clientContactRole: string;
  clientContactEmail: string;
  clientContactPhone: string;
  startDate: string;
  targetDate: string;
  goals: string[];
}

export interface DiscoveryData {
  general: {
    subscription: string;
    vcfRunning: string;
    deployedByVcf: string;
    vcfVersion: string;
    vvfStorage: string;
    vsanOption: string;
    stretchedCluster: string;
    tanzuUsed: string;
    workloads: string[];
  };
  human: {
    operatorsCount: string;
    responsibilities: string[];
    kubernetesSkills: string;
  };
  compute: {
    vendors: string[];
    generation: string;
    cpuArch: string;
    gpuModels: string;
    localStorage: string;
    vcenterIntegrations: string[];
    criticalWorkloads: string;
    overcommitRatio: string;
  };
  storage: {
    transports: string[];
    platforms: string[];
    provisioningMethod: string;
    automationTools: string[];
    managementLocation: string;
    performanceTiers: string;
  };
  network: {
    vendors: string[];
    functionsRequired: string[];
    nsxUsage: string;
    policyManagement: string;
    isolation: string;
    speeds: string[];
  };
  backup: {
    solution: string;
    coverage: string;
    vcenterIntegration: string;
    protectKubernetes: string;
  };
  dr: {
    concept: string;
    haArchitecture: string;
    drSolution: string;
    testedRegularly: string;
    rpoRtoDefined: string;
  };
  automation: {
    provisioningMethod: string[];
    toolsUsed: string[];
    traceableChanges: string;
  };
  observability: {
    monitoringTools: string[];
    loggingTools: string[];
    strategy: string;
  };
}

export interface HardwareSpecs {
  cpuCores: number;
  ramGb: number;
  diskGb: number;
  diskType: 'SSD' | 'HDD' | 'NVMe';
  networkSpeedGb: number;
  nodeCount: number;
  hasGpu: boolean;
  gpuType?: string;
}

export interface NodeNetworkConfig {
  name: string;
  ip: string;
  role: 'Master' | 'Worker' | 'Hybrid';
}

export interface IpPool {
  name: string;
  subnet: string;
  rangeStart: string;
  rangeEnd: string;
}

export interface NetworkSpecs {
  managementCidr: string;
  subnetMask: string;
  gatewayIp: string;
  clusterVip: string;
  dnsServers: string;
  ntpServers: string;
  vlanId: string;
  httpProxy?: string;
  httpsProxy?: string;
  noProxy?: string;
  nodes: NodeNetworkConfig[];
  ipPools: IpPool[];
  // Topology Flags
  hasFirewall: boolean;
  hasProxy: boolean;
  hasAirGap: boolean;
  hasExternalStorage: boolean;
  hasRancher: boolean;
  hasLoadBalancer: boolean;
}

export interface MountPoint {
  device: string;
  mountPath: string;
  fsType: string;
}

export interface NetworkInterface {
  name: string;
  dhcp: boolean;
  ip?: string;
  gateway?: string;
  nameservers?: string;
}

export interface CloudInitConfig {
  user: string;
  password?: string;
  sshKeys: string[];
  packages: string[];
  runCmds: string[];
  bootCmds: string[];
  writeFiles: { path: string; content: string; permissions: string }[];
  timezone: string;
  hostnamePattern: string;
  locale: string;
  mounts: MountPoint[];
  networkInterfaces: NetworkInterface[];
}

export interface ValidationStatus {
  isValid: boolean;
  messages: string[];
}

export interface ChecklistItem {
  id: string;
  label: string;
  description?: string;
  details?: string;
  checked: boolean;
}

export interface ArchitectureExtras {
  hasFirewall: boolean;
  hasProxy: boolean;
  hasAirGap: boolean;
  hasExternalStorage: boolean;
  hasRancher: boolean;
  hasLoadBalancer: boolean;
}
