'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    TrendingUp,
    TrendingDown,
    ArrowUpRight,
    ArrowDownRight,
    CreditCard,
    ShoppingBag,
    Users,
    Package,
    Minus,
    ChevronRight,
    ArrowRight,
    Search,
    Filter,
    Activity,
    Clock,
    UserCheck,
    AlertCircle,
    Star,
    MoreVertical,
    CheckCircle2,
    Truck,
    Clock3,
    AlertTriangle,
    Zap,
    History
} from 'lucide-react'
import {
    ResponsiveContainer,
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    AreaChart,
    Area
} from 'recharts'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils'

const MetricsCard = ({ title, value, trend, trendValue, icon: Icon, colorClass }: any) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="p-8 bg-white/5 border border-white/5 rounded-[3rem] shadow-2xl relative group overflow-hidden"
        >
            <div className={`absolute top-0 right-0 w-32 h-32 ${colorClass} opacity-5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000`} />
            <div className="relative z-10 flex flex-col justify-between h-full space-y-8">
                <div className="flex items-center justify-between">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-white border border-white/5 group-hover:bg-brand-500 group-hover:text-black transition-all">
                        <Icon className="w-7 h-7" />
                    </div>
                    {trend && (
                        <div className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${trend === 'up' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                            {trend === 'up' ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                            <span>{trendValue}</span>
                        </div>
                    )}
                </div>
                <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-charcoal-500">{title}</span>
                    <h3 className="text-4xl font-display font-black text-white tracking-tighter italic">{value}</h3>
                </div>
            </div>
        </motion.div>
    )
}

const DASHBOARD_VARIANTS = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
}

const revenueData = [
    { name: '01 Mar', rev: 12000 }, { name: '05 Mar', rev: 18000 }, { name: '10 Mar', rev: 14000 },
    { name: '15 Mar', rev: 25000 }, { name: '20 Mar', rev: 32000 }, { name: '25 Mar', rev: 28000 }, { name: '30 Mar', rev: 45000 }
]

const categoryDistribution = [
    { name: 'Sunglasses', value: 45000, color: '#FFD700' },
    { name: 'Eyeglasses', value: 32000, color: '#FFFFFF' },
    { name: 'Blue Light', value: 18000, color: '#666666' },
    { name: 'Sports', value: 12000, color: '#333333' }
]

const recentOrders = [
    { id: '#AKL-29381', customer: 'Aryan Kapoor', total: 18900, date: '2 mins ago', status: 'Processing' },
    { id: '#AKL-29380', customer: 'Isha Mehra', total: 14500, date: '12 mins ago', status: 'Shipped' },
    { id: '#AKL-29379', customer: 'Rohan Shah', total: 32400, date: '1 hour ago', status: 'Delivered' },
    { id: '#AKL-29378', customer: 'Sanya Gupta', total: 8900, date: '2 hours ago', status: 'Cancelled' },
    { id: '#AKL-29377', customer: 'Amit Desai', total: 16200, date: '4 hours ago', status: 'Shipped' },
]

