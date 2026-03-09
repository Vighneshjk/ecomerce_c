import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
    const { cartItemsCount } = useCart();

    return (
        <header className="fixed top-0 w-full z-50 glass-morphism shadow-sm transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-3xl font-extrabold text-akeela-black tracking-tighter hover:opacity-80 transition-all transform hover:scale-105 active:scale-95 brand-font">
                            AKEELA
                        </Link>
                    </div>


                    <nav className="hidden md:flex space-x-12">
                        <Link to="/" className="text-gray-600 hover:text-premium-black px-1 py-2 font-medium transition-colors relative group">
                            Home
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-premium-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                        </Link>
                        <Link to="/products" className="text-gray-600 hover:text-premium-black px-1 py-2 font-medium transition-colors relative group">
                            Shop
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-premium-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                        </Link>
                        <Link to="/about" className="text-gray-600 hover:text-premium-black px-1 py-2 font-medium transition-colors relative group">
                            About
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-premium-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                        </Link>
                        <Link to="/contact" className="text-gray-600 hover:text-premium-black px-1 py-2 font-medium transition-colors relative group">
                            Contact
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-premium-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                        </Link>
                    </nav>


                    <div className="flex items-center space-x-6">
                        <button className="text-gray-600 hover:text-premium-black transition-colors">
                            <Search size={22} />
                        </button>
                        <Link to="/login" className="text-gray-600 hover:text-premium-black transition-colors">
                            <User size={22} className="hover:scale-110 transition-transform" />
                        </Link>
                        <Link to="/cart" className="relative text-gray-600 hover:text-premium-black transition-colors group">
                            <ShoppingBag size={22} className="group-hover:scale-110 transition-transform" />
                            {cartItemsCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-premium-black text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full shadow-lg">
                                    {cartItemsCount}
                                </span>
                            )}
                        </Link>
                    </div>

                </div>
            </div>
        </header>
    );
};

export default Header;
