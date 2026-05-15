'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const offers = [
  { id: 1, src: '/offer1.svg', alt: 'Summer Sale - 50% Off' },
  { id: 2, src: '/offer2.svg', alt: 'New Collection - Exclusive Designs' },
  { id: 3, src: '/offer3.svg', alt: 'Flash Sale - Limited Time Offer' },
];

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % offers.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [autoPlay]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setAutoPlay(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % offers.length);
    setAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + offers.length) % offers.length);
    setAutoPlay(false);
  };

  return (
    <div className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-2xl shadow-2xl group">
      {/* Carousel Container */}
      <div className="relative w-full h-full">
        {offers.map((offer, index) => (
          <div
            key={offer.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
              index === currentSlide
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-95'
            }`}
          >
            <Image
              src={offer.src}
              alt={offer.alt}
              fill
              className="object-cover"
              priority={index === currentSlide}
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        ))}
      </div>

      {/* Previous Button */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 backdrop-blur-md p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 transform hover:scale-110"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 backdrop-blur-md p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 transform hover:scale-110"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {offers.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-500 rounded-full ${
              index === currentSlide
                ? 'bg-white w-8 h-3 shadow-lg'
                : 'bg-white/50 hover:bg-white/70 w-3 h-3'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play Resume Button (on hover) */}
      {!autoPlay && (
        <div className="absolute top-6 right-6 z-20">
          <button
            onClick={() => setAutoPlay(true)}
            className="bg-white/30 hover:bg-white/50 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-semibold transition-all duration-300 hover:scale-105"
          >
            Resume
          </button>
        </div>
      )}
    </div>
  );
}
