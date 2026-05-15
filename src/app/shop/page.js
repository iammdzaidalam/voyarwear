'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getProducts, getFilterOptions } from '../../services/productService';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const filterOpts = useMemo(() => getFilterOptions(), []);

  const getMatchedShape = (query) => {
    if (!query) return '';
    const match = filterOpts.shapes.find((s) => s.toLowerCase() === query.toLowerCase());
    return match || '';
  };

  const initialCategory = searchParams.get('category') || '';
  const initialSex = searchParams.get('sex') || '';
  const initialSearch = searchParams.get('search') || '';
  const initialShape = getMatchedShape(initialSearch);

  const [filters, setFilters] = useState({
    category: initialCategory,
    sex: initialSex,
    shape: initialShape,
    material: '',
    faceFit: '',
  });
  const [sort, setSort] = useState('newest');
  const [search, setSearch] = useState(initialSearch);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Sync state when URL search params change
  useEffect(() => {
    const urlCategory = searchParams.get('category');
    const urlSex = searchParams.get('sex');
    const urlSearch = searchParams.get('search');

    if (urlCategory !== null || urlSex !== null || urlSearch !== null) {
      setFilters((prev) => {
        let newShape = prev.shape;
        if (urlSearch !== null) {
          const match = getMatchedShape(urlSearch);
          if (match) newShape = match;
        }

        return {
          ...prev,
          category: urlCategory !== null ? urlCategory : prev.category,
          sex: urlSex !== null ? urlSex : prev.sex,
          shape: newShape,
        };
      });
      if (urlSearch !== null) {
        setSearch(urlSearch);
      }
    }
  }, [searchParams, filterOpts.shapes]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getProducts({ ...filters, sort, search }).then((data) => {
      if (!cancelled) {
        setProducts(data);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [filters, sort, search]);

  const activeCount = Object.values(filters).filter(Boolean).length;

  const clearFilters = () =>
    setFilters({ category: '', sex: '', shape: '', material: '', faceFit: '' });

  const FilterGroup = ({ label, value, options, field }) => (
    <div className="mb-8">
      <p className="text-[10px] tracking-[0.2em] uppercase text-zinc-400 font-medium mb-3">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() =>
              setFilters((f) => ({ ...f, [field]: f[field] === opt ? '' : opt }))
            }
            className={`text-xs px-3 py-1.5 border transition-all duration-300 capitalize ${
              value === opt
                ? 'border-zinc-900 text-zinc-900 bg-zinc-50'
                : 'border-zinc-200 text-zinc-400 hover:border-zinc-400 hover:text-zinc-600'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  const sidebar = (
    <>
      <FilterGroup label="Category" value={filters.category} options={['optical', 'sun']} field="category" />
      <FilterGroup label="Gender" value={filters.sex} options={['men', 'women', 'unisex']} field="sex" />
      <FilterGroup label="Shape" value={filters.shape} options={filterOpts.shapes} field="shape" />
      <FilterGroup label="Material" value={filters.material} options={filterOpts.materials} field="material" />
      <FilterGroup label="Face Fit" value={filters.faceFit} options={filterOpts.faceFits} field="faceFit" />
      {activeCount > 0 && (
        <button onClick={clearFilters} className="text-xs text-zinc-400 hover:text-zinc-700 tracking-wider transition-colors">
          Clear all filters
        </button>
      )}
    </>
  );

  return (
    <>
      <div className="pt-28 md:pt-36 px-4 md:px-12 pb-24 min-h-screen max-w-7xl mx-auto">
        <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold text-zinc-900 tracking-tight">
              {search ? `Results for "${search}"` : 'Shop Eyewear'}
            </h1>
            <p className="text-sm text-zinc-400 mt-3">
              {products.length} {products.length === 1 ? 'piece' : 'pieces'}
            </p>
          </div>

          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-zinc-500 hover:text-zinc-900 transition-colors border border-zinc-200 px-4 py-2"
            >
              {sortOptions.find((s) => s.value === sort)?.label || 'Sort'}
              <ChevronDown size={12} className={`transition-transform duration-300 ${showSortDropdown ? 'rotate-180' : ''}`} />
            </button>
            {showSortDropdown && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowSortDropdown(false)} />
                <div className="absolute right-0 top-full mt-1 bg-white border border-zinc-200 shadow-lg z-20 min-w-[200px]">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { setSort(opt.value); setShowSortDropdown(false); }}
                      className={`block w-full text-left px-4 py-3 text-xs tracking-wider transition-colors ${
                        sort === opt.value ? 'bg-zinc-50 text-zinc-900 font-medium' : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="md:hidden flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-zinc-500 mb-8 border border-zinc-200 px-4 py-2"
        >
          <SlidersHorizontal size={14} /> Filters
          {activeCount > 0 && (
            <span className="bg-zinc-100 text-zinc-700 text-[10px] px-1.5 py-0.5 ml-1">{activeCount}</span>
          )}
        </button>

        {showMobileFilters && (
          <div className="md:hidden mb-8 p-6 border border-zinc-200 bg-zinc-50">
            <div className="flex justify-between items-center mb-6">
              <p className="text-xs tracking-[0.15em] uppercase text-zinc-500 font-medium">Filters</p>
              <button onClick={() => setShowMobileFilters(false)}><X size={16} className="text-zinc-400" /></button>
            </div>
            {sidebar}
          </div>
        )}

        <div className="flex gap-12">
          <aside className="hidden md:block w-56 shrink-0 sticky top-28 self-start">
            {sidebar}
          </aside>

          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-square bg-zinc-100 mb-4" />
                    <div className="h-4 bg-zinc-100 w-2/3 mb-2" />
                    <div className="h-3 bg-zinc-100 w-1/3 mb-1" />
                    <div className="h-3 bg-zinc-100 w-1/4" />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-zinc-300 text-sm">No frames match your criteria</p>
                <button onClick={clearFilters} className="text-zinc-500 text-xs mt-3 hover:text-zinc-900 transition-colors">
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {products.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ShopContent />
    </Suspense>
  );
}
