import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Heart, MessageCircle, Minus, Plus, Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ProductCard, SafeImg } from "@/components/site/ProductCard";
import { DemoNote } from "@/components/site/PageHeader";
import { getCollection, getProduct, products } from "@/lib/catalog";
import { pricingConfig, whatsappLink } from "@/lib/config";
import { estimatePrice, inr } from "@/lib/pricing";
import { shop, useShop } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const p = getProduct(params.slug);
    if (!p) throw notFound();
    return { slug: p.slug, name: p.name, short: p.shortDescription };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — AURÉVA (Demo)` },
          { name: "description", content: loaderData.short },
          { property: "og:title", content: `${loaderData.name} — AURÉVA` },
          { property: "og:description", content: loaderData.short },
          { property: "og:type", content: "product" },
        ]
      : [{ title: "Product unavailable — AURÉVA" }, { name: "robots", content: "noindex" }],
  }),
  component: Page,
});

function Page() {
  const { slug } = Route.useLoaderData();
  const p = getProduct(slug)!;
  const { wishlist } = useShop();
  const [img, setImg] = useState(0);
  const [qty, setQty] = useState(1);
  const saved = wishlist.includes(p.slug);
  const est = estimatePrice(p.pricing);
  const wa = whatsappLink(`Hello, I am interested in ${p.name}, SKU ${p.sku}. Could you please share the current price, availability, and product details?`);
  const similar = products.filter((x) => x.slug !== p.slug && (x.type === p.type || x.collections.some((c) => p.collections.includes(c)))).slice(0, 4);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) await navigator.share({ title: p.name, url }).catch(() => {});
    else { await navigator.clipboard.writeText(url); toast("Link copied"); }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <nav aria-label="Breadcrumb" className="mb-8 text-xs text-muted-foreground">
        <Link to="/">Home</Link> / <Link to="/products">Jewellery</Link> / <span className="text-foreground">{p.name}</span>
      </nav>
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <div className="aspect-square overflow-hidden bg-secondary">
            <a href={p.images[img]} target="_blank" rel="noopener" aria-label="Open full-size image">
              <SafeImg src={p.images[img]} alt={p.name} loading="eager" className="h-full w-full cursor-zoom-in object-cover transition duration-500 hover:scale-110" />
            </a>
          </div>
          {p.images.length > 1 && (
            <div className="mt-3 flex gap-3">
              {p.images.map((src, i) => (
                <button key={i} onClick={() => setImg(i)} aria-label={`View image ${i + 1}`} className={cn("h-20 w-20 overflow-hidden border-2", i === img ? "border-gold" : "border-transparent")}>
                  <SafeImg src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="eyebrow">{p.type}</div>
          <h1 className="mt-2 text-4xl md:text-5xl">{p.name}</h1>
          <div className="mt-2 text-xs text-muted-foreground">SKU {p.sku}</div>
          <div className="mt-6 text-3xl font-display">{inr(est.total)} <span className="text-sm font-sans text-muted-foreground">estimated</span></div>
          <p className="mt-6 text-foreground/80">{p.description}</p>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center border">
              <button aria-label="Decrease quantity" className="p-3" onClick={() => setQty((q) => Math.max(1, q - 1))}><Minus className="h-4 w-4" /></button>
              <span className="w-8 text-center" aria-live="polite">{qty}</span>
              <button aria-label="Increase quantity" className="p-3" onClick={() => setQty((q) => Math.min(10, q + 1))}><Plus className="h-4 w-4" /></button>
            </div>
            <button className="btn btn-primary flex-1" onClick={() => { shop.addToCart(p.slug, qty); toast("Added to cart"); }}>Add to cart</button>
            <button aria-label="Toggle wishlist" aria-pressed={saved} onClick={() => shop.toggleWishlist(p.slug)} className="border p-3"><Heart className={cn("h-5 w-5", saved && "fill-primary text-primary")} /></button>
          </div>
          <div className="mt-3 flex gap-3">
            {wa ? (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-outline flex-1"><MessageCircle className="h-4 w-4" />Enquire on WhatsApp</a>
            ) : (
              <Link to="/contact" className="btn btn-outline flex-1" title="WhatsApp number not configured in this demo"><MessageCircle className="h-4 w-4" />Send an enquiry</Link>
            )}
            <button onClick={share} className="btn btn-outline"><Share2 className="h-4 w-4" />Share</button>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-y-3 border-t pt-6 text-sm">
            <dt className="text-muted-foreground">Metal</dt><dd>{p.metal.join(", ")}</dd>
            <dt className="text-muted-foreground">Purity</dt><dd>{p.purityLabel}</dd>
            <dt className="text-muted-foreground">Gross weight</dt><dd>{p.grossWeight} g</dd>
            <dt className="text-muted-foreground">Net metal weight</dt><dd>{p.pricing.netWeight} g</dd>
            {p.stoneDetails && (<><dt className="text-muted-foreground">Stones</dt><dd>{p.stoneDetails}</dd></>)}
            <dt className="text-muted-foreground">Style</dt><dd>{p.style}</dd>
            <dt className="text-muted-foreground">Collections</dt>
            <dd className="flex flex-wrap gap-x-2">{p.collections.map((c) => <Link key={c} to="/collections/$slug" params={{ slug: c }} className="text-primary underline-offset-4 hover:underline">{getCollection(c)?.name}</Link>)}</dd>
          </dl>

          <details className="mt-8 border-t pt-6" open>
            <summary className="cursor-pointer eyebrow">Price estimate breakdown</summary>
            <table className="mt-4 w-full text-sm">
              <tbody className="[&_td]:py-1.5 [&_td:last-child]:text-right">
                <tr><td>Metal value ({p.pricing.netWeight} g × {inr(est.rate.ratePerGram)}/g)</td><td>{inr(est.metalValue)}</td></tr>
                <tr><td>Making charges ({p.pricing.making.method === "percentage" ? `${p.pricing.making.value}% of metal` : p.pricing.making.method === "per_gram" ? `${inr(p.pricing.making.value)}/g` : "fixed"})</td><td>{inr(est.makingCharges)}</td></tr>
                {est.stoneCharges > 0 && <tr><td>Stone charges</td><td>{inr(est.stoneCharges)}</td></tr>}
                <tr className="border-t"><td>Subtotal</td><td>{inr(est.subtotal)}</td></tr>
                <tr><td>{pricingConfig.taxLabel}</td><td>{inr(est.tax)}</td></tr>
                <tr className="border-t font-medium"><td>Estimated total</td><td>{inr(est.total)}</td></tr>
              </tbody>
            </table>
            <div className="mt-4">
              <DemoNote>
                <strong>Illustrative estimate, not a quotation.</strong> Rate: {est.rate.sourceLabel} ({est.rate.metal} {est.rate.purity}), last set {new Date(est.rate.updatedAt).toLocaleDateString("en-IN")}. This is not a live market price. A real retailer would confirm final price per their pricing policy.
              </DemoNote>
            </div>
          </details>
          <details className="mt-6 border-t pt-6">
            <summary className="cursor-pointer eyebrow">Care & delivery</summary>
            <p className="mt-4 text-sm text-muted-foreground">Store separately in a soft pouch; avoid perfume and water contact; wipe with a dry cloth. Delivery and pickup are not configured in this demo — enquire with the showroom.</p>
          </details>
        </div>
      </div>

      {similar.length > 0 && (
        <section className="mt-24">
          <h2 className="text-4xl">You may also like</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
            {similar.map((x) => <ProductCard key={x.id} product={x} />)}
          </div>
        </section>
      )}
    </div>
  );
}
