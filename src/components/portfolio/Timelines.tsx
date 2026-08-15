import { experience, education, achievements } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./primitives";

export function ExperienceTimeline() {
  return (
    <section className="shell py-12 sm:py-16 lg:py-20">
      <SectionHeading id="experience" index="04" eyebrow="Experience" title="Experience" />
      <div className="mt-8 sm:mt-10 lg:mt-12 relative">
        {/* Vertical timeline line */}
        <div className="absolute left-[7px] top-0 bottom-0 hidden w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent md:block" />
        
        <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 md:pl-10 lg:pl-14">
          {experience.map((job, idx) => (
            <Reveal key={job.role} delay={idx * 0.08}>
              <article className="relative group">
                {/* Timeline dot */}
                <div className="absolute top-2 hidden size-5 items-center justify-center rounded-full border-4 border-background bg-primary transition-transform duration-300 group-hover:scale-125 md:-left-[2.625rem] md:flex lg:-left-[3.625rem]" />
                
                <div className="border border-border/60 bg-card/40 p-4 sm:p-5 md:p-6 lg:p-8 transition-all duration-300 hover:border-primary/60 hover:bg-card/60 hover:shadow-lg hover:shadow-primary/10">
                  <div className="flex flex-col gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <p className="text-primary font-bold text-xs sm:text-sm tracking-widest uppercase">{job.period}</p>
                    <p className="text-xs sm:text-sm md:text-base font-semibold text-muted-foreground px-2 sm:px-3 py-1 sm:py-1.5 border border-border/40 bg-background/50 rounded w-fit">{job.company}</p>
                  </div>
                  
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold uppercase tracking-wider text-foreground mb-4 sm:mb-5 md:mb-6">
                    {job.role}
                  </h3>
                  
                  <ul className="space-y-2 sm:space-y-2.5 md:space-y-3">
                    {job.points.map((p) => (
                      <li
                        key={p}
                        className="flex gap-2 sm:gap-3 text-xs sm:text-sm leading-relaxed text-muted-foreground group-hover:text-foreground/80 transition-colors"
                      >
                        <span className="mt-1 sm:mt-1.5 h-px w-2 sm:w-3 shrink-0 bg-primary/60 group-hover:bg-primary transition-colors" />
                        {p}
                      </li>
                    ))}
                  </ul>

                  {job.transferableSkills?.length ? (
                    <div className="mt-5 border-t border-border/40 pt-4 sm:mt-6 sm:pt-5">
                      <p className="eyebrow text-[0.625rem] sm:text-xs">Transferable Skills</p>
                      <p className="mt-2 break-words text-[0.6875rem] tracking-[0.12em] text-muted-foreground uppercase sm:text-xs">
                        {job.transferableSkills.join(" · ")}
                      </p>
                    </div>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EducationTimeline() {
  return (
    <section className="border-t border-border bg-secondary/40 py-12 sm:py-16 lg:py-20">
      <div className="shell">
        <SectionHeading id="education" index="05" eyebrow="Academics" title="Education" />
        <div className="mt-8 sm:mt-10 lg:mt-12 grid gap-4 sm:gap-5 md:grid-cols-2 md:gap-6">
          {education.map((e, i) => (
            <Reveal key={e.degree} delay={i * 0.08}>
              <article
                className={`group relative overflow-hidden border bg-card/40 p-4 transition-all duration-300 hover:border-primary/60 hover:bg-card/60 hover:shadow-lg hover:shadow-primary/10 motion-safe:hover:-translate-y-0.5 sm:p-5 md:p-6 lg:p-8 ${
                  i === 0 ? "border-primary/20" : "border-border/60"
                }`}
              >
                {/* Background accent */}
                <div
                  className={`absolute top-0 right-0 h-24 w-24 rounded-full blur-3xl transition-colors duration-300 sm:h-28 sm:w-28 md:h-32 md:w-32 ${
                    i === 0
                      ? "bg-primary/8 group-hover:bg-primary/12"
                      : "bg-primary/5 group-hover:bg-primary/10"
                  }`}
                />

                <div className="relative z-10">
                  <div className="mb-4 flex items-start justify-between gap-2 sm:mb-5 sm:gap-3 md:mb-6">
                    <span className="eyebrow text-primary text-xs font-bold tracking-widest sm:text-sm">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="rounded border border-primary/30 bg-primary/10 px-2 py-1 text-xs font-semibold text-primary transition-colors group-hover:bg-primary/20 sm:px-3 sm:py-1.5 sm:whitespace-nowrap">
                      {e.result}
                    </div>
                  </div>

                  <h3
                    className={`mb-2 text-sm font-bold transition-colors sm:mb-3 sm:text-base md:text-lg ${
                      i === 0
                        ? "text-foreground group-hover:text-primary"
                        : "text-foreground group-hover:text-primary"
                    }`}
                  >
                    {e.degree}
                  </h3>

                  <p className="text-xs text-muted-foreground transition-colors group-hover:text-foreground/80 sm:text-sm">
                    {e.school}
                  </p>

                  {e.focus ? (
                    <p
                      className={`mt-3 text-[0.6875rem] tracking-[0.12em] uppercase transition-colors sm:mt-4 sm:text-xs ${
                        i === 0
                          ? "text-foreground/55 group-hover:text-foreground/70"
                          : "text-muted-foreground group-hover:text-foreground/65"
                      }`}
                    >
                      {e.focus}
                    </p>
                  ) : null}
                </div>
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
    <section className="shell py-12 sm:py-16 lg:py-20">
      <SectionHeading
        id="achievements"
        index="06"
        eyebrow="Recognition"
        title={
          <>
            Certifications
            <br />
            &amp; Achievements
          </>
        }
      />
      <div className="mt-8 sm:mt-10 lg:mt-12 grid gap-px border border-border bg-border sm:grid-cols-2">
        {achievements.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.05}>
            <article className="group h-full bg-background p-4 transition-all duration-300 hover:bg-card motion-safe:hover:-translate-y-0.5 sm:p-6 md:p-8">
              {a.highlight ? (
                <span className="display inline-block bg-primary px-2 py-0.5 text-[0.65rem] font-bold tracking-[0.18em] text-primary-foreground uppercase sm:px-2.5 sm:py-1 sm:text-[0.7rem]">
                  1st Place
                </span>
              ) : (
                <span className="eyebrow text-xs sm:text-sm">{String(i + 1).padStart(2, "0")}</span>
              )}
              <h3 className="display mt-4 break-words text-base leading-snug font-semibold sm:mt-6 sm:text-lg">{a.title}</h3>
              <p className="mt-1.5 text-xs text-muted-foreground transition-colors group-hover:text-foreground/75 sm:mt-2 sm:text-sm">
                {a.detail}
              </p>
              {a.focus ? (
                <p
                  className={`mt-3 text-[0.6875rem] tracking-[0.12em] uppercase transition-colors sm:mt-4 sm:text-xs ${
                    a.highlight
                      ? "text-foreground/55 group-hover:text-foreground/70"
                      : "text-muted-foreground group-hover:text-foreground/65"
                  }`}
                >
                  {a.focus}
                </p>
              ) : null}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
