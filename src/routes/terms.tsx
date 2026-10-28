import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Prose } from "@/components/site/PageHeader";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — AURÉVA (Demo)" },
      { name: "description", content: "Terms for using this demonstration site." },
      { property: "og:title", content: "Terms & Conditions — AURÉVA" },
      { property: "og:description", content: "Terms for using this demonstration site." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Policy" title="Terms & Conditions">Terms for using this demonstration site.</PageHeader>
      <Prose>
        <h2>Demonstration only</h2>
        <p>This site is a portfolio demo by Zyntrava Labs. Nothing here is an offer for sale.</p>
        <h2>Prices</h2>
        <p>All prices are illustrative estimates and not binding quotations.</p>
        <h2>Brand name</h2>
        <p>“AURÉVA” is a placeholder name and is not a registered trademark or business.</p>
      </Prose>
    </>
  );
}
