import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import {
  projects,
  projectFilters,
  type Project,
  type ProjectFilterId,
  type ProjectMotif,
} from "@/data/portfolio";
import { Reveal, SectionHeading } from "./primitives";
import { cn } from "@/lib/utils";

function Motif({ kind }: { kind: ProjectMotif }) {
  const shell =
    "relative flex h-full min-h-56 flex-col justify-between overflow-hidden bg-elevated p-4 sm:min-h-64 sm:p-6 lg:min-h-72";

  if (kind === "video") {
    return (
      <div className={shell}>
        <div className="flex gap-0.5 sm:gap-1.5">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-10 flex-1 border border-border transition-colors duration-500 group-hover:border-primary/40 sm:h-14",
                i >= 6 && "hidden sm:block",
              )}
              style={{ opacity: 0.25 + (i % 4) * 0.2 }}
            />
          ))}
        </div>
        <p className="display text-[clamp(2rem,7vw,4.5rem)] leading-none font-bold text-primary">
          101
          <span className="ml-2 align-super text-xs tracking-[0.2em] text-muted-foreground uppercase">
            actions
          </span>
        </p>
        <p className="eyebrow text-[0.625rem] sm:text-[0.6875rem]">Video → Frames → Features → Classification</p>
      </div>
    );
  }

  if (kind === "xray") {
    return (
      <div className={shell}>
        <div className="flex items-end gap-0.5 sm:gap-1">
          {Array.from({ length: 24 }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "flex-1 bg-foreground/15 transition-all duration-500 group-hover:bg-primary/40",
                i >= 12 && "hidden md:block",
              )}
              style={{ height: `${18 + Math.abs(12 - (i % 12)) * 3}px` }}
            />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
          {["Accuracy", "Precision", "Recall", "F1 Score"].map((m) => (
            <span
              key={m}
              className="border border-border px-2 py-1.5 text-[0.625rem] tracking-[0.12em] text-muted-foreground uppercase sm:px-3 sm:py-2 sm:text-[0.7rem] sm:tracking-[0.14em]"
            >
              {m}
            </span>
          ))}
        </div>
        <p className="eyebrow text-[0.625rem] sm:text-[0.6875rem]">X-Ray → Features → Classifier</p>
      </div>
    );
  }

  if (kind === "stroke") {
    return (
      <div className={shell}>
        <div className="grid grid-cols-2 items-center gap-1.5 text-center sm:grid-cols-3 md:grid-cols-5 md:gap-1">
          {["Brain CT", "Analysis", "Features", "Model", "Recovery"].map((s, i) => (
            <div key={s} className="relative min-w-0 px-0.5">
              <span className="display block text-[0.6875rem] font-semibold tracking-[0.06em] uppercase sm:text-[0.75rem] sm:tracking-[0.08em] md:text-xs">
                {s}
              </span>
              {i < 4 ? (
                <span className="absolute top-1/2 -right-0.5 hidden h-px w-1 bg-primary md:block" />
              ) : null}
            </div>
          ))}
        </div>
        <div className="flex items-end gap-1 sm:gap-1.5">
          {[36, 48, 56, 72, 64].map((h, i) => (
            <span
              key={i}
              className="flex-1 bg-primary/25 transition-all duration-500 group-hover:bg-primary/50"
              style={{ height: h * 0.85 }}
            />
          ))}
        </div>
        <p className="eyebrow text-[0.625rem] sm:text-[0.6875rem]">Brain CT → Image Analysis → Features → Model → Recovery</p>
      </div>
    );
  }

  if (kind === "sales") {
    return (
      <div className={shell}>
        <div className="grid grid-cols-2 gap-1 text-center sm:grid-cols-3 md:grid-cols-5 sm:gap-1.5">
          {["Revenue", "Orders", "Growth", "Trends", "Forecast"].map((label) => (
            <span
              key={label}
              className="border border-border px-1 py-1.5 text-[0.6875rem] tracking-[0.08em] text-muted-foreground uppercase transition-colors duration-500 group-hover:border-primary/40 sm:px-1.5 sm:py-2 sm:text-[0.75rem] sm:tracking-[0.1em]"
            >
              {label}
            </span>
          ))}
        </div>
        <div className="flex items-end gap-1 sm:gap-1.5">
          {[40, 64, 52, 88, 72, 96, 68, 84].map((h, i) => (
            <span
              key={i}
              className="flex-1 bg-primary/30 transition-all duration-500 group-hover:bg-primary/60"
              style={{ height: h * 0.85 }}
            />
          ))}
        </div>
        <p className="eyebrow text-[0.625rem] sm:text-[0.6875rem]">Revenue · Orders · Growth · Trends · Forecast</p>
      </div>
    );
  }

  if (kind === "segmentation") {
    return (
      <div className={cn(shell, "min-h-56 sm:min-h-64 lg:min-h-72")}>
        <div className="grid grid-cols-2 items-center gap-1.5 text-center sm:grid-cols-3 md:grid-cols-5 md:gap-1">
          {["Customers", "Data", "Clusters", "Segments", "Insights"].map((s, i) => (
            <div key={s} className="relative min-w-0 px-0.5">
              <span className="display block text-[0.6875rem] font-semibold tracking-[0.06em] uppercase sm:text-[0.75rem] sm:tracking-[0.08em] md:text-xs">
                {s}
              </span>
              {i < 4 ? (
                <span className="absolute top-1/2 -right-0.5 hidden h-px w-1 bg-primary md:block" />
              ) : null}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <span
              key={i}
              className="h-10 border border-border/60 transition-colors duration-500 group-hover:border-primary/40 sm:h-12 md:h-14"
              style={{ opacity: 0.3 + (i % 3) * 0.2 }}
            />
          ))}
        </div>
        <p className="eyebrow text-[0.625rem] sm:text-[0.6875rem]">Customers → Data → Clusters → Segments → Insights</p>
      </div>
    );
  }

  if (kind === "kpi") {
    return (
      <div className={shell}>
        <div className="grid grid-cols-2 gap-1 text-center sm:grid-cols-3 md:grid-cols-5 sm:gap-1.5">
          {["KPI", "Revenue", "Growth", "Performance", "Trends"].map((label) => (
            <span
              key={label}
              className="border border-border px-1 py-1.5 text-[0.6875rem] tracking-[0.08em] text-muted-foreground uppercase transition-colors duration-500 group-hover:border-primary/40 sm:px-1.5 sm:py-2 sm:text-[0.75rem] sm:tracking-[0.1em]"
            >
              {label}
            </span>
          ))}
        </div>
        <div className="flex items-end gap-1 sm:gap-1.5">
          {[52, 72, 44, 88, 60, 96, 48, 80].map((h, i) => (
            <span
              key={i}
              className="flex-1 bg-primary/30 transition-all duration-500 group-hover:bg-primary/60"
              style={{ height: h * 0.85 }}
            />
          ))}
        </div>
        <p className="eyebrow text-[0.625rem] sm:text-[0.6875rem]">KPI · Revenue · Growth · Performance · Trends</p>
      </div>
    );
  }

  return (
    <div className={shell}>
      <div className="grid grid-cols-3 items-center gap-1.5 text-center sm:gap-2">
        {["Data", "Model", "Prediction"].map((s, i) => (
          <div key={s} className="relative min-w-0">
            <span className="display block text-xs font-semibold tracking-[0.1em] uppercase sm:text-sm sm:tracking-[0.12em]">
              {s}
            </span>
            {i < 2 ? <span className="absolute top-1/2 -right-1 hidden h-px w-2 bg-primary sm:block" /> : null}
          </div>
        ))}
      </div>
      <div className="flex items-end gap-1 sm:gap-1.5">
        {[30, 52, 40, 68, 48, 84, 60, 96].map((h, i) => (
          <span
            key={i}
            className="flex-1 bg-primary/30 transition-all duration-500 group-hover:bg-primary/60"
            style={{ height: h * 0.85 }}
          />
        ))}
      </div>
      <p className="eyebrow text-[0.625rem] sm:text-[0.6875rem]">Data → Model → Prediction</p>
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
    <div className="grid gap-3 border-t border-border py-6 md:grid-cols-[9rem_1fr] md:gap-6 lg:grid-cols-[12rem_1fr] lg:gap-8">
      <p className="eyebrow">
        <span className="text-primary">{index}</span> — {title}
      </p>
      <div className="text-sm leading-relaxed text-muted-foreground">{children}</div>
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

function Workflow({ steps }: { steps: string[] }) {
  return (
    <p className="eyebrow break-words text-foreground/90">
      {steps.join(" → ")}
    </p>
  );
}

function ProjectActions({
  project,
  onOpenCaseStudy,
}: {
  project: Project;
  onOpenCaseStudy: () => void;
}) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={onOpenCaseStudy}
        className="group/btn inline-flex min-h-12 items-center gap-2 border border-border px-6 text-[0.75rem] tracking-[0.16em] uppercase transition-colors hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary"
      >
        View Case Study
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
      </button>
      {project.githubUrl ? (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group/btn inline-flex min-h-12 items-center gap-2 border border-border px-6 text-[0.75rem] tracking-[0.16em] uppercase text-muted-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary"
          aria-label={`View ${project.title} on GitHub`}
        >
          GitHub
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </a>
      ) : null}
    </div>
  );
}

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (project: Project) => void;
}) {
  return (
    <article className="group grid min-w-0 gap-6 bg-background py-6 transition-colors duration-300 hover:bg-background sm:gap-8 sm:py-8 md:grid-cols-[1fr_0.8fr] md:gap-10 md:py-10 lg:gap-14">
      <div className="flex min-w-0 flex-col">
        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <span className="display text-[clamp(2.5rem,6vw,4rem)] leading-none font-bold text-transparent [-webkit-text-stroke:1px_var(--primary)]">
            {project.number}
          </span>
          {project.categories.map((category) => (
            <span key={category} className="eyebrow text-primary">
              {category}
            </span>
          ))}
          <ul className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <li
                key={t}
                className="border border-border px-2.5 py-1 text-[0.7rem] tracking-[0.12em] text-muted-foreground uppercase transition-colors duration-300 group-hover:border-primary/40 group-hover:text-foreground/80"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>

        <h3 className="display mt-4 max-w-xl text-[clamp(1.5rem,3.6vw,2.5rem)] font-semibold uppercase transition-transform duration-300 group-hover:translate-x-0.5 sm:mt-6">
          {project.title}
        </h3>
        <p className="mt-4 max-w-xl text-xs leading-relaxed text-muted-foreground sm:text-sm md:text-base">
          {project.short}
        </p>

        <ProjectActions project={project} onOpenCaseStudy={() => onOpen(project)} />
      </div>

      <div className="overflow-hidden md:mt-8 md:max-h-72 lg:mt-10 lg:max-h-none">
        <div className="h-full transition-transform duration-700 ease-out group-hover:scale-[1.02] md:max-h-72">
          <Motif kind={project.motif} />
        </div>
      </div>
    </article>
  );
}

