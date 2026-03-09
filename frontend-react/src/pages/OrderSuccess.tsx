import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Truck, Package, Mail, ArrowRight } from 'lucide-react';

const OrderSuccess: React.FC = () => {
    return (
        <div className="bg-white min-h-screen pt-24 pb-20 flex items-center justify-center overflow-hidden">
            <div className="max-w-4xl mx-auto px-6 text-center">
                {/* Success Icon Animation */}
                <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", damping: 10, stiffness: 100 }}
                    className="inline-flex items-center justify-center w-32 h-32 bg-green-50 rounded-full mb-12 text-green-500 shadow-2xl shadow-green-100 border border-green-100"
                >
                    <CheckCircle size={64} strokeWidth={1.5} />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-6xl md:text-8xl font-black tracking-tighter text-premium-black mb-8 pt-6"
                >
                    Order <span className="text-gray-300 italic">Confirmed</span>.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl text-gray-400 font-light mb-16 italic"
                >
                    "Your choice in vision is now being crafted with the utmost precision. Expect excellence."
                </motion.p>

                {/* Info Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-soft-gray p-8 rounded-[2rem] border border-gray-100 flex flex-col items-center gap-4 group hover:bg-white transition-all shadow-sm shadow-gray-100"
                    >
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-premium-black shadow-sm group-hover:bg-premium-black group-hover:text-white transition-all">
                            <Package size={20} />
                        </div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-premium-black">Order ID</h4>
                        <span className="font-mono text-gray-400 text-sm">AKL-774411-VJ</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-soft-gray p-8 rounded-[2rem] border border-gray-100 flex flex-col items-center gap-4 group hover:bg-white transition-all shadow-sm shadow-gray-100"
                    >
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-premium-black shadow-sm group-hover:bg-premium-black group-hover:text-white transition-all">
                            <Truck size={20} />
                        </div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-premium-black">Shipping Method</h4>
                        <span className="text-gray-400 text-sm italic">Global Express (Air)</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="bg-soft-gray p-8 rounded-[2rem] border border-gray-100 flex flex-col items-center gap-4 group hover:bg-white transition-all shadow-sm shadow-gray-100"
                    >
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-premium-black shadow-sm group-hover:bg-premium-black group-hover:text-white transition-all">
                            <Mail size={20} />
                        </div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-premium-black">Update Email</h4>
                        <span className="text-gray-400 text-sm italic italic">concierge@akila.vision</span>
                    </motion.div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link to="/products" className="btn-primary flex items-center gap-3 px-12 group">
                            Explore New Collection <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                    <Link to="/" className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 hover:text-black transition-colors">
                        Return to Vision Center
                    </Link>
                </div>
            </div>

            {/* Background Decorative */}
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-gray-50 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-gray-50 rounded-full blur-3xl opacity-50"></div>
        </div>
    );
};

export default OrderSuccess;
