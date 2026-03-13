'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { History, Box, Truck, CheckCircle2, Package, Search, LayoutGrid, List, SlidersHorizontal, ArrowRight, Download, PackageOpen, Tag, Calendar, ShieldCheck, MapPin, ExternalLink, Info } from 'lucide-react'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Divider } from '@/components/ui/Divider'

const OrdersPage = () => {

    // Mock Orders
    const orders = [
        { id: 'AK-924185', date: 'Oct 24, 2024', status: 'IN PRODUCTION', total: 12499, items: 1, tracking: 'AWB-823419-V' },
        { id: 'AK-815302', date: 'Sep 12, 2024', status: 'DELIVERED', total: 8250, items: 1, tracking: 'AWB-712854-C' },
        { id: 'AK-796124', date: 'Aug 05, 2024', status: 'DELIVERED', total: 18400, items: 2, tracking: 'AWB-615239-X' },
    ]

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-xs font-bold text-charcoal-400 uppercase tracking-widest">
                        <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
                        <div className="w-1 h-1 bg-charcoal-200 rounded-full" />
                        <span className="text-charcoal-900">Perspective History</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-display font-semibold text-charcoal-900 tracking-tighter leading-none italic uppercase tracking-tighter">
                        LENS <span className="text-brand-500">HISTORY.</span>
                    </h1>
                    <p className="text-lg text-charcoal-500 font-medium italic">A chronicle of your visionary acquisitions and handcrafted frames.</p>
                </div>

                <div className="flex items-center space-x-4 bg-white p-2 rounded-2xl border border-charcoal-100 shadow-xl shadow-brand-100/10">
                    <div className="relative group">
                        <Input
                            placeholder="Locate Order #"
                            className="h-12 w-48 bg-charcoal-50 border-none rounded-xl pl-10 text-[10px] font-black uppercase placeholder:text-charcoal-400 focus-visible:ring-brand-500"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-300 group-focus-within:text-brand-500 transition-colors" />
                    </div>
                    <Button variant="outline" className="h-12 rounded-xl border-2 px-6">
                        <SlidersHorizontal className="w-4 h-4 mr-2" />
                        Refine
                    </Button>
                </div>
            </div>

            <div className="space-y-8">
                <AnimatePresence mode="popLayout">
                    {orders.map((order, idx) => (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: idx * 0.1 }}
                            className="bg-white rounded-[3rem] border border-charcoal-100 shadow-xl shadow-brand-100/10 overflow-hidden group hover:shadow-2xl hover:shadow-brand-100/20 transition-all"
                        >
                            {/* Order Header */}
                            <div className="p-8 lg:p-12 border-b border-charcoal-50 flex flex-col md:flex-row md:items-center justify-between gap-8 bg-charcoal-50/20">
                                <div className="flex flex-wrap gap-8 items-center justify-between md:justify-start w-full md:w-auto">
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-black text-charcoal-400 uppercase tracking-widest leading-none block">Frequency ID</span>
                                        <p className="text-2xl font-display font-black text-charcoal-900 italic leading-none">{order.id}</p>
                                    </div>
                                    <div className="w-px h-10 bg-charcoal-100 hidden md:block" />
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-black text-charcoal-400 uppercase tracking-widest leading-none block">Vision Date</span>
                                        <div className="flex items-center space-x-2 text-charcoal-900 font-bold italic text-sm">
                                            <Calendar className="w-4 h-4 text-brand-500" />
                                            <span>{order.date}</span>
                                        </div>
                                    </div>
                                    <div className="w-px h-10 bg-charcoal-100 hidden md:block" />
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-black text-charcoal-400 uppercase tracking-widest leading-none block">Settlement</span>
                                        <p className="text-xl font-display font-bold text-charcoal-900 leading-none">{formatPrice(order.total)}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4 self-end md:self-auto">
                                    <div className={cn(
                                        "px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center shadow-lg",
                                        order.status === 'DELIVERED' ? "bg-white border-charcoal-100 text-charcoal-900" : "bg-brand-500 text-black shadow-brand-100"
                                    )}>
                                        <div className={cn("w-2 h-2 rounded-full mr-2 animate-pulse", order.status === 'DELIVERED' ? "bg-green-500" : "bg-black")} />
                                        {order.status}
                                    </div>
                                    <Button variant="ghost" className="h-12 w-12 rounded-2xl bg-white border border-charcoal-200 hover:bg-brand-500 hover:text-white transition-all">
                                        <Download className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>

                            {/* Order Products */}
                            <div className="p-8 lg:p-12 space-y-12">
                                <div className="flex flex-col lg:flex-row lg:items-center gap-12">
                                    <div className="relative aspect-square w-full md:w-40 bg-charcoal-50 rounded-[2rem] border border-charcoal-100 p-8 flex-shrink-0 group-hover:bg-brand-50 transition-colors">
                                        <img src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=300" alt="Product" className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" />
                                    </div>

                                    <div className="flex-1 space-y-6">
                                        <div className="space-y-2">
                                            <div className="flex items-center space-x-2 text-[10px] font-black text-brand-600 uppercase tracking-widest italic">
                                                <Tag className="w-3 h-3" />
                                                <span>Elite Silhouette</span>
                                            </div>
                                            <h3 className="text-3xl font-display font-bold text-charcoal-900 tracking-tight uppercase tracking-widest group-hover:text-brand-600 transition-colors">Vortex Titanium Series</h3>
                                            <p className="text-charcoal-500 text-sm font-medium italic max-w-lg leading-relaxed">Artisan frame with hyper-light titanium build and 100% Aura-clear lens tech.</p>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-6">
                                            <div className="flex items-center space-x-2 py-2 px-4 bg-charcoal-50 rounded-xl border border-charcoal-100">
                                                <div className="w-3 h-3 rounded-full bg-charcoal-900" />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-charcoal-900">Midnight Pulse</span>
                                            </div>
                                            <div className="flex items-center space-x-2 py-2 px-4 bg-charcoal-50 rounded-xl border border-charcoal-100">
                                                <PackageOpen className="w-3.5 h-3.5 text-brand-600" />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-charcoal-900 italic">Qty: 01</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full lg:w-fit space-y-4 lg:text-right self-end lg:self-center">
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-black text-charcoal-400 uppercase tracking-widest leading-none block">Tracking Node</span>
                                            <button className="text-sm font-black text-charcoal-900 border-b border-brand-500 hover:text-brand-600 transition-all flex items-center lg:justify-end">
                                                {order.tracking}
                                                <ExternalLink className="w-3 h-3 ml-2" />
                                            </button>
                                        </div>
                                        <Button asChild size="lg" className="h-14 w-full lg:w-fit px-10 rounded-2xl bg-charcoal-900 text-white hover:bg-brand-600 transition-all shadow-xl group/btn">
                                            <Link href={`/account/orders/${order.id}`}>
                                                <span>Full Vision Summary</span>
                                                <ArrowRight className="w-5 h-5 ml-3 group-hover/btn:translate-x-2 transition-transform" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>

                                {/* Logistics Timeline */}
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-10 border-t border-charcoal-50">
                                    {[
                                        { label: 'Transmission', date: 'Oct 24', done: true, icon: <CheckCircle2 className="w-4 h-4" /> },
                                        { label: 'Crafting', date: 'Oct 25', done: true, icon: <Truck className="w-4 h-4" /> },
                                        { label: 'Carrier Link', date: 'In Hub', done: false, icon: <Package className="w-4 h-4" />, current: true },
                                        { label: 'Vision Reach', date: 'Oct 29', done: false, icon: <MapPin className="w-4 h-4" /> },
                                    ].map((step, i) => (
                                        <div key={i} className={cn("relative flex items-center space-x-3 transition-opacity", !step.done && !step.current && "opacity-30")}>
                                            <div className={cn(
                                                "w-10 h-10 rounded-2xl flex items-center justify-center transition-all shadow-xl",
                                                step.done ? "bg-brand-500 text-black shadow-brand-100" : "bg-charcoal-100 text-charcoal-400",
                                                step.current ? "bg-charcoal-900 text-white ring-4 ring-brand-100 scale-110" : ""
                                            )}>
                                                {step.icon}
                                            </div>
                                            <div className="space-y-0.5 min-w-0">
                                                <span className="text-[9px] font-black uppercase tracking-widest block truncate">{step.label}</span>
                                                <span className="text-[10px] font-bold text-charcoal-400 block truncate">{step.date}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Empty State / Help */}
            <div className="flex flex-col lg:flex-row items-center justify-between p-12 bg-charcoal-900 text-white rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="flex flex-col md:flex-row items-center gap-8 relative z-10 w-full text-center md:text-left">
                    <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center text-brand-500 border border-white/5 transform group-hover:rotate-45 transition-transform duration-700">
                        <ShieldCheck className="w-10 h-10" />
                    </div>
                    <div className="flex-1 space-y-2">
                        <h3 className="text-3xl font-display font-semibold tracking-tight uppercase tracking-widest italic leading-none">CRAFT <span className="text-brand-500">GUARANTEE.</span></h3>
                        <p className="text-lg text-charcoal-400 font-medium italic">Every frame in your history is backed by our 1-year artisan protection protocol. Facing a focus issue?</p>
                    </div>
                    <Button variant="outline" className="h-16 px-12 rounded-2xl border-white/10 hover:bg-white hover:text-charcoal-900 transition-all font-black uppercase tracking-widest group/help">
                        Connect to Concierge
                        <Info className="w-5 h-5 ml-3 group-hover/help:scale-125 transition-transform" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

export default OrdersPage
