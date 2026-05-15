'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useStore } from '../store/useStore';
import { useRazorpay } from '../../hooks/useRazorpay';
import { useUser } from '../../hooks/useAuthSafe';
import { ArrowRight, Lock, CheckCircle2 } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getCartTotal, clearCart, addresses } = useStore();
  const { initiatePayment, loading } = useRazorpay();
  const { user, isLoaded } = useUser();

  const [shipping, setShipping] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zip: '',
  });

  // Pre-fill from user and saved addresses if available
  useEffect(() => {
    if (isLoaded && user) {
      setShipping((s) => ({
        ...s,
        name: user.fullName || s.name,
        email: user.primaryEmailAddress?.emailAddress || s.email,
      }));
    }
    if (addresses && addresses.length > 0) {
      const addr = addresses[0];
      setShipping((s) => ({
        ...s,
        name: addr.name || s.name,
        phone: addr.phone || s.phone,
        street: addr.street || s.street,
        city: addr.city || s.city,
        state: addr.state || s.state,
        zip: addr.zip || s.zip,
      }));
    }
  }, [user, isLoaded, addresses]);

  const total = getCartTotal();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-36 px-4 flex flex-col items-center justify-center bg-zinc-50">
        <h1 className="text-2xl font-semibold text-zinc-900 mb-4">Your cart is empty</h1>
        <p className="text-zinc-500 mb-8">Add items to your cart to checkout.</p>
        <button
          onClick={() => router.push('/shop')}
          className="bg-zinc-900 text-white px-8 py-3 text-xs tracking-widest uppercase hover:bg-zinc-800 transition-colors"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const handlePayment = (e) => {
    e.preventDefault();
    initiatePayment({
      items: cart.map((item) => ({ id: item.id, quantity: item.quantity })),
      customerInfo: shipping,
      onSuccess: (data) => {
        clearCart();
        router.push(`/order-success?id=${data.orderId}`);
      },
      onFailure: (err) => {
        alert(err || 'Payment failed. Please try again.');
      },
    });
  };

  const inputClass = "w-full border border-zinc-200 focus:border-zinc-900 px-4 py-3 text-sm outline-none transition-colors bg-white";

  return (
    <div className="pt-28 md:pt-36 px-4 md:px-12 pb-24 min-h-screen bg-zinc-50">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* Left Col: Form */}
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-semibold text-zinc-900 mb-8 tracking-tight">Checkout</h1>
          
          <form id="checkout-form" onSubmit={handlePayment} className="space-y-8">
            <section>
              <h2 className="text-xs uppercase tracking-widest text-zinc-500 font-medium mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-zinc-200 text-zinc-700 flex items-center justify-center text-[10px]">1</span>
                Contact Information
              </h2>
              <div className="space-y-4">
                <input
                  required
                  type="email"
                  placeholder="Email Address"
                  value={shipping.email}
                  onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
                  className={inputClass}
                />
                <input
                  required
                  type="tel"
                  placeholder="Phone Number"
                  value={shipping.phone}
                  onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
                  className={inputClass}
                />
              </div>
            </section>

            <section>
              <h2 className="text-xs uppercase tracking-widest text-zinc-500 font-medium mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-zinc-200 text-zinc-700 flex items-center justify-center text-[10px]">2</span>
                Shipping Address
              </h2>
              <div className="space-y-4">
                <input
                  required
                  type="text"
                  placeholder="Full Name"
                  value={shipping.name}
                  onChange={(e) => setShipping({ ...shipping, name: e.target.value })}
                  className={inputClass}
                />
                <input
                  required
                  type="text"
                  placeholder="Street Address"
                  value={shipping.street}
                  onChange={(e) => setShipping({ ...shipping, street: e.target.value })}
                  className={inputClass}
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    required
                    type="text"
                    placeholder="City"
                    value={shipping.city}
                    onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                    className={inputClass}
                  />
                  <input
                    required
                    type="text"
                    placeholder="State"
                    value={shipping.state}
                    onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <input
                  required
                  type="text"
                  placeholder="ZIP / Postal Code"
                  value={shipping.zip}
                  onChange={(e) => setShipping({ ...shipping, zip: e.target.value })}
                  className="w-1/2 pr-2 border border-zinc-200 focus:border-zinc-900 px-4 py-3 text-sm outline-none transition-colors bg-white"
                />
              </div>
            </section>
          </form>
        </div>

        {/* Right Col: Summary */}
        <div className="lg:w-[400px] shrink-0">
          <div className="bg-white border border-zinc-200 p-6 lg:sticky lg:top-36">
            <h2 className="text-sm font-medium text-zinc-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 bg-zinc-100 shrink-0">
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <p className="text-sm font-medium text-zinc-900 truncate">{item.name}</p>
                    <p className="text-xs text-zinc-500">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-sm font-medium text-zinc-900 self-center">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-zinc-100 py-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Subtotal</span>
                <span className="font-medium text-zinc-900">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-500">Shipping</span>
                <span className="font-medium text-zinc-900">Free</span>
              </div>
            </div>

            <div className="border-t border-zinc-900 py-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-zinc-900">Total</span>
                <span className="text-xl font-semibold text-zinc-900">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              form="checkout-form"
              type="submit"
              disabled={loading}
              className="w-full bg-zinc-900 text-white py-4 text-xs tracking-widest uppercase font-medium hover:bg-zinc-800 transition-colors duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
              {!loading && <ArrowRight size={14} />}
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-zinc-400 text-xs">
              <Lock size={12} /> Secure encrypted payment
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
