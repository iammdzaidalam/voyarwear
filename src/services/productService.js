/**
 * Product Service — API Abstraction Layer
 *
 * All product data flows through this service.
 * Currently returns mock data from /data/products.js.
 * Backend team: replace the function bodies with fetch() calls to your API.
 *
 * @typedef {Object} ProductFilters
 * @property {string} [category]
 * @property {string} [sex]
 * @property {string} [shape]
 * @property {string} [material]
 * @property {string} [faceFit]
 * @property {string} [search]
 * @property {string} [sort] - 'price-asc' | 'price-desc' | 'newest' | 'name-asc'
 */

import { products, filterOptions, categories } from '../app/data/products';

export async function getProducts(filters = {}) {
  // Backend team: replace with fetch(`${API_URL}/products`, { params: filters })
  let result = [...products];

  if (filters.category) result = result.filter((p) => p.category === filters.category);
  if (filters.sex) result = result.filter((p) => p.sex === filters.sex || p.sex === 'unisex');
  if (filters.shape) result = result.filter((p) => p.shape === filters.shape);
  if (filters.material) result = result.filter((p) => p.material === filters.material);
  if (filters.faceFit) result = result.filter((p) => p.faceFit === filters.faceFit);

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.color.toLowerCase().includes(q)
    );
  }

  switch (filters.sort) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'name-asc':
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'newest':
    default:
      break;
  }

  return result;
}

export async function getProductById(id) {
  // Backend team: replace with fetch(`${API_URL}/products/${id}`)
  return products.find((p) => p.id === id) || null;
}

export async function searchProducts(query) {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase();
  return products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.color.toLowerCase().includes(q)
    )
    .slice(0, 6);
}

export function getFilterOptions() {
  return filterOptions;
}

export function getCategories() {
  return categories;
}
