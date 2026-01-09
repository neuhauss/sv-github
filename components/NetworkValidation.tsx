
import React, { useEffect, useState } from 'react';
import { NetworkSpecs, ValidationStatus } from '../types';
import { Network, Router, Globe, AlertTriangle, CheckCircle2, ShieldCheck, Eye, EyeOff, Server, HardDrive, Lock, RefreshCw, XCircle, ExternalLink, Trash2, Plus, Info } from 'lucide-react';

interface Props {
  specs: NetworkSpecs;
  updateSpecs: (specs: Partial<NetworkSpecs>) => void;
  onValidationChange: (status: ValidationStatus) => void;
}

const IP_REGEX = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
const CIDR_REGEX = /^([0-9]{1,3}\.){3}[0-9]{1,3}(\/([0-9]|[1-2][0-9]|3[0-2]))$/;

const REQUIRED_PORTS = [
    { port: "22", proto: "TCP", desc: "SSH Access (sshd)" },
    { port: "80", proto: "TCP", desc: "Nginx (HTTP)" },
    { port: "443", proto: "TCP", desc: "HTTPS / Rancher Integration" },
    { port: "2379-2381", proto: "TCP", desc: "Etcd (Client, Peer, Health)" },
    { port: "6443", proto: "TCP", desc: "Kubernetes API" },
    { port: "6444", proto: "TCP", desc: "RKE2 Agent" },
    { port: "8472", proto: "UDP", desc: "Canal CNI (VxLAN)" },
    { port: "9345", proto: "TCP", desc: "Rancher Agent / K8s API" },
    { port: "10250", proto: "TCP", desc: "Kubelet" },
    { port: "10251-10252", proto: "TCP", desc: "Kube Scheduler/Controller Health" },
    { port: "10256", proto: "TCP", desc: "Kube-proxy Health" },
    { port: "10257-10259", proto: "TCP", desc: "Kube Controller/Scheduler Secure" },
    { port: "30000-32767", proto: "TCP", desc: "NodePort Range" },
    { port: "2112", proto: "TCP", desc: "Kube-vip" },
    { port: "3260", proto: "TCP", desc: "iscsid (Longhorn)" },
    { port: "6060", proto: "TCP", desc: "Node-disk-manager" },
    { port: "9091, 9099", proto: "TCP", desc: "Canal/Calico Components" },
    { port: "8181, 8444", proto: "TCP", desc: "Nginx Ingress Controller" },
    { port: "10245", proto: "TCP", desc: "Nginx Ingress Controller" },
    { port: "9796", proto: "TCP", desc: "Node Exporter" },
    { port: "10010", proto: "TCP", desc: "Containerd" },
    { port: "68", proto: "UDP", desc: "Wicked (DHCP)" },
];

const OUTBOUND_CHECKS = [
    { id: 'suse', label: "SUSE Registry", url: "https://registry.suse.com", display: "registry.suse.com" },
    { id: 'docker', label: "Docker Hub", url: "https://hub.docker.com", display: "docker.io" },
    { id: 'google', label: "Internet Check", url: "https://www.google.com", display: "Google (Connectivity)" },
];

