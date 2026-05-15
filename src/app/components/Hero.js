'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      });

      const lines = headingRef.current.querySelectorAll('.hero-line');
      gsap.fromTo(
        lines,
        { y: '120%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1.2, stagger: 0.12, ease: 'power3.out', delay: 2 }
      );

      gsap.fromTo(
        subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 2.6 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[85vh] min-h-[600px] w-full bg-zinc-100 flex items-center justify-center overflow-hidden">
      <div ref={imgRef} className="absolute inset-0 top-[-10%] bottom-[-10%]">
        <img
          src="https://images.unsplash.com/photo-1577803645773-f96470509666?w=1920&q=80&auto=format&fit=crop"
          alt="Person wearing premium eyewear"
          className="w-full h-full object-cover object-center opacity-90"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div ref={headingRef} className="relative z-10 text-center px-4 max-w-3xl flex flex-col items-center">
        <span className="block overflow-hidden mb-6">
          <span className="hero-line block text-[10px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-white">
            New Collection
          </span>
        </span>

        <span className="block overflow-hidden">
          <span className="hero-line block text-5xl sm:text-7xl font-bold tracking-tighter text-white leading-[0.9]">
            A CLEARER
          </span>
        </span>
        <span className="block overflow-hidden mb-6">
          <span className="hero-line block text-5xl sm:text-7xl font-bold tracking-tighter text-white leading-[0.9]">
            PERSPECTIVE.
          </span>
        </span>

        <div ref={subRef} className="opacity-0 flex flex-col items-center">
          <p className="text-lg text-white/90 mb-10 max-w-md mx-auto font-light">
            Minimalist eyewear crafted for modern life. Premium materials, unmatched clarity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/shop?sex=men">
              <MagneticButton className="bg-white text-zinc-900 px-8 py-3.5 text-xs font-medium tracking-[0.15em] uppercase hover:bg-zinc-100 transition-colors duration-300">
                Shop Men
              </MagneticButton>
            </Link>
            <Link href="/shop?sex=women">
              <MagneticButton className="bg-white/10 text-white border border-white px-8 py-3.5 text-xs font-medium tracking-[0.15em] uppercase hover:bg-white hover:text-zinc-900 transition-all duration-300">
                Shop Women
              </MagneticButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
