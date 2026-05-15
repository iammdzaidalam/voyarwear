'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useStore } from '../store/useStore';

export default function Preloader() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const setPreloaderDone = useStore((s) => s.setPreloaderDone);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setPreloaderDone(),
    });

    tl.fromTo(
      textRef.current.children,
      { y: '110%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 0.8, stagger: 0.06, ease: 'power3.out' }
    )
      .to(textRef.current.children, {
        y: '-110%',
        opacity: 0,
        duration: 0.6,
        stagger: 0.03,
        ease: 'power3.in',
        delay: 0.3,
      })
      .to(containerRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power4.inOut',
      });
  }, [setPreloaderDone]);

  return (
    <div ref={containerRef} className="preloader">
      <div ref={textRef} className="preloader-text">
        {'VOYARWEAR'.split('').map((char, i) => (
          <span key={i} style={{ display: 'inline-block' }}>
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}
