'use client';

import { useStore } from '../../store/useStore';
import { Package } from 'lucide-react';
import Link from 'next/link';

export default function OrdersPage() {
  const orders = useStore((s) => s.orders);

  if (orders.length === 0) {
    return (
      <div>
        <h2 className="text-lg font-medium text-zinc-900 mb-6">Order History</h2>
        <div className="border border-zinc-200 p-12 text-center">
          <Package size={32} className="text-zinc-200 mx-auto mb-4" />
          <p className="text-sm text-zinc-400 mb-4">No orders yet</p>
          <Link
            href="/shop"
            className="inline-block bg-zinc-900 text-white px-6 py-3 text-xs tracking-[0.15em] uppercase font-medium hover:bg-zinc-800 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-medium text-zinc-900 mb-6">Order History</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border border-zinc-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs tracking-[0.15em] uppercase text-zinc-400">
                  Order #{order.id?.slice(-8)}
                </p>
                <p className="text-xs text-zinc-300 mt-1">
                  {new Date(order.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <span className="text-[10px] tracking-[0.2em] uppercase px-3 py-1 bg-zinc-100 text-zinc-500 font-medium">
                {order.status || 'Processing'}
              </span>
            </div>
            <div className="border-t border-zinc-100 pt-4 flex items-center justify-between">
              <p className="text-sm text-zinc-500">
                {order.items?.length || 0} item{order.items?.length !== 1 ? 's' : ''}
              </p>
              <p className="text-sm font-medium text-zinc-900">
                ${order.total?.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
