import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { SafeImg } from "@/components/site/ProductCard";
import { collections, products } from "@/lib/catalog";

export const Route = createFileRoute("/collections/")({
  head: () => ({
    meta: [
      { title: "Collections — AURÉVA Fine Jewellery (Demo)" },
      { name: "description", content: "Bridal heritage, temple jewellery, festive edit, everyday elegance and more." },
      { property: "og:title", content: "Collections — AURÉVA" },
      { property: "og:description", content: "Explore curated jewellery collections." },
    ],
  }),
  component: () => (
    <>
      <PageHeader eyebrow="Curated" title="Collections" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 md:px-8">
        {collections.map((c) => (
          <Link key={c.slug} to="/collections/$slug" params={{ slug: c.slug }} className="group">
            <div className="aspect-[4/3] overflow-hidden bg-secondary">
              <SafeImg src={c.image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <div className="mt-5 flex items-baseline justify-between">
              <h2 className="text-3xl group-hover:text-primary">{c.name}</h2>
              <span className="text-xs text-muted-foreground">{products.filter((p) => p.collections.includes(c.slug)).length} pieces</span>
            </div>
            <p className="mt-2 text-muted-foreground">{c.description}</p>
          </Link>
        ))}
      </div>
    </>
  ),
});
