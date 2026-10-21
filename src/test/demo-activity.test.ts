import { describe, expect, it } from "vitest";
import { isInactiveDemo } from "@/lib/demo-verification";

const now = Date.parse("2026-10-21T12:00:00Z");
describe("demo inactivity", () => {
  it("removes a demo nobody opened for 24h", () => {
    expect(isInactiveDemo({ id: "a", createdAt: "2026-10-19T12:00:00Z", lastOpenedAt: "2026-10-20T11:59:00Z" }, now)).toBe(true);
  });
  it("keeps a demo opened within 24h", () => {
    expect(isInactiveDemo({ id: "a", createdAt: "2026-10-01T00:00:00Z", lastOpenedAt: "2026-10-21T01:00:00Z" }, now)).toBe(false);
  });
  it("gives a never-opened demo 24h from creation", () => {
    expect(isInactiveDemo({ id: "a", createdAt: "2026-10-21T00:00:00Z", lastOpenedAt: null }, now)).toBe(false);
    expect(isInactiveDemo({ id: "a", createdAt: "2026-10-20T11:00:00Z", lastOpenedAt: null }, now)).toBe(true);
  });
});
