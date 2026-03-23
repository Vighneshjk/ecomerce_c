import React from 'react';
import { motion } from 'motion/react';
import { Navbar, Footer } from '../components/Layout';
import { Eye, ShieldCheck, Database, Key } from 'lucide-react';

export const Privacy: React.FC = () => {
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
            <h2 className="text-xs uppercase tracking-[0.4em] text-white/40 mb-6">Ethics</h2>
            <h1 className="text-5xl sm:text-7xl font-display mb-12">Privacy & Data Protection</h1>
          </motion.div>

          <div className="space-y-16">
            <section className="glass p-12">
              <h3 className="text-2xl font-display mb-8">Vision Data Philosophy</h3>
              <p className="text-white/60 leading-relaxed font-light mb-12">
                Your biological data is personal. When you use Akeela Vision AI, 
                your facial mapping is processed locally and never stored on our 
                servers unless you choose to create a Bespoke Profile.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="flex gap-6 items-start">
                   <ShieldCheck className="text-white/20 mt-1" size={24} />
                   <div>
                      <p className="text-xs uppercase tracking-widest font-bold mb-2">Encryption</p>
                      <p className="text-sm text-white/40">Military-grade AES-256 bit encryption for all personal identifiers.</p>
                   </div>
                </div>
                <div className="flex gap-6 items-start">
                   <Key className="text-white/20 mt-1" size={24} />
                   <div>
                      <p className="text-xs uppercase tracking-widest font-bold mb-2">No 3rd Party</p>
                      <p className="text-sm text-white/40">We will never sell or share your biometric data with insurance or marketing providers.</p>
                   </div>
                </div>
              </div>
            </section>

             <div className="space-y-4 text-xs text-white/30 uppercase tracking-[0.2em] leading-loose max-w-2xl mx-auto">
                <p>By using Akeela Vision, you agree to our processing of site usage data for the purpose of improving the AI engine. You may request a full export or permanent deletion of your customer data at any time via the dashboard.</p>
                <p>Last Updated: March 2026</p>
             </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
