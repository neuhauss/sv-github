
import React, { useState, useEffect } from 'react';
/* Added AlertTriangle and Plus to imports from lucide-react */
import { Server, Settings, Network, HardDrive, Disc, LayoutTemplate, Play, Database, Cloud, ArrowRight, ShieldCheck, Cpu, Shuffle, Lock, Globe, Zap, Monitor, Search, Terminal, Copy, Check, Key, Layers, RefreshCw, Target, FileCheck, Eye, Link as LinkIcon, Download, AlertCircle, AlertTriangle, Plus, ShieldAlert, Wifi, Activity, BookOpen, Wrench, Bug, ShieldX, ExternalLink, Info, CheckCircle2, ChevronRight, ListChecks } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UISnapshot } from './ui/UISnapshot';
import { NetworkSpecs, Language } from '../types';
import { translations, GOAL_PROCEDURES_LOCALIZED } from '../i18n';

// --- TUI Simulator Component ---
const TUISimulator = ({ netSpecs, mode = 'create' }: { netSpecs: NetworkSpecs | undefined, mode?: 'create' | 'join' }) => {
    const [step, setStep] = useState(0);
    
    const createSteps = [
        {
            title: "Choose installation mode",
            content: (
                <div className="space-y-4">
                    <div className="space-y-2">
                        <div className="bg-suse-base text-white p-2 border-2 border-white">Create a new Harvester cluster</div>
                        <div className="bg-slate-800 text-slate-400 p-2 border border-slate-700">Join an existing Harvester cluster</div>
                        <div className="bg-slate-800 text-slate-400 p-2 border border-slate-700">Install Harvester binaries only</div>
                    </div>
                </div>
            )
        },
        {
            title: "Choose installation target and data disk",
            content: (
                <div className="space-y-3">
                    <div className="flex justify-between items-center border-b border-slate-700 pb-1">
                        <span className="text-slate-400">Installation disk</span>
                        <span className="bg-suse-base text-white px-2">sda 300G</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-700 pb-1">
                        <span className="text-slate-400">Data disk</span>
                        <span className="bg-suse-base text-white px-2">Use the installation disk (sda 300G)</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-700 pb-1">
                        <span className="text-slate-400">Persistent size</span>
                        <span className="text-white">150Gi</span>
                    </div>
                </div>
            )
        },
        {
            title: "Configure network",
            content: (
                <div className="space-y-1 text-[9px]">
                    <div className="flex justify-between border-b border-slate-700 pb-0.5">
                        <span className="text-slate-400">Management NIC</span>
                        <span className="bg-suse-base text-white px-1">ens33</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-700 pb-0.5">
                        <span className="text-slate-400">Bond Mode</span>
                        <span className="bg-suse-base text-white px-1">active-backup</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-700 pb-0.5">
                        <span className="text-slate-400">IPv4 Method</span>
                        <span className="bg-suse-base text-white px-1">Static</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-700 pb-0.5">
                        <span className="text-slate-400">IPv4 Address</span>
                        <span className="text-white">{netSpecs?.clusterVip || "192.168.10.50"}</span>
                    </div>
                </div>
            )
        },
        {
            title: "Configure hostname for this instance",
            content: (
                <div className="space-y-2">
                    <div className="bg-slate-800 p-2 border border-suse-base text-white">
                        harvester-node-01
                    </div>
                </div>
            )
        },
        {
            title: "Configure DNS Servers",
            content: (
                <div className="space-y-2">
                    <div className="bg-slate-800 p-2 border border-suse-base text-white">
                        8.8.8.8
                    </div>
                </div>
            )
        },
        {
            title: "Configure VIP",
            content: (
                <div className="space-y-3">
                    <div className="flex justify-between items-center border-b border-slate-700 pb-1">
                        <span className="text-slate-400">VIP Mode</span>
                        <span className="bg-suse-base text-white px-2">Automatic (DHCP)</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-700 pb-1">
                        <span className="text-slate-400">VIP</span>
                        <span className="text-white">{netSpecs?.clusterVip || "192.168.10.50"}</span>
                    </div>
                </div>
            )
        },
        {
            title: "Configure cluster token",
            content: (
                <div className="space-y-2">
                    <div className="bg-slate-800 p-2 border border-suse-base text-white tracking-widest text-center">
                        ********
                    </div>
                </div>
            )
        },
        {
            title: "Configure the password to access the node",
            content: (
                <div className="space-y-3">
                    <div className="space-y-1">
                        <p className="text-slate-400 text-[8px]">Password</p>
                        <div className="bg-slate-800 p-1.5 border border-slate-700 text-white">********</div>
                    </div>
                    <div className="space-y-1">
                        <p className="text-slate-400 text-[8px]">Confirm password</p>
                        <div className="bg-slate-800 p-1.5 border border-suse-base text-white">********</div>
                    </div>
                </div>
            )
        },
        {
            title: "Configure NTP Servers",
            content: (
                <div className="space-y-2">
                    <div className="bg-slate-800 p-2 border border-suse-base text-white">
                        0.suse.pool.ntp.org
                    </div>
                </div>
            )
        },
        {
            title: "Optional: configure proxy",
            content: (
                <div className="space-y-2">
                    <div className="bg-slate-800 p-2 border border-suse-base text-white">
                        http://proxy.example.com:3128
                    </div>
                </div>
            )
        }
    ];

    const joinSteps = [
        {
            title: "Installation Mode",
            content: (
                <div className="space-y-4">
                    <p className="text-white mb-4">Choose installation mode:</p>
                    <div className="space-y-2">
                        <div className="bg-slate-800 text-slate-400 p-2 border border-slate-700">1. Create a new Harvester cluster</div>
                        <div className="bg-suse-base text-white p-2 border-2 border-white">2. Join an existing Harvester cluster</div>
                    </div>
                </div>
            )
        },
        {
            title: "Join Cluster",
            content: (
                <div className="space-y-4">
                    <p className="text-white mb-2">Management Address (VIP):</p>
                    <div className="bg-slate-800 p-2 border border-suse-base text-white">
                        {netSpecs?.clusterVip || "192.168.10.50"}
                    </div>
                    <p className="text-white mb-2">Cluster Token:</p>
                    <div className="bg-slate-800 p-2 border border-slate-700 text-white tracking-widest">********</div>
                    <p className="text-slate-500 mt-4 text-[9px]">The node will fetch configuration from the seed node.</p>
                </div>
            )
        },
        {
            title: "Installation Device",
            content: (
                <div className="space-y-4">
                    <p className="text-white mb-4">Select the device to install Harvester on:</p>
                    <div className="bg-suse-base text-white p-2 border-2 border-white flex justify-between">
                        <span>/dev/sda (QEMU HARDDISK)</span>
                        <span>250.0 GiB</span>
                    </div>
                </div>
            )
        }
    ];

    const steps = mode === 'create' ? createSteps : joinSteps;

    useEffect(() => {
        const timer = setInterval(() => {
            setStep((prev) => (prev + 1) % steps.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [steps.length]);

    return (
        <div className="bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-800 shadow-2xl flex flex-col h-[320px]">
            <div className="bg-slate-800 px-6 py-3 border-b border-slate-700 flex justify-between items-center">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40"></div>
                </div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Harvester Installer v1.7.0</span>
                <div className="w-10"></div>
            </div>
            
            <div className="flex-1 p-8 font-mono text-[11px] relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4 }}
                        className="h-full flex flex-col"
                    >
                        <h5 className="text-suse-base font-bold mb-6 flex items-center gap-2">
                            <span className="bg-suse-base/10 text-suse-base px-2 py-0.5 rounded">Step {step + 1}</span>
                            {steps[step].title}
                        </h5>
                        <div className="flex-1">
                            {steps[step].content}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Progress Bar */}
                <div className="absolute bottom-6 left-8 right-8 flex gap-2">
                    {steps.map((_, i) => (
                        <div 
                            key={i} 
                            className={`h-1 flex-1 rounded-full transition-all duration-500 ${i === step ? 'bg-suse-base' : 'bg-slate-800'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- Network Diagram Component ---
const NetworkDiagram = ({ netSpecs }: { netSpecs: NetworkSpecs | undefined }) => {
    return (
        <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 flex flex-col items-center justify-center gap-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            </div>

            {/* Nodes */}
            <div className="flex gap-12 relative z-10">
                {[1, 2, 3].map((i) => (
                    <motion.div 
                        key={i}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: i * 0.2 }}
                        className="flex flex-col items-center gap-2"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center relative">
                            <Server className="w-8 h-8 text-slate-400" />
                            <motion.div 
                                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                                className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500"
                            />
                        </div>
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">Node 0{i}</span>
                    </motion.div>
                ))}
            </div>

            {/* VIP Layer */}
            <div className="w-full h-px bg-slate-200 relative">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, delay: 1 }}
                    className="absolute inset-0 bg-suse-base"
                />
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 1.5 }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-suse-base text-white px-4 py-1.5 rounded-full shadow-lg shadow-suse-base/20 flex items-center gap-2 z-20"
                >
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[10px] font-black tracking-tight">VIP: {netSpecs?.clusterVip || "192.168.10.50"}</span>
                </motion.div>
            </div>

            <p className="text-[10px] text-slate-500 text-center max-w-[200px] leading-relaxed">
                The Floating VIP ensures high availability by automatically migrating between healthy nodes.
            </p>
        </div>
    );
};

// --- Join Diagram Component ---
const JoinDiagram = ({ netSpecs }: { netSpecs: NetworkSpecs | undefined }) => {
    return (
        <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 flex flex-col items-center justify-center gap-8 relative overflow-hidden h-[320px]">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            </div>

            <div className="flex items-center gap-12 relative z-10">
                {/* Existing Cluster */}
                <div className="flex flex-col items-center gap-3">
                    <div className="flex gap-2">
                        <div className="w-10 h-10 rounded-lg bg-suse-base/20 border border-suse-base/30 flex items-center justify-center">
                            <Server className="w-5 h-5 text-suse-base" />
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-suse-base/20 border border-suse-base/30 flex items-center justify-center">
                            <Server className="w-5 h-5 text-suse-base" />
                        </div>
                    </div>
                    <div className="bg-suse-base text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-lg shadow-suse-base/20">
                        Seed Cluster
                    </div>
                </div>

                {/* Joining Arrow */}
                <div className="flex flex-col items-center gap-1">
                    <motion.div
                        animate={{ x: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <ArrowRight className="w-6 h-6 text-slate-300" />
                    </motion.div>
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Joining</span>
                </div>

                {/* New Node */}
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col items-center gap-3"
                >
                    <div className="w-16 h-16 rounded-2xl bg-white border-2 border-dashed border-suse-base flex items-center justify-center relative">
                        <Server className="w-8 h-8 text-suse-base animate-pulse" />
                        <motion.div 
                            animate={{ scale: [1, 1.5, 1], opacity: [0, 0.5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 rounded-2xl bg-suse-base"
                        />
                    </div>
                    <span className="text-[9px] font-black text-suse-base uppercase tracking-tighter">New Node</span>
                </motion.div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm max-w-[240px]">
                <div className="flex items-center gap-2 mb-2">
                    <Lock className="w-3 h-3 text-suse-base" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Auth Handshake</span>
                </div>
                <p className="text-[9px] text-slate-500 leading-relaxed">
                    New nodes authenticate using the <span className="font-bold text-slate-700">Cluster Token</span> and fetch the configuration from the <span className="font-bold text-slate-700">VIP: {netSpecs?.clusterVip || "192.168.10.50"}</span>.
                </p>
            </div>
        </div>
    );
};

// --- Boot Simulator Component ---
const BootSimulator = ({ netSpecs }: { netSpecs: NetworkSpecs | undefined }) => {
    const [step, setStep] = useState(0);
    const steps = [
        {
            title: "Confirm installation options",
            content: (
                <div className="space-y-1 text-[8px] font-mono">
                    <div className="text-white">install mode: create</div>
                    <div className="text-white">hostname: susevirt15.demolab.com</div>
                    <div className="text-white">dns servers: 8.8.8.8</div>
                    <div className="text-white">ntp servers: 0.suse.pool.ntp.org</div>
                    <div className="text-white">device: /dev/nvme0n1</div>
                    <div className="text-white">persistent_partition_size: 150Gi</div>
                    <div className="text-white">vip: {netSpecs?.clusterVip || "192.168.149.174"}</div>
                    <div className="mt-2 p-1 bg-green-600 text-white text-center font-bold">
                        Yes
                    </div>
                </div>
            )
        },
        {
            title: "Installing OS...",
            content: (
                <div className="flex flex-col items-center justify-center h-full py-4">
                    <div className="w-full bg-slate-800 h-4 rounded-full overflow-hidden border border-slate-700">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 5, ease: "linear" }}
                            className="h-full bg-suse-base"
                        />
                    </div>
                    <p className="text-white mt-4 animate-pulse">Installation in progress...</p>
                </div>
            )
        },
        {
            title: "Harvester Console",
            content: (
                <div className="space-y-2 font-mono text-[9px]">
                    <div className="text-white text-center text-lg font-black mb-2">HARVESTER</div>
                    <div className="text-slate-400 text-center mb-4">version: v1.7.0</div>
                    <div className="p-2 border border-slate-700 rounded">
                        <p className="text-white">Harvester Cluster Management URL:</p>
                        <p className="text-suse-base font-black underline">https://{netSpecs?.clusterVip || "192.168.149.174"}</p>
                        <p className="text-white mt-2">Status: <span className="text-green-400">Ready</span></p>
                    </div>
                </div>
            )
        },
        {
            title: "Welcome to Harvester!",
            content: (
                <div className="space-y-3 bg-white p-4 rounded-xl text-slate-800">
                    <p className="text-[10px] font-bold">Set a specific password to use</p>
                    <div className="space-y-2">
                        <div className="p-2 bg-slate-100 border border-slate-200 rounded text-[9px]">New Password: ********</div>
                        <div className="p-2 bg-slate-100 border border-slate-200 rounded text-[9px]">Confirm New Password: ********</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 border border-suse-base rounded bg-suse-base"></div>
                        <span className="text-[8px]">By checking the box, you accept the End User License Agreement</span>
                    </div>
                    <div className="bg-suse-base text-white text-center py-2 rounded font-bold text-[10px]">Continue</div>
                </div>
            )
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setStep((prev) => (prev + 1) % steps.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [steps.length]);

    return (
        <div className="bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-800 shadow-2xl flex flex-col h-[320px]">
            <div className="bg-slate-800 px-6 py-3 border-b border-slate-700 flex justify-between items-center">
                <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500/40"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500/40"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500/40"></div>
                </div>
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">System Boot</span>
            </div>
            <div className="flex-1 p-6 font-mono text-[11px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="h-full flex flex-col"
                    >
                        <h5 className="text-suse-base font-bold mb-4 text-center uppercase tracking-tighter">{steps[step].title}</h5>
                        <div className="flex-1">
                            {steps[step].content}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

// --- Architecture Simulator Component ---
const ArchitectureSimulator = () => {
    return (
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center gap-6 h-[320px] justify-center relative overflow-hidden">
            <div className="absolute top-4 left-4 flex gap-4 text-[8px] font-black uppercase tracking-widest text-slate-400">
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-800"></div> VLAN 2</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-500"></div> VLAN 1</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-400"></div> MGMT</div>
            </div>

            <div className="flex gap-8 items-end">
                {[1, 2].map((node) => (
                    <div key={node} className="flex flex-col gap-1">
                        <div className="flex gap-1 mb-2">
                            {[1, 2, 3, 4].map(vm => (
                                <motion.div 
                                    key={vm}
                                    animate={{ y: [0, -2, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: vm * 0.2 }}
                                    className="w-6 h-8 bg-emerald-500 rounded-sm flex items-center justify-center text-[6px] text-white font-bold"
                                >
                                    VM
                                </motion.div>
                            ))}
                        </div>
                        <div className="flex gap-1">
                            <div className="w-12 h-4 bg-orange-500 rounded-sm text-[6px] text-white flex items-center justify-center font-bold">Longhorn</div>
                            <div className="w-12 h-4 bg-blue-600 rounded-sm text-[6px] text-white flex items-center justify-center font-bold">KubeVirt</div>
                        </div>
                        <div className="w-full h-6 bg-slate-900 rounded-sm text-[8px] text-white flex items-center justify-center font-bold">Linux</div>
                        <div className="w-full h-4 bg-slate-200 rounded-sm text-[8px] text-slate-600 flex items-center justify-center font-bold">Node {node}</div>
                    </div>
                ))}
            </div>
            
            <div className="w-full h-px bg-slate-100 mt-4"></div>
            <p className="text-[9px] text-slate-400 text-center font-medium italic">
                Replicating Harvester Architecture (Page 4)
            </p>
        </div>
    );
};

// --- Storage Simulator Component ---
const StorageSimulator = () => {
    const [step, setStep] = useState(0);
    const steps = [
        {
            title: "Volumes List",
            content: (
                <div className="space-y-2">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-bold">Volumes</span>
                        <div className="bg-suse-base text-white px-2 py-1 rounded text-[8px] font-bold">Create</div>
                    </div>
                    <div className="bg-slate-800 p-2 rounded border border-slate-700 text-[8px] text-slate-400 flex justify-between">
                        <span>State: <span className="text-green-400">Ready</span></span>
                        <span>Name: demo-vol</span>
                        <span>Size: 10Gi</span>
                    </div>
                </div>
            )
        },
        {
            title: "Volume: Create",
            content: (
                <div className="space-y-2 bg-white p-4 rounded-xl text-slate-800">
                    <div className="space-y-1">
                        <label className="text-[8px] font-black uppercase text-slate-400">Name</label>
                        <div className="p-1.5 bg-slate-50 border border-slate-200 rounded text-[9px]">demo-volume</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                            <label className="text-[8px] font-black uppercase text-slate-400">Source</label>
                            <div className="p-1.5 bg-slate-50 border border-slate-200 rounded text-[9px]">New</div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[8px] font-black uppercase text-slate-400">Size (Gi)</label>
                            <div className="p-1.5 bg-slate-50 border border-slate-200 rounded text-[9px]">10</div>
                        </div>
                    </div>
                    <div className="bg-suse-base text-white text-center py-1.5 rounded font-bold text-[9px] mt-2">Create</div>
                </div>
            )
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setStep((prev) => (prev + 1) % steps.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [steps.length]);

    return (
        <div className="bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-800 shadow-2xl flex flex-col h-[280px]">
            <div className="bg-slate-800 px-6 py-3 border-b border-slate-700 flex justify-between items-center">
                <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500/40"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500/40"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500/40"></div>
                </div>
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Harvester UI</span>
            </div>
            <div className="flex-1 p-6 font-mono text-[11px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="h-full flex flex-col"
                    >
                        <h5 className="text-suse-base font-bold mb-4">{steps[step].title}</h5>
                        <div className="flex-1">
                            {steps[step].content}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

// --- POC Simulator Component ---
const POCSimulator = ({ goals }: { goals: string[] }) => {
    const [activeGoal, setActiveGoal] = useState(0);
    const displayGoals = goals.length > 0 ? goals : ["Installing Harvester from ISO", "Adding additional Nodes", "Configuring HTTP Proxy", "Create a VLAN network"];

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveGoal((prev) => (prev + 1) % displayGoals.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [displayGoals.length]);

    return (
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col gap-6 h-[320px]">
            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Activity className="w-3 h-3" /> POC Verification (Page 7)
            </h5>
            <div className="space-y-2">
                <div className="grid grid-cols-12 text-[8px] font-black text-slate-400 uppercase tracking-widest border-b pb-2">
                    <div className="col-span-1">#</div>
                    <div className="col-span-5">Items</div>
                    <div className="col-span-6">Test cases</div>
                </div>
                {displayGoals.map((goal, i) => (
                    <motion.div
                        key={i}
                        animate={{ 
                            backgroundColor: activeGoal === i ? 'rgba(48, 186, 120, 0.1)' : 'transparent',
                            x: activeGoal === i ? 5 : 0
                        }}
                        className="grid grid-cols-12 p-2 rounded-lg text-[9px] items-center"
                    >
                        <div className="col-span-1 font-bold text-slate-400">{i + 1}</div>
                        <div className="col-span-5 font-bold text-slate-700">Deployment</div>
                        <div className="col-span-6 flex items-center justify-between">
                            <span className="text-slate-500">{goal}</span>
                            {activeGoal === i && <CheckCircle2 className="w-3 h-3 text-suse-base" />}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

// --- Rancher Simulator Component ---
const RancherSimulator = () => {
    const [step, setStep] = useState(0);
    const steps = [
        {
            title: "Virtualization Management",
            content: (
                <div className="space-y-3">
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-[10px] font-bold">Harvester Clusters</span>
                            <div className="bg-suse-base text-white px-3 py-1 rounded text-[8px] font-black uppercase">Import Existing</div>
                        </div>
                        <div className="py-8 text-center border-2 border-dashed border-slate-100 rounded-lg">
                            <p className="text-[9px] text-slate-400">There are no Harvester Clusters</p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "Harvester Cluster: Create",
            content: (
                <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-200">
                    <div className="space-y-1">
                        <label className="text-[8px] font-black uppercase text-slate-400">Cluster Name</label>
                        <div className="p-1.5 bg-slate-50 border border-slate-200 rounded text-[9px]">demo-cluster</div>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            <span className="text-[8px] font-bold text-blue-800">Registration Guide</span>
                        </div>
                        <p className="text-[7px] text-blue-600 leading-tight">Go to Advanced {"->"} Settings and find cluster-registration-url...</p>
                    </div>
                    <div className="flex justify-end gap-2 mt-2">
                        <div className="px-3 py-1 border border-slate-200 rounded text-[8px] font-bold">Cancel</div>
                        <div className="px-3 py-1 bg-suse-base text-white rounded text-[8px] font-bold">Create</div>
                    </div>
                </div>
            )
        },
        {
            title: "Harvester Dashboard (Inside Rancher)",
            content: (
                <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-2">
                        {[
                            { label: "Hosts", val: "4" },
                            { label: "VMs", val: "2" },
                            { label: "Networks", val: "3" }
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-2 rounded border border-slate-100 shadow-sm text-center">
                                <div className="text-[10px] font-black text-slate-800">{stat.val}</div>
                                <div className="text-[7px] text-slate-400 uppercase">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-white p-3 rounded border border-slate-100 shadow-sm">
                        <div className="flex justify-between text-[7px] mb-1">
                            <span className="font-bold">CPU Capacity</span>
                            <span className="text-suse-base">29.90%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-suse-base h-full w-[30%]"></div>
                        </div>
                    </div>
                </div>
            )
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setStep((prev) => (prev + 1) % steps.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [steps.length]);

    return (
        <div className="bg-slate-50 rounded-[2.5rem] border border-slate-200 overflow-hidden flex flex-col h-[320px] shadow-inner">
            <div className="bg-white px-6 py-4 border-b border-slate-200 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-lg">R</div>
                <div>
                    <div className="text-[10px] font-black text-slate-800 uppercase tracking-tight">Rancher Manager</div>
                    <div className="text-[8px] text-slate-400 font-medium">Multi-Cluster Dashboard</div>
                </div>
            </div>
            <div className="flex-1 p-6 flex flex-col">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex-1"
                    >
                        <h6 className="text-[9px] font-black text-slate-400 uppercase mb-3 tracking-widest">{steps[step].title}</h6>
                        {steps[step].content}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

// --- Advanced Ops Simulator Component ---
const AdvancedOpsSimulator = () => {
    const [step, setStep] = useState(0);
    const steps = [
        {
            title: "Optional: configure proxy",
            content: (
                <div className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-[10px] text-white">Proxy address</label>
                        <div className="p-2 bg-slate-800 border border-suse-base text-white font-mono text-[10px]">
                            http://proxy.example.com:3128
                        </div>
                    </div>
                    <p className="text-slate-500 text-[8px] italic">Note: In the form of "http://[[user]:pass@]host[:port]/".</p>
                </div>
            )
        },
        {
            title: "Multi-Tenancy: Create User",
            content: (
                <div className="space-y-3 bg-white p-4 rounded-xl text-slate-800">
                    <div className="space-y-1">
                        <label className="text-[8px] font-black uppercase text-slate-400">Username</label>
                        <div className="p-1.5 bg-slate-50 border border-slate-200 rounded text-[9px]">project-owner</div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[8px] font-black uppercase text-slate-400">Project Role</label>
                        <div className="flex gap-2">
                            <div className="flex-1 p-1.5 bg-suse-base text-white rounded text-[8px] text-center font-bold">Owner</div>
                            <div className="flex-1 p-1.5 bg-slate-100 text-slate-400 rounded text-[8px] text-center">Read Only</div>
                        </div>
                    </div>
                    <div className="bg-suse-base text-white text-center py-1.5 rounded font-bold text-[9px] mt-2">Add</div>
                </div>
            )
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setStep((prev) => (prev + 1) % steps.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [steps.length]);

    return (
        <div className="bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-800 shadow-2xl flex flex-col h-[320px]">
            <div className="bg-slate-800 px-6 py-3 border-b border-slate-700 flex justify-between items-center">
                <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500/40"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500/40"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500/40"></div>
                </div>
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Advanced Ops</span>
            </div>
            <div className="flex-1 p-8 font-mono text-[11px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="h-full flex flex-col"
                    >
                        <h5 className="text-suse-base font-bold mb-4">{steps[step].title}</h5>
                        <div className="flex-1">
                            {steps[step].content}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

interface Props {
  lang: Language;
  netSpecs?: NetworkSpecs;
  goals?: string[];
}

export const InstallGuide: React.FC<Props> = ({ lang, netSpecs, goals = [] }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const t = translations[lang];

  const sections = [
    { id: 'overview', icon: <LayoutTemplate className="w-4 h-4" />, label: t.installGuide.sections.overview },
    { id: 'planning', icon: <Cpu className="w-4 h-4" />, label: t.installGuide.sections.planning },
    { id: 'install', icon: <Play className="w-4 h-4" />, label: t.installGuide.sections.install },
    { id: 'config', icon: <Settings className="w-4 h-4" />, label: t.installGuide.sections.config },
    { id: 'storage', icon: <HardDrive className="w-4 h-4" />, label: t.installGuide.sections.storage },
    { id: 'poc-goals', icon: <FileCheck className="w-4 h-4" />, label: t.installGuide.sections.pocGoals, count: goals.length },
    { id: 'rancher', icon: <Cloud className="w-4 h-4" />, label: t.installGuide.sections.rancher },
    { id: 'advanced', icon: <Zap className="w-4 h-4" />, label: t.installGuide.sections.advanced },
    { id: 'troubleshooting', icon: <Bug className="w-4 h-4" />, label: t.installGuide.sections.troubleshooting },
  ];

  const handleNext = () => {
    const idx = sections.findIndex(s => s.id === activeSection);
    if (idx < sections.length - 1) {
      setActiveSection(sections[idx + 1].id);
      window.scrollTo(0, 0);
    }
  };

  const StepBox = ({ title, desc, icon: Icon, colorClass = "bg-slate-50 border-slate-200" }: any) => (
    <div className={`p-5 rounded-2xl border flex gap-4 ${colorClass} animate-fade-in transition-all hover:shadow-md`}>
        {Icon && <div className="shrink-0"><Icon className="w-6 h-6 opacity-80" /></div>}
        <div>
            <h4 className="font-bold text-sm mb-1">{title}</h4>
            <p className="text-[11px] leading-relaxed opacity-70">{desc}</p>
        </div>
    </div>
  );

  const SectionHeader = ({ title, subtitle, icon: Icon, docUrl }: any) => (
    <div className="mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-suse-base/10 rounded-2xl">
                    <Icon className="w-8 h-8 text-suse-base" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-suse-dark">{title}</h1>
                    <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
                </div>
            </div>
            {docUrl && (
                <a 
                  href={docUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-suse-base hover:text-white transition-all shadow-sm shrink-0"
                >
                    <BookOpen className="w-4 h-4" /> Official Docs <ExternalLink className="w-3.5 h-3.5" />
                </a>
            )}
        </div>
        <div className="h-0.5 bg-gradient-to-r from-suse-base/20 to-transparent w-full"></div>
    </div>
  );

  const renderContent = () => {
    switch(activeSection) {
      case 'overview':
        return (
          <div className="space-y-6 animate-fade-in">
            <SectionHeader title={t.installGuide.overview.title} subtitle={t.installGuide.overview.subtitle} icon={LayoutTemplate} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 flex gap-5 shadow-sm">
                <Zap className="w-12 h-12 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-emerald-800 text-lg">{t.installGuide.overview.hciTitle}</h4>
                  <p className="text-xs text-emerald-700 mt-2 leading-relaxed">{t.installGuide.overview.hciDesc}</p>
                </div>
              </div>
              <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex gap-5 shadow-sm">
                <ShieldCheck className="w-12 h-12 text-blue-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-blue-800 text-lg">{t.installGuide.overview.prodTitle}</h4>
                  <p className="text-xs text-blue-700 mt-2 leading-relaxed">{t.installGuide.overview.prodDesc}</p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Monitor className="w-3 h-3" /> Harvester Architecture v1.7
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <ArchitectureSimulator />
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-[9px] font-black text-suse-base uppercase">Compute</span>
                    <p className="text-[10px] text-slate-600 mt-1 font-bold">KubeVirt / KVM</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-[9px] font-black text-suse-base uppercase">Storage</span>
                    <p className="text-[10px] text-slate-600 mt-1 font-bold">SUSE Longhorn SDS</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-[9px] font-black text-suse-base uppercase">Network</span>
                    <p className="text-[10px] text-slate-600 mt-1 font-bold">Multus / Canal / Bridge</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'planning':
          return (
              <div className="space-y-8 animate-fade-in">
                  <SectionHeader title={t.installGuide.planning.title} subtitle={t.installGuide.planning.desc} icon={Cpu} docUrl="https://docs.harvesterhci.io/v1.7/install/requirements/" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <StepBox icon={Monitor} title="Compute / CPU" desc={t.installGuide.planning.cpu} />
                      <StepBox icon={Activity} title="Memory / RAM" desc={t.installGuide.planning.ram} />
                      <StepBox icon={Network} title="Fabric / 10G" desc={t.installGuide.planning.network} />
                      <StepBox icon={Shuffle} title="Switch Tuning" desc={t.installGuide.planning.mtu} colorClass="bg-amber-50 border-amber-100 text-amber-900" />
                      <StepBox icon={Settings} title="BIOS/UEFI" desc={t.installGuide.planning.bios} />
                      <StepBox icon={Globe} title="Connectivity" desc={t.installGuide.planning.internet} />
                  </div>
                  <div className="p-6 bg-suse-dark text-white rounded-[2.5rem] flex flex-col md:flex-row gap-6 items-center shadow-xl border border-suse-base/20">
                      <div className="p-4 bg-suse-base/20 rounded-2xl"><Info className="w-8 h-8 text-suse-base shrink-0" /></div>
                      <div>
                        <h5 className="font-bold text-suse-light mb-1">Expert Planning Note</h5>
                        <p className="text-xs leading-relaxed opacity-80 italic">Precision in network planning is the #1 success factor. If utilizing PXE boot for large clusters, Harvester v1.7 supports standard iPXE and Matchbox integration for fully automated zero-touch provisioning.</p>
                      </div>
                  </div>
              </div>
          );

      case 'install':
          return (
              <div className="space-y-8 animate-fade-in">
                  <SectionHeader title={t.installGuide.install.title} subtitle="Detailed workflow for cluster initialization." icon={Play} docUrl="https://docs.harvesterhci.io/v1.7/install/iso-install/" />
                  
                  <div className="space-y-12">
                      {/* Step 1: Seed Node */}
                      <div className="flex gap-8 items-start relative">
                          <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-slate-100 -z-10"></div>
                          <div className="w-12 h-12 rounded-2xl bg-suse-base text-white flex items-center justify-center font-black text-xl shrink-0 shadow-lg shadow-suse-base/20">1</div>
                          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex-1 space-y-6">
                              <div>
                                  <h4 className="font-bold text-xl mb-3">Cluster Genesis (Seed Node)</h4>
                                  <p className="text-sm text-gray-600 leading-relaxed">{t.installGuide.install.node1}</p>
                              </div>

                              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                                  <div className="space-y-4">
                                      <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                          <Monitor className="w-3 h-3" /> {t.installGuide.install.tuiTitle}
                                      </h5>
                                      <div className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden">
                                          <table className="w-full text-[10px]">
                                              <thead className="bg-slate-100 text-slate-500 font-bold">
                                                  <tr>
                                                      <th className="px-4 py-2 text-left">Parameter</th>
                                                      <th className="px-4 py-2 text-left">Value / Action</th>
                                                  </tr>
                                              </thead>
                                              <tbody className="divide-y divide-slate-100">
                                                  <tr>
                                                      <td className="px-4 py-2 font-bold">Installation Mode</td>
                                                      <td className="px-4 py-2">Create a new Harvester cluster</td>
                                                  </tr>
                                                  <tr>
                                                      <td className="px-4 py-2 font-bold">Installation Device</td>
                                                      <td className="px-4 py-2">Select OS Disk (min 250GB)</td>
                                                  </tr>
                                                  <tr>
                                                      <td className="px-4 py-2 font-bold">Cluster VIP</td>
                                                      <td className="px-4 py-2 text-suse-base font-black">{netSpecs?.clusterVip || "192.168.10.50"}</td>
                                                  </tr>
                                                  <tr>
                                                      <td className="px-4 py-2 font-bold">Default Gateway</td>
                                                      <td className="px-4 py-2">{netSpecs?.gatewayIp || "192.168.10.1"}</td>
                                                  </tr>
                                                  <tr>
                                                      <td className="px-4 py-2 font-bold">DNS Servers</td>
                                                      <td className="px-4 py-2">{netSpecs?.dnsServers || "8.8.8.8"}</td>
                                                  </tr>
                                                  <tr>
                                                      <td className="px-4 py-2 font-bold">Cluster Token</td>
                                                      <td className="px-4 py-2 italic">Set a secure shared secret</td>
                                                  </tr>
                                              </tbody>
                                          </table>
                                      </div>
                                  </div>
                                  <div className="space-y-6">
                                      <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                          <Zap className="w-3 h-3 text-yellow-500" /> Interactive TUI Simulator
                                      </h5>
                                      <TUISimulator netSpecs={netSpecs} />
                                  </div>
                              </div>

                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                                 <div className="p-6 bg-blue-50 text-blue-700 rounded-[2rem] text-[11px] font-medium flex items-start gap-4 border border-blue-100">
                                    <AlertCircle className="w-5 h-5 shrink-0 text-blue-500" /> 
                                    <div>
                                       <span className="block mb-1 text-blue-900 font-black uppercase tracking-widest">VIP Stability Warning</span>
                                       Ensure the VIP is statically assigned in your switch/router and doesn&apos;t conflict with any active DHCP pools. etcd relies heavily on this IP stability.
                                    </div>
                                 </div>
                                 <NetworkDiagram netSpecs={netSpecs} />
                              </div>
                          </div>
                      </div>

                      {/* Step 2: Expansion */}
                      <div className="flex gap-8 items-start relative">
                          <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-slate-100 -z-10"></div>
                          <div className="w-12 h-12 rounded-2xl bg-suse-dark text-white flex items-center justify-center font-black text-xl shrink-0 shadow-lg shadow-suse-dark/20">2</div>
                          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex-1 space-y-6">
                              <div>
                                  <h4 className="font-bold text-xl mb-3">Expansion (Joining Nodes)</h4>
                                  <p className="text-sm text-gray-600 leading-relaxed">{t.installGuide.install.node2}</p>
                              </div>
                              
                              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                                  <div className="space-y-6">
                                      <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                          <Terminal className="w-3 h-3" /> {t.installGuide.install.consoleTitle}
                                      </h5>
                                      <TUISimulator netSpecs={netSpecs} mode="join" />
                                  </div>
                                  <div className="space-y-6">
                                      <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                          <Shuffle className="w-3 h-3 text-suse-base" /> Cluster Expansion Logic
                                      </h5>
                                      <JoinDiagram netSpecs={netSpecs} />
                                  </div>
                              </div>
                              <div className="mt-8 pt-8 border-t border-slate-100">
                                  <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                      <FileCheck className="w-3 h-3" /> Final Confirmation & Boot
                                  </h5>
                                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                      <BootSimulator netSpecs={netSpecs} />
                                      <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 flex flex-col justify-center">
                                          <h6 className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-4">Post-Install Checklist</h6>
                                          <ul className="space-y-3">
                                              <li className="flex items-center gap-3 text-[11px] text-slate-600">
                                                  <CheckCircle2 className="w-4 h-4 text-green-500" /> Remove ISO/USB Media
                                              </li>
                                              <li className="flex items-center gap-3 text-[11px] text-slate-600">
                                                  <CheckCircle2 className="w-4 h-4 text-green-500" /> Verify VIP Connectivity
                                              </li>
                                              <li className="flex items-center gap-3 text-[11px] text-slate-600">
                                                  <CheckCircle2 className="w-4 h-4 text-green-500" /> Access Web UI at https://{netSpecs?.clusterVip || "192.168.10.50"}
                                              </li>
                                          </ul>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>

                  <div className="p-8 bg-slate-900 border border-slate-800 rounded-[2.5rem] flex items-center gap-8 text-white shadow-2xl">
                      <div className="w-16 h-16 rounded-full bg-suse-base/20 flex items-center justify-center shrink-0">
                          <RefreshCw className="w-8 h-8 animate-spin-slow text-suse-base" />
                      </div>
                      <div>
                          <h5 className="font-bold text-lg mb-1">Finalizing Installation</h5>
                          <p className="text-xs text-slate-400 leading-relaxed">{t.installGuide.install.reboot}</p>
                      </div>
                  </div>
              </div>
          );

      case 'config':
          return (
              <div className="space-y-8 animate-fade-in">
                  <SectionHeader title={t.installGuide.config.title} subtitle="Post-installation optimization and network fabric setup." icon={Settings} docUrl="https://docs.harvesterhci.io/v1.7/networking/harvester-network/" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <StepBox icon={Globe} title="Web Access" desc={t.installGuide.config.url.replace('[VIP]', netSpecs?.clusterVip || "192.168.10.50")} />
                        <StepBox icon={Lock} title="Admin Auth" desc={t.installGuide.config.password} />
                        <StepBox icon={Shuffle} title="VLAN & Bridge" desc={t.installGuide.config.settings} />
                        <StepBox icon={Database} title="Backup Target" desc={t.installGuide.config.backup} colorClass="bg-purple-50 border-purple-100 text-purple-900" />
                    </div>
                    <div className="space-y-6">
                        <UISnapshot type="dashboard" title="Settings -&gt; Management Network" imageSrc="https://picsum.photos/seed/harvester-network/800/600" />
                        <div className="bg-amber-50 p-6 rounded-[2rem] border border-amber-100">
                            <h5 className="text-[11px] font-black text-amber-800 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4" /> Config Troubleshooting
                            </h5>
                            <ul className="text-[10px] text-amber-700 space-y-2 font-medium leading-relaxed">
                                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1"></div> If VMs lose connectivity during large file transfers, verify that the Harvester Bridge MTU matches the physical switch MTU.</li>
                                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1"></div> Ensure the NTP servers are reachable. Time drift &gt; 500ms will cause etcd to crash.</li>
                            </ul>
                        </div>
                    </div>
                  </div>
              </div>
          );

      case 'storage':
          return (
              <div className="space-y-8 animate-fade-in">
                  <SectionHeader title={t.installGuide.storage.title} subtitle="Managing the Longhorn Software-Defined Storage layer." icon={HardDrive} docUrl="https://docs.harvesterhci.io/v1.7/storage/storage-class/" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                          <StepBox icon={Layers} title="Replica Policy" desc={t.installGuide.storage.replica} />
                          <StepBox icon={Disc} title="High Performance Media" desc={t.installGuide.storage.ssd} />
                          <StepBox icon={Plus} title="Online Expansion" desc={t.installGuide.storage.expansion} />
                      </div>
                      <div className="flex flex-col gap-6">
                          <StorageSimulator />
                          <div className="p-8 bg-red-50 border border-red-100 rounded-[2.5rem] shadow-sm space-y-4">
                              <h4 className="font-bold text-red-800 text-lg flex items-center gap-3"><ShieldAlert className="w-6 h-6" /> etcd Stability Check</h4>
                              <p className="text-xs text-red-700 leading-relaxed font-medium">{t.installGuide.storage.bench}</p>
                              <div className="bg-white/50 p-4 rounded-xl border border-red-200 text-[10px] font-mono text-red-800 shadow-inner">
                                  <span className="block mb-2 opacity-50"># Command to verify disk performance:</span>
                                  fio --name=etcd --rw=write --bs=4k --size=10M --sync=1
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          );

      case 'poc-goals':
        const procedures = GOAL_PROCEDURES_LOCALIZED[lang];
        return (
          <div className="space-y-8 animate-fade-in">
            <SectionHeader title={t.installGuide.sections.pocGoals} subtitle="Functional validation for client acceptance." icon={FileCheck} />

            {goals.length === 0 ? (
              <div className="py-24 text-center border-4 border-dotted border-gray-100 rounded-[3rem] bg-gray-50/50">
                 <Target className="w-20 h-20 mx-auto text-gray-200 mb-6 opacity-30" />
                 <h3 className="text-gray-400 font-bold text-xl">{lang === 'en' ? "No objectives selected" : "Nenhum objetivo selecionado"}</h3>
                 <p className="text-gray-400 text-sm max-w-xs mx-auto mt-2">{lang === 'en' ? "Go back to 'Project' and select items to validate." : "Volte ao menu de Projeto e selecione os itens desejados."}</p>
              </div>
            ) : (
              <div className="space-y-10">
                {goals.map((goal, idx) => {
                  const data = procedures[goal] || { steps: ["Consult official documentation at docs.harvesterhci.io."], icon: Target, dependencies: [], docsUrl: "https://docs.harvesterhci.io", tip: "", resourceLinks: [] };
                  const Icon = data.icon || Target;
                  return (
                    <div key={idx} className="bg-white border-2 border-gray-100 rounded-[2.5rem] shadow-sm overflow-hidden group hover:border-suse-base transition-all duration-500">
                      <div className="bg-gray-50/80 px-10 py-6 border-b border-gray-100 flex items-center justify-between group-hover:bg-suse-base/5 transition-colors">
                        <div className="flex items-center gap-6">
                            <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 text-suse-base transition-transform group-hover:rotate-6">
                                <Icon className="w-7 h-7" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800 text-xl leading-tight">{goal}</h4>
                                <div className="flex items-center gap-3 mt-2">
                                    <a href={data.docsUrl} target="_blank" rel="noreferrer" className="text-[10px] text-gray-400 uppercase font-black tracking-widest hover:text-suse-base flex items-center gap-1.5 transition-colors">
                                        <BookOpen className="w-3 h-3" /> {t.common.officialDocs} <ExternalLink className="w-2.5 h-2.5" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="hidden sm:block">
                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Step {idx + 1}</span>
                        </div>
                      </div>

                      <div className="p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
                        <div className="lg:col-span-7 space-y-8">
                            <div>
                                <div className="flex items-center gap-3 text-gray-900 font-black text-xs uppercase tracking-widest mb-6">
                                    <Monitor className="w-4.5 h-4.5 text-suse-base" /> {lang === 'en' ? "Technical Procedure" : "Procedimento Técnico"}
                                </div>
                                <ul className="space-y-5">
                                {data.steps.map((s: string, sIdx: number) => (
                                    <li key={sIdx} className="flex gap-5 text-sm text-gray-600 leading-relaxed group/item">
                                        <span className="w-7 h-7 bg-slate-100 rounded-xl flex items-center justify-center shrink-0 font-black text-xs text-slate-500 group-hover/item:bg-suse-base group-hover/item:text-white transition-all shadow-sm">{sIdx + 1}</span>
                                        <span className="pt-1">{s}</span>
                                    </li>
                                ))}
                                </ul>
                            </div>

                            {data.imageSrc && (
                                <div className="mt-10">
                                    <div className="flex items-center gap-3 text-gray-900 font-black text-[10px] uppercase tracking-widest mb-4">
                                        <Eye className="w-4 h-4 text-suse-base" /> {lang === 'en' ? "Visual Reference" : "Referência Visual"}
                                    </div>
                                    <POCSimulator goals={goals} />
                                </div>
                            )}
                            
                            {data.tip && (
                                <div className="p-6 bg-amber-50/50 border-l-8 border-amber-400 rounded-2xl flex gap-5 items-start shadow-sm">
                                    <Wrench className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-[11px] text-amber-800 font-black uppercase tracking-[0.2em] mb-1.5">{t.common.expertTip}</p>
                                        <p className="text-[11px] text-amber-900/80 leading-relaxed font-medium">{data.tip}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="lg:col-span-5 space-y-10 lg:border-l lg:pl-10 border-gray-100">
                            <div>
                                <div className="flex items-center gap-3 text-gray-900 font-black text-[10px] uppercase tracking-widest mb-6">
                                    <AlertCircle className="w-4 h-4 text-orange-500" /> {t.common.techDependencies}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {data.dependencies.map((dep: string, dIdx: number) => (
                                        <span key={dIdx} className="text-[9px] font-bold text-gray-500 bg-gray-50 px-3 py-2 rounded-xl border border-gray-200 flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                                            {dep}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {data.resourceLinks && data.resourceLinks.length > 0 && (
                                <div>
                                    <div className="flex items-center gap-3 text-gray-900 font-black text-[10px] uppercase tracking-widest mb-6">
                                        <Download className="w-4 h-4 text-blue-500" /> {t.common.resourceLinks}
                                    </div>
                                    <div className="grid grid-cols-1 gap-3">
                                        {data.resourceLinks.map((link: any, lIdx: number) => (
                                            <a 
                                                key={lIdx}
                                                href={link.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center justify-between bg-blue-50/40 border border-blue-100 px-5 py-4 rounded-2xl hover:bg-blue-100 hover:border-blue-200 transition-all group/link shadow-sm"
                                            >
                                                <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest">{link.label}</span>
                                                <ExternalLink className="w-4 h-4 text-blue-400 group-hover/link:translate-x-1 group-hover/link:text-blue-600 transition-all" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );

      case 'rancher':
        return (
          <div className="space-y-12 animate-fade-in">
             <SectionHeader 
                title={t.installGuide.rancher.title} 
                subtitle={t.installGuide.rancher.subtitle} 
                icon={Cloud} 
                docUrl="https://docs.harvesterhci.io/v1.7/rancher/rancher-integration/"
             />

             <div className="space-y-20">
                {/* Step 1: Feature Flags */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <span className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-blue-200">1</span>
                            <h3 className="text-2xl font-bold text-gray-800">{t.installGuide.rancher.step1}</h3>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed bg-slate-50 p-6 rounded-[2rem] border border-slate-100">{t.installGuide.rancher.step1Desc}</p>
                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                           <CheckCircle2 className="w-4 h-4 text-suse-base" /> Requires Rancher v2.8.0 or newer
                        </div>
                    </div>
                    <RancherSimulator />
                </div>

                {/* Step 2: Import */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="order-2 lg:order-1">
                        <RancherSimulator />
                    </div>
                    <div className="space-y-6 order-1 lg:order-2">
                        <div className="flex items-center gap-4">
                            <span className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-blue-200">2</span>
                            <h3 className="text-2xl font-bold text-gray-800">{t.installGuide.rancher.step2}</h3>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed bg-slate-50 p-6 rounded-[2rem] border border-slate-100">{t.installGuide.rancher.step2Desc}</p>
                        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-3">
                            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            <span className="text-[10px] text-amber-800 font-medium italic">Important: If using self-signed certificates, ensure &apos;Skip TLS verification&apos; is checked or the Harvester CA is imported into Rancher.</span>
                        </div>
                    </div>
                </div>

                {/* Step 3: Cloud Credentials */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <span className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-blue-200">3</span>
                            <h3 className="text-2xl font-bold text-gray-800">{t.installGuide.rancher.step3}</h3>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed bg-slate-50 p-6 rounded-[2rem] border border-slate-100">{t.installGuide.rancher.step3Desc}</p>
                    </div>
                    <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
                        <div className="relative z-10 space-y-4">
                            <div className="flex items-center gap-3 text-suse-light">
                                <Key className="w-6 h-6" />
                                <span className="text-xs font-black uppercase tracking-widest">Credential Flow</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="bg-white/10 px-4 py-3 rounded-xl border border-white/10 text-white text-[10px] font-mono">1. Cluster Mgmt -&gt; Cloud Credentials</div>
                                <div className="bg-white/10 px-4 py-3 rounded-xl border border-white/10 text-white text-[10px] font-mono">2. Select &apos;Harvester&apos; provider</div>
                                <div className="bg-white/10 px-4 py-3 rounded-xl border border-white/10 text-white text-[10px] font-mono">3. Paste Harvester Bearer Token</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Step 4: RKE2 Provisioning */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="order-2 lg:order-1">
                        <RancherSimulator />
                    </div>
                    <div className="space-y-6 order-1 lg:order-2">
                        <div className="flex items-center gap-4">
                            <span className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-blue-200">4</span>
                            <h3 className="text-2xl font-bold text-gray-800">4. {lang === 'en' ? "Provision RKE2 Clusters" : "Provisionar Clusters RKE2"}</h3>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed bg-slate-50 p-6 rounded-[2rem] border border-slate-100">{t.installGuide.rancher.step4Desc}</p>
                    </div>
                </div>

                {/* Troubleshooting Integration Deep Dive */}
                <div className="bg-slate-900 text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
                    <div className="absolute -right-10 -bottom-10 opacity-10">
                        <ShieldCheck className="w-80 h-80" />
                    </div>
                    <h4 className="text-2xl font-bold mb-6 flex items-center gap-4 text-suse-light">
                        <Bug className="w-8 h-8" /> Integration Troubleshooting
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center shrink-0 font-black text-xs">!</div>
                                <div>
                                    <h5 className="font-bold text-sm text-white">Certificate Trust Issues</h5>
                                    <p className="text-[10px] text-slate-400 leading-relaxed mt-1">If the cluster stays in &apos;Pending&apos; for &gt; 10m, check the cattle-cluster-agent pods for &quot;x509: certificate signed by unknown authority&quot;. Add your Rancher CA to Harvester Settings -&gt; Additional-CA.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center shrink-0 font-black text-xs">!</div>
                                <div>
                                    <h5 className="font-bold text-sm text-white">VIP Connectivity (Port 443)</h5>
                                    <p className="text-[10px] text-slate-400 leading-relaxed mt-1">Ensure Rancher can reach the Harvester VIP on port 443. Some firewalls block Gratuitous ARP packets used by kube-vip.</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                             <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center shrink-0 font-black text-xs">!</div>
                                <div>
                                    <h5 className="font-bold text-sm text-white">Agent Sync Latency</h5>
                                    <p className="text-[10px] text-slate-400 leading-relaxed mt-1">If using Rancher v2.7 or older, certain Harvester v1.7 dashboard components might not render correctly. Upgrade to v2.8.x for full compatibility.</p>
                                </div>
                            </div>
                            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                                <p className="text-[10px] font-black uppercase tracking-widest text-suse-base mb-2">Support Tip</p>
                                <p className="text-[10px] text-slate-300 italic">&quot;Always verify that Harvester can resolve the Rancher URL via DNS before starting the import process.&quot;</p>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
          </div>
        );

      case 'advanced':
        return (
          <div className="space-y-8 animate-fade-in">
              <SectionHeader title={t.installGuide.advanced.title} subtitle={t.installGuide.advanced.subtitle} icon={Zap} docUrl="https://docs.harvesterhci.io/v1.7/install/settings/" />
              
              <div className="grid grid-cols-1 gap-12">
                  {/* Air-Gap */}
                  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                      <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                              <Wifi className="w-6 h-6" />
                          </div>
                          <div>
                              <h4 className="font-bold text-lg">{t.installGuide.advanced.airgap}</h4>
                              <p className="text-xs text-slate-500">{t.installGuide.advanced.airgapDesc}</p>
                          </div>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                          <AdvancedOpsSimulator />
                          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                              <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Air-Gap Requirements</h5>
                              <ul className="space-y-3">
                                  <li className="flex gap-3 text-[11px] text-slate-600">
                                      <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                                      <span>Private Container Registry (Harvester/Rancher images).</span>
                                  </li>
                                  <li className="flex gap-3 text-[11px] text-slate-600">
                                      <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                                      <span>Local NTP and DNS services.</span>
                                  </li>
                                  <li className="flex gap-3 text-[11px] text-slate-600">
                                      <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                                      <span>Internal S3-compatible storage for backups.</span>
                                  </li>
                              </ul>
                          </div>
                      </div>
                  </div>

                  {/* Multi-Tenancy */}
                  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                      <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
                              <Lock className="w-6 h-6" />
                          </div>
                          <div>
                              <h4 className="font-bold text-lg">{t.installGuide.advanced.tenancy}</h4>
                              <p className="text-xs text-slate-500">{t.installGuide.advanced.tenancyDesc}</p>
                          </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <AdvancedOpsSimulator />
                          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                              <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">RBAC Best Practices</h5>
                              <ul className="space-y-3">
                                  <li className="flex gap-3 text-[11px] text-slate-600">
                                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                                      <span>Use <strong>Project Owner</strong> for department admins.</span>
                                  </li>
                                  <li className="flex gap-3 text-[11px] text-slate-600">
                                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                                      <span>Use <strong>Read-Only</strong> for monitoring/auditing teams.</span>
                                  </li>
                                  <li className="flex gap-3 text-[11px] text-slate-600">
                                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                                      <span>Integrate with <strong>Active Directory / LDAP</strong> in Rancher.</span>
                                  </li>
                              </ul>
                          </div>
                      </div>
                  </div>

                  {/* RKE2 */}
                  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                      <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                              <Cloud className="w-6 h-6" />
                          </div>
                          <div>
                              <h4 className="font-bold text-lg">{t.installGuide.advanced.rke2}</h4>
                              <p className="text-xs text-slate-500">{t.installGuide.advanced.rke2Desc}</p>
                          </div>
                      </div>
                      <AdvancedOpsSimulator />
                  </div>
              </div>
          </div>
        );

      case 'troubleshooting':
          return (
            <div className="space-y-8 animate-fade-in">
                <SectionHeader title={t.installGuide.troubleshooting.title} subtitle="Resolving common environmental blockers." icon={Bug} docUrl="https://docs.harvesterhci.io/v1.7/troubleshooting/" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <StepBox icon={ShieldX} title="Kernel / Initrd" desc={t.installGuide.troubleshooting.initrd} colorClass="bg-red-50 border-red-100 text-red-900" />
                    <StepBox icon={Wifi} title="Network / VIP" desc={t.installGuide.troubleshooting.vip} colorClass="bg-red-50 border-red-100 text-red-900" />
                    <StepBox icon={Activity} title="SDS Performance" desc={t.installGuide.troubleshooting.etcd} colorClass="bg-red-50 border-red-100 text-red-900" />
                    <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white flex flex-col justify-center gap-4 border border-slate-800 shadow-xl">
                        <h4 className="font-bold flex items-center gap-3 text-suse-base"><CheckCircle2 className="w-5 h-5" /> Need Support Evidence?</h4>
                        <p className="text-xs text-slate-400 leading-relaxed">Run <code>harvester-generate-bundle</code> from any node and provide the .tar.gz file to SUSE Support via SCC.</p>
                        <div className="flex gap-2 mt-2">
                             <span className="px-3 py-1 bg-white/10 rounded-full text-[9px] font-black uppercase">SCC Required</span>
                             <span className="px-3 py-1 bg-white/10 rounded-full text-[9px] font-black uppercase">Full Cluster Logs</span>
                        </div>
                    </div>

                    <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white flex flex-col gap-4 border border-slate-800 shadow-xl md:col-span-2">
                        <div className="flex items-center justify-between">
                            <h4 className="font-bold flex items-center gap-3 text-amber-400"><Terminal className="w-5 h-5" /> Advanced Recovery Shell</h4>
                            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">kubectl / bash</span>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <p className="text-[10px] text-slate-400 mb-2 uppercase font-black tracking-widest">1. Identify Stuck Pods</p>
                                <div className="bg-black/50 p-4 rounded-xl border border-white/5 font-mono text-[10px] text-emerald-400 overflow-x-auto">
                                    <p className="whitespace-pre"># List all pods in Terminating state across all namespaces</p>
                                    <p className="mt-2 text-white">kubectl get pods --all-namespaces | grep Terminating</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-400 mb-2 uppercase font-black tracking-widest">2. Remove Finalizers (Force Delete)</p>
                                <div className="bg-black/50 p-4 rounded-xl border border-white/5 font-mono text-[10px] text-emerald-400 overflow-x-auto">
                                    <p className="whitespace-pre"># Patch all terminating pods to remove finalizers and allow deletion</p>
                                    <p className="mt-2 text-white">kubectl get pods --all-namespaces | grep Terminating | awk '&#123;print $2 " --namespace=" $1&#125;' | xargs -I&#123;&#125; kubectl patch pod &#123;&#125; -p '&#123;"metadata":&#123;"finalizers":null&#125;&#125;' --type=merge</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          );

      default:
        return (
            <div className="py-20 text-center opacity-50">
                <Search className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-400 italic">{lang === 'en' ? "Select a section from the sidebar." : "Selecione uma seção no menu lateral."}</p>
            </div>
        );
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-[600px] pb-20">
      <aside className="lg:w-72 flex-shrink-0">
        <nav className="space-y-2 sticky top-28">
          <div className="px-4 py-3 mb-4 bg-slate-900 text-white rounded-2xl flex items-center gap-3 shadow-lg">
             <ListChecks className="w-5 h-5 text-suse-base" />
             <span className="text-xs font-black uppercase tracking-widest">Guide Navigator</span>
          </div>
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 text-sm font-bold rounded-2xl transition-all text-left ${
                activeSection === section.id
                  ? 'bg-suse-base text-white shadow-xl translate-x-2 shadow-suse-base/20'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center gap-4 flex-1">
                {section.icon}
                <span className="tracking-tight">{section.label}</span>
              </div>
              {section.count !== undefined && section.count > 0 && (
                <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg ${activeSection === section.id ? 'bg-white text-suse-base' : 'bg-suse-base/10 text-suse-base shadow-sm'}`}>
                  {section.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </aside>

      <div className="flex-1 bg-white p-12 rounded-[3.5rem] border border-gray-200 shadow-sm min-h-[600px] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
            <LayoutTemplate className="w-64 h-64" />
        </div>
        
        <div className="relative z-10">
            {renderContent()}
        </div>

        <div className="mt-16 pt-8 border-t border-gray-100 flex justify-between items-center no-print">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Manual v1.7.0 r03</p>
            {activeSection !== 'troubleshooting' && (
                <button 
                    onClick={handleNext}
                    className="flex items-center gap-3 bg-suse-dark text-white px-10 py-5 rounded-[2rem] hover:bg-black transition-all font-black text-sm shadow-2xl hover:scale-105 active:scale-95 group"
                >
                    {t.common.next} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            )}
        </div>
      </div>
    </div>
  );
};
