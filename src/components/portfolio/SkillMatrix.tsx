import { useState } from "react";
import {
  skills,
  skillCategoryHighlights,
  skillProjectFilters,
  type ProjectFilterId,
} from "@/data/portfolio";
import { Reveal, SectionHeading } from "./primitives";
import { cn } from "@/lib/utils";

import { scrollToSection } from "@/lib/scroll-to-section";

function scrollToProjects(filter?: ProjectFilterId) {
  if (filter) {
    window.dispatchEvent(
      new CustomEvent("portfolio:project-filter", { detail: filter }),
    );
  }
  scrollToSection("#projects");
}

function SkillCard({
  group,
  delay,
  hoveredCategory,
  onHover,
}: {
  group: (typeof skills)[number];
  delay: number;
  hoveredCategory: string | null;
  onHover: (category: string | null) => void;
}) {
  const highlights = hoveredCategory ? skillCategoryHighlights[hoveredCategory] ?? [] : [];
  const isHovered = hoveredCategory === group.category;
  const isRelatedCategory = hoveredCategory !== null && highlights.some((item) => group.items.includes(item));

  return (
    <Reveal delay={delay}>
      <article
        className={cn(
          "group/card relative flex h-full min-w-0 flex-col bg-background p-4 transition-colors duration-300 sm:p-5",
          isHovered && "bg-card/25",
        )}
        onMouseEnter={() => onHover(group.category)}
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover(group.category)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) onHover(null);
        }}
      >
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 h-px bg-primary transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0",
          )}
        />

        <div className="mb-3 flex items-center gap-2 sm:mb-4 sm:gap-3">
          <span
            className={cn(
              "text-xs font-bold sm:text-sm transition-colors duration-300",
              isHovered ? "text-primary" : "text-primary/80",
            )}
          >
            {group.number}
          </span>
          <h3
            className={cn(
              "text-xs font-semibold uppercase tracking-widest transition-colors duration-300 sm:text-sm",
              isHovered ? "text-foreground" : "text-white/90",
            )}
          >
            {group.category}
          </h3>
        </div>

        <div className="flex min-w-0 flex-wrap gap-1.5 sm:gap-2">
          {group.items.map((item) => {
            const isRelated = !isHovered && isRelatedCategory && highlights.includes(item);
            const projectFilter = skillProjectFilters[item];

            return (
              <button
                key={item}
                type="button"
                onClick={() => scrollToProjects(projectFilter)}
                className={cn(
                  "max-w-full border border-border/40 bg-card/40 px-2 py-1 text-left text-xs transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:px-2.5 sm:py-1.5",
                  isHovered
                    ? "border-primary/40 text-primary"
                    : isRelated
                      ? "text-foreground/80"
                      : "text-muted-foreground hover:border-primary/50 hover:text-primary",
                  hoveredCategory && !isHovered && !isRelated && "[@media(hover:hover)]:opacity-60",
                )}
              >
                {item}
              </button>
            );
          })}
        </div>
      </article>
    </Reveal>
  );
}

export function SkillMatrix() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <section className="scroll-mt-16 border-t border-border bg-secondary/40 py-12 sm:scroll-mt-20 sm:py-16">
      <div className="shell">
        <SectionHeading
          id="skills"
          index="03"
          eyebrow="Capabilities"
          title={
            <>
              Technical
              <br />
              Stack
            </>
          }
          lead="Technical skills spanning data analytics, machine learning, computer vision and software development."
        />

        <div className="mt-8 grid gap-px bg-border sm:mt-10 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, index) => (
            <SkillCard
              key={group.category}
              group={group}
              delay={index * 0.06}
              hoveredCategory={hoveredCategory}
              onHover={setHoveredCategory}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
