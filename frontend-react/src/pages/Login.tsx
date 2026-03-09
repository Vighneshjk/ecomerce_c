import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, ArrowRight, Eye, EyeOff } from 'lucide-react';

const Login: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Mimic API delay
        setTimeout(() => setIsLoading(false), 2000);
    };

    return (
        <div className="bg-white min-h-screen pt-24 pb-20 flex items-center justify-center">
            <div className="max-w-7xl mx-auto px-4 md:px-8 w-full grid lg:grid-cols-2 gap-20 items-center">

                {/* Left Side: Branding/Visual */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="hidden lg:block relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl"
                >
                    <img
                        src="https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&q=80"
                        alt="Premium Eyewear"
                        className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-16 flex flex-col justify-end">
                        <h2 className="text-4xl font-black text-white tracking-tighter uppercase mb-4 italic">Exclusive Vision.</h2>
                        <p className="text-white/60 text-lg font-light leading-relaxed">"Joining the Akila society grants access to our latest precision optics and personalized optical consulting."</p>
                    </div>
                </motion.div>

                {/* Right Side: Form */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md mx-auto"
                >
                    <div className="mb-12">
                        <h1 className="text-4xl font-black tracking-tighter text-premium-black uppercase mb-4">Welcome Back</h1>
                        <p className="text-gray-400 font-light italic italic">"Sign in to access your curated collection."</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-4">
                            <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-premium-black">Account Email</label>
                            <div className="relative group">
                                <input
                                    type="email"
                                    required
                                    className="w-full bg-soft-gray border border-transparent rounded-2xl p-5 pl-14 outline-none focus:bg-white focus:border-premium-black transition-all text-premium-black"
                                    placeholder="archit@vision.com"
                                />
                                <Mail className="absolute left-5 top-5 text-gray-300 group-focus-within:text-premium-black transition-colors" size={20} />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-premium-black">Secure Password</label>
                                <Link to="/forgot-password" className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300 hover:text-premium-black transition-colors">Recover Access</Link>
                            </div>
                            <div className="relative group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="w-full bg-soft-gray border border-transparent rounded-2xl p-5 pl-14 outline-none focus:bg-white focus:border-premium-black transition-all text-premium-black font-mono"
                                    placeholder="••••••••"
                                />
                                <Lock className="absolute left-5 top-5 text-gray-300 group-focus-within:text-premium-black transition-colors" size={20} />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-5 top-5 text-gray-300 hover:text-premium-black transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className="w-full btn-primary py-5 flex items-center justify-center gap-4 shadow-xl shadow-black/10 relative overflow-hidden"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>Sign In <LogIn size={18} /></>
                            )}
                        </motion.button>
                    </form>

                    <div className="mt-12 pt-8 border-t border-gray-100 text-center">
                        <p className="text-gray-400 font-light italic">
                            New to Akila Vision?
                            <Link to="/register" className="ml-2 font-black uppercase tracking-widest text-premium-black hover:opacity-70 transition-opacity">
                                Request Membership <ArrowRight size={14} className="inline ml-1" />
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
