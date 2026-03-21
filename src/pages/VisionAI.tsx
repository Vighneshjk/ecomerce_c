import React from 'react';
import { motion } from 'motion/react';
import { Navbar, Footer } from '../components/Layout';
import { useCart } from '../contexts/CartContext';
import { Camera, ScanFace, Box, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const VisionAI: React.FC = () => {
  const { cart, setIsCartOpen } = useCart();

  return (
    <div className="min-h-screen bg-obsidian text-white pt-32">
      <Navbar cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} onCartClick={() => setIsCartOpen(true)} />
      
      <main className="px-8 sm:px-16 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-32 text-center">
          <h2 className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-6">Proprietary Technology</h2>
          <h1 className="text-6xl sm:text-8xl font-display mb-6">Vision AI</h1>
          <p className="text-white/40 uppercase tracking-[0.3em] max-w-2xl mx-auto leading-relaxed">
            Powered by next-gen MediaPipe facial mapping, our Vision AI engine precisely measures your face structure, pupil distance, and jawline to recommend frames mathematically guaranteed to fit.
          </p>
          <div className="mt-12">
            <Link to="/dashboard" className="btn-primary inline-flex items-center gap-4 py-5 px-12 uppercase tracking-[0.2em] text-xs font-bold transition-all hover:scale-105 group">
              Launch Vision Scanner <Camera size={16} className="group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
          {[
            { icon: ScanFace, title: '468 Point Mesh', desc: 'Real-time tracking of micro-expressions and structure dimensions.' },
            { icon: Box, title: 'True-Scale 3D', desc: 'Frames are rendered using threeJS to physically exact measurements over your live video feed.' },
            { icon: ArrowRight, title: 'GenAI Insights', desc: 'Combined with Google Gemini to read your biometric results and act as a digital stylist.' }
          ].map((feature, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.2 }}
               className="glass p-12 text-center hover:bg-white/5 transition-colors"
             >
               <div className="w-16 h-16 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-8">
                 <feature.icon size={24} className="text-white/60" />
               </div>
               <h3 className="text-xl font-display mb-4">{feature.title}</h3>
               <p className="text-[10px] uppercase tracking-widest text-white/40 leading-relaxed">{feature.desc}</p>
             </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};
