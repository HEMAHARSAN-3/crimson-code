import type { ProjectFilterId } from "@/data/portfolio";

export type ProfileId = "data-analyst" | "ai-ml-engineer";

const STORAGE_KEY = "portfolio:selected-profile";

export function getSelectedProfile(): ProfileId | null {
  if (typeof window === "undefined") return null;
  const value = sessionStorage.getItem(STORAGE_KEY);
  if (value === "data-analyst" || value === "ai-ml-engineer") return value;
  return null;
}

export function setSelectedProfile(id: ProfileId) {
  sessionStorage.setItem(STORAGE_KEY, id);
  window.dispatchEvent(
    new CustomEvent("portfolio:profile-selected", {
      detail: profileToProjectFilter(id),
    }),
  );
}

export function profileToProjectFilter(id: ProfileId): ProjectFilterId {
  return id === "data-analyst" ? "data-analytics" : "ai-ml";
}
