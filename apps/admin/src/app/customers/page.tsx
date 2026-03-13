'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Users,
    Search,
    Filter,
    MoreVertical,
    Mail,
    Phone,
    MapPin,
    ShoppingBag,
    ArrowUpRight,
    Star,
    History,
    ChevronLeft,
    ChevronRight,
    UserCheck,
    Zap,
    Download,
    Eye,
    MessageSquare,
    CheckCircle2
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils'

const mockCustomers = [
    { id: '1', name: 'Vikram Singh', email: 'vikram@singh.io', orders: 14, total: 142000, joined: 'March 2024', status: 'Elite', image: 'https://i.pravatar.cc/100?u=Vikram' },
    { id: '2', name: 'Priya Kapoor', email: 'priya@kapoor.me', orders: 8, total: 98500, joined: 'Feb 2024', status: 'Elite', image: 'https://i.pravatar.cc/100?u=Priya' },
    { id: '3', name: 'Siddharth Roy', email: 'sid@roy.com', orders: 5, total: 76200, joined: 'Jan 2024', status: 'Verified', image: 'https://i.pravatar.cc/100?u=Sid' },
    { id: '4', name: 'Ananya Gupta', email: 'ananya@gupta.org', orders: 3, total: 42800, joined: 'April 2024', status: 'Verified', image: 'https://i.pravatar.cc/100?u=Ananya' },
    { id: '5', name: 'Rohan Mehra', email: 'rohan@mehra.ch', orders: 1, total: 18900, joined: 'May 2024', status: 'New', image: 'https://i.pravatar.cc/100?u=Rohan' },
]

