import type { ReactNode } from "react";
import Container from "./Container";

export type LegalSection = {
  id: string;
  title: string;
  body: ReactNode;
};

type LegalLayoutProps = {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

export default function LegalLayout({
  title,
  updated,
  intro,
  sections,
}: LegalLayoutProps) {
  return (
    <>
      {/* Header band */}
      <section className="relative overflow-hidden bg-forest text-cream">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-orange-soft/20" />
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <h1 className="font-[Fraunces,serif] text-3xl font-semibold sm:text-4xl">
            {title}
          </h1>
          <p className="mt-2 text-sm text-cream/70">Last updated: {updated}</p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-cream/85">
            {intro}
          </p>
        </div>
      </section>

      <Container>
        <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
          {/* Table of contents (large screens only) */}
          <aside className="hidden lg:block">
            <nav aria-label="On this page" className="sticky top-24">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
                On this page
              </p>
              <ul className="space-y-1 border-l border-line">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="-ml-px block border-l-2 border-transparent py-1 pl-3 text-sm text-muted transition hover:border-orange-soft hover:text-forest focus-visible:outline-2 focus-visible:outline-forest"
                    >
                      {i + 1}. {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Sections */}
          <article className="max-w-3xl space-y-10">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="font-[Fraunces,serif] text-xl font-semibold text-forest sm:text-2xl">
                  {i + 1}. {s.title}
                </h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-charcoal/90 sm:text-base">
                  {s.body}
                </div>
              </section>
            ))}
          </article>
        </div>
      </Container>
    </>
  );
}
