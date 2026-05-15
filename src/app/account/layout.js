'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Package, Heart, MapPin } from 'lucide-react';
import Footer from '../components/Footer';

const navItems = [
  { href: '/account', label: 'Profile', icon: User, exact: true },
  { href: '/account/orders', label: 'Orders', icon: Package },
  { href: '/account/wishlist', label: 'Wishlist', icon: Heart },
  { href: '/account/addresses', label: 'Addresses', icon: MapPin },
];

export default function AccountLayout({ children }) {
  const pathname = usePathname();

  return (
    <>
      <div className="pt-28 md:pt-36 px-4 md:px-12 pb-24 min-h-screen max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold text-zinc-900 tracking-tight mb-12">
          My Account
        </h1>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar nav */}
          <aside className="md:w-48 shrink-0">
            <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0 border-b md:border-b-0 border-zinc-100">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.exact
                  ? pathname === item.href
                  : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 text-xs tracking-widest uppercase whitespace-nowrap transition-colors duration-300 ${
                      isActive
                        ? 'text-zinc-900 font-medium bg-zinc-50'
                        : 'text-zinc-400 hover:text-zinc-700'
                    }`}
                  >
                    <Icon size={16} strokeWidth={1.5} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">{children}</div>
        </div>
      </div>
      <Footer />
    </>
  );
}
