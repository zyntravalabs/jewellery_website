import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { categories } from "@/lib/catalog";
import { siteConfig } from "@/lib/config";
import { useShop } from "@/lib/store";

const nav = [
  { to: "/products", label: "Shop All" },
  { to: "/collections", label: "Collections" },
  { to: "/categories/$slug", params: { slug: "bridal" }, label: "Bridal" },
  { to: "/stores", label: "Showrooms" },
  { to: "/about", label: "Our Story" },
] as const;

export function Header() {
  const { wishlist, cart } = useShop();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const count = cart.reduce((a, l) => a + l.qty, 0);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    setOpen(false);
    navigate({ to: "/search", search: { q: q.trim() } });
  };

  return (
    <>
      <div className="bg-maroon px-4 py-2 text-center text-[11px] tracking-[0.15em] text-maroon-foreground">
        {siteConfig.announcement}
      </div>
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center gap-6 px-4 md:px-8">
          <button className="lg:hidden" aria-label="Open menu" onClick={() => setOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
          <Link to="/" className="font-display text-3xl tracking-[0.25em] text-primary">
            {siteConfig.brand}
          </Link>
          <nav className="hidden flex-1 justify-center gap-8 lg:flex" aria-label="Main">
            <div className="group relative">
              <Link to="/products" className="py-8 text-xs uppercase tracking-[0.2em] hover:text-primary">Jewellery</Link>
              <div className="invisible absolute left-1/2 top-full w-[520px] -translate-x-1/2 border bg-card p-6 opacity-0 shadow-xl transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                  {categories.map((c) => (
                    <Link key={c.slug} to="/categories/$slug" params={{ slug: c.slug }} className="text-sm hover:text-primary">
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {nav.map((n) => (
              <Link key={n.label} to={n.to} params={"params" in n ? n.params : undefined} className="text-xs uppercase tracking-[0.2em] hover:text-primary" activeProps={{ className: "text-primary" }}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-5 lg:ml-0">
            <form onSubmit={submit} className="hidden items-center border-b border-foreground/30 md:flex" role="search">
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search jewellery" aria-label="Search" className="w-40 bg-transparent py-1 text-sm outline-none placeholder:text-muted-foreground" />
              <button aria-label="Submit search"><Search className="h-4 w-4" /></button>
            </form>
            <Link to="/wishlist" aria-label={`Wishlist, ${wishlist.length} items`} className="relative">
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && <Badge n={wishlist.length} />}
            </Link>
            <Link to="/cart" aria-label={`Cart, ${count} items`} className="relative">
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && <Badge n={count} />}
            </Link>
          </div>
        </div>
      </header>
      {open && (
        <div className="fixed inset-0 z-50 bg-background p-6 lg:hidden" role="dialog" aria-label="Menu">
          <div className="flex items-center justify-between">
            <span className="font-display text-2xl tracking-[0.25em] text-primary">{siteConfig.brand}</span>
            <button aria-label="Close menu" onClick={() => setOpen(false)}><X className="h-5 w-5" /></button>
          </div>
          <form onSubmit={submit} className="mt-8 flex border-b" role="search">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search jewellery" aria-label="Search" className="flex-1 bg-transparent py-2 outline-none" />
            <button aria-label="Submit search"><Search className="h-4 w-4" /></button>
          </form>
          <div className="mt-8 flex flex-col gap-5 font-display text-2xl">
            {nav.map((n) => (
              <Link key={n.label} to={n.to} params={"params" in n ? n.params : undefined} onClick={() => setOpen(false)}>{n.label}</Link>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 text-sm">
            {categories.map((c) => (
              <Link key={c.slug} to="/categories/$slug" params={{ slug: c.slug }} onClick={() => setOpen(false)} className="text-muted-foreground">{c.name}</Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function Badge({ n }: { n: number }) {
  return <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-medium text-gold-foreground">{n}</span>;
}
