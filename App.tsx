
import React, { useState, useEffect, useRef } from 'react';
import { POCStep, POCData, HardwareSpecs, NetworkSpecs, CloudInitConfig } from './types';
import { PocDetailsForm } from './components/PocDetailsForm';
import { HardwareValidation } from './components/HardwareValidation';
import { NetworkValidation } from './components/NetworkValidation';
import { ArchitecturePreview } from './components/ArchitecturePreview';
import { InstallationChecklist } from './components/InstallationChecklist';
import { InitialConfig } from './components/InitialConfig';
import { CloudInitGenerator } from './components/CloudInitGenerator';
import { InstallGuide } from './components/InstallGuide';
import { ShellToolbox } from './components/ShellToolbox';
import { TestPlan } from './components/TestPlan';
import { Summary } from './components/Summary';
import { DashboardMenu } from './components/DashboardMenu';
import { Button } from './components/ui/Button';
import { LayoutTemplate, ArrowLeft, Home, Check, Upload, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<POCStep>(POCStep.DASHBOARD);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [pocData, setPocData] = useState<POCData>({
    projectName: '',
    leadEngineer: '',
    leadEmail: '',
    organization: '',
    clientOrganization: '',
    clientContactName: '',
    clientContactRole: '',
    clientContactEmail: '',
    clientContactPhone: '',
    startDate: new Date().toISOString().split('T')[0],
    targetDate: '',
    goals: []
  });

  const [hwSpecs, setHwSpecs] = useState<HardwareSpecs>({
    cpuCores: 16,
    ramGb: 64,
    diskGb: 500,
    diskType: 'SSD',
    networkSpeedGb: 10,
    nodeCount: 3,
    hasGpu: false
  });

  const [netSpecs, setNetSpecs] = useState<NetworkSpecs>({
    managementCidr: '',
    subnetMask: '255.255.255.0',
    gatewayIp: '',
    clusterVip: '',
    dnsServers: '8.8.8.8, 1.1.1.1',
    ntpServers: 'pool.ntp.org',
    vlanId: '',
    nodes: Array.from({ length: 3 }, (_, i) => ({ name: `node-${i + 1}`, ip: '', role: 'Hybrid' })),
    ipPools: [],
    hasFirewall: true,
    hasProxy: false,
    hasAirGap: false,
    hasExternalStorage: false,
    hasRancher: false,
    hasLoadBalancer: true
  });

  const [cloudInitConfig, setCloudInitConfig] = useState<CloudInitConfig>({
    user: 'opensuse',
    password: '',
    sshKeys: [],
    packages: ['curl', 'wget', 'vim'],
    runCmds: [],
    writeFiles: [],
    timezone: 'UTC',
    hostnamePattern: 'node-{dsp}',
    locale: 'en_US.UTF-8',
    mounts: [],
    networkInterfaces: []
  });

  const [status, setStatus] = useState({ details: false, hardware: true, network: false, install: false, config: false });

  const goHome = () => setCurrentStep(POCStep.DASHBOARD);

  const renderContent = () => {
    switch (currentStep) {
        case POCStep.DASHBOARD:
            return <DashboardMenu onSelectStep={setCurrentStep} onImport={() => {}} status={status} />;
        case POCStep.POC_DETAILS:
            return <PocDetailsForm data={pocData} updateData={(d) => setPocData({...pocData, ...d})} />;
        case POCStep.HARDWARE_VALIDATION:
            return <HardwareValidation specs={hwSpecs} updateSpecs={(d) => setHwSpecs({...hwSpecs, ...d})} onValidationChange={(s) => setStatus({...status, hardware: s.isValid})} />;
        case POCStep.NETWORK_CONFIG:
            return <NetworkValidation specs={netSpecs} updateSpecs={(d) => setNetSpecs({...netSpecs, ...d})} onValidationChange={(s) => setStatus({...status, network: s.isValid})} nodeCount={hwSpecs.nodeCount} />;
        case POCStep.INSTALL_GUIDE:
            return <InstallGuide netSpecs={netSpecs} goals={pocData.goals} />;
        case POCStep.SHELL_TOOLBOX:
            return <ShellToolbox />;
        case POCStep.TEST_PLAN:
            return <TestPlan goals={pocData.goals} />;
        case POCStep.INITIAL_CONFIG:
            return <InitialConfig onComplete={(s) => setStatus({...status, config: s})} goals={pocData.goals} netSpecs={netSpecs} />;
        case POCStep.CLOUD_INIT_CRD:
            return <CloudInitGenerator config={cloudInitConfig} updateConfig={setCloudInitConfig} onComplete={goHome} hwSpecs={hwSpecs} netSpecs={netSpecs} />;
        case POCStep.COMPLETED:
            return <Summary pocData={pocData} specs={hwSpecs} netSpecs={netSpecs} cloudInitConfig={cloudInitConfig} onReset={goHome} />;
        default:
            return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
      <header className="bg-suse-dark text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={goHome}>
            <LayoutTemplate className="w-6 h-6 text-suse-base" />
            <div>
              <h1 className="text-lg font-bold">SUSE Virtualization</h1>
              <p className="text-[9px] text-suse-light uppercase tracking-widest font-bold">v1.7 Enterprise Readiness</p>
            </div>
          </div>
          <Button variant="secondary" onClick={goHome} className="text-xs px-4 py-2 bg-white/10 rounded-full">
            <Home className="w-3.5 h-3.5" /> <span>Dashboard</span>
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
