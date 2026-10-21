import { describe, expect, it } from "vitest";
import { clientSearchError, mapsErrorMessage } from "@/lib/search-errors";

describe("search errors", () => {
  it("explains a blocked Places API key", () => {
    expect(mapsErrorMessage(403, '{"reason":"API_KEY_SERVICE_BLOCKED"}', false)).toContain("Places API");
  });
  it("explains the daily limit", () => {
    expect(mapsErrorMessage(429, "", false)).toContain("Limite diário");
  });
  it("treats a 400 with page token as expired search", () => {
    expect(mapsErrorMessage(400, "", true)).toContain("expirou");
  });
  it("hides raw validation output and explains network loss", () => {
    expect(clientSearchError(new Error('[{"code":"too_big"}]'))).toContain("Confira a cidade");
    expect(clientSearchError(new TypeError("Failed to fetch"))).toContain("Sem conexão");
  });
});
