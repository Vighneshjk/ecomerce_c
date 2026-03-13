'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Camera, FaceIcon, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

const TryOnBanner = () => {
    return (
        <section className="py-24 bg-charcoal-900 relative overflow-hidden">
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2">
                    <filter id="waveFilter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.1" numOctaves="4" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#waveFilter)" />
                </svg>
            </div>

            <div className="container-app relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left: Text Content */}
                <div className="space-y-10 max-w-xl">
                    <div className="space-y-4">
                        <div className="inline-flex items-center space-x-3 px-4 py-1.5 bg-brand-500/10 border border-brand-500/20 rounded-full text-brand-400 font-bold text-xs uppercase tracking-widest animate-pulse">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Powered by AI Face Detection</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-display font-semibold text-white tracking-tight leading-[1.05]">
                            FIND YOUR <br />
                            <span className="italic text-brand-400">PERFECT FIT.</span>
                        </h2>
                        <p className="text-xl text-charcoal-400 font-light leading-relaxed">
                            Experience the future of eyewear shopping. Our cutting-edge AI technology maps your face with zero latency to show you exactly how our frames fit your unique profile.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                { title: "3D Face Mapping", icon: <CheckCircle2 className="w-4 h-4 text-brand-500" /> },
                                { title: "Real-time Simulation", icon: <CheckCircle2 className="w-4 h-4 text-brand-500" /> },
                                { title: "Accurate Sizing", icon: <CheckCircle2 className="w-4 h-4 text-brand-500" /> },
                                { title: "Share Your Look", icon: <CheckCircle2 className="w-4 h-4 text-brand-500" /> }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center space-x-3 text-sm font-medium text-white/80">
                                    {item.icon}
                                    <span>{item.title}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-4 pt-6">
                            <Button asChild size="lg" className="h-16 px-10 bg-brand-500 hover:bg-brand-600 rounded-none text-lg">
                                <Link href="/virtual-tryon">
                                    Launch Virtual Try-On
                                    <Camera className="ml-2 w-5 h-5" />
                                </Link>
                            </Button>
                            <Button asChild variant="ghost" size="lg" className="h-16 px-10 text-white border border-white/10 hover:bg-white/5 rounded-none text-lg">
                                <Link href="/how-it-works">Learn More</Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Right: Split Visual Demo */}
                <div className="relative aspect-square w-full max-w-lg mx-auto group">
                    <div className="absolute inset-x-0 inset-y-0 overflow-hidden rounded-3xl border border-white/5 shadow-2xl">
                        {/* Comparison Slider Implementation */}
                        <div className="relative w-full h-full flex">
                            {/* Before Image */}
                            <div className="absolute inset-0">
                                <img
                                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800"
                                    alt="Before Try-On"
                                    className="w-full h-full object-cover grayscale opacity-40"
                                />
                            </div>

                            {/* After Image (Clipped) */}
                            <motion.div
                                initial={{ width: "50%" }}
                                whileInView={{ width: "100%" }}
                                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                                viewport={{ once: true }}
                                className="absolute inset-0 z-10 overflow-hidden border-l-2 border-brand-500 shadow-2xl"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800"
                                    alt="After Try-On"
                                    className="w-[100vw] h-[512px] object-cover"
                                />
                                {/* Overlay Goggles Placeholder */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <motion.div
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 1.5 }}
                                        viewport={{ once: true }}
                                        className="relative w-1/2 h-1/4"
                                    >
                                        <img
                                            src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=600"
                                            alt="Goggles"
                                            className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(184,146,79,0.5)]"
                                        />
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                    {/* Floating HUD Elements */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-10 -right-10 p-5 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl z-20 shadow-2xl"
                    >
                        <div className="flex items-center space-x-3 mb-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Face Detected</span>
                        </div>
                        <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "85%" }}
                                transition={{ duration: 2 }}
                                viewport={{ once: true }}
                                className="h-full bg-brand-500"
                            />
                        </div>
                        <span className="text-[9px] text-charcoal-400 mt-1 block">Matching Score: 0.98</span>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default TryOnBanner
