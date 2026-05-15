'use client';

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function UserProfile() {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const isEmail = user?.emailOrPhone?.includes('@');

  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg font-semibold transition duration-300 transform hover:scale-105"
      >
        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
          {getInitials(user?.name || 'U')}
        </div>
        <span className="hidden sm:inline">{user?.name}</span>
        <span className="text-lg">▼</span>
      </button>

      {/* Dropdown Menu */}
      {showMenu && (
        <div className="absolute right-0 mt-2 w-72 bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 animate-slideInUp">
          {/* User Info */}
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-b border-white/10 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-lg font-bold text-white">
                {getInitials(user?.name || 'U')}
              </div>
              <div>
                <p className="text-white font-bold">{user?.name}</p>
                <p className="text-white/60 text-sm flex items-center gap-1">
                  {isEmail ? '📧' : '📱'} {user?.emailOrPhone}
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-3 space-y-2">
            <button className="w-full text-left px-4 py-3 text-white hover:bg-white/10 rounded-lg transition duration-300 flex items-center gap-3">
              <span>👤</span> My Profile
            </button>
            <button className="w-full text-left px-4 py-3 text-white hover:bg-white/10 rounded-lg transition duration-300 flex items-center gap-3">
              <span>🛒</span> My Orders
            </button>
            <button className="w-full text-left px-4 py-3 text-white hover:bg-white/10 rounded-lg transition duration-300 flex items-center gap-3">
              <span>❤️</span> Wishlist
            </button>
            <button className="w-full text-left px-4 py-3 text-white hover:bg-white/10 rounded-lg transition duration-300 flex items-center gap-3">
              <span>⚙️</span> Settings
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10"></div>

          {/* Logout Button */}
          <button
            onClick={() => {
              logout();
              setShowMenu(false);
            }}
            className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/10 transition duration-300 flex items-center gap-3"
          >
            <span>🚪</span> Logout
          </button>
        </div>
      )}
    </div>
  );
}