export default function CustomersPage() {
    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-6">
                    <div className="flex items-center space-x-3 text-brand-600 font-black uppercase tracking-[0.4em] text-[10px]">
                        <Users className="w-3 h-3" />
                        <span>Universal Identity Registry</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-display font-semibold text-white tracking-tighter leading-none italic uppercase">
                        THE <span className="text-brand-500">subjects.</span>
                    </h1>
                </div>

                <div className="flex items-center space-x-4">
                    <Button variant="outline" className="h-20 px-10 rounded-[2.5rem] border-white/5 bg-white/5 hover:bg-white hover:text-black transition-all">
                        <Download className="w-5 h-5 mr-3" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Collective Export</span>
                    </Button>
                    <Button className="h-20 px-12 rounded-[2.5rem] bg-brand-500 text-black hover:bg-white transition-all shadow-2xl">
                        <MessageSquare className="w-5 h-5 mr-3" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Broadcast Announcement</span>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 p-10 bg-[#141414] border border-white/5 rounded-[4rem] shadow-2xl space-y-12">
                    <div className="flex items-center justify-between">
                        <div className="relative flex-1 max-w-md group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-500 group-focus-within:text-brand-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Scan Identity Nodes..."
                                className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl pl-14 pr-6 text-sm font-black focus:ring-2 focus:ring-brand-500 transition-all outline-none"
                            />
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="p-4 bg-white/5 border border-white/5 rounded-2xl text-charcoal-500 hover:text-white transition-all"><Filter className="w-5 h-5" /></button>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white italic">Node Count: {mockCustomers.length}</span>
                        </div>
                    </div>

                    <div className="overflow-x-auto no-scrollbar">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/5">
                                    <th className="py-8 text-left text-[10px] font-black uppercase tracking-widest text-charcoal-500">Subject Identity</th>
                                    <th className="py-8 text-left text-[10px] font-black uppercase tracking-widest text-charcoal-500">Pulse Activity</th>
                                    <th className="py-8 text-left text-[10px] font-black uppercase tracking-widest text-charcoal-500">Life Yield</th>
                                    <th className="py-8 text-left text-[10px] font-black uppercase tracking-widest text-charcoal-500">Sync Status</th>
                                    <th className="py-8"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {mockCustomers.map((c, i) => (
                                    <tr key={i} className="group hover:bg-white/5 transition-all">
                                        <td className="py-8">
                                            <div className="flex items-center space-x-6">
                                                <div className="w-12 h-12 bg-charcoal-900 rounded-2xl overflow-hidden border border-white/5 group-hover:border-brand-500 transition-all">
                                                    <img src={c.image} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex flex-col space-y-1">
                                                    <span className="text-sm font-black italic tracking-tighter text-white uppercase leading-none">{c.name}</span>
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-charcoal-500">{c.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-8">
                                            <div className="flex flex-col space-y-1">
                                                <span className="text-sm font-black text-white italic leading-none">{c.orders} Transmissions</span>
                                                <span className="text-[8px] font-black uppercase tracking-widest text-charcoal-600">Joined {c.joined}</span>
                                            </div>
                                        </td>
                                        <td className="py-8">
                                            <span className="text-sm font-black text-brand-500 tracking-tighter">₹{c.total.toLocaleString()}</span>
                                        </td>
                                        <td className="py-8">
                                            <div className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest ${c.status === 'Elite' ? 'bg-brand-500/10 text-brand-500' :
                                                    c.status === 'Verified' ? 'bg-blue-500/10 text-blue-500' : 'bg-charcoal-800 text-charcoal-400'
                                                }`}>
                                                <UserCheck className="w-3 h-3" />
                                                <span>{c.status} Node</span>
                                            </div>
                                        </td>
                                        <td className="py-8 text-right">
                                            <div className="flex items-center justify-end space-x-4">
                                                <button className="p-3 bg-white/5 rounded-xl hover:bg-brand-500 hover:text-black transition-all"><Eye className="w-4 h-4" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="p-10 bg-brand-500 text-black rounded-[4rem] space-y-8 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
                        <div className="relative z-10 space-y-6">
                            <div className="flex items-center justify-between">
                                <Star className="w-10 h-10 fill-current" />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Node Retention Matrix</span>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-4xl font-display font-black italic tracking-tighter leading-none uppercase">ELITE <br />LEVEL ACTIVE.</h3>
                                <p className="text-sm font-black uppercase tracking-widest opacity-60">Top 5% of Visionary Subjects in Broadcast</p>
                            </div>
                            <div className="pt-4 border-t border-black/10 flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                                <span>Sync Status: Robust</span>
                                <ArrowUpRight className="w-5 h-5" />
                            </div>
                        </div>
                    </div>

                    <div className="p-10 bg-[#141414] border border-white/5 rounded-[4rem] space-y-10">
                        <div className="flex items-center justify-between">
                            <div className="space-y-2 text-left">
                                <h3 className="text-3xl font-display font-semibold tracking-tighter uppercase italic leading-none text-white">SYNC <span className="text-brand-500">frequency.</span></h3>
                                <p className="text-[10px] font-black uppercase tracking-widest text-charcoal-600">Identity Persistence Over Time Cycles</p>
                            </div>
                            <Activity className="w-8 h-8 text-brand-500 animate-pulse" />
                        </div>
                        <div className="space-y-8">
                            {[
                                { label: 'High Frequency Subjects', value: 84, color: 'bg-brand-500' },
                                { label: 'Verified Periodic Link', value: 62, color: 'bg-white' },
                                { label: 'New Node Identification', value: 45, color: 'bg-charcoal-500' }
                            ].map((item, i) => (
                                <div key={i} className="space-y-3">
                                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                                        <span className="text-charcoal-400">{item.label}</span>
                                        <span className="text-white italic">{item.value}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${item.value}%` }}
                                            className={`h-full ${item.color}`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-10 bg-white/5 border border-white/5 rounded-[4rem] flex flex-col items-center justify-center text-center space-y-8">
                        <div className="w-20 h-20 bg-brand-500 text-black rounded-[2rem] flex items-center justify-center shadow-2xl">
                            <Zap className="w-10 h-10 animate-bounce" />
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-xl font-display font-black italic text-white uppercase tracking-widest">TRIGGER <br />REWARD NODE.</h4>
                            <p className="text-[10px] font-black uppercase tracking-widest text-charcoal-500 px-4">Instant Broadcast Deployment for High-Yield Subjects</p>
                        </div>
                        <Button className="w-full h-16 rounded-[2rem] bg-white text-black hover:bg-brand-500 transition-all font-black uppercase tracking-widest">
                            Initiate Pulse
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Activity = ({ className }: { className?: string }) => (
    <div className={`flex items-end space-x-1 ${className}`}>
        <div className="w-1 h-3 bg-current animate-[pulse_1s_infinite]" />
        <div className="w-1 h-6 bg-current animate-[pulse_1s_infinite_0.2s]" />
        <div className="w-1 h-4 bg-current animate-[pulse_1s_infinite_0.4s]" />
        <div className="w-1 h-8 bg-current animate-[pulse_1s_infinite_0.6s]" />
    </div>
)
