import React from 'react';
import { motion } from 'motion/react';
import { Navbar, Footer } from '../components/Layout';
import { MapPin, ArrowRight } from 'lucide-react';

export const StoreLocator: React.FC = () => {
  const locations = [
    { city: "Milan", address: "Via della Spiga, 32", country: "Italy", category: "Global Atelier" },
    { city: "Paris", address: "Avenue Montaigne, 46", country: "France", category: "Flagship Shop" },
    { city: "London", address: "New Bond St, 16", country: "UK", category: "Experience Center" },
    { city: "New York", address: "Madison Ave, 72", country: "USA", category: "Gallery Loft" },
    { city: "Tokyo", address: "Ginza, 5 Chome-8-1", country: "Japan", category: "Tech Lab" },
  ];

  return (
    <div className="min-h-screen bg-obsidian text-white">
      <Navbar cartCount={0} onCartClick={() => {}} />
      <main className="pt-32 pb-24 px-8 sm:px-16 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-24"
          >
            <h2 className="text-xs uppercase tracking-[0.4em] text-white/40 mb-6">Experience</h2>
            <h1 className="text-5xl sm:text-7xl font-display mb-12">Store Locator</h1>
            <p className="text-xl text-white/60 font-light leading-relaxed max-w-2xl mx-auto mb-16">
              "Akeela is found in the architectural heart of the world's most 
               significant cities. Experience the Vision AI in person."
            </p>
            <div className="flex justify-center flex-wrap gap-4">
               <input 
                  type="text" 
                  placeholder="Enter City or Zip..." 
                  className="bg-white/5 border border-white/10 px-8 py-4 text-xs outline-none focus:border-white w-full sm:w-96 transition-all"
               />
               <button className="btn-primary py-4 px-12">Search Neighborhood</button>
            </div>
          </motion.div>

          <div className="space-y-4">
            {locations.map((loc, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass p-12 flex flex-col md:flex-row justify-between items-start md:items-center text-left hover:bg-white/10 transition-colors"
              >
                 <div className="flex gap-12 items-center">
                    <span className="text-3xl font-display text-white/60 hidden sm:inline">{String(idx + 1).padStart(2, '0')}</span>
                    <div>
                       <h3 className="text-2xl font-display mb-2">{loc.city}</h3>
                       <p className="text-xs text-white/40 uppercase tracking-widest">{loc.category}</p>
                    </div>
                 </div>
                 <div className="mt-6 md:mt-0">
                    <p className="text-white/60 mb-2">{loc.address}</p>
                    <p className="text-xs text-white/20 uppercase tracking-[0.3em] font-bold">{loc.country}</p>
                 </div>
                 <button className="mt-8 md:mt-0 p-4 border border-white/10 rounded-full hover:bg-white hover:text-obsidian transition-colors">
                    <ArrowRight size={20} />
                 </button>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
