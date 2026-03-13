'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    ShoppingBag,
    Search,
    Filter,
    MoreVertical,
    Eye,
    Truck,
    CheckCircle2,
    XCircle,
    Clock3,
    ChevronLeft,
    ChevronRight,
    SearchX,
    Calendar,
    ArrowRight,
    Printer,
    Download,
    CreditCard
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'

const mockOrders = [
    { id: 'AKL-29381', customer: 'Aryan Kapoor', email: 'aryan@example.com', total: 18900, status: 'Processing', payment: 'Paid', date: '2026-03-10T14:30:00' },
    { id: 'AKL-29380', customer: 'Isha Mehra', email: 'isha@mehra.com', total: 14500, status: 'Shipped', payment: 'Paid', date: '2026-03-10T12:15:00' },
    { id: 'AKL-29379', customer: 'Rohan Shah', total: 32400, date: '2026-03-10', status: 'Delivered', payment: 'Paid' },
    { id: 'AKL-29378', customer: 'Sanya Gupta', total: 8900, date: '2026-03-09', status: 'Cancelled', payment: 'Refunded' },
    { id: 'AKL-29377', customer: 'Amit Desai', total: 16200, date: '2026-03-09', status: 'Shipped', payment: 'Paid' },
]

export default function OrdersPage() {
    const [statusFilter, setStatusFilter] = useState('All')

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-6">
                    <div className="flex items-center space-x-3 text-brand-600 font-black uppercase tracking-[0.4em] text-[10px]">
                        <ShoppingBag className="w-3 h-3" />
                        <span>Global Fulfillment Link Broadcast</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-display font-semibold text-white tracking-tighter leading-none italic uppercase">
                        THE <span className="text-brand-500">orders.</span>
                    </h1>
                </div>

                <div className="flex items-center space-x-4">
                    <Button variant="outline" className="h-20 px-10 rounded-[2.5rem] border-white/5 bg-white/5 hover:bg-white hover:text-black transition-all">
                        <Download className="w-5 h-5 mr-3" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Snapshot Export</span>
                    </Button>
                    <Button className="h-20 px-12 rounded-[2.5rem] bg-brand-500 text-black hover:bg-white transition-all shadow-2xl">
                        <Printer className="w-5 h-5 mr-3" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Collective Invoices</span>
                    </Button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-6 bg-white/5 border border-white/5 rounded-[2.5rem]">
                <div className="flex flex-1 items-center space-x-6">
                    <div className="relative flex-1 max-w-md group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-500 group-focus-within:text-brand-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Scan Fulfilled Nodes..."
                            className="w-full h-14 bg-white/5 border border-white/5 rounded-2xl pl-14 pr-6 text-sm font-black focus:ring-2 focus:ring-brand-500 transition-all outline-none"
                        />
                    </div>
                    <div className="flex items-center space-x-3">
                        {['All', 'Processing', 'Shipped', 'Delivered'].map((opt) => (
                            <button
                                key={opt}
                                onClick={() => setStatusFilter(opt)}
                                className={`px-6 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest border transition-all ${statusFilter === opt ? 'bg-brand-500 border-brand-500 text-black shadow-lg shadow-brand-500/20' : 'bg-white/5 border-white/5 text-charcoal-400 hover:text-white'}`}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex items-center space-x-4 font-black">
                    <div className="px-6 py-4 bg-white/5 rounded-2xl border border-white/5 flex items-center space-x-4">
                        <Calendar className="w-4 h-4 text-brand-500" />
                        <span className="text-[10px] uppercase tracking-widest text-charcoal-400">Time Range:</span>
                        <span className="text-[10px] uppercase tracking-widest text-white italic">Last 30 Cycles</span>
                    </div>
                </div>
            </div>

            <div className="p-10 bg-[#141414] border border-white/5 rounded-[4rem] shadow-2xl overflow-hidden">
                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/5">
                                <th className="py-8 text-left text-[10px] font-black uppercase tracking-widest text-charcoal-500">ID Pulse</th>
                                <th className="py-8 text-left text-[10px] font-black uppercase tracking-widest text-charcoal-500">Subject Account</th>
                                <th className="py-8 text-left text-[10px) font-black uppercase tracking-widest text-charcoal-500">Yield Value</th>
                                <th className="py-8 text-left text-[10px] font-black uppercase tracking-widest text-charcoal-500">Payment Link</th>
                                <th className="py-8 text-left text-[10px] font-black uppercase tracking-widest text-charcoal-500">Fulfillment Status</th>
                                <th className="py-8"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {mockOrders.map((ord, i) => (
                                <tr key={i} className="group hover:bg-white/5 transition-all">
                                    <td className="py-8 font-black text-white italic tracking-tighter text-sm underline decoration-white/5 decoration-2 underline-offset-4">{ord.id}</td>
                                    <td className="py-8">
                                        <div className="flex flex-col space-y-1">
                                            <span className="text-sm font-black italic tracking-tighter text-white uppercase">{ord.customer}</span>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-charcoal-500">{ord.email || 'guest@nexus.io'}</span>
                                        </div>
                                    </td>
                                    <td className="py-8">
                                        <span className="text-sm font-black text-brand-500 tracking-tighter">{formatPrice(ord.total)}</span>
                                    </td>
                                    <td className="py-8">
                                        <div className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest border ${ord.payment === 'Paid' ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-red-500/10 border-red-500/20 text-red-500'
                                            }`}>
                                            <CreditCard className="w-3 h-3" />
                                            <span>{ord.payment}</span>
                                        </div>
                                    </td>
                                    <td className="py-8">
                                        <div className={`inline-flex items-center space-x-3 px-5 py-2.5 rounded-2xl text-[9px] font-black uppercase tracking-widest ${ord.status === 'Processing' ? 'bg-yellow-500/10 text-yellow-500' :
                                                ord.status === 'Shipped' ? 'bg-blue-500/10 text-blue-500' :
                                                    ord.status === 'Delivered' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                                            }`}>
                                            <span>{ord.status}</span>
                                            <ArrowRight className="w-3 h-3 opacity-30 group-hover:translate-x-1 group-hover:opacity-100 transition-all" />
                                        </div>
                                    </td>
                                    <td className="py-8 text-right">
                                        <div className="flex items-center justify-end space-x-4">
                                            <button className="p-3 bg-white/5 rounded-xl hover:bg-brand-500 hover:text-black transition-all group/btn shadow-xl">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button className="p-3 bg-white/5 rounded-xl hover:bg-white hover:text-black transition-all group/btn shadow-xl">
                                                <Printer className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
