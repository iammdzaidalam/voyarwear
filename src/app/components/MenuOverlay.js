'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuthSafe';
import { useStore } from '../store/useStore';

export default function MenuOverlay() {
  const { isMenuOpen, setMenuOpen } = useStore();
  const { isSignedIn } = useAuth();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop All' },
    { href: '/shop?category=sun', label: 'Sunglasses' },
    { href: '/shop?category=optical', label: 'Optical' },
    ...(isSignedIn
      ? [{ href: '/account', label: 'Account' }]
      : [{ href: '/sign-in', label: 'Sign In' }]),
  ];

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 bg-white flex items-center justify-center"
        >


          <nav className="flex flex-col items-center gap-1">
            {links.map((link, i) => (
              <motion.div
                key={link.href + link.label}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.06,
                  ease: [0.25, 1, 0.5, 1],
                }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-3xl md:text-5xl font-light tracking-tight text-zinc-300 hover:text-zinc-900 transition-colors duration-400 py-2"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-12 left-0 right-0 text-center"
          >
            <p className="text-xs tracking-[0.2em] text-zinc-300 uppercase">
              VoyarWear &mdash; A Clearer Perspective
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
