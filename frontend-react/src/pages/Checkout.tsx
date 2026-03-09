import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Truck, ShieldCheck, ChevronRight, ArrowLeft, Lock } from 'lucide-react';

const Checkout: React.FC = () => {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const steps = [
        { title: 'Shipping', icon: Truck },
        { title: 'Payment', icon: CreditCard },
        { title: 'Confirm', icon: ShieldCheck },
    ];

    return (
        <div className="bg-white min-h-screen pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Progress Bar */}
                    <div className="mb-20">
                        <div className="flex justify-between items-center relative gap-8 md:gap-20">
                            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -z-10 -translate-y-1/2"></div>
                            {steps.map((s, i) => (
                                <div key={i} className="flex flex-col items-center gap-4">
                                    <motion.div
                                        animate={{
                                            backgroundColor: step > i ? '#000' : step === i + 1 ? '#000' : '#fff',
                                            borderColor: step >= i + 1 ? '#000' : '#e5e7eb',
                                            color: step >= i + 1 ? '#fff' : '#9ca3af'
                                        }}
                                        className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center transition-all shadow-xl shadow-gray-100 relative z-10"
                                    >
                                        <s.icon size={24} className={step > i ? 'text-white' : ''} />
                                    </motion.div>
                                    <span className={`text-[10px] md:text-xs font-black uppercase tracking-[0.2em] ${step >= i + 1 ? 'text-premium-black' : 'text-gray-400'}`}>
                                        {s.title}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-10"
                            >
                                <div className="bg-soft-gray p-10 md:p-14 rounded-[3rem] border border-gray-100">
                                    <h2 className="text-3xl font-black mb-10 text-premium-black tracking-tighter uppercase">Shipping Details</h2>
                                    <div className="grid md:grid-cols-2 gap-10">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">First Name</label>
                                            <input type="text" className="w-full bg-white border-none rounded-2xl p-5 outline-none focus:ring-2 focus:ring-black transition-all" placeholder="Enter first name" />
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Last Name</label>
                                            <input type="text" className="w-full bg-white border-none rounded-2xl p-5 outline-none focus:ring-2 focus:ring-black transition-all" placeholder="Enter last name" />
                                        </div>
                                    </div>
                                    <div className="mt-10 space-y-4">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Delivery Address</label>
                                        <textarea rows={3} className="w-full bg-white border-none rounded-2xl p-5 outline-none focus:ring-2 focus:ring-black transition-all resize-none" placeholder="123 Visionary St, Suite 101"></textarea>
                                    </div>
                                    <div className="mt-10 grid md:grid-cols-3 gap-10">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">City</label>
                                            <input type="text" className="w-full bg-white border-none rounded-2xl p-5 outline-none focus:ring-2 focus:ring-black transition-all" placeholder="Milan" />
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">State / Province</label>
                                            <input type="text" className="w-full bg-white border-none rounded-2xl p-5 outline-none focus:ring-2 focus:ring-black transition-all" placeholder="Lombardy" />
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">ZIP Code</label>
                                            <input type="text" className="w-full bg-white border-none rounded-2xl p-5 outline-none focus:ring-2 focus:ring-black transition-all" placeholder="20121" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end pt-10">
                                    <motion.button onClick={nextStep} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-primary flex items-center gap-3 py-5 px-12 shadow-2xl">
                                        Next: Payment Info <ChevronRight size={18} />
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-10"
                            >
                                <div className="bg-premium-black p-10 md:p-14 rounded-[3rem] text-white overflow-hidden relative">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3"></div>
                                    <h2 className="text-3xl font-black mb-10 tracking-tighter uppercase flex items-center gap-4">
                                        Secure Payment <Lock size={24} className="opacity-40" />
                                    </h2>
                                    <div className="space-y-10">
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Cardholder Name</label>
                                            <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 outline-none focus:bg-white/10 transition-all text-white" placeholder="Johnathan Doe" />
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Card Number</label>
                                            <div className="relative">
                                                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 pl-16 outline-none focus:bg-white/10 transition-all text-white font-mono" placeholder="•••• •••• •••• 1234" />
                                                <CreditCard className="absolute left-5 top-5 text-white/20" />
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-10 mt-10">
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Expiry Date</label>
                                                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 outline-none focus:bg-white/10 transition-all text-white" placeholder="MM / YY" />
                                            </div>
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">CVC Code</label>
                                                <div className="relative">
                                                    <input type="password" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 outline-none focus:bg-white/10 transition-all text-white" placeholder="•••" />
                                                    <ShieldCheck className="absolute right-5 top-5 text-white/20" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between pt-10">
                                    <motion.button onClick={prevStep} className="text-gray-400 hover:text-black transition-colors font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                                        <ArrowLeft size={16} /> Previous Step
                                    </motion.button>
                                    <motion.button onClick={nextStep} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-primary bg-premium-black text-white flex items-center gap-3 py-5 px-12 shadow-2xl">
                                        Next: Confirmation <ChevronRight size={18} />
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="space-y-12 text-center py-20"
                            >
                                <div className="inline-flex items-center justify-center w-24 h-24 bg-green-50 rounded-full mb-10 text-green-500 shadow-xl shadow-green-100">
                                    <ShieldCheck size={48} />
                                </div>
                                <h2 className="text-5xl font-black tracking-tighter uppercase text-premium-black mb-6">Authorize Transaction</h2>
                                <p className="text-gray-400 max-w-sm mx-auto font-light leading-relaxed mb-12 italic">Almost there. Reviewing your optical precision and visionary selection before finalizing.</p>

                                <div className="bg-soft-gray p-8 rounded-[2rem] max-w-md mx-auto border border-gray-100 mb-12">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-sm text-gray-400 font-light">Precision Eyewear (x1)</span>
                                        <span className="font-bold text-premium-black">$285.00</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="text-sm text-gray-400 font-light">Global Express</span>
                                        <span className="text-green-600 font-bold uppercase tracking-widest text-xs">Complimentary</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                                        <span className="text-lg font-black tracking-widest text-gray-400 uppercase">Total</span>
                                        <span className="text-3xl font-black text-premium-black">$285.00</span>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center gap-6">
                                    <motion.button
                                        onClick={() => navigate('/order-success')}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="btn-primary w-full max-w-sm py-5 shadow-2xl flex items-center justify-center gap-4 group"
                                    >
                                        Confirm Order <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </motion.button>
                                    <button onClick={prevStep} className="text-gray-300 hover:text-gray-500 transition-colors uppercase tracking-[0.3em] text-[10px] font-black">
                                        Abort Authorize
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
