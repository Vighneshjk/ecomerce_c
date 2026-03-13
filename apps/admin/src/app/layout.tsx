'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    LayoutDashboard,
    Box,
    ShoppingBag,
    Users,
    Package,
    Ticket,
    Star,
    LineChart,
    Settings,
    Search,
    Bell,
    ChevronDown,
    Menu,
    X,
    LogOut,
    Eye
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { SessionProvider, useSession, signOut } from 'next-auth/react'

const SidebarItem = ({ icon: Icon, label, href, active }: any) => {
    return (
        <Link href={href}>
            <div className={cn(
                "flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all group",
                active
                    ? "bg-brand-500 text-black shadow-lg shadow-brand-500/20"
                    : "text-charcoal-400 hover:bg-white/5 hover:text-white"
            )}>
                <Icon className={cn("w-5 h-5", active ? "text-black" : "group-hover:scale-110 transition-transform")} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{label}</span>
            </div>
        </Link>
    )
}

const AdminLayoutContent = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()
    const { data: session, status } = useSession()
    const router = useRouter()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    // Simplified role guard for demonstration
    // if (status === 'authenticated' && session?.user?.role !== 'ADMIN') {
    //     router.push('/')
    //     return null
    // }

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
        { icon: Box, label: 'Products', href: '/products' },
        { icon: ShoppingBag, label: 'Orders', href: '/orders' },
        { icon: Users, label: 'Customers', href: '/customers' },
        { icon: Package, label: 'Inventory', href: '/inventory' },
        { icon: Ticket, label: 'Coupons', href: '/coupons' },
        { icon: Star, label: 'Reviews', href: '/reviews' },
        { icon: LineChart, label: 'Analytics', href: '/analytics' },
        { icon: Settings, label: 'Settings', href: '/settings' },
    ]

    return (
        <div className="flex min-h-screen bg-[#0A0A0A] text-white overflow-hidden">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex flex-col w-[300px] border-r border-white/5 bg-[#141414] p-8 space-y-12">
                <div className="flex items-center space-x-3 px-2">
                    <div className="w-10 h-10 bg-brand-500 rounded-2xl flex items-center justify-center">
                        <span className="text-black font-black text-xl">A</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-black tracking-[0.4em] uppercase">Akela</span>
                        <span className="text-[8px] font-bold text-brand-500 uppercase tracking-widest">Admin Nexus</span>
                    </div>
                </div>

                <nav className="flex-1 space-y-2">
                    {menuItems.map((item) => (
                        <SidebarItem
                            key={item.href}
                            {...item}
                            active={pathname.startsWith(item.href)}
                        />
                    ))}
                </nav>

                <div className="pt-8 border-t border-white/5">
                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="flex items-center space-x-4 px-6 py-4 rounded-2xl text-charcoal-400 hover:bg-red-500/10 hover:text-red-500 transition-all w-full group"
                    >
                        <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Terminate Session</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Bar */}
                <header className="h-24 border-b border-white/5 bg-[#141414]/50 backdrop-blur-3xl flex items-center justify-between px-8 lg:px-12 z-40">
                    <div className="flex items-center space-x-8 flex-1">
                        <button
                            className="lg:hidden p-3 bg-white/5 rounded-xl"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        <div className="relative max-w-md w-full hidden md:block group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-500 group-focus-within:text-brand-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Scan Global Node..."
                                className="w-full h-14 bg-white/5 border border-white/5 rounded-[1.5rem] pl-14 pr-6 text-sm font-display focus:ring-2 focus:ring-brand-500 transition-all outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        <button className="relative p-3 bg-white/5 rounded-xl hover:bg-brand-500 hover:text-black transition-all group">
                            <Bell className="w-5 h-5 group-hover:scale-110" />
                            <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#141414]" />
                        </button>

                        <div className="flex items-center space-x-4 pl-6 border-l border-white/5 group cursor-pointer">
                            <div className="flex flex-col text-right hidden sm:block">
                                <span className="text-xs font-black uppercase tracking-widest leading-none mb-1">Artisan Admin</span>
                                <span className="text-[8px] font-bold text-brand-500 uppercase tracking-[0.2em]">Verified Secure</span>
                            </div>
                            <div className="w-12 h-12 bg-charcoal-800 rounded-2xl overflow-hidden border-2 border-white/5 group-hover:border-brand-500 transition-all">
                                <img
                                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
                                    alt="Admin"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Scroll Area */}
                <main className="flex-1 overflow-y-auto p-8 lg:p-12 no-scrollbar">
                    {children}
                </main>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] lg:hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 h-full w-[300px] bg-[#141414] z-[101] p-8 flex flex-col lg:hidden"
                        >
                            <div className="flex items-center justify-between mb-12">
                                <span className="font-display font-black text-2xl tracking-tighter">AKELA.</span>
                                <button onClick={() => setIsMobileMenuOpen(false)}><X className="w-6 h-6" /></button>
                            </div>
                            <nav className="flex-1 space-y-2">
                                {menuItems.map((item) => (
                                    <SidebarItem
                                        key={item.href}
                                        {...item}
                                        active={pathname.startsWith(item.href)}
                                    />
                                ))}
                            </nav>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ')

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <AdminLayoutContent>
                {children}
            </AdminLayoutContent>
        </SessionProvider>
    )
}
