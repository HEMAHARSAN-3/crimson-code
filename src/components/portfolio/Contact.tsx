import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { navItems, contactLinks, profile } from "@/data/portfolio";
import { sendContactEmail } from "@/lib/emailjs-config";
import { scrollToSection } from "@/lib/scroll-to-section";
import { cn } from "@/lib/utils";
import { Reveal, SectionHeading } from "./primitives";

type FormValues = { name: string; email: string; message: string };
type FieldErrors = Partial<Record<keyof FormValues, string>>;
type FormStatus = "idle" | "submitting" | "success" | "error";

const MESSAGE_MIN_LENGTH = 10;
const MESSAGE_MAX_LENGTH = 2000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateForm(values: FormValues): FieldErrors {
  const errors: FieldErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) {
    errors.name = "Please enter your name.";
  } else if (name.length < 2) {
    errors.name = "Please enter at least 2 characters.";
  }

  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!message) {
    errors.message = "Please write your message.";
  } else if (message.length < MESSAGE_MIN_LENGTH) {
    errors.message = `Please write at least ${MESSAGE_MIN_LENGTH} characters.`;
  } else if (message.length > MESSAGE_MAX_LENGTH) {
    errors.message = `Please keep your message under ${MESSAGE_MAX_LENGTH} characters.`;
  }

  return errors;
}

function ContactInfoRow({
  label,
  value,
  href,
  external,
}: {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const content = (
    <>
      <span className="eyebrow">{label}</span>
      <span className="flex items-center gap-2 text-sm break-all text-foreground transition-colors group-hover:text-primary">
        {value}
        {href ? (
          <ArrowUpRight className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        ) : null}
      </span>
    </>
  );

  if (!href) {
    return (
      <div className="group flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        {content}
      </div>
    );
  }

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
    >
      {content}
    </a>
  );
}

