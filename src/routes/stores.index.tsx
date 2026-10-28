import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { DemoNote, PageHeader } from "@/components/site/PageHeader";
import { stores } from "@/lib/catalog";

export const Route = createFileRoute("/stores/")({
  head: () => ({
    meta: [
      { title: "Showroom Locator — AURÉVA (Demo)" },
      { name: "description", content: "Find a sample AURÉVA showroom by city." },
      { property: "og:title", content: "Showrooms — AURÉVA" },
      { property: "og:description", content: "Find a sample showroom by city." },
    ],
  }),
  component: StoresPage,
});

function StoresPage() {
  const [q, setQ] = useState("");
  const list = stores.filter((s) => (s.city + s.address).toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <PageHeader eyebrow="Visit" title="Showroom Locator" />
      <div className="mx-auto max-w-5xl space-y-8 px-4 py-14 md:px-8">
        <DemoNote>These are fictional sample showrooms. Addresses are not real and no directions are provided.</DemoNote>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by city or area" aria-label="Search showrooms" className="w-full border bg-card px-4 py-3" />
        <div className="grid gap-6 md:grid-cols-3">
          {list.map((s) => (
            <Link key={s.slug} to="/stores/$slug" params={{ slug: s.slug }} className="border bg-card p-6 hover:border-gold">
              <div className="eyebrow">{s.city}</div>
              <h2 className="mt-2 text-2xl">{s.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{s.address}</p>
              <p className="mt-2 text-sm">{s.hours}</p>
            </Link>
          ))}
          {list.length === 0 && <p className="text-muted-foreground">No showrooms match that search.</p>}
        </div>
      </div>
    </>
  );
}
