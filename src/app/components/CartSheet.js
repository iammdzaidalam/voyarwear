'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { X, Minus, Plus, ArrowRight } from 'lucide-react';
import { SignInButton, useAuth } from '../../hooks/useAuthSafe';
import { useStore } from '../store/useStore';

export default function CartSheet() {
  const { cart, isCartOpen, setCartOpen, removeFromCart, updateQuantity } = useStore();
  const total = useStore((s) => s.getCartTotal());
  const { isSignedIn } = useAuth();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/30 z-60"
            onClick={() => setCartOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white border-l border-zinc-200 z-61 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-zinc-100">
              <h2 className="text-xs tracking-[0.2em] uppercase text-zinc-400 font-medium">
                Cart ({cart.length})
              </h2>
              <button
                onClick={() => setCartOpen(false)}
                className="text-zinc-400 hover:text-zinc-900 transition-colors"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-zinc-300">
                  <p className="text-sm tracking-wider">Your cart is empty</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 bg-zinc-100 overflow-hidden shrink-0">
                      <Image
                        src={item.images[0]}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-zinc-900 truncate">{item.name}</p>
                      <p className="text-xs text-zinc-400 mt-0.5">{item.subtitle}</p>
                      <p className="text-sm text-zinc-700 mt-1">${item.price}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-zinc-300 hover:text-zinc-700"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-xs text-zinc-600 w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-zinc-300 hover:text-zinc-700"
                        >
                          <Plus size={12} />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto text-zinc-300 hover:text-red-500 text-xs tracking-wider"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-zinc-100 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs tracking-[0.15em] uppercase text-zinc-400">Total</span>
                  <span className="text-lg font-medium text-zinc-900">${total.toFixed(2)}</span>
                </div>
                {isSignedIn ? (
                  <Link
                    href="/checkout"
                    onClick={() => setCartOpen(false)}
                    className="w-full bg-zinc-900 text-white py-4 text-xs tracking-[0.15em] uppercase font-medium hover:bg-zinc-800 transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    Checkout <ArrowRight size={14} />
                  </Link>
                ) : (
                  <SignInButton mode="redirect" forceRedirectUrl="/checkout">
                    <button className="w-full bg-zinc-900 text-white py-4 text-xs tracking-[0.15em] uppercase font-medium hover:bg-zinc-800 transition-colors duration-300 flex items-center justify-center gap-2">
                      Sign in to Checkout <ArrowRight size={14} />
                    </button>
                  </SignInButton>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
