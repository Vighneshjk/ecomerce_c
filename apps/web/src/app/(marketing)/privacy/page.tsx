'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Lock, Eye, Shield, ArrowRight, Download, Share2, Printer, Microscope, History } from 'lucide-react'
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
                            <span>Secure Visionary Protocol</span>
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
                            <div className="p-10 bg-charcoal-900 text-white rounded-[3rem] border border-white/5 shadow-2xl shadow-charcoal-900/50 space-y-10 relative group overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
                                <div className="relative z-10 space-y-8">
                                    <div className="space-y-4">
                                        <h3 className="text-2xl font-display font-semibold tracking-tight uppercase tracking-widest italic leading-none flex items-center">
                                            <ShieldCheck className="w-5 h-5 mr-3 text-brand-500" />
                                            DOCUMENT <span className="text-brand-500 lowercase ml-1">vitals.</span>
                                        </h3>
                                    </div>
                                    <div className="space-y-6">
                                        {[
                                            { label: 'Classification', val: 'PUBLIC_CRYPTO_256' },
                                            { label: 'Revision', val: 'v2.4.1 (Aura)' },
                                            { label: 'Compliance', val: 'GDPR / CCPA / IT' },
                                            { label: 'Last Sync', val: 'Oct 24, 2024' },
                                        ].map((vit, i) => (
                                            <div key={i} className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-charcoal-400 group/v">
                                                <span>{vit.label}</span>
                                                <span className="text-white italic group-hover/v:text-brand-500 transition-colors">{vit.val}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <Button variant="outline" className="h-14 w-full bg-white/5 border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-charcoal-900 transition-all group/btn">
                                        <span>Transmit to PDF</span>
                                        <Download className="w-4 h-4 ml-2 group-hover/btn:translate-y-1 transition-transform" />
                                    </Button>
                                </div>
                            </div>

                            <div className="p-8 bg-white rounded-[2.5rem] border border-charcoal-100 shadow-xl shadow-brand-100/10 space-y-6">
                                <h4 className="text-xs font-black uppercase tracking-widest text-charcoal-900 flex items-center">
                                    <Eye className="w-4 h-4 mr-2 text-brand-500" />
                                    Focus Points
                                </h4>
                                <ul className="space-y-4">
                                    {['Data Encryption Protocol', 'Biometric Consent', 'Third-Party Vision Integration', 'Identity Flush Mechanism'].map((point, i) => (
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

const PrivacyPage = () => {
    return (
        <PolicyLayout
            title="PRIVACY VAULT"
            subtitle="How we broadcast, encrypt, and respect your visionary data stream."
        >
            <div className="space-y-12">
                <div className="space-y-6">
                    <h2 className="text-4xl font-display font-semibold text-charcoal-900 tracking-tight leading-none uppercase tracking-widest italic">1. GENESIS <span className="text-brand-500 italic lowercase">of data.</span></h2>
                    <p className="text-lg text-charcoal-500 font-medium italic leading-relaxed">
                        At Akela, we collect data solely to refine your iris-aligned perspective. This includes the parameters of your face for virtual try-on and the frequency of your optical preferences.
                    </p>
                    <p className="text-charcoal-700 font-medium italic leading-relaxed">
                        We use advanced biometric encryption to ensure your 3D facial scans never leave our secure processing nodes. We don't sell your vision; we protect it.
                    </p>
                </div>

                <Divider className="opacity-50" />

                <div className="space-y-6">
                    <h2 className="text-4xl font-display font-semibold text-charcoal-900 tracking-tight leading-none uppercase tracking-widest italic">2. ENCRYPTION <span className="text-brand-500 italic lowercase">protocols.</span></h2>
                    <p className="text-charcoal-700 font-medium italic leading-relaxed">
                        Every transaction is shielded by a 256-bit SSL broadcast. Your payment identity is managed through global vault partners like Razorpay and Visa, ensuring Akela never handles your raw financial frequency.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        {[
                            { title: 'No-Storage Policy', desc: 'Face scans are deleted post-analysis unless you enable "Aura Vault".', icon: <Microscope className="w-5 h-5" /> },
                            { title: 'Identity Deletion', desc: 'Flush your entire profile frequency with one direct request.', icon: <History className="w-5 h-5" /> },
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
                    <h2 className="text-4xl font-display font-semibold text-charcoal-900 tracking-tight leading-none uppercase tracking-widest italic">3. CONTACT <span className="text-brand-500 italic lowercase">nexus.</span></h2>
                    <p className="text-lg text-charcoal-700 font-medium italic leading-relaxed">
                        Inquiries regarding your visionary data can be broadcast to <span className="text-brand-500 underline decoration-brand-200">nexus@akelaeyewear.com</span>. We typically resolve access requests within 48 cycles.
                    </p>
                </div>
            </div>
        </PolicyLayout>
    )
}

export default PrivacyPage
