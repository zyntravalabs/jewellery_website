import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Prose } from "@/components/site/PageHeader";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — AURÉVA (Demo)" },
      { name: "description", content: "AURÉVA is a fictional concept brand created by Zyntrava Labs to demonstrate a premium jewellery storefront." },
      { property: "og:title", content: "Our Story — AURÉVA" },
      { property: "og:description", content: "AURÉVA is a fictional concept brand created by Zyntrava Labs to demonstrate a premium jewellery storefront." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About" title="Our Story">AURÉVA is a fictional concept brand created by Zyntrava Labs to demonstrate a premium jewellery storefront.</PageHeader>
      <Prose>
        <h2>A concept, not a legacy</h2>
        <p>AURÉVA has no historical business behind it. It exists to show how a real jeweller's catalogue, pricing transparency and showroom network could be presented online.</p>
        <h2>Design philosophy</h2>
        <p>Motifs from Indian goldsmithing — temple deities, peacocks, lotus and filigree — paired with clear, honest product information.</p>
        <h2>Built by Zyntrava Labs</h2>
        <p>Zyntrava Labs designs and builds e-commerce websites for jewellery retailers. This demo can be adapted with a retailer's real products, rates and showrooms.</p>
      </Prose>
    </>
  );
}
