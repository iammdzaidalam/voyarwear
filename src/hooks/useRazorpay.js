'use client';

import { useState, useCallback } from 'react';

export function useRazorpay() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const initiatePayment = useCallback(async ({ items, customerInfo, onSuccess, onFailure }) => {
    setLoading(true);
    setError(null);

    try {
      // Step 1: Create order on server
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, customerInfo }),
      });

      if (!res.ok) throw new Error('Order creation failed');
      const { orderId, amount, currency, key } = await res.json();

      // Step 2: Open Razorpay checkout modal
      const options = {
        key,
        amount,
        currency,
        name: 'VoyarWear',
        description: 'Premium Eyewear',
        order_id: orderId,
        prefill: {
          name: customerInfo?.name || '',
          email: customerInfo?.email || '',
          contact: customerInfo?.phone || '',
        },
        theme: {
          color: '#18181b', // Zinc-900 to match VoyarWear minimal aesthetic
          backdrop_color: 'rgba(24, 24, 27, 0.8)',
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            onFailure?.('Payment cancelled');
          },
        },
        handler: async (response) => {
          // Step 3: Verify payment on server
          const verifyRes = await fetch('/api/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response),
          });

          if (verifyRes.ok) {
            const data = await verifyRes.json();
            onSuccess?.(data);
          } else {
            onFailure?.('Payment verification failed');
          }
          setLoading(false);
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (resp) => {
        setError(resp.error.description);
        onFailure?.(resp.error.description);
        setLoading(false);
      });
      rzp.open();
    } catch (err) {
      setError(err.message);
      onFailure?.(err.message);
      setLoading(false);
    }
  }, []);

  return { initiatePayment, loading, error };
}
