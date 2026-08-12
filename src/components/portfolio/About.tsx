import { Reveal, SectionHeading } from "./primitives";

const focus = [
  "Machine Learning",
  "Deep Learning",
  "Neural Networks",
  "Computer Vision",
  "Software Development",
];

const practice = [
  "Data preprocessing",
  "Feature engineering",
  "Model training",
  "Model evaluation",
  "Predictive analytics",
];

export function About() {
  return (
    <section id="about" className="shell scroll-mt-24 py-24 lg:py-32">
      <SectionHeading
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

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div className="space-y-6 text-base leading-relaxed text-muted-foreground lg:text-lg">
          <Reveal>
            <p>
              I&apos;m an{" "}
              <span className="text-foreground">
                AI &amp; Data Science graduate
              </span>{" "}
              with foundations in machine learning, deep learning, neural
              networks, computer vision and software development — the span
              between the model and the product it lives in.
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <p>
              My work has been built with{" "}
              <span className="text-foreground">
                Python, PyTorch, TensorFlow and Scikit-Learn
              </span>
              , across data preprocessing, feature engineering, model training,
              model evaluation and predictive analytics.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p>
              Alongside that, a Django development internship taught me what it
              takes to move an idea into a running application: databases,
              queries, testing, debugging and reliability.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
          <Reveal delay={0.08}>
            <div className="border-l-2 border-primary pl-5">
              <p className="eyebrow">Foundations</p>
              <ul className="mt-3 space-y-1.5 text-sm text-foreground/90">
                {focus.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="border-l-2 border-border pl-5">
              <p className="eyebrow">In practice</p>
              <ul className="mt-3 space-y-1.5 text-sm text-foreground/90">
                {practice.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.1}>
        <p
          aria-hidden
          className="display mt-20 text-[clamp(3rem,15vw,11rem)] leading-[0.85] font-bold text-transparent uppercase [-webkit-text-stroke:1px_var(--border)]"
        >
          AI Engineering
        </p>
      </Reveal>
    </section>
  );
}
