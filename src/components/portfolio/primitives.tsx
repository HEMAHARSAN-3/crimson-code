import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
  y = 24,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  id,
  index,
  eyebrow,
  title,
  lead,
}: {
  id?: string;
  index: string;
  eyebrow: string;
  title: ReactNode;
  lead?: string;
}) {
  return (
    <div id={id} data-section-heading className="scroll-mt-16 border-t border-border pt-5 sm:scroll-mt-20">
      <Reveal y={0}>
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 sm:gap-x-4">
          <span className="eyebrow text-primary">{index}</span>
          <span className="eyebrow">{eyebrow}</span>
        </div>
      </Reveal>
      <Reveal delay={0.06} y={0}>
        <h2 className="display mt-5 text-[clamp(2.25rem,6vw,4.5rem)] font-semibold uppercase">
          {title}
        </h2>
      </Reveal>
      {lead ? (
        <Reveal delay={0.12} y={0}>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">{lead}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
