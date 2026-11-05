import type { CSSProperties } from "react";
import { demoSector } from "./demonstrations";
// Cor principal da demonstração conforme o ramo do negócio (só apresentação).
const THEMES: Record<string, [string, string]> = {
  food: ["oklch(0.62 0.2 38)", "oklch(0.99 0 0)"],
  health: ["oklch(0.55 0.13 215)", "oklch(0.99 0 0)"],
  gym: ["oklch(0.82 0.17 90)", "oklch(0.2 0 0)"],
  law: ["oklch(0.35 0.08 260)", "oklch(0.99 0 0)"],
  pet: ["oklch(0.6 0.15 150)", "oklch(0.99 0 0)"],
  auto: ["oklch(0.5 0.17 255)", "oklch(0.99 0 0)"],
  beauty: ["oklch(0.6 0.17 350)", "oklch(0.99 0 0)"],
  services: ["oklch(0.5 0.1 190)", "oklch(0.99 0 0)"],
};
export function demoThemeStyle(category: string): CSSProperties {
  const [p, f] = THEMES[demoSector(category)] ?? THEMES.services;
  return { "--primary": p, "--primary-foreground": f, "--ring": p } as CSSProperties;
}
