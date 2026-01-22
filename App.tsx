
import React, { useState, useMemo } from 'react';
import { POCStep, POCData, DiscoveryData, HardwareSpecs, NetworkSpecs, CloudInitConfig, Language } from './types';
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
import { GeminiAssistant } from './components/GeminiAssistant';
import { Button } from './components/ui/Button';
import { translations } from './i18n';
import { 
  LayoutTemplate, 
  Home, 
  ClipboardList, 
  Server, 
  Network, 
  Terminal, 
  BookOpen, 
  FileCode, 
  CheckSquare, 
  Target, 
  FileText,
  ChevronRight,
  CheckCircle2,
  ChevronLeft,
  Settings,
  Activity,
  Zap,
  Eye,
  Globe
} from 'lucide-react';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [currentStep, setCurrentStep] = useState<POCStep>(POCStep.DASHBOARD);
  const [testResults, setTestResults] = useState<Record<string, 'pass' | 'fail' | 'pending'>>({});
  
  const t = useMemo(() => translations[lang], [lang]);

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

  const [discoveryData, setDiscoveryData] = useState<DiscoveryData>({
    general: { subscription: '', vcfRunning: '', deployedByVcf: '', vcfVersion: '', vvfStorage: '', vsanOption: '', stretchedCluster: '', tanzuUsed: '', workloads: [] },
    human: { operatorsCount: '', responsibilities: [], kubernetesSkills: '' },
    compute: { vendors: [], generation: '', cpuArch: '', gpuModels: '', localStorage: '', vcenterIntegrations: [], criticalWorkloads: '', overcommitRatio: '' },
    storage: { transports: [], platforms: [], provisioningMethod: '', automationTools: [], managementLocation: '', performanceTiers: '' },
    network: { vendors: [], functionsRequired: [], nsxUsage: '', policyManagement: '', isolation: '', speeds: [] },
    backup: { solution: '', coverage: '', vcenterIntegration: '', protectKubernetes: '' },
    dr: { concept: '', haArchitecture: '', drSolution: '', testedRegularly: '', rpoRtoDefined: '' },
    automation: { provisioningMethod: [], toolsUsed: [], traceableChanges: '' },
    observability: { monitoringTools: [], loggingTools: [], strategy: '' }
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
    managementCidr: '192.168.1.0/24',
    subnetMask: '255.255.255.0',
    gatewayIp: '192.168.1.1',
    clusterVip: '192.168.1.10',
    dnsServers: '8.8.8.8, 1.1.1.1',
    ntpServers: 'pool.ntp.org',
    vlanId: '',
    nodes: Array.from({ length: 3 }, (_, i) => ({ name: `node-${i + 1}`, ip: `192.168.1.1${i+1}`, role: 'Hybrid' })),
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
    bootCmds: [],
    writeFiles: [],
    timezone: 'UTC',
    hostnamePattern: 'node-{dsp}',
    locale: 'en_US.UTF-8',
    mounts: [],
    networkInterfaces: []
  });

  const [status, setStatus] = useState({ 
    details: false, 
    hardware: true, 
    network: true, 
    install: true, 
    config: false 
  });

  const stepsOrder = [
    POCStep.POC_DETAILS,
    POCStep.HARDWARE_VALIDATION,
    POCStep.NETWORK_CONFIG,
    POCStep.ARCHITECTURE_PREVIEW,
    POCStep.INSTALLATION_PROCESS,
    POCStep.CLOUD_INIT_CRD,
    POCStep.INITIAL_CONFIG,
    POCStep.TEST_PLAN,
    POCStep.COMPLETED
  ];

  const goHome = () => setCurrentStep(POCStep.DASHBOARD);

  const handleNext = () => {
    const currentIndex = stepsOrder.indexOf(currentStep);
    if (currentIndex < stepsOrder.length - 1) {
      setCurrentStep(stepsOrder[currentIndex + 1]);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    const currentIndex = stepsOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepsOrder[currentIndex - 1]);
      window.scrollTo(0, 0);
    } else {
      goHome();
    }
  };

  const handleImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        if (json.pocData) setPocData(json.pocData);
        if (json.discoveryData) setDiscoveryData(json.discoveryData);
        if (json.hwSpecs) setHwSpecs(json.hwSpecs);
        if (json.netSpecs) setNetSpecs(json.netSpecs);
        if (json.cloudInitConfig) setCloudInitConfig(json.cloudInitConfig);
        if (json.testResults) setTestResults(json.testResults);
        if (json.status) setStatus(json.status);
        alert(lang === 'pt' ? 'Projeto importado com sucesso!' : 'Project imported successfully!');
      } catch (err) {
        alert('Invalid JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const navigationItems = [
    { step: POCStep.POC_DETAILS, label: t.nav.project, icon: <ClipboardList className="w-4 h-4" />, statusKey: 'details' },
    { step: POCStep.HARDWARE_VALIDATION, label: t.nav.hardware, icon: <Server className="w-4 h-4" />, statusKey: 'hardware' },
    { step: POCStep.NETWORK_CONFIG, label: t.nav.network, icon: <Network className="w-4 h-4" />, statusKey: 'network' },
    { step: POCStep.ARCHITECTURE_PREVIEW, label: t.nav.topology, icon: <Eye className="w-4 h-4" />, statusKey: null },
    { step: POCStep.INSTALLATION_PROCESS, label: t.nav.installation, icon: <Zap className="w-4 h-4" />, statusKey: 'install' },
    { step: POCStep.CLOUD_INIT_CRD, label: t.nav.automation, icon: <FileCode className="w-4 h-4" />, statusKey: null },
    { step: POCStep.INITIAL_CONFIG, label: t.nav.validation, icon: <Target className="w-4 h-4" />, statusKey: 'config' },
    { step: POCStep.TEST_PLAN, label: t.nav.tests, icon: <CheckSquare className="w-4 h-4" />, statusKey: null },
    { step: POCStep.COMPLETED, label: t.nav.report, icon: <FileText className="w-4 h-4" />, statusKey: null },
  ];

  const renderContent = () => {
    switch (currentStep) {
        case POCStep.DASHBOARD:
            return <DashboardMenu lang={lang} onSelectStep={setCurrentStep} onImport={handleImport} status={status} />;
        case POCStep.POC_DETAILS:
            return <PocDetailsForm 
                      lang={lang} 
                      data={pocData} 
                      discoveryData={discoveryData}
                      updateData={(d) => setPocData({...pocData, ...d})} 
                      updateDiscovery={(d) => setDiscoveryData({...discoveryData, ...d})}
                      onValidationChange={(v) => setStatus({...status, details: v})} 
                    />;
        case POCStep.HARDWARE_VALIDATION:
            return <HardwareValidation lang={lang} specs={hwSpecs} updateSpecs={(d) => setHwSpecs({...hwSpecs, ...d})} onValidationChange={(s) => setStatus({...status, hardware: s.isValid})} />;
        case POCStep.NETWORK_CONFIG:
            return <NetworkValidation 
                      lang={lang} 
                      specs={netSpecs} 
                      updateSpecs={(d) => setNetSpecs({...netSpecs, ...d})} 
                      onValidationChange={(s) => setStatus({...status, network: s.isValid})} 
                      nodeCount={hwSpecs.nodeCount} 
                      updateHwSpecs={(d) => setHwSpecs({...hwSpecs, ...d})}
                    />;
        case POCStep.ARCHITECTURE_PREVIEW:
            return <ArchitecturePreview lang={lang} specs={hwSpecs} pocData={pocData} netSpecs={netSpecs} />;
        case POCStep.INSTALLATION_PROCESS:
            return <InstallationChecklist lang={lang} onComplete={(s) => setStatus({...status, install: s})} />;
        case POCStep.INITIAL_CONFIG:
            return <InitialConfig lang={lang} onComplete={(s) => setStatus({...status, config: s})} goals={pocData.goals} netSpecs={netSpecs} />;
        case POCStep.CLOUD_INIT_CRD:
            return <CloudInitGenerator lang={lang} config={cloudInitConfig} updateConfig={setCloudInitConfig} onComplete={handleNext} hwSpecs={hwSpecs} netSpecs={netSpecs} />;
        case POCStep.TEST_PLAN:
            return <TestPlan lang={lang} goals={pocData.goals} results={testResults} setResults={setTestResults} />;
        case POCStep.SHELL_TOOLBOX:
            return <ShellToolbox lang={lang} />;
        case POCStep.INSTALL_GUIDE:
            return <InstallGuide lang={lang} netSpecs={netSpecs} goals={pocData.goals} />;
        case POCStep.COMPLETED:
            return <Summary 
                      lang={lang} 
                      pocData={pocData} 
                      discoveryData={discoveryData}
                      specs={hwSpecs} 
                      netSpecs={netSpecs} 
                      cloudInitConfig={cloudInitConfig} 
                      testResults={testResults} 
                      status={status} 
                      onReset={goHome} 
                    />;
        default:
            return null;
    }
  };

  const isDashboard = currentStep === POCStep.DASHBOARD;
  const currentIndex = stepsOrder.indexOf(currentStep);
  const currentNav = navigationItems.find(i => i.step === currentStep);
  const isStepValid = currentNav?.statusKey ? (status as any)[currentNav.statusKey] : true;

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20 flex flex-col selection:bg-suse-base selection:text-white">
      <header className="bg-suse-dark text-white shadow-xl sticky top-0 z-[100] backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={goHome}>
            <div className="bg-suse-base p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-suse-base/20">
              <LayoutTemplate className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight uppercase">SUSE Virtualization</h1>
              <p className="text-[10px] text-suse-light font-bold flex items-center gap-1.5 uppercase tracking-widest">
                <Settings className="w-3 h-3" /> {t.common.enterprisePlanner}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="flex bg-white/5 p-1 rounded-full border border-white/10 mr-4">
                {[
                  { code: 'en', label: '🇺🇸 EN' },
                  { code: 'pt', label: '🇧🇷 PT' },
                  { code: 'es', label: '🇪🇸 ES' }
                ].map(l => (
                  <button 
                    key={l.code}
                    onClick={() => setLang(l.code as Language)}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-black transition-all ${lang === l.code ? 'bg-suse-base text-white' : 'text-white/40 hover:text-white/70'}`}
                  >
                    {l.label}
                  </button>
                ))}
             </div>

             {!isDashboard && (
               <div className="hidden lg:flex items-center gap-2 mr-4 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                 <Activity className="w-4 h-4 text-suse-base animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{t.common.planningMode}</span>
               </div>
             )}
             <Button variant="secondary" onClick={goHome} className="text-xs px-5 py-2.5 bg-white/10 rounded-full hover:bg-white/20 transition-all font-bold">
               <Home className="w-4 h-4" /> <span className="hidden sm:inline">{t.common.home}</span>
             </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col w-full max-w-7xl mx-auto px-6 mt-8">
        {!isDashboard && currentStep !== POCStep.COMPLETED && (
          <div className="mb-12 no-print overflow-x-auto no-scrollbar">
            <div className="flex items-center justify-between min-w-[900px] px-4">
              {navigationItems.map((item, idx) => {
                const isActive = currentStep === item.step;
                const isPast = stepsOrder.indexOf(currentStep) > stepsOrder.indexOf(item.step);
                const isPending = !isPast && !isActive;
                const isValid = item.statusKey ? (status as any)[item.statusKey] : true;

                return (
                  <React.Fragment key={item.step}>
                    <button 
                      onClick={() => setCurrentStep(item.step)}
                      className={`flex flex-col items-center gap-3 relative transition-all duration-300 group ${isPending ? 'opacity-40 grayscale hover:opacity-100 hover:grayscale-0' : 'opacity-100'}`}
                    >
                      <div className={`
                        w-12 h-12 rounded-2xl flex items-center justify-center border-4 transition-all
                        ${isActive ? 'bg-suse-dark border-suse-base text-white scale-110 shadow-2xl shadow-suse-base/30 ring-4 ring-suse-base/10' : 
                          isPast ? 'bg-suse-base border-suse-base text-white' : 
                          'bg-white border-gray-200 text-gray-400 group-hover:border-suse-base group-hover:text-suse-base'}
                      `}>
                        {isPast && isValid ? <CheckCircle2 className="w-6 h-6 stroke-[3]" /> : React.cloneElement(item.icon as React.ReactElement, { className: 'w-6 h-6' })}
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-widest text-center ${isActive ? 'text-suse-dark' : 'text-gray-400'}`}>
                        {item.label}
                      </span>
                    </button>
                    {idx < navigationItems.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-4 rounded-full transition-colors duration-500 ${isPast ? 'bg-suse-base' : 'bg-gray-200'}`}></div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}

        <div className={`flex-1 relative pb-24 ${isDashboard ? 'animate-fade-in' : ''}`}>
          {renderContent()}
        </div>

        {!isDashboard && currentStep !== POCStep.COMPLETED && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-4xl px-6 z-50 no-print">
            <div className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl p-4 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] flex items-center justify-between gap-4">
              <Button 
                variant="outline" 
                onClick={handleBack}
                className="rounded-2xl px-6 py-4 border-gray-200 text-gray-600 hover:bg-gray-50 font-bold transition-all"
              >
                <ChevronLeft className="w-5 h-5 mr-2" /> {t.common.back}
              </Button>

              <div className="hidden md:flex flex-col items-center gap-1">
                 <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t.common.step} {currentIndex + 1} {t.common.of} {stepsOrder.length}</div>
                 <div className="w-32 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-suse-base transition-all duration-500" style={{ width: `${((currentIndex + 1) / stepsOrder.length) * 100}%` }}></div>
                 </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={handleNext}
                  disabled={!isStepValid}
                  className={`rounded-2xl px-8 py-4 font-bold shadow-xl transition-all ${isStepValid ? 'bg-suse-dark hover:scale-105 active:scale-95 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed grayscale'}`}
                >
                  {currentIndex === stepsOrder.length - 1 ? t.common.finish : t.common.next} <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <GeminiAssistant lang={lang} />
    </div>
  );
};

export default App;
