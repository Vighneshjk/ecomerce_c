import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar, Footer } from '../components/Layout';
import { apiFetch } from '../services/api';
import {
  BarChart3, Users, ShoppingBag, CreditCard, CheckCircle,
  XCircle, Trash2, Search, ArrowUpRight, ArrowDownRight,
  RefreshCw, Shield, Eye, Plus, Edit2, X, Save
} from 'lucide-react';

type ActiveTab = 'overview' | 'users' | 'transactions' | 'products';

interface UserRow {
  id: number;
  email: string;
  name: string;
  phone: string;
  role: string;
  is_active: boolean;
  date_joined: string;
  analytics?: {
    total_orders: number;
    total_spent: string;
    last_order: string | null;
  };
}

interface TransactionRow {
  id: number;
  order_number: string;
  user_id: number;
  user_email: string;
  user_name: string;
  status: string;
  payment_status: string;
  payment_method: string;
  payment_id: string;
  total: string;
  item_count: number;
  created_at: string;
  paid_at: string | null;
  items?: {
    id: number;
    name: string;
    qty: number;
    price: string;
    color: string;
  }[];
  shipping_address?: string | null;
}

interface ProductRow {
  id: number;
  name: string;
  slug: string;
  sku: string;
  price: string;
  compare_price: string | null;
  stock: number;
  category: string;
  gender: string;
  frame_shape: string;
  frame_material: string;
  rim_type: string;
  description: string;
  short_description: string;
  is_active: boolean;
  is_featured: boolean;
  is_new_arrival: boolean;
  primary_image?: { image: string };
  variants: any[];
}



