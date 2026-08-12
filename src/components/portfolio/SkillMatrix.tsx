import { skills } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./primitives";

export function SkillMatrix() {
  return (
    <section id="skills" className="scroll-mt-24 border-t border-border bg-secondary/40 py-24 lg:py-32">
      <div className="shell">
        <SectionHeading
          index="03"
          eyebrow="Capabilities"
          title={
            <>
              Technical
              <br />
              Stack
            </>
          }
          lead="Languages, frameworks and tools used across coursework, projects and an industry internship."
        />

        <div className="mt-14 divide-y divide-border border-y border-border">
          {skills.map((group, gi) => (
            <Reveal key={group.category} delay={gi * 0.05}>
              <div className="grid gap-5 py-8 md:grid-cols-[16rem_1fr] md:gap-10">
                <div className="flex items-start gap-4">
                  <span className="eyebrow text-primary">
                    {String(gi + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display text-lg font-semibold uppercase">
                    {group.category}
                  </h3>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item}>
                      <span className="inline-flex cursor-default items-center border border-border bg-card px-3.5 py-2 text-[0.8125rem] text-muted-foreground transition-colors duration-300 hover:border-primary hover:bg-elevated hover:text-foreground">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