export const NetworkValidation: React.FC<Props> = ({ specs, updateSpecs, onValidationChange }) => {
  const [validation, setValidation] = useState<ValidationStatus>({ isValid: false, messages: [] });
  const [showTopology, setShowTopology] = useState(false);
  const [activeTab, setActiveTab] = useState<'config' | 'firewall'>('config');
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [urlStatus, setUrlStatus] = useState<Record<string, 'idle' | 'checking' | 'success' | 'error'>>({});

  const handleNodeUpdate = (index: number, field: 'name' | 'ip', value: string) => {
    const newNodes = [...specs.nodes];
    newNodes[index] = { ...newNodes[index], [field]: value };
    updateSpecs({ nodes: newNodes });
  };

  const addNode = () => {
    const newNodes = [...specs.nodes, {
        name: `node-${specs.nodes.length + 1}`,
        ip: '',
        role: 'Hybrid' as const
    }];
    updateSpecs({ nodes: newNodes });
  };

  const removeNode = (index: number) => {
    const newNodes = [...specs.nodes];
    newNodes.splice(index, 1);
    updateSpecs({ nodes: newNodes });
  };

  const checkConnectivity = async (id: string, url: string) => {
    setUrlStatus(prev => ({ ...prev, [id]: 'checking' }));
    try {
        await fetch(url, { mode: 'no-cors', method: 'HEAD', cache: 'no-cache' });
        setTimeout(() => setUrlStatus(prev => ({ ...prev, [id]: 'success' })), 500);
    } catch (error) {
        setUrlStatus(prev => ({ ...prev, [id]: 'error' }));
    }
  };

  const checkAllUrls = () => OUTBOUND_CHECKS.forEach(check => checkConnectivity(check.id, check.url));

  useEffect(() => {
    const messages: string[] = [];
    let isValid = true;

    if (!specs.managementCidr) {
      messages.push("Management CIDR is required.");
      isValid = false;
    } else if (!CIDR_REGEX.test(specs.managementCidr)) {
      messages.push("Invalid CIDR format (e.g., 192.168.1.0/24).");
      isValid = false;
    }

    if (!specs.gatewayIp) {
      messages.push("Gateway IP is required.");
      isValid = false;
    } else if (!IP_REGEX.test(specs.gatewayIp)) {
      messages.push("Invalid Gateway IP format.");
      isValid = false;
    }

    if (!specs.clusterVip) {
      messages.push("Cluster VIP is required for HA.");
      isValid = false;
    } else if (!IP_REGEX.test(specs.clusterVip)) {
      messages.push("Invalid VIP format.");
      isValid = false;
    }

    const usedIps = new Set<string>();
    if (specs.gatewayIp) usedIps.add(specs.gatewayIp);
    if (specs.clusterVip) usedIps.add(specs.clusterVip);

    specs.nodes.forEach((node, idx) => {
      if (!node.ip) {
        messages.push(`Node ${idx + 1} (${node.name}) IP is required.`);
        isValid = false;
      } else if (!IP_REGEX.test(node.ip)) {
        messages.push(`Node ${idx + 1} IP format is invalid.`);
        isValid = false;
      } else if (usedIps.has(node.ip)) {
        messages.push(`Node ${idx + 1} IP (${node.ip}) conflicts with another IP.`);
        isValid = false;
      }
      if (node.ip) usedIps.add(node.ip);
    });

    if (!specs.dnsServers) {
      messages.push("DNS Server is required.");
      isValid = false;
    }

    setValidation({ isValid, messages });
    onValidationChange({ isValid, messages });
  }, [specs]);

  const getStatusColor = (val: string, regex?: RegExp, conflictCheck?: boolean) => {
    if (!val) return "border-gray-300";
    if (regex && !regex.test(val)) return "border-red-500 bg-red-50";
    return "border-green-400 bg-green-50/30";
  };

  const inputClasses = "w-full px-3 py-2.5 bg-white border rounded-lg focus:ring-2 focus:ring-suse-base focus:border-transparent placeholder-gray-400 shadow-sm transition-all outline-none";

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-suse-dark flex items-center gap-2">
              <Network className="w-6 h-6 text-suse-base" /> Network Configuration
            </h2>
            <div className="flex bg-gray-100 p-1 rounded-lg">
               <button onClick={() => setActiveTab('config')} className={`px-4 py-1.5 text-sm font-bold rounded-md transition-all ${activeTab === 'config' ? 'bg-white text-suse-dark shadow-sm' : 'text-gray-500'}`}>IP & Topology</button>
               <button onClick={() => setActiveTab('firewall')} className={`px-4 py-1.5 text-sm font-bold rounded-md transition-all ${activeTab === 'firewall' ? 'bg-white text-suse-dark shadow-sm' : 'text-gray-500'}`}>Ports & URLs</button>
            </div>
        </div>

        {activeTab === 'config' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                 <label className="block text-sm font-semibold text-gray-700 mb-2">Management CIDR <span className="text-red-500">*</span></label>
                 <input 
                   type="text"
                   value={specs.managementCidr}
                   onChange={(e) => updateSpecs({ managementCidr: e.target.value })}
                   className={`${inputClasses} ${getStatusColor(specs.managementCidr, CIDR_REGEX)}`}
                   placeholder="192.168.10.0/24"
                 />
                 {!CIDR_REGEX.test(specs.managementCidr) && specs.managementCidr && <p className="text-[10px] text-red-500 mt-1">Format: x.x.x.x/yy</p>}
              </div>

              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                 <label className="block text-sm font-semibold text-gray-700 mb-2">VLAN ID</label>
                 <input 
                   type="text"
                   value={specs.vlanId}
                   onChange={(e) => updateSpecs({ vlanId: e.target.value })}
                   className={inputClasses}
                   placeholder="Native"
                 />
              </div>

              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                 <label className="block text-sm font-semibold text-gray-700 mb-2">Gateway IP <span className="text-red-500">*</span></label>
                 <input 
                   type="text"
                   value={specs.gatewayIp}
                   onChange={(e) => updateSpecs({ gatewayIp: e.target.value })}
                   className={`${inputClasses} ${getStatusColor(specs.gatewayIp, IP_REGEX)}`}
                   placeholder="192.168.10.1"
                 />
              </div>

              <div className="bg-emerald-50/50 p-5 rounded-xl border border-emerald-100">
                 <label className="block text-sm font-semibold text-gray-700 mb-2">Cluster VIP <span className="text-red-500">*</span></label>
                 <input 
                   type="text"
                   value={specs.clusterVip}
                   onChange={(e) => updateSpecs({ clusterVip: e.target.value })}
                   className={`${inputClasses} ${getStatusColor(specs.clusterVip, IP_REGEX)}`}
                   placeholder="192.168.10.10"
                 />
              </div>
            </div>

            <div className="mb-8 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <div className="bg-gray-50 px-5 py-3 border-b border-gray-200 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-700 text-sm">Node Networking (Static IPs Required)</h3>
                    <div className="text-xs font-bold text-gray-500">{specs.nodes.length} Nodes Configured</div>
                </div>
                <div className="p-5 bg-white">
                    {specs.nodes.map((node, idx) => (
                        <div key={idx} className="grid grid-cols-12 gap-4 mb-3 items-center">
                            <div className="col-span-1 text-gray-400 font-bold text-sm text-center">{idx + 1}</div>
                            <div className="col-span-4">
                                <input 
                                    type="text"
                                    value={node.name}
                                    onChange={(e) => handleNodeUpdate(idx, 'name', e.target.value)}
                                    className={`${inputClasses} py-2 text-sm`}
                                    placeholder="node-name"
                                />
                            </div>
                            <div className="col-span-6 relative">
                                <input 
                                    type="text"
                                    value={node.ip}
                                    onChange={(e) => handleNodeUpdate(idx, 'ip', e.target.value)}
                                    className={`${inputClasses} py-2 text-sm font-mono ${getStatusColor(node.ip, IP_REGEX)}`}
                                    placeholder="192.168.10.x"
                                />
                                {node.ip && !IP_REGEX.test(node.ip) && <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500"><Info className="w-4 h-4"/></div>}
                            </div>
                            <div className="col-span-1 flex justify-center">
                                <button onClick={() => removeNode(idx)} className="text-gray-400 hover:text-red-500 p-2" disabled={specs.nodes.length <= 1}><Trash2 className="w-4 h-4" /></button>
                            </div>
                        </div>
                    ))}
                    <button onClick={addNode} className="mt-2 flex items-center justify-center gap-2 text-xs font-bold text-suse-base hover:bg-emerald-50 border border-dashed border-suse-base/40 w-full py-3 rounded-lg"><Plus className="w-3.5 h-3.5" /> Add New Node</button>
                </div>
            </div>

            <div className={`p-4 rounded-md transition-all ${validation.isValid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-100'}`}>
              <h3 className="font-bold flex items-center gap-2 mb-2 text-sm">
                {validation.isValid ? <span className="text-green-700 flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> Network state: Valid</span> : <span className="text-red-700 flex items-center gap-2"><AlertTriangle className="w-4 h-4"/> Setup incomplete</span>}
              </h3>
              <ul className="space-y-1 ml-6 list-disc text-[11px] text-gray-700">
                {validation.messages.map((msg, idx) => <li key={idx}>{msg}</li>)}
              </ul>
            </div>
          </>
        )}

        {activeTab === 'firewall' && (
          <div className="animate-fade-in space-y-6">
             <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r">
                <p className="text-sm text-amber-900">Ensure these ports are allowed on your physical switch/firewall to prevent etcd or CNI failures.</p>
             </div>
             <div className="bg-white border rounded-lg overflow-hidden shadow-sm max-h-[400px] overflow-y-auto">
                <table className="w-full text-xs text-left">
                   <thead className="bg-gray-100 text-gray-600 font-bold sticky top-0 uppercase tracking-tighter">
                      <tr><th className="px-3 py-2">Port</th><th className="px-3 py-2">Proto</th><th className="px-3 py-2">Purpose</th></tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                      {REQUIRED_PORTS.map((p, i) => (
                          <tr key={i} className="hover:bg-gray-50"><td className="px-3 py-2 font-mono font-bold">{p.port}</td><td className="px-3 py-2"><span className={`px-1 rounded text-[9px] ${p.proto === 'TCP' ? 'bg-blue-100' : 'bg-orange-100'}`}>{p.proto}</span></td><td className="px-3 py-2 text-gray-500">{p.desc}</td></tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};
