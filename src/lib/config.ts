/**
 * Central site configuration. Everything here is DEMO data for the
 * AURÉVA portfolio build by Zyntrava Labs — replace with a real retailer's
 * verified details before launch.
 */
export const siteConfig = {
  brand: "AURÉVA",
  brandFull: "AURÉVA Fine Jewellery",
  agency: "Zyntrava Labs",
  announcement: "Demonstration storefront by Zyntrava Labs · Products, prices and showrooms are fictional",
  /** Retailer WhatsApp number in international format without "+". null = not configured. */
  whatsappNumber: null as string | null,
  /** Agency contact — kept separate from the retailer contact. */
  agencyEmail: null as string | null,
  socials: [] as { label: string; href: string }[],
};

export type MakingChargeMethod = "percentage" | "fixed" | "per_gram";

export interface MetalRate {
  metal: "gold" | "silver";
  purity: string;
  ratePerGram: number;
  source: "demo" | "provider";
  sourceLabel: string;
  updatedAt: string;
}

/**
 * Illustrative metal rates. These are NOT live market prices.
 * To use a live provider, set source to "provider" from a verified feed.
 */
export const metalRates: MetalRate[] = [
  { metal: "gold", purity: "22K", ratePerGram: 6800, source: "demo", sourceLabel: "Manually configured demonstration rate", updatedAt: "2026-10-01T09:00:00+05:30" },
  { metal: "gold", purity: "18K", ratePerGram: 5560, source: "demo", sourceLabel: "Manually configured demonstration rate", updatedAt: "2026-10-01T09:00:00+05:30" },
  { metal: "silver", purity: "925", ratePerGram: 88, source: "demo", sourceLabel: "Manually configured demonstration rate", updatedAt: "2026-10-01T09:00:00+05:30" },
];

export const pricingConfig = {
  /** Illustrative GST rate applied to the estimated subtotal. */
  taxRate: 0.03,
  taxLabel: "GST (illustrative 3%)",
  /** Round final estimate to nearest rupee multiple. */
  roundTo: 1,
};

export function whatsappLink(message: string): string | null {
  if (!siteConfig.whatsappNumber) return null;
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
