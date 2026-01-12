
import React from 'react';
import { POCData } from '../types';
import { ClipboardList, Target, User, Building, CheckSquare, Square, Flag, Calendar, Phone, Mail, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Props {
  data: POCData;
  updateData: (data: Partial<POCData>) => void;
}

const POC_GOALS_OPTIONS = [
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
];

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const PocDetailsForm: React.FC<Props> = ({ data, updateData }) => {
  
  const toggleGoal = (goal: string) => {
    const currentGoals = data.goals || [];
    if (currentGoals.includes(goal)) {
      updateData({ goals: currentGoals.filter(g => g !== goal) });
    } else {
      updateData({ goals: [...currentGoals, goal] });
    }
  };

  const toggleAllGoals = () => {
    if (data.goals.length === POC_GOALS_OPTIONS.length) {
      updateData({ goals: [] });
    } else {
      updateData({ goals: [...POC_GOALS_OPTIONS] });
    }
  };

  const getBorderClass = (val: string, type: 'text' | 'email' | 'required' = 'text') => {
    if (!val) return "border-gray-300 focus:ring-suse-base";
    if (type === 'email' && !isValidEmail(val)) return "border-red-500 ring-1 ring-red-100 focus:ring-red-500";
    if (type === 'required' && val.length < 2) return "border-red-500 ring-1 ring-red-100 focus:ring-red-500";
    return "border-green-400 focus:ring-suse-base";
  };

  const inputClasses = "w-full pl-3 pr-3 py-2.5 bg-white border rounded-lg focus:ring-2 placeholder-gray-400 shadow-sm transition-all outline-none";

  const allSelected = data.goals.length === POC_GOALS_OPTIONS.length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-suse-dark mb-4 flex items-center gap-2">
          <ClipboardList className="w-6 h-6 text-suse-base" />
          Client & Project Information
        </h2>
        <p className="text-gray-600 mb-8">
          Define project details. Fields with <span className="text-red-500 font-bold">*</span> are required for a valid report.
        </p>

        {/* Global Project Name */}
        <div className="mb-8">
            <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center gap-1">
              POC / Project Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400"><Target className="w-5 h-5"/></span>
              <input 
                type="text" 
                value={data.projectName}
                onChange={(e) => updateData({ projectName: e.target.value })}
                className={`${inputClasses} pl-10 text-lg ${getBorderClass(data.projectName, 'required')}`}
                placeholder="e.g. Retail Edge Migration"
              />
            </div>
            {!data.projectName && <p className="text-[10px] text-red-500 mt-1 font-bold flex items-center gap-1"><AlertCircle className="w-3 h-3"/> Project name is required</p>}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left Column: Partner / SUSE Lead */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
                    <div className="bg-white p-1.5 rounded-md shadow-sm">
                        <User className="w-5 h-5 text-blue-600" /> 
                    </div>
                    Partner / SUSE Lead
                </h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wide">Responsible Engineer <span className="text-red-500">*</span></label>
                        <input 
                            type="text" 
                            value={data.leadEngineer}
                            onChange={(e) => updateData({ leadEngineer: e.target.value })}
                            className={`${inputClasses} ${getBorderClass(data.leadEngineer, 'required')}`}
                            placeholder="e.g. John Smith"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wide">Engineer Email <span className="text-red-500">*</span></label>
                        <input 
                            type="email" 
                            value={data.leadEmail}
                            onChange={(e) => updateData({ leadEmail: e.target.value })}
                            className={`${inputClasses} ${getBorderClass(data.leadEmail, 'email')}`}
                            placeholder="john.smith@partner.com"
                        />
                        {data.leadEmail && !isValidEmail(data.leadEmail) && <p className="text-[10px] text-red-500 mt-1">Please enter a valid email address</p>}
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wide">Partner Organization</label>
                        <input 
                            type="text" 
                            value={data.organization}
                            onChange={(e) => updateData({ organization: e.target.value })}
                            className={`${inputClasses} ${getBorderClass(data.organization)}`}
                            placeholder="e.g. Tech Solutions Inc."
                        />
                    </div>
                </div>
            </div>

            {/* Right Column: Client Info */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
                    <div className="bg-white p-1.5 rounded-md shadow-sm">
                        <Building className="w-5 h-5 text-gray-600" /> 
                    </div>
                    Client Information
                </h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wide">Client Organization <span className="text-red-500">*</span></label>
                        <input 
                            type="text" 
                            value={data.clientOrganization}
                            onChange={(e) => updateData({ clientOrganization: e.target.value })}
                            className={`${inputClasses} ${getBorderClass(data.clientOrganization, 'required')}`}
                            placeholder="e.g. Acme Corp"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wide">Contact Name</label>
                            <input 
                                type="text" 
                                value={data.clientContactName}
                                onChange={(e) => updateData({ clientContactName: e.target.value })}
                                className={`${inputClasses} ${getBorderClass(data.clientContactName)}`}
                                placeholder="Jane Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wide">Role / Title</label>
                            <input 
                                type="text" 
                                value={data.clientContactRole}
                                onChange={(e) => updateData({ clientContactRole: e.target.value })}
                                className={`${inputClasses} ${getBorderClass(data.clientContactRole)}`}
                                placeholder="IT Manager"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                             <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wide flex items-center gap-1"><Mail className="w-3 h-3"/> Email</label>
                             <input 
                                type="email"
                                value={data.clientContactEmail}
                                onChange={(e) => updateData({ clientContactEmail: e.target.value })}
                                className={`${inputClasses} ${getBorderClass(data.clientContactEmail, 'email')}`}
                                placeholder="jane@acme.com"
                             />
                        </div>
                        <div>
                             <label className="block text-xs font-bold text-slate-600 mb-1 uppercase tracking-wide flex items-center gap-1"><Phone className="w-3 h-3"/> Phone</label>
                             <input 
                                type="tel"
                                value={data.clientContactPhone}
                                onChange={(e) => updateData({ clientContactPhone: e.target.value })}
                                className={inputClasses}
                                placeholder="+1 555-0123"
                             />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Schedule Section */}
        <div className="mt-8 border-t border-gray-100 pt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-suse-accent" /> POC Schedule
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-orange-50/50 p-6 rounded-lg border border-orange-100">
                <div>
                    <label className="block text-sm font-bold text-orange-900 mb-1">Start Date</label>
                    <input 
                      type="date" 
                      value={data.startDate}
                      onChange={(e) => updateData({ startDate: e.target.value })}
                      className={`${inputClasses} border-orange-200 focus:ring-orange-500`}
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-orange-900 mb-1">Target Completion Date</label>
                    <input 
                      type="date" 
                      value={data.targetDate}
                      onChange={(e) => updateData({ targetDate: e.target.value })}
                      className={`${inputClasses} border-orange-200 focus:ring-orange-500 ${data.targetDate && data.startDate && data.targetDate < data.startDate ? 'border-red-500' : ''}`}
                    />
                    {data.targetDate && data.startDate && data.targetDate < data.startDate && (
                      <p className="text-[10px] text-red-600 mt-1 font-bold italic">Warning: Target date is before start date</p>
                    )}
                </div>
            </div>
        </div>

        {/* POC Goals Segment */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-2">
                <div className="p-2 bg-suse-accent/10 rounded-lg">
                    <Flag className="w-6 h-6 text-suse-accent" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-800">POC Goals</h3>
                    <p className="text-sm text-gray-500">Select objectives to track progress.</p>
                </div>
             </div>
             
             {/* Select All Toggle */}
             <button 
                onClick={toggleAllGoals}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 border ${allSelected ? 'bg-suse-base border-suse-base text-white shadow-md' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
             >
                {allSelected ? <CheckCircle2 className="w-4 h-4" /> : <CheckSquare className="w-4 h-4" />}
                {allSelected ? "Deselect All" : "Select All Options"}
             </button>
          </div>
          
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <div className="grid grid-cols-1 gap-3">
              {POC_GOALS_OPTIONS.map((goal, index) => {
                const isSelected = data.goals.includes(goal);
                return (
                  <div 
                    key={index}
                    onClick={() => toggleGoal(goal)}
                    className={`flex items-start p-4 rounded-lg border cursor-pointer transition-all duration-200 ${isSelected ? 'bg-white border-suse-base shadow-md ring-1 ring-suse-base' : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'}`}
                  >
                    <div className={`mt-0.5 mr-3 transition-colors ${isSelected ? 'text-suse-base' : 'text-gray-300'}`}>
                      {isSelected ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                    </div>
                    <span className={`text-sm ${isSelected ? 'text-gray-900 font-semibold' : 'text-gray-600'}`}>
                      {goal}
                    </span>
                  </div>
                );
              })}
            </div>
            {data.goals.length === 0 && <p className="text-xs text-orange-600 font-bold mt-4 animate-pulse">Please select at least one goal for the validation report.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
