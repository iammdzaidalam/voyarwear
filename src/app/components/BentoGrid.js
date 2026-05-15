'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const collections = [
  {
    title: 'Sun',
    href: '/shop?category=sun',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80&auto=format&fit=crop',
  },
  {
    title: 'Optical',
    href: '/shop?category=optical',
    image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=800&q=80&auto=format&fit=crop',
  },
  {
    title: 'Screen',
    href: '/shop',
    image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800&q=80&auto=format&fit=crop',
  },
];

export default function BentoGrid() {
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current.querySelectorAll('.bento-card');
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 85%', once: true },
            delay: i * 0.1,
          }
        );
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <div className="mb-16 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight mb-2 text-zinc-900">
            Curated Collections
          </h2>
          <p className="text-zinc-500">Find the perfect shape for your face.</p>
        </div>
        <Link
          href="/shop"
          className="hidden sm:inline-block text-sm font-medium uppercase tracking-widest border-b border-zinc-900 pb-1 text-zinc-900 hover:text-zinc-500 hover:border-zinc-400 transition-colors duration-300"
        >
          View All
        </Link>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {collections.map((col) => (
          <Link
            key={col.title}
            href={col.href}
            className="bento-card group relative h-[450px] overflow-hidden bg-zinc-100 flex items-center justify-center"
          >
            <img
              src={col.image}
              alt={col.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/20" />
            <div className="relative z-10 flex flex-col items-center">
              <h3 className="text-2xl font-medium text-white mb-2">{col.title}</h3>
              <span className="text-xs uppercase tracking-[0.15em] text-white/90 border-b border-white/50 pb-1">
                Explore
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
