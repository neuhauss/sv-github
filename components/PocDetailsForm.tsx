
import React, { useEffect, useState } from 'react';
import { POCData, DiscoveryData, Language } from '../types';
import { translations, POC_GOALS_LOCALIZED } from '../i18n';
import { 
  ClipboardList, Target, User, Building, CheckSquare, Square, 
  Flag, Calendar, AlertCircle, CheckCircle2, Search, Info,
  Cpu, HardDrive, Network, Shield, RefreshCw, Zap, Check
} from 'lucide-react';

interface Props {
  lang: Language;
  data: POCData;
  discoveryData: DiscoveryData;
  updateData: (data: Partial<POCData>) => void;
  updateDiscovery: (data: Partial<DiscoveryData>) => void;
  onValidationChange: (isValid: boolean) => void;
}

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const PocDetailsForm: React.FC<Props> = ({ lang, data, discoveryData, updateData, updateDiscovery, onValidationChange }) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'discovery'>('basic');
  const [activeDiscoveryCat, setActiveDiscoveryCat] = useState<keyof DiscoveryData>('general');
  const t = translations[lang];
  const goalOptions = POC_GOALS_LOCALIZED[lang];

  useEffect(() => {
    const isValid = !!(
      data.projectName && 
      data.leadEngineer && 
      isValidEmail(data.leadEmail) && 
      data.clientOrganization && 
      data.goals.length > 0
    );
    onValidationChange(isValid);
  }, [data, onValidationChange]);

  const toggleGoal = (goal: string) => {
    const currentGoals = data.goals || [];
    if (currentGoals.includes(goal)) {
      updateData({ goals: currentGoals.filter(g => g !== goal) });
    } else {
      updateData({ goals: [...currentGoals, goal] });
    }
  };

  const toggleAllGoals = () => {
    if (data.goals.length === goalOptions.length) {
      updateData({ goals: [] });
    } else {
      updateData({ goals: [...goalOptions] });
    }
  };

  const getBorderClass = (val: string, type: 'text' | 'email' | 'required' = 'text') => {
    if (!val) return "border-gray-300 focus:ring-suse-base";
    if (type === 'email' && !isValidEmail(val)) return "border-red-500 ring-1 ring-red-100 focus:ring-red-500";
    if (type === 'required' && val.length < 2) return "border-red-500 ring-1 ring-red-100 focus:ring-red-500";
    return "border-green-400 focus:ring-suse-base";
  };

  const inputClasses = "w-full pl-3 pr-3 py-2.5 bg-white border rounded-lg focus:ring-2 placeholder-gray-400 shadow-sm transition-all outline-none";
  const allSelected = data.goals.length === goalOptions.length;

  const discoveryCats = [
    { id: 'general', label: t.discovery.categories.general, icon: Zap },
    { id: 'human', label: t.discovery.categories.human, icon: User },
    { id: 'compute', label: t.discovery.categories.compute, icon: Cpu },
    { id: 'storage', label: t.discovery.categories.storage, icon: HardDrive },
    { id: 'network', label: t.discovery.categories.network, icon: Network },
    { id: 'backup', label: t.discovery.categories.backup, icon: Shield },
    { id: 'dr', label: t.discovery.categories.dr, icon: RefreshCw },
  ];

  // Helper for rendering selectable options
  const SelectionGroup = ({ label, options, current, onSelect, isMulti = false }: any) => (
    <div className="space-y-3">
        <label className="text-[10px] font-black uppercase text-slate-500 tracking-wider flex items-center gap-2">
            {label}
        </label>
        <div className="flex flex-wrap gap-2">
            {options.map((opt: string) => {
                const isSelected = isMulti ? (current as string[]).includes(opt) : current === opt;
                return (
                    <button
                        key={opt}
                        onClick={() => {
                            if (isMulti) {
                                const list = current as string[];
                                onSelect(list.includes(opt) ? list.filter(x => x !== opt) : [...list, opt]);
                            } else {
                                onSelect(isSelected ? '' : opt);
                            }
                        }}
                        className={`px-4 py-2.5 rounded-xl border-2 text-xs font-bold transition-all flex items-center gap-2 ${isSelected ? 'bg-suse-dark border-suse-dark text-white shadow-md' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'}`}
                    >
                        {isSelected ? <CheckCircle2 className="w-3.5 h-3.5" /> : <div className="w-3.5 h-3.5 rounded-full border border-slate-300" />}
                        {opt}
                    </button>
                );
            })}
        </div>
    </div>
  );

  const updateSection = (sec: keyof DiscoveryData, field: string, value: any) => {
    updateDiscovery({ [sec]: { ...(discoveryData[sec] as any), [field]: value } });
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <div>
                <h2 className="text-3xl font-black text-suse-dark flex items-center gap-3 uppercase tracking-tight">
                  <ClipboardList className="w-8 h-8 text-suse-base" />
                  {t.pocDetails.title}
                </h2>
                <p className="text-gray-500 mt-2 font-medium">
                  {t.pocDetails.subtitle}
                </p>
            </div>
            
            <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
                <button 
                  onClick={() => setActiveTab('basic')}
                  className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'basic' ? 'bg-white shadow-md text-suse-dark' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    {t.pocDetails.tabs.basic}
                </button>
                <button 
                  onClick={() => setActiveTab('discovery')}
                  className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'discovery' ? 'bg-white shadow-md text-suse-dark' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    <Search className="w-4 h-4" /> {t.pocDetails.tabs.discovery}
                </button>
            </div>
        </div>

        {activeTab === 'basic' ? (
          <div className="animate-fade-in">
            <div className="mb-10">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-3">
                  {t.pocDetails.projectName} <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-suse-base transition-colors">
                    <Target className="w-6 h-6"/>
                  </span>
                  <input 
                    type="text" 
                    value={data.projectName}
                    onChange={(e) => updateData({ projectName: e.target.value })}
                    className={`${inputClasses} pl-14 text-xl font-bold py-4 ${getBorderClass(data.projectName, 'required')}`}
                    placeholder={t.pocDetails.projectPlaceholder}
                  />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="space-y-6">
                    <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest flex items-center gap-2 pb-2 border-b border-gray-100">
                      <User className="w-4 h-4 text-blue-600" /> {t.pocDetails.leadTitle}
                    </h3>
                    <div className="space-y-5">
                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 mb-1.5 uppercase tracking-wide">{t.pocDetails.leadName}</label>
                            <input type="text" value={data.leadEngineer} onChange={(e) => updateData({ leadEngineer: e.target.value })} className={`${inputClasses} ${getBorderClass(data.leadEngineer, 'required')}`} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 mb-1.5 uppercase tracking-wide">{t.pocDetails.leadEmail}</label>
                            <input type="email" value={data.leadEmail} onChange={(e) => updateData({ leadEmail: e.target.value })} className={`${inputClasses} ${getBorderClass(data.leadEmail, 'email')}`} />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest flex items-center gap-2 pb-2 border-b border-gray-100">
                      <Building className="w-4 h-4 text-orange-600" /> {t.pocDetails.clientTitle}
                    </h3>
                    <div className="space-y-5">
                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 mb-1.5 uppercase tracking-wide">{t.pocDetails.clientOrg}</label>
                            <input type="text" value={data.clientOrganization} onChange={(e) => updateData({ clientOrganization: e.target.value })} className={`${inputClasses} ${getBorderClass(data.clientOrganization, 'required')}`} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 mb-1.5 uppercase tracking-wide">{t.pocDetails.clientContact}</label>
                                <input type="text" value={data.clientContactName} onChange={(e) => updateData({ clientContactName: e.target.value })} className={inputClasses} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-gray-400 mb-1.5 uppercase tracking-wide">{t.pocDetails.clientPhone}</label>
                                <input type="tel" value={data.clientContactPhone} onChange={(e) => updateData({ clientContactPhone: e.target.value })} className={inputClasses} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-12 bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Calendar className="w-32 h-32" />
                </div>
                <h3 className="text-lg font-bold mb-6 flex items-center gap-3 uppercase tracking-tighter">
                    <div className="p-2 bg-suse-base rounded-xl text-white shadow-lg shadow-suse-base/20">
                        <Calendar className="w-5 h-5" />
                    </div>
                    {t.pocDetails.scheduleTitle}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    <div className="space-y-2">
                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.1em]">{t.pocDetails.startDate}</label>
                        <input type="date" value={data.startDate} onChange={(e) => updateData({ startDate: e.target.value })} className="w-full bg-slate-800 border-none rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-suse-base" />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.1em]">{t.pocDetails.targetDate}</label>
                        <input type="date" value={data.targetDate} onChange={(e) => updateData({ targetDate: e.target.value })} className="w-full bg-slate-800 border-none rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-suse-base" />
                    </div>
                </div>
            </div>

            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-suse-accent/10 rounded-2xl">
                        <Flag className="w-7 h-7 text-suse-accent" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-gray-800">{t.pocDetails.goalsTitle}</h3>
                        <p className="text-sm text-gray-500">{t.pocDetails.goalsSubtitle}</p>
                    </div>
                 </div>
                 <button onClick={toggleAllGoals} className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black uppercase transition-all duration-300 border ${allSelected ? 'bg-suse-base border-suse-base text-white shadow-xl' : 'bg-white border-gray-200 text-gray-500'}`}>
                    {allSelected ? <CheckCircle2 className="w-4 h-4" /> : <CheckSquare className="w-4 h-4" />}
                    {allSelected ? t.pocDetails.clearAll : t.pocDetails.selectAll}
                 </button>
              </div>
              
              <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {goalOptions.map((goal, index) => (
                    <div key={index} onClick={() => toggleGoal(goal)} className={`flex items-center p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${data.goals.includes(goal) ? 'bg-white border-suse-base shadow-xl ring-4 ring-suse-base/5' : 'bg-white border-transparent hover:border-gray-200'}`}>
                      <div className={`mr-4 ${data.goals.includes(goal) ? 'text-suse-base' : 'text-gray-200'}`}>
                        {data.goals.includes(goal) ? <CheckSquare className="w-6 h-6 stroke-[2.5px]" /> : <Square className="w-6 h-6 stroke-[2px]" />}
                      </div>
                      <span className={`text-sm leading-snug ${data.goals.includes(goal) ? 'text-gray-900 font-black' : 'text-gray-500 font-medium'}`}>{goal}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in flex flex-col lg:flex-row gap-10">
             {/* Discovery Sidebar */}
             <div className="lg:w-72 flex-shrink-0 space-y-2">
                {discoveryCats.map((cat) => (
                  <button 
                    key={cat.id}
                    onClick={() => setActiveDiscoveryCat(cat.id as any)}
                    className={`w-full flex items-center gap-4 px-5 py-4 text-sm font-bold rounded-2xl transition-all text-left ${activeDiscoveryCat === cat.id ? 'bg-suse-base text-white shadow-xl' : 'text-slate-400 hover:bg-slate-50'}`}
                  >
                    <cat.icon className="w-5 h-5" /> {cat.label}
                  </button>
                ))}
             </div>

             <div className="flex-1 bg-slate-50 p-10 rounded-[2.5rem] border border-slate-200">
                <div className="space-y-10">
                   {activeDiscoveryCat === 'general' && (
                     <>
                        <SelectionGroup 
                            label={t.discovery.questions.vcfSub}
                            options={['VCF', 'VVF', 'Perpetual/None']}
                            current={discoveryData.general.subscription}
                            onSelect={(v: string) => updateSection('general', 'subscription', v)}
                        />
                        <SelectionGroup 
                            label={t.discovery.questions.vcfRunning}
                            options={[t.discovery.options.yes, t.discovery.options.no]}
                            current={discoveryData.general.vcfRunning}
                            onSelect={(v: string) => updateSection('general', 'vcfRunning', v)}
                        />
                        <SelectionGroup 
                            label={t.discovery.questions.deployedByVcf}
                            options={[t.discovery.options.vcf_deployed, t.discovery.options.vcf_standalone]}
                            current={discoveryData.general.deployedByVcf}
                            onSelect={(v: string) => updateSection('general', 'deployedByVcf', v)}
                        />
                        <SelectionGroup 
                            label={t.discovery.questions.vcfVersion}
                            options={['2.x', '3.x', '4.x', '5.x', '9.x']}
                            current={discoveryData.general.vcfVersion}
                            onSelect={(v: string) => updateSection('general', 'vcfVersion', v)}
                        />
                        <SelectionGroup 
                            label={t.discovery.questions.vvfStorage}
                            options={[t.discovery.options.vsan, t.discovery.options.external]}
                            current={discoveryData.general.vvfStorage}
                            onSelect={(v: string) => updateSection('general', 'vvfStorage', v)}
                        />
                        <SelectionGroup 
                            label={t.discovery.questions.workloads}
                            options={['VDI', 'VMs only', 'Kubernetes clusters', 'SAP', 'Others']}
                            current={discoveryData.general.workloads}
                            isMulti={true}
                            onSelect={(v: string[]) => updateSection('general', 'workloads', v)}
                        />
                     </>
                   )}

                   {activeDiscoveryCat === 'human' && (
                     <>
                        <SelectionGroup 
                            label={t.discovery.questions.operators}
                            options={['1–2', '3–5', '5+']}
                            current={discoveryData.human.operatorsCount}
                            onSelect={(v: string) => updateSection('human', 'operatorsCount', v)}
                        />
                        <SelectionGroup 
                            label={t.discovery.questions.responsibilities}
                            options={[t.discovery.options.centralized, t.discovery.options.split, t.discovery.options.shared]}
                            current={discoveryData.human.responsibilities}
                            isMulti={true}
                            onSelect={(v: string[]) => updateSection('human', 'responsibilities', v)}
                        />
                        <SelectionGroup 
                            label={t.discovery.questions.skills}
                            options={[t.discovery.options.basic_k8s, t.discovery.options.admin_k8s, t.discovery.options.none_k8s]}
                            current={discoveryData.human.kubernetesSkills}
                            onSelect={(v: string) => updateSection('human', 'kubernetesSkills', v)}
                        />
                     </>
                   )}

                   {activeDiscoveryCat === 'compute' && (
                     <>
                        <SelectionGroup 
                            label={t.discovery.questions.serverVendors}
                            options={['Dell', 'HPE', 'Lenovo', 'Fujitsu', 'Huawei', 'Other']}
                            current={discoveryData.compute.vendors}
                            isMulti={true}
                            onSelect={(v: string[]) => updateSection('compute', 'vendors', v)}
                        />
                        <SelectionGroup 
                            label={t.discovery.questions.generation}
                            options={[t.discovery.options.legacy, t.discovery.options.mixed, t.discovery.options.recent]}
                            current={discoveryData.compute.generation}
                            onSelect={(v: string) => updateSection('compute', 'generation', v)}
                        />
                        <SelectionGroup 
                            label={t.discovery.questions.cpuArch}
                            options={['Intel', 'AMD', 'ARM']}
                            current={discoveryData.compute.cpuArch}
                            onSelect={(v: string) => updateSection('compute', 'cpuArch', v)}
                        />
                        <SelectionGroup 
                            label={t.discovery.questions.gpu}
                            options={['Nvidia', 'AMD', 'None']}
                            current={discoveryData.compute.gpuModels}
                            onSelect={(v: string) => updateSection('compute', 'gpuModels', v)}
                        />
                     </>
                   )}

                   {activeDiscoveryCat === 'storage' && (
                     <>
                        <SelectionGroup 
                            label={t.discovery.questions.storageTransports}
                            options={['iSCSI', 'FC', 'FCoE', 'NFS', 'DAS', 'NVMe-oF', 'Local / HCI (vSAN)', 'S3', 'vVOLS']}
                            current={discoveryData.storage.transports}
                            isMulti={true}
                            onSelect={(v: string[]) => updateSection('storage', 'transports', v)}
                        />
                        <SelectionGroup 
                            label={t.discovery.questions.storagePlatforms}
                            options={['Pure Storage', 'NetApp', 'Dell', 'HPE', 'Hitachi', 'DataCore', 'MinIO', 'Other']}
                            current={discoveryData.storage.platforms}
                            isMulti={true}
                            onSelect={(v: string[]) => updateSection('storage', 'platforms', v)}
                        />
                        <SelectionGroup 
                            label={t.discovery.questions.storageProvisioning}
                            options={[t.discovery.options.manual, t.discovery.options.semi, t.discovery.options.policy, t.discovery.options.iac]}
                            current={discoveryData.storage.provisioningMethod}
                            onSelect={(v: string) => updateSection('storage', 'provisioningMethod', v)}
                        />
                        <SelectionGroup 
                            label={t.discovery.questions.storageAutomation}
                            options={['vSAN Policies', 'vVols + VASA', 'Terraform', 'Ansible', 'Kubernetes CSI', 'GitOps']}
                            current={discoveryData.storage.automationTools}
                            isMulti={true}
                            onSelect={(v: string[]) => updateSection('storage', 'automationTools', v)}
                        />
                     </>
                   )}

                   {activeDiscoveryCat === 'network' && (
                     <>
                        <SelectionGroup 
                            label={t.discovery.questions.networkVendors}
                            options={['Cisco', 'Fortinet', 'F5', 'Citrix', 'Juniper', 'HPE', 'Arista', 'Other']}
                            current={discoveryData.network.vendors}
                            isMulti={true}
                            onSelect={(v: string[]) => updateSection('network', 'vendors', v)}
                        />
                        <SelectionGroup 
                            label={t.discovery.questions.networkFunctions}
                            options={['FWaaS', 'DHCPaaS', 'VLAN', 'VXLAN', 'IPv6', 'Other']}
                            current={discoveryData.network.functionsRequired}
                            isMulti={true}
                            onSelect={(v: string[]) => updateSection('network', 'functionsRequired', v)}
                        />
                        <SelectionGroup 
                            label={t.discovery.questions.nsxUsage}
                            options={['Not used', 'Basic (overlay)', 'Advanced (micro-segmentation, LB, firewall)']}
                            current={discoveryData.network.nsxUsage}
                            onSelect={(v: string) => updateSection('network', 'nsxUsage', v)}
                        />
                        <SelectionGroup 
                            label={t.discovery.questions.networkPolicy}
                            options={[t.discovery.options.manual, 'Templates / tags', 'Automated / API-driven']}
                            current={discoveryData.network.policyManagement}
                            onSelect={(v: string) => updateSection('network', 'policyManagement', v)}
                        />
                     </>
                   )}

                   {activeDiscoveryCat === 'backup' && (
                     <>
                        <SelectionGroup 
                            label={t.discovery.questions.backupSolution}
                            options={['Veeam', 'Rubrik', 'Cohesity', 'Veritas', 'Commvault', 'Cloud-native', 'Other']}
                            current={discoveryData.backup.solution}
                            onSelect={(v: string) => updateSection('backup', 'solution', v)}
                        />
                        <SelectionGroup 
                            label={t.discovery.questions.backupCoverage}
                            options={['Yes, all production VMs', 'Most, with exclusions', 'Only critical workloads']}
                            current={discoveryData.backup.coverage}
                            onSelect={(v: string) => updateSection('backup', 'coverage', v)}
                        />
                        <SelectionGroup 
                            label={t.discovery.questions.backupIntegration}
                            options={[t.discovery.options.yes, 'Partially', t.discovery.options.no]}
                            current={discoveryData.backup.vcenterIntegration}
                            onSelect={(v: string) => updateSection('backup', 'vcenterIntegration', v)}
                        />
                     </>
                   )}

                   {activeDiscoveryCat === 'dr' && (
                     <>
                        <SelectionGroup 
                            label={t.discovery.questions.drHa}
                            options={[t.discovery.options.yes, t.discovery.options.no]}
                            current={discoveryData.dr.haArchitecture}
                            onSelect={(v: string) => updateSection('dr', 'haArchitecture', v)}
                        />
                        <SelectionGroup 
                            label={t.discovery.questions.drSolution}
                            options={['Zerto', 'Veeam DR', 'Cloud DR (AWS/Azure/GCP)', 'SRM', 'None / Manual']}
                            current={discoveryData.dr.drSolution}
                            onSelect={(v: string) => updateSection('dr', 'drSolution', v)}
                        />
                        <SelectionGroup 
                            label={t.discovery.questions.drTested}
                            options={['Yes (automated)', 'Occasionally', 'Rarely / Never']}
                            current={discoveryData.dr.testedRegularly}
                            onSelect={(v: string) => updateSection('dr', 'testedRegularly', v)}
                        />
                        <SelectionGroup 
                            label={t.discovery.questions.drApproach}
                            options={['VM-centric', 'Application-centric', 'Kubernetes-centric']}
                            current={discoveryData.dr.concept}
                            onSelect={(v: string) => updateSection('dr', 'concept', v)}
                        />
                     </>
                   )}
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};
