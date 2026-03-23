import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Navbar, Footer } from '../components/Layout';

export const PaymentResult: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const status = searchParams.get('status') || 'success';
  const orderNumber = searchParams.get('order') || '';
  const paymentId = searchParams.get('paymentId') || '';

  const isSuccess = status === 'success';

  return (
    <div className="min-h-screen bg-obsidian text-white">
      <Navbar cartCount={0} onCartClick={() => {}} />

      <main className="pt-32 pb-24 px-8 sm:px-16 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="glass p-16 max-w-lg w-full text-center"
        >
          {isSuccess ? (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="flex justify-center mb-8"
              >
                <CheckCircle size={72} className="text-emerald-400" strokeWidth={1} />
              </motion.div>
              <h1 className="text-4xl font-display mb-4">Payment Successful</h1>
              <p className="text-white/60 mb-2">Your order has been confirmed.</p>
              {orderNumber && (
                <p className="text-xs uppercase tracking-widest text-white/40 mb-2">
                  Order: <span className="text-white font-mono">{orderNumber}</span>
                </p>
              )}
              {paymentId && (
                <p className="text-xs uppercase tracking-widest text-white/40 mb-8">
                  Payment ID: <span className="text-white/60 font-mono text-[10px]">{paymentId}</span>
                </p>
              )}
              <p className="text-white/40 text-sm mb-12">
                A confirmation will be available in your dashboard. Our artisans will begin crafting your frames immediately.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="btn-primary flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={16} /> View Orders
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="btn-outline flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={16} /> Continue Shopping
                </button>
              </div>
            </>
          ) : (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="flex justify-center mb-8"
              >
                <XCircle size={72} className="text-rose-400" strokeWidth={1} />
              </motion.div>
              <h1 className="text-4xl font-display mb-4">Payment Failed</h1>
              <p className="text-white/60 mb-8">
                Your payment could not be processed. No amount has been charged.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/')}
                  className="btn-primary flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={16} /> Try Again
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="btn-outline flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={16} /> Go Home
                </button>
              </div>
            </>
          )}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};
