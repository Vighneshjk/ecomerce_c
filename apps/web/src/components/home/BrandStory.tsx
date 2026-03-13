'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Microscope, Wind, Shield } from 'lucide-react'

const BrandStory = () => {
    return (
        <section className="py-32 bg-white overflow-hidden">
            <div className="container-app grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative aspect-square rounded-[4rem] bg-charcoal-50 overflow-hidden group shadow-2xl"
                >
                    <img
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800"
                        alt="Artisan Craftsmanship"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-12 left-12 text-white">
                        <span className="text-xs uppercase tracking-[0.4em] text-brand-500 mb-2 block">Akela Studio</span>
                        <h3 className="text-4xl font-display font-bold italic tracking-tighter leading-none">THE CRAFT <br />BEHIND.</h3>
                    </div>
                </motion.div>

                <div className="space-y-12">
                    <div className="space-y-6">
                        <span className="text-xs font-black uppercase tracking-[0.4em] text-brand-600">Calibration & Legacy</span>
                        <h2 className="text-6xl lg:text-8xl font-display font-medium text-charcoal-900 tracking-tighter leading-none">
                            AN EYE FOR <br /><span className="text-brand-500 italic">precision.</span>
                        </h2>
                        <p className="text-xl text-charcoal-500 font-light leading-relaxed">
                            Founded on the belief that vision is human identity, we blend ancient artisanal techniques with the frontier of facial tracking technology.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { icon: Microscope, title: 'Biotechnic Fit', desc: '468 Neural tracking points for sub-millimeter comfort.' },
                            { icon: Wind, title: 'Aura Weight', desc: 'Aerospace titanium structures that feel ethereal.' },
                            { icon: Shield, title: 'Calibrated Glass', desc: 'Refractive index matched for architectural clarity.' },
                            { icon: Sparkles, title: 'Artisan Finish', desc: 'Hand-polished in the studio for distinct character.' }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-6 border border-charcoal-100 rounded-3xl hover:bg-brand-50/20 transition-all group"
                            >
                                <item.icon className="w-8 h-8 text-brand-500 mb-4 group-hover:rotate-12 transition-transform" />
                                <h4 className="text-lg font-display font-bold text-charcoal-900 mb-2 italic uppercase tracking-tighter">{item.title}</h4>
                                <p className="text-sm text-charcoal-400 font-medium leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BrandStory
