export const FAVORITES_KEY = "alltoolkit:favorites";
export const RECENTS_KEY = "alltoolkit:recents";

export function readStringArray(key: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const value = JSON.parse(window.localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function writeStringArray(key: string, value: string[]) {
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent("alltoolkit-storage", { detail: { key } }));
}
