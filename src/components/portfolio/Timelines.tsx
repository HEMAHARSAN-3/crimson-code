import { experience, education, achievements } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./primitives";

export function ExperienceTimeline() {
  return (
    <section id="experience" className="shell scroll-mt-24 py-24 lg:py-32">
      <SectionHeading index="04" eyebrow="Experience" title="Experience" />
      <div className="mt-14">
        {experience.map((job) => (
          <Reveal key={job.role}>
            <article className="grid gap-6 border-t border-border pt-8 md:grid-cols-[16rem_1fr] md:gap-10">
              <div>
                <p className="display text-xl font-semibold text-primary">
                  {job.period}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {job.company}
                </p>
              </div>
              <div>
                <h3 className="display text-[clamp(1.5rem,3.5vw,2.25rem)] font-semibold uppercase">
                  {job.role}
                </h3>
                <ul className="mt-6 space-y-3">
                  {job.points.map((p) => (
                    <li
                      key={p}
                      className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-2 h-px w-5 shrink-0 bg-primary" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function EducationTimeline() {
  return (
    <section
      id="education"
      className="scroll-mt-24 border-t border-border bg-secondary/40 py-24 lg:py-32"
    >
      <div className="shell">
        <SectionHeading index="05" eyebrow="Academics" title="Education" />
        <div className="mt-14 divide-y divide-border border-y border-border">
          {education.map((e, i) => (
            <Reveal key={e.degree} delay={i * 0.06}>
              <article className="grid gap-4 py-8 md:grid-cols-[16rem_1fr_auto] md:items-baseline md:gap-10">
                <span className="eyebrow text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="display text-xl font-semibold">{e.degree}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {e.school}
                  </p>
                </div>
                <p className="display text-lg font-semibold whitespace-nowrap">
                  {e.result}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Recognition() {
  return (
    <section id="achievements" className="shell scroll-mt-24 py-24 lg:py-32">
      <SectionHeading
        index="06"
        eyebrow="Recognition"
        title={
          <>
            Certifications
            <br />&amp; Achievements
          </>
        }
      />
      <div className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2">
        {achievements.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.05}>
            <article className="group h-full bg-background p-8 transition-colors duration-300 hover:bg-card">
              {a.highlight ? (
                <span className="display inline-block bg-primary px-2.5 py-1 text-[0.7rem] font-bold tracking-[0.18em] text-primary-foreground uppercase">
                  1st Place
                </span>
              ) : (
                <span className="eyebrow">
                  {String(i + 1).padStart(2, "0")}
                </span>
              )}
              <h3 className="display mt-6 text-lg leading-snug font-semibold">
                {a.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{a.detail}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
