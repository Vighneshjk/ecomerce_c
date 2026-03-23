import React from 'react';
import { motion } from 'motion/react';
import { Navbar, Footer } from '../components/Layout';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const Contact: React.FC = () => {
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
            <h2 className="text-xs uppercase tracking-[0.4em] text-white/40 mb-6">Concierge</h2>
            <h1 className="text-5xl sm:text-7xl font-display mb-12">Contact Us</h1>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            <div className="space-y-12">
               <div>
                  <h3 className="text-3xl font-display mb-12">Visit Our Atelier</h3>
                  <div className="space-y-8">
                     <div className="flex gap-6 items-start">
                        <MapPin className="text-white/20 mt-1" size={24} />
                        <div>
                           <p className="text-xs uppercase tracking-widest font-bold mb-2">Milan</p>
                           <p className="text-sm text-white/40">Via della Spiga, 32<br />20121 Milan, Italy</p>
                        </div>
                     </div>
                     <div className="flex gap-6 items-start">
                        <Phone className="text-white/20 mt-1" size={24} />
                        <div>
                           <p className="text-xs uppercase tracking-widest font-bold mb-2">Telephone</p>
                           <p className="text-sm text-white/40">+39 02 1234 5678</p>
                        </div>
                     </div>
                     <div className="flex gap-6 items-start">
                        <Mail className="text-white/20 mt-1" size={24} />
                        <div>
                           <p className="text-xs uppercase tracking-widest font-bold mb-2">Email</p>
                           <p className="text-sm text-white/40">atelier@akeela.com</p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="pt-12 border-t border-white/10">
                  <h4 className="text-xs uppercase tracking-widest font-bold mb-6">Hours</h4>
                  <div className="grid grid-cols-2 gap-4 text-xs text-white/30 truncate uppercase tracking-widest">
                     <span>Mon - Fri</span> <span>09:00 — 19:00</span>
                     <span>Sat</span>       <span>10:00 — 18:30</span>
                     <span>Sun</span>       <span>Closed</span>
                  </div>
               </div>
            </div>

            <div className="glass p-12">
               <h3 className="text-2xl font-display mb-12">Direct Message</h3>
               <form className="space-y-8">
                  <div className="space-y-2">
                     <label className="text-[10px] uppercase tracking-widest text-white/40">Full Name</label>
                     <input type="text" className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-white transition-colors" />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] uppercase tracking-widest text-white/40">Email Address</label>
                     <input type="email" className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-white transition-colors" />
                  </div>
                   <div className="space-y-2">
                     <label className="text-[10px] uppercase tracking-widest text-white/40">Inquiry Type</label>
                     <select className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-white transition-colors appearance-none">
                        <option>Bespoke Service</option>
                        <option>Order Support</option>
                        <option>Brand Cooperation</option>
                        <option>Atelier Booking</option>
                     </select>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] uppercase tracking-widest text-white/40">Message</label>
                     <textarea rows={4} className="w-full bg-transparent border-b border-white/10 py-3 outline-none focus:border-white transition-colors resize-none"></textarea>
                  </div>
                  <button className="btn-primary w-full flex items-center justify-center gap-2 py-4">
                     Send Inquiry <Send size={16} />
                  </button>
               </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