export function ContactForm() {
  const [values, setValues] = useState<FormValues>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [honeypot, setHoneypot] = useState("");
  const statusRef = useRef<HTMLDivElement>(null);
  const successTimeoutRef = useRef<number | null>(null);
  const formId = useId();
  const statusId = `${formId}-status`;

  useEffect(() => {
    return () => {
      if (successTimeoutRef.current !== null) {
        window.clearTimeout(successTimeoutRef.current);
      }
    };
  }, []);

  const fieldClass =
    "w-full border border-border bg-card px-4 py-3.5 text-sm text-foreground placeholder:text-subtle transition-colors focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-50";

  const handleChange =
    (field: keyof FormValues) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((current) => ({ ...current, [field]: event.target.value }));
      setErrors((current) => ({ ...current, [field]: undefined }));
      if (status === "error") setStatus("idle");
    };

  const focusFirstError = (nextErrors: FieldErrors) => {
    const firstField = (["name", "email", "message"] as const).find((field) => nextErrors[field]);
    if (!firstField) return;
    document.getElementById(firstField)?.focus();
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const nextErrors = validateForm(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("idle");
      focusFirstError(nextErrors);
      return;
    }

    if (honeypot.trim()) {
      setValues({ name: "", email: "", message: "" });
      setErrors({});
      setStatus("success");
      return;
    }

    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
    };

    setStatus("submitting");
    setErrors({});

    try {
      await sendContactEmail(payload);
      setValues({ name: "", email: "", message: "" });
      setStatus("success");

      successTimeoutRef.current = window.setTimeout(() => {
        setStatus("idle");
        successTimeoutRef.current = null;
      }, 8000);

      requestAnimationFrame(() => statusRef.current?.focus());
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setStatus("error");
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  };

  const isSubmitting = status === "submitting";

  return (
    <section className="shell scroll-mt-16 py-12 sm:scroll-mt-20 sm:py-16 lg:py-20" aria-labelledby="contact">
      <SectionHeading
        id="contact"
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

      <div className="mt-10 grid gap-8 sm:gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-12 lg:gap-20">
        <Reveal>
          <ul className="divide-y divide-border border-y border-border">
            {contactLinks.map((link) => (
              <li key={link.label}>
                <ContactInfoRow
                  label={link.label}
                  value={link.value}
                  href={link.href}
                  external={link.external}
                />
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.08}>
          <form
            onSubmit={onSubmit}
            noValidate
            aria-busy={isSubmitting}
            className="space-y-5"
          >
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={honeypot}
              onChange={(event) => setHoneypot(event.target.value)}
              className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0"
            />

            <div>
              <label htmlFor="name" className="eyebrow mb-2 block">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={values.name}
                onChange={handleChange("name")}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
                disabled={isSubmitting}
                maxLength={120}
                className={fieldClass}
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
                required
                autoComplete="email"
                inputMode="email"
                value={values.email}
                onChange={handleChange("email")}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                disabled={isSubmitting}
                maxLength={254}
                className={fieldClass}
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
                required
                value={values.message}
                onChange={handleChange("message")}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                disabled={isSubmitting}
                maxLength={MESSAGE_MAX_LENGTH}
                className={`${fieldClass} resize-none`}
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
              disabled={isSubmitting}
              className="group inline-flex min-h-12 items-center gap-2 bg-primary px-6 text-[0.75rem] tracking-[0.16em] text-primary-foreground uppercase transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60 motion-reduce:transition-none"
            >
              {isSubmitting ? "Sending…" : "Start a conversation"}
              {!isSubmitting ? (
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0" />
              ) : null}
            </button>

            <div
              ref={statusRef}
              id={statusId}
              tabIndex={-1}
              aria-live="polite"
              aria-atomic="true"
              className="outline-none"
            >
              {status === "success" ? (
                <div className="space-y-1 border-l-2 border-primary pl-4">
                  <p className="eyebrow text-primary">Message sent.</p>
                  <p className="text-sm text-muted-foreground">
                    Thanks for reaching out. I&apos;ll get back to you soon.
                  </p>
                </div>
              ) : null}

              {status === "error" ? (
                <div className="space-y-2 border-l-2 border-primary pl-4">
                  <p className="eyebrow text-primary">Something went wrong.</p>
                  <p className="text-sm text-muted-foreground">
                    Please try again or contact me directly by{" "}
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-foreground underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary"
                    >
                      email
                    </a>
                    .
                  </p>
                </div>
              ) : null}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  const footerFocus = [
    "Data Analytics",
    "Machine Learning",
    "Computer Vision",
    "Predictive Analytics",
  ];

  const footerNav = navItems.filter((item) => item.href !== "#home");

  return (
    <footer className="border-t border-border bg-secondary/30 py-12 sm:py-16">
      <div className="shell">
        <div className="mb-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <p className="display text-lg font-bold uppercase text-foreground">{profile.name}</p>
            <p className="eyebrow mt-3 text-primary">AI / ML · DATA ANALYTICS</p>
            <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
              Building intelligent solutions and turning data into meaningful insights.
            </p>
          </div>

          {/* Focus Areas */}
          <div className="md:col-span-1">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">Focus</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {footerFocus.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onMouseDown={(e) => e.button === 0 && e.preventDefault()}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href);
                    }}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="md:col-span-1">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">Connect</h4>
            <ul className="flex flex-col gap-2">
              {[
                { label: "GitHub", href: profile.github },
                { label: "LinkedIn", href: profile.linkedin },
                { label: "Email", href: `mailto:${profile.email}` },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
                  >
                    {l.label}
                    {l.href.startsWith("http") && (
                      <span className="text-xs">↗</span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/50 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-muted-foreground">© 2026 Hema Harsan R. All rights reserved.</p>
            <p className="text-xs text-muted-foreground">Designed &amp; engineered with intention.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={cn(
        "fixed z-50 inline-flex size-11 items-center justify-center border border-border/60 bg-card/40 text-muted-foreground backdrop-blur transition-all duration-300 hover:border-primary hover:bg-card hover:text-primary group motion-reduce:transition-none bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] sm:size-12 sm:bottom-[max(1.5rem,env(safe-area-inset-bottom))] sm:right-[max(1.5rem,env(safe-area-inset-right))]",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0",
      )}
      aria-label="Scroll to top"
    >
      <svg
        className="w-6 h-6 group-hover:scale-110 transition-transform"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
}
