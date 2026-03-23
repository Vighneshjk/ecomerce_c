/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar, Hero, ProductCard, Footer } from './components/Layout';
import { CartModal } from './components/CartModal';
import { Product } from './types';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider, useCart } from './contexts/CartContext';
import { ProtectedRoute } from './contexts/ProtectedRoute';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { AdminPanel } from './pages/AdminPanel';
import { Collections } from './pages/Collections';
import { Bespoke } from './pages/Bespoke';
import { VisionAI } from './pages/VisionAI';
import { Atelier } from './pages/Atelier';

import { Eyewear3D, EyewearStyle } from './components/Eyewear3D';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { PaymentResult } from './pages/PaymentResult';
import { CareGuide } from './pages/CareGuide';
import { Shipping } from './pages/Shipping';
import { Privacy } from './pages/Privacy';
import { Contact } from './pages/Contact';
import { StoreLocator } from './pages/StoreLocator';

function MainApp() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { cart, isCartOpen, setIsCartOpen, addToCart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // 3D Customization State
  const [customStyle, setCustomStyle] = useState<EyewearStyle>('Square');
  const [customColor, setCustomColor] = useState('#111111');

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    fetch('/api/products/')
      .then(res => res.json())
      .then(data => {
        // Handle DRF StandardPagination results
        setProducts(data.results || data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch products:', err);
        setLoading(false);
      });
  }, []);

  // Try-on is now in Dashboard
  const handleLaunchAI = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/dashboard');
    }
  };

  const handleBespoke = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/bespoke');
    }
  };

  // Face filtering is now handled in Dashboard. Home shows everything.
  const filteredProducts = products;

  const handleFilter = (filter: string) => {
    if (!user) {
      navigate('/login');
    } else {
      console.log('Filter:', filter);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian text-white">
      <Navbar 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <main>
        <Hero onTryOn={handleLaunchAI} />

        <section className="py-32 px-8 sm:px-16">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-xl">
              <h2 className="text-xs uppercase tracking-[0.4em] text-white/40 mb-6">The Obsidian Gallery</h2>
              <h3 className="text-5xl sm:text-7xl font-display leading-tight">
                Curated for the <br /> <span className="italic font-normal text-white/40">Discerning Vision</span>
              </h3>
            </div>
            <div className="flex gap-4 text-xs uppercase tracking-widest font-bold">
              <button onClick={() => handleFilter('all')} className="px-6 py-2 border-b border-white">All</button>
              <button onClick={() => handleFilter('sunglasses')} className="px-6 py-2 border-b border-transparent text-white/40 hover:text-white transition-colors">Sunglasses</button>
              <button onClick={() => handleFilter('optical')} className="px-6 py-2 border-b border-transparent text-white/40 hover:text-white transition-colors">Optical</button>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-[4/5] bg-white/5 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <ProductCard 
                    product={product} 
                    onAddToCart={addToCart} 
                  />
                </motion.div>
              ))}
            </div>
          )}
        </section>

        <section className="py-32 px-8 sm:px-16 bg-white/5 border-y border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative aspect-square glass overflow-hidden group">
              <img 
                src="https://picsum.photos/seed/tech/1200/1200" 
                alt="AI Vision Technology"
                className="w-full h-full object-cover opacity-40 grayscale group-hover:scale-110 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 border border-white/20 rounded-full animate-ping" />
                <div className="absolute w-48 h-48 border border-white/40 rounded-full animate-pulse" />
              </div>
            </div>
            <div>
              <h2 className="text-xs uppercase tracking-[0.4em] text-white/40 mb-6">Vision AI Technology</h2>
              <h3 className="text-5xl sm:text-7xl font-display leading-tight mb-12">
                Precision <br /> <span className="italic font-normal text-white/40">Beyond Measure</span>
              </h3>
              <p className="text-lg text-white/60 mb-12 leading-relaxed font-light">
                Our proprietary AI engine analyzes 468 facial landmarks in real-time 
                 to determine your unique facial architecture. We don't just recommend 
                 frames; we engineer the perfect visual harmony between your 
                 features and our craftsmanship.
              </p>
              <button 
                onClick={handleLaunchAI}
                className="btn-primary"
              >
                Launch Vision AI
              </button>
            </div>
          </div>
        </section>

        <section className="py-32 px-8 sm:px-16 bg-obsidian relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div>
                <h2 className="text-xs uppercase tracking-[0.4em] text-white/40 mb-6">Bespoke Atelier</h2>
                <h3 className="text-5xl sm:text-7xl font-display leading-tight mb-12">
                  Design Your <br /> <span className="italic font-normal text-white/40">Signature Look</span>
                </h3>
                
                <div className="space-y-12">
                  <div>
                    <p className="text-xs uppercase tracking-widest font-bold mb-6">Select Frame Architecture</p>
                    <div className="flex gap-4">
                      {(['Square', 'Round', 'Aviator'] as EyewearStyle[]).map((style) => (
                        <button
                          key={style}
                          onClick={() => !user ? navigate('/login') : setCustomStyle(style)}
                          className={`px-8 py-4 border transition-all duration-500 text-[10px] uppercase tracking-widest ${
                            customStyle === style ? 'bg-white text-obsidian border-white' : 'border-white/10 text-white/40 hover:border-white/40'
                          }`}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-widest font-bold mb-6">Select Finish</p>
                    <div className="flex gap-6">
                      {[
                        { name: 'Obsidian', color: '#111111' },
                        { name: 'Gold', color: '#D4AF37' },
                        { name: 'Silver', color: '#C0C0C0' },
                        { name: 'Tortoise', color: '#4B3621' },
                      ].map((finish) => (
                        <button
                          key={finish.name}
                          onClick={() => !user ? navigate('/login') : setCustomColor(finish.color)}
                          className="group flex flex-col items-center gap-3"
                        >
                          <div 
                            className={`w-12 h-12 rounded-full border-2 transition-all duration-500 ${
                              customColor === finish.color ? 'border-white scale-110' : 'border-transparent'
                            }`}
                            style={{ backgroundColor: finish.color }}
                          />
                          <span className={`text-[10px] uppercase tracking-widest transition-colors ${
                            customColor === finish.color ? 'text-white' : 'text-white/20'
                          }`}>
                            {finish.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={handleBespoke}
                    className="btn-primary w-full sm:w-auto"
                  >
                    Reserve Custom Build
                  </button>
                </div>
              </div>

              <div className="relative aspect-square glass border-white/5 overflow-hidden">
                <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
                  <ambientLight intensity={0.5} />
                  <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                  <pointLight position={[-10, -10, -10]} />
                  <Eyewear3D 
                    style={customStyle} 
                    color={customColor}
                    scale={[1.5, 1.5, 1.5]}
                  />
                  <OrbitControls enableZoom={false} />
                </Canvas>
                <div className="absolute bottom-8 left-8">
                  <p className="text-[10px] uppercase tracking-[0.5em] text-white/20">360° Interactive Preview</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 px-8 sm:px-16 text-center">
          <h2 className="text-xs uppercase tracking-[0.4em] text-white/40 mb-6">The Atelier</h2>
          <h3 className="text-5xl sm:text-9xl font-display leading-none mb-12">
            Crafted in <br /> <span className="italic font-normal text-white/40">Milan</span>
          </h3>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-white/60 leading-relaxed font-light italic">
              "Eyewear is the most intimate piece of design. It sits on your face, 
              it frames your eyes, it's how you see the world and how the world 
              sees you. We treat every frame as a masterpiece."
            </p>
            <div className="mt-12 flex flex-col items-center">
              <div className="w-px h-24 bg-gradient-to-b from-white/40 to-transparent" />
              <span className="mt-6 text-[10px] uppercase tracking-[0.5em] text-white/40">Akeela Atelier</span>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <AnimatePresence>
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
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={<MainApp />} 
          />
          <Route 
            path="/collections" 
            element={
              <ProtectedRoute>
                <Collections />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/bespoke" 
            element={
              <ProtectedRoute>
                <Bespoke />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/vision-ai" 
            element={
              <ProtectedRoute>
                <VisionAI />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/atelier" 
            element={
              <ProtectedRoute>
                <Atelier />
              </ProtectedRoute>
            } 
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute adminOnly>
                <AdminPanel />
              </ProtectedRoute>
            } 
          />
          <Route path="/payment-result" element={<PaymentResult />} />
          <Route 
            path="/care-guide" 
            element={
              <ProtectedRoute>
                <CareGuide />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/shipping" 
            element={
              <ProtectedRoute>
                <Shipping />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/privacy" 
            element={
              <ProtectedRoute>
                <Privacy />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/contact" 
            element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/store-locator" 
            element={
              <ProtectedRoute>
                <StoreLocator />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}



