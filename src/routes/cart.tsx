import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { DemoNote, PageHeader } from "@/components/site/PageHeader";
import { SafeImg } from "@/components/site/ProductCard";
import { getProduct } from "@/lib/catalog";
import { inr } from "@/lib/pricing";
import { shop, useShop } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Cart — AURÉVA (Demo)" },
      { name: "description", content: "Review the jewellery in your cart." },
      { property: "og:title", content: "Cart — AURÉVA" },
      { property: "og:description", content: "Review your cart." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Page,
});

function Page() {
  const { cart } = useShop();
  const lines = cart.map((l) => ({ ...l, p: getProduct(l.slug) })).filter((l) => l.p);
  const subtotal = lines.reduce((a, l) => a + l.p!.price * l.qty, 0);

  return (
    <>
      <PageHeader eyebrow="Your selection" title="Shopping Cart" />
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-8">
        {lines.length === 0 ? (
          <div className="py-16 text-center">
            <h2 className="text-3xl">Your cart is empty</h2>
            <Link to="/products" className="btn btn-primary mt-8">Continue shopping</Link>
          </div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-[1fr_340px]">
            <ul className="divide-y border-y">
              {lines.map(({ slug, qty, p }) => (
                <li key={slug} className="flex gap-5 py-6">
                  <Link to="/products/$slug" params={{ slug }} className="h-28 w-28 shrink-0 bg-secondary">
                    <SafeImg src={p!.images[0]} alt={p!.name} className="h-full w-full object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-4">
                      <div>
                        <Link to="/products/$slug" params={{ slug }} className="font-display text-2xl hover:text-primary">{p!.name}</Link>
                        <div className="text-xs text-muted-foreground">{p!.sku} · {p!.purityLabel}</div>
                      </div>
                      <button aria-label={`Remove ${p!.name}`} onClick={() => shop.remove(slug)}><X className="h-4 w-4" /></button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-4">
                      <div className="flex items-center border">
                        <button aria-label="Decrease quantity" className="p-2" onClick={() => shop.setQty(slug, qty - 1)}><Minus className="h-3 w-3" /></button>
                        <span className="w-8 text-center text-sm">{qty}</span>
                        <button aria-label="Increase quantity" className="p-2" onClick={() => shop.setQty(slug, qty + 1)}><Plus className="h-3 w-3" /></button>
                      </div>
                      <div>{inr(p!.price * qty)}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <aside className="h-fit space-y-4 bg-secondary/60 p-6">
              <h2 className="text-2xl">Summary</h2>
              <div className="flex justify-between text-sm"><span>Estimated total (incl. illustrative tax)</span><span>{inr(subtotal)}</span></div>
              <div className="flex justify-between text-sm text-muted-foreground"><span>Shipping</span><span>Not configured</span></div>
              <button disabled className="btn btn-primary w-full">Checkout unavailable</button>
              <DemoNote>This cart is a prototype. Online payment isn't connected, so no order can be placed. Use <Link to="/contact" className="underline">an enquiry</Link> to request a confirmed quotation.</DemoNote>
              <Link to="/products" className="block text-center text-xs uppercase tracking-[0.2em] text-primary">Continue shopping</Link>
            </aside>
          </div>
        )}
      </div>
    </>
  );
}
