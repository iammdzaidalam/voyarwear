'use client';

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Login({ setShowLogin }) {
  const [inputValue, setInputValue] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState('identify'); // 'identify' or 'details'
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^[\d\s\-\+\(\)]{10,}$/;
    return re.test(phone.replace(/\s/g, ''));
  };

  const handleIdentify = (e) => {
    e.preventDefault();
    setError('');

    if (!inputValue.trim()) {
      setError('Please enter email or phone number');
      return;
    }

    const isEmail = validateEmail(inputValue);
    const isPhone = validatePhone(inputValue);

    if (!isEmail && !isPhone) {
      setError('Please enter a valid email or phone number');
      return;
    }

    setStep('details');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      login(inputValue, name);
      setIsLoading(false);
      setShowLogin(false); // Close modal after login
    }, 600);
  };

  const handleBack = () => {
    setStep('identify');
    setError('');
    setName('');
  };

  const handleClose = () => {
    setShowLogin(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4" onClick={handleClose}>
      <div className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 sm:top-8 sm:right-8 text-white/60 hover:text-white text-2xl transition duration-300 z-60"
        >
          ✕
        </button>
        {/* Animation wrapper */}
        <div
          className={`bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-white/10 shadow-2xl transform transition-all duration-500 ${
            step === 'identify' ? 'scale-100 opacity-100' : 'scale-95 opacity-0 absolute'
          }`}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center transform hover:scale-110 transition duration-300">
                <span className="text-3xl">👓</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">VoyarWear</h2>
            <p className="text-white/60">Login to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleIdentify} className="space-y-6">
            {/* Input Field */}
            <div>
              <label className="block text-sm font-semibold text-white/80 mb-3">
                Email or Phone Number
              </label>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setError('');
                }}
                placeholder="example@email.com or +1 (555) 123-4567"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition duration-300"
                autoFocus
              />
              <p className="text-xs text-white/50 mt-2">
                🔹 Email: yourname@example.com
                <br />
                🔹 Phone: +1 (555) 123-4567
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
                <span className="text-base mt-0.5">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 rounded-xl transition duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
            >
              Continue →
            </button>
          </form>

          {/* Social Login */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-center text-sm text-white/60 mb-4">Or continue with</p>
            <div className="grid grid-cols-3 gap-3">
              <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-2 rounded-lg transition duration-300">
                👍
              </button>
              <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-2 rounded-lg transition duration-300">
                𝕏
              </button>
              <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-2 rounded-lg transition duration-300">
                📷
              </button>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-white/50 mt-8">
            New to VoyarWear? Don't worry, we'll create your account.
          </p>
        </div>

        {/* Details Step */}
        <div
          className={`bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-white/10 shadow-2xl transform transition-all duration-500 ${
            step === 'details' ? 'scale-100 opacity-100' : 'scale-95 opacity-0 absolute'
          }`}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome! 👋</h2>
            <p className="text-white/60">Complete your profile</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email/Phone Display */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-xs text-white/60 mb-1">Logging in as</p>
              <p className="text-white font-semibold break-all">{inputValue}</p>
            </div>

            {/* Name Field */}
            <div>
              <label className="block text-sm font-semibold text-white/80 mb-3">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError('');
                }}
                placeholder="John Doe"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition duration-300"
                autoFocus
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg text-sm flex items-start gap-2">
                <span className="text-base mt-0.5">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* Buttons */}
            <div className="space-y-3">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
              >
                {isLoading ? '⏳ Logging in...' : 'Login →'}
              </button>
              <button
                type="button"
                onClick={handleBack}
                className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-3 rounded-xl transition duration-300"
              >
                ← Back
              </button>
            </div>
          </form>

          {/* Footer */}
          <p className="text-center text-xs text-white/50 mt-8">
            By logging in, you agree to our Terms & Conditions
          </p>
        </div>
      </div>
    </div>
  );
}
