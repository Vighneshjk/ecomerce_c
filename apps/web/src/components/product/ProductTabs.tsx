'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Ruler, ShieldCheck, Microscope, User, Star, ChevronRight, MessageSquare, Info, Shield, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProductTabsProps {
    product: any
}

const ProductTabs = ({ product }: ProductTabsProps) => {
    const [activeTab, setActiveTab] = useState('description')

    const tabs = [
        { id: 'description', label: 'THE DESIGN', icon: <Info className="w-4 h-4" /> },
        { id: 'specifications', label: 'CRAFT DETAILS', icon: <Microscope className="w-4 h-4" /> },
        { id: 'lens', label: 'LENS TECH', icon: <Shield className="w-4 h-4" /> },
    ]

    return (
        <section className="py-24 bg-white border-y border-charcoal-50 shadow-inner">
            <div className="container-app">
                <div className="flex flex-col lg:flex-row gap-20">
                    {/* Tab Navigation */}
                    <aside className="w-full lg:w-1/4">
                        <div className="flex flex-col space-y-2 sticky top-24">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={cn(
                                        "flex items-center space-x-4 p-5 rounded-3xl text-left transition-all group relative overflow-hidden",
                                        activeTab === tab.id
                                            ? "bg-charcoal-900 text-white shadow-2xl shadow-charcoal-100 scale-105 z-10"
                                            : "text-charcoal-400 hover:bg-brand-50 hover:text-charcoal-700"
                                    )}
                                >
                                    <div className={cn(
                                        "w-10 h-10 rounded-2xl flex items-center justify-center transition-all group-hover:bg-brand-500 group-hover:text-white",
                                        activeTab === tab.id ? "bg-brand-500 text-brand-900" : "bg-charcoal-50"
                                    )}>
                                        {tab.icon}
                                    </div>
                                    <span className="text-sm font-black uppercase tracking-[0.2em]">{tab.label}</span>
                                    {activeTab === tab.id && (
                                        <motion.div
                                            layoutId="activeTabGlow"
                                            className="absolute inset-0 bg-brand-500/5 -z-1"
                                            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </aside>

                    {/* Content Area */}
                    <main className="w-full lg:w-3/4">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4, ease: 'easeOut' }}
                                className="min-h-[400px]"
                            >
                                {activeTab === 'description' && (
                                    <div className="space-y-12">
                                        <div className="space-y-4">
                                            <h3 className="text-4xl lg:text-5xl font-display font-semibold text-charcoal-900 tracking-tight leading-tight italic overflow-hidden">
                                                “A symphony <br /> in silhouette.”
                                            </h3>
                                            <p className="text-xl text-charcoal-500 font-light leading-relaxed max-w-2xl">
                                                The {product.name} frame represents a pinnacle of contemporary design, blending architectural rigor with organic ergonomics. Every curve is optimized for balanced weight distribution, ensuring all-day comfort without sacrificing aesthetic power.
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                            <div className="space-y-6">
                                                <h4 className="text-lg font-black font-display uppercase tracking-widest text-charcoal-900 flex items-center">
                                                    <div className="w-2 h-2 bg-brand-500 rounded-full mr-3" />
                                                    Design Philosophy
                                                </h4>
                                                <ul className="space-y-4">
                                                    {[
                                                        { label: 'Unisex Design', desc: 'Crafted to complement all facial structures with precision ergonomics.' },
                                                        { label: 'Hyper-Lightweight', desc: 'Using aerospace-grade materials for zero pressure on the nasal bridge.' },
                                                        { label: 'Sustainable Aura', desc: 'Each frame is finished with eco-friendly coatings and recycled plastics.' },
                                                    ].map((item, i) => (
                                                        <li key={i} className="space-y-1 group">
                                                            <span className="text-xs font-black text-charcoal-900 uppercase tracking-widest block group-hover:text-brand-600 transition-colors">{item.label}</span>
                                                            <p className="text-sm text-charcoal-500 leading-relaxed">{item.desc}</p>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="relative aspect-video rounded-3xl overflow-hidden bg-charcoal-100 group shadow-2xl">
                                                <img
                                                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600"
                                                    alt="Detail View"
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'specifications' && (
                                    <div className="space-y-12">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                            {[
                                                { label: 'Frame Material', value: product.frameMaterial || 'Titanium' },
                                                { label: 'Frame Shape', value: product.frameShape || 'Round' },
                                                { label: 'Rim Type', value: product.rimType || 'Full Rim' },
                                                { label: 'Weight', value: '18g (Hyper-light)' },
                                                { label: 'Bridge Width', value: '18mm' },
                                                { label: 'Temple Length', value: '145mm' },
                                                { label: 'Gender', value: product.gender || 'Unisex' },
                                                { label: 'Color', value: product.variants?.[0]?.colorName || 'Midnight' },
                                                { label: 'Warranty', value: '1 Year Full Support' }
                                            ].map((item, i) => (
                                                <div key={i} className="p-6 bg-charcoal-50 rounded-2xl border border-charcoal-100 hover:border-brand-500 transition-all group">
                                                    <span className="text-[10px] font-black text-charcoal-400 uppercase tracking-widest block mb-2">{item.label}</span>
                                                    <span className="text-lg font-display font-bold text-charcoal-900 group-hover:text-brand-600 transition-colors uppercase">{item.value}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="p-10 bg-brand-50/30 rounded-3xl border border-brand-100 space-y-6">
                                            <div className="flex items-center space-x-3">
                                                <Ruler className="w-6 h-6 text-brand-600" />
                                                <h4 className="text-xl font-display font-bold text-charcoal-900">HYPER-PRECISION GUIDE</h4>
                                            </div>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                                {[
                                                    { icon: <HelpCircle className="w-4 h-4" />, label: "Face Fit", val: "Ideal for Oval Faces" },
                                                    { icon: <HelpCircle className="w-4 h-4" />, label: "Lens Class", val: "Category 3" },
                                                    { icon: <HelpCircle className="w-4 h-4" />, label: "Construction", val: "Mono-block Hingeless" },
                                                    { icon: <HelpCircle className="w-4 h-4" />, label: "Durability", val: "Drop-tested 2m" },
                                                ].map((it, i) => (
                                                    <div key={i} className="space-y-1">
                                                        <span className="text-[10px] font-bold text-charcoal-500 uppercase flex items-center">{it.icon}<span className="ml-1">{it.label}</span></span>
                                                        <span className="text-sm font-bold text-charcoal-900">{it.val}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'lens' && (
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                                        <div className="space-y-8">
                                            <div className="space-y-4">
                                                <h3 className="text-4xl font-display font-semibold text-charcoal-900 tracking-tight leading-tight">ADVANCED <br /><span className="text-brand-500 italic">OPTICAL SHIELD.</span></h3>
                                                <p className="text-xl text-charcoal-500 font-light leading-relaxed">
                                                    We use proprietary "Akela Clear" lenses that provide unparalleled clarity without the yellow tint typical of blue-light glasses. 100% UV Protection is standard.
                                                </p>
                                            </div>

                                            <div className="space-y-4">
                                                {[
                                                    { title: "Hex-Layer Coating", desc: "6 Layers of anti-reflective, oleophobic, and scratch-resistant coating." },
                                                    { title: "Vision-Synch Tech", desc: "Optimized for high-refresh rate displays to reduce ocular fatigue." },
                                                    { title: "True Color Rendering", desc: "Lenses that don't shift color hues, essential for creative professionals." },
                                                ].map((p, i) => (
                                                    <div key={i} className="flex space-x-4">
                                                        <div className="w-5 h-5 bg-brand-500 rounded-full flex-shrink-0 mt-1" />
                                                        <div>
                                                            <h5 className="font-bold text-charcoal-900 uppercase tracking-widest text-sm">{p.title}</h5>
                                                            <p className="text-sm text-charcoal-500 leading-relaxed">{p.desc}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="relative aspect-square w-full">
                                            <div className="absolute inset-0 bg-brand-50 rounded-full opacity-30 blur-3xl animate-pulse" />
                                            <img
                                                src="https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=600"
                                                alt="Lens Technology"
                                                className="relative z-10 w-full h-full object-contain filter drop-shadow-2xl hover:scale-105 transition-all duration-[2s]"
                                            />
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </main>
                </div>
            </div>
        </section>
    )
}

export default ProductTabs
