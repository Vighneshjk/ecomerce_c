'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FileText, ShieldAlert, Scale, Handshake, ArrowRight, Download, Share2, Printer, Microscope, History, ShieldCheck, Eye } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Divider } from '@/components/ui/Divider'

const PolicyLayout = ({ title, subtitle, children }: any) => {
    return (
        <div className="bg-[#FCFBF8] min-h-screen pt-32 pb-40 overflow-hidden">
            <div className="container-app relative">
                <div className="flex flex-col space-y-20">
                    <div className="space-y-8 max-w-4xl">
                        <div className="flex items-center space-x-3 text-brand-600 font-black uppercase tracking-[0.4em] text-[10px]">
                            <div className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse" />
                            <span>Visionary Contract Nexus</span>
                        </div>
                        <h1 className="text-6xl md:text-[10rem] font-display font-semibold text-charcoal-900 tracking-tighter leading-none italic uppercase">
                            {title.split(' ')[0]} <br /><span className="text-brand-500 lowercase">{title.split(' ').slice(1).join(' ')}.</span>
                        </h1>
                        <p className="text-2xl text-charcoal-500 font-light italic leading-relaxed">
                            {subtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-start">
                        {/* Document Sidebar */}
                        <aside className="lg:col-span-4 space-y-12 lg:sticky lg:top-32">
                            <div className="p-10 bg-charcoal-900 text-white rounded-[3rem] border border-charcoal-100 shadow-2xl shadow-charcoal-900/50 space-y-10 relative group overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
                                <div className="relative z-10 space-y-8">
                                    <div className="space-y-4">
                                        <h3 className="text-2xl font-display font-semibold tracking-tight uppercase tracking-widest italic leading-none flex items-center">
                                            <Scale className="w-5 h-5 mr-3 text-brand-500" />
                                            LEGAL <span className="text-brand-500 lowercase ml-1">vitals.</span>
                                        </h3>
                                    </div>
                                    <div className="space-y-6">
                                        {[
                                            { label: 'Doc ID', val: 'AKL_TC_24_A' },
                                            { label: 'Jurisdiction', val: 'Maharashtra, India' },
                                            { label: 'Version', val: 'v1.2 (Artisan)' },
                                            { label: 'Last Sync', val: 'Aug 10, 2024' },
                                        ].map((vit, i) => (
                                            <div key={i} className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-charcoal-400 group/v">
                                                <span>{vit.label}</span>
                                                <span className="text-white italic group-hover/v:text-brand-500 transition-colors">{vit.val}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <Button variant="outline" className="h-14 w-full bg-white/5 border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-charcoal-900 transition-all group/btn shadow-2xl">
                                        <span>Transmit to PDF</span>
                                        <Download className="w-4 h-4 ml-2 group-hover/btn:translate-y-1 transition-transform" />
                                    </Button>
                                </div>
                            </div>

                            <div className="p-8 bg-white rounded-[2.5rem] border border-charcoal-100 shadow-xl shadow-brand-100/10 space-y-6">
                                <h4 className="text-xs font-black uppercase tracking-widest text-charcoal-900 flex items-center">
                                    <ShieldAlert className="w-4 h-4 mr-2 text-brand-500" />
                                    Focus Points
                                </h4>
                                <ul className="space-y-4">
                                    {['Vision Broadcast Accuracy', 'Order Frequency Protocols', 'Artisan Warranty Bounds', 'Network Cancellation Rights'].map((point, i) => (
                                        <li key={i} className="flex items-start space-x-3 group cursor-pointer">
                                            <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 group-hover:scale-150 transition-transform" />
                                            <span className="text-[10px] font-bold text-charcoal-500 uppercase tracking-widest group-hover:text-charcoal-900 transition-colors">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </aside>

                        {/* Main Text Content */}
                        <main className="lg:col-span-8 bg-white p-12 lg:p-20 rounded-[4rem] border border-charcoal-50 shadow-xl shadow-brand-100/10 space-y-16">
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}

const TermsPage = () => {
    return (
        <PolicyLayout
            title="TERMS BROADCAST"
            subtitle="The legal frequency that governs our artisan-customer nexus."
        >
            <div className="space-y-12">
                <div className="space-y-6">
                    <h2 className="text-4xl font-display font-semibold text-charcoal-900 tracking-tight leading-none uppercase tracking-widest italic">1. VISION <span className="text-brand-500 italic lowercase">broadcast.</span></h2>
                    <p className="text-lg text-charcoal-500 font-medium italic leading-relaxed">
                        By interacting with the Akela network, you agree to broadcast your accurate parameters. Our virtual try-on is an approximation of perspective, not an absolute reality.
                    </p>
                    <p className="text-charcoal-700 font-medium italic leading-relaxed">
                        We reserve the absolute right to refuse any frequency transmission that we deem non-visionary or harmful to our artisan ecosystem.
                    </p>
                </div>

                <Divider className="opacity-50" />

                <div className="space-y-6">
                    <h2 className="text-4xl font-display font-semibold text-charcoal-900 tracking-tight leading-none uppercase tracking-widest italic">2. TRANSACTIONAL <span className="text-brand-500 italic lowercase">nexus.</span></h2>
                    <p className="text-charcoal-700 font-medium italic leading-relaxed">
                        Every order is a separate contract for the broadcast of artisan goods. Akela typically processes Vision Orders within 48 cycles.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        {[
                            { title: 'Order Acceptance', desc: 'Akela reserves the right to cancel any broadcast before the Production phase.', icon: <Microscope className="w-5 h-5" /> },
                            { title: 'Logistics Range', desc: 'Crafting timelines are estimates and not absolute guarantees of vision reach.', icon: <History className="w-5 h-5" /> },
                        ].map((it, i) => (
                            <div key={i} className="p-6 bg-charcoal-50 rounded-2xl border border-charcoal-100 group">
                                <div className="text-brand-600 mb-3 group-hover:scale-110 transition-transform">{it.icon}</div>
                                <h5 className="text-[10px] font-black uppercase tracking-widest text-charcoal-900">{it.title}</h5>
                                <p className="text-[10px] text-charcoal-500 font-bold uppercase tracking-widest">{it.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <Divider className="opacity-50" />

                <div className="space-y-6">
                    <h2 className="text-4xl font-display font-semibold text-charcoal-900 tracking-tight leading-none uppercase tracking-widest italic">3. JURISDICTIONAL <span className="text-brand-500 italic lowercase">node.</span></h2>
                    <p className="text-lg text-charcoal-700 font-medium italic leading-relaxed">
                        Any disputes arising from this vision broadcast will be governed purely by the laws of Mumbai, Maharashtra, India.
                    </p>
                </div>
            </div>
        </PolicyLayout>
    )
}

export default TermsPage
