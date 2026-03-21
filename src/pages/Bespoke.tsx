import React from 'react';
import { motion } from 'motion/react';
import { Navbar, Footer } from '../components/Layout';
import { useCart } from '../contexts/CartContext';
import { Ruler, Sparkles, Droplet, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Bespoke: React.FC = () => {
  const { cart, setIsCartOpen } = useCart();

  return (
    <div className="min-h-screen bg-obsidian text-white pt-32">
      <Navbar cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} onCartClick={() => setIsCartOpen(true)} />
      
      <main className="px-8 sm:px-16 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-24 text-center">
          <h2 className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-6">Akela Handcrafted</h2>
          <h1 className="text-6xl sm:text-8xl font-display mb-6">Bespoke Options</h1>
          <p className="text-white/40 uppercase tracking-[0.3em] max-w-2xl mx-auto leading-relaxed">
            Every face is unique. So is every pair of Bespoke Akela eyewear. Tailored precisely to your measurements, handcrafted in premium Italian acetate, and finished to your exact specifications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            className="aspect-[4/5] bg-white/5 relative overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1541819385419-f9c318ab484d?q=80&w=800&auto=format&fit=crop" 
              alt="Artisan crafting eyewear" 
              className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian to-transparent" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            className="space-y-12"
          >
            {[
              { title: 'Facial Mapping', desc: 'Secure your fit. Utilizing our advanced 3D scanning system, we calculate your structural dimensions down to the millimeter.', icon: Ruler },
              { title: 'Material Selection', desc: 'Select from 24 distinct Japanese acetate colorways and 3 pure titanium finishe.', icon: Droplet },
              { title: 'Final Engraving', desc: 'Seal it with your initials. Every bespoke order features complimentary laser engraving.', icon: Sparkles },
            ].map((step, i) => (
              <div key={i} className="flex gap-6">
                <div className="mt-1 p-4 bg-white/5 rounded-full h-min">
                  <step.icon size={20} className="text-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-display mb-2">{step.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed font-mono">{step.desc}</p>
                </div>
              </div>
            ))}

            <Link to="/dashboard" className="btn-primary inline-flex items-center gap-4 py-5 px-12 uppercase tracking-[0.2em] text-xs font-bold w-full sm:w-auto mt-8 group">
              Start Bespoke Process <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
