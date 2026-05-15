import ProductCard from './ProductCard';

export default function ProductGrid({ products, filters }) {
  const filteredProducts = products.filter((product) => {
    // Filter by sex
    if (filters.sex.length > 0 && !filters.sex.includes(product.sex)) {
      return false;
    }

    // Filter by price
    if (filters.priceRanges.length > 0) {
      const priceMatch = filters.priceRanges.some(
        (range) => product.price >= range.min && product.price <= range.max
      );
      if (!priceMatch) return false;
    }

    // Filter by shape
    if (filters.shapes.length > 0 && !filters.shapes.includes(product.shape)) {
      return false;
    }

    return true;
  });

  return (
    <div className="flex-1">
      {/* Results Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Our Collection</h2>
          <p className="text-white/60">
            Showing {filteredProducts.length} of {products.length} eyewear
          </p>
        </div>
        {filteredProducts.length === 0 && (
          <div className="text-right">
            <p className="text-white/60 mb-2">No products found</p>
            <p className="text-sm text-white/40">Try adjusting your filters</p>
          </div>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-7xl mb-4">😎</div>
          <h3 className="text-2xl font-bold text-white mb-2">No Eyewear Found</h3>
          <p className="text-white/60 text-center max-w-md">
            We couldn't find eyewear matching your filters. Try adjusting your search criteria!
          </p>
        </div>
      )}
    </div>
  );
}
