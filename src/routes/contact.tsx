import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DemoNote, PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Enquiries — AURÉVA (Demo)" },
      { name: "description", content: "Send a jewellery enquiry or request a bridal appointment." },
      { property: "og:title", content: "Contact — AURÉVA" },
      { property: "og:description", content: "Send an enquiry or request an appointment." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHeader eyebrow="Get in touch" title="Contact & Enquiries" />
      <div className="mx-auto max-w-2xl space-y-6 px-4 py-14">
        <DemoNote>Demo form: messages are not sent or stored anywhere. Retailer contact details are not configured.</DemoNote>
        {sent ? (
          <p className="py-10 text-center font-display text-3xl">Thank you — in a live site, the showroom would reply to you.</p>
        ) : (
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            {[["name", "Full name", "text"], ["email", "Email", "email"], ["phone", "Phone (optional)", "tel"]].map(([n, l, t]) => (
              <label key={n} className="block text-sm">{l}
                <input name={n} type={t} required={n !== "phone"} maxLength={120} className="mt-1 w-full border bg-card px-3 py-2" />
              </label>
            ))}
            <label className="block text-sm">Message
              <textarea required maxLength={1000} rows={5} className="mt-1 w-full border bg-card px-3 py-2" />
            </label>
            <button className="btn btn-primary">Send enquiry</button>
          </form>
        )}
      </div>
    </>
  );
}
