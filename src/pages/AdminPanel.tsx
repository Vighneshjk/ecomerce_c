import React from 'react';
import { motion } from 'motion/react';
import { Navbar, Footer } from '../components/Layout';
import { 
  BarChart3, 
  Users, 
  ShoppingBag, 
  Settings, 
  Plus, 
  Search, 
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const stats = [
    { label: 'Total Revenue', value: '$124,820', change: '+12.5%', trend: 'up' },
    { label: 'Active Users', value: '1,240', change: '+5.2%', trend: 'up' },
    { label: 'Orders', value: '482', change: '-2.1%', trend: 'down' },
    { label: 'Conversion', value: '3.2%', change: '+0.8%', trend: 'up' },
  ];

  return (
    <div className="min-h-screen bg-obsidian text-white">
      <Navbar cartCount={0} onCartClick={() => {}} />
      
      <main className="pt-32 pb-24 px-8 sm:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div>
              <h1 className="text-5xl sm:text-7xl font-display mb-4">Atelier Admin</h1>
              <p className="text-white/40 uppercase tracking-[0.3em] text-xs">System Overview & Management</p>
            </div>
            <div className="flex gap-4">
              <button className="btn-outline py-3 px-6 flex items-center gap-2 text-xs uppercase tracking-widest">
                <BarChart3 size={14} /> Export Data
              </button>
              <button className="btn-primary py-3 px-6 flex items-center gap-2 text-xs uppercase tracking-widest">
                <Plus size={14} /> New Product
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass p-8"
              >
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2">{stat.label}</p>
                <div className="flex items-end justify-between">
                  <p className="text-3xl font-mono">{stat.value}</p>
                  <div className={`flex items-center gap-1 text-[10px] font-bold ${stat.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {stat.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {stat.change}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Inventory Management */}
            <div className="lg:col-span-2 glass p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-display">Inventory</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={14} />
                  <input 
                    type="text" 
                    placeholder="Search products..."
                    className="bg-white/5 border border-white/10 pl-10 pr-4 py-2 text-xs outline-none focus:border-white/40 transition-all"
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-widest text-white/40 border-b border-white/5">
                      <th className="pb-4 font-bold">Product</th>
                      <th className="pb-4 font-bold">Category</th>
                      <th className="pb-4 font-bold">Price</th>
                      <th className="pb-4 font-bold">Stock</th>
                      <th className="pb-4 font-bold">Status</th>
                      <th className="pb-4"></th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {[
                      { name: 'Obsidian Prime', cat: 'Sunglasses', price: '$249', stock: 42, status: 'Active' },
                      { name: 'Aether Gold', cat: 'Luxury', price: '$329', stock: 12, status: 'Low Stock' },
                      { name: 'Lunar Silver', cat: 'Optical', price: '$189', stock: 85, status: 'Active' },
                    ].map((item, i) => (
                      <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                        <td className="py-4 flex items-center gap-3">
                          <div className="w-8 h-10 bg-white/5" />
                          <span className="font-medium">{item.name}</span>
                        </td>
                        <td className="py-4 text-white/60">{item.cat}</td>
                        <td className="py-4 font-mono">{item.price}</td>
                        <td className="py-4 text-white/60">{item.stock}</td>
                        <td className="py-4">
                          <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${
                            item.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <button className="text-white/20 hover:text-white transition-colors">
                            <MoreVertical size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass p-8">
              <h3 className="text-xl font-display mb-8">Recent Activity</h3>
              <div className="space-y-6">
                {[
                  { user: 'Sarah J.', action: 'Purchased Obsidian Prime', time: '2m ago' },
                  { user: 'Marcus K.', action: 'New face analysis completed', time: '15m ago' },
                  { user: 'Elena R.', action: 'Registered new account', time: '1h ago' },
                  { user: 'David W.', action: 'Added Aether Gold to bag', time: '3h ago' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-bold">
                      {item.user.split(' ')[0][0]}
                    </div>
                    <div>
                      <p className="text-xs">
                        <span className="font-bold">{item.user}</span> {item.action}
                      </p>
                      <p className="text-[10px] text-white/20 uppercase tracking-widest mt-1">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
