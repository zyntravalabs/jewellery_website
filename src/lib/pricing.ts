import { metalRates, pricingConfig, type MakingChargeMethod, type MetalRate } from "./config";

export interface PricingInput {
  metal: "gold" | "silver";
  purity: string;
  netWeight: number; // grams
  making: { method: MakingChargeMethod; value: number };
  stoneCharges?: number;
}

export interface PriceEstimate {
  rate: MetalRate;
  metalValue: number;
  makingCharges: number;
  stoneCharges: number;
  subtotal: number;
  tax: number;
  total: number;
}

export function findRate(metal: string, purity: string, rates = metalRates): MetalRate | undefined {
  return rates.find((r) => r.metal === metal && r.purity === purity);
}

export function estimatePrice(input: PricingInput, rates = metalRates, cfg = pricingConfig): PriceEstimate {
  const rate = findRate(input.metal, input.purity, rates);
  if (!rate) throw new Error(`No configured rate for ${input.metal} ${input.purity}`);
  const metalValue = input.netWeight * rate.ratePerGram;
  let makingCharges = 0;
  if (input.making.method === "percentage") makingCharges = metalValue * (input.making.value / 100);
  else if (input.making.method === "fixed") makingCharges = input.making.value;
  else makingCharges = input.netWeight * input.making.value;
  const stoneCharges = input.stoneCharges ?? 0;
  const subtotal = metalValue + makingCharges + stoneCharges;
  const tax = subtotal * cfg.taxRate;
  const round = (n: number) => Math.round(n / cfg.roundTo) * cfg.roundTo;
  return {
    rate,
    metalValue: round(metalValue),
    makingCharges: round(makingCharges),
    stoneCharges: round(stoneCharges),
    subtotal: round(subtotal),
    tax: round(tax),
    total: round(subtotal + tax),
  };
}

export const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
