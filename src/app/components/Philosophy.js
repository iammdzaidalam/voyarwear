'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current.querySelectorAll('.phil-reveal'),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 max-w-3xl mx-auto px-4 text-center">
      <h2 className="phil-reveal text-3xl font-medium tracking-tight mb-8 text-zinc-900">
        Design without compromise.
      </h2>
      <p className="phil-reveal text-lg text-zinc-500 font-light leading-relaxed mb-12">
        We believe eyewear should be more than functional. It should be a seamless extension of your
        personal style. By cutting out intermediaries, we meticulously craft premium acetate and
        titanium frames, delivering them directly to you at a fraction of the traditional cost.
      </p>
      <img
        src="https://images.unsplash.com/photo-1546452834-8ab37dededdb?w=800&q=80&auto=format&fit=crop"
        alt="Eyewear crafting"
        className="phil-reveal w-full h-64 object-cover grayscale opacity-80"
      />
    </section>
  );
}
