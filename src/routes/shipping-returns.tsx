import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Prose } from "@/components/site/PageHeader";

export const Route = createFileRoute("/shipping-returns")({
  head: () => ({
    meta: [
      { title: "Shipping & Returns — AURÉVA (Demo)" },
      { name: "description", content: "Shipping and returns are not configured for this demonstration." },
      { property: "og:title", content: "Shipping & Returns — AURÉVA" },
      { property: "og:description", content: "Shipping and returns are not configured for this demonstration." },
    ],
  }),
  component: ShippingReturnsPage,
});

function ShippingReturnsPage() {
  return (
    <>
      <PageHeader eyebrow="Policy" title="Shipping & Returns">Shipping and returns are not configured for this demonstration.</PageHeader>
      <Prose>
        <h2>Shipping</h2>
        <p>No delivery service is connected. A real retailer would publish delivery areas, timelines and insurance terms here.</p>
        <h2>Returns & exchange</h2>
        <p>No return policy is in effect because no sales are possible. A retailer's actual policy would replace this section.</p>
      </Prose>
    </>
  );
}
