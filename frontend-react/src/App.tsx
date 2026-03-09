import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import { CartProvider } from './context/CartContext';

import About from './pages/About';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';

const App: React.FC = () => {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen bg-akeela-cream text-akeela-black font-body selection:bg-akeela-gold selection:text-white">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<Dashboard />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>




          {/* Footer Placeholder for Premium Feel */}
          <footer className="mt-20 py-20 bg-soft-gray px-6 border-t border-gray-100">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
              <div className="max-w-xs">
                <h3 className="text-3xl font-black tracking-tighter mb-6">AKILA</h3>
                <p className="text-gray-400 font-light leading-relaxed italic">The intersection of precision craftsmanship and modern vision. Experience the future of eyewear.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-20 gap-y-12">
                <div className="flex flex-col gap-4">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-premium-black mb-2">Explore</h4>
                  <Link to="/products" className="text-gray-400 hover:text-premium-black transition-colors font-light">Collection</Link>
                  <Link to="/products" className="text-gray-400 hover:text-premium-black transition-colors font-light">New Arrivals</Link>
                  <Link to="/" className="text-gray-400 hover:text-premium-black transition-colors font-light">About Us</Link>
                </div>
                <div className="flex flex-col gap-4">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-premium-black mb-2">Support</h4>
                  <span className="text-gray-400 hover:text-premium-black transition-colors font-light cursor-pointer">Shipping</span>
                  <span className="text-gray-400 hover:text-premium-black transition-colors font-light cursor-pointer">Warranty</span>
                  <span className="text-gray-400 hover:text-premium-black transition-colors font-light cursor-pointer">Contact</span>
                </div>
              </div>
            </div>
            <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-gray-200 flex flex-col md:flex-row justify-between text-xs font-bold uppercase tracking-widest text-gray-400">
              <p>© 2026 Akila Vision Labs. All Rights Reserved.</p>
              <div className="flex gap-8 mt-4 md:mt-0">
                <span>Privacy</span>
                <span>Terms</span>
                <span>Instagram</span>
              </div>
            </div>
          </footer>
        </div>
      </CartProvider>
    </Router>
  );
};

export default App;
