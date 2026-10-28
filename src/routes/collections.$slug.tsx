import { createFileRoute, notFound } from "@tanstack/react-router";
import { Catalogue, validateCatalogueSearch } from "@/components/site/Catalogue";
import { getCollection, products } from "@/lib/catalog";

export const Route = createFileRoute("/collections/$slug")({
  validateSearch: validateCatalogueSearch,
  loader: ({ params }) => {
    const c = getCollection(params.slug);
    if (!c) throw notFound();
    return { slug: c.slug, name: c.name, description: c.description };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} Collection — AURÉVA (Demo)` },
          { name: "description", content: loaderData.description },
          { property: "og:title", content: `${loaderData.name} — AURÉVA` },
          { property: "og:description", content: loaderData.description },
        ]
      : [{ title: "Collection not found — AURÉVA" }, { name: "robots", content: "noindex" }],
  }),
  component: Page,
});

function Page() {
  const { slug } = Route.useLoaderData();
  const search = Route.useSearch();
  const c = getCollection(slug)!;
  return (
    <>
      <section className="relative h-[46vh] min-h-[340px] overflow-hidden bg-maroon">
        <img src={c.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
        <div className="hero-scrim absolute inset-0" />
        <div className="relative mx-auto flex h-full max-w-7xl items-end px-4 pb-12 md:px-8">
          <div className="max-w-xl text-ivory">
            <div className="eyebrow mb-3">Collection</div>
            <h1 className="text-5xl md:text-6xl">{c.name}</h1>
            <p className="mt-3 opacity-85">{c.description}</p>
          </div>
        </div>
      </section>
      <Catalogue base={products.filter((p) => p.collections.includes(c.slug))} search={search} />
    </>
  );
}
