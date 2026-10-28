import necklace from "@/assets/p-necklace.jpg";
import earrings from "@/assets/p-earrings.jpg";
import bangles from "@/assets/p-bangles.jpg";
import ring from "@/assets/p-ring.jpg";
import pendant from "@/assets/p-pendant.jpg";
import silver from "@/assets/p-silver.jpg";
import bridal from "@/assets/bridal.jpg";
import hero from "@/assets/hero.jpg";
import { estimatePrice, type PricingInput } from "./pricing";

/* ALL DATA IN THIS FILE IS FICTIONAL DEMONSTRATION DATA. */

export type Metal = "Gold" | "Diamond" | "Silver" | "Gemstone";
export type JewelleryType = "Necklaces" | "Earrings" | "Bangles" | "Rings" | "Chains" | "Pendants";
export type Occasion = "Bridal" | "Everyday" | "Festive";
export type Style = "Traditional" | "Contemporary";

export interface Category { slug: string; name: string; image: string; blurb: string; match: (p: Product) => boolean }
export interface Collection { slug: string; name: string; image: string; description: string }

export interface Product {
  id: string;
  sku: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  images: string[];
  metal: Metal[];
  purityLabel: string;
  type: JewelleryType;
  occasion: Occasion[];
  style: Style;
  collections: string[];
  grossWeight: number;
  pricing: PricingInput;
  stoneDetails?: string;
  featured: boolean;
  createdAt: string;
  price: number;
}

export const collections: Collection[] = [
  { slug: "bridal-heritage", name: "Bridal Heritage", image: bridal, description: "Statement chokers, layered haarams and bangles composed for the wedding day." },
  { slug: "temple-jewellery", name: "Temple Jewellery", image: necklace, description: "Deity motifs and kemp-inspired detailing drawn from South Indian temple art." },
  { slug: "everyday-elegance", name: "Everyday Elegance", image: pendant, description: "Light, wearable pieces designed for the office, brunch and everything between." },
  { slug: "festive-edit", name: "Festive Edit", image: earrings, description: "Jhumkas, bangles and colour for Diwali, Onam, Pongal and celebrations." },
  { slug: "contemporary-gold", name: "Contemporary Gold", image: bangles, description: "Clean silhouettes and modern geometry rendered in warm gold." },
  { slug: "diamond-essentials", name: "Diamond Essentials", image: ring, description: "Solitaires and pendants with a quiet, lasting sparkle." },
];

