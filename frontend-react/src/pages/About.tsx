import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Shield, Award, Sparkles } from 'lucide-react';

const About: React.FC = () => {
    return (
        <div className="bg-white min-h-screen pt-24 pb-20 overflow-hidden">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-24">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-6 block"
                >
                    Our Story
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-6xl md:text-8xl font-black tracking-tighter text-premium-black mb-8"
                >
                    Crafting <span className="text-gray-300">Perspective</span>.
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="max-w-2xl mx-auto text-xl text-gray-500 font-light leading-relaxed"
                >
                    Founded in 2024, Akila was born from a simple obsession: to blend high-fashion aesthetics with cutting-edge optical technology.
                </motion.p>
            </section>

            {/* Philosophy Section */}
            <section className="bg-soft-gray py-32 mb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80"
                                alt="Craftsmanship"
                                className="w-full h-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        </motion.div>

                        <div className="space-y-12">
                            <div>
                                <h2 className="text-4xl font-bold text-premium-black mb-6">Italian Engineered. Visionary Design.</h2>
                                <p className="text-gray-500 text-lg leading-relaxed font-light">
                                    Every frame in our collection is meticulously handcrafted using premium Italian acetate and aerospace-grade titanium. We don't just make glasses; we engineer tools for modern visionaries.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-premium-black">
                                        <Shield size={24} />
                                    </div>
                                    <h3 className="font-bold uppercase tracking-widest text-sm text-premium-black">Unrivaled Quality</h3>
                                    <p className="text-gray-400 text-sm italic">Tested to withstand the rigors of a visionary lifestyle.</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-premium-black">
                                        <Sparkles size={24} />
                                    </div>
                                    <h3 className="font-bold uppercase tracking-widest text-sm text-premium-black">Modern Aesthetic</h3>
                                    <p className="text-gray-400 text-sm italic">Minimalist forms that speak volumes without a word.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                <div className="grid md:grid-cols-3 gap-16">
                    <motion.div
                        whileHover={{ y: -10 }}
                        className="p-10 border border-gray-100 rounded-[2.5rem] hover:shadow-xl transition-all"
                    >
                        <Eye className="mx-auto mb-6 text-gray-300" size={40} />
                        <h4 className="text-xl font-bold mb-4">Vision First</h4>
                        <p className="text-gray-500 font-light">Advanced lens technology that protects and enhances your natural sight.</p>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -10 }}
                        className="p-10 border border-gray-100 rounded-[2.5rem] hover:shadow-xl transition-all bg-premium-black text-white"
                    >
                        <Award className="mx-auto mb-6 text-white/40" size={40} />
                        <h4 className="text-xl font-bold mb-4 text-white">Ethical Craft</h4>
                        <p className="text-white/60 font-light">Sustainably sourced materials and fair-trade manufacturing practices.</p>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -10 }}
                        className="p-10 border border-gray-100 rounded-[2.5rem] hover:shadow-xl transition-all"
                    >
                        <Sparkles className="mx-auto mb-6 text-gray-300" size={40} />
                        <h4 className="text-xl font-bold mb-4">3D Innovation</h4>
                        <p className="text-gray-500 font-light">Leading the digital revolution with our interactive virtual try-on experience.</p>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                <div className="bg-premium-black rounded-[3rem] p-16 md:p-24 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-4xl md:text-6xl font-black mb-10"
                    >
                        Ready to change your <br /> perspective?
                    </motion.h2>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-black px-12 py-5 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
                    >
                        Shop the Collection
                    </motion.button>
                </div>
            </section>
        </div>
    );
};

export default About;
