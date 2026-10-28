import { Link } from "@tanstack/react-router";
import { collections } from "@/lib/catalog";
import { siteConfig } from "@/lib/config";

export function Footer() {
  return (
    <footer className="mt-24 bg-maroon text-maroon-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-4 md:px-8">
        <div>
          <div className="font-display text-3xl tracking-[0.25em]">{siteConfig.brand}</div>
          <p className="mt-4 text-sm opacity-70">A demonstration jewellery storefront. All products, prices and showrooms are fictional.</p>
        </div>
        <Col title="Collections">
          {collections.map((c) => (
            <Link key={c.slug} to="/collections/$slug" params={{ slug: c.slug }}>{c.name}</Link>
          ))}
        </Col>
        <Col title="Customer care">
          <Link to="/contact">Contact & enquiries</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/shipping-returns">Shipping & returns</Link>
          <Link to="/stores">Showroom locator</Link>
        </Col>
        <Col title="Policies">
          <Link to="/privacy">Privacy policy</Link>
          <Link to="/terms">Terms & conditions</Link>
          <Link to="/about">Our story</Link>
        </Col>
      </div>
      <div className="border-t border-maroon-foreground/15">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 px-4 py-6 text-xs opacity-60 md:flex-row md:px-8">
          <span>© 2026 {siteConfig.brandFull} — demo brand name, not a registered business.</span>
          <span>Designed & built by {siteConfig.agency}</span>
        </div>
      </div>
    </footer>
  );
}

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="eyebrow mb-4">{title}</div>
      <div className="flex flex-col gap-2 text-sm opacity-80 [&_a:hover]:text-gold">{children}</div>
    </div>
  );
}
