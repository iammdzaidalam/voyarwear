'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { products } from '../data/products';

export default function FeaturedProducts() {
  const featured = products.slice(0, 4);

  return (
    <section className="py-24 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold tracking-tight mb-4 text-zinc-900">Most Loved</h2>
          <p className="text-zinc-500 mx-auto max-w-2xl">
            The silhouettes you can&apos;t get enough of.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 1, 0.5, 1] }}
            >
              <Link href={`/product/${product.id}`} className="group flex flex-col">
                <div className="relative aspect-square overflow-hidden bg-white mb-4">
                  {i === 0 && (
                    <span className="absolute top-3 left-3 z-10 text-[10px] uppercase tracking-[0.15em] bg-zinc-900 text-white px-2 py-1">
                      New
                    </span>
                  )}
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                    <span className="block w-full bg-zinc-100 text-zinc-900 text-center py-2.5 text-xs uppercase tracking-[0.15em] font-medium">
                      Quick View
                    </span>
                  </div>
                </div>
                <h3 className="font-medium text-base mb-1 text-zinc-900 group-hover:underline decoration-1 underline-offset-4">
                  {product.name}
                </h3>
                <p className="text-sm text-zinc-500">${product.price}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/shop"
            className="inline-block border border-zinc-900 text-zinc-900 px-12 py-3.5 text-xs font-medium tracking-[0.15em] uppercase hover:bg-zinc-900 hover:text-white transition-all duration-300"
          >
            Shop All Frames
          </Link>
        </div>
      </div>
    </section>
  );
}
