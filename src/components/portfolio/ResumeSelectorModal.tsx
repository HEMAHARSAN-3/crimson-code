import { useEffect, useRef, useState, type RefObject } from "react";
import { ArrowDown, ArrowUpRight, X } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useReducedMotion } from "motion/react";
import { Dialog, DialogOverlay, DialogPortal } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { getResumeFile, getResumeViewPath, resumeProfiles, type ResumeProfile } from "@/data/resumes";
import {
  getSelectedProfile,
  setSelectedProfile,
  type ProfileId,
} from "@/lib/profile-preference";

type ResumeSelectorModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerRef?: RefObject<HTMLButtonElement | null>;
};

function viewResume(profileId: ProfileId) {
  window.open(getResumeViewPath(profileId), "_blank", "noopener,noreferrer");
}

function downloadResume(pdfPath: string, filename: string) {
  const link = document.createElement("a");
  link.href = pdfPath;
  link.download = filename;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function ResumeProfileCard({
  profile,
  selected,
  onSelect,
}: {
  profile: ResumeProfile;
  selected: boolean;
  onSelect: (id: ProfileId) => void;
}) {
  const isCrimson = profile.accent === "crimson";
  const resume = getResumeFile(profile.id);

  const handleSelect = () => onSelect(profile.id);

  return (
    <article
      role="group"
      aria-label={`${profile.title} profile`}
      onClick={handleSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleSelect();
        }
      }}
      tabIndex={0}
      className={cn(
        "group relative flex cursor-pointer flex-col border bg-card/60 p-5 transition-all duration-300 motion-safe:hover:-translate-y-1 sm:p-6",
        selected
          ? "border-primary/60 bg-card/80 shadow-[0_12px_40px_oklch(0.564_0.223_21.9_/_10%)]"
          : isCrimson
            ? "border-border/80 motion-safe:hover:border-primary/50 motion-safe:hover:bg-card/80 motion-safe:hover:shadow-[0_12px_40px_oklch(0.564_0.223_21.9_/_8%)]"
            : "border-border/80 motion-safe:hover:border-foreground/25 motion-safe:hover:bg-card/80 motion-safe:hover:shadow-[0_12px_40px_oklch(0_0_0_/_25%)] motion-safe:hover:border-primary/40",
      )}
    >
      <div
        aria-hidden
        className={cn(
          "absolute inset-x-0 top-0 h-px transition-opacity duration-300",
          selected || isCrimson
            ? "bg-primary/70 opacity-100"
            : "bg-foreground/20 opacity-70 group-hover:bg-primary/60 group-hover:opacity-100",
        )}
      />

      <p className="eyebrow">
        <span
          className={cn(
            selected || isCrimson
              ? "text-primary"
              : "text-foreground/70 group-hover:text-primary",
          )}
        >
          {profile.number}
        </span>
        <span className="text-muted-foreground"> / {profile.category}</span>
      </p>

      <h3
        className={cn(
          "display mt-4 text-[clamp(1.25rem,3.5vw,1.875rem)] font-semibold uppercase leading-none transition-colors duration-300",
          selected ? "text-foreground" : "group-hover:text-foreground",
        )}
      >
        {profile.title}
      </h3>

      <p className="mt-3 text-sm font-medium leading-relaxed text-foreground/85">
        {profile.description}
      </p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {profile.tags.map((tag) => (
          <li
            key={tag}
            className={cn(
              "border border-border/60 bg-background/50 px-2.5 py-1 text-[0.6875rem] tracking-[0.1em] uppercase transition-colors duration-300",
              selected
                ? "border-primary/30 text-foreground/90"
                : "text-muted-foreground group-hover:border-border group-hover:text-foreground/80",
            )}
          >
            {tag}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-col gap-2.5">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            handleSelect();
            viewResume(profile.id);
          }}
          className={cn(
            "group/btn inline-flex min-h-10 w-full items-center justify-center gap-2 border px-4 text-[0.6875rem] tracking-[0.14em] uppercase transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary",
            selected || isCrimson
              ? "border-primary/40 text-foreground hover:border-primary hover:bg-primary/5 hover:shadow-[0_0_18px_oklch(0.564_0.223_21.9_/_12%)]"
              : "border-border text-foreground hover:border-primary hover:text-primary hover:shadow-[0_0_18px_oklch(0.564_0.223_21.9_/_10%)]",
          )}
          aria-label={`View ${profile.title} resume in a new tab`}
        >
          View Resume
          <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </button>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            handleSelect();
            downloadResume(resume.pdfPath, resume.downloadFilename);
          }}
          className="group/btn inline-flex min-h-9 w-full items-center justify-center gap-2 text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase transition-colors duration-300 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary"
          aria-label={`Download ${profile.title} resume as PDF`}
        >
          Download PDF
          <ArrowDown className="size-3.5 transition-transform duration-300 group-hover/btn:translate-y-0.5" />
        </button>
      </div>
    </article>
  );
}

