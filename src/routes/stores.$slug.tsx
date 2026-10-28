import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { DemoNote, PageHeader } from "@/components/site/PageHeader";
import { stores } from "@/lib/catalog";

export const Route = createFileRoute("/stores/$slug")({
  loader: ({ params }) => {
    const s = stores.find((x) => x.slug === params.slug);
    if (!s) throw notFound();
    return { slug: s.slug, name: s.name };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} (Demo)` },
          { name: "description", content: `Hours and services at ${loaderData.name}.` },
          { property: "og:title", content: loaderData.name },
          { property: "og:description", content: "Sample showroom details." },
        ]
      : [{ title: "Showroom unavailable — AURÉVA" }, { name: "robots", content: "noindex" }],
  }),
  component: StorePage,
});

function StorePage() {
  const { slug } = Route.useLoaderData();
  const s = stores.find((x) => x.slug === slug)!;
  return (
    <>
      <PageHeader eyebrow={s.city} title={s.name} />
      <div className="mx-auto max-w-2xl space-y-6 px-4 py-14">
        <DemoNote>Fictional sample showroom for demonstration.</DemoNote>
        <dl className="grid grid-cols-[140px_1fr] gap-y-3 text-sm">
          <dt className="text-muted-foreground">Address</dt><dd>{s.address}</dd>
          <dt className="text-muted-foreground">Hours</dt><dd>{s.hours}</dd>
          <dt className="text-muted-foreground">Telephone</dt><dd>{s.phone ?? "Not configured"}</dd>
          <dt className="text-muted-foreground">Services</dt><dd>{s.services.join(", ")}</dd>
        </dl>
        <Link to="/contact" className="btn btn-primary">Request an appointment</Link>
      </div>
    </>
  );
}
