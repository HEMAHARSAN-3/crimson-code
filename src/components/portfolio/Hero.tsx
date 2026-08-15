import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import portrait from "@/assets/hero-portrait.png";
import { profile } from "@/data/portfolio";
import { scrollToSection } from "@/lib/scroll-to-section";
import { ResumeSelectorModal } from "./ResumeSelectorModal";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const resumeTriggerRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 90, damping: 20 });
  const sy = useSpring(my, { stiffness: 90, damping: 20 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [6, -6]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [-5, 5]);
  const shiftX = useTransform(sx, [-0.5, 0.5], [12, -12]);

  const onMove = (e: React.MouseEvent) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  const rise = (delay: number) => ({
    initial: reduced ? (false as const) : { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease },
  });

  return (
    <section
      id="home"
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="relative overflow-hidden pt-20 pb-10 sm:pt-24 sm:pb-12 md:pt-24 lg:pt-28 lg:pb-[4.5rem]"
    >
      <div
        aria-hidden
        className="rule-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(80%_60%_at_50%_0%,#000,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-16 size-64 rounded-full bg-primary-deep/25 blur-[100px] sm:-top-40 sm:-right-24 sm:size-[28rem] sm:blur-[120px] lg:size-[36rem] lg:blur-[140px]"
      />

      <div className="shell relative grid items-center gap-8 sm:gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div className="md:order-1">
          <motion.p {...rise(0.05)} className="eyebrow">
            <span className="text-foreground">Open to Work</span>
          </motion.p>
          <motion.p {...rise(0.05)} className="eyebrow">
            AI • DATA • MACHINE LEARNING
          </motion.p>

          <motion.h1
            {...rise(0.14)}
            className="display mt-6 text-[clamp(2.75rem,9vw,6.5rem)] font-bold uppercase"
          >
            Hema
            <br />
            Harsan R<span className="text-primary">.</span>
          </motion.h1>

          <motion.p
            {...rise(0.24)}
            className="display mt-8 max-w-xl text-[clamp(1.25rem,2.6vw,2rem)] leading-[1.15] font-medium text-foreground/90"
          >
            Building intelligent systems that turn data into decisions.
          </motion.p>

          <motion.p
            {...rise(0.32)}
            className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base"
          >
            AI &amp; Data Science graduate focused on Data Analytics, Machine Learning, Deep Learning and 
            Computer Vision — turning data into meaningful insights and intelligent solutions.
          </motion.p>

          <motion.div {...rise(0.4)} className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              onMouseDown={(e) => e.button === 0 && e.preventDefault()}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#projects");
              }}
              className="group inline-flex min-h-12 items-center gap-2 bg-primary px-6 text-[0.75rem] tracking-[0.16em] text-primary-foreground uppercase transition-colors hover:bg-primary-hover"
            >
              EXPLORE MY WORK
              <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
            <button
              ref={resumeTriggerRef}
              type="button"
              onClick={() => setResumeOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={resumeOpen}
              className="group inline-flex min-h-12 items-center gap-2 border border-border px-6 text-[0.75rem] tracking-[0.16em] uppercase transition-all duration-300 hover:border-primary hover:text-primary hover:shadow-[0_0_20px_oklch(0.564_0.223_21.9_/_15%)]"
            >
              RESUME
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </motion.div>

          <ResumeSelectorModal
            open={resumeOpen}
            onOpenChange={setResumeOpen}
            triggerRef={resumeTriggerRef}
          />

          <motion.ul
            {...rise(0.48)}
            className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border pt-5 text-[0.75rem] tracking-[0.16em] uppercase"
          >
            {[
              { label: "GitHub", href: profile.github },
              { label: "LinkedIn", href: profile.linkedin },
              { label: "Email", href: `mailto:${profile.email}` },
            ].map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer noopener"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          {...rise(0.2)}
          className="md:order-2 md:flex md:justify-center lg:justify-center"
          style={{ perspective: 1200 }}
        >
          <motion.div
            style={reduced ? {} : { rotateX, rotateY, x: shiftX }}
            className="relative mx-auto w-full max-w-xs sm:max-w-sm md:max-w-[17rem] lg:max-w-[25rem] border border-border"
          >
            <div className="absolute -top-px -left-px z-10 size-4 border-t-2 border-l-2 border-primary" />
            <div className="absolute -right-px -bottom-px z-10 size-4 border-r-2 border-b-2 border-primary" />
            <img
              src={portrait}
              alt="Illustrated portrait of Hema Harsan R working at a desk with a laptop and headphones"
              width={896}
              height={1408}
              fetchPriority="high"
              className="aspect-[9/13] w-full object-cover object-center"
            />
            <div className="flex flex-col gap-1.5 border-t border-border bg-card px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-2 sm:px-4 sm:py-3">
              <span className="eyebrow text-[0.625rem] sm:text-[0.6875rem]">DATA ANALYTICS</span>
              <span className="eyebrow text-[0.625rem] text-primary sm:text-[0.6875rem]">AI / ML Engineering</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
