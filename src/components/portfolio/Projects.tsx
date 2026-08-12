import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { projects, type Project } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./primitives";

function Motif({ kind }: { kind: Project["motif"] }) {
  if (kind === "video") {
    return (
      <div className="relative flex h-full min-h-56 flex-col justify-between overflow-hidden bg-elevated p-6">
        <div className="flex gap-1.5">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="h-14 flex-1 border border-border transition-colors duration-500 group-hover:border-primary/40"
              style={{ opacity: 0.25 + (i % 4) * 0.2 }}
            />
          ))}
        </div>
        <p className="display text-[clamp(2.5rem,7vw,4.5rem)] leading-none font-bold text-primary">
          101
          <span className="ml-2 align-super text-xs tracking-[0.2em] text-muted-foreground uppercase">
            actions
          </span>
        </p>
        <p className="eyebrow">Video → Frames → Features → Classification</p>
      </div>
    );
  }
  if (kind === "xray") {
    return (
      <div className="relative flex h-full min-h-56 flex-col justify-between overflow-hidden bg-elevated p-6">
        <div className="flex items-end gap-1">
          {Array.from({ length: 24 }).map((_, i) => (
            <span
              key={i}
              className="flex-1 bg-foreground/15 transition-all duration-500 group-hover:bg-primary/40"
              style={{ height: `${18 + Math.abs(12 - i) * 3}px` }}
            />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {["Accuracy", "Precision", "Recall", "F1 Score"].map((m) => (
            <span
              key={m}
              className="border border-border px-3 py-2 text-[0.7rem] tracking-[0.14em] text-muted-foreground uppercase"
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="relative flex h-full min-h-56 flex-col justify-between overflow-hidden bg-elevated p-6">
      <div className="grid grid-cols-3 items-center gap-2 text-center">
        {["Data", "Model", "Prediction"].map((s, i) => (
          <div key={s} className="relative">
            <span className="display block text-sm font-semibold tracking-[0.12em] uppercase">
              {s}
            </span>
            {i < 2 ? (
              <span className="absolute top-1/2 -right-1 h-px w-2 bg-primary" />
            ) : null}
          </div>
        ))}
      </div>
      <div className="flex items-end gap-1.5">
        {[30, 52, 40, 68, 48, 84, 60, 96].map((h, i) => (
          <span
            key={i}
            className="flex-1 bg-primary/30 transition-all duration-500 group-hover:bg-primary/60"
            style={{ height: h }}
          />
        ))}
      </div>
    </div>
  );
}

function DetailBlock({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-3 border-t border-border py-6 md:grid-cols-[12rem_1fr] md:gap-8">
      <p className="eyebrow">
        <span className="text-primary">{index}</span> — {title}
      </p>
      <div className="text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-2 h-px w-4 shrink-0 bg-primary" />
          {i}
        </li>
      ))}
    </ul>
  );
}

function ProjectDetail({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] overflow-y-auto bg-background/95 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div className="shell py-10 lg:py-16">
        <div className="flex items-start justify-between gap-6">
          <p className="display text-[clamp(3rem,10vw,7rem)] leading-none font-bold text-primary">
            {project.number}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="flex size-12 items-center justify-center border border-border transition-colors hover:border-primary hover:text-primary"
            aria-label="Close case study"
          >
            <X className="size-5" />
          </button>
        </div>

        <h2 className="display mt-6 max-w-4xl text-[clamp(1.75rem,5vw,3.5rem)] font-bold uppercase">
          {project.title}
        </h2>

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <li
              key={t}
              className="border border-border px-3 py-1.5 text-[0.75rem] tracking-[0.12em] text-muted-foreground uppercase"
            >
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <DetailBlock index="01" title="Overview">
            {project.overview}
          </DetailBlock>
          <DetailBlock index="02" title="Problem">
            {project.problem}
          </DetailBlock>
          <DetailBlock index="03" title="Approach">
            <List items={project.approach} />
          </DetailBlock>
          <DetailBlock index="04" title="Technology">
            {project.tech.join(" · ")}
          </DetailBlock>
          <DetailBlock index="05" title="Implementation">
            <List items={project.implementation} />
          </DetailBlock>
          <DetailBlock index="06" title="Evaluation">
            <List items={project.evaluation} />
          </DetailBlock>
          <DetailBlock index="07" title="Outcome">
            {project.outcome}
          </DetailBlock>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-10 inline-flex min-h-12 items-center gap-2 border border-border px-6 text-[0.75rem] tracking-[0.16em] uppercase transition-colors hover:border-primary hover:text-primary"
        >
          Back to projects
        </button>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="scroll-mt-24 border-t border-border py-24 lg:py-32"
    >
      <div className="shell">
        <SectionHeading
          index="02"
          eyebrow="Selected Work"
          title={
            <>
              Featured
              <br />
              Projects
            </>
          }
          lead="Three applied projects across computer vision, medical imaging and full-stack machine learning."
        />

        <div className="mt-14 space-y-px bg-border">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <article className="group grid gap-8 bg-background py-10 lg:grid-cols-[1fr_0.8fr] lg:gap-14">
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-5">
                    <span className="display text-[clamp(2.5rem,6vw,4rem)] leading-none font-bold text-transparent [-webkit-text-stroke:1px_var(--primary)]">
                      {p.number}
                    </span>
                    <ul className="flex flex-wrap gap-2">
                      {p.tech.map((t) => (
                        <li
                          key={t}
                          className="border border-border px-2.5 py-1 text-[0.7rem] tracking-[0.12em] text-muted-foreground uppercase"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <h3 className="display mt-6 max-w-xl text-[clamp(1.5rem,3.6vw,2.5rem)] font-semibold uppercase">
                    {p.title}
                  </h3>
                  <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground lg:text-base">
                    {p.short}
                  </p>

                  <button
                    type="button"
                    onClick={() => setOpen(p)}
                    className="mt-8 inline-flex w-fit min-h-12 items-center gap-2 border border-border px-6 text-[0.75rem] tracking-[0.16em] uppercase transition-colors hover:border-primary hover:text-primary"
                  >
                    View Case Study
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>

                <div className="overflow-hidden">
                  <div className="h-full transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                    <Motif kind={p.motif} />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <ProjectDetail project={open} onClose={() => setOpen(null)} />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
