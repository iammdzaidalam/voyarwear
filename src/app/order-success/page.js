'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id');
  const router = useRouter();

  if (!orderId) {
    if (typeof window !== 'undefined') {
      router.replace('/shop');
    }
    return null;
  }

  return (
    <div className="min-h-screen pt-36 px-4 flex flex-col items-center justify-center bg-zinc-50 text-center">
      <CheckCircle size={64} className="text-green-500 mb-6" strokeWidth={1} />
      <h1 className="text-3xl md:text-4xl font-semibold text-zinc-900 mb-4 tracking-tight">
        Order Confirmed
      </h1>
      <p className="text-zinc-500 mb-2 max-w-md">
        Thank you for your purchase. Your premium eyewear is being prepared for dispatch.
      </p>
      <div className="bg-white border border-zinc-200 px-6 py-4 mb-8">
        <p className="text-xs uppercase tracking-widest text-zinc-400 font-medium">Order Reference</p>
        <p className="text-sm font-medium text-zinc-900 mt-1">{orderId}</p>
      </div>
      <Link
        href="/shop"
        className="bg-zinc-900 text-white px-8 py-4 text-xs tracking-widest uppercase font-medium hover:bg-zinc-800 transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-zinc-50" />}>
      <OrderSuccessContent />
    </Suspense>
  );
}
