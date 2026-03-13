'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Search,
    Heart,
    ShoppingBag,
    User,
    Menu,
    X,
    Sparkles,
    ChevronRight,
    ArrowRight
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCart } from '@/hooks/useCart'
import { useWishlist } from '@/hooks/useWishlist'
import { useUIStore } from '@/store/uiStore'
import { useSession } from 'next-auth/react'

const navLinks = [
    { name: 'Collections', href: '/products' },
    { name: 'Sunglasses', href: '/products?category=SUNGLASSES' },
    { name: 'Eyeglasses', href: '/products?category=EYEGLASSES' },
    {
        name: 'Virtual Try-On',
        href: '/virtual-tryon',
        isSpecial: true
    },
]

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const { data: session } = useSession()
    const { totalItems, toggleCart } = useCart()
    const { count: wishlistCount } = useWishlist()
    const { openSearch, mobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 40)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 w-full z-50 transition-all duration-500",
                isScrolled
                    ? "bg-white/70 backdrop-blur-2xl border-b border-charcoal-100/50 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.04)]"
                    : "bg-transparent py-6"
            )}
        >
            <div className="container-app flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex flex-col group">
                    <span className="text-2xl font-display font-medium tracking-[0.3em] text-charcoal-900 leading-none transition-transform group-hover:scale-105">
                        AKELA
                    </span>
                    <span className="text-[8px] tracking-[0.4em] font-sans text-brand-600 uppercase -mt-1 pl-1 font-black">
                        EYEWEAR
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center space-x-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "group relative flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all",
                                link.isSpecial
                                    ? "text-brand-600 bg-brand-50 px-4 py-2 rounded-full border border-brand-100 hover:bg-brand-500 hover:text-black hover:border-brand-500 hover:scale-105"
                                    : "text-charcoal-500 hover:text-charcoal-900"
                            )}
                        >
                            {link.isSpecial && <Sparkles className="w-3.5 h-3.5 animate-pulse" />}
                            <span>{link.name}</span>
                            {!link.isSpecial && (
                                <motion.div
                                    className="absolute -bottom-1 left-0 h-[1.5px] bg-brand-500 w-0 group-hover:w-full transition-all duration-300"
                                />
                            )}
                        </Link>
                    ))}
                </div>

                {/* Right Icons */}
                <div className="flex items-center space-x-4 md:space-x-6">
                    <button
                        onClick={openSearch}
                        className="p-2 text-charcoal-700 hover:text-brand-600 transition-all hover:scale-110 md:block hidden"
                    >
                        <Search className="w-5 h-5" />
                    </button>

                    <Link href="/wishlist" className="relative p-2 text-charcoal-700 hover:text-brand-600 transition-all hover:scale-110">
                        <Heart className="w-5 h-5" />
                        <AnimatePresence>
                            {wishlistCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-600 text-[9px] font-black text-white shadow-lg shadow-brand-100"
                                >
                                    {wishlistCount}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </Link>

                    <button
                        onClick={toggleCart}
                        className="relative p-2 text-charcoal-700 hover:text-brand-600 transition-all hover:scale-110"
                    >
                        <ShoppingBag className="w-5 h-5" />
                        <AnimatePresence>
                            {totalItems > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-charcoal-900 text-[9px] font-black text-white shadow-lg shadow-charcoal-200"
                                >
                                    {totalItems}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>

                    {session ? (
                        <Link href="/account" className="hidden md:flex items-center space-x-3 p-1.5 pr-4 bg-charcoal-50 hover:bg-brand-50 rounded-full transition-all border border-charcoal-100 group">
                            <div className="w-8 h-8 rounded-full bg-charcoal-900 text-brand-500 flex items-center justify-center text-xs font-black shadow-lg">
                                {session.user?.name?.charAt(0) || <User className="w-4 h-4" />}
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-widest text-charcoal-900 group-hover:text-brand-600">Dashboard</span>
                        </Link>
                    ) : (
                        <Link href="/login" className="p-2 text-charcoal-700 hover:text-brand-600 transition-all hover:scale-110 md:block hidden">
                            <User className="w-5 h-5" />
                        </Link>
                    )}

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden p-2 text-charcoal-700 bg-charcoal-50 rounded-xl hover:bg-brand-50 transition-colors"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="fixed inset-0 top-[70px] bg-white z-40 md:hidden overflow-y-auto px-6 py-12"
                    >
                        <div className="flex flex-col space-y-10">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={closeMobileMenu}
                                        className="group flex justify-between items-center text-5xl font-display font-bold text-charcoal-900 border-b border-charcoal-50 pb-6 uppercase italic tracking-tighter"
                                    >
                                        <span className="flex items-center">
                                            {link.name}
                                            {link.isSpecial && <Sparkles className="w-6 h-6 ml-4 text-brand-500" />}
                                        </span>
                                        <ArrowRight className="w-8 h-8 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-brand-500" />
                                    </Link>
                                </motion.div>
                            ))}

                            <div className="pt-10 flex flex-col space-y-6">
                                <Link
                                    href={session ? "/account" : "/login"}
                                    onClick={closeMobileMenu}
                                    className="flex items-center justify-between p-6 bg-charcoal-50 rounded-3xl"
                                >
                                    <div className="flex items-center space-x-4">
                                        <User className="w-6 h-6 text-brand-600" />
                                        <span className="text-lg font-black uppercase tracking-widest text-charcoal-900">{session ? 'My Identity' : 'Secure Login'}</span>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-charcoal-300" />
                                </Link>
                                <button
                                    onClick={() => { closeMobileMenu(); openSearch(); }}
                                    className="flex items-center justify-between p-6 bg-charcoal-900 text-white rounded-3xl shadow-2xl"
                                >
                                    <div className="flex items-center space-x-4">
                                        <Search className="w-6 h-6 text-brand-500" />
                                        <span className="text-lg font-black uppercase tracking-widest">Global Search</span>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-charcoal-700" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

export default Navbar
