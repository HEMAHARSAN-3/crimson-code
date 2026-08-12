import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/portfolio";
import { Reveal, SectionHeading } from "./primitives";

type Errors = { name?: string; email?: string; message?: string };

export function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e: Errors = {};
    if (values.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      e.email = "Please enter a valid email address.";
    if (values.message.trim().length < 10)
      e.message = "Please write at least 10 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    const subject = encodeURIComponent(`Portfolio enquiry from ${values.name}`);
    const body = encodeURIComponent(
      `${values.message}\n\n— ${values.name} (${values.email})`,
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const field =
    "w-full border border-border bg-card px-4 py-3.5 text-sm text-foreground placeholder:text-subtle transition-colors focus:border-primary focus:outline-none";

  return (
    <section id="contact" className="shell scroll-mt-24 py-24 lg:py-32">
      <SectionHeading
        index="09"
        eyebrow="Contact"
        title={
          <>
            Let&apos;s build
            <br />
            something intelligent.
          </>
        }
        lead="Have a problem worth solving? Let's talk."
      />

      <div className="mt-14 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <ul className="divide-y divide-border border-y border-border">
            {[
              { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
              { label: "GitHub", value: profile.githubLabel, href: profile.github },
              { label: "LinkedIn", value: profile.linkedinLabel, href: profile.linkedin },
            ].map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer noopener"
                  className="group flex items-center justify-between gap-4 py-5"
                >
                  <span className="eyebrow">{c.label}</span>
                  <span className="flex items-center gap-2 text-sm break-all text-foreground transition-colors group-hover:text-primary">
                    {c.value}
                    <ArrowUpRight className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.08}>
          <form onSubmit={onSubmit} noValidate className="space-y-5">
            <div>
              <label htmlFor="name" className="eyebrow mb-2 block">
                Name
              </label>
              <input
                id="name"
                name="name"
                value={values.name}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={field}
                placeholder="Your name"
              />
              {errors.name ? (
                <p id="name-error" role="alert" className="mt-2 text-xs text-primary">
                  {errors.name}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="email" className="eyebrow mb-2 block">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={(e) => setValues({ ...values, email: e.target.value })}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={field}
                placeholder="you@company.com"
              />
              {errors.email ? (
                <p id="email-error" role="alert" className="mt-2 text-xs text-primary">
                  {errors.email}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="message" className="eyebrow mb-2 block">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={values.message}
                onChange={(e) =>
                  setValues({ ...values, message: e.target.value })
                }
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={`${field} resize-none`}
                placeholder="What are you working on?"
              />
              {errors.message ? (
                <p id="message-error" role="alert" className="mt-2 text-xs text-primary">
                  {errors.message}
                </p>
              ) : null}
            </div>

            <button
              type="submit"
              className="group inline-flex min-h-12 items-center gap-2 bg-primary px-6 text-[0.75rem] tracking-[0.16em] text-primary-foreground uppercase transition-colors hover:bg-primary-hover"
            >
              Start a conversation
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <p aria-live="polite" className="text-xs text-muted-foreground">
              {sent
                ? "Your email client should now be open with the message ready to send."
                : "Submitting opens your email client with the message prefilled."}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="shell grid gap-10 md:grid-cols-3">
        <div>
          <p className="display text-lg font-bold uppercase">{profile.name}</p>
          <p className="eyebrow mt-2">AI / ML Engineer</p>
        </div>
        <ul className="space-y-1.5 text-sm text-muted-foreground md:text-center">
          <li>Machine Learning</li>
          <li>Deep Learning</li>
          <li>Computer Vision</li>
        </ul>
        <ul className="flex gap-6 text-[0.75rem] tracking-[0.16em] uppercase md:justify-end">
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
        </ul>
      </div>
      <div className="shell mt-10 flex flex-col gap-2 border-t border-border pt-6 text-xs text-subtle sm:flex-row sm:justify-between">
        <p>© 2026 Hema Harsan R</p>
        <p>Designed &amp; engineered with intention.</p>
      </div>
    </footer>
  );
}
