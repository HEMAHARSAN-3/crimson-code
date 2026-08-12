import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import portrait from "@/assets/hero-portrait.jpg";
import { profile } from "@/data/portfolio";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
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
      className="relative overflow-hidden pt-28 pb-16 lg:pt-36 lg:pb-24"
    >
      <div
        aria-hidden
        className="rule-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(80%_60%_at_50%_0%,#000,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-24 size-[36rem] rounded-full bg-primary-deep/25 blur-[140px]"
      />

      <div className="shell relative grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div className="order-2 lg:order-1">
          <motion.p {...rise(0.05)} className="eyebrow">
            AI / ML Engineer
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
            className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base"
          >
            AI &amp; Data Science graduate focused on Machine Learning, Deep
            Learning, Computer Vision and software development.
          </motion.p>

          <motion.div {...rise(0.4)} className="mt-10 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="group inline-flex min-h-12 items-center gap-2 bg-primary px-6 text-[0.75rem] tracking-[0.16em] text-primary-foreground uppercase transition-colors hover:bg-primary-hover"
            >
              View Projects
              <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="group inline-flex min-h-12 items-center gap-2 border border-border px-6 text-[0.75rem] tracking-[0.16em] uppercase transition-colors hover:border-primary hover:text-primary"
            >
              Let&apos;s Connect
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>

          <motion.ul
            {...rise(0.48)}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border pt-6 text-[0.75rem] tracking-[0.16em] uppercase"
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
          className="order-1 lg:order-2"
          style={{ perspective: 1200 }}
        >
          <motion.div
            style={reduced ? {} : { rotateX, rotateY, x: shiftX }}
            className="relative mx-auto max-w-sm border border-border lg:max-w-none"
          >
            <div className="absolute -top-px -left-px z-10 size-4 border-t-2 border-l-2 border-primary" />
            <div className="absolute -right-px -bottom-px z-10 size-4 border-r-2 border-b-2 border-primary" />
            <img
              src={portrait}
              alt="Illustrated portrait of Hema Harsan R working at a desk with a laptop and headphones"
              width={896}
              height={1408}
              fetchPriority="high"
              className="aspect-[9/13] w-full object-cover"
            />
            <div className="flex items-center justify-between border-t border-border bg-card px-4 py-3">
              <span className="eyebrow">Machine Learning</span>
              <span className="eyebrow text-primary">Computer Vision</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
