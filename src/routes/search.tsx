import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/site/PageHeader";
import { ProductCard } from "@/components/site/ProductCard";
import { searchProducts } from "@/lib/catalog";

export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>) => ({ q: typeof s.q === "string" ? s.q : "" }),
  head: () => ({
    meta: [
      { title: "Search — AURÉVA Fine Jewellery (Demo)" },
      { name: "description", content: "Search AURÉVA jewellery by name, SKU, category or collection." },
      { property: "og:title", content: "Search — AURÉVA" },
      { property: "og:description", content: "Search the AURÉVA demo catalogue." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Page,
});

function Page() {
  const { q } = Route.useSearch();
  const navigate = useNavigate();
  const [text, setText] = useState(q);
  useEffect(() => setText(q), [q]);
  useEffect(() => {
    const t = setTimeout(() => { if (text !== q) navigate({ to: "/search", search: { q: text }, replace: true }); }, 300);
    return () => clearTimeout(t);
  }, [text, q, navigate]);
  const results = searchProducts(q);

  return (
    <>
      <PageHeader eyebrow="Search" title={q ? `“${q}”` : "Search jewellery"} />
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="mx-auto flex max-w-xl items-center gap-3 border-b-2 border-foreground/20 pb-2 focus-within:border-gold" role="search">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input autoFocus value={text} onChange={(e) => setText(e.target.value)} placeholder="Try ‘jhumka’, ‘diamond’ or AUR-DEMO-R001" aria-label="Search jewellery" className="flex-1 bg-transparent py-2 text-lg outline-none" />
          {text && <button aria-label="Clear search" onClick={() => setText("")}><X className="h-4 w-4" /></button>}
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground" aria-live="polite">
          {q ? `${results.length} result${results.length === 1 ? "" : "s"}` : "Search by name, SKU, category, collection or description."}
        </p>
        {q && results.length === 0 && <p className="mt-10 text-center text-2xl font-display">Nothing found — try a broader word like “gold” or “earrings”.</p>}
        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4">
          {results.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </>
  );
}
