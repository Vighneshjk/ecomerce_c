import React from 'react';
import { motion } from 'motion/react';
import { Navbar, Footer } from '../components/Layout';
import { Shield, Sparkles, Droplets, Wind } from 'lucide-react';

export const CareGuide: React.FC = () => {
  const steps = [
    {
      title: "Gentle Cleansing",
      description: "Rinse your lenses with lukewarm water to remove abrasive dust. Use a drop of pH-neutral soap if necessary.",
      icon: Droplets
    },
    {
      title: "Microfiber Precision",
      description: "Dry exclusively with the provided Akeela microfiber cloth. Never use paper towels or clothing.",
      icon: Wind
    },
    {
      title: "Proper Storage",
      description: "When not in use, always rest your frames in the leather hard-case with the lenses facing up.",
      icon: Shield
    },
    {
      title: "Annual Adjustment",
      description: "Visit our atelier once a year for ultrasonic cleaning and frame realignment by our experts.",
      icon: Sparkles
    }
  ];

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
            <h2 className="text-xs uppercase tracking-[0.4em] text-white/40 mb-6">Longevity</h2>
            <h1 className="text-5xl sm:text-7xl font-display mb-12">Care & Maintenance</h1>
            <p className="text-xl text-white/60 font-light leading-relaxed max-w-2xl mx-auto italic">
              "Akeela frames are engineered to last a lifetime. Proper care ensures your vision remains as sharp as the day you first saw through them."
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass p-12 hover:bg-white/10 transition-colors group"
              >
                <step.icon className="text-white/20 group-hover:text-white transition-colors mb-8" size={32} strokeWidth={1} />
                <h3 className="text-2xl font-display mb-4">{step.title}</h3>
                <p className="text-white/60 leading-relaxed font-light">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
