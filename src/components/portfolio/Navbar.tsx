import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import logoAi from "@/assets/logo_ai.png";
import { navItems } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import {
  getNavOffset,
  getSectionAnchor,
  scrollToSection,
  scrollToSectionAfterLayout,
} from "@/lib/scroll-to-section";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const isProgrammaticScroll = useRef(false);

  const handleNavClick = (href: string, closeMenu = false) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    isProgrammaticScroll.current = true;
    setActive(href);

    const finishScroll = () => {
      isProgrammaticScroll.current = false;
    };

    if (closeMenu && open) {
      setOpen(false);
      void scrollToSectionAfterLayout(href, { smooth: true }).finally(finishScroll);
      return;
    }

    void scrollToSection(href, { smooth: true }).finally(finishScroll);
  };

  const blockNativeHashNav = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button === 0) event.preventDefault();
  };

  useEffect(() => {
    const syncActiveFromScroll = () => {
      setScrolled(window.scrollY > 24);
      if (isProgrammaticScroll.current) return;

      const offset = getNavOffset();
      let current = navItems[0]?.href ?? "#home";

      for (const item of navItems) {
        const section = document.querySelector(item.href) as HTMLElement | null;
        if (!section) continue;
        const anchor = getSectionAnchor(section);
        if (anchor.getBoundingClientRect().top - offset <= 8) {
          current = item.href;
        }
      }

      setActive(current);
    };

    syncActiveFromScroll();

    if (window.location.hash) {
      isProgrammaticScroll.current = true;
      setActive(window.location.hash);
      scrollToSectionAfterLayout(window.location.hash);
      requestAnimationFrame(() => {
        isProgrammaticScroll.current = false;
        syncActiveFromScroll();
      });
    }

    window.addEventListener("scroll", syncActiveFromScroll, { passive: true });
    return () => window.removeEventListener("scroll", syncActiveFromScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="shell flex h-14 sm:h-16 items-center justify-between gap-4 sm:gap-6 lg:h-20"
      >
        <a
          href="#home"
          onMouseDown={blockNativeHashNav}
          onClick={handleNavClick("#home")}
          className="display flex min-w-0 items-center gap-2 text-sm font-bold tracking-tight shrink-0 sm:text-lg"
        >
          <img src={logoAi} alt="Hema Harsan logo" className="h-9 w-9 shrink-0 rounded-md object-contain sm:h-10 sm:w-10" />
          <span>
            Hema Harsan<span className="text-primary">.</span>
          </span>
        </a>

        <ul className="hidden min-w-0 flex-1 items-center justify-center gap-2 px-2 lg:flex xl:gap-6">
          {navItems.map((item) => (
            <li key={item.href} className="shrink-0">
              <a
                href={item.href}
                onMouseDown={blockNativeHashNav}
                onClick={handleNavClick(item.href)}
                aria-current={active === item.href ? "true" : undefined}
                className={cn(
                  "relative whitespace-nowrap text-[0.6875rem] tracking-wide text-muted-foreground transition-colors hover:text-foreground xl:text-[0.8125rem]",
                  active === item.href && "text-foreground",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute -bottom-1.5 left-0 h-px bg-primary transition-all duration-300",
                    active === item.href ? "w-full" : "w-0",
                  )}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href="#contact"
            onMouseDown={blockNativeHashNav}
            onClick={handleNavClick("#contact")}
            className="group hidden items-center gap-1.5 border border-border px-3 py-2 text-[0.6875rem] tracking-[0.14em] uppercase transition-colors hover:border-primary hover:text-primary md:inline-flex lg:px-4 lg:text-[0.75rem]"
          >
            Contact Me
            <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex size-11 items-center justify-center border border-border lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="max-h-[calc(100dvh-3.5rem)] overflow-y-auto overscroll-contain border-t border-border bg-background/95 backdrop-blur-xl lg:hidden sm:max-h-[calc(100dvh-4rem)]">
          <ul className="shell grid gap-0 py-3 sm:py-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onMouseDown={blockNativeHashNav}
                  onClick={handleNavClick(item.href, true)}
                  aria-current={active === item.href ? "true" : undefined}
                  className={cn(
                    "flex items-center justify-between border-b border-border/60 py-2.5 sm:py-3.5 text-xs sm:text-sm tracking-wide transition-colors",
                    active === item.href ? "text-primary" : "text-foreground",
                  )}
                >
                  {item.label}
                  <ArrowUpRight className="size-4 text-subtle" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
