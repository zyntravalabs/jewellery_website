import { useNavigate } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useMemo, useState } from "react";
import { collections, type Product } from "@/lib/catalog";
import { ProductCard } from "./ProductCard";

export type CatalogueSearch = {
  metal?: string; type?: string; occasion?: string; style?: string; collection?: string;
  max?: number; sort?: "featured" | "new" | "price-asc" | "price-desc" | "name";
};

export function validateCatalogueSearch(s: Record<string, unknown>): CatalogueSearch {
  const str = (v: unknown) => (typeof v === "string" && v ? v : undefined);
  const sorts = ["featured", "new", "price-asc", "price-desc", "name"];
  return {
    metal: str(s.metal), type: str(s.type), occasion: str(s.occasion), style: str(s.style), collection: str(s.collection),
    max: typeof s.max === "number" ? s.max : s.max ? Number(s.max) || undefined : undefined,
    sort: sorts.includes(String(s.sort)) ? (s.sort as CatalogueSearch["sort"]) : undefined,
  };
}

const groups = [
  { key: "metal", label: "Metal", options: ["Gold", "Diamond", "Silver", "Gemstone"] },
  { key: "type", label: "Jewellery type", options: ["Necklaces", "Earrings", "Bangles", "Rings", "Chains", "Pendants"] },
  { key: "occasion", label: "Occasion", options: ["Bridal", "Everyday", "Festive"] },
  { key: "style", label: "Style", options: ["Traditional", "Contemporary"] },
] as const;
const priceSteps = [25000, 50000, 100000, 250000, 500000];
const PAGE = 8;

export function Catalogue({ base, search }: { base: Product[]; search: CatalogueSearch }) {
  const navigate = useNavigate();
  const [shown, setShown] = useState(PAGE);
  const update = (patch: Partial<CatalogueSearch>) => {
    setShown(PAGE);
    navigate({ to: ".", search: (prev: CatalogueSearch) => ({ ...prev, ...patch }), replace: true });
  };

  const results = useMemo(() => {
    let r = base.filter((p) =>
      (!search.metal || p.metal.includes(search.metal as never)) &&
      (!search.type || p.type === search.type) &&
      (!search.occasion || p.occasion.includes(search.occasion as never)) &&
      (!search.style || p.style === search.style) &&
      (!search.collection || p.collections.includes(search.collection)) &&
      (!search.max || p.price <= search.max),
    );
    const s = search.sort ?? "featured";
    r = [...r].sort((a, b) =>
      s === "price-asc" ? a.price - b.price : s === "price-desc" ? b.price - a.price : s === "name" ? a.name.localeCompare(b.name) : s === "new" ? b.createdAt.localeCompare(a.createdAt) : Number(b.featured) - Number(a.featured),
    );
    return r;
  }, [base, search]);

  const active = (Object.entries(search) as [keyof CatalogueSearch, unknown][]).filter(([k, v]) => v && k !== "sort");

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
        <aside aria-label="Filters" className="space-y-8">
          {groups.map((g) => (
            <fieldset key={g.key}>
              <legend className="eyebrow mb-3">{g.label}</legend>
              <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-2">
                {g.options.map((o) => {
                  const on = search[g.key] === o;
                  return (
                    <button key={o} aria-pressed={on} onClick={() => update({ [g.key]: on ? undefined : o })} className={`text-left text-sm transition ${on ? "text-primary underline underline-offset-4" : "text-foreground/75 hover:text-primary"}`}>
                      {o}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ))}
          <fieldset>
            <legend className="eyebrow mb-3">Collection</legend>
            <select value={search.collection ?? ""} onChange={(e) => update({ collection: e.target.value || undefined })} className="w-full border bg-card px-3 py-2 text-sm" aria-label="Collection">
              <option value="">All collections</option>
              {collections.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
            </select>
          </fieldset>
          <fieldset>
            <legend className="eyebrow mb-3">Max estimate</legend>
            <select value={search.max ?? ""} onChange={(e) => update({ max: e.target.value ? Number(e.target.value) : undefined })} className="w-full border bg-card px-3 py-2 text-sm" aria-label="Maximum price">
              <option value="">Any price</option>
              {priceSteps.map((p) => <option key={p} value={p}>Up to ₹{p.toLocaleString("en-IN")}</option>)}
            </select>
          </fieldset>
        </aside>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
            <p className="text-sm text-muted-foreground" aria-live="polite">{results.length} {results.length === 1 ? "piece" : "pieces"}</p>
            <label className="flex items-center gap-2 text-sm">
              Sort
              <select value={search.sort ?? "featured"} onChange={(e) => update({ sort: e.target.value as CatalogueSearch["sort"] })} className="border bg-card px-3 py-2">
                <option value="featured">Featured</option>
                <option value="new">New arrivals</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="name">Name</option>
              </select>
            </label>
          </div>
          {active.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {active.map(([k, v]) => (
                <button key={k} onClick={() => update({ [k]: undefined })} className="flex items-center gap-1 border border-gold/60 bg-gold/10 px-3 py-1 text-xs">
                  {k === "max" ? `≤ ₹${Number(v).toLocaleString("en-IN")}` : k === "collection" ? collections.find((c) => c.slug === v)?.name : String(v)}
                  <X className="h-3 w-3" aria-label="remove" />
                </button>
              ))}
              <button onClick={() => update({ metal: undefined, type: undefined, occasion: undefined, style: undefined, collection: undefined, max: undefined })} className="text-xs uppercase tracking-[0.15em] text-primary">Clear all</button>
            </div>
          )}
          {results.length === 0 ? (
            <div className="py-24 text-center">
              <h2 className="text-3xl">No pieces match these filters</h2>
              <p className="mt-2 text-muted-foreground">Try removing a filter or widening the price range.</p>
            </div>
          ) : (
            <>
              <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3">
                {results.slice(0, shown).map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
              {shown < results.length && (
                <div className="mt-12 text-center">
                  <button onClick={() => setShown((n) => n + PAGE)} className="btn btn-outline">Load more</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
