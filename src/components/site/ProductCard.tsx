import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/lib/catalog";
import { inr } from "@/lib/pricing";
import { shop, useShop } from "@/lib/store";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { wishlist } = useShop();
  const saved = wishlist.includes(product.slug);
  return (
    <div className="group relative">
      <Link to="/products/$slug" params={{ slug: product.slug }} className="block">
        <div className="aspect-square overflow-hidden bg-secondary">
          <SafeImg src={product.images[0]} alt={product.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        </div>
        <div className="mt-4 space-y-1">
          <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{product.type} · {product.purityLabel}</div>
          <h3 className="font-display text-xl leading-tight">{product.name}</h3>
          <div className="text-sm">
            <span className="text-muted-foreground">Est. </span>
            {inr(product.price)}
          </div>
        </div>
      </Link>
      <button
        aria-label={saved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        aria-pressed={saved}
        onClick={() => toast(shop.toggleWishlist(product.slug) ? "Saved to wishlist" : "Removed from wishlist")}
        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 transition hover:bg-background"
      >
        <Heart className={cn("h-4 w-4", saved && "fill-primary text-primary")} />
      </button>
    </div>
  );
}

export function SafeImg(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      loading="lazy"
      {...props}
      onError={(e) => {
        const t = e.currentTarget;
        t.style.visibility = "hidden";
      }}
    />
  );
}
