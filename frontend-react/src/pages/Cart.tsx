import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { apiService } from '../api/apiService';
import { ShoppingBag, Trash2, ChevronRight, ArrowLeft } from 'lucide-react';

const Cart: React.FC = () => {
    const [cart, setCart] = useState<any>({ items: [], total_price: 0 });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        apiService.getCart().then(res => {
            setCart(res);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-12 h-12 rounded-full border-4 border-gray-100 border-t-premium-black"
            />
        </div>
    );

    return (
        <div className="bg-soft-gray min-h-screen pt-24 pb-20 font-inter">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-12">
                    <h1 className="text-4xl font-black tracking-tight text-premium-black sm:text-5xl">Shopping Bag</h1>
                    <Link to="/products" className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-70 transition-opacity">
                        <ArrowLeft size={16} /> Continue Shopping
                    </Link>
                </div>

                {cart.items.length > 0 ? (
                    <div className="lg:grid lg:grid-cols-12 lg:gap-x-16 lg:items-start">
                        <section className="lg:col-span-7">
                            <div className="space-y-6">
                                <AnimatePresence>
                                    {cart.items.map((item: any) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex gap-6"
                                        >
                                            <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-2xl overflow-hidden bg-soft-gray flex-shrink-0 group">
                                                <img
                                                    src="https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80"
                                                    alt={item.product.name}
                                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                                />
                                            </div>

                                            <div className="flex-1 flex flex-col justify-between py-2">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="text-xl font-bold text-premium-black hover:text-premium-black/60 transition-colors">
                                                            <Link to={`/products/${item.product.id}`}>{item.product.name}</Link>
                                                        </h3>
                                                        <p className="text-gray-400 text-sm mt-1 uppercase tracking-widest">Quantity: {item.quantity}</p>
                                                    </div>
                                                    <p className="text-2xl font-light text-premium-black">${item.product.price}</p>
                                                </div>

                                                <div className="flex justify-between items-center mt-4">
                                                    <span className="flex items-center gap-2 text-xs font-bold text-green-600 uppercase tracking-widest">
                                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                                        Ready to Ship
                                                    </span>
                                                    <button className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all">
                                                        <Trash2 size={20} />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </section>

                        {/* Order summary */}
                        <section className="mt-16 lg:mt-0 lg:col-span-5">
                            <div className="bg-premium-black text-white rounded-[2.5rem] p-10 shadow-2xl sticky top-32">
                                <h2 className="text-2xl font-bold border-b border-white/10 pb-6">Order Summary</h2>

                                <div className="mt-8 space-y-6">
                                    <div className="flex items-center justify-between text-white/60">
                                        <span className="font-light">Subtotal</span>
                                        <span className="font-medium text-white">${cart.total_price}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-white/60">
                                        <span className="font-light">Standard Shipping</span>
                                        <span className="font-medium text-green-400">Complimentary</span>
                                    </div>
                                    <div className="flex items-center justify-between text-white/60">
                                        <span className="font-light">Estimated Tax</span>
                                        <span className="font-medium text-white">$0.00</span>
                                    </div>
                                    <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                                        <span className="text-xl font-light">Total Amount</span>
                                        <span className="text-3xl font-black">${cart.total_price}</span>
                                    </div>
                                </div>

                                <Link to="/checkout">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="mt-10 w-full bg-white text-black py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-colors active:bg-gray-100"
                                    >
                                        Confirm & Checkout <ChevronRight size={20} />
                                    </motion.button>
                                </Link>
                            </div>
                        </section>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-32 bg-white rounded-[3rem] shadow-sm border border-gray-100 px-6"
                    >
                        <div className="inline-flex items-center justify-center p-8 bg-soft-gray rounded-full mb-8 text-gray-400">
                            <ShoppingBag size={48} />
                        </div>
                        <h3 className="text-3xl font-black text-premium-black uppercase tracking-tighter">Your Bag is Empty</h3>
                        <p className="mt-4 text-gray-400 max-w-sm mx-auto font-light lg:text-lg italic">The perfect frames are waiting for you. Begin your journey.</p>
                        <div className="mt-10">
                            <Link to="/products" className="btn-primary inline-flex items-center gap-2 group">
                                Return to Gallery <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Cart;
