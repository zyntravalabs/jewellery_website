import { describe, expect, it } from "vitest";
import { estimatePrice } from "./pricing";
import type { MetalRate } from "./config";

const rates: MetalRate[] = [
  { metal: "gold", purity: "22K", ratePerGram: 6000, source: "demo", sourceLabel: "test", updatedAt: "" },
];
const cfg = { taxRate: 0.03, taxLabel: "", roundTo: 1 };

describe("price estimate", () => {
  it("metal value = weight × rate per gram", () => {
    const e = estimatePrice({ metal: "gold", purity: "22K", netWeight: 10, making: { method: "fixed", value: 0 } }, rates, cfg);
    expect(e.metalValue).toBe(60000);
  });
  it("percentage making charge applies to metal value", () => {
    const e = estimatePrice({ metal: "gold", purity: "22K", netWeight: 10, making: { method: "percentage", value: 12 } }, rates, cfg);
    expect(e.makingCharges).toBe(7200);
  });
  it("per-gram making charge multiplies by weight", () => {
    const e = estimatePrice({ metal: "gold", purity: "22K", netWeight: 10, making: { method: "per_gram", value: 500 } }, rates, cfg);
    expect(e.makingCharges).toBe(5000);
  });
  it("total = subtotal (metal + making + stones) plus tax", () => {
    const e = estimatePrice({ metal: "gold", purity: "22K", netWeight: 10, making: { method: "fixed", value: 4000 }, stoneCharges: 6000 }, rates, cfg);
    expect(e.subtotal).toBe(70000);
    expect(e.tax).toBe(2100);
    expect(e.total).toBe(72100);
  });
  it("throws when no rate is configured", () => {
    expect(() => estimatePrice({ metal: "silver", purity: "925", netWeight: 1, making: { method: "fixed", value: 0 } }, rates, cfg)).toThrow();
  });
});
