'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, ShoppingBag, Heart, Settings, Plus, Trash2, ShieldCheck, Sparkles, Box, Info, ArrowRight, Star, Clock, MapPin, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useSession } from 'next-auth/react'

const AccountDashboard = () => {
    const { data: session } = useSession()

    const userStats = [
        { label: 'Frames Secured', val: '08', icon: <Box className="w-5 h-5" /> },
        { label: 'Vision Points', val: '1,240', icon: <Star className="w-5 h-5 text-brand-500" /> },
        { label: 'Saved Curations', val: '12', icon: <Heart className="w-5 h-5 text-red-500" /> },
    ]

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-xs font-bold text-charcoal-400 uppercase tracking-widest">
                        <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
                        <div className="w-1 h-1 bg-charcoal-200 rounded-full" />
                        <span className="text-charcoal-900">Identity Vault</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-display font-semibold text-charcoal-900 tracking-tighter leading-none italic uppercase tracking-tighter">
                        WELCOME <br /><span className="text-brand-500">{session?.user?.name?.split(' ')[0] || 'VISIONARY'}.</span>
                    </h1>
                    <p className="text-lg text-charcoal-500 font-medium italic">Your personalized perspective gateway is now broadcast.</p>
                </div>

                <div className="flex items-center bg-white p-4 lg:p-6 rounded-[2rem] border border-charcoal-100 shadow-xl shadow-brand-100/10 gap-8">
                    {userStats.map((stat, i) => (
                        <div key={i} className="flex flex-col items-center text-center space-y-1 group">
                            <div className="p-3 bg-charcoal-50 rounded-2xl group-hover:bg-brand-500 group-hover:text-white transition-all transform group-hover:rotate-12">
                                {stat.icon}
                            </div>
                            <span className="text-2xl font-display font-black text-charcoal-900 leading-none pt-2">{stat.val}</span>
                            <span className="text-[10px] font-black text-charcoal-400 uppercase tracking-widest leading-none">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
                {/* Recent Activity / Order */}
                <div className="space-y-8 bg-white p-10 rounded-[3rem] border border-charcoal-100 shadow-xl shadow-brand-100/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
                    <div className="relative z-10 space-y-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-display font-semibold tracking-tight uppercase tracking-widest italic leading-none flex items-center">
                                <Clock className="w-5 h-5 mr-3 text-brand-500" />
                                LATEST <span className="text-brand-500 lowercase ml-1">broadcast.</span>
                            </h3>
                            <Link href="/account/orders" className="text-[10px] font-black uppercase tracking-widest text-charcoal-900 border-b border-brand-500">Full History</Link>
                        </div>

                        {/* Placeholder Order */}
                        <div className="p-6 bg-charcoal-50 rounded-[2rem] border border-charcoal-100 space-y-4 relative group">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-black text-charcoal-400 uppercase tracking-widest">Order ID</span>
                                    <p className="text-sm font-black text-charcoal-900 italic">#AK-924185</p>
                                </div>
                                <div className="px-3 py-1 bg-brand-500 text-black text-[9px] font-black rounded-full uppercase tracking-widest shadow-xl shadow-brand-100">IN PRODUCTION</div>
                            </div>
                            <div className="flex items-center space-x-4 pt-2">
                                <div className="aspect-square w-16 bg-white rounded-xl border border-charcoal-200 p-2">
                                    <img src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=300" alt="Product" className="w-full h-full object-contain" />
                                </div>
                                <div className="flex-1 space-y-1 min-w-0">
                                    <h4 className="text-xs font-black uppercase tracking-widest text-charcoal-900 truncate">Vortex Titanium Series</h4>
                                    <p className="text-[9px] font-bold text-charcoal-400 uppercase tracking-widest">Shipped to Mumbai, MH</p>
                                </div>
                            </div>
                            <Button variant="ghost" asChild className="w-full h-12 bg-white border border-charcoal-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-500 hover:text-white hover:border-brand-500 transition-all shadow-xl group/btn">
                                <Link href="/account/orders/924185">
                                    <span>Trace Shipment</span>
                                    <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Profile Quick Edit */}
                <div className="space-y-8 bg-charcoal-900 text-white p-10 rounded-[3rem] border border-white/5 shadow-2xl shadow-charcoal-900/50 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-full h-[30%] bg-gradient-to-b from-white/10 to-transparent z-0 pointer-events-none" />
                    <div className="relative z-10 space-y-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-display font-semibold tracking-tight uppercase tracking-widest italic leading-none flex items-center">
                                <Settings className="w-5 h-5 mr-3 text-brand-500" />
                                IDENTITY <span className="text-brand-500 lowercase ml-1">configs.</span>
                            </h3>
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <span className="text-[10px] font-black text-charcoal-400 uppercase tracking-widest">Aura Alias</span>
                                    <p className="text-sm font-black italic">{session?.user?.name || 'N/A'}</p>
                                </div>
                                <div className="space-y-2">
                                    <span className="text-[10px] font-black text-charcoal-400 uppercase tracking-widest">Linked Frequency</span>
                                    <p className="text-sm font-black italic truncate">{session?.user?.email || 'N/A'}</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <span className="text-[10px] font-black text-charcoal-400 uppercase tracking-widest">Base Coordinates</span>
                                <div className="flex items-start space-x-3 text-sm font-black italic text-charcoal-200">
                                    <MapPin className="w-4 h-4 mt-1 text-brand-500" />
                                    <p>402, Elite Heights, Pali Hill, <br /> Bandra West, Mumbai 400050</p>
                                </div>
                            </div>
                            <Button variant="outline" asChild className="w-full h-14 bg-white/5 border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-charcoal-900 transition-all group/btn shadow-2xl">
                                <Link href="/account/settings">
                                    <span>Update Profile Engine</span>
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-2 transition-transform" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Loyalty/Rewards Section */}
            <div className="relative p-12 bg-white rounded-[4rem] border border-charcoal-100 shadow-2xl shadow-brand-100/10 flex flex-col items-center text-center space-y-8 group overflow-hidden">
                <div className="absolute inset-0 bg-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="relative z-10 w-24 h-24 bg-charcoal-900 text-brand-500 rounded-[2.5rem] flex items-center justify-center transform group-hover:rotate-12 group-hover:scale-110 transition-transform shadow-2xl shadow-brand-100">
                    <Sparkles className="w-12 h-12" />
                </div>
                <div className="relative z-10 space-y-4 max-w-2xl">
                    <h3 className="text-4xl md:text-5xl font-display font-semibold text-charcoal-900 tracking-tight leading-none uppercase tracking-widest italic">AKELA <span className="text-brand-500 lowercase mx-1">premium</span> VISIONARY.</h3>
                    <p className="text-lg text-charcoal-500 font-medium italic leading-relaxed">
                        You are in the top <span className="text-charcoal-900 font-black">5%</span> of our global network. You've earned <span className="text-brand-600 font-black">EARLY ACCESS</span> to the upcoming 'Titan Phase' release.
                    </p>
                </div>
                <Button className="h-16 px-12 rounded-2xl bg-charcoal-900 hover:bg-brand-600 transition-all shadow-2xl group/cta">
                    <span className="relative z-10 flex items-center justify-center space-x-3 uppercase font-black tracking-widest">
                        <span>Claim Exclusive Aura</span>
                        <ArrowRight className="w-5 h-5 group-hover/cta:translate-x-2 transition-transform" />
                    </span>
                </Button>
            </div>
        </div>
    )
}

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

export default AccountDashboard
