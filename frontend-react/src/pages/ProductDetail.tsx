import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { apiService } from '../api/apiService';
import type { Product } from '../api/apiService';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Heart, Shield, Sun, Eye, ChevronRight, Check } from 'lucide-react';
import VirtualTryOn from '../components/VirtualTryOn';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [showTryOn, setShowTryOn] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [addedSuccess, setAddedSuccess] = useState(false);
    const { addToCart } = useCart();

    useEffect(() => {
        if (id) {
            apiService.getProduct(id).then(setProduct);
        }
    }, [id]);

    const handleAddToCart = async () => {
        if (!product) return;
        setIsAdding(true);
        setAddedSuccess(false);
        try {
            await addToCart(product.id);
            setAddedSuccess(true);
            setTimeout(() => setAddedSuccess(false), 3000);
        } catch (error) {
            console.error('Failed to add to cart', error);
        } finally {
            setIsAdding(false);
        }
    };

    if (!product) return (
        <div className="min-h-screen flex items-center justify-center">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-12 h-12 rounded-full border-4 border-gray-100 border-t-premium-black"
            />
        </div>
    );

    return (
        <div className="bg-white min-h-screen pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex items-center text-sm text-gray-500 mb-12">
                    <span>Shop</span> <ChevronRight size={14} className="mx-2" />
                    <span>{product.category.name}</span> <ChevronRight size={14} className="mx-2" />
                    <span className="text-premium-black font-medium">{product.name}</span>
                </nav>

                <div className="lg:grid lg:grid-cols-2 lg:gap-x-16 lg:items-start">
                    {/* Left column: 3D Try On / Image Gallery */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col"
                    >
                        <div className="w-full aspect-[4/5] rounded-[2rem] overflow-hidden bg-soft-gray shadow-2xl relative group cursor-crosshair">
                            {showTryOn ? (
                                <VirtualTryOn modelUrl={product.model_3d_url} onExit={() => setShowTryOn(false)} />
                            ) : (
                                <>
                                    <img
                                        src="https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80"
                                        alt={product.name}
                                        className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-x-0 bottom-10 flex justify-center">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setShowTryOn(true)}
                                            className="glass-morphism px-8 py-4 rounded-full flex items-center gap-3 text-premium-black font-bold shadow-2xl transition-all"
                                        >
                                            <Eye size={20} />
                                            Virtual Try-On 3D
                                        </motion.button>
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.div>

                    {/* Right column: Product info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mt-10 lg:mt-0 px-4"
                    >
                        <div className="border-b border-gray-100 pb-8">
                            <h1 className="text-5xl font-black tracking-tight text-premium-black sm:text-6xl">{product.name}</h1>
                            <div className="mt-6 flex items-baseline justify-between">
                                <p className="text-4xl font-light text-premium-black">${product.price}</p>
                                <div className="flex gap-2">
                                    <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100 uppercase tracking-widest">Available</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h3 className="text-sm font-bold text-premium-black uppercase tracking-widest mb-4">Description</h3>
                            <p className="text-lg text-gray-500 leading-relaxed font-light">{product.description}</p>
                        </div>

                        <div className="mt-12 grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-4 rounded-2xl bg-soft-gray border border-gray-100">
                                <Sun size={20} className="text-gray-400" />
                                <span className="text-xs font-bold uppercase tracking-widest">UV400 Protection</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 rounded-2xl bg-soft-gray border border-gray-100">
                                <Shield size={20} className="text-gray-400" />
                                <span className="text-xs font-bold uppercase tracking-widest">Anti-Reflective</span>
                            </div>
                        </div>

                        <div className="mt-12 flex gap-4">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleAddToCart}
                                disabled={isAdding}
                                className="flex-[3] btn-primary py-5 flex items-center justify-center gap-3 relative overflow-hidden"
                            >
                                <AnimatePresence mode="wait">
                                    {isAdding ? (
                                        <motion.div
                                            key="adding"
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                        />
                                    ) : addedSuccess ? (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex items-center gap-2"
                                        >
                                            <Check size={20} /> Added to Cart
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="default"
                                            className="flex items-center gap-2"
                                        >
                                            <ShoppingCart size={20} /> Add to Collection
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.button>

                            <button className="flex-1 bg-soft-gray hover:bg-gray-200 text-premium-black rounded-full flex items-center justify-center transition-colors">
                                <Heart size={24} />
                            </button>
                        </div>

                        <section className="mt-16 border-t border-gray-100 pt-10">
                            <div className="flex items-center justify-between group cursor-pointer">
                                <span className="text-sm font-bold uppercase tracking-widest">Specifications</span>
                                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                            <div className="mt-6 prose prose-sm text-gray-500">
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-2 font-light">Premium Polycarbonate Lenses</li>
                                    <li className="flex items-center gap-2 font-light">Handcrafted Acetate Frame</li>
                                    <li className="flex items-center gap-2 font-light">Italian Engineered Hinges</li>
                                </ul>
                            </div>
                        </section>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
