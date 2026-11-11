import type { CSSProperties } from "react";
import { demoSector } from "./demonstrations";
// Visual da demonstração conforme o ramo do negócio (só apresentação).
type Look = { p: string; f: string; bg: string; fg: string; card: string; muted: string; mfg: string; border: string; glow: string };
const dark = (p: string, f: string, glow: string): Look => ({ p, f, bg: "oklch(0.16 0.01 260)", fg: "oklch(0.97 0.005 90)", card: "oklch(0.22 0.012 260)", muted: "oklch(0.19 0.012 260)", mfg: "oklch(0.75 0.01 260)", border: "oklch(0.32 0.015 260)", glow });
const warm = (p: string, glow: string): Look => ({ p, f: "oklch(0.99 0.01 80)", bg: "oklch(0.97 0.02 75)", fg: "oklch(0.24 0.04 40)", card: "oklch(0.995 0.008 80)", muted: "oklch(0.93 0.035 70)", mfg: "oklch(0.45 0.04 45)", border: "oklch(0.88 0.03 70)", glow });
const luxe = (p: string, glow: string): Look => ({ p, f: "oklch(0.99 0 0)", bg: "oklch(0.975 0.008 250)", fg: "oklch(0.22 0.03 255)", card: "oklch(1 0 0)", muted: "oklch(0.95 0.012 250)", mfg: "oklch(0.48 0.025 255)", border: "oklch(0.9 0.01 250)", glow });
const LOOKS: Record<string, Look> = {
  food: warm("oklch(0.6 0.2 35)", "oklch(0.8 0.16 75)"),
  auto: dark("oklch(0.68 0.19 45)", "oklch(0.15 0 0)", "oklch(0.6 0.2 25)"),
  gym: dark("oklch(0.86 0.18 120)", "oklch(0.15 0 0)", "oklch(0.7 0.2 140)"),
  law: dark("oklch(0.8 0.12 85)", "oklch(0.18 0.02 260)", "oklch(0.55 0.08 260)"),
  health: luxe("oklch(0.55 0.13 215)", "oklch(0.8 0.1 190)"),
  beauty: luxe("oklch(0.58 0.18 355)", "oklch(0.82 0.1 20)"),
  pet: warm("oklch(0.58 0.15 150)", "oklch(0.82 0.15 95)"),
  services: luxe("oklch(0.5 0.12 195)", "oklch(0.75 0.12 165)"),
};
const DARK_WORDS = /barb|hamburg|burger|lava|jato|est[eé]tica auto|tatu|pub|bar\b|choper|oficina|mec[aâ]n/i;
export function demoThemeStyle(category: string): CSSProperties {
  const sector = demoSector(category);
  let l = LOOKS[sector] ?? (LOOKS["services"] as Look);
  if (DARK_WORDS.test(category) && sector !== "auto") l = dark(sector === "beauty" ? "oklch(0.78 0.14 75)" : l.p, "oklch(0.15 0 0)", sector === "beauty" ? "oklch(0.6 0.15 45)" : l.glow);
  return { "--primary": l.p, "--primary-foreground": l.f, "--ring": l.p, "--background": l.bg, "--foreground": l.fg, "--card": l.card, "--card-foreground": l.fg, "--muted": l.muted, "--muted-foreground": l.mfg, "--border": l.border, "--demo-glow": l.glow } as CSSProperties;
}
