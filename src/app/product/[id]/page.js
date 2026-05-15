'use client';

import { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowLeft } from 'lucide-react';
import { products } from '../../data/products';
import { useStore } from '../../store/useStore';
import MagneticButton from '../../components/MagneticButton';
import Footer from '../../components/Footer';

function Accordion({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-zinc-100">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="text-xs tracking-[0.15em] uppercase text-zinc-500 font-medium">{title}</span>
        <ChevronDown
          size={14}
          className={`text-zinc-400 transition-transform duration-500 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-sm font-light text-zinc-500 leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductPage({ params }) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);
  const addToCart = useStore((s) => s.addToCart);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-zinc-400">Product not found</p>
      </div>
    );
  }

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <>
      <div className="pt-24 md:pt-28 px-4 md:px-12 pb-24 min-h-screen max-w-7xl mx-auto">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-zinc-400 hover:text-zinc-700 transition-colors mb-10"
        >
          <ArrowLeft size={14} /> Back to shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start space-y-3">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="relative aspect-4/5 bg-zinc-100 overflow-hidden"
            >
              <Image
                src={product.images[activeImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative w-20 h-20 overflow-hidden border transition-all duration-300 ${
                      activeImage === i ? 'border-zinc-900' : 'border-zinc-200 hover:border-zinc-400'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lg:py-4">
            <p className="text-xs tracking-[0.2em] uppercase text-zinc-400 mb-3">
              {product.category} / {product.sex}
            </p>

            <h1 className="text-3xl md:text-4xl font-semibold text-zinc-900 tracking-tight mb-1">
              {product.name}
            </h1>
            <p className="font-serif italic text-zinc-400 text-base mb-6">
              {product.subtitle}
            </p>

            <p className="text-2xl font-medium text-zinc-900 mb-8">
              ${product.price}
            </p>

            <p className="text-sm font-light text-zinc-500 leading-relaxed mb-10 max-w-md">
              {product.description}
            </p>

            <div className="flex items-center gap-3 mb-10">
              <div
                className="w-5 h-5 rounded-full border border-zinc-200"
                style={{ backgroundColor: product.colorHex }}
              />
              <span className="text-xs text-zinc-500 tracking-wider">{product.color}</span>
            </div>

            <MagneticButton
              onClick={handleAdd}
              className={`w-full py-4 text-xs tracking-[0.15em] uppercase font-medium transition-all duration-500 ${
                added
                  ? 'bg-green-600 text-white'
                  : 'bg-zinc-900 text-white hover:bg-zinc-800'
              }`}
            >
              {added ? 'Added to cart \u2713' : 'Add to cart'}
            </MagneticButton>

            <div className="mt-12">
              <Accordion title="Dimensions">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-[10px] tracking-wider uppercase text-zinc-300 mb-1">Lens</p>
                    <p className="text-zinc-600">{product.dimensions.lens}mm</p>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-wider uppercase text-zinc-300 mb-1">Bridge</p>
                    <p className="text-zinc-600">{product.dimensions.bridge}mm</p>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-wider uppercase text-zinc-300 mb-1">Temple</p>
                    <p className="text-zinc-600">{product.dimensions.temple}mm</p>
                  </div>
                </div>
              </Accordion>

              <Accordion title="Materials">
                <p className="capitalize">{product.material}</p>
                <p className="mt-2">
                  All frames feature anti-reflective coated lenses, spring hinges for flexible comfort,
                  and arrive in a handcrafted leather case.
                </p>
              </Accordion>

              <Accordion title="Shipping & Returns">
                <p>Complimentary shipping on all orders. 30-day return policy with prepaid labels included.</p>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
