import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface WishlistProduct {
  id: string | number;
  name: string;
  price: number;
  comparePrice?: number | null;
  images: string[];
  unit: string;
  stock: number;
  slug: string;
}

interface WishlistStore {
  items: WishlistProduct[];
  addItem: (product: WishlistProduct) => void;
  removeItem: (productId: string | number) => void;
  isInWishlist: (productId: string | number) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const { items } = get();
        if (!items.find((item) => item.id === product.id)) {
          set({ items: [...items, product] });
        }
      },
      removeItem: (productId) => {
        set({
          items: get().items.filter((item) => item.id !== productId),
        });
      },
      isInWishlist: (productId) => {
        return get().items.some((item) => item.id === productId);
      },
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "supplyco-wishlist",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
