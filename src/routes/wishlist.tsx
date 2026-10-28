import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { ProductCard } from "@/components/site/ProductCard";
import { getProduct } from "@/lib/catalog";
import { useShop } from "@/lib/store";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist — AURÉVA (Demo)" },
      { name: "description", content: "Your saved AURÉVA jewellery pieces." },
      { property: "og:title", content: "Wishlist — AURÉVA" },
      { property: "og:description", content: "Your saved jewellery pieces." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Page,
});

function Page() {
  const { wishlist } = useShop();
  const items = wishlist.map(getProduct).filter((p) => !!p);
  return (
    <>
      <PageHeader eyebrow="Saved" title="Your Wishlist">Saved in this browser only — it won't appear on other devices.</PageHeader>
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8">
        {items.length === 0 ? (
          <div className="py-16 text-center">
            <h2 className="text-3xl">Nothing saved yet</h2>
            <p className="mt-2 text-muted-foreground">Tap the heart on any piece to keep it here.</p>
            <Link to="/products" className="btn btn-primary mt-8">Browse jewellery</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4">
            {items.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </>
  );
}
