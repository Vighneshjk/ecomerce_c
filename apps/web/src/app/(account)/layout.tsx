'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { User, ShoppingBag, Heart, Settings, LogOut, ChevronRight, LayoutDashboard, History, ShieldCheck, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { signOut } from 'next-auth/react'

export default function AccountLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()

    const navItems = [
        { id: 'dashboard', name: 'Identity', href: '/account', icon: <User className="w-5 h-5" /> },
        { id: 'orders', name: 'Lens History', href: '/account/orders', icon: <History className="w-5 h-5" /> },
        { id: 'wishlist', name: 'Saved Curations', href: '/wishlist', icon: <Heart className="w-5 h-5" /> },
        { id: 'settings', name: 'Preference Tech', href: '/account/settings', icon: <Settings className="w-5 h-5" /> },
    ]

    return (
        <div className="bg-[#FCFBF8] min-h-screen pt-32 pb-40">
            <div className="container-app">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-start">

                    {/* Sidebar Nav (Left) */}
                    <aside className="lg:col-span-3 lg:sticky lg:top-32 space-y-12 bg-white p-10 rounded-[3rem] border border-charcoal-100 shadow-xl shadow-brand-100/10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />

                        <div className="relative z-10 space-y-10">
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2 text-[10px] font-black text-brand-600 uppercase tracking-widest leading-none">
                                    <ShieldCheck className="w-4 h-4" />
                                    <span>Verified Visionary</span>
                                </div>
                                <h2 className="text-3xl font-display font-semibold tracking-tight uppercase tracking-widest italic leading-none">MY <span className="text-brand-500">AURA.</span></h2>
                            </div>

                            <nav className="flex flex-col space-y-3">
                                {navItems.map((item) => {
                                    const active = pathname === item.href
                                    return (
                                        <Link
                                            key={item.id}
                                            href={item.href}
                                            className={cn(
                                                "flex items-center justify-between p-5 rounded-3xl text-left transition-all group/nav relative overflow-hidden transform active:scale-95",
                                                active
                                                    ? "bg-charcoal-900 text-white shadow-2xl shadow-charcoal-200"
                                                    : "text-charcoal-400 hover:bg-brand-50 hover:text-charcoal-700"
                                            )}
                                        >
                                            <div className="flex items-center space-x-4 relative z-10">
                                                <div className={cn(
                                                    "w-10 h-10 rounded-2xl flex items-center justify-center transition-all",
                                                    active ? "bg-brand-500 text-black" : "bg-charcoal-50 group-hover/nav:bg-white"
                                                )}>
                                                    {item.icon}
                                                </div>
                                                <span className="text-xs font-black uppercase tracking-widest">{item.name}</span>
                                            </div>
                                            <ChevronRight className={cn("w-4 h-4 transition-transform relative z-10", active ? "opacity-100 translate-x-1" : "opacity-0 -translate-x-2 group-hover/nav:opacity-100 group-hover/nav:translate-x-0")} />
                                        </Link>
                                    )
                                })}
                            </nav>

                            <button
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className="w-full flex items-center space-x-4 p-5 rounded-3xl text-red-400 hover:bg-red-50 transition-all font-black uppercase tracking-widest text-xs group/logout"
                            >
                                <div className="w-10 h-10 rounded-2xl bg-red-50 flex items-center justify-center group-hover/logout:bg-white transition-all">
                                    <LogOut className="w-5 h-5" />
                                </div>
                                <span>Deactivate Session</span>
                            </button>
                        </div>
                    </aside>

                    {/* Main Content Area (Right) */}
                    <main className="lg:col-span-9">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    )
}
