import React, { useState } from 'react';
import { POCData, HardwareSpecs, NetworkSpecs, CloudInitConfig } from '../types';
import { CheckCircle, Download, RotateCcw, Server, Activity, Network, HardDrive, Cpu, FileCode, FileJson, Calendar, User, Building, Mail, Phone, MessageSquare, Copy, X } from 'lucide-react';
import { Button } from './ui/Button';
import { InfraDiagram } from './InfraDiagram';

interface Props {
  pocData: POCData;
  specs: HardwareSpecs;
  netSpecs: NetworkSpecs;
  cloudInitConfig: CloudInitConfig;
  onReset: () => void;
}

export const Summary: React.FC<Props> = ({ pocData, specs, netSpecs, cloudInitConfig, onReset }) => {
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handlePrint = () => {
    setTimeout(() => window.print(), 100);
  };

  const handleExportJson = () => {
    const exportData = {
      pocData,
      hardwareSpecs: specs,
      networkSpecs: netSpecs,
      cloudInitConfig,
      exportDate: new Date().toISOString()
    };
    
    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    const filename = pocData.projectName 
      ? `${pocData.projectName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-config.json` 
      : 'suse-poc-config.json';
      
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const generateAiPrompt = () => {
    return `You are an expert Solutions Architect assisting with a SUSE Virtualization Proof of Concept.
Here is the complete context and configuration state of the current environment. Please use this data to assist me with troubleshooting, documentation, or next steps.

--- PROJECT CONTEXT ---
Project Name: ${pocData.projectName || 'N/A'}
Client: ${pocData.clientOrganization || 'N/A'} (Contact: ${pocData.clientContactName})
Lead Engineer: ${pocData.leadEngineer}
Timeline: ${pocData.startDate} to ${pocData.targetDate}
Goals:
${pocData.goals.map(g => `- ${g}`).join('\n')}

--- HARDWARE SPECIFICATIONS (Per Node) ---
Total Nodes: ${specs.nodeCount}
CPU: ${specs.cpuCores} Cores
RAM: ${specs.ramGb} GB
Disk: ${specs.diskGb} GB (${specs.diskType})
Network Speed: ${specs.networkSpeedGb} Gbps

--- NETWORK CONFIGURATION ---
Management CIDR: ${netSpecs.managementCidr}
Gateway: ${netSpecs.gatewayIp}
Cluster VIP: ${netSpecs.clusterVip}
VLAN ID: ${netSpecs.vlanId || 'Native/Untagged'}
DNS: ${netSpecs.dnsServers}

Node Inventory:
${netSpecs.nodes.map((n, i) => `${i+1}. ${n.name} | IP: ${n.ip || 'DHCP'} | Role: ${n.role}`).join('\n')}

--- CLOUD-INIT / OS CONFIG ---
User: ${cloudInitConfig.user}
Timezone: ${cloudInitConfig.timezone}
SSH Keys Configured: ${cloudInitConfig.sshKeys.length}
Additional Packages: ${cloudInitConfig.packages.join(', ') || 'None'}
Custom Mounts: ${cloudInitConfig.mounts.map(m => `${m.device} -> ${m.mountPath}`).join(', ') || 'None'}

--- REQUEST ---
Based on this configuration, please assist me with [INSERT YOUR QUESTION HERE].`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateAiPrompt());
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const currentDate = new Date().toLocaleDateString();

  const renderValue = (value: string | number | undefined, placeholder: string = "Not Specified") => {
      if (value === undefined || value === null || value === '' || (typeof value === 'number' && isNaN(value))) {
          return <span className="text-gray-400 italic text-sm font-normal print:text-gray-500">({placeholder})</span>;
      }
      return value;
  };

  return (
    <>
      <style>
        {`
          @media print {
            @page { margin: 10mm; size: auto; }
            body { background-color: white !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
            header, footer, .no-print { display: none !important; }
            .print-container { width: 100% !important; max-width: none !important; box-shadow: none !important; border: none !important; margin: 0 !important; padding: 0 !important; }
            .print-grid { display: grid !important; grid-template-columns: repeat(2, 1fr) !important; gap: 1rem !important; }
          }
        `}
      </style>
      
      {/* AI Prompt Modal */}
      {showPromptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in no-print">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center p-4 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <MessageSquare className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800">Export as AI Prompt</h3>
                            <p className="text-xs text-gray-500">Copy this context to ChatGPT/Claude to continue working.</p>
                        </div>
                    </div>
                    <button onClick={() => setShowPromptModal(false)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>
                
                <div className="p-4 flex-1 overflow-hidden flex flex-col">
                    <div className="relative flex-1 border border-gray-200 rounded-lg bg-gray-50">
                        <textarea 
                            readOnly
                            className="w-full h-full p-4 text-xs font-mono text-gray-700 bg-transparent resize-none focus:outline-none"
                            value={generateAiPrompt()}
                        />
                        <div className="absolute top-2 right-2">
                            <button 
                                onClick={copyToClipboard}
                                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded shadow-sm transition-all ${copySuccess ? 'bg-green-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'}`}
                            >
                                {copySuccess ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                {copySuccess ? 'Copied!' : 'Copy Text'}
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="p-4 bg-gray-50 border-t border-gray-100 rounded-b-xl flex justify-end">
                    <Button variant="secondary" onClick={() => setShowPromptModal(false)}>Close</Button>
                </div>
            </div>
        </div>
      )}

      <div className="print-container bg-white p-8 rounded-lg shadow-lg border-t-4 border-suse-base animate-fade-in print:animate-none">
        
        {/* Print Header */}
        <div className="hidden print:flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
            <div className="flex items-center gap-2 text-suse-dark">
               <Server className="w-6 h-6 text-suse-base" />
               <div className="text-2xl font-bold">SUSE Virtualization</div>
            </div>
            <div className="text-right text-sm text-gray-500">
               <div className="font-bold text-gray-700">POC Validation Report</div>
               <div>{currentDate}</div>
            </div>
        </div>

        <div className="text-center mb-8 print:text-left print:mb-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 print:hidden">
            <CheckCircle className="w-10 h-10 text-suse-base" />
          </div>
          <h2 className="text-3xl font-bold text-suse-dark mb-2 print:text-2xl print:text-black">
              {renderValue(pocData.projectName, "Untitled Project")}
          </h2>
          <p className="text-gray-600 print:text-gray-800">
            Configuration Summary & Infrastructure Plan
          </p>
        </div>

        {/* Project & Partner Grid */}
        <div className="mb-6 bg-gray-50 p-5 rounded-lg border border-gray-100 print:bg-white print:border-gray-300 print:break-inside-avoid">
           <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2 border-b border-gray-200 pb-2">
               <Activity className="w-4 h-4 text-blue-500"/> Project Stakeholders & Schedule
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               
               {/* Partner/SUSE Lead */}
               <div className="space-y-1">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 mb-1"><User className="w-3 h-3"/> Lead Engineer</div>
                  <div className="font-semibold text-gray-900">{renderValue(pocData.leadEngineer)}</div>
                  <div className="text-sm text-gray-600">{renderValue(pocData.organization)}</div>
                  <div className="text-sm text-blue-600">{renderValue(pocData.leadEmail)}</div>
               </div>

               {/* Client Info */}
               <div className="space-y-1">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 mb-1"><Building className="w-3 h-3"/> Client Contact</div>
                  <div className="font-semibold text-gray-900">{renderValue(pocData.clientContactName)}</div>
                  <div className="text-sm text-gray-600">{renderValue(pocData.clientContactRole, "Role Not Specified")}</div>
                  <div className="text-sm text-gray-600 font-bold">{renderValue(pocData.clientOrganization)}</div>
                  <div className="flex flex-col text-xs text-gray-500 mt-1">
                      {pocData.clientContactEmail && <span className="flex items-center gap-1"><Mail className="w-3 h-3"/> {pocData.clientContactEmail}</span>}
                      {pocData.clientContactPhone && <span className="flex items-center gap-1"><Phone className="w-3 h-3"/> {pocData.clientContactPhone}</span>}
                  </div>
               </div>

               {/* Schedule */}
               <div className="space-y-1">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 mb-1"><Calendar className="w-3 h-3"/> Schedule</div>
                  <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-xs text-gray-500">Start Date</div>
                        <div className="font-medium text-gray-900">{renderValue(pocData.startDate)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Target End</div>
                        <div className="font-medium text-gray-900">{renderValue(pocData.targetDate)}</div>
                      </div>
                  </div>
               </div>
           </div>
        </div>

        {/* Hardware & Network Stats Grid */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6 print-grid">
           <div className="bg-gray-50 p-5 rounded-lg border border-gray-100 print:bg-white print:border-gray-300 print:break-inside-avoid">
              <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2 border-b border-gray-200 pb-2">
                  <HardDrive className="w-4 h-4 text-purple-500"/> Hardware Specification
              </h3>
              <dl className="grid grid-cols-3 gap-x-2 gap-y-3 text-sm">
                  <dt className="text-gray-500 col-span-1">Total Nodes</dt>
                  <dd className="font-medium col-span-2 text-gray-900">{renderValue(specs.nodeCount)} Physical Servers</dd>
                  
                  <dt className="text-gray-500 col-span-1">Compute / Node</dt>
                  <dd className="font-medium col-span-2 text-gray-900">{specs.cpuCores} Cores, {specs.ramGb} GB RAM</dd>
                  
                  <dt className="text-gray-500 col-span-1">Storage / Node</dt>
                  <dd className="font-medium col-span-2 text-gray-900">{specs.diskGb} GB ({specs.diskType})</dd>
                  
                  <dt className="text-gray-500 col-span-1">Network / Node</dt>
                  <dd className="font-medium col-span-2 text-gray-900">{specs.networkSpeedGb} Gbps Uplink</dd>
              </dl>
           </div>
           
           <div className="bg-gray-50 p-5 rounded-lg border border-gray-100 print:bg-white print:border-gray-300 print:break-inside-avoid">
               <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2 border-b border-gray-200 pb-2">
                   <Network className="w-4 h-4 text-blue-500"/> Network Overview
               </h3>
               <div className="space-y-3 text-sm">
                   <div className="flex justify-between">
                       <span className="text-gray-500">Management CIDR</span>
                       <span className="font-mono font-bold text-gray-800">{renderValue(netSpecs.managementCidr)}</span>
                   </div>
                   <div className="flex justify-between">
                       <span className="text-gray-500">Gateway</span>
                       <span className="font-mono text-gray-800">{renderValue(netSpecs.gatewayIp)}</span>
                   </div>
                   <div className="flex justify-between">
                       <span className="text-gray-500">Cluster VIP</span>
                       <span className="font-mono font-bold text-emerald-600">{renderValue(netSpecs.clusterVip)}</span>
                   </div>
                   <div className="flex justify-between">
                       <span className="text-gray-500">VLAN ID</span>
                       <span className="text-gray-800">{netSpecs.vlanId || <span className="text-gray-400 italic">Native / Untagged</span>}</span>
                   </div>
               </div>
           </div>
        </div>

        {/* Nodes Table */}
        <div className="mb-8 print:break-inside-avoid">
           <h3 className="font-bold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
              <Server className="w-5 h-5 text-suse-base"/> Node Inventory
           </h3>
           <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm print:border-gray-300">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50 print:bg-gray-100">
                      <tr>
                          <th className="px-4 py-3 text-left font-semibold text-gray-600">Hostname</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-600">IP Address</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-600">Role</th>
                          <th className="px-4 py-3 text-left font-semibold text-gray-600">Resources</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                      {netSpecs.nodes.length > 0 ? netSpecs.nodes.map((node, i) => (
                          <tr key={i} className="hover:bg-gray-50">
                              <td className="px-4 py-3 font-medium text-gray-900">{renderValue(node.name)}</td>
                              <td className="px-4 py-3 font-mono text-blue-600">{node.ip || <span className="text-gray-400 italic">DHCP</span>}</td>
                              <td className="px-4 py-3 text-gray-600">
                                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${node.role === 'Master' ? 'bg-purple-100 text-purple-800 print:border print:border-purple-200' : 'bg-gray-100 text-gray-800 print:border print:border-gray-200'}`}>
                                      {node.role}
                                  </span>
                              </td>
                              <td className="px-4 py-3 text-gray-500 text-xs">
                                  {specs.cpuCores} vCPU / {specs.ramGb} GB RAM
                              </td>
                          </tr>
                      )) : (
                          <tr>
                              <td colSpan={4} className="px-4 py-8 text-center text-gray-500 italic">
                                  No nodes configured in Network Plan.
                              </td>
                          </tr>
                      )}
                  </tbody>
              </table>
           </div>
        </div>

        {/* Cloud-Init Summary */}
        <div className="mb-8 print:break-inside-avoid">
           <h3 className="font-bold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
              <FileCode className="w-5 h-5 text-suse-base"/> OS & Cloud-Init Configuration
           </h3>
           <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 print:bg-white print:border-gray-200">
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4 text-sm">
                 <div className="flex flex-col">
                    <dt className="text-gray-500 text-xs uppercase font-bold">Default User</dt>
                    <dd className="font-mono text-gray-800">{renderValue(cloudInitConfig.user, "opensuse")}</dd>
                 </div>
                 <div className="flex flex-col">
                    <dt className="text-gray-500 text-xs uppercase font-bold">Timezone</dt>
                    <dd className="font-mono text-gray-800">{renderValue(cloudInitConfig.timezone, "UTC")}</dd>
                 </div>
                  <div className="flex flex-col">
                    <dt className="text-gray-500 text-xs uppercase font-bold">SSH Keys</dt>
                    <dd className="text-gray-800">
                        {cloudInitConfig.sshKeys.length > 0 ? (
                            <span>{cloudInitConfig.sshKeys.length} key(s) configured</span>
                        ) : (
                            <span className="text-gray-400 italic">No keys added</span>
                        )}
                    </dd>
                 </div>
                 <div className="flex flex-col md:col-span-2">
                    <dt className="text-gray-500 text-xs uppercase font-bold">Additional Packages</dt>
                    <dd className="text-gray-800 font-mono text-xs mt-1">
                      {cloudInitConfig.packages.length > 0 ? cloudInitConfig.packages.join(', ') : <span className="text-gray-400 italic">None</span>}
                    </dd>
                 </div>
              </dl>
           </div>
        </div>

        {/* Infrastructure Diagram */}
        <div className="mb-8 print:break-inside-avoid">
          <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Topology Diagram</h3>
          <div className="print:scale-90 print:origin-top-left">
            <InfraDiagram specs={specs} networkSpecs={netSpecs} projectName={pocData.projectName} />
          </div>
        </div>

        {/* Goals */}
        <div className="mb-8 print:break-inside-avoid bg-gray-50 p-6 rounded-lg print:bg-white print:border print:border-gray-200">
           <h3 className="font-bold text-gray-800 mb-4">POC Success Criteria</h3>
           <ul className="list-disc ml-5 space-y-2 text-gray-700">
               {pocData.goals.length > 0 ? pocData.goals.map((g, i) => (
                   <li key={i}>{g}</li>
               )) : (
                   <li className="italic text-gray-500">No specific goals defined for this project.</li>
               )}
           </ul>
        </div>

        {/* Footer Buttons (Hidden in Print) */}
        <div className="flex flex-wrap justify-center gap-4 print:hidden mt-12 border-t pt-8">
          <Button variant="outline" onClick={onReset}>
            <RotateCcw className="w-4 h-4 mr-2" /> Start New POC
          </Button>
          <Button variant="secondary" onClick={handleExportJson}>
            <FileJson className="w-4 h-4 mr-2" /> Export JSON
          </Button>
          {/* New Prompt Export Button */}
          <Button variant="secondary" onClick={() => setShowPromptModal(true)} className="bg-purple-600 hover:bg-purple-700 text-white border-none">
            <MessageSquare className="w-4 h-4 mr-2" /> Export to AI Prompt
          </Button>
          <Button onClick={handlePrint} title="Uses your browser's native PDF generation">
            <Download className="w-4 h-4 mr-2" /> Print / Save as PDF
          </Button>
        </div>
      </div>
    </>
  );
};