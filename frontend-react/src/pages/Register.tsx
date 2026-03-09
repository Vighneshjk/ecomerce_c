import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, UserPlus, ArrowLeft, Eye, EyeOff } from 'lucide-react';

const Register: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Mimic API delay
        setTimeout(() => setIsLoading(false), 2000);
    };

    return (
        <div className="bg-white min-h-screen pt-24 pb-20 flex items-center justify-center overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8 w-full grid lg:grid-cols-2 gap-20 items-center">

                {/* Left Side: Branding/Visual */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="hidden lg:block relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl"
                >
                    <img
                        src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80"
                        alt="Optical Precision"
                        className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-16 flex flex-col justify-end">
                        <h2 className="text-4xl font-black text-white tracking-tighter uppercase mb-4 italic">Visionary Membership.</h2>
                        <p className="text-white/60 text-lg font-light leading-relaxed">"Join an elite community of visionaries. Every detail meticulously crafted for those who see clearly."</p>
                    </div>
                </motion.div>

                {/* Right Side: Form */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md mx-auto"
                >
                    <div className="mb-12">
                        <Link to="/login" className="mb-8 text-gray-300 hover:text-black transition-colors font-bold uppercase tracking-[0.3em] text-[10px] flex items-center gap-2">
                            <ArrowLeft size={14} /> Back to Sign In
                        </Link>
                        <h1 className="text-4xl font-black tracking-tighter text-premium-black uppercase mb-4 pt-10">Request Admission</h1>
                        <p className="text-gray-400 font-light italic italic">"Join the future of premium perspective."</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-4">
                            <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-premium-black">Full Name</label>
                            <div className="relative group">
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-soft-gray border border-transparent rounded-2xl p-5 pl-14 outline-none focus:bg-white focus:border-premium-black transition-all text-premium-black"
                                    placeholder="Johnathan Visionary"
                                />
                                <User className="absolute left-5 top-5 text-gray-300 group-focus-within:text-premium-black transition-colors" size={20} />
                            </div>
                        </div>

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
                            <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-premium-black">Set Secure Password</label>
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

                        <div className="space-y-6 pt-2">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input type="checkbox" required className="w-5 h-5 rounded-lg border-2 border-soft-gray bg-soft-gray checked:bg-premium-black transition-all" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-black transition-colors italic leading-relaxed">I agree to the Visionary Terms and Privacy Ethics.</span>
                            </label>

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
                                    <>Create Membership <UserPlus size={18} /></>
                                )}
                            </motion.button>
                        </div>
                    </form>

                    <div className="mt-12 pt-8 border-t border-gray-100 text-center">
                        <p className="text-gray-400 font-light italic">
                            Already have an account?
                            <Link to="/login" className="ml-2 font-black uppercase tracking-widest text-premium-black hover:opacity-70 transition-opacity">
                                Authorize Access
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Register;
