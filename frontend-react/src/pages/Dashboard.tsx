import React from 'react';
import { motion } from 'framer-motion';
import { Package, Heart, User, MapPin, CreditCard, LogOut, ChevronRight, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const stats = [
        { label: 'Active Orders', value: '01', icon: Package },
        { label: 'Saved Items', value: '12', icon: Heart },
        { label: 'Reward Points', value: '1,250', icon: Star },
    ];

    function Star({ size }: { size: number }) {
        return <User size={size} />; // Placeholder for Star if not imported
    }

    return (
        <div className="bg-akeela-cream min-h-screen pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Profile Header */}
                <div className="flex flex-col md:flex-row items-center gap-8 mb-16 bg-white p-10 rounded-[3.5rem] shadow-sm border border-gray-50">
                    <div className="relative group">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-akeela-cream group-hover:border-akeela-gold transition-colors duration-500">
                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
                                alt="Profile"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                        <button className="absolute bottom-0 right-0 bg-akeela-black text-white p-2 rounded-full shadow-lg hover:bg-akeela-gold transition-colors">
                            <Settings size={16} />
                        </button>
                    </div>

                    <div className="text-center md:text-left flex-1">
                        <h1 className="text-4xl font-black text-akeela-black uppercase tracking-tighter mb-2">Julian Rossi</h1>
                        <p className="text-akeela-gray font-light italic mb-6">Concierge Member since 2024</p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                            <span className="px-4 py-1.5 bg-akeela-black text-white text-[10px] font-bold uppercase tracking-widest rounded-full">VIP Status</span>
                            <span className="px-4 py-1.5 bg-akeela-gold/10 text-akeela-gold text-[10px] font-bold uppercase tracking-widest rounded-full border border-akeela-gold/20">Early Access Verified</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="btn-secondary py-3 px-8 text-xs flex items-center gap-2">
                            <LogOut size={14} /> Sign Out
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-50 group hover:shadow-xl transition-all"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-12 h-12 bg-akeela-cream rounded-2xl flex items-center justify-center text-akeela-black group-hover:bg-akeela-black group-hover:text-white transition-all">
                                    <stat.icon size={22} />
                                </div>
                                <span className="text-4xl font-black text-akeela-black group-hover:text-akeela-gold transition-colors">{stat.value}</span>
                            </div>
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-akeela-gray">{stat.label}</h3>
                        </motion.div>
                    ))}
                </div>

                {/* Dashboard Sections */}
                <div className="grid lg:grid-cols-2 gap-12">

                    {/* Recent Orders */}
                    <section className="bg-white p-10 rounded-[3.5rem] shadow-sm border border-gray-50">
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="text-2xl font-black text-akeela-black uppercase tracking-tighter">Recent Orders</h2>
                            <Link to="/account/orders" className="text-[10px] font-bold uppercase tracking-widest text-akeela-gold hover:text-akeela-black transition-colors">View All →</Link>
                        </div>
                        <div className="space-y-6">
                            {[1, 2].map(order => (
                                <div key={order} className="flex items-center gap-6 p-6 rounded-3xl bg-akeela-cream/50 hover:bg-white border border-transparent hover:border-gray-100 transition-all cursor-pointer group">
                                    <div className="w-20 h-20 bg-white rounded-2xl overflow-hidden shadow-sm">
                                        <img src="https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80" alt="Order" className="w-full h-full object-cover grayscale" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-akeela-black uppercase text-sm mb-1">Aviator Precision X</h4>
                                        <p className="text-[10px] text-akeela-gray uppercase tracking-widest mb-2">Order #AK-123456</p>
                                        <span className="px-3 py-1 bg-green-50 text-green-600 text-[9px] font-bold uppercase tracking-widest rounded-full">In Transit</span>
                                    </div>
                                    <ChevronRight size={18} className="text-gray-300 group-hover:text-akeela-black group-hover:translate-x-1 transition-all" />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Account Shortcut */}
                    <section className="space-y-8">
                        <div className="grid sm:grid-cols-2 gap-6">
                            <Link to="/account/profile" className="p-8 bg-akeela-black text-white rounded-[2.5rem] hover:bg-akeela-gold transition-all group">
                                <User className="mb-6 opacity-40 group-hover:opacity-100 transition-opacity" size={24} />
                                <h3 className="text-lg font-bold uppercase tracking-tighter">My Profile</h3>
                                <p className="text-white/40 text-xs font-light mt-1">Manage personal data</p>
                            </Link>
                            <Link to="/account/wishlist" className="p-8 bg-white text-akeela-black rounded-[2.5rem] border border-gray-100 hover:shadow-xl transition-all group">
                                <Heart className="mb-6 text-akeela-gold" size={24} />
                                <h3 className="text-lg font-bold uppercase tracking-tighter">Wishlist</h3>
                                <p className="text-akeela-gray text-xs font-light mt-1">12 items saved</p>
                            </Link>
                            <div className="p-8 bg-white text-akeela-black rounded-[2.5rem] border border-gray-100 hover:shadow-xl transition-all group">
                                <MapPin className="mb-6 text-gray-300 group-hover:text-akeela-black transition-colors" size={24} />
                                <h3 className="text-lg font-bold uppercase tracking-tighter">Addresses</h3>
                                <p className="text-akeela-gray text-xs font-light mt-1">3 locations saved</p>
                            </div>
                            <div className="p-8 bg-white text-akeela-black rounded-[2.5rem] border border-gray-100 hover:shadow-xl transition-all group">
                                <CreditCard className="mb-6 text-gray-300 group-hover:text-akeela-black transition-colors" size={24} />
                                <h3 className="text-lg font-bold uppercase tracking-tighter">Payments</h3>
                                <p className="text-akeela-gray text-xs font-light mt-1">1 card active</p>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;
