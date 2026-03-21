import React from 'react';
import { motion } from 'motion/react';
import { Navbar, Footer } from '../components/Layout';
import { useCart } from '../contexts/CartContext';

export const Atelier: React.FC = () => {
  const { cart, setIsCartOpen } = useCart();

  return (
    <div className="min-h-screen bg-obsidian text-white pt-32">
      <Navbar cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} onCartClick={() => setIsCartOpen(true)} />
      
      <main className="px-8 sm:px-16 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-32 text-center">
          <h2 className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-6">Our Heritage</h2>
          <h1 className="text-6xl sm:text-8xl font-display mb-6">The Atelier</h1>
          <p className="text-white/40 uppercase tracking-[0.3em] max-w-2xl mx-auto leading-relaxed">
            Where vision meets artistry. Akela is forged from premium Italian acetate and raw Japanese titanium, hand-finished by artisans with decades of experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-4xl font-display leading-tight">Mastery in <br /> every millimetre.</h3>
            <p className="text-sm text-white/40 uppercase tracking-widest leading-relaxed">
              We sourced the finest materials from around the globe. Our hinges are tested to withstand over 1 million flexes. Every lens is coated with anti-reflective, scratch-resistant, and UV-proof shielding. Our atelier is an homage to those who refuse to compromise on design or utility.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            className="aspect-square bg-white/5 relative overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800&auto=format&fit=crop" 
              alt="Eyewear crafting" 
              className="w-full h-full object-cover mix-blend-luminosity opacity-80"
            />
            <div className="absolute inset-0 border border-white/10 m-8" />
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
