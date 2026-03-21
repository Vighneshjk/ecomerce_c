import React from 'react';
import { motion } from 'motion/react';
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { CartItem } from '../types';
import { formatCurrency } from '../lib/utils';

export const CartModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [isProcessing, setIsProcessing] = React.useState(false);

  if (!isOpen) return null;

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      // 1. Create order on backend
      const response = await fetch('/api/orders/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('akela_access_token')}`
        },
        body: JSON.stringify({
          items: items.map(i => ({ id: i.id, quantity: i.quantity })),
          total_price: total
        })
      });

      const orderData = await response.json();

      // 2. Open Razorpay
      const options = {
        key: 'rzp_test_your_key_here', // Replace with dynamic key from backend if possible
        amount: total * 100, // paise
        currency: "INR",
        name: "Akeela Eyewear",
        description: "Bespoke Eyewear Purchase",
        image: "https://akeela.in/logo.png",
        order_id: orderData.razorpay_order_id,
        handler: function (response: any) {
          alert("Payment Successful! Order ID: " + response.razorpay_order_id);
          window.location.href = '/dashboard';
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
        },
        theme: {
          color: "#111111"
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("Checkout failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full max-w-md bg-obsidian h-full border-l border-white/10 p-8 flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-display">Your Bag</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-8 pr-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-white/40 gap-4">
              <ShoppingBag size={48} strokeWidth={1} />
              <p className="uppercase tracking-widest text-xs">Your bag is empty</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-6">
                <div className="w-24 h-32 bg-white/5 border border-white/5 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-medium">{item.name}</h3>
                      <button onClick={() => onRemove(item.id)} className="text-white/20 hover:text-white transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-xs text-white/40 uppercase tracking-widest mt-1">{item.color}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4 border border-white/10 px-3 py-1">
                      <button onClick={() => onUpdateQuantity(item.id, -1)} className="hover:text-white/60"><Minus size={14} /></button>
                      <span className="text-sm font-mono w-4 text-center">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, 1)} className="hover:text-white/60"><Plus size={14} /></button>
                    </div>
                    <p className="font-mono">{formatCurrency(item.price * item.quantity)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex justify-between items-end mb-8">
              <span className="text-xs uppercase tracking-widest text-white/40">Subtotal</span>
              <span className="text-2xl font-mono">{formatCurrency(total)}</span>
            </div>
            <button 
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full btn-primary py-5 text-sm uppercase tracking-[0.2em] font-bold disabled:opacity-50"
            >
              {isProcessing ? 'Processing...' : 'Checkout'}
            </button>
            <p className="text-[10px] text-center text-white/20 mt-6 uppercase tracking-widest">
              Complimentary shipping on all orders
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
