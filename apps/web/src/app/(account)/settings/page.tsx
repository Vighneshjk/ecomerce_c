'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, ShieldCheck, MapPin, CreditCard, ChevronRight, Lock, Bell, Sparkles, SlidersHorizontal, Trash2, ArrowRight, Share2, Ruler, Microscope, Key, Plus, History as LucideHistory } from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Divider } from '@/components/ui/Divider'

const SettingsPage = () => {
    const { data: session } = useSession()
    const [activeSection, setActiveSection] = useState('profile')

    const sections = [
        { id: 'profile', name: 'Identity Config', icon: <User className="w-4 h-4" /> },
        { id: 'delivery', name: 'Logistics Node', icon: <MapPin className="w-4 h-4" /> },
        { id: 'security', name: 'Access Frequency', icon: <Lock className="w-4 h-4" /> },
        { id: 'preferences', name: 'Lens Sync', icon: <SlidersHorizontal className="w-4 h-4" /> },
    ]

    return (
        <div className="space-y-12 h-min-screen">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-xs font-bold text-charcoal-400 uppercase tracking-widest">
                        <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
                        <div className="w-1 h-1 bg-charcoal-200 rounded-full" />
                        <span className="text-charcoal-900">Preference Tech</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-display font-semibold text-charcoal-900 tracking-tighter leading-none italic uppercase tracking-tighter">
                        SYSTEM <span className="text-brand-500">CONFIGS.</span>
                    </h1>
                    <p className="text-lg text-charcoal-500 font-medium italic">Fine-tune your visionary profile and security parameters.</p>
                </div>

                <div className="flex items-center p-2 bg-white rounded-3xl border border-charcoal-100 shadow-xl shadow-brand-100/10 overflow-x-auto">
                    {sections.map((s) => (
                        <button
                            key={s.id}
                            onClick={() => setActiveSection(s.id)}
                            className={cn(
                                "flex items-center space-x-3 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all transform active:scale-95 whitespace-nowrap",
                                activeSection === s.id ? "bg-charcoal-900 text-white shadow-xl shadow-charcoal-200" : "text-charcoal-400 hover:bg-brand-50 hover:text-charcoal-700"
                            )}
                        >
                            {s.icon}
                            <span>{s.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            <main className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 space-y-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSection}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white p-10 lg:p-16 rounded-[3rem] border border-charcoal-100 shadow-xl shadow-brand-100/10 space-y-12"
                        >
                            {activeSection === 'profile' && (
                                <div className="space-y-10">
                                    <div className="space-y-4">
                                        <h3 className="text-3xl font-display font-semibold tracking-tight uppercase tracking-widest italic leading-none">IDENTITY <span className="text-brand-500 italic lowercase">broadcast.</span></h3>
                                        <p className="text-sm text-charcoal-500 font-medium italic">Broadcast your name and alias to the Akela global network.</p>
                                    </div>
                                    <form className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Input label="Full Visionary Name" defaultValue={session?.user?.name || ''} className="h-16 rounded-2xl" />
                                            <Input label="Aura Link (Email)" defaultValue={session?.user?.email || ''} readOnly className="h-16 rounded-2xl bg-charcoal-50/50" />
                                        </div>
                                        <Input label="Direct Sync (Phone)" placeholder="+91 XXXX XXX XXX" className="h-16 rounded-2xl" />
                                        <Button className="h-16 px-12 rounded-2xl bg-charcoal-900 text-white hover:bg-brand-600 transition-all font-black uppercase tracking-widest shadow-2xl">
                                            Persist Identity Changes
                                        </Button>
                                    </form>
                                </div>
                            )}

                            {activeSection === 'delivery' && (
                                <div className="space-y-10">
                                    <div className="space-y-4">
                                        <h3 className="text-3xl font-display font-semibold tracking-tight uppercase tracking-widest italic leading-none">LOGISTICS <span className="text-brand-500 italic lowercase">node.</span></h3>
                                        <p className="text-sm text-charcoal-500 font-medium italic">Where your handcrafted frames materialize from our studio.</p>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="p-8 bg-charcoal-900 text-white rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
                                            <div className="relative z-10 space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-2 px-3 py-1 bg-brand-500 text-black rounded-lg text-[9px] font-black uppercase tracking-widest">PRIMARY HUB</div>
                                                    <button className="text-red-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                                </div>
                                                <div className="space-y-1">
                                                    <h4 className="text-xl font-display font-black italic">Bandra West Base</h4>
                                                    <p className="text-xs text-charcoal-400 font-bold uppercase tracking-widest leading-relaxed">
                                                        402, Elite Heights, Pali Hill, <br /> Mumbai 400050, MH, India
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <Button variant="outline" className="h-16 w-full rounded-[2rem] border-2 border-charcoal-100 border-dashed hover:border-brand-500 hover:bg-brand-50 transition-all text-[10px] font-black uppercase tracking-widest group">
                                            <div className="w-8 h-8 rounded-full bg-charcoal-50 flex items-center justify-center group-hover:bg-brand-500 group-hover:text-white transition-all mr-3"><Plus className="w-4 h-4" /></div>
                                            Broadcast New Hub Coordinate
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {activeSection === 'security' && (
                                <div className="space-y-10">
                                    <div className="space-y-4">
                                        <h3 className="text-3xl font-display font-semibold tracking-tight uppercase tracking-widest italic leading-none">ACCESS <span className="text-brand-500 italic lowercase">vault.</span></h3>
                                        <p className="text-sm text-charcoal-500 font-medium italic">Manage authentication layers and session encryption frequency.</p>
                                    </div>
                                    <div className="space-y-8">
                                        <div className="flex items-center justify-between p-8 bg-charcoal-50 rounded-2xl border border-charcoal-100">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 rounded-2xl bg-brand-100 flex items-center justify-center text-brand-600"><Key className="w-6 h-6" /></div>
                                                <div className="space-y-1">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-charcoal-900 block">Frequency Pattern</span>
                                                    <p className="text-xs text-charcoal-400 font-bold">Standard Password Access</p>
                                                </div>
                                            </div>
                                            <Button variant="outline" className="h-12 rounded-xl border-2">Cycle Key</Button>
                                        </div>

                                        <div className="flex items-center justify-between p-8 bg-charcoal-50 rounded-2xl border border-charcoal-100">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 rounded-2xl bg-charcoal-900 flex items-center justify-center text-brand-500 shadow-xl"><ShieldCheck className="w-6 h-6" /></div>
                                                <div className="space-y-1">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-charcoal-900 block">Biometric Aura</span>
                                                    <p className="text-xs text-charcoal-400 font-bold">Face-ID Vision Secondary Protocol</p>
                                                </div>
                                            </div>
                                            <div className="w-14 h-8 bg-brand-500 rounded-full p-1 relative cursor-pointer shadow-xl shadow-brand-100">
                                                <div className="absolute right-1 top-1 w-6 h-6 bg-white rounded-full shadow-lg" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeSection === 'preferences' && (
                                <div className="space-y-10">
                                    <div className="space-y-4">
                                        <h3 className="text-3xl font-display font-semibold tracking-tight uppercase tracking-widest italic leading-none">LENS <span className="text-brand-500 italic lowercase">sync.</span></h3>
                                        <p className="text-sm text-charcoal-500 font-medium italic">Automated parameters for virtual try-on and lens filtering.</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {[
                                            { label: 'Auto Aura Try-On', desc: 'Enable camera on product load', on: true, icon: <Sparkles className="w-5 h-5" /> },
                                            { label: 'Vision History', desc: 'Store recently glaced frames', on: true, icon: <LucideHistory className="w-5 h-5" /> },
                                            { label: 'Precision Alerts', desc: 'Low stock sync notifications', on: false, icon: <Bell className="w-5 h-5" /> },
                                            { label: 'Network Digest', icon: <Share2 className="w-5 h-5" />, desc: 'Allow social vision sharing', on: true },
                                        ].map((pref, i) => (
                                            <div key={i} className="p-8 bg-charcoal-50 rounded-[2rem] border border-charcoal-100 space-y-6 flex flex-col justify-between hover:bg-brand-50 transition-colors cursor-pointer group">
                                                <div className="flex items-start justify-between">
                                                    <div className="p-3 bg-white rounded-xl shadow-sm group-hover:bg-charcoal-900 group-hover:text-brand-500 transition-all">{pref.icon}</div>
                                                    <div className={cn("w-12 h-6 rounded-full p-1 relative transition-all", pref.on ? "bg-brand-500" : "bg-charcoal-200")}>
                                                        <div className={cn("absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all", pref.on ? "right-1" : "left-1")} />
                                                    </div>
                                                </div>
                                                <div className="space-y-1">
                                                    <h4 className="text-sm font-black uppercase tracking-widest text-charcoal-900">{pref.label}</h4>
                                                    <p className="text-[10px] font-bold text-charcoal-400 capitalize">{pref.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <aside className="lg:col-span-4 space-y-8">
                    <div className="p-10 bg-charcoal-900 text-white rounded-[3rem] border border-white/5 shadow-2xl shadow-charcoal-900/50 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-full h-[30%] bg-gradient-to-b from-white/10 to-transparent z-0 pointer-events-none" />
                        <div className="relative z-10 space-y-10">
                            <div className="space-y-4">
                                <h3 className="text-2xl font-display font-semibold tracking-tight uppercase tracking-widest italic leading-none">SYSTEM <span className="text-brand-500 lowercase ml-1">vitals.</span></h3>
                                <p className="text-[10px] text-charcoal-400 font-bold uppercase tracking-widest leading-relaxed font-mono">VISIONARY STATUS: ACTIVE_OMEGA_PROTOCOL</p>
                            </div>

                            <div className="space-y-6">
                                {[
                                    { label: 'Studio Distance', val: '4.2 KM', icon: <MapPin className="w-4 h-4" /> },
                                    { label: 'Build Quality', val: '99.9%', icon: <Microscope className="w-4 h-4" /> },
                                    { label: 'Last Sync', val: '2m ago', icon: <LucideHistory className="w-4 h-4" /> },
                                ].map((vit, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 transition-all hover:bg-white/10">
                                        <div className="flex items-center space-x-3">
                                            <div className="text-brand-500">{vit.icon}</div>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-charcoal-400">{vit.label}</span>
                                        </div>
                                        <span className="text-sm font-black italic">{vit.val}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 border-t border-white/5 pt-8">
                                <h4 className="text-xs font-black uppercase tracking-widest text-brand-500 italic">Vision Support</h4>
                                <Button variant="ghost" className="w-full h-14 bg-white rounded-2xl text-charcoal-900 hover:bg-brand-500 hover:text-white transition-all font-black uppercase tracking-widest shadow-2xl group/btn">
                                    <span>Artisan Concierge</span>
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-2 transition-transform" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 bg-red-500/5 border border-red-500/10 rounded-3xl space-y-4">
                        <h4 className="text-[10px] font-black text-red-500 uppercase tracking-widest flex items-center">
                            <Trash2 className="w-3.5 h-3.5 mr-2" />
                            Critical Operation
                        </h4>
                        <p className="text-[10px] text-charcoal-500 font-bold uppercase tracking-widest leading-relaxed">Deactivating your aura vault will erase all history, curations, and vision profiles irreversibly.</p>
                        <button className="text-[9px] font-black text-red-400 hover:text-red-500 border-b border-red-500/20 pb-0.5 transition-all">TERMINATE_IDENTITY_STREAM</button>
                    </div>
                </aside>
            </main>
        </div>
    )
}

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

export default SettingsPage
