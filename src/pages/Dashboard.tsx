import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { Navbar, Footer } from '../components/Layout';
import { VirtualTryOn } from '../components/VirtualTryOn';
import { CartModal } from '../components/CartModal';
import { User, Settings, Package, Heart, LogOut, Camera, ChevronRight, Truck } from 'lucide-react';
import { cn } from '../lib/utils';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { cart, isCartOpen, setIsCartOpen, addToCart, updateQuantity, removeFromCart } = useCart();
  const [isTryOnOpen, setIsTryOnOpen] = useState(false);
  const [detectedShape, setDetectedShape] = useState<string | null>(null);

  const stats = [
    { label: 'Saved Frames', value: '12', icon: Heart, color: 'text-rose-500' },
    { label: 'Active Orders', value: '01', icon: Package, color: 'text-emerald-500' },
    { label: 'Face Analysis', value: user?.faceShape || 'Oval', icon: Camera, color: 'text-gold' },
    { label: 'Prescription', value: 'Valid', icon: Settings, color: 'text-blue-500' },
  ];

  const savedStyles = [
    { name: 'Obsidian Prime', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=400&auto=format&fit=crop', price: '$249' },
    { name: 'Akeela Noir', image: 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?q=80&w=400&auto=format&fit=crop', price: '$289' },
    { name: 'Milan Gold', image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=400&auto=format&fit=crop', price: '$329' },
  ];

  return (
    <div className="min-h-screen bg-obsidian text-white">
      <Navbar 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)} 
      />
      
      <main className="pt-32 pb-24 px-8 sm:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <Link to="/" className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors">Home</Link>
                <ChevronRight size={10} className="text-white/20" />
                <span className="text-[10px] uppercase tracking-widest text-white">Dashboard</span>
              </div>
              <h1 className="text-5xl sm:text-7xl font-display mb-4">Vision Profile</h1>
              <p className="text-white/40 uppercase tracking-[0.3em] text-xs">Welcome back, {user?.name}</p>
            </div>
            <button 
              onClick={logout}
              className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors border border-white/10 px-6 py-3"
            >
              <LogOut size={14} /> Sign Out
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass p-8 flex justify-between items-center group hover:bg-white/5 transition-colors"
              >
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2">{stat.label}</p>
                  <p className="text-2xl font-mono">{stat.value}</p>
                </div>
                <div className={cn("p-4 bg-white/5 rounded-full group-hover:scale-110 transition-transform", stat.color)}>
                  <stat.icon size={20} />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-8">
              {/* Saved Styles */}
              <div className="glass p-8">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-display">Saved Styles</h3>
                  <button className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors">Browse All</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {savedStyles.map((style, i) => (
                    <div key={i} className="group cursor-pointer">
                      <div className="aspect-[3/4] bg-white/5 overflow-hidden mb-4 relative">
                        <img 
                          src={style.image} 
                          alt={style.name}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                          referrerPolicy="no-referrer"
                        />
                        <div 
                          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4"
                        >
                          <button 
                            onClick={() => setIsTryOnOpen(true)}
                            className="bg-white/10 hover:bg-white/20 px-4 py-2 border border-white/20 text-[10px] uppercase tracking-widest font-bold transition-colors"
                          >
                            Try On
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart({
                                id: `demo-saved-${i}`,
                                name: style.name,
                                price: parseFloat(style.price.replace('$', '')),
                                description: 'Saved Style from Vision Profile',
                                category: 'Optical',
                                image: style.image,
                                color: 'Obsidian'
                              });
                            }}
                            className="bg-white text-obsidian px-4 py-2 text-[10px] uppercase tracking-widest font-bold transition-transform hover:scale-105"
                          >
                            Add To Cart
                          </button>
                        </div>
                      </div>
                      <p className="text-sm mb-1">{style.name}</p>
                      <p className="text-xs text-white/40 font-mono">{style.price}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Orders & Delivery Status */}
              <div className="glass p-8">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-display">Active Deliveries & History</h3>
                  <button className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors">Full History</button>
                </div>
                <div className="space-y-6">
                  {[
                    { name: 'Obsidian Prime', id: 'AK-92831', price: '$249.00', status: 'In Transit', date: 'Mar 15, 2026', step: 3, totalSteps: 4, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=400&auto=format&fit=crop' },
                    { name: 'Akeela Noir', id: 'AK-88210', price: '$289.00', status: 'Delivered', date: 'Feb 28, 2026', step: 4, totalSteps: 4, image: 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?q=80&w=400&auto=format&fit=crop' },
                  ].map((order, i) => (
                    <div key={i} className="flex flex-col py-4 border-b border-white/5 last:border-0 relative group">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-16 bg-white/5 border border-white/5">
                             <img src={order.image} alt={order.name} className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{order.name}</p>
                            <p className="text-[10px] text-white/40 uppercase tracking-widest">Order #{order.id} • {order.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-mono">{order.price}</p>
                          <p className={cn(
                            "text-[10px] uppercase tracking-widest flex items-center gap-1 justify-end",
                            order.status === 'Delivered' ? 'text-white/40' : 'text-emerald-500'
                          )}>
                            {order.status === 'In Transit' && <Truck size={12} />}
                            {order.status}
                          </p>
                        </div>
                      </div>
                      
                      {/* Delivery Status Bar */}
                      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-2">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(order.step / order.totalSteps) * 100}%` }}
                          className={cn("h-full", order.status === 'Delivered' ? 'bg-white/40' : 'bg-emerald-500')}
                          transition={{ duration: 1, delay: i * 0.2 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Area */}
            <div className="space-y-8">
              {/* Face Shape Analysis Card */}
              <div className="glass p-8 bg-gradient-to-br from-white/5 to-transparent">
                <div className="flex items-center gap-3 mb-6">
                  <Camera size={18} className="text-gold" />
                  <h3 className="text-xs uppercase tracking-widest font-bold">Vision AI Analysis</h3>
                </div>
                <div className="text-center py-8 border-y border-white/5 mb-6">
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Detected Structure</p>
                  <p className="text-4xl font-display tracking-tighter">{detectedShape || user?.faceShape || 'Oval'}</p>
                </div>
                <p className="text-xs text-white/40 leading-relaxed italic mb-6">
                  "Your balanced proportions allow for maximum versatility. We recommend angular frames to add definition to your soft curves."
                </p>
                <button 
                  onClick={() => setIsTryOnOpen(true)}
                  className="w-full py-4 border border-white/10 text-[10px] uppercase tracking-widest hover:bg-white/5 transition-colors"
                >
                  {detectedShape ? "Scan Again" : "Start Vision AI Scan"}
                </button>
              </div>

              {/* Account Settings */}
              <div className="glass p-8">
                <h3 className="text-xl font-display mb-8">Settings</h3>
                <div className="space-y-2">
                  {[
                    { label: 'Personal Information', icon: User },
                    { label: 'Vision Prescription', icon: Camera },
                    { label: 'Security & Privacy', icon: Settings },
                  ].map((item, i) => (
                    <button key={i} className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors group">
                      <div className="flex items-center gap-4">
                        <item.icon size={18} className="text-white/40" />
                        <span className="text-sm">{item.label}</span>
                      </div>
                      <ChevronRight size={16} className="text-white/20 group-hover:translate-x-1 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <AnimatePresence>
        {isTryOnOpen && (
          <VirtualTryOn 
            onClose={() => setIsTryOnOpen(false)} 
            onAnalysisComplete={(shape) => setDetectedShape(shape as string)}
          />
        )}
        {isCartOpen && (
          <CartModal 
            isOpen={isCartOpen} 
            onClose={() => setIsCartOpen(false)} 
            items={cart}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
