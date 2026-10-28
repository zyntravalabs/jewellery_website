import { createFileRoute } from "@tanstack/react-router";
import { Catalogue, validateCatalogueSearch } from "@/components/site/Catalogue";
import { PageHeader } from "@/components/site/PageHeader";
import { products } from "@/lib/catalog";

export const Route = createFileRoute("/products/")({
  validateSearch: validateCatalogueSearch,
  head: () => ({
    meta: [
      { title: "All Jewellery — AURÉVA Fine Jewellery (Demo)" },
      { name: "description", content: "Browse gold, diamond and silver necklaces, earrings, bangles, rings, chains and pendants." },
      { property: "og:title", content: "All Jewellery — AURÉVA" },
      { property: "og:description", content: "Browse the full AURÉVA demo catalogue with filters and sorting." },
    ],
  }),
  component: () => {
    const search = Route.useSearch();
    return (
      <>
        <PageHeader eyebrow="The catalogue" title="All Jewellery">Prices shown are illustrative estimates based on demo metal rates.</PageHeader>
        <Catalogue base={products} search={search} />
      </>
    );
  },
});
