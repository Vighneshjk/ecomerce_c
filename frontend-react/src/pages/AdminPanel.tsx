import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, ShoppingBag, Users, BarChart3, Settings, Plus, Search, Edit2, Trash2, Eye } from 'lucide-react';

const AdminPanel: React.FC = () => {
    const [activeTab, setActiveTab] = useState('products');

    const sidebarItems = [
        { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
        { id: 'products', label: 'Products', icon: ShoppingBag },
        { id: 'orders', label: 'Orders', icon: BarChart3 },
        { id: 'users', label: 'Customers', icon: Users },
        { id: 'settings', label: 'Store Config', icon: Settings },
    ];

    return (
        <div className="bg-white min-h-screen pt-24 pb-20 flex">
            {/* Admin Sidebar */}
            <aside className="w-80 border-r border-gray-100 flex flex-col p-8 fixed h-full bg-white z-10 overflow-hidden pt-32">
                <div className="mb-12">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-8">Admin Nexus</h2>
                    <nav className="space-y-4">
                        {sidebarItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-4 p-4 rounded-2x transition-all font-bold uppercase tracking-widest text-[10px] ${activeTab === item.id ? 'bg-akeela-black text-white shadow-xl shadow-black/10' : 'text-gray-400 hover:text-akeela-black hover:bg-gray-50'}`}
                            >
                                <item.icon size={18} />
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="mt-auto pt-8 border-t border-gray-100 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-akeela-gray/10 flex items-center justify-center font-bold text-akeela-black text-xs">AD</div>
                    <div>
                        <p className="text-xs font-black uppercase tracking-widest">Admin Site</p>
                        <p className="text-[10px] text-gray-400">System Operator</p>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 ml-80 p-12 lg:p-20 overflow-hidden">
                <div className="max-w-7xl mx-auto">

                    {activeTab === 'dashboard' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <h1 className="text-5xl font-black text-akeela-black uppercase tracking-tighter mb-12">Performance <span className="text-akeela-gold">Nexus</span></h1>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="p-10 bg-akeela-cream rounded-[3rem] border border-gray-100">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">Total Revenue</p>
                                    <h3 className="text-5xl font-black text-akeela-black">$42,500.00</h3>
                                    <p className="text-green-500 text-[10px] font-bold mt-4 uppercase tracking-widest">+12.5% vs Last Period</p>
                                </div>
                                <div className="p-10 bg-akeela-cream rounded-[3rem] border border-gray-100">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">New Members</p>
                                    <h3 className="text-5xl font-black text-akeela-black">1.2k</h3>
                                    <p className="text-akeela-gold text-[10px] font-bold mt-4 uppercase tracking-widest">+85 this week</p>
                                </div>
                                <div className="p-10 bg-akeela-cream rounded-[3rem] border border-gray-100">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">Inventory Units</p>
                                    <h3 className="text-5xl font-black text-akeela-black">840</h3>
                                    <p className="text-amber-500 text-[10px] font-bold mt-4 uppercase tracking-widest">4 SKUs low stock</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'products' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <div className="flex justify-between items-end mb-12">
                                <div>
                                    <h1 className="text-5xl font-black text-akeela-black uppercase tracking-tighter">Collection <span className="text-akeela-gold italic">Lab</span></h1>
                                    <p className="text-gray-400 mt-2 font-light">Manage and deploy premium eyewear components.</p>
                                </div>
                                <button className="btn-primary py-4 px-10 flex items-center gap-3">
                                    <Plus size={18} /> New Frame SKU
                                </button>
                            </div>

                            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
                                <div className="p-10 flex gap-6 border-b border-gray-100">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                                        <input type="text" placeholder="Search product nexus..." className="w-full bg-akeela-cream border-none rounded-2xl py-5 px-16 outline-none focus:ring-2 focus:ring-akeela-black transition-all text-xs uppercase tracking-widest font-bold" />
                                    </div>
                                    <div className="flex gap-4">
                                        <button className="px-8 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-black transition-all">Filter</button>
                                        <button className="px-8 bg-white border border-gray-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-black transition-all">Export</button>
                                    </div>
                                </div>

                                <table className="w-full">
                                    <thead className="bg-akeela-cream/50">
                                        <tr>
                                            <th className="px-10 py-6 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Product Analysis</th>
                                            <th className="px-10 py-6 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Inventory</th>
                                            <th className="px-10 py-6 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">Price</th>
                                            <th className="px-10 py-6 text-left text-[10px] font-black uppercase tracking-widest text-gray-400">AR Status</th>
                                            <th className="px-10 py-6 text-right text-[10px] font-black uppercase tracking-widest text-gray-400">Operations</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {[1, 2, 3, 4].map(idx => (
                                            <tr key={idx} className="hover:bg-akeela-cream/20 transition-colors group">
                                                <td className="px-10 py-8">
                                                    <div className="flex items-center gap-6">
                                                        <div className="w-16 h-16 bg-akeela-cream rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                                                            <img src="https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80" alt="Product" />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-akeela-black uppercase text-xs">Aviator Precision {idx}</p>
                                                            <p className="text-[10px] text-gray-400 tracking-widest uppercase mt-1">Sunglasses • Italian Acetate</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-10 py-8">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                            <div className="bg-akeela-black h-full w-[70%]"></div>
                                                        </div>
                                                        <span className="text-[10px] font-bold text-akeela-black">124 Unit</span>
                                                    </div>
                                                </td>
                                                <td className="px-10 py-8 font-black text-akeela-black text-sm">$285.00</td>
                                                <td className="px-10 py-8">
                                                    <span className="px-3 py-1 bg-green-50 text-green-600 text-[9px] font-bold uppercase tracking-widest rounded-full border border-green-100">3D Ready</span>
                                                </td>
                                                <td className="px-10 py-8 text-right">
                                                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button className="p-3 bg-white border border-gray-100 rounded-xl hover:bg-akeela-black hover:text-white transition-all"><Edit2 size={14} /></button>
                                                        <button className="p-3 bg-white border border-gray-100 rounded-xl hover:bg-akeela-black hover:text-white transition-all"><Eye size={14} /></button>
                                                        <button className="p-3 bg-white border border-red-100 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={14} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}

                </div>
            </main>
        </div>
    );
};

export default AdminPanel;
