import { Reveal, SectionHeading } from "./primitives";

const focus = [
  "Python",
  "SQL",
  "Pandas",
  "Power BI",
  "Data Visualization",
  "Predictive Analytics",
];

const practice = [
  "Machine Learning",
  "Deep Learning",
  "Computer Vision",
  "PyTorch",
  "TensorFlow",
  "Django",
];

export function About() {
  return (
    <section className="shell py-12 sm:py-16 lg:py-20">
      <SectionHeading
        id="about"
        index="01"
        eyebrow="About"
        title={
          <>
            Engineer. Builder.
            <br />
            Problem Solver.
          </>
        }
      />

      <div className="mt-10 flex flex-col gap-6 sm:gap-8 md:flex-row md:items-start md:gap-10 lg:gap-12">
        <Reveal className="min-w-0 flex-1 md:max-w-[58%] lg:max-w-[62%] xl:max-w-[65%]">
          <div className="space-y-4 sm:space-y-5 md:space-y-6 border-t border-border pt-6 sm:pt-7 md:pt-8 text-sm sm:text-base leading-relaxed text-muted-foreground lg:text-lg">
            <p>
              I&apos;m an <span className="text-foreground">AI &amp; Data Science graduate</span> graduate 
              working at the intersection of data analytics, machine learning and intelligent systems. 
              I enjoy turning raw data into meaningful insights and building practical solutions that solve real-world problems.
            </p>

            <p>
              My work spans <span className="text-foreground">data analysis, predictive modeling and computer vision, using Python, SQL, Pandas, Power BI, Scikit-Learn, PyTorch and TensorFlow</span>. 
              From data preprocessing and feature engineering to visualization, model training and evaluation, I focus on understanding the problem before building the solution.
            </p>

            <p>
              Alongside my academic and project work, my Django development internship gave me practical experience building applications with databases, 
              writing and optimizing queries, testing features, debugging issues and working with a development team.
            </p>
          </div>
        </Reveal>

        <div className="grid w-full shrink-0 grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:mt-[6.75rem] lg:max-w-[25rem] lg:shrink-0">
          <Reveal delay={0.08}>
            <div className="flex h-full flex-col border border-border bg-card p-4 lg:p-5">
              <p className="eyebrow text-[0.65rem] text-primary">DATA & ANALYTICS</p>
              <ul className="mt-3 grid gap-2 text-xs leading-snug text-foreground/90">
                {focus.map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <span className="h-px w-3 shrink-0 bg-primary" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="flex h-full flex-col border border-border bg-background p-4 lg:p-5">
              <p className="eyebrow text-[0.65rem] text-muted-foreground">AI & ENGINEERING</p>
              <ul className="mt-3 grid gap-2 text-xs leading-snug text-foreground/90">
                {practice.map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <span className="h-px w-3 shrink-0 bg-border" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.1}>
        <p
          aria-hidden
          className="display mt-10 sm:mt-14 md:mt-16 px-1 text-[clamp(1.75rem,8vw,11rem)] leading-[0.85] font-bold text-transparent uppercase [-webkit-text-stroke:1px_var(--border)] text-center overflow-hidden"
        >
          Data - AI Engineering
        </p>
      </Reveal>
    </section>
  );
}
