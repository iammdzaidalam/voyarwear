export default function ProductCard({ product }) {
  return (
    <div className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition duration-500 transform hover:scale-105 hover:shadow-2xl">
      {/* Product Image */}
      <div className="relative h-64 bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center overflow-hidden group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition duration-500">
        <div className="text-7xl transform group-hover:scale-125 transition duration-500">{product.image}</div>
        <div className="absolute top-3 right-3">
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            {product.sex.charAt(0).toUpperCase() + product.sex.slice(1)}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5">
        {/* Name */}
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition duration-300">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-white/60 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Details */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-white/70">
          <div>
            <p className="text-white/50">Frame</p>
            <p className="capitalize font-semibold text-white">{product.shape.replace('-', ' ')}</p>
          </div>
          <div>
            <p className="text-white/50">Color</p>
            <p className="capitalize font-semibold text-white">{product.color}</p>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-lg transition duration-300 transform hover:scale-105 active:scale-95">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
