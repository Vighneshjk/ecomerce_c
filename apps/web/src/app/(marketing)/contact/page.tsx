'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, MessageCircle, Send, Sparkles, Instagram, Facebook, Twitter, ShieldCheck, Globe, Clock, Box, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Divider } from '@/components/ui/Divider'

const ContactPage = () => {
    const [sent, setSent] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSent(true)
        setTimeout(() => setSent(false), 5000)
    }

    return (
        <div className="bg-[#FCFBF8] min-h-screen pt-32 pb-40 overflow-hidden">
            <div className="container-app relative">
                {/* Heading */}
                <div className="flex flex-col items-center text-center space-y-6 mb-24 max-w-4xl mx-auto">
                    <div className="flex items-center space-x-3 text-brand-600 font-black uppercase tracking-[0.4em] text-[10px]">
                        <div className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse" />
                        <span>Global Concierge Node</span>
                    </div>
                    <h1 className="text-6xl md:text-[10rem] font-display font-semibold text-charcoal-900 tracking-tighter leading-none italic uppercase">
                        CONTACT <br /><span className="text-brand-500 lowercase">nexus.</span>
                    </h1>
                    <p className="text-2xl text-charcoal-500 font-light italic leading-relaxed max-w-2xl px-4">
                        Face-to-face with our artisans. Broadcast your inquiry to our global studio.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-start">
                    {/* Contact Info (Left) */}
                    <div className="lg:col-span-5 space-y-12">
                        <div className="space-y-8 bg-charcoal-900 text-white p-12 lg:p-16 rounded-[4rem] shadow-2xl shadow-charcoal-900/50 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-full h-[50%] bg-gradient-to-b from-white/10 to-transparent z-0 pointer-events-none" />
                            <div className="absolute inset-0 bg-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                            <div className="relative z-10 space-y-12">
                                <div className="space-y-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-14 h-14 bg-brand-500 text-black rounded-[1.5rem] flex items-center justify-center shadow-xl shadow-brand-100 transform -rotate-12 group-hover:rotate-0 transition-transform">
                                            <MessageCircle className="w-7 h-7" />
                                        </div>
                                        <h3 className="text-3xl font-display font-semibold tracking-tight uppercase tracking-widest italic leading-none">TRANSMIT <span className="text-brand-500">DIRECT.</span></h3>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="flex items-start space-x-6 group/info cursor-pointer">
                                            <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-brand-500 group-hover/info:bg-brand-500 group-hover/info:text-black transition-all"><Mail className="w-5 h-5" /></div>
                                            <div className="space-y-1">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-charcoal-400 block">LENS BROADCAST</span>
                                                <p className="text-xl font-display font-bold text-white italic">concierge@akelaeyewear.com</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-6 group/info cursor-pointer">
                                            <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-brand-500 group-hover/info:bg-brand-500 group-hover/info:text-black transition-all"><Phone className="w-5 h-5" /></div>
                                            <div className="space-y-1">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-charcoal-400 block">VOICE NODE</span>
                                                <p className="text-xl font-display font-bold text-white italic">+91 1800-AKELA-EYE</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Divider className="opacity-10" />

                                <div className="space-y-6">
                                    <div className="flex items-center space-x-4">
                                        <Globe className="w-10 h-10 text-brand-500" />
                                        <h3 className="text-2xl font-display font-semibold tracking-tight uppercase tracking-widest italic leading-none">ARTISAN <span className="text-white">COORDINATES.</span></h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-charcoal-400 block">STUDIO MUMBAI</span>
                                            <p className="text-sm font-bold text-charcoal-200 leading-relaxed italic">
                                                402, Elite Heights, Pali Hill, <br /> Bandra West, Mumbai 400050.
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-charcoal-400 block">LENS HOURS</span>
                                            <div className="flex items-center space-x-2 text-brand-500 text-sm font-black uppercase">
                                                <Clock className="w-4 h-4" />
                                                <span>10:00 - 20:00 IST</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex space-x-6 pt-4">
                                    {[Instagram, Facebook, Twitter].map((Icon, i) => (
                                        <button key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5 text-charcoal-400 hover:bg-brand-500 hover:text-black hover:border-brand-500 transition-all transform active:scale-95 group/social shadow-xl">
                                            <Icon className="w-5 h-5 group-hover/social:scale-125 transition-transform" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="p-12 bg-white rounded-[4rem] border border-charcoal-100 shadow-xl shadow-brand-100/10 space-y-6 relative group overflow-hidden">
                            <div className="absolute inset-0 bg-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                            <div className="flex items-center space-x-4 relative z-10">
                                <div className="w-16 h-16 bg-charcoal-900 text-brand-500 rounded-[2rem] flex items-center justify-center shadow-2xl">
                                    <ShieldCheck className="w-10 h-10" />
                                </div>
                                <h4 className="text-2xl font-display font-black uppercase tracking-widest text-charcoal-900 italic">SYSTEM SECURITY</h4>
                            </div>
                            <p className="text-sm text-charcoal-500 font-medium italic leading-relaxed relative z-10">All broadcasts are encrypted with 256-bit visionary protocol. Our studio concierge typically resolves links within 4-18 hours.</p>
                        </div>
                    </div>

                    {/* Contact Form (Right) */}
                    <div className="lg:col-span-7">
                        <form onSubmit={handleSubmit} className="bg-white p-12 lg:p-20 rounded-[4.5rem] border border-charcoal-50 shadow-[0_40px_100px_rgba(0,0,0,0.05)] space-y-12">
                            <AnimatePresence mode="wait">
                                {!sent ? (
                                    <motion.div
                                        key="form"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.05 }}
                                        className="space-y-10"
                                    >
                                        <div className="space-y-4">
                                            <h2 className="text-4xl lg:text-5xl font-display font-semibold text-charcoal-900 tracking-tight leading-none uppercase tracking-widest italic">
                                                THE <span className="text-brand-500 lowercase underline decoration-charcoal-100 underline-offset-8">inquiry.</span>
                                            </h2>
                                            <p className="text-lg text-charcoal-500 font-light italic">Refine your vision for us by filling the parameters below.</p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <Input label="Your Identity" placeholder="Full Name" className="h-20 rounded-[2rem] px-8 text-lg font-display" required />
                                            <Input label="Return Link" placeholder="email@address.com" className="h-20 rounded-[2rem] px-8 text-lg font-display" required />
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-charcoal-400 pl-4">Broadcast Subject</label>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                {['Support', 'Partnership', 'Media', 'Feedback'].map((s) => (
                                                    <button
                                                        key={s}
                                                        type="button"
                                                        className="h-14 rounded-2xl border-2 border-charcoal-50 text-[10px] font-black uppercase tracking-widest hover:border-brand-500 hover:bg-brand-50 transition-all text-charcoal-600 hover:text-charcoal-900"
                                                    >
                                                        {s}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-charcoal-400 pl-4">Visionary Notes</label>
                                            <textarea
                                                className="w-full min-h-[200px] p-8 bg-[#FCFBF8] border-2 border-charcoal-50 rounded-[2.5rem] text-lg font-display focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all placeholder:text-charcoal-300 italic"
                                                placeholder="Share your perspective with us..."
                                                required
                                            />
                                        </div>

                                        <Button type="submit" size="lg" className="h-20 w-full rounded-[2.5rem] bg-charcoal-900 text-white hover:bg-brand-500 shadow-2xl relative group overflow-hidden overflow-hidden">
                                            <span className="relative z-10 flex items-center justify-center space-x-4 text-xl font-bold uppercase tracking-widest">
                                                <span>Transmit Vision</span>
                                                <Send className="w-6 h-6 transform group-hover:translate-x-2 group-hover:-translate-y-2 transition-all" />
                                            </span>
                                            <div className="absolute inset-x-0 inset-y-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                                        </Button>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center justify-center py-20 text-center space-y-10"
                                    >
                                        <div className="relative">
                                            <motion.div
                                                initial={{ rotate: -45 }}
                                                animate={{ rotate: 0 }}
                                                className="w-40 h-40 bg-brand-500 text-black rounded-full flex items-center justify-center shadow-2xl shadow-brand-100"
                                            >
                                                <ShieldCheck className="w-20 h-20 stroke-[3]" />
                                            </motion.div>
                                            <motion.div
                                                initial={{ opacity: 0, scale: 1 }}
                                                animate={{ opacity: 0.5, scale: 1.5 }}
                                                transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
                                                className="absolute inset-0 bg-brand-500 rounded-full blur-3xl"
                                            />
                                        </div>
                                        <div className="space-y-4">
                                            <h2 className="text-5xl font-display font-semibold text-charcoal-900 tracking-tighter uppercase italic">SUCCESSFULLY <br /><span className="text-brand-500">broadcast.</span></h2>
                                            <p className="text-xl text-charcoal-500 font-light italic leading-relaxed">Our artisans are now reviewing your frequency. We will link back within 12 hours.</p>
                                        </div>
                                        <Button onClick={() => setSent(false)} variant="outline" className="h-16 px-12 rounded-[2rem] border-2 font-black uppercase tracking-widest italic group">
                                            <ArrowRight className="w-5 h-5 mr-3 rotate-180 group-hover:-translate-x-2 transition-transform" />
                                            Broadcast New Frequency
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                    </div>
                </div>
            </div>

            {/* Background Text Element */}
            <div className="absolute bottom-10 left-0 w-full overflow-hidden whitespace-nowrap opacity-[0.02] pointer-events-none select-none">
                <span className="text-[15rem] font-display font-black text-charcoal-900 uppercase tracking-tighter italic mr-20">AKELA EYEWEAR</span>
                <span className="text-[15rem] font-display font-black text-charcoal-900 uppercase tracking-tighter italic mr-20">AKELA EYEWEAR</span>
            </div>
        </div>
    )
}

export default ContactPage
