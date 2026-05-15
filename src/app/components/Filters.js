'use client';

import { useState } from 'react';

const SHAPES = ['wayfarer', 'aviator', 'cat-eye', 'round', 'square', 'oversized', 'butterfly', 'clubmaster', 'wrap'];
const SEX_OPTIONS = ['men', 'women', 'unisex'];
const PRICE_RANGES = [
  { label: 'Under ₹8,000', min: 0, max: 8000 },
  { label: '₹8,000 - ₹12,000', min: 8000, max: 12000 },
  { label: '₹12,000 - ₹16,000', min: 12000, max: 16000 },
  { label: 'Over ₹16,000', min: 16000, max: Infinity },
];

export default function Filters({ onFilterChange }) {
  const [selectedSex, setSelectedSex] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);
  const [selectedShapes, setSelectedShapes] = useState([]);

  const handleSexChange = (sex) => {
    const updated = selectedSex.includes(sex)
      ? selectedSex.filter(s => s !== sex)
      : [...selectedSex, sex];
    setSelectedSex(updated);
    onFilterChange({ sex: updated, priceRanges: selectedPriceRange, shapes: selectedShapes });
  };

  const handlePriceChange = (range) => {
    const updated = selectedPriceRange.some(r => r.min === range.min && r.max === range.max)
      ? selectedPriceRange.filter(r => !(r.min === range.min && r.max === range.max))
      : [...selectedPriceRange, range];
    setSelectedPriceRange(updated);
    onFilterChange({ sex: selectedSex, priceRanges: updated, shapes: selectedShapes });
  };

  const handleShapeChange = (shape) => {
    const updated = selectedShapes.includes(shape)
      ? selectedShapes.filter(s => s !== shape)
      : [...selectedShapes, shape];
    setSelectedShapes(updated);
    onFilterChange({ sex: selectedSex, priceRanges: selectedPriceRange, shapes: updated });
  };

  const resetFilters = () => {
    setSelectedSex([]);
    setSelectedPriceRange([]);
    setSelectedShapes([]);
    onFilterChange({ sex: [], priceRanges: [], shapes: [] });
  };

  const hasActiveFilters = selectedSex.length > 0 || selectedPriceRange.length > 0 || selectedShapes.length > 0;

  return (
    <div className="w-full lg:w-64 bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-lg h-fit sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-xs bg-red-500/20 hover:bg-red-500/30 text-red-300 px-2 py-1 rounded transition duration-300"
          >
            Reset
          </button>
        )}
      </div>

      {/* Gender Filter */}
      <div className="mb-8 pb-8 border-b border-white/10">
        <h4 className="text-sm font-bold text-white/80 uppercase tracking-wider mb-4">Gender</h4>
        <div className="space-y-3">
          {SEX_OPTIONS.map((sex) => (
            <label key={sex} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedSex.includes(sex)}
                onChange={() => handleSexChange(sex)}
                className="w-4 h-4 rounded border border-white/30 bg-white/10 checked:bg-purple-500 cursor-pointer accent-purple-500"
              />
              <span className="text-white/80 group-hover:text-white transition duration-300 capitalize">
                {sex}
              </span>
              <span className="text-xs text-white/40 ml-auto">
                {sex === 'men' && '👔'}
                {sex === 'women' && '👗'}
                {sex === 'unisex' && '👥'}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div className="mb-8 pb-8 border-b border-white/10">
        <h4 className="text-sm font-bold text-white/80 uppercase tracking-wider mb-4">Price</h4>
        <div className="space-y-3">
          {PRICE_RANGES.map((range, idx) => (
            <label key={idx} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedPriceRange.some(r => r.min === range.min && r.max === range.max)}
                onChange={() => handlePriceChange(range)}
                className="w-4 h-4 rounded border border-white/30 bg-white/10 checked:bg-green-500 cursor-pointer accent-green-500"
              />
              <span className="text-white/80 group-hover:text-white transition duration-300">
                {range.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Shape Filter */}
      <div>
        <h4 className="text-sm font-bold text-white/80 uppercase tracking-wider mb-4">Frame Shape</h4>
        <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
          {SHAPES.map((shape) => (
            <label key={shape} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedShapes.includes(shape)}
                onChange={() => handleShapeChange(shape)}
                className="w-4 h-4 rounded border border-white/30 bg-white/10 checked:bg-pink-500 cursor-pointer accent-pink-500"
              />
              <span className="text-white/80 group-hover:text-white transition duration-300 capitalize">
                {shape.replace('-', ' ')}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Filter Status */}
      {hasActiveFilters && (
        <div className="mt-8 pt-6 border-t border-white/10 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-3">
          <p className="text-xs text-white/70">
            <span className="font-bold text-white">
              {selectedSex.length + selectedPriceRange.length + selectedShapes.length}
            </span>
            {' '}filter{selectedSex.length + selectedPriceRange.length + selectedShapes.length !== 1 ? 's' : ''} active
          </p>
        </div>
      )}
    </div>
  );
}
