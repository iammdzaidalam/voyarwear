import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set, get) => ({
      // --- Cart ---
      cart: [],
      isCartOpen: false,

      addToCart: (product, quantity = 1) =>
        set((state) => {
          const existing = state.cart.find((item) => item.id === product.id);
          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
              isCartOpen: true,
            };
          }
          return {
            cart: [...state.cart, { ...product, quantity }],
            isCartOpen: true,
          };
        }),

      removeFromCart: (id) =>
        set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
            )
            .filter((item) => item.quantity > 0),
        })),

      getCartTotal: () =>
        get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0),

      getCartCount: () =>
        get().cart.reduce((sum, item) => sum + item.quantity, 0),

      clearCart: () => set({ cart: [] }),

      // --- Wishlist ---
      wishlist: [],

      toggleWishlist: (product) =>
        set((state) => {
          const exists = state.wishlist.find((p) => p.id === product.id);
          return {
            wishlist: exists
              ? state.wishlist.filter((p) => p.id !== product.id)
              : [...state.wishlist, product],
          };
        }),

      isWishlisted: (id) => get().wishlist.some((p) => p.id === id),

      // --- Addresses ---
      addresses: [],

      addAddress: (addr) =>
        set((state) => ({
          addresses: [
            ...state.addresses,
            { ...addr, id: crypto.randomUUID() },
          ],
        })),

      removeAddress: (id) =>
        set((state) => ({
          addresses: state.addresses.filter((a) => a.id !== id),
        })),

      updateAddress: (id, data) =>
        set((state) => ({
          addresses: state.addresses.map((a) =>
            a.id === id ? { ...a, ...data } : a
          ),
        })),

      // --- Orders (populated after checkout) ---
      orders: [],

      addOrder: (order) =>
        set((state) => ({ orders: [order, ...state.orders] })),

      // --- UI State (not persisted, see partialize below) ---
      isMenuOpen: false,
      isPreloaderDone: false,

      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      setCartOpen: (open) => set({ isCartOpen: open }),
      toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
      setMenuOpen: (open) => set({ isMenuOpen: open }),
      setPreloaderDone: () => set({ isPreloaderDone: true }),
    }),
    {
      name: 'voyarwear-store',
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        addresses: state.addresses,
        orders: state.orders,
      }),
    }
  )
);
