import { snapshot, processSteps } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./primitives";

export function RecruiterSnapshot() {
  return (
    <section className="shell py-24 lg:py-32">
      <SectionHeading
        index="07"
        eyebrow="Snapshot"
        title={
          <>
            Why
            <br />
            Hema Harsan?
          </>
        }
      />
      <div className="mt-14 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
        {snapshot.map((s, i) => (
          <Reveal key={s.number} delay={i * 0.05}>
            <div className="h-full bg-background p-8 transition-colors duration-300 hover:bg-card">
              <span className="display text-3xl font-bold text-transparent [-webkit-text-stroke:1px_var(--primary)]">
                {s.number}
              </span>
              <h3 className="display mt-6 text-lg font-semibold uppercase">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {s.text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function HowIThink() {
  return (
    <section className="border-y border-border bg-secondary/40 py-24 lg:py-32">
      <div className="shell">
        <SectionHeading index="08" eyebrow="Process" title="How I Think" />
        <ol className="mt-14 grid gap-px bg-border md:grid-cols-3">
          {processSteps.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05}>
              <li className="group relative h-full bg-background p-8">
                <span className="eyebrow text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="display mt-5 text-2xl font-semibold uppercase">
                  {s.label}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">{s.note}</p>
                <span className="absolute bottom-0 left-0 h-px w-0 bg-primary transition-all duration-500 group-hover:w-full" />
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
