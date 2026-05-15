import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 px-6 md:px-12 bg-white">
      <div className="py-20 md:py-24 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <p className="text-sm tracking-[0.3em] uppercase text-zinc-900 font-semibold mb-6">VoyarWear</p>
          <p className="text-sm font-light text-zinc-500 leading-relaxed max-w-xs">
            Handcrafted eyewear designed at the intersection of precision engineering and timeless aesthetics.
          </p>
        </div>

        <div className="md:col-span-2">
          <p className="text-xs tracking-[0.15em] uppercase text-zinc-400 font-medium mb-5">Shop</p>
          <ul className="space-y-3">
            {['All Eyewear', 'Optical', 'Sunglasses', 'New Arrivals'].map((item) => (
              <li key={item}>
                <Link href="/shop" className="text-sm font-light text-zinc-500 hover:text-zinc-900 transition-colors duration-300">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="text-xs tracking-[0.15em] uppercase text-zinc-400 font-medium mb-5">Help</p>
          <ul className="space-y-3">
            {['Size Guide', 'Shipping', 'Returns', 'Contact'].map((item) => (
              <li key={item}>
                <Link href="/" className="text-sm font-light text-zinc-500 hover:text-zinc-900 transition-colors duration-300">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="text-xs tracking-[0.15em] uppercase text-zinc-400 font-medium mb-5">Newsletter</p>
          <p className="text-sm font-light text-zinc-500 mb-4">
            Receive updates on new collections and exclusive offers.
          </p>
          <div className="flex border-b border-zinc-300">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-transparent text-sm text-zinc-900 py-3 outline-none placeholder:text-zinc-300 font-light"
            />
            <button className="text-xs tracking-[0.15em] uppercase text-zinc-500 hover:text-zinc-900 transition-colors px-2 font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-200 py-8 flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto">
        <p className="text-[11px] text-zinc-400 tracking-wider">
          &copy; {new Date().getFullYear()} VoyarWear. All rights reserved.
        </p>
        <div className="flex gap-6">
          {['Instagram', 'Twitter', 'Pinterest'].map((s) => (
            <a key={s} href="#" className="text-[11px] text-zinc-400 hover:text-zinc-700 tracking-wider transition-colors">
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
