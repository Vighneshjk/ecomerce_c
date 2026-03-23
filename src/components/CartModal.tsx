import React from 'react';
import { motion } from 'motion/react';
import { X, ShoppingBag, Trash2, Plus, Minus, CreditCard, Lock } from 'lucide-react';
import { CartItem } from '../types';
import { formatCurrency } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';

export const CartModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const { user } = useAuth();
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal >= 999 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  const [isProcessing, setIsProcessing] = React.useState(false);
  const [error, setError] = React.useState('');

  if (!isOpen) return null;

  const handleCheckout = async () => {
    if (!user) {
      window.location.href = '/login';
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const token = localStorage.getItem('akela_access_token');

      // 1. Create order via backend → returns order_number
      const orderRes = await fetch('/api/orders/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: items.map(i => ({ id: i.id, quantity: i.quantity })),
          payment_method: 'razorpay',
        }),
      });

      if (!orderRes.ok) {
        const errData = await orderRes.json();
        throw new Error(errData.error || errData.detail || 'Failed to create order.');
      }

      const orderData = await orderRes.json();
      const orderNumber = orderData.order_number || orderData.id;

      // 2. Create Razorpay order → get rzp order_id and key
      const rzpRes = await fetch('/api/payments/razorpay/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ order_number: orderNumber }),
      });

      if (!rzpRes.ok) {
        const errData = await rzpRes.json();
        throw new Error(errData.error || 'Failed to initiate payment.');
      }

      const rzpData = await rzpRes.json();

      // 3. Open Razorpay checkout
      const options = {
        key: rzpData.key,
        amount: rzpData.amount,
        currency: rzpData.currency || 'INR',
        name: 'Akeela Eyewear',
        description: `Order ${orderNumber}`,
        image: '/favicon.ico',
        order_id: rzpData.id,
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: '#ffffff',
          backdrop_color: 'rgba(0,0,0,0.9)',
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          },
        },
        handler: async (response: any) => {
          try {
            // 4. Verify payment
            const verifyRes = await fetch('/api/payments/razorpay/verify/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify({
                razorpay_order_id:   response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature:  response.razorpay_signature,
                order_number:        orderNumber,
              }),
            });

            if (verifyRes.ok) {
              onClose();
              window.location.href = `/payment-result?status=success&order=${orderNumber}&paymentId=${response.razorpay_payment_id}`;
            } else {
              window.location.href = `/payment-result?status=failed&order=${orderNumber}`;
            }
          } catch {
            window.location.href = `/payment-result?status=failed&order=${orderNumber}`;
          }
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', () => {
        window.location.href = `/payment-result?status=failed&order=${orderNumber}`;
      });
      rzp.open();
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError(err.message || 'Checkout failed. Please try again.');
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
            {/* Order summary */}
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-xs text-white/40 uppercase tracking-widest">
                <span>Subtotal</span>
                <span className="font-mono text-white">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-xs text-white/40 uppercase tracking-widest">
                <span>Shipping</span>
                <span className="font-mono text-white">{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
              </div>
              <div className="flex justify-between text-xs text-white/40 uppercase tracking-widest">
                <span>GST (18%)</span>
                <span className="font-mono text-white">{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between items-end pt-2 border-t border-white/10">
                <span className="text-xs uppercase tracking-widest text-white/40">Total</span>
                <span className="text-2xl font-mono">{formatCurrency(total)}</span>
              </div>
            </div>

            {error && (
              <p className="text-rose-400 text-xs mb-4 text-center uppercase tracking-wide">{error}</p>
            )}

            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full btn-primary py-5 text-sm uppercase tracking-[0.2em] font-bold disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Processing...
                </span>
              ) : (
                <>
                  <CreditCard size={16} />
                  {user ? 'Pay with Razorpay' : 'Login to Checkout'}
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 mt-4 text-white/20">
              <Lock size={10} />
              <p className="text-[10px] uppercase tracking-widest">
                Secured by Razorpay · SSL Encrypted
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
