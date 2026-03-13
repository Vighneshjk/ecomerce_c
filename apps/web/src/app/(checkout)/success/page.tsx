'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, ShoppingBag, ArrowRight, Home, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { useCart } from '@/hooks/useCart'

const CheckoutSuccessPage = () => {
    const { clearCart } = useCart()

    useEffect(() => {
        clearCart()
        // Celebrate!
    }, [])

    return (
        <div className="container-app min-h-[60vh] flex flex-col items-center justify-center text-center space-y-12 py-32">
            <div className="relative">
                <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', damping: 10, stiffness: 100, delay: 0.2 }}
                    className="relative z-10 w-32 h-32 bg-brand-500 text-black rounded-full flex items-center justify-center shadow-2xl shadow-brand-100"
                >
                    <CheckCircle2 className="w-16 h-16 stroke-[3]" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0.2, scale: 2 }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
                    className="absolute inset-0 bg-brand-500 rounded-full blur-3xl"
                />
            </div>

            <div className="space-y-6 max-w-2xl">
                <div className="space-y-2">
                    <span className="text-xs font-black text-brand-600 uppercase tracking-widest leading-none">Perspective Unlocked</span>
                    <h1 className="text-6xl md:text-8xl font-display font-semibold text-charcoal-900 tracking-tighter leading-none italic">
                        VISION <br /> <span className="text-brand-500 lowercase">secured.</span>
                    </h1>
                </div>
                <p className="text-xl text-charcoal-500 font-light leading-relaxed italic max-w-lg mx-auto">
                    Your artisan order <span className="text-charcoal-900 font-bold">#AK-{Math.floor(Math.random() * 900000) + 100000}</span> has been broadcast to our studio. Your handcrafted frames are now in production.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
                <Button asChild size="lg" className="h-16 px-12 text-lg font-bold rounded-2xl bg-charcoal-900 text-white shadow-2xl hover:bg-brand-600 transition-all group">
                    <Link href="/account/orders">
                        <span className="relative z-10 flex items-center justify-center space-x-3">
                            <span>Finalize Profile</span>
                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        </span>
                    </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-16 px-12 text-lg font-bold rounded-2xl border-2 border-charcoal-100 group">
                    <Link href="/">
                        <Home className="w-5 h-5 mr-3 text-brand-500 group-hover:scale-110 transition-transform" />
                        Return to Vision
                    </Link>
                </Button>
            </div>

            <div className="pt-20 opacity-30 flex items-center space-x-6 text-[10px] font-black text-charcoal-900 uppercase tracking-[0.4em]">
                <span>Global Visionary Network</span>
                <div className="w-1.5 h-1.5 bg-brand-500 rounded-full" />
                <span>Akela Craft Studio</span>
                <div className="w-1.5 h-1.5 bg-brand-500 rounded-full" />
                <span>Artisan Logistics</span>
            </div>
        </div>
    )
}

export default CheckoutSuccessPage
