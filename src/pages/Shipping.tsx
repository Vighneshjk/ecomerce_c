import React from 'react';
import { motion } from 'motion/react';
import { Navbar, Footer } from '../components/Layout';
import { Truck, Globe, MapPin, Undo } from 'lucide-react';

export const Shipping: React.FC = () => {
  return (
    <div className="min-h-screen bg-obsidian text-white">
      <Navbar cartCount={0} onCartClick={() => {}} />
      <main className="pt-32 pb-24 px-8 sm:px-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-24"
          >
            <h2 className="text-xs uppercase tracking-[0.4em] text-white/40 mb-6">Concierge Delivery</h2>
            <h1 className="text-5xl sm:text-7xl font-display mb-12">Logistics& Returns</h1>
          </motion.div>

          <div className="space-y-24">
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <Truck className="text-white/20 mb-8" size={32} strokeWidth={1} />
                <h3 className="text-3xl font-display mb-6">Global Shipping</h3>
                <p className="text-white/60 leading-relaxed font-light mb-8">
                  We partner exclusively with FedEx and DHL to ensure your frames travel 
                  in climate-controlled conditions. All shipments are fully insured 
                  and require a signature upon delivery.
                </p>
                <div className="flex gap-12 text-[10px] uppercase tracking-widest text-white/40">
                  <span>EU: 2-3 Days</span>
                  <span>USA: 3-5 Days</span>
                  <span>Asia: 5-7 Days</span>
                </div>
              </div>
              <div className="glass aspect-video overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?w=800"
                  alt="Packaging"
                  className="w-full h-full object-cover grayscale opacity-40 group-hover:scale-105 transition-transform duration-1000"
                />
              </div>
            </section>

             <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
               <div className="glass aspect-video overflow-hidden group order-second md:order-first">
                <img 
                  src="https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800"
                  alt="Return Process"
                  className="w-full h-full object-cover grayscale opacity-40 group-hover:scale-105 transition-transform duration-1000"
                />
              </div>
              <div className="order-first md:order-second">
                <Undo className="text-white/20 mb-8" size={32} strokeWidth={1} />
                <h3 className="text-3xl font-display mb-6">Bespoke Returns</h3>
                <p className="text-white/60 leading-relaxed font-light mb-8">
                  Our collections are eligible for return within 14 days of delivery. 
                  Bespoke and AI-designed frames are custom-crafted and therefore 
                  non-returnable, unless an engineering defect is identified.
                </p>
                <button className="btn-outline w-full sm:w-auto">Start Return Process</button>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
