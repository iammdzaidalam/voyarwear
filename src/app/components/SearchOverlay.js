'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { searchProducts } from '../../services/productService';

export default function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
      window.addEventListener('keydown', handleKey);
      return () => window.removeEventListener('keydown', handleKey);
    }
  }, [isOpen, onClose]);

  const handleSearch = useCallback((value) => {
    setQuery(value);
    clearTimeout(debounceRef.current);
    if (value.length < 2) { setResults([]); return; }
    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      const data = await searchProducts(value);
      setResults(data);
      setLoading(false);
    }, 250);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 bg-white/98 backdrop-blur-sm flex flex-col"
        >
          <div className="max-w-2xl w-full mx-auto px-6 pt-24">
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-5 right-6 md:right-12 text-zinc-400 hover:text-zinc-900 transition-colors p-2"
              aria-label="Close search"
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            {/* Input */}
            <div className="flex items-center gap-4 border-b border-zinc-200 pb-4 mb-8">
              <Search size={20} className="text-zinc-300 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search eyewear..."
                className="flex-1 bg-transparent text-2xl md:text-3xl font-light text-zinc-900 placeholder:text-zinc-200 outline-none tracking-tight"
              />
              {query && (
                <button
                  onClick={() => handleSearch('')}
                  className="text-zinc-300 hover:text-zinc-600 transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Results */}
            {loading && (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex gap-4 animate-pulse">
                    <div className="w-16 h-16 bg-zinc-100" />
                    <div className="flex-1 space-y-2 py-1">
                      <div className="h-4 bg-zinc-100 w-2/3" />
                      <div className="h-3 bg-zinc-100 w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && results.length > 0 && (
              <div className="space-y-1">
                <p className="text-[10px] tracking-[0.2em] uppercase text-zinc-300 mb-4">
                  {results.length} result{results.length !== 1 ? 's' : ''}
                </p>
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    onClick={onClose}
                    className="flex items-center gap-4 py-3 px-2 -mx-2 hover:bg-zinc-50 transition-colors group"
                  >
                    <div className="w-14 h-14 bg-zinc-100 overflow-hidden shrink-0">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-zinc-900 truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-zinc-400">{product.subtitle}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-zinc-700">${product.price}</span>
                      <ArrowRight
                        size={14}
                        className="text-zinc-300 group-hover:text-zinc-600 transition-colors"
                      />
                    </div>
                  </Link>
                ))}
                <Link
                  href={`/shop?search=${encodeURIComponent(query)}`}
                  onClick={onClose}
                  className="block mt-6 text-xs tracking-[0.15em] uppercase text-zinc-400 hover:text-zinc-900 transition-colors"
                >
                  View all results &rarr;
                </Link>
              </div>
            )}

            {!loading && query.length >= 2 && results.length === 0 && (
              <div className="text-center py-12">
                <p className="text-sm text-zinc-300">No results for &ldquo;{query}&rdquo;</p>
                <Link
                  href="/shop"
                  onClick={onClose}
                  className="text-xs text-zinc-400 hover:text-zinc-900 mt-2 inline-block transition-colors"
                >
                  Browse all eyewear
                </Link>
              </div>
            )}

            {!query && (
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-zinc-300 mb-4">
                  Popular searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Aviator', 'Cat Eye', 'Titanium', 'Round', 'Sunglasses'].map(
                    (term) => (
                      <button
                        key={term}
                        onClick={() => handleSearch(term)}
                        className="text-xs px-4 py-2 border border-zinc-200 text-zinc-500 hover:border-zinc-400 hover:text-zinc-700 transition-all duration-300"
                      >
                        {term}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
