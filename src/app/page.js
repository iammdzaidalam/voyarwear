'use client';

import { useState, useEffect } from 'react';
import Carousel from './components/Carousel';
import Filters from './components/Filters';
import ProductGrid from './components/ProductGrid';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import { eyewearProducts } from './data/products';
import { useAuth } from './context/AuthContext';

export default function Home() {
  const { user, loading } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [filters, setFilters] = useState({
    sex: [],
    priceRanges: [],
    shapes: [],
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">👓</div>
          <p className="text-white text-lg">Loading VoyarWear...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 font-sans">
      {/* Login Modal - Optional */}
      {showLogin && <Login setShowLogin={setShowLogin} />}

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-lg bg-black/40 border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">👓</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                VoyarWear Optics
              </h1>
            </div>
            <nav className="hidden sm:flex gap-6">
              <a href="#" className="text-white/70 hover:text-white transition duration-300">Shop</a>
              <a href="#" className="text-white/70 hover:text-white transition duration-300">About</a>
              <a href="#" className="text-white/70 hover:text-white transition duration-300">Contact</a>
            </nav>
            <div className="flex items-center gap-4">
              <button className="relative group">
                <span className="text-white/70 hover:text-white transition duration-300 flex items-center gap-2">
                  🛒 Cart
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center transform -translate-y-2 translate-x-2 group-hover:scale-110 transition duration-300">
                    0
                  </span>
                </span>
              </button>
              {user ? (
                <UserProfile />
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2 rounded-lg font-semibold transition duration-300 transform hover:scale-105"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Section - Only if logged in */}
        {user && (
          <div className="mb-8 p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-white/10 rounded-2xl">
            <p className="text-white/80">
              Welcome back, <span className="font-bold text-white">{user.name}! 👋</span>
            </p>
          </div>
        )}

        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Premium Eyewear Collection
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-8">
            Discover the perfect frames for your style - Premium quality, timeless designs
          </p>
        </div>

        {/* Carousel Offers Section */}
        <div className="mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
            🎉 Featured Deals & Collections
          </h3>
          <Carousel />
        </div>

        {/* Quick Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {[
            { icon: '✨', label: 'Premium Quality', desc: 'Certified UV protection' },
            { icon: '🚚', label: 'Fast Delivery', desc: '3-5 business days' },
            { icon: '♻️', label: 'Easy Returns', desc: '30-day guarantee' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center hover:border-white/30 transition duration-300"
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <h4 className="text-lg font-bold text-white mb-2">{stat.label}</h4>
              <p className="text-white/60 text-sm">{stat.desc}</p>
            </div>
          ))}
        </section>

        {/* Products Section with Filters */}
        <div className="mb-12">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8">Browse Our Eyewear</h3>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <Filters onFilterChange={handleFilterChange} />

            {/* Product Grid */}
            <ProductGrid products={eyewearProducts} filters={filters} />
          </div>
        </div>

        {/* Promotion Banner */}
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-2xl p-8 md:p-12 text-center mb-12 shadow-2xl transform hover:scale-105 transition duration-300">
          <h3 className="text-2xl md:text-4xl font-bold text-white mb-3">Special Offer!</h3>
          <p className="text-white/90 mb-6 text-lg">Get 20% off on all eyewear with code: VISION20</p>
          <button className="bg-white text-purple-600 font-bold px-8 py-3 rounded-lg hover:bg-white/90 transition duration-300">
            Shop Now →
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/40 backdrop-blur-lg mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h5 className="text-white font-bold mb-4">About VoyarWear</h5>
              <p className="text-gray-400 text-sm">Premium eyewear brand delivering style, quality, and vision excellence since 2020.</p>
            </div>
            <div>
              <h5 className="text-white font-bold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition duration-300">Shop All Eyewear</a></li>
                <li><a href="#" className="hover:text-white transition duration-300">New Arrivals</a></li>
                <li><a href="#" className="hover:text-white transition duration-300">Best Sellers</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-4">Support</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition duration-300">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition duration-300">Size Guide</a></li>
                <li><a href="#" className="hover:text-white transition duration-300">Returns & Exchanges</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-4">Follow Us</h5>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-purple-400 transition duration-300">👍 Facebook</a>
                <a href="#" className="text-gray-400 hover:text-pink-400 transition duration-300">📷 Instagram</a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition duration-300">𝕏 Twitter</a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 VoyarWear Optics. All rights reserved. | Premium Eyewear Store</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
