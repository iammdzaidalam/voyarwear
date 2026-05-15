'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X, User, Search } from 'lucide-react';
import { UserButton, SignInButton, useAuth } from '../../hooks/useAuthSafe';
import { useStore } from '../store/useStore';
import MagneticButton from './MagneticButton';
import SearchOverlay from './SearchOverlay';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { toggleCart, toggleMenu, isMenuOpen } = useStore();
  const count = useStore((s) => s.cart.length);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-700 ${
          isMenuOpen
            ? 'bg-transparent text-black border-transparent'
            : scrolled
            ? 'bg-white/10 backdrop-blur-md border-b border-zinc-200/60 shadow-sm text-black'
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12 py-5 ">
          {/* Hamburger */}
          <MagneticButton
            onClick={toggleMenu}
            className="hover:text-black transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X size={20} strokeWidth={1.5} />
            ) : (
              <Menu size={20} strokeWidth={1.5} />
            )}
          </MagneticButton>

          {/* Logo */}
          <Link href="/" className={`absolute left-1/2 -translate-x-1/2 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <span className="font-semibold text-base tracking-[0.3em] uppercase">
              VoyarWear
            </span>
          </Link>

          {/* Right actions */}
          <div className={`flex items-center gap-5 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <Link
              href="/shop"
              className="hidden md:block text-xs tracking-[0.15em] uppercase text-zinc-500 hover:text-zinc-900 transition-colors duration-300"
            >
              Shop
            </Link>

            <button
              onClick={() => setSearchOpen(true)}
              className="text-zinc-800 hover:text-black transition-colors duration-300"
              aria-label="Search"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>

            {isSignedIn ? (
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: 'w-7 h-7',
                  },
                }}
              />
            ) : (
              <SignInButton mode="redirect">
                <button
                  className="text-zinc-800 hover:text-black transition-colors duration-300 hidden md:block"
                  aria-label="Sign in"
                >
                  <User size={18} strokeWidth={1.5} />
                </button>
              </SignInButton>
            )}

            <MagneticButton
              onClick={toggleCart}
              className="relative text-zinc-800 hover:text-black transition-colors duration-300"
              aria-label="Open cart"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-zinc-900 text-white text-[9px] font-semibold rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </MagneticButton>
          </div>
        </div>
      </header>

      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
