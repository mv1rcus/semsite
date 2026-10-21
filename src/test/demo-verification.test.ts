import { describe, expect, it } from "vitest";
import { demonstrationPageIsAvailable, savedDemoSchema, verificationState } from "@/lib/demo-verification";

describe("Demonstration link verification", () => {
  const now = Date.parse("2026-10-21T12:00:00Z");
  it("keeps existing history without marking it verified", () => {
    const saved = savedDemoSchema.parse({ id: "existing", name: "Cliente" });
    expect(verificationState(saved.verification, now)).toBe("unchecked");
  });
  it("expires successful checks after 24 hours", () => {
    expect(verificationState({ status: "ok", checkedAt: "2026-10-20T12:00:01Z" }, now)).toBe("recent");
    expect(verificationState({ status: "ok", checkedAt: "2026-10-20T12:00:00Z" }, now)).toBe("stale");
  });
  it("does not present failures as successful recent checks", () => {
    expect(verificationState({ status: "failed", checkedAt: "2026-10-21T11:59:00Z" }, now)).toBe("failed");
  });
  it("requires the actual demonstration page, not just a successful response", () => {
    expect(demonstrationPageIsAvailable(200, '<div class="demo-site"><h1>Cliente</h1></div>')).toBe(true);
    expect(demonstrationPageIsAvailable(200, '<h1>This page did not load</h1>')).toBe(false);
    expect(demonstrationPageIsAvailable(404, '<div class="demo-site"><h1>Cliente</h1></div>')).toBe(false);
  });
});