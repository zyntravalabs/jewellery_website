export function PageHeader({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: React.ReactNode }) {
  return (
    <section className="border-b bg-secondary/60">
      <div className="mx-auto max-w-7xl px-4 py-14 text-center md:px-8 md:py-20">
        {eyebrow && <div className="eyebrow mb-3">{eyebrow}</div>}
        <h1 className="text-4xl md:text-6xl">{title}</h1>
        {children && <div className="mx-auto mt-4 max-w-2xl text-muted-foreground">{children}</div>}
      </div>
    </section>
  );
}

export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 leading-relaxed text-foreground/85 [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:text-3xl [&_h2]:text-foreground [&_li]:ml-5 [&_li]:list-disc [&_p]:mb-4 [&_ul]:mb-4">
      {children}
    </div>
  );
}

export function DemoNote({ children }: { children: React.ReactNode }) {
  return <div className="border border-gold/50 bg-gold/10 px-4 py-3 text-sm">{children}</div>;
}
