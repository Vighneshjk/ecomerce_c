import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, User, Heart, ArrowRight, Eye, Shield } from 'lucide-react';
import { Product, CartItem } from '../types';
import { cn, formatCurrency } from '../lib/utils';
import { Canvas } from '@react-three/fiber';
import { Eyewear3D } from './Eyewear3D';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useAuth } from '../contexts/AuthContext';

// --- Navbar ---
export const Navbar: React.FC<{ cartCount: number; onCartClick: () => void }> = ({ cartCount, onCartClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-40 transition-all duration-500 py-6 px-8 flex justify-between items-center",
      isScrolled ? "bg-obsidian/80 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent"
    )}>
      <div className="flex items-center gap-12">
        <Link to="/" className="text-2xl font-display tracking-tighter font-bold uppercase">Akeela</Link>
        <div className="hidden md:flex gap-8 text-xs uppercase tracking-widest font-medium text-white/60">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <Link to="/collections" className="hover:text-white transition-colors">Collections</Link>
          <Link to="/bespoke" className="hover:text-white transition-colors">Bespoke</Link>
          <Link to="/vision-ai" className="hover:text-white transition-colors">Vision AI</Link>
          <Link to="/atelier" className="hover:text-white transition-colors">Atelier</Link>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="hover:text-white/70 transition-colors"><Search size={20} /></button>
        
        {user?.role === 'admin' && (
          <Link to="/admin" className="hover:text-white/70 transition-colors">
            <Shield size={20} />
          </Link>
        )}

        <Link to={user ? "/dashboard" : "/login"} className="hover:text-white/70 transition-colors">
          <User size={20} />
        </Link>

        <button 
          onClick={onCartClick}
          className="relative hover:text-white/70 transition-colors"
        >
          <ShoppingBag size={20} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-white text-obsidian text-[10px] font-bold flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </button>
        <button className="md:hidden"><Menu size={20} /></button>
      </div>
    </nav>
  );
};

import { useNavigate } from 'react-router-dom';

// --- Hero ---
export const Hero: React.FC<{ onTryOn: () => void }> = ({ onTryOn }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleTryOn = () => {
    if (!user) {
      navigate('/login');
    } else {
      onTryOn();
    }
  };

  const handleShop = () => {
    if (!user) {
      navigate('/login');
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen flex items-center px-8 sm:px-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <group position={[1.5, 0, 0]} rotation={[0.2, -0.5, 0]}>
            <Eyewear3D scale={[1.2, 1.2, 1.2]} color="#ffffff" />
          </group>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      <div className="relative z-10 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-7xl sm:text-9xl font-display leading-[0.85] tracking-tighter mb-8">
            Vision <br /> <span className="italic font-normal text-white/40">Redefined</span>
          </h1>
          <p className="text-lg text-white/60 max-w-md mb-12 font-light leading-relaxed">
            Experience the future of luxury eyewear. Handcrafted in Milan, 
            perfected by AI. Discover frames that don't just fit your face, 
            but define your identity.
          </p>
          <div className="flex flex-wrap gap-6">
            <button 
              onClick={handleShop}
              className="btn-primary flex items-center gap-3"
            >
              Shop Collection <ArrowRight size={18} />
            </button>
            <button 
              onClick={handleTryOn}
              className="btn-outline flex items-center gap-3 group"
            >
              <Eye size={18} className="group-hover:scale-110 transition-transform" />
              Virtual Try-On
            </button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-12 left-16 hidden lg:block">
        <div className="flex gap-12 text-[10px] uppercase tracking-[0.3em] text-white/30">
          <div className="flex flex-col gap-2">
            <span>01</span>
            <span className="text-white/60">Handcrafted Acetate</span>
          </div>
          <div className="flex flex-col gap-2">
            <span>02</span>
            <span className="text-white/60">Zeiss Optics</span>
          </div>
          <div className="flex flex-col gap-2">
            <span>03</span>
            <span className="text-white/60">Titanium Core</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Product Card ---
export const ProductCard: React.FC<{ product: Product; onAddToCart: (p: Product) => void }> = ({ product, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      navigate('/login');
    } else {
      onAddToCart(product);
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
      onClick={() => !user && navigate('/login')}
    >
      <div className="aspect-[4/5] bg-white/5 border border-white/5 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {isHovered ? (
            <motion.div 
              key="3d"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10"
            >
              <Canvas camera={{ position: [0, 0, 2], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Eyewear3D 
                  style={product.name.includes('Aviator') ? 'Aviator' : product.name.includes('Gold') ? 'Round' : 'Square'} 
                  color={product.color && product.color.includes('Gold') ? '#D4AF37' : product.color && product.color.includes('Silver') ? '#C0C0C0' : '#111'}
                />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={4} />
              </Canvas>
            </motion.div>
          ) : (
            <motion.img 
              key="image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          )}
        </AnimatePresence>
        
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 z-20">
          <button 
            onClick={handleAddToCart}
            className="p-4 bg-white text-obsidian rounded-full hover:scale-110 transition-transform"
          >
            <ShoppingBag size={20} />
          </button>
          <button 
            onClick={() => !user ? navigate('/login') : null}
            className="p-4 glass rounded-full hover:scale-110 transition-transform"
          >
            <Eye size={20} />
          </button>
        </div>
        <div className="absolute top-4 left-4 z-20">
          <span className="glass px-3 py-1 text-[10px] uppercase tracking-widest font-bold">
            {product.category}
          </span>
        </div>
      </div>
      <div className="mt-6 flex justify-between items-start">
        <div>
          <h3 className="text-xl mb-1">{product.name}</h3>
          <p className="text-xs text-white/40 uppercase tracking-widest">{product.color}</p>
        </div>
        <p className="text-lg font-mono">{formatCurrency(product.price)}</p>
      </div>
    </motion.div>
  );
};

// --- Footer ---
export const Footer: React.FC = () => {
  return (
    <footer className="bg-white/5 border-t border-white/5 py-24 px-8 sm:px-16 mt-24">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-4xl font-display mb-8">Akeela Vision</h2>
          <p className="text-white/40 max-w-sm mb-8 leading-relaxed">
            The intersection of luxury and technology. We believe that vision is 
            the most precious sense, and eyewear should be its most exquisite vessel.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/40 hover:text-white transition-colors">Instagram</a>
            <a href="#" className="text-white/40 hover:text-white transition-colors">Vogue</a>
            <Link to="/atelier" className="text-white/40 hover:text-white transition-colors">Atelier</Link>
          </div>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest font-bold mb-8">Navigation</h4>
          <ul className="flex flex-col gap-4 text-sm text-white/40">
            <li><Link to="/collections" className="hover:text-white transition-colors">Collections</Link></li>
            <li><Link to="/bespoke" className="hover:text-white transition-colors">Bespoke Service</Link></li>
            <li><Link to="/vision-ai" className="hover:text-white transition-colors">Vision AI</Link></li>
            <li><a href="#" className="hover:text-white transition-colors">Store Locator</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest font-bold mb-8">Support</h4>
          <ul className="flex flex-col gap-4 text-sm text-white/40">
            <li><a href="#" className="hover:text-white transition-colors">Care Guide</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-[0.2em] text-white/20">
        <p>© 2026 Akeela Vision. All Rights Reserved.</p>
        <div className="flex gap-8">
          <span>Terms of Service</span>
          <span>Accessibility</span>
        </div>
      </div>
    </footer>
  );
};
