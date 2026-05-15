'use client';

import { useRef, useCallback } from 'react';

export default function MagneticButton({ children, className = '', strength = 0.3, ...props }) {
  const ref = useRef(null);

  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  }, [strength]);

  const onLeave = useCallback(() => {
    if (ref.current) {
      ref.current.style.transform = 'translate(0, 0)';
      ref.current.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
      setTimeout(() => {
        if (ref.current) ref.current.style.transition = '';
      }, 500);
    }
  }, []);

  return (
    <button
      ref={ref}
      className={`magnetic-btn ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...props}
    >
      {children}
    </button>
  );
}