export const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [users, setUsers] = useState<UserRow[]>([]);
  const [transactions, setTransactions] = useState<TransactionRow[]>([]);
  const [products, setProducts] = useState<ProductRow[]>([]);
  
  const [userSearch, setUserSearch] = useState('');
  const [txSearch, setTxSearch] = useState('');
  const [productSearch, setProductSearch] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionRow | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserRow | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiFetch('/api/auth/admin/users/');
      if (res.ok) setUsers(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiFetch('/api/auth/admin/transactions/');
      if (res.ok) setTransactions(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiFetch('/api/products/');
      const data = await res.json();
      if (res.ok) setProducts(data.results || data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'users') fetchUsers();
    if (activeTab === 'transactions') fetchTransactions();
    if (activeTab === 'products') fetchProducts();
    if (activeTab === 'overview') { fetchUsers(); fetchTransactions(); fetchProducts(); }
  }, [activeTab, fetchUsers, fetchTransactions, fetchProducts]);

  const handleUserAction = async (userId: number, action: 'approve' | 'disable') => {
    const res = await apiFetch(`/api/auth/admin/users/${userId}/`, {
      method: 'PATCH',
      body: JSON.stringify({ action }),
    });
    if (res.ok) {
      showToast(action === 'approve' ? '✅ User approved.' : '🔒 User disabled.');
      fetchUsers();
    }
  };

  const handleDeleteUser = async (userId: number, email: string) => {
    if (!window.confirm(`Delete user ${email}? This cannot be undone.`)) return;
    const res = await apiFetch(`/api/auth/admin/users/${userId}/`, {
      method: 'DELETE',
    });
    if (res.ok) {
      showToast(`🗑 User ${email} deleted.`);
      fetchUsers();
    }
  };

  const handleDeleteProduct = async (productSlug: string, productName: string) => {
    if (!window.confirm(`Delete product ${productName}? This cannot be undone.`)) return;
    const res = await apiFetch(`/api/products/${productSlug}/`, {
      method: 'DELETE',
    });
    if (res.ok) {
      showToast(`🗑 Product ${productName} deleted.`);
      fetchProducts();
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    
    const isNew = !editingProduct.slug;
    const url = isNew ? '/api/products/' : `/api/products/${editingProduct.slug}/`;
    const method = isNew ? 'POST' : 'PUT';
    
    try {
      const res = await apiFetch(url, {
        method,
        body: JSON.stringify(editingProduct),
      });
      
      if (res.ok) {
        showToast(isNew ? '✅ Product created.' : '✅ Product updated.');
        setIsProductModalOpen(false);
        setEditingProduct(null);
        fetchProducts();
      } else {
        const err = await res.json();
        showToast(`❌ Error: ${JSON.stringify(err)}`);
      }
    } catch (err) {
      showToast('❌ Failed to save product.');
    }
  };

  const fetchUserDetails = async (userId: number) => {
    setLoadingDetails(true);
    try {
      const res = await apiFetch(`/api/auth/admin/users/${userId}/`);
      if (res.ok) {
        const data = await res.json();
        setSelectedUser(data);
      }
    } catch (err) {
      showToast('❌ Failed to fetch user details.');
    } finally {
      setLoadingDetails(false);
    }
  };

  const openProductModal = (product: Partial<ProductRow> | null) => {
    setEditingProduct(product || {
      name: '',
      sku: '',
      price: '',
      stock: 0,
      category: 'sunglasses',
      gender: 'unisex',
      frame_shape: 'square',
      frame_material: 'acetate',
      rim_type: 'full_rim',
      is_active: true,
      description: '',
      short_description: ''
    });
    setIsProductModalOpen(true);
  };

  const filteredUsers = users.filter(u =>
    u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.name.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredTx = transactions.filter(t =>
    t.order_number.toLowerCase().includes(txSearch.toLowerCase()) ||
    t.user_email.toLowerCase().includes(txSearch.toLowerCase()) ||
    t.payment_id.toLowerCase().includes(txSearch.toLowerCase())
  );

  const filteredProductsList = products.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.sku.toLowerCase().includes(productSearch.toLowerCase())
  );

  // Stats
  const totalRevenue = transactions
    .filter(t => t.payment_status === 'paid')
    .reduce((s, t) => s + parseFloat(t.total), 0);
  const activeUsers = users.filter(u => u.is_active).length;
  const totalOrders = transactions.length;
  const paidOrders = transactions.filter(t => t.payment_status === 'paid').length;

  const stats = [
    { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString('en-IN')}`, change: paidOrders + ' paid', trend: 'up' as const, icon: CreditCard },
    { label: 'Active Users', value: String(activeUsers), change: users.length + ' total', trend: 'up' as const, icon: Users },
    { label: 'Total Orders', value: String(totalOrders), change: paidOrders + ' confirmed', trend: 'up' as const, icon: ShoppingBag },
    { label: 'Pending', value: String(transactions.filter(t => t.payment_status === 'unpaid').length), change: 'unpaid orders', trend: 'down' as const, icon: BarChart3 },
  ];

  const tabs: { key: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { key: 'overview',      label: 'Overview',      icon: <BarChart3 size={14} /> },
    { key: 'products',      label: 'Inventory',      icon: <ShoppingBag size={14} /> },
    { key: 'users',         label: 'Users',          icon: <Users size={14} /> },
    { key: 'transactions',  label: 'Transactions',   icon: <CreditCard size={14} /> },
  ];

  return (
    <div className="min-h-screen bg-obsidian text-white">
      <Navbar cartCount={0} onCartClick={() => {}} />

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-white text-obsidian px-6 py-3 text-xs uppercase tracking-widest font-bold shadow-2xl"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-32 pb-24 px-8 sm:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Shield size={14} className="text-white/40" />
                <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">Admin Panel</span>
              </div>
              <h1 className="text-5xl sm:text-7xl font-display">Atelier Admin</h1>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => { fetchUsers(); fetchTransactions(); fetchProducts(); }}
                className="btn-outline py-3 px-6 flex items-center gap-2 text-xs uppercase tracking-widest"
              >
                <RefreshCw size={14} /> Refresh
              </button>
              {activeTab === 'products' && (
                <button
                  onClick={() => openProductModal(null)}
                  className="btn-primary py-3 px-6 flex items-center gap-2 text-xs uppercase tracking-widest"
                >
                  <Plus size={14} /> Add Product
                </button>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-12 border-b border-white/10">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-widest transition-all border-b-2 -mb-px ${
                  activeTab === tab.key
                    ? 'border-white text-white'
                    : 'border-transparent text-white/30 hover:text-white/60'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* ─── OVERVIEW ───────────────────────────────────────────── */}
          {activeTab === 'overview' && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="glass p-8"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-[10px] uppercase tracking-widest text-white/40">{stat.label}</p>
                      <stat.icon size={14} className="text-white/20" />
                    </div>
                    <p className="text-3xl font-mono mb-2">{stat.value}</p>
                    <div className={`flex items-center gap-1 text-[10px] font-bold ${stat.trend === 'up' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {stat.trend === 'up' ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                      {stat.change}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Recent Transactions Summary */}
              <div className="glass p-8">
                <h3 className="text-xl font-display mb-6">Recent Transactions</h3>
                {loading ? (
                  <div className="space-y-4">
                    {[1,2,3].map(i => <div key={i} className="h-10 bg-white/5 animate-pulse rounded" />)}
                  </div>
                ) : transactions.slice(0, 5).length === 0 ? (
                  <p className="text-white/30 text-sm">No transactions yet.</p>
                ) : (
                  <div className="space-y-4">
                    {transactions.slice(0, 5).map(t => (
                      <div key={t.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                        <div>
                          <p className="text-sm font-mono">{t.order_number}</p>
                          <p className="text-xs text-white/40">{t.user_name} · {t.user_email}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-mono">₹{parseFloat(t.total).toLocaleString('en-IN')}</p>
                          <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full ${
                            t.payment_status === 'paid' ? 'bg-emerald-500/10 text-emerald-400' :
                            t.payment_status === 'failed' ? 'bg-rose-500/10 text-rose-400' :
                            'bg-amber-500/10 text-amber-400'
                          }`}>
                            {t.payment_status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ─── PRODUCTS ──────────────────────────────────────────── */}
          {activeTab === 'products' && (
            <div className="glass p-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <h3 className="text-2xl font-display">Product Inventory</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={14} />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={productSearch}
                    onChange={e => setProductSearch(e.target.value)}
                    className="bg-white/5 border border-white/10 pl-10 pr-4 py-2 text-xs outline-none focus:border-white/40 transition-all w-72"
                  />
                </div>
              </div>
              {loading && !isProductModalOpen ? (
                <div className="space-y-4">
                  {[1,2,3,4].map(i => <div key={i} className="h-12 bg-white/5 animate-pulse rounded" />)}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] uppercase tracking-widest text-white/30 border-b border-white/5">
                        <th className="pb-4 font-bold">Product</th>
                        <th className="pb-4 font-bold">Category</th>
                        <th className="pb-4 font-bold">Price</th>
                        <th className="pb-4 font-bold">Stock</th>
                        <th className="pb-4 font-bold">Status</th>
                        <th className="pb-4 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {filteredProductsList.map(p => (
                        <tr key={p.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-10 bg-white/5">
                                {p.primary_image && <img src={p.primary_image.image} alt={p.name} className="w-full h-full object-cover grayscale" />}
                              </div>
                              <div>
                                <p className="font-medium text-xs">{p.name}</p>
                                <p className="text-[10px] text-white/40 uppercase tracking-widest">{p.sku}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 text-white/50 text-xs capitalize">{p.category}</td>
                          <td className="py-4 font-mono text-xs">₹{parseFloat(p.price).toLocaleString('en-IN')}</td>
                          <td className="py-4">
                            <span className={`font-mono text-xs ${p.stock < 10 ? 'text-amber-400' : 'text-white/50'}`}>
                              {p.stock}
                            </span>
                          </td>
                          <td className="py-4">
                             <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full ${
                              p.is_active ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                            }`}>{p.is_active ? 'Active' : 'Inactive'}</span>
                          </td>
                          <td className="py-4 text-right">
                             <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => openProductModal(p)}
                                  className="p-1.5 bg-white/5 text-white/40 hover:text-white rounded transition"
                                >
                                  <Edit2 size={13} />
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(p.slug, p.name)}
                                  className="p-1.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 rounded transition"
                                >
                                  <Trash2 size={13} />
                                </button>
                             </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ─── USERS ──────────────────────────────────────────────── */}
          {activeTab === 'users' && (
            <div className="glass p-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <h3 className="text-2xl font-display">User Management</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={14} />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={userSearch}
                    onChange={e => setUserSearch(e.target.value)}
                    className="bg-white/5 border border-white/10 pl-10 pr-4 py-2 text-xs outline-none focus:border-white/40 transition-all"
                  />
                </div>
              </div>
              {loading ? (
                <div className="space-y-4">
                  {[1,2,3,4].map(i => <div key={i} className="h-12 bg-white/5 animate-pulse rounded" />)}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] uppercase tracking-widest text-white/30 border-b border-white/5">
                        <th className="pb-4 font-bold">Name / Email</th>
                        <th className="pb-4 font-bold">Phone</th>
                        <th className="pb-4 font-bold">Role</th>
                        <th className="pb-4 font-bold">Status</th>
                        <th className="pb-4 font-bold">Joined</th>
                        <th className="pb-4 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {filteredUsers.length === 0 ? (
                        <tr><td colSpan={6} className="py-8 text-center text-white/30">No users found.</td></tr>
                      ) : filteredUsers.map(u => (
                        <tr key={u.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                          <td className="py-4 cursor-pointer" onClick={() => fetchUserDetails(u.id)}>
                            <p className="font-medium hover:text-white transition-colors underline underline-offset-4 decoration-white/10">{u.name}</p>
                            <p className="text-xs text-white/40">{u.email}</p>
                          </td>
                          <td className="py-4 text-white/50 text-xs">{u.phone || '—'}</td>
                          <td className="py-4">
                            <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full ${
                              u.role === 'admin' ? 'bg-violet-500/10 text-violet-400' : 'bg-white/5 text-white/50'
                            }`}>{u.role}</span>
                          </td>
                          <td className="py-4">
                            <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full flex items-center gap-1 w-fit ${
                              u.is_active ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                            }`}>
                              {u.is_active ? <CheckCircle size={10} /> : <XCircle size={10} />}
                              {u.is_active ? 'Active' : 'Disabled'}
                            </span>
                          </td>
                          <td className="py-4 text-white/40 text-xs">
                            {new Date(u.date_joined).toLocaleDateString('en-IN')}
                          </td>
                          <td className="py-4 text-right">
                            {u.role !== 'admin' && (
                              <div className="flex items-center justify-end gap-2">
                                {u.is_active ? (
                                  <button
                                    onClick={() => handleUserAction(u.id, 'disable')}
                                    title="Disable"
                                    className="p-1.5 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 rounded transition"
                                  >
                                    <XCircle size={14} />
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => handleUserAction(u.id, 'approve')}
                                    title="Approve"
                                    className="p-1.5 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 rounded transition"
                                  >
                                    <CheckCircle size={14} />
                                  </button>
                                )}
                                <button
                                  onClick={() => handleDeleteUser(u.id, u.email)}
                                  title="Delete"
                                  className="p-1.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 rounded transition"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            )}
                            {u.role === 'admin' && (
                              <span className="text-[10px] text-white/20 uppercase tracking-widest">Protected</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ─── TRANSACTIONS ────────────────────────────────────────── */}
          {activeTab === 'transactions' && (
            <div className="glass p-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <h3 className="text-2xl font-display">Transaction History</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={14} />
                  <input
                    type="text"
                    placeholder="Search orders, emails, payment IDs..."
                    value={txSearch}
                    onChange={e => setTxSearch(e.target.value)}
                    className="bg-white/5 border border-white/10 pl-10 pr-4 py-2 text-xs outline-none focus:border-white/40 transition-all w-72"
                  />
                </div>
              </div>
              {loading ? (
                <div className="space-y-4">
                  {[1,2,3,4].map(i => <div key={i} className="h-12 bg-white/5 animate-pulse rounded" />)}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[10px] uppercase tracking-widest text-white/30 border-b border-white/5">
                        <th className="pb-4 font-bold">Order #</th>
                        <th className="pb-4 font-bold">Customer</th>
                        <th className="pb-4 font-bold">Amount</th>
                        <th className="pb-4 font-bold">Method</th>
                        <th className="pb-4 font-bold">Payment</th>
                        <th className="pb-4 font-bold">Date</th>
                        <th className="pb-4 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {filteredTx.length === 0 ? (
                        <tr><td colSpan={8} className="py-8 text-center text-white/30">No transactions found.</td></tr>
                      ) : filteredTx.map(t => (
                        <tr key={t.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group">
                          <td className="py-4 font-mono text-xs">{t.order_number}</td>
                          <td className="py-4 cursor-pointer" onClick={() => fetchUserDetails(t.user_id)}>
                            <p className="font-medium text-xs hover:text-white transition-colors underline underline-offset-4 decoration-white/10">{t.user_name}</p>
                            <p className="text-[10px] text-white/40">{t.user_email}</p>
                          </td>
                          <td className="py-4 font-mono text-sm font-bold text-white">
                            ₹{parseFloat(t.total).toLocaleString('en-IN')}
                          </td>
                          <td className="py-4 text-white/50 text-xs capitalize">{t.payment_method || '—'}</td>
                          <td className="py-4">
                            <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full ${
                              t.payment_status === 'paid'    ? 'bg-emerald-500/10 text-emerald-400' :
                              t.payment_status === 'failed'  ? 'bg-rose-500/10 text-rose-400' :
                              t.payment_status === 'refunded'? 'bg-violet-500/10 text-violet-400' :
                              'bg-amber-500/10 text-amber-400'
                            }`}>
                              {t.payment_status}
                            </span>
                          </td>
                          <td className="py-4 text-white/40 text-[10px] uppercase tracking-widest leading-tight">
                            {new Date(t.created_at).toLocaleDateString('en-IN')}<br/>
                            {new Date(t.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                          </td>
                          <td className="py-4 text-right">
                             <button 
                               onClick={() => setSelectedTransaction(t)}
                               className="text-[10px] uppercase tracking-widest font-bold text-white/20 hover:text-white transition-colors"
                             >
                               Details
                             </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Product Management Modal */}
      <AnimatePresence>
        {isProductModalOpen && editingProduct && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/95 backdrop-blur-sm"
              onClick={() => setIsProductModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-obsidian border border-white/10 rounded-xl overflow-hidden shadow-2xl"
            >
              <div className="px-8 py-6 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-2xl font-display">{editingProduct.id ? 'Edit Product' : 'New Product'}</h2>
                <button onClick={() => setIsProductModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition">
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handleSaveProduct} className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40">Product Name</label>
                    <input 
                      type="text" required
                      value={editingProduct.name || ''}
                      onChange={e => setEditingProduct({...editingProduct, name: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-white/40 transition" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40">SKU</label>
                    <input 
                      type="text" required
                      value={editingProduct.sku || ''}
                      onChange={e => setEditingProduct({...editingProduct, sku: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-white/40 transition" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40">Price (INR)</label>
                    <input 
                      type="number" required
                      value={editingProduct.price || ''}
                      onChange={e => setEditingProduct({...editingProduct, price: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-white/40 transition font-mono" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40">Stock Quantity</label>
                    <input 
                      type="number" required
                      value={editingProduct.stock || 0}
                      onChange={e => setEditingProduct({...editingProduct, stock: parseInt(e.target.value)})}
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-white/40 transition font-mono" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40">Category</label>
                    <select
                      value={editingProduct.category || 'sunglasses'}
                      onChange={e => setEditingProduct({...editingProduct, category: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-white/40 transition appearance-none"
                    >
                      <option value="sunglasses">Sunglasses</option>
                      <option value="eyeglasses">Eyeglasses</option>
                      <option value="bluelight">Blue Light</option>
                      <option value="sports">Sports</option>
                      <option value="kids">Kids</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40">Gender</label>
                    <select
                      value={editingProduct.gender || 'unisex'}
                      onChange={e => setEditingProduct({...editingProduct, gender: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-white/40 transition appearance-none"
                    >
                      <option value="unisex">Unisex</option>
                      <option value="men">Men</option>
                      <option value="women">Women</option>
                      <option value="kids">Kids</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40">Shape</label>
                    <select
                      value={editingProduct.frame_shape || 'square'}
                      onChange={e => setEditingProduct({...editingProduct, frame_shape: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-white/40 transition appearance-none"
                    >
                      <option value="square">Square</option>
                      <option value="round">Round</option>
                      <option value="rectangle">Rectangle</option>
                      <option value="aviator">Aviator</option>
                      <option value="wayfarer">Wayfarer</option>
                      <option value="cat_eye">Cat Eye</option>
                      <option value="oval">Oval</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40">Material</label>
                    <select
                      value={editingProduct.frame_material || 'acetate'}
                      onChange={e => setEditingProduct({...editingProduct, frame_material: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-white/40 transition appearance-none"
                    >
                      <option value="acetate">Acetate</option>
                      <option value="metal">Metal</option>
                      <option value="titanium">Titanium</option>
                      <option value="tr90">TR90</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-white/40">Rim Type</label>
                    <select
                      value={editingProduct.rim_type || 'full_rim'}
                      onChange={e => setEditingProduct({...editingProduct, rim_type: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-white/40 transition appearance-none"
                    >
                      <option value="full_rim">Full Rim</option>
                      <option value="half_rim">Half Rim</option>
                      <option value="rimless">Rimless</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2 mt-6">
                  <label className="text-[10px] uppercase tracking-widest text-white/40">Short Description</label>
                  <textarea 
                    value={editingProduct.short_description || ''}
                    onChange={e => setEditingProduct({...editingProduct, short_description: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-white/40 transition h-20 resize-none" 
                  />
                </div>
                
                <div className="space-y-2 mt-6">
                  <label className="text-[10px] uppercase tracking-widest text-white/40">Full Description</label>
                  <textarea 
                    value={editingProduct.description || ''}
                    onChange={e => setEditingProduct({...editingProduct, description: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-white/40 transition h-32 resize-none" 
                  />
                </div>

                <div className="flex gap-6 mt-8">
                   <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={editingProduct.is_active}
                        onChange={e => setEditingProduct({...editingProduct, is_active: e.target.checked})}
                        className="w-4 h-4 accent-white bg-white/5 border-white/10"
                      />
                      <span className="text-[10px] uppercase tracking-widest text-white/60">Active</span>
                   </label>
                   <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={editingProduct.is_featured}
                        onChange={e => setEditingProduct({...editingProduct, is_featured: e.target.checked})}
                        className="w-4 h-4 accent-white bg-white/5 border-white/10"
                      />
                      <span className="text-[10px] uppercase tracking-widest text-white/60">Featured</span>
                   </label>
                   <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={editingProduct.is_new_arrival}
                        onChange={e => setEditingProduct({...editingProduct, is_new_arrival: e.target.checked})}
                        className="w-4 h-4 accent-white bg-white/5 border-white/10"
                      />
                      <span className="text-[10px] uppercase tracking-widest text-white/60">New Arrival</span>
                   </label>
                </div>

                <div className="mt-12 flex gap-4">
                  <button type="submit" className="flex-1 btn-primary flex items-center justify-center gap-2 py-4">
                    <Save size={16} /> Save Product
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setIsProductModalOpen(false)}
                    className="flex-1 btn-outline py-4"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Transaction Details Modal */}
      <AnimatePresence>
        {selectedTransaction && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTransaction(null)}
              className="absolute inset-0 bg-obsidian/95 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-obsidian border border-white/10 p-12 shadow-2xl overflow-hidden"
            >
              <div className="flex justify-between items-start mb-12">
                <div>
                   <h2 className="text-3xl font-display mb-2">Order Detail</h2>
                   <p className="text-xs uppercase tracking-[0.3em] font-mono text-white/40">{selectedTransaction.order_number}</p>
                </div>
                <button onClick={() => setSelectedTransaction(null)} className="p-2 hover:bg-white/5 rounded-full transition">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-12 h-96 overflow-y-auto custom-scrollbar pr-4">
                 <div>
                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-white/40 mb-6">Line Items</h4>
                    <div className="space-y-6">
                       {selectedTransaction.items?.map((item: any) => (
                         <div key={item.id} className="flex justify-between items-center text-sm">
                            <div className="flex gap-4 items-center">
                               <div className="w-8 h-10 bg-white/5 flex items-center justify-center">
                                  <ShoppingBag size={12} className="text-white/20" />
                               </div>
                               <div>
                                  <p>{item.name}</p>
                                  <p className="text-[10px] text-white/40 uppercase tracking-widest">Qty: {item.qty} · {item.color}</p>
                               </div>
                            </div>
                            <span className="font-mono">₹{parseFloat(item.price).toLocaleString('en-IN')}</span>
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-12 pt-12 border-t border-white/5">
                    <div>
                       <h4 className="text-[10px] uppercase tracking-widest font-bold text-white/40 mb-4">Payment Detail</h4>
                       <p className="text-sm mb-1 uppercase tracking-widest">{selectedTransaction.payment_method}</p>
                       <p className="text-[10px] font-mono text-white/40 truncate">{selectedTransaction.payment_id || 'No Payment ID'}</p>
                    </div>
                    <div>
                       <h4 className="text-[10px] uppercase tracking-widest font-bold text-white/40 mb-4">Shipping To</h4>
                       <p className="text-sm leading-relaxed text-white/60">{selectedTransaction.shipping_address || 'Standard Atelier Pickup'}</p>
                    </div>
                 </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center">
                 <span className="text-xs uppercase tracking-[0.2em] text-white/40">Total Confirmed</span>
                 <span className="text-3xl font-display">₹{parseFloat(selectedTransaction.total).toLocaleString('en-IN')}</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* User Details Modal */}
      <AnimatePresence>
        {selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedUser(null)}
              className="absolute inset-0 bg-obsidian/95 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-obsidian border border-white/10 p-12 shadow-2xl"
            >
              <div className="flex justify-between items-start mb-12">
                <div>
                   <h2 className="text-3xl font-display mb-2">{selectedUser.name}</h2>
                   <p className="text-xs uppercase tracking-[0.2em] text-white/40">{selectedUser.email}</p>
                </div>
                <button onClick={() => setSelectedUser(null)} className="p-2 hover:bg-white/5 rounded-full transition">
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-12">
                 <div className="glass p-6">
                    <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Total Confirmed Spend</p>
                    <p className="text-2xl font-display text-white">₹{parseFloat(selectedUser.analytics?.total_spent || '0').toLocaleString('en-IN')}</p>
                 </div>
                 <div className="glass p-6">
                    <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2">Order Count</p>
                    <p className="text-2xl font-display text-white">{selectedUser.analytics?.total_orders || 0}</p>
                 </div>
              </div>

              <div className="space-y-6 pt-12 border-t border-white/10">
                 <div className="flex justify-between text-xs">
                    <span className="text-white/40 uppercase tracking-widest">Account Status</span>
                    <span className={selectedUser.is_active ? 'text-emerald-400' : 'text-rose-400'}>{selectedUser.is_active ? 'ACTIVE' : 'DISABLED'}</span>
                 </div>
                 <div className="flex justify-between text-xs">
                    <span className="text-white/40 uppercase tracking-widest">Member Since</span>
                    <span>{new Date(selectedUser.date_joined).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                 </div>
                 <div className="flex justify-between text-xs">
                    <span className="text-white/40 uppercase tracking-widest">Last Order</span>
                    <span>{selectedUser.analytics?.last_order ? new Date(selectedUser.analytics.last_order).toLocaleDateString('en-IN') : 'Never'}</span>
                 </div>
              </div>

              <div className="mt-12">
                 <button 
                  onClick={() => setSelectedUser(null)}
                  className="btn-outline w-full py-4 text-[10px] uppercase tracking-[0.3em]"
                 >
                   Dismiss Profile
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
};
