import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Prose } from "@/components/site/PageHeader";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions — AURÉVA (Demo)" },
      { name: "description", content: "Answers about this demonstration storefront." },
      { property: "og:title", content: "Frequently Asked Questions — AURÉVA" },
      { property: "og:description", content: "Answers about this demonstration storefront." },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <>
      <PageHeader eyebrow="Help" title="Frequently Asked Questions">Answers about this demonstration storefront.</PageHeader>
      <Prose>
        <h2>Are these real products?</h2>
        <p>No. All products, SKUs, weights and prices are fictional demo data.</p>
        <h2>Are prices live gold rates?</h2>
        <p>No. Prices are estimates using manually configured demonstration rates. Each product page shows the rate source and date.</p>
        <h2>Can I place an order?</h2>
        <p>No. Checkout and payment are not connected in this demo.</p>
        <h2>Does my wishlist sync across devices?</h2>
        <p>No. The wishlist and cart are saved only in this browser.</p>
      </Prose>
    </>
  );
}
