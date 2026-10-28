import { createFileRoute, notFound } from "@tanstack/react-router";
import { Catalogue, validateCatalogueSearch } from "@/components/site/Catalogue";
import { PageHeader } from "@/components/site/PageHeader";
import { getCategory, products } from "@/lib/catalog";

export const Route = createFileRoute("/categories/$slug")({
  validateSearch: validateCatalogueSearch,
  loader: ({ params }) => {
    const c = getCategory(params.slug);
    if (!c) throw notFound();
    return { slug: c.slug, name: c.name, blurb: c.blurb };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — AURÉVA (Demo)` },
          { name: "description", content: loaderData.blurb },
          { property: "og:title", content: `${loaderData.name} — AURÉVA` },
          { property: "og:description", content: loaderData.blurb },
        ]
      : [{ title: "Category not found — AURÉVA" }, { name: "robots", content: "noindex" }],
  }),
  component: Page,
});

function Page() {
  const { slug } = Route.useLoaderData();
  const search = Route.useSearch();
  const c = getCategory(slug)!;
  return (
    <>
      <PageHeader eyebrow="Category" title={c.name}>{c.blurb}</PageHeader>
      <Catalogue base={products.filter(c.match)} search={search} />
    </>
  );
}