type Raw = Omit<Product, "price" | "id">;
const raw: Raw[] = [
  { sku: "AUR-DEMO-N001", slug: "lakshmi-temple-haaram", name: "Lakshmi Temple Haaram", shortDescription: "Long temple necklace with Lakshmi coin motifs and red stone accents.", description: "A long haaram built from hand-finished Lakshmi coin panels, framed by red stones and gold bead drops. Designed to sit at mid-torso over silk.", images: [necklace, hero], metal: ["Gold", "Gemstone"], purityLabel: "22K (demo)", type: "Necklaces", occasion: ["Bridal", "Festive"], style: "Traditional", collections: ["temple-jewellery", "bridal-heritage"], grossWeight: 62.4, pricing: { metal: "gold", purity: "22K", netWeight: 58.2, making: { method: "percentage", value: 14 }, stoneCharges: 8500 }, stoneDetails: "Synthetic red stones (demo)", featured: true, createdAt: "2026-09-12" },
  { sku: "AUR-DEMO-N002", slug: "rajkumari-bridal-choker", name: "Rajkumari Bridal Choker", shortDescription: "Wide filigree choker with pearl fringe.", description: "A broad choker with dense filigree work and a soft fringe of pearls, made to frame the neckline on the wedding day.", images: [bridal, necklace], metal: ["Gold"], purityLabel: "22K (demo)", type: "Necklaces", occasion: ["Bridal"], style: "Traditional", collections: ["bridal-heritage"], grossWeight: 48.6, pricing: { metal: "gold", purity: "22K", netWeight: 44.1, making: { method: "percentage", value: 16 }, stoneCharges: 4200 }, stoneDetails: "Cultured pearls (demo)", featured: true, createdAt: "2026-08-20" },
  { sku: "AUR-DEMO-E001", slug: "mayil-jhumka", name: "Mayil Peacock Jhumka", shortDescription: "Dome jhumkas with peacock engraving and pearl drops.", description: "Classic dome jhumkas engraved with facing peacocks, finished with a pear-shaped top and a ring of pearl drops.", images: [earrings], metal: ["Gold"], purityLabel: "22K (demo)", type: "Earrings", occasion: ["Festive", "Bridal"], style: "Traditional", collections: ["festive-edit", "temple-jewellery"], grossWeight: 18.2, pricing: { metal: "gold", purity: "22K", netWeight: 16.4, making: { method: "per_gram", value: 650 }, stoneCharges: 1800 }, stoneDetails: "Cubic zirconia, cultured pearls (demo)", featured: true, createdAt: "2026-09-30" },
  { sku: "AUR-DEMO-E002", slug: "noor-everyday-jhumki", name: "Noor Everyday Jhumki", shortDescription: "Petite jhumkis light enough for daily wear.", description: "A smaller, lighter take on the jhumka, with a single pearl drop and polished finish.", images: [earrings], metal: ["Gold"], purityLabel: "22K (demo)", type: "Earrings", occasion: ["Everyday"], style: "Traditional", collections: ["everyday-elegance"], grossWeight: 6.1, pricing: { metal: "gold", purity: "22K", netWeight: 5.6, making: { method: "per_gram", value: 600 } }, featured: false, createdAt: "2026-07-14" },
  { sku: "AUR-DEMO-B001", slug: "vanya-carved-bangles", name: "Vanya Carved Bangles (Pair)", shortDescription: "Pair of floral-carved broad bangles.", description: "Broad bangles with paisley and floral relief carving, sold as a pair with a screw-lock opening.", images: [bangles], metal: ["Gold"], purityLabel: "22K (demo)", type: "Bangles", occasion: ["Bridal", "Festive"], style: "Traditional", collections: ["bridal-heritage", "festive-edit"], grossWeight: 42.0, pricing: { metal: "gold", purity: "22K", netWeight: 41.2, making: { method: "percentage", value: 12 } }, featured: true, createdAt: "2026-06-02" },
  { sku: "AUR-DEMO-B002", slug: "arc-sleek-kada", name: "Arc Sleek Kada", shortDescription: "Minimal open kada with polished edges.", description: "A single open kada with a clean arc profile — modern, stackable and easy to wear.", images: [bangles], metal: ["Gold"], purityLabel: "18K (demo)", type: "Bangles", occasion: ["Everyday"], style: "Contemporary", collections: ["contemporary-gold", "everyday-elegance"], grossWeight: 12.4, pricing: { metal: "gold", purity: "18K", netWeight: 12.0, making: { method: "percentage", value: 10 } }, featured: false, createdAt: "2026-10-05" },
  { sku: "AUR-DEMO-R001", slug: "eternal-solitaire-ring", name: "Eternal Solitaire Ring", shortDescription: "Two-tone twisted band with a round solitaire.", description: "A twisting two-tone band holding a round brilliant centre stone in a four-prong setting.", images: [ring], metal: ["Diamond", "Gold"], purityLabel: "18K (demo)", type: "Rings", occasion: ["Bridal", "Everyday"], style: "Contemporary", collections: ["diamond-essentials", "contemporary-gold"], grossWeight: 3.8, pricing: { metal: "gold", purity: "18K", netWeight: 3.5, making: { method: "fixed", value: 4500 }, stoneCharges: 68000 }, stoneDetails: "Round brilliant, approx. 0.50 ct (demo specification)", featured: true, createdAt: "2026-10-10" },
  { sku: "AUR-DEMO-R002", slug: "kamal-cocktail-ring", name: "Kamal Cocktail Ring", shortDescription: "Lotus-inspired gold cocktail ring.", description: "A domed lotus ring with layered petals and a small central stone.", images: [ring], metal: ["Gold"], purityLabel: "22K (demo)", type: "Rings", occasion: ["Festive"], style: "Traditional", collections: ["festive-edit"], grossWeight: 7.2, pricing: { metal: "gold", purity: "22K", netWeight: 6.8, making: { method: "per_gram", value: 700 } }, featured: false, createdAt: "2026-05-22" },
  { sku: "AUR-DEMO-P001", slug: "solace-diamond-pendant", name: "Solace Diamond Pendant", shortDescription: "Single-stone pendant on a fine cable chain.", description: "A four-prong solitaire pendant on a fine cable chain — the everyday diamond.", images: [pendant], metal: ["Diamond", "Gold"], purityLabel: "18K (demo)", type: "Pendants", occasion: ["Everyday"], style: "Contemporary", collections: ["diamond-essentials", "everyday-elegance"], grossWeight: 2.9, pricing: { metal: "gold", purity: "18K", netWeight: 2.6, making: { method: "fixed", value: 3200 }, stoneCharges: 32000 }, stoneDetails: "Round brilliant, approx. 0.25 ct (demo specification)", featured: true, createdAt: "2026-10-18" },
  { sku: "AUR-DEMO-P002", slug: "om-gold-pendant", name: "Om Gold Pendant", shortDescription: "Small devotional pendant, chain sold separately.", description: "A compact, polished Om pendant with a broad bail that fits most chains.", images: [pendant], metal: ["Gold"], purityLabel: "22K (demo)", type: "Pendants", occasion: ["Everyday", "Festive"], style: "Traditional", collections: ["everyday-elegance"], grossWeight: 2.2, pricing: { metal: "gold", purity: "22K", netWeight: 2.1, making: { method: "per_gram", value: 550 } }, featured: false, createdAt: "2026-04-11" },
  { sku: "AUR-DEMO-C001", slug: "rope-twist-chain", name: "Rope Twist Chain", shortDescription: "20-inch rope chain with lobster clasp.", description: "A classic rope twist chain, 20 inches, suitable alone or with a pendant.", images: [pendant], metal: ["Gold"], purityLabel: "22K (demo)", type: "Chains", occasion: ["Everyday"], style: "Contemporary", collections: ["everyday-elegance", "contemporary-gold"], grossWeight: 10.5, pricing: { metal: "gold", purity: "22K", netWeight: 10.3, making: { method: "percentage", value: 8 } }, featured: false, createdAt: "2026-09-01" },
  { sku: "AUR-DEMO-C002", slug: "silver-box-chain", name: "Silver Box Chain", shortDescription: "Sterling silver box chain, 18 inch.", description: "A crisp, square-link box chain in sterling silver.", images: [silver], metal: ["Silver"], purityLabel: "925 (demo)", type: "Chains", occasion: ["Everyday"], style: "Contemporary", collections: ["everyday-elegance"], grossWeight: 8.0, pricing: { metal: "silver", purity: "925", netWeight: 8.0, making: { method: "fixed", value: 650 } }, featured: false, createdAt: "2026-08-08" },
  { sku: "AUR-DEMO-N003", slug: "pachai-oxidised-choker", name: "Pachai Oxidised Choker", shortDescription: "Oxidised silver choker with green stones.", description: "An oxidised sterling silver choker set with green stones and bell drops, finished on a braided thread tie.", images: [silver], metal: ["Silver", "Gemstone"], purityLabel: "925 (demo)", type: "Necklaces", occasion: ["Festive"], style: "Traditional", collections: ["festive-edit"], grossWeight: 54.0, pricing: { metal: "silver", purity: "925", netWeight: 50.0, making: { method: "percentage", value: 40 }, stoneCharges: 1200 }, stoneDetails: "Green glass stones (demo)", featured: true, createdAt: "2026-10-01" },
  { sku: "AUR-DEMO-E003", slug: "linea-diamond-studs", name: "Linea Diamond Studs", shortDescription: "Pair of round diamond studs in gold.", description: "Simple round studs in a four-prong basket, with screw backs.", images: [ring], metal: ["Diamond", "Gold"], purityLabel: "18K (demo)", type: "Earrings", occasion: ["Everyday"], style: "Contemporary", collections: ["diamond-essentials"], grossWeight: 2.4, pricing: { metal: "gold", purity: "18K", netWeight: 2.0, making: { method: "fixed", value: 3800 }, stoneCharges: 41000 }, stoneDetails: "Two round brilliants, approx. 0.30 ct total (demo specification)", featured: false, createdAt: "2026-10-20" },
];

