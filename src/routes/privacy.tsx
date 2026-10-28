import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Prose } from "@/components/site/PageHeader";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — AURÉVA (Demo)" },
      { name: "description", content: "How this demonstration site handles data." },
      { property: "og:title", content: "Privacy Policy — AURÉVA" },
      { property: "og:description", content: "How this demonstration site handles data." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Policy" title="Privacy Policy">How this demonstration site handles data.</PageHeader>
      <Prose>
        <h2>What we store</h2>
        <p>Your wishlist and cart are stored in your browser's local storage. Nothing is sent to a server.</p>
        <h2>Forms</h2>
        <p>The contact form in this demo does not transmit or store your message.</p>
        <h2>Before launch</h2>
        <p>A real retailer must replace this page with a policy reviewed for applicable Indian law.</p>
      </Prose>
    </>
  );
}
