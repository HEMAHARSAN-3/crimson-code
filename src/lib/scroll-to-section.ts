type ScrollOptions = {
  smooth?: boolean;
};

export function getNavOffset() {
  const nav = document.querySelector("header nav") as HTMLElement | null;
  const header = document.querySelector("header") as HTMLElement | null;
  return (nav?.offsetHeight ?? header?.offsetHeight ?? 0) + 12;
}

export function getSectionAnchor(section: HTMLElement) {
  if (section.matches("[data-section-heading]")) return section;
  return (section.querySelector("[data-section-heading]") as HTMLElement | null) ?? section;
}

export function getScrollTopForSection(section: HTMLElement) {
  if (section.id === "home") return 0;

  const anchor = getSectionAnchor(section);
  const top = anchor.getBoundingClientRect().top + window.scrollY - getNavOffset();
  return Math.max(0, top);
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function applyScrollTop(target: number, smooth: boolean) {
  if (smooth) {
    window.scrollTo({ top: target, behavior: "smooth" });
    return;
  }

  const html = document.documentElement;
  html.style.scrollBehavior = "auto";
  document.documentElement.scrollTop = target;
  document.body.scrollTop = target;
  window.scrollTo(0, target);
  html.style.removeProperty("scroll-behavior");
}

function correctScrollDrift(section: HTMLElement, smooth: boolean) {
  const drift = section.getBoundingClientRect().top - getNavOffset();
  if (Math.abs(drift) <= 2) return;

  const corrected = Math.max(0, window.scrollY + drift);
  applyScrollTop(corrected, false);
}

function waitForScrollEnd(): Promise<void> {
  return new Promise((resolve) => {
    let resolved = false;
    const finish = () => {
      if (resolved) return;
      resolved = true;
      resolve();
    };

    const timeout = window.setTimeout(finish, 900);

    if ("onscrollend" in window) {
      const onScrollEnd = () => {
        window.clearTimeout(timeout);
        window.removeEventListener("scrollend", onScrollEnd);
        finish();
      };
      window.addEventListener("scrollend", onScrollEnd, { once: true });
      return;
    }

    let lastY = window.scrollY;
    let stableFrames = 0;

    const poll = () => {
      if (resolved) return;

      const currentY = window.scrollY;
      if (Math.abs(currentY - lastY) < 1) {
        stableFrames += 1;
        if (stableFrames >= 4) {
          window.clearTimeout(timeout);
          finish();
          return;
        }
      } else {
        stableFrames = 0;
        lastY = currentY;
      }

      requestAnimationFrame(poll);
    };

    requestAnimationFrame(poll);
  });
}

export function scrollToSection(href: string, options: ScrollOptions = {}): Promise<void> {
  const section = document.querySelector(href) as HTMLElement | null;
  if (!section) return Promise.resolve();

  const smooth = options.smooth === true && !prefersReducedMotion();
  const target = getScrollTopForSection(section);

  applyScrollTop(target, smooth);
  window.history.pushState(null, "", href);

  if (smooth) {
    return waitForScrollEnd().then(() => {
      correctScrollDrift(section, false);
    });
  }

  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      correctScrollDrift(section, false);
      resolve();
    });
  });
}

export function scrollToSectionAfterLayout(
  href: string,
  options: ScrollOptions = {},
): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        void scrollToSection(href, options).then(resolve);
      });
    });
  });
}