export const products: Product[] = raw.map((p, i) => ({ ...p, id: String(i + 1), price: estimatePrice(p.pricing).total }));

export const categories: Category[] = [
  { slug: "gold", name: "Gold Jewellery", image: bangles, blurb: "22K and 18K pieces, traditional to modern.", match: (p) => p.metal.includes("Gold") },
  { slug: "diamond", name: "Diamond Jewellery", image: ring, blurb: "Solitaires, studs and pendants.", match: (p) => p.metal.includes("Diamond") },
  { slug: "silver", name: "Silver Jewellery", image: silver, blurb: "Sterling and oxidised silver.", match: (p) => p.metal.includes("Silver") },
  { slug: "bridal", name: "Bridal Jewellery", image: bridal, blurb: "Pieces composed for the wedding.", match: (p) => p.occasion.includes("Bridal") },
  { slug: "necklaces", name: "Necklaces", image: necklace, blurb: "Haarams, chokers and more.", match: (p) => p.type === "Necklaces" },
  { slug: "bangles", name: "Bangles", image: bangles, blurb: "Pairs, kadas and stacks.", match: (p) => p.type === "Bangles" },
  { slug: "earrings", name: "Earrings", image: earrings, blurb: "Jhumkas, studs and drops.", match: (p) => p.type === "Earrings" },
  { slug: "rings", name: "Rings", image: ring, blurb: "Solitaires and cocktail rings.", match: (p) => p.type === "Rings" },
  { slug: "chains", name: "Chains", image: pendant, blurb: "Rope, box and cable chains.", match: (p) => p.type === "Chains" },
  { slug: "pendants", name: "Pendants", image: pendant, blurb: "Devotional and diamond pendants.", match: (p) => p.type === "Pendants" },
];

