'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const HeroSection = () => {
    const sectionRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], [0, 400])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

    const headline = "SEE THE WORLD DIFFERENTLY".split(" ")

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
        }),
    }

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 40,
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 100,
            },
        },
    }

    return (
        <section
            ref={sectionRef}
            className="relative h-[100svh] w-full bg-[#0d0d0d] overflow-hidden flex items-center pt-20"
        >
            {/* Noise Texture Overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03] mix-blend-overlay">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <filter id="noiseFilter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                </svg>
            </div>

            {/* Background Gradient */}
            <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-bl from-brand-900/20 via-transparent to-transparent z-0" />

            <div className="container-app relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <div className="space-y-8 max-w-2xl">
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-wrap"
                    >
                        {headline.map((word, idx) => (
                            <motion.span
                                key={idx}
                                variants={child}
                                className="text-6xl md:text-8xl lg:text-9xl font-display font-semibold text-brand-50 mr-4 tracking-tighter"
                            >
                                {word}
                            </motion.span>
                        ))}
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="text-xl md:text-2xl text-charcoal-400 font-light max-w-md"
                    >
                        Precision crafted eyewear for every face. Luxury aesthetics meets visionary technology.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.6 }}
                        className="flex flex-wrap gap-4 pt-4"
                    >
                        <Button asChild size="lg" className="h-16 px-10 text-lg bg-brand-500 hover:bg-brand-600 transition-all duration-300 rounded-none">
                            <Link href="/products">
                                Shop Collection
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant="ghost"
                            size="lg"
                            className="h-16 px-10 text-lg text-brand-50 border border-brand-50/20 hover:bg-brand-50/10 transition-all duration-300 rounded-none group"
                        >
                            <Link href="/tryon">
                                <Sparkles className="mr-2 w-5 h-5 text-brand-400 group-hover:rotate-12 transition-transform" />
                                Try On Virtually
                            </Link>
                        </Button>
                    </motion.div>
                </div>

                {/* Floating Mockup (Parallax) */}
                <motion.div
                    style={{ y, opacity }}
                    className="relative hidden lg:flex justify-end pr-10"
                >
                    <div className="relative w-[500px] h-[400px]">
                        {/* Eyewear Image Placeholder */}
                        <div className="absolute inset-0 bg-[#1a1a1a] rounded-3xl overflow-hidden border border-white/5 shadow-2xl backdrop-blur-3xl group">
                            <img
                                src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800"
                                alt="Akela Eyewear Hero"
                                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-[2s]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-6 text-white">
                                <span className="text-xs uppercase tracking-[0.3em] text-brand-400">Limited Edition</span>
                                <h3 className="text-xl font-display mt-1">AVIATOR CLASSIC NOIR</h3>
                            </div>
                        </div>
                        {/* Decorative Elements */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute -top-10 -right-10 w-32 h-32 border-2 border-brand-500/20 rounded-full border-dashed"
                        />
                        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-brand-500/10 blur-3xl rounded-full" />
                    </div>
                </motion.div>
            </div>

            {/* Bottom Stepper (Visual only) */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center space-x-4 z-20">
                <span className="text-[10px] text-brand-500 font-bold tracking-widest uppercase">Explore</span>
                <div className="w-20 h-[1px] bg-white/20 relative">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute h-full bg-brand-500"
                    />
                </div>
                <span className="text-[10px] text-charcoal-500 font-medium tracking-widest uppercase">Collection 2024</span>
            </div>
        </section>
    )
}

export default HeroSection
