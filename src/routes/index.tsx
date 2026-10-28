import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import bridal from "@/assets/bridal.jpg";
import { categories, collections, products, stores } from "@/lib/catalog";
import { ProductCard, SafeImg } from "@/components/site/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AURÉVA Fine Jewellery — Gold, Diamond & Bridal (Demo)" },
      { name: "description", content: "Discover gold, diamond, silver and bridal jewellery in this premium Indian jewellery storefront demo by Zyntrava Labs." },
      { property: "og:title", content: "AURÉVA Fine Jewellery — Jewellery That Becomes Your Legacy" },
      { property: "og:description", content: "A premium Indian jewellery e-commerce demonstration by Zyntrava Labs." },
    ],
  }),
  component: Home,
});

function Home() {
  const best = products.filter((p) => p.featured).slice(0, 8);
  return (
    <>
      <section className="relative h-[82vh] min-h-[560px] overflow-hidden bg-maroon">
        <img src={hero} alt="Bride wearing a gold temple necklace and jhumkas" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover object-[70%_center]" />
        <div className="hero-scrim absolute inset-0" />
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 md:px-8">
          <div className="max-w-xl animate-fade-up text-ivory">
            <div className="eyebrow mb-5">The Heritage Edit</div>
            <h1 className="text-5xl leading-[1.05] md:text-7xl">Jewellery That Becomes Your Legacy.</h1>
            <p className="mt-6 max-w-md text-base opacity-85">Traditional Indian craft, shaped for the way you celebrate today.</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/categories/$slug" params={{ slug: "gold" }} className="btn btn-gold">Shop Gold</Link>
              <Link to="/categories/$slug" params={{ slug: "bridal" }} className="btn btn-ghost-light">Explore Bridal</Link>
              <Link to="/collections" className="btn btn-ghost-light">Discover Collections</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 md:px-8">
        <SectionTitle eyebrow="Shop by category" title="Find your piece" />
        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((c) => (
            <Link key={c.slug} to="/categories/$slug" params={{ slug: c.slug }} className="group text-center">
              <div className="aspect-square overflow-hidden rounded-full border border-gold/40 p-1.5">
                <SafeImg src={c.image} alt="" className="h-full w-full rounded-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="mt-4 font-display text-lg group-hover:text-primary">{c.name}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-secondary/60 py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionTitle eyebrow="Featured collections" title="Curated stories in gold" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {collections.map((c, i) => (
              <Link key={c.slug} to="/collections/$slug" params={{ slug: c.slug }} className={`group relative block overflow-hidden ${i === 0 ? "md:row-span-2" : ""}`}>
                <SafeImg src={c.image} alt="" className={`w-full object-cover transition duration-700 group-hover:scale-105 ${i === 0 ? "h-full min-h-[420px]" : "aspect-[4/3]"}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon/85 via-maroon/10 to-transparent" />
                <div className="absolute bottom-0 p-6 text-ivory">
                  <h3 className="text-3xl">{c.name}</h3>
                  <span className="mt-2 inline-block text-xs uppercase tracking-[0.2em] text-gold">Explore →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 md:px-8">
        <div className="flex items-end justify-between">
          <SectionTitle eyebrow="Featured pieces" title="Selected for you" align="left" />
          <Link to="/products" className="hidden text-xs uppercase tracking-[0.2em] text-primary md:block">View all →</Link>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
          {best.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="grid bg-maroon text-maroon-foreground md:grid-cols-2">
        <SafeImg src={bridal} alt="Bridal hands with gold bangles and a choker" className="h-full max-h-[720px] w-full object-cover" />
        <div className="flex items-center px-8 py-20 md:px-16">
          <div className="max-w-md">
            <div className="eyebrow mb-4">Bridal Heritage</div>
            <h2 className="text-5xl leading-tight">For the day you'll remember in gold.</h2>
            <p className="mt-6 opacity-80">Chokers, haarams and bangles composed as complete bridal looks. Book a quiet consultation to try pieces together.</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/collections/$slug" params={{ slug: "bridal-heritage" }} className="btn btn-gold">View Bridal Collection</Link>
              <Link to="/contact" className="btn btn-ghost-light">Request Appointment</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-16 px-4 py-24 md:grid-cols-2 md:px-8">
        <div>
          <div className="eyebrow mb-4">Our philosophy</div>
          <h2 className="text-4xl leading-tight md:text-5xl">Heirloom thinking, modern clarity.</h2>
          <p className="mt-6 text-muted-foreground">AURÉVA is a fictional concept brand. Its idea is simple: honour the motifs of Indian goldsmithing — temple deities, peacocks, lotus and filigree — while making it easy to understand exactly what you're buying.</p>
          <Link to="/about" className="mt-8 inline-block text-xs uppercase tracking-[0.2em] text-primary">Read our story →</Link>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          {[
            ["Transparent estimates", "Every price shows the rate, making charge and tax assumptions behind it."],
            ["Clear specifications", "Weights and purity are shown only when supplied — never guessed."],
            ["Considered design", "Motifs rooted in tradition, proportioned for everyday wear."],
            ["Showroom support", "Try pieces in person and get a confirmed quotation."],
          ].map(([t, d]) => (
            <div key={t} className="border-t border-gold/50 pt-5">
              <h3 className="text-2xl">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y bg-secondary/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-16 text-center md:flex-row md:justify-between md:text-left md:px-8">
          <div>
            <div className="eyebrow mb-2">Visit us</div>
            <h2 className="text-4xl">{stores.length} sample showrooms</h2>
            <p className="mt-2 text-sm text-muted-foreground">Fictional locations in {stores.map((s) => s.city).join(", ")} for demonstration.</p>
          </div>
          <Link to="/stores" className="btn btn-primary">Find a showroom</Link>
        </div>
      </section>
    </>
  );
}

export function SectionTitle({ eyebrow, title, align = "center" }: { eyebrow: string; title: string; align?: "center" | "left" }) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <div className="eyebrow mb-3">{eyebrow}</div>
      <h2 className="text-4xl md:text-5xl">{title}</h2>
    </div>
  );
}