export interface Store { slug: string; name: string; city: string; address: string; phone: string | null; hours: string; services: string[] }
export const stores: Store[] = [
  { slug: "chennai-sample", name: "AURÉVA Sample Showroom — Chennai", city: "Chennai", address: "Fictional address, T. Nagar area, Chennai (sample)", phone: null, hours: "10:00 – 21:00, all days (sample)", services: ["Bridal consultation", "Custom orders", "Jewellery cleaning"] },
  { slug: "bengaluru-sample", name: "AURÉVA Sample Showroom — Bengaluru", city: "Bengaluru", address: "Fictional address, Jayanagar area, Bengaluru (sample)", phone: null, hours: "10:30 – 20:30, closed Tuesdays (sample)", services: ["Bridal consultation", "Diamond viewing"] },
  { slug: "hyderabad-sample", name: "AURÉVA Sample Showroom — Hyderabad", city: "Hyderabad", address: "Fictional address, Banjara Hills area, Hyderabad (sample)", phone: null, hours: "11:00 – 21:00, all days (sample)", services: ["Custom orders", "Old gold exchange enquiries"] },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getCollection = (slug: string) => collections.find((c) => c.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

export function searchProducts(q: string): Product[] {
  const t = q.trim().toLowerCase();
  if (!t) return [];
  return products.filter((p) => {
    const cols = p.collections.map((c) => getCollection(c)?.name ?? "").join(" ");
    return [p.name, p.sku, p.type, p.metal.join(" "), p.occasion.join(" "), p.style, cols, p.shortDescription, p.description].join(" ").toLowerCase().includes(t);
  });
}
