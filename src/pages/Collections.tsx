import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Navbar, Footer, ProductCard } from '../components/Layout';
import { useCart } from '../contexts/CartContext';
import { Product } from '../types';
import { Filter, SlidersHorizontal } from 'lucide-react';

export const Collections: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { cart, setIsCartOpen, addToCart } = useCart();
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    fetch('/api/products/')
      .then(res => res.json())
      .then(data => {
        setProducts(data.results || data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const filteredProducts = activeFilter === 'All' 
    ? products 
    : products.filter(p => p.category.toLowerCase().includes(activeFilter.toLowerCase()) || p.name.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <div className="min-h-screen bg-obsidian text-white pt-32">
      <Navbar cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} onCartClick={() => setIsCartOpen(true)} />
      
      <main className="px-8 sm:px-16 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-24">
          <h1 className="text-6xl sm:text-8xl font-display mb-6">Collections</h1>
          <p className="text-white/40 uppercase tracking-[0.3em] max-w-xl leading-relaxed">
            Discover our meticulously curated selection of premium eyewear. Engineered for distinction and crafted without compromise.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 border-b border-white/10 pb-8 gap-8">
          <div className="flex gap-8 text-xs uppercase tracking-widest font-bold overflow-x-auto w-full md:w-auto pb-4 md:pb-0 hide-scrollbar">
            {['All', 'Sunglasses', 'Optical', 'Aviator', 'Round'].map(filter => (
              <button 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`whitespace-nowrap transition-colors ${activeFilter === filter ? 'text-white border-b border-white pb-2' : 'text-white/40 hover:text-white pb-2 border-b border-transparent'}`}
              >
                {filter}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors">
            <SlidersHorizontal size={14} /> Filter & Sort
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-32">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="aspect-[4/5] bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-32">
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx % 3 * 0.1 }}
              >
                <ProductCard product={product} onAddToCart={() => addToCart(product)} />
              </motion.div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};
