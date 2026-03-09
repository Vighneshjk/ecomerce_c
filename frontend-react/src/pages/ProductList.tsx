import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { apiService } from '../api/apiService';
import type { Product } from '../api/apiService';
import { ShoppingBag, Eye, Filter, ChevronDown, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [nextPage, setNextPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const { addToCart } = useCart();

    const loadProducts = useCallback(async (reset = false) => {
        if (isLoading || (!hasMore && !reset)) return;
        setIsLoading(true);
        try {
            const pageToLoad = reset ? 1 : nextPage;
            const res = await apiService.getProducts(undefined, pageToLoad);
            setProducts(prev => reset ? res.results : [...prev, ...res.results]);
            setHasMore(res.next !== null);
            if (res.next) setNextPage(pageToLoad + 1);
        } catch (error) {
            console.error('Failed to load products', error);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, hasMore, nextPage]);

    useEffect(() => {
        loadProducts();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
                loadProducts();
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadProducts]);

    return (
        <div className="bg-akeela-cream min-h-screen pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Area */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-5xl md:text-7xl font-black tracking-tighter text-akeela-black uppercase"
                        >
                            The <span className="text-akeela-gold italic">Collection</span>.
                        </motion.h1>
                        <p className="text-akeela-gray mt-4 font-light max-w-md">"Precisely engineered optics for those who demand clarity without compromise."</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 px-6 py-3 bg-white rounded-full border border-gray-100 text-sm font-bold uppercase tracking-widest text-akeela-black hover:bg-gray-50 transition-all">
                            Sort By <ChevronDown size={14} />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-64 space-y-10">
                        <div>
                            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-akeela-black mb-6">Frame Material</h4>
                            <div className="space-y-4">
                                {['Italian Acetate', 'Titanium', 'Polycarbonate', 'Eco-Acetate'].map(mat => (
                                    <label key={mat} className="flex items-center gap-3 cursor-pointer group">
                                        <input type="checkbox" className="w-5 h-5 rounded border-2 border-gray-200 checked:bg-akeela-black transition-all" />
                                        <span className="text-sm font-light text-akeela-gray group-hover:text-akeela-black transition-colors">{mat}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="pt-10 border-t border-gray-100">
                            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-akeela-black mb-6">Price Range</h4>
                            <div className="space-y-4">
                                {['Under $100', '$100 - $250', '$250 - $500', 'Premium ($500+)'].map(price => (
                                    <label key={price} className="flex items-center gap-3 cursor-pointer group">
                                        <input type="checkbox" className="w-5 h-5 rounded border-2 border-gray-200 checked:bg-akeela-black transition-all" />
                                        <span className="text-sm font-light text-akeela-gray group-hover:text-akeela-black transition-colors">{price}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="pt-10 border-t border-gray-100">
                            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-akeela-black mb-6">Frame Shape</h4>
                            <div className="grid grid-cols-2 gap-4">
                                {['Round', 'Square', 'Cat-Eye', 'Aviator'].map(shape => (
                                    <button key={shape} className="px-4 py-3 bg-white border border-gray-100 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:border-akeela-black transition-all">
                                        {shape}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Main Grid */}
                    <div className="flex-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10">
                            <AnimatePresence mode="popLayout">
                                {products.map((product, index) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: (index % 6) * 0.1 }}
                                        className="group"
                                    >
                                        <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 border border-gray-50 flex flex-col h-full">
                                            <Link to={`/products/${product.id}`} className="block relative aspect-[4/5] overflow-hidden bg-gray-50">
                                                <img
                                                    src="https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80"
                                                    alt={product.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                                                />
                                                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        whileInView={{ opacity: 1, scale: 1 }}
                                                        className="bg-white px-8 py-4 rounded-full text-xs font-black uppercase tracking-[0.2em] flex items-center gap-3 translate-y-4 group-hover:translate-y-0 transition-all duration-500"
                                                    >
                                                        <Eye size={16} className="text-akeela-gold" /> Explore Frame
                                                    </motion.div>
                                                </div>
                                                <div className="absolute top-6 right-6">
                                                    <div className="bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-sm text-akeela-black hover:bg-akeela-black hover:text-white transition-colors">
                                                        <ShoppingBag size={18} />
                                                    </div>
                                                </div>
                                            </Link>

                                            <div className="p-8 flex flex-col flex-1">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <div className="flex gap-1 mb-2">
                                                            {[1, 2, 3, 4, 5].map(s => <Star key={s} size={10} fill={s <= 4 ? "#C9A84C" : "none"} stroke={s <= 4 ? "none" : "#E5E7EB"} />)}
                                                        </div>
                                                        <h3 className="text-xl font-bold text-akeela-black uppercase tracking-tight mb-1">
                                                            {product.name}
                                                        </h3>
                                                        <p className="text-[10px] text-akeela-gray uppercase tracking-[0.3em] font-medium">{product.category.name || 'Original Series'}</p>
                                                    </div>
                                                    <p className="text-2xl font-black text-akeela-black">${product.price}</p>
                                                </div>

                                                <div className="mt-auto pt-6 flex gap-4">
                                                    <button
                                                        onClick={() => addToCart(product.id)}
                                                        className="flex-1 bg-akeela-black text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-akeela-gold transition-all"
                                                    >
                                                        Add to Collection
                                                    </button>
                                                    <Link
                                                        to={`/products/${product.id}`}
                                                        className="px-6 bg-akeela-cream rounded-2xl flex items-center justify-center hover:bg-gray-100 transition-colors"
                                                    >
                                                        <Eye size={18} className="text-akeela-black" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {isLoading && (
                            <div className="mt-20 flex justify-center">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                    className="w-12 h-12 rounded-full border-2 border-gray-100 border-t-akeela-black"
                                />
                            </div>
                        )}
                        {!hasMore && products.length > 0 && (
                            <div className="mt-20 text-center">
                                <p className="text-xs font-black uppercase tracking-[0.5em] text-gray-300">You've reached the horizon.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
