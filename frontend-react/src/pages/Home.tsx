import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Eye, RefreshCw, ShoppingBag, Star, Quote } from 'lucide-react';

const Home: React.FC = () => {
    return (
        <div className="relative bg-akeela-cream overflow-hidden min-h-screen">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 md:pt-48 md:pb-32">
                <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-akeela-black leading-tight mb-8">
                            Frames That <br />
                            <span className="text-akeela-gold italic font-normal">Find You</span>.
                        </h1>
                        <p className="text-xl text-akeela-gray max-w-lg mb-12 font-light leading-relaxed">
                            Experience the intersection of high-fashion editorial aesthetics and cutting-edge AR technology. Try on our curated collection in real-time.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link to="/products" className="btn-accent flex items-center gap-3">
                                    Try On Virtually <Eye size={18} />
                                </Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link to="/products" className="btn-secondary flex items-center gap-3">
                                    Shop Collection <ArrowRight size={18} />
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        <div className="absolute -inset-20 bg-akeela-gold/5 blur-[100px] rounded-full"></div>
                        <img
                            src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80"
                            alt="Premium Sunglasses"
                            className="relative w-full aspect-square object-cover rounded-[4rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 rotate-3"
                        />
                        {/* Floating silhouette mentioned in prompt */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="absolute -top-10 -right-10 w-48 h-48 opacity-10 pointer-events-none"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-akeela-black">
                                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                            </svg>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Featured Collections Row */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-16">
                        <div>
                            <span className="text-akeela-gold font-bold uppercase tracking-widest text-xs mb-4 block">Curated</span>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-akeela-black">The Collections</h2>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-4 gap-8">
                        {['Sunglasses', 'Eyeglasses', 'Blue Light', 'Sports'].map((cat, i) => (
                            <motion.div
                                key={cat}
                                whileHover={{ y: -10 }}
                                className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer"
                            >
                                <img
                                    src={`https://images.unsplash.com/photo-${1511499767150 + i}?auto=format&fit=crop&q=80`}
                                    alt={cat}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                                />
                                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
                                    <h3 className="text-xl font-bold uppercase tracking-widest">{cat}</h3>
                                    <span className="text-xs text-white/60 group-hover:text-akeela-gold transition-colors">Explore Category →</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-32 bg-akeela-cream overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-6xl font-black mb-20 text-akeela-black uppercase tracking-tighter">How It <span className="text-akeela-gold">Works</span></h2>
                    <div className="grid md:grid-cols-3 gap-20 relative">
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-akeela-black/5 -translate-y-1/2"></div>
                        {[
                            { step: '01', title: 'Browse', desc: 'Select from our elite collection of engineered frames.', icon: ShoppingBag },
                            { step: '02', title: 'Try On', desc: 'Use our real-time AR vision to find your perfect match.', icon: Eye },
                            { step: '03', title: 'Order', desc: 'Complimentary shipping and premium vision delivered.', icon: RefreshCw },
                        ].map((item, i) => (
                            <motion.div
                                key={item.step}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="relative bg-white p-12 rounded-[3.5rem] shadow-sm hover:shadow-2xl transition-all group"
                            >
                                <div className="w-16 h-16 bg-akeela-black rounded-2xl flex items-center justify-center text-white mx-auto mb-8 group-hover:bg-akeela-gold transition-colors">
                                    <item.icon size={28} />
                                </div>
                                <h3 className="text-2xl font-black text-akeela-black mb-4 uppercase tracking-tighter">{item.title}</h3>
                                <p className="text-akeela-gray font-light mb-4">{item.desc}</p>
                                <span className="text-5xl font-black text-akeela-black/5 absolute top-6 right-10 group-hover:text-akeela-gold/10 transition-colors">{item.step}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-32 bg-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <Quote size={64} className="mx-auto mb-12 text-akeela-gold/20" />
                    <div className="flex justify-center gap-2 mb-8">
                        {[1, 2, 3, 4, 5].map(s => <Star key={s} size={20} fill="#C9A84C" stroke="none" />)}
                    </div>
                    <motion.blockquote
                        className="text-3xl md:text-4xl font-light italic text-akeela-black leading-snug mb-12"
                    >
                        "Akeela has completely redefined how I buy eyewear. The virtual try-on is scarily accurate, and the frame quality is unmatched in the luxury market."
                    </motion.blockquote>
                    <div>
                        <span className="font-black uppercase tracking-widest text-sm text-akeela-black">Julian Rossi</span>
                        <p className="text-xs text-akeela-gray uppercase tracking-widest mt-1">Creative Director, Milan</p>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="py-24 bg-akeela-black text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-akeela-gold rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-akeela-gold rounded-full blur-[120px]"></div>
                </div>
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl font-bold mb-6">Join the Akeela Society</h2>
                    <p className="text-white/60 mb-12 font-light">Exclusive access to new collections and visionary insights.</p>
                    <form className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 bg-white/5 border border-white/10 rounded-full px-8 py-4 focus:bg-white/10 outline-none transition-all"
                        />
                        <button className="btn-accent whitespace-nowrap">Subscribe Now</button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Home;
