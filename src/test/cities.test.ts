import { describe, expect, it } from "vitest";
import { CITIES, nextSuggestedCity } from "@/lib/cities";

describe("cities", () => {
  it("has unique cities to swipe through", () => {
    expect(new Set(CITIES).size).toBe(CITIES.length);
    expect(CITIES.length).toBeGreaterThanOrEqual(20);
  });

  it("rotates the suggested city each time the search page opens", () => {
    const first = nextSuggestedCity(null);
    expect(CITIES).toContain(first);
    expect(nextSuggestedCity(first)).toBe(CITIES[(CITIES.indexOf(first) + 1) % CITIES.length]);
  });
});
