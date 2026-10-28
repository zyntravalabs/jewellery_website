import { useSyncExternalStore } from "react";

/**
 * Tiny localStorage-backed store for wishlist and cart.
 * Demo only: data stays in this browser and does not sync across devices.
 */
type CartLine = { slug: string; qty: number };
type State = { wishlist: string[]; cart: CartLine[] };

const KEY = "aureva-demo-state";
let state: State = { wishlist: [], cart: [] };
let loaded = false;
const listeners = new Set<() => void>();
const SERVER: State = { wishlist: [], cart: [] };

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const s = localStorage.getItem(KEY);
    if (s) state = { ...state, ...JSON.parse(s) };
  } catch { /* ignore */ }
}
function set(next: State) {
  state = next;
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* ignore */ }
  listeners.forEach((l) => l());
}

export function useShop() {
  const s = useSyncExternalStore(
    (cb) => { load(); listeners.add(cb); cb(); return () => listeners.delete(cb); },
    () => { load(); return state; },
    () => SERVER,
  );
  return s;
}

export const shop = {
  toggleWishlist(slug: string) {
    const has = state.wishlist.includes(slug);
    set({ ...state, wishlist: has ? state.wishlist.filter((s) => s !== slug) : [...state.wishlist, slug] });
    return !has;
  },
  addToCart(slug: string, qty = 1) {
    const ex = state.cart.find((l) => l.slug === slug);
    const cart = ex ? state.cart.map((l) => (l.slug === slug ? { ...l, qty: Math.min(10, l.qty + qty) } : l)) : [...state.cart, { slug, qty }];
    set({ ...state, cart });
  },
  setQty(slug: string, qty: number) {
    set({ ...state, cart: qty <= 0 ? state.cart.filter((l) => l.slug !== slug) : state.cart.map((l) => (l.slug === slug ? { ...l, qty: Math.min(10, qty) } : l)) });
  },
  remove(slug: string) { set({ ...state, cart: state.cart.filter((l) => l.slug !== slug) }); },
};