export function ResumeSelectorModal({ open, onOpenChange, triggerRef }: ResumeSelectorModalProps) {
  const reduced = useReducedMotion();
  const wasOpen = useRef(false);
  const [selectedId, setSelectedId] = useState<ProfileId | null>(() => getSelectedProfile());

  useEffect(() => {
    if (open) {
      setSelectedId(getSelectedProfile());
    } else if (wasOpen.current) {
      triggerRef?.current?.focus();
    }
    wasOpen.current = open;
  }, [open, triggerRef]);

  const handleSelect = (id: ProfileId) => {
    setSelectedId(id);
    setSelectedProfile(id);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="bg-black/75 backdrop-blur-md" />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-1/2 top-4 z-50 flex max-h-[calc(100dvh-2rem)] w-[calc(100%-1.5rem)] max-w-4xl -translate-x-1/2 flex-col overflow-y-auto border border-border/80 bg-elevated shadow-[0_24px_80px_oklch(0_0_0_/_55%)] [scrollbar-width:none] [-ms-overflow-style:none] focus:outline-none sm:top-1/2 sm:max-h-[90vh] sm:w-[calc(100%-2rem)] sm:-translate-y-1/2 sm:rounded-sm [&::-webkit-scrollbar]:hidden",
            !reduced &&
              "duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
          )}
          aria-describedby="resume-selector-description"
        >
          <DialogPrimitive.Close
            type="button"
            className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center border border-border/80 text-muted-foreground transition-colors duration-300 hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary"
            aria-label="Close resume selector"
          >
            <X className="size-4" />
          </DialogPrimitive.Close>

          <div className="border-b border-border/80 px-6 py-5 sm:py-6">
            <DialogPrimitive.Title className="display text-center text-[clamp(1.125rem,3vw,1.625rem)] font-semibold uppercase tracking-[0.06em]">
              Choose Your Profile
            </DialogPrimitive.Title>
            <DialogPrimitive.Description
              id="resume-selector-description"
              className="mx-auto mt-2.5 max-w-xl text-center text-sm font-medium leading-relaxed text-foreground/80"
            >
              Different roles. One skill set built around data, intelligence and problem solving.
            </DialogPrimitive.Description>
          </div>

          <div className="grid gap-4 px-6 py-5 sm:py-6 md:grid-cols-2">
            {resumeProfiles.map((profile) => (
              <ResumeProfileCard
                key={profile.id}
                profile={profile}
                selected={selectedId === profile.id}
                onSelect={handleSelect}
              />
            ))}
          </div>

          <div className="border-t border-border/80 px-6 py-4 text-center">
            <p className="text-xs tracking-wide text-muted-foreground">Not sure which fits?</p>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="mt-1.5 inline-flex items-center gap-1.5 text-[0.6875rem] tracking-[0.14em] text-foreground/80 uppercase transition-colors duration-300 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary"
            >
              Explore Full Portfolio
              <span aria-hidden>→</span>
            </button>
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
