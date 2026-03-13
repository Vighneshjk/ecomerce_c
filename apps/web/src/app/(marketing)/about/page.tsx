'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, History as LucideHistory, Heart, ShieldCheck, Microscope, User, Share2, Ruler, Box, Info, Wind, Award, Zap, ShoppingBag, MapPin } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

const AboutPage = () => {

    const milestones = [
        { year: '2020', title: 'The Vision Broadcast', desc: 'Akela was born from a singular obsession: optical perfection for the modern era.' },
        { year: '2021', title: 'Aura-Clear Tech', desc: 'Introduced our proprietary lens coatings that define our signature clarity.' },
        { year: '2022', title: 'Global Node Reach', desc: 'Expanded our artisan studio to ship visionary frames across 45+ countries.' },
        { year: '2024', title: 'Titanium Phase', desc: 'Revolutionizing the industry with hyper-lightweight aerospace materials.' },
    ]

    const values = [
        { title: 'Artisan Precision', desc: 'Every frame is hand-refined in our Indian studio by master opticians with decades of craft.', icon: <Microscope className="w-8 h-8" /> },
        { title: 'Visionary Tech', desc: 'We combine tradition with AI-driven virtual try-on and biometric face fitting.', icon: <Zap className="w-8 h-8" /> },
        { title: 'Hyper-Care', desc: 'Our concierge is here to ensure your focus stays as sharp as our silhouettes.', icon: <ShieldCheck className="w-8 h-8" /> },
    ]

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[90svh] flex items-center justify-center overflow-hidden bg-charcoal-900 pt-20">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=2000"
                        alt="Background Art"
                        className="w-full h-full object-cover opacity-30 grayscale saturate-0 scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/50 via-transparent to-charcoal-900" />
                </div>

                <div className="container-app relative z-10 text-center space-y-12">
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center justify-center space-x-3 text-brand-500 font-black uppercase tracking-[0.4em] text-[10px]"
                        >
                            <div className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse" />
                            <span>Artisan Genesis</span>
                            <div className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse" />
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: 'circOut' }}
                            className="text-[12vw] lg:text-[10rem] font-display font-semibold text-white tracking-tighter leading-none italic uppercase"
                        >
                            THE <span className="text-brand-500">GENESIS.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-2xl text-charcoal-400 font-light max-w-2xl mx-auto italic tracking-tight"
                        >
                            Born in the heart of India. Reimagining what the world sees, and how it sees it.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="flex justify-center"
                    >
                        <div className="w-px h-32 bg-gradient-to-b from-brand-500 to-transparent" />
                    </motion.div>
                </div>

                {/* Floating Badges */}
                <div className="absolute bottom-20 left-10 hidden lg:block">
                    <div className="p-8 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] space-y-4 shadow-2xl">
                        <Award className="w-10 h-10 text-brand-500" />
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-white italic">Visionary Excellence '24</h4>
                    </div>
                </div>
            </section>

            {/* Manifesto */}
            <section className="py-40 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-[0.02] -translate-y-1/2 translate-x-1/2 select-none">
                    <span className="text-[20rem] font-display font-black text-charcoal-900 leading-none">AKELA</span>
                </div>

                <div className="container-app relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div className="space-y-10">
                            <h2 className="text-6xl lg:text-8xl font-display font-semibold text-charcoal-900 tracking-tighter leading-[0.9] uppercase italic">
                                WE DON'T SELL <br /><span className="text-brand-500 lowercase">frames.</span>
                            </h2>
                            <div className="space-y-6">
                                <p className="text-2xl text-charcoal-500 font-light leading-relaxed italic max-w-xl">
                                    We broadcast a perspective. At Akela, we believe that eyewear is the most intimate interface between the person and the planet.
                                </p>
                                <p className="text-lg text-charcoal-700 font-medium leading-relaxed max-w-xl">
                                    Our journey started with a simple frustration: why must artisanal build be a luxury of the elite? We spent 24 months refining our supply chain directly from our production studios in Mumbai to your doorstep. No middlemen. No noise. Just pure visionary craft.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-8 pt-6">
                                {values.map((v, i) => (
                                    <div key={i} className="flex flex-col space-y-3 group">
                                        <div className="text-brand-500 transform group-hover:rotate-12 transition-transform">{v.icon}</div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-charcoal-900">{v.title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl border-[12px] border-charcoal-50 group">
                                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1200" alt="Founders Studio" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]" />
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl -z-1" />
                            <div className="absolute top-10 -left-10 p-10 bg-charcoal-900 text-white rounded-[3rem] shadow-2xl border border-white/5 space-y-4">
                                <Info className="w-10 h-10 text-brand-500" />
                                <div className="space-y-1">
                                    <p className="text-sm font-black italic">Craft Precision Index</p>
                                    <p className="text-4xl font-display font-bold text-white tracking-tighter">99.8%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Milestone Carousel / Timeline */}
            <section className="py-40 bg-charcoal-50/50">
                <div className="container-app">
                    <div className="flex flex-col items-center text-center space-y-16 mb-24">
                        <h2 className="text-5xl lg:text-7xl font-display font-semibold tracking-tight uppercase tracking-widest italic leading-none">THE <span className="text-brand-500">TRAJECTORY.</span></h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-left">
                            {milestones.map((m, i) => (
                                <div key={i} className="space-y-6 relative group">
                                    <div className="text-6xl font-display font-black text-brand-500/20 group-hover:text-brand-500 transition-colors leading-none tracking-tighter">{m.year}</div>
                                    <div className="space-y-2">
                                        <h4 className="text-lg font-black uppercase italic tracking-widest text-charcoal-900 group-hover:text-brand-600 transition-colors">{m.title}</h4>
                                        <p className="text-sm text-charcoal-500 font-medium leading-relaxed italic">{m.desc}</p>
                                    </div>
                                    {i < 3 && <div className="hidden lg:block absolute top-10 left-full w-full h-[2px] bg-gradient-to-r from-brand-500/50 to-transparent translate-x-12" />}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Global Studio Stats */}
            <section className="py-40 bg-white">
                <div className="container-app">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                        {[
                            { label: 'Frames Secured', val: '240K+', icon: <ShoppingBag className="w-6 h-6" /> },
                            { label: 'Global Hubs', val: '45+', icon: <MapPin className="w-6 h-6" /> },
                            { label: 'Artisans', val: '120+', icon: <LucideHistory className="w-6 h-6" /> },
                            { label: 'Vision Score', val: '4.8/5', icon: <Star className="w-6 h-6" /> },
                        ].map((stat, i) => (
                            <div key={i} className="flex flex-col items-center text-center space-y-4 group p-10 bg-white rounded-[3rem] border border-charcoal-50 hover:border-brand-500 transition-all hover:shadow-2xl hover:shadow-brand-100/20">
                                <div className="w-16 h-16 bg-charcoal-50 rounded-[1.5rem] flex items-center justify-center text-brand-600 group-hover:bg-charcoal-900 group-hover:text-brand-500 transition-all transform group-hover:rotate-12 group-hover:scale-110">
                                    {stat.icon}
                                </div>
                                <div className="space-y-1">
                                    <span className="text-5xl font-display font-black text-charcoal-900 tracking-tighter">{stat.val}</span>
                                    <span className="text-[10px] font-black text-charcoal-400 uppercase tracking-widest block">{stat.label}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-40 bg-charcoal-900 overflow-hidden relative group">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-0 w-full h-[50%] bg-gradient-to-b from-white/5 to-transparent z-0 pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-brand-500/5 rounded-full blur-[150px] group-hover:bg-brand-500/10 transition-colors duration-[3s]" />
                </div>

                <div className="container-app relative z-10 text-center space-y-16">
                    <div className="space-y-6">
                        <h2 className="text-7xl lg:text-[10rem] font-display font-semibold text-white tracking-tighter leading-none italic uppercase">JOIN OUR <span className="text-brand-500 lowercase">vision.</span></h2>
                        <p className="text-2xl text-charcoal-400 font-light max-w-2xl mx-auto italic tracking-tight">Our story is just beginning. Experience the perspective that defines our era.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                        <Button asChild size="lg" className="h-20 px-16 text-xl font-bold rounded-[2.5rem] bg-brand-500 text-black hover:bg-white transition-all shadow-2xl relative group/btn overflow-hidden">
                            <Link href="/products">
                                <span className="relative z-10 flex items-center space-x-4">
                                    <span>Explore The Catalog</span>
                                    <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-2 transition-transform" />
                                </span>
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="h-20 px-16 text-xl font-bold rounded-[2.5rem] border-2 border-white/10 text-white hover:bg-white hover:text-black transition-all">
                            <Link href="/account/register">Create Aura Profile</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}

const Star = ({ className }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;

export default AboutPage