function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  let detailIndex = 0;
  const nextIndex = () => String(++detailIndex).padStart(2, "0");

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
      <div className="shell py-8 sm:py-10 lg:py-16">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="display text-[clamp(3rem,10vw,7rem)] leading-none font-bold text-primary">
              {project.number}
            </p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
              {project.categories.map((category) => (
                <p key={category} className="eyebrow text-primary">
                  {category}
                </p>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-12 items-center justify-center border border-border transition-colors hover:border-primary hover:text-primary"
            aria-label="Close case study"
          >
            <X className="size-5" />
          </button>
        </div>

        <h2 className="display mt-4 max-w-4xl text-[clamp(1.5rem,5vw,3.5rem)] font-bold uppercase sm:mt-6">
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
          <DetailBlock index={nextIndex()} title="Overview">
            {project.overview}
          </DetailBlock>
          <DetailBlock index={nextIndex()} title="Technology">
            {project.tech.join(" · ")}
          </DetailBlock>
          <DetailBlock index={nextIndex()} title="Approach">
            <List items={project.approach} />
          </DetailBlock>
          <DetailBlock index={nextIndex()} title="Workflow">
            <Workflow steps={project.workflow} />
          </DetailBlock>
          {project.evaluation.length > 0 ? (
            <DetailBlock index={nextIndex()} title="Evaluation">
              <List items={project.evaluation} />
            </DetailBlock>
          ) : null}
          {project.githubUrl ? (
            <DetailBlock index={nextIndex()} title="GitHub">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-2 text-foreground transition-colors hover:text-primary"
              >
                View Repository
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              </a>
            </DetailBlock>
          ) : null}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-12 items-center gap-2 border border-border px-6 text-[0.75rem] tracking-[0.16em] uppercase transition-colors hover:border-primary hover:text-primary"
          >
            Back to projects
          </button>
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2 border border-border px-6 text-[0.75rem] tracking-[0.16em] uppercase transition-colors hover:border-primary hover:text-primary"
            >
              GitHub
              <ArrowUpRight className="size-4" />
            </a>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}

function filterProjects(filter: ProjectFilterId) {
  if (filter === "all") return projects;
  if (filter === "ai-ml") return projects.filter((p) => p.categories.includes("AI / ML"));
  return projects.filter((p) => p.categories.includes("DATA ANALYTICS"));
}

export function Projects() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<ProjectFilterId>("all");

  useEffect(() => {
    const onFilter = (event: Event) => {
      const filter = (event as CustomEvent<ProjectFilterId>).detail;
      if (filter) setActiveFilter(filter);
    };
    window.addEventListener("portfolio:project-filter", onFilter);
    return () => window.removeEventListener("portfolio:project-filter", onFilter);
  }, []);

  const filteredProjects = useMemo(() => filterProjects(activeFilter), [activeFilter]);

  return (
    <section className="scroll-mt-16 border-t border-border py-12 sm:scroll-mt-20 sm:py-16 lg:py-20">
      <div className="shell">
        <SectionHeading
          id="projects"
          index="02"
          eyebrow="Work"
          title="Selected Work"
          lead="A collection of applied work across data analytics, machine learning, computer vision and intelligent systems."
        />

        <Reveal delay={0.08}>
          <div
            className="relative mt-8 flex gap-4 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mt-10 sm:gap-6 md:flex-wrap md:overflow-visible"
            role="tablist"
            aria-label="Filter projects by category"
          >
            {projectFilters.map((filter) => {
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(filter.id)}
                  className={cn(
                    "relative shrink-0 pb-2 text-sm tracking-[0.16em] uppercase transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary sm:text-[0.9375rem]",
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {filter.label}
                  <span
                    className={cn(
                      "absolute inset-x-0 -bottom-px h-px bg-primary transition-all duration-300",
                      isActive ? "opacity-100" : "opacity-0",
                    )}
                  />
                </button>
              );
            })}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 space-y-px bg-border sm:mt-10"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCard project={project} onOpen={setOpen} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {open ? <ProjectDetail project={open} onClose={() => setOpen(null)} /> : null}
      </AnimatePresence>
    </section>
  );
}
