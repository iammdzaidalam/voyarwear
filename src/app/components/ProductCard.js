'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function ProductCard({ product, index = 0 }) {
  const toggleWishlist = useStore((s) => s.toggleWishlist);
  const isWishlisted = useStore((s) => s.isWishlisted(product.id));

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.25, 1, 0.5, 1],
      }}
    >
      <Link href={`/product/${product.id}`} className="group flex flex-col">
        <div className="relative aspect-square overflow-hidden bg-zinc-100 mb-4">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt={`${product.name} alternate`}
              fill
              className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 absolute inset-0"
            />
          )}

          {/* Wishlist button */}
          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100"
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              size={16}
              strokeWidth={1.5}
              className={`transition-colors duration-300 ${
                isWishlisted
                  ? 'fill-red-500 text-red-500'
                  : 'text-zinc-600 hover:text-red-500'
              }`}
            />
          </button>

          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
            <span className="block w-full bg-white/90 backdrop-blur-sm text-zinc-900 text-center py-2.5 text-xs uppercase tracking-[0.15em] font-medium">
              Quick View
            </span>
          </div>
        </div>
        <h3 className="font-medium text-sm mb-1 text-zinc-900 group-hover:underline decoration-1 underline-offset-4">
          {product.name}
        </h3>
        <p className="text-xs text-zinc-400 mb-0.5">{product.subtitle}</p>
        <p className="text-sm text-zinc-700">${product.price}</p>
      </Link>
    </motion.div>
  );
}
