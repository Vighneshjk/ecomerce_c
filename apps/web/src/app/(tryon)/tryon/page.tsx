'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TryOnCanvas } from '@/components/tryon/TryOnCanvas'
import { FramePicker } from '@/components/tryon/FramePicker'
import {
    Sparkles,
    ArrowLeft,
    ShoppingBag,
    Heart,
    Share2,
    ShieldCheck,
    Microscope,
    Zap,
    Box,
    Globe,
    ChevronRight,
    Wind,
    ArrowRight,
    Maximize2,
    X,
    Info,
    Smartphone,
    Settings
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Divider } from '@/components/ui/Divider'
import { formatPrice } from '@/lib/utils'

const products = [
    { id: '1', name: 'AURA AVIATOR', price: 18900, category: 'Sunglasses', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=400', model: '/models/aviator.glb', color: 'Gold Titanium', colorHex: '#FFD700', description: 'Real-time eye-tracking, polarized lens broadcast. Aerospace titanium build.' },
    { id: '2', name: 'ROUND VISION', price: 14500, category: 'Eyeglasses', image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=400', model: '/models/round.glb', color: 'Glossy Black', colorHex: '#000000', description: 'Crystal-clear focus node, artisan handcrafted frame. Lightweight bio-acetate.' },
    { id: '3', name: 'BLOCK CAT-EYE', price: 16200, category: 'Sunglasses', image: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&q=80&w=400', model: '/models/cateye.glb', color: 'Tortoise', colorHex: '#7C4B00', description: 'Wide-angle vision broadcast, statement silhouette. Shatter-resistant lens.' },
    { id: '4', name: 'LINEAR RECTANGLE', price: 12800, category: 'Blue Light', image: 'https://images.unsplash.com/photo-1511499767390-a73359580bc3?auto=format&fit=crop&q=80&w=400', model: '/models/rectangle.glb', color: 'Gunmetal', colorHex: '#555555', description: 'Anti-frequency digital nodes, ergonomic posture sync. Stainless steel build.' },
    { id: '5', name: 'POLAR SQUARE', price: 19500, category: 'Sunglasses', image: 'https://images.unsplash.com/photo-1509100104048-73c894705751?auto=format&fit=crop&q=80&w=400', model: '/models/square.glb', color: 'Matte Grey', colorHex: '#888888', description: 'Ultra-polarized visionary link, ocean-safe resin. Sport-tuned fit.' },
]

export default function TryOnPage() {
    const [selectedProduct, setSelectedProduct] = useState(products[0])
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    const sidebarVariants = {
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            x: 400,
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 100,
            },
        },
    }

    return (
        <div className="bg-charcoal-900 min-h-screen h-screen flex flex-col lg:flex-row overflow-hidden relative cursor-default">
            {/* Back Button */}
            <div className="absolute top-10 left-10 z-[100]">
                <Link href="/products" className="p-5 bg-white/5 backdrop-blur-2xl border border-white/5 rounded-full text-white hover:bg-brand-500 hover:text-black hover:scale-110 active:scale-95 transition-all shadow-2xl flex items-center group">
                    <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* Canvas Area (Left/Main) */}
            <main className="relative flex-1 p-6 lg:p-12 flex items-center justify-center h-full overflow-hidden">
                <div className="w-full h-full max-w-[1400px] aspect-video lg:aspect-auto relative group">
                    <TryOnCanvas
                        modelUrl={selectedProduct.model}
                        frameColor={selectedProduct.colorHex}
                    />

                    {/* Floating Vision Badge */}
                    <div className="absolute bottom-12 left-12 p-6 bg-charcoal-900/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] flex items-center space-x-6 shadow-2xl shadow-black/50 overflow-hidden group/badge transition-all hover:scale-105">
                        <div className="absolute inset-0 bg-brand-500/10 opacity-0 group-hover/badge:opacity-100 transition-opacity" />
                        <div className="w-14 h-14 bg-charcoal-900 text-brand-500 rounded-3xl flex items-center justify-center shadow-xl">
                            <Microscope className="w-8 h-8 group-hover/badge:rotate-12 transition-transform" />
                        </div>
                        <div className="pr-6">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-500 block leading-none mb-1 animate-pulse">Vision Probe 2.4</span>
                            <h4 className="text-xl font-display font-semibold italic text-white uppercase tracking-widest leading-none">ARTISAN SYNC.</h4>
                        </div>
                    </div>

                    {/* Controls Group */}
                    <div className="absolute bottom-12 right-12 flex space-x-4">
                        {[
                            { icon: <Share2 className="w-5 h-5" />, label: 'Broadcast Vision' },
                            { icon: <Wind className="w-5 h-5" />, label: 'Aura Screenshot' },
                            { icon: <Settings className="w-5 h-5" />, label: 'Config System' },
                        ].map((ctrl, i) => (
                            <button key={i} className="p-4 bg-charcoal-900/40 backdrop-blur-3xl border border-white/5 rounded-2xl text-white hover:bg-brand-500 hover:text-black hover:scale-110 active:scale-95 transition-all shadow-2xl group/ctrl relative">
                                {ctrl.icon}
                                <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-charcoal-900/80 backdrop-blur-md rounded-xl text-[8px] font-black uppercase tracking-widest text-white/50 opacity-0 group-hover/ctrl:opacity-100 translate-y-4 group-hover/ctrl:translate-y-0 transition-all pointer-events-none whitespace-nowrap">{ctrl.label}</div>
                            </button>
                        ))}
                    </div>
                </div>
            </main>

            {/* Side Panel (Right) */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.aside
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={sidebarVariants}
                        className="w-full lg:w-[450px] bg-charcoal-950/80 backdrop-blur-3xl border-l border-white/5 p-12 lg:p-16 flex flex-col h-full shadow-[0_0_100px_rgba(0,0,0,0.5)] z-50 overflow-y-auto no-scrollbar"
                    >
                        <div className="space-y-16">
                            {/* Header */}
                            <div className="space-y-8">
                                <div className="flex items-center space-x-3 text-brand-600 font-black uppercase tracking-[0.4em] text-[10px]">
                                    <div className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse" />
                                    <span>Aura Link Interface</span>
                                </div>
                                <h1 className="text-6xl lg:text-[5.5rem] font-display font-semibold text-white tracking-tighter leading-none italic uppercase">
                                    VIRTUAL <br /><span className="text-brand-500 lowercase underline decoration-white/10 underline-offset-8">try-on.</span>
                                </h1>
                                <p className="text-xl text-charcoal-400 font-light italic leading-relaxed">
                                    Real-time iris-aligned perspective sync. Your vision, broadcast through our world.
                                </p>
                            </div>

                            <Divider className="opacity-5" />

                            {/* Product Info */}
                            <div className="space-y-10 group/info">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-charcoal-600 block mb-2">{selectedProduct.category} Node</span>
                                            <h2 className="text-4xl font-display font-black italic text-white leading-none uppercase tracking-tighter group-hover/info:text-brand-500 transition-colors">{selectedProduct.name}</h2>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-2xl font-display font-bold text-white tracking-tighter block">{formatPrice(selectedProduct.price)}</span>
                                            <span className="text-[10px] font-black text-charcoal-600 uppercase tracking-widest block">INR</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-charcoal-400 font-medium italic leading-relaxed border-l-2 border-brand-500/20 pl-6 py-2">
                                        {selectedProduct.description}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between pb-4">
                                    <div className="flex flex-col space-y-1">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-charcoal-600">Sync Variant</span>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-4 h-4 rounded-full shadow-lg border border-white/10" style={{ backgroundColor: selectedProduct.colorHex }} />
                                            <span className="text-sm font-bold text-white italic uppercase tracking-widest">{selectedProduct.color}</span>
                                        </div>
                                    </div>
                                    <Link href={`/products/${selectedProduct.id}`} className="p-4 bg-white/5 rounded-2xl hover:bg-brand-500 hover:text-black transition-all group/link shadow-xl active:scale-95">
                                        <ChevronRight className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <Button size="lg" className="h-20 rounded-[2rem] bg-brand-500 text-black shadow-2xl shadow-brand-100 hover:bg-white transition-all transform hover:-translate-y-1 active:scale-95 group/btn">
                                        <div className="flex items-center space-x-3 text-lg font-black uppercase tracking-widest">
                                            <span>Secure Bag</span>
                                            <ShoppingBag className="w-6 h-6 group-hover/btn:scale-110 transition-transform" />
                                        </div>
                                    </Button>
                                    <Button variant="outline" size="lg" className="h-20 rounded-[2rem] border-2 border-white/5 bg-white/5 text-white hover:bg-white hover:text-black transition-all shadow-xl hover:-translate-y-1 active:scale-95 group/btn">
                                        <Heart className="w-6 h-6 group-hover/btn:scale-125 transition-transform" />
                                    </Button>
                                </div>
                            </div>

                            <Divider className="opacity-5" />

                            {/* Picker */}
                            <FramePicker selectedId={selectedProduct.id} onSelect={(p) => setSelectedProduct(p)} />

                            {/* Trust Metrics */}
                            <div className="p-8 bg-charcoal-900 text-white rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden group/trust cursor-pointer hover:bg-charcoal-800 transition-colors">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover/trust:scale-150 transition-transform duration-1000" />
                                <div className="relative z-10 flex items-center space-x-6">
                                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-brand-500 shadow-xl group-hover/trust:bg-brand-500 group-hover/trust:text-black transition-all">
                                        <ShieldCheck className="w-8 h-8" />
                                    </div>
                                    <div className="space-y-1">
                                        <h5 className="text-sm font-black uppercase tracking-widest italic group-hover/trust:text-brand-500 transition-colors">Hyper-Care Broadcast</h5>
                                        <p className="text-[10px] text-charcoal-400 font-black uppercase tracking-widest leading-none">14-Day Free Returns Sync Active</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Toggle Sidebar Button */}
            <div className="absolute top-10 right-10 z-[100] hidden lg:block">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-5 bg-white/5 backdrop-blur-2xl border border-white/5 rounded-full text-white hover:bg-brand-500 hover:text-black hover:scale-110 active:scale-95 transition-all shadow-2xl flex items-center group overflow-hidden"
                >
                    {isSidebarOpen ? <X className="w-6 h-6" /> : <Maximize2 className="w-6 h-6" />}
                </button>
            </div>

            {/* Background Text Element */}
            <div className="absolute bottom-10 left-0 w-full overflow-hidden whitespace-nowrap opacity-[0.03] pointer-events-none select-none z-0">
                <span className="text-[20rem] font-display font-black text-white uppercase tracking-tighter italic mr-40">VISION BROADCAST</span>
                <span className="text-[20rem] font-display font-black text-white uppercase tracking-tighter italic mr-40">AKELA EYEWEAR</span>
            </div>
        </div>
    )
}