const DashboardPage = () => {
    return (
        <motion.div
            variants={DASHBOARD_VARIANTS}
            initial="hidden"
            animate="visible"
            className="space-y-12"
        >
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-6">
                    <div className="flex items-center space-x-3 text-brand-600 font-black uppercase tracking-[0.4em] text-[10px]">
                        <Activity className="w-3 h-3 animate-pulse" />
                        <span>Live Global Statistics Broadcast</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-display font-semibold text-white tracking-tighter leading-none italic uppercase">
                        MISSION <span className="text-brand-500">CONTROL.</span>
                    </h1>
                    <p className="text-xl text-charcoal-400 font-light italic leading-relaxed">Broadcast analytics from the Akela artisan studio network.</p>
                </div>

                <div className="flex items-center p-3 bg-white/5 border border-white/5 rounded-3xl backdrop-blur-3xl space-x-4">
                    <div className="flex flex-col text-right pl-6">
                        <span className="text-[10px] font-black uppercase tracking-widest text-charcoal-500">Node Sync Update</span>
                        <span className="text-sm font-bold text-white italic">0.12s Latency</span>
                    </div>
                    <div className="w-12 h-12 bg-brand-500 text-black rounded-2xl flex items-center justify-center shadow-2xl">
                        <Zap className="w-6 h-6 animate-bounce" />
                    </div>
                </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <MetricsCard
                    title="Gross Revenue"
                    value="₹4,29,100"
                    trend="up"
                    trendValue="+12.4%"
                    icon={CreditCard}
                    colorClass="bg-brand-500"
                />
                <MetricsCard
                    title="Active Orders"
                    value="142"
                    trend="up"
                    trendValue="+8%"
                    icon={ShoppingBag}
                    colorClass="bg-white"
                />
                <MetricsCard
                    title="Visionary Users"
                    value="2.8K"
                    trend="up"
                    trendValue="+184"
                    icon={Users}
                    colorClass="bg-charcoal-500"
                />
                <MetricsCard
                    title="Artisan Stock"
                    value="99.2%"
                    icon={Package}
                    colorClass="bg-blue-500"
                />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Revenue Line Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-8 p-12 bg-white/5 border border-white/5 rounded-[4rem] space-y-10"
                >
                    <div className="flex items-center justify-between">
                        <div className="space-y-2">
                            <h3 className="text-3xl font-display font-semibold tracking-tighter uppercase italic leading-none">REVENUE <span className="text-brand-500 lowercase">trajectory.</span></h3>
                            <p className="text-[10px] font-black uppercase tracking-widest text-charcoal-600">30-Day Automated Broadcast Pulse</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            {['Today', 'Week', 'Month'].map((opt) => (
                                <button key={opt} className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${opt === 'Month' ? 'bg-brand-500 text-black' : 'bg-white/5 text-charcoal-400 hover:text-white'}`}>{opt}</button>
                            ))}
                        </div>
                    </div>

                    <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData}>
                                <defs>
                                    <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#FFD700" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#FFD700" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    stroke="#ffffff10"
                                    tick={{ fill: '#666', fontSize: 10, fontWeight: 900 }}
                                    axisLine={false}
                                    tickLine={false}
                                    dy={20}
                                />
                                <YAxis
                                    stroke="#ffffff10"
                                    tick={{ fill: '#666', fontSize: 10, fontWeight: 900 }}
                                    axisLine={false}
                                    tickLine={false}
                                    dx={-20}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#141414',
                                        borderRadius: '24px',
                                        border: '1px solid #ffffff10',
                                        padding: '16px'
                                    }}
                                    itemStyle={{ color: '#FFD700', fontSize: '12px', fontWeight: 900 }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="rev"
                                    stroke="#FFD700"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#revGradient)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Categories Pie Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="lg:col-span-4 p-12 bg-[#141414] border border-white/5 rounded-[4rem] flex flex-col justify-between"
                >
                    <div className="space-y-2">
                        <h3 className="text-3xl font-display font-semibold tracking-tighter uppercase italic leading-none text-white">CATEGORY <br /><span className="text-brand-500 lowercase">distribution.</span></h3>
                        <p className="text-[10px] font-black uppercase tracking-widest text-charcoal-600">Broadcast Volume Share</p>
                    </div>

                    <div className="h-[250px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryDistribution}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={8}
                                    dataKey="value"
                                >
                                    {categoryDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-[10px] font-black uppercase tracking-widest text-charcoal-500">Top Node</span>
                            <span className="text-2xl font-display font-bold text-white">45%</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {categoryDistribution.map((c, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-charcoal-300">{c.name}</span>
                                </div>
                                <span className="text-[10px] font-bold text-white italic">{Math.round(c.value / 1070)}%</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Recent Orders Table */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="p-12 bg-white/5 border border-white/5 rounded-[4.5rem] space-y-12"
            >
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <h3 className="text-4xl font-display font-semibold tracking-tighter uppercase italic leading-none">RECENT <span className="text-brand-500 lowercase">transmissions.</span></h3>
                        <p className="text-[10px] font-black uppercase tracking-widest text-charcoal-600">Awaiting Logistic Fulfillment Deployment</p>
                    </div>
                    <Button variant="outline" className="h-14 px-8 rounded-full border-white/5 bg-white/5 hover:bg-brand-500 hover:text-black transition-all group">
                        <span>Full Archive</span>
                        <ArrowRight className="w-4 h-4 ml-4 group-hover:translate-x-2 transition-transform" />
                    </Button>
                </div>

                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/5">
                                {['ID Broadcast', 'Visionary', 'Yield', 'Node Pulse', 'Link Status'].map((h) => (
                                    <th key={h} className="text-left py-8 text-[10px] font-black uppercase tracking-widest text-charcoal-500">{h}</th>
                                ))}
                                <th className="py-8"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {recentOrders.map((ord, i) => (
                                <tr key={i} className="group hover:bg-white/5 transition-all">
                                    <td className="py-8 text-sm font-black italic tracking-tighter text-white">{ord.id}</td>
                                    <td className="py-8">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 bg-charcoal-800 rounded-xl overflow-hidden border border-white/5">
                                                <img src={`https://i.pravatar.cc/100?u=${ord.customer}`} className="w-full h-full object-cover" />
                                            </div>
                                            <span className="text-sm font-bold text-charcoal-300 italic uppercase tracking-widest leading-none">{ord.customer}</span>
                                        </div>
                                    </td>
                                    <td className="py-8 text-sm font-black text-brand-500 tracking-tighter">₹{ord.total.toLocaleString()}</td>
                                    <td className="py-8 text-[10px] font-black uppercase tracking-widest text-charcoal-500">{ord.date}</td>
                                    <td className="py-8">
                                        <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest ${ord.status === 'Processing' ? 'bg-yellow-500/10 text-yellow-500' :
                                            ord.status === 'Shipped' ? 'bg-blue-500/10 text-blue-500' :
                                                ord.status === 'Delivered' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                                            }`}>
                                            <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${ord.status === 'Processing' ? 'bg-yellow-500' :
                                                ord.status === 'Shipped' ? 'bg-blue-500' :
                                                    ord.status === 'Delivered' ? 'bg-green-500' : 'bg-red-500'
                                                }`} />
                                            <span>{ord.status}</span>
                                        </div>
                                    </td>
                                    <td className="py-8 text-right">
                                        <button className="p-3 hover:bg-white/10 rounded-xl transition-all"><MoreVertical className="w-4 h-4 text-charcoal-600" /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.section>

            {/* Lower Grid: Inventory & Customers */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="p-12 bg-[#141414] border border-white/5 rounded-[4rem] space-y-10">
                    <div className="flex items-center justify-between">
                        <div className="space-y-2">
                            <h3 className="text-3xl font-display font-semibold tracking-tighter uppercase italic leading-none text-white">LOW STOCK <span className="text-red-500">alerts.</span></h3>
                            <p className="text-[10px] font-black uppercase tracking-widest text-charcoal-600">Critical Node Restoration Required</p>
                        </div>
                        <AlertTriangle className="w-10 h-10 text-red-500 animate-bounce" />
                    </div>
                    <div className="space-y-6">
                        {[
                            { name: 'Aviator Classic Noir', stock: 4, category: 'Sunglasses' },
                            { name: 'Round Vision Gold', stock: 2, category: 'Eyeglasses' },
                            { name: 'Linear Gunmetal', stock: 1, category: 'Blue Light' }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/5 group hover:border-red-500/30 transition-all">
                                <div className="flex items-center space-x-6">
                                    <div className="p-4 bg-red-500/10 text-red-500 rounded-2xl">
                                        <Package className="w-5 h-5" />
                                    </div>
                                    <div className="space-y-1 text-left">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-charcoal-600 border-b border-white/5 pb-1 mb-1 block">{item.category}</span>
                                        <h4 className="text-sm font-black italic tracking-tighter text-white">{item.name}</h4>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-2xl font-display font-bold text-red-500">{item.stock}</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-charcoal-600 block leading-none">Left</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button className="w-full h-16 rounded-[2rem] bg-white text-black hover:bg-brand-500 transition-all font-black uppercase tracking-widest">
                        Trigger Supply Node Refill
                    </Button>
                </div>

                <div className="p-12 bg-white/5 border border-white/5 rounded-[4rem] space-y-10">
                    <div className="flex items-center justify-between">
                        <div className="space-y-2">
                            <h3 className="text-3xl font-display font-semibold tracking-tighter uppercase italic leading-none">ARTISAN <span className="text-brand-500">elite.</span></h3>
                            <p className="text-[10px] font-black uppercase tracking-widest text-charcoal-600">Top Frequency Purchase Subjects</p>
                        </div>
                        <Star className="w-10 h-10 text-brand-500 animate-pulse" />
                    </div>
                    <div className="space-y-6">
                        {[
                            { name: 'Vikram Singh', total: 142000, orders: 12 },
                            { name: 'Priya Kapoor', total: 98500, orders: 8 },
                            { name: 'Siddharth Roy', total: 76200, orders: 5 }
                        ].map((cust, i) => (
                            <div key={i} className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/5 group hover:bg-brand-500 transition-all">
                                <div className="flex items-center space-x-6">
                                    <div className="w-12 h-12 rounded-2xl overflow-hidden border border-white/10 group-hover:border-black transition-all">
                                        <img src={`https://i.pravatar.cc/100?u=${cust.name}`} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="space-y-1 text-left">
                                        <h4 className="text-sm font-black italic tracking-tighter text-white group-hover:text-black transition-colors">{cust.name}</h4>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-charcoal-500 group-hover:text-black/50 transition-colors">{cust.orders} Visionary Orders</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-xl font-display font-bold text-brand-500 group-hover:text-black transition-colors">₹{cust.total.toLocaleString()}</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-charcoal-600 block leading-none group-hover:text-black/50 transition-colors">Life Yield</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button variant="outline" className="w-full h-16 rounded-[2rem] border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all font-black uppercase tracking-widest">
                        Broadcast Rewards Deployment
                    </Button>
                </div>
            </div>
        </motion.div>
    )
}

export default DashboardPage
