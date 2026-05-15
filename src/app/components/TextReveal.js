'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TextReveal({ children, as: Tag = 'h2', className = '', delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const lines = el.querySelectorAll('.tr-line');
    gsap.set(lines, { y: '110%' });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(lines, {
          y: '0%',
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
          delay,
        });
      },
      once: true,
    });

    return () => trigger.kill();
  }, [delay]);

  const content = typeof children === 'string' ? children : null;

  if (content) {
    const words = content.split(' ');
    const midpoint = Math.ceil(words.length / 2);
    const lines = [words.slice(0, midpoint).join(' '), words.slice(midpoint).join(' ')].filter(Boolean);

    return (
      <Tag ref={ref} className={className}>
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden">
            <span className="tr-line block">{line}</span>
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag ref={ref} className={className}>
      <span className="block overflow-hidden">
        <span className="tr-line block">{children}</span>
      </span>
    </Tag>
  );
}
