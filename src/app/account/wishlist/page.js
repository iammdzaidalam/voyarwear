'use client';

import { useStore } from '../../store/useStore';
import ProductCard from '../../components/ProductCard';
import { Heart } from 'lucide-react';
import Link from 'next/link';

export default function WishlistPage() {
  const wishlist = useStore((s) => s.wishlist);

  if (wishlist.length === 0) {
    return (
      <div>
        <h2 className="text-lg font-medium text-zinc-900 mb-6">Wishlist</h2>
        <div className="border border-zinc-200 p-12 text-center">
          <Heart size={32} className="text-zinc-200 mx-auto mb-4" />
          <p className="text-sm text-zinc-400 mb-4">Your wishlist is empty</p>
          <Link
            href="/shop"
            className="inline-block bg-zinc-900 text-white px-6 py-3 text-xs tracking-[0.15em] uppercase font-medium hover:bg-zinc-800 transition-colors"
          >
            Explore Eyewear
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-medium text-zinc-900 mb-6">
        Wishlist ({wishlist.length})
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </div>
  );
}
