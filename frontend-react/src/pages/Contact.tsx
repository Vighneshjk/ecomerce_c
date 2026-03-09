import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Instagram, Twitter, Facebook } from 'lucide-react';

const Contact: React.FC = () => {
    return (
        <div className="bg-white min-h-screen pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-24">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black tracking-tighter text-premium-black mb-8 pt-10"
                    >
                        Connect <span className="text-gray-300">With Us</span>.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-400 font-light italic"
                    >
                        "Exceptional vision requires exceptional service. How can we help?"
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-2 gap-20">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-16"
                    >
                        <div className="space-y-10">
                            <div className="flex gap-8 group">
                                <div className="w-16 h-16 bg-soft-gray rounded-[1.5rem] flex items-center justify-center text-premium-black group-hover:bg-premium-black group-hover:text-white transition-all duration-500 shadow-sm shadow-gray-100">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-premium-black mb-1">Email Support</h4>
                                    <p className="text-2xl font-light text-gray-500">concierge@akila.vision</p>
                                </div>
                            </div>

                            <div className="flex gap-8 group">
                                <div className="w-16 h-16 bg-soft-gray rounded-[1.5rem] flex items-center justify-center text-premium-black group-hover:bg-premium-black group-hover:text-white transition-all duration-500 shadow-sm shadow-gray-100">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-premium-black mb-1">Optical Helpline</h4>
                                    <p className="text-2xl font-light text-gray-500">+1 (800) 555-AKILA</p>
                                </div>
                            </div>

                            <div className="flex gap-8 group">
                                <div className="w-16 h-16 bg-soft-gray rounded-[1.5rem] flex items-center justify-center text-premium-black group-hover:bg-premium-black group-hover:text-white transition-all duration-500 shadow-sm shadow-gray-100">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-widest text-premium-black mb-1">Vision Labs</h4>
                                    <p className="text-2xl font-light text-gray-500">77 Visionary Ave, Milan IT</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-10 border-t border-gray-100 flex gap-6">
                            <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-premium-black transition-colors cursor-pointer"><Instagram size={20} /></div>
                            <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-premium-black transition-colors cursor-pointer"><Twitter size={20} /></div>
                            <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-premium-black transition-colors cursor-pointer"><Facebook size={20} /></div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-soft-gray p-10 md:p-16 rounded-[3rem] border border-gray-100 shadow-2xl shadow-gray-100"
                    >
                        <form className="space-y-10">
                            <div className="grid md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <label className="text-xs font-bold uppercase tracking-widest text-premium-black">Full Name</label>
                                    <input type="text" className="w-full bg-white border-none rounded-2xl p-5 text-gray-600 focus:ring-2 focus:ring-premium-black transition-all outline-none" placeholder="Johnathan Doe" />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-xs font-bold uppercase tracking-widest text-premium-black">Email Address</label>
                                    <input type="email" className="w-full bg-white border-none rounded-2xl p-5 text-gray-600 focus:ring-2 focus:ring-premium-black transition-all outline-none" placeholder="john@domain.com" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-xs font-bold uppercase tracking-widest text-premium-black">Subject</label>
                                <select className="w-full bg-white border-none rounded-2xl p-5 text-gray-600 focus:ring-2 focus:ring-premium-black transition-all outline-none">
                                    <option>Order Inquiries</option>
                                    <option>Optical Technical Support</option>
                                    <option>Wholesale Partnerships</option>
                                    <option>Press & Media</option>
                                </select>
                            </div>

                            <div className="space-y-4">
                                <label className="text-xs font-bold uppercase tracking-widest text-premium-black">Your Message</label>
                                <textarea rows={5} className="w-full bg-white border-none rounded-2xl p-5 text-gray-600 focus:ring-2 focus:ring-premium-black transition-all outline-none resize-none" placeholder="Write your visionary thoughts..."></textarea>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full btn-primary flex items-center justify-center gap-4 py-5 shadow-2xl shadow-black/20"
                            >
                                Send Message <Send size={18} />
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
