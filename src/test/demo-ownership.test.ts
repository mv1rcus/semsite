import { describe, expect, it } from "vitest";
import { canManageDemonstration, filterOwnedDemonstrations } from "@/lib/demo-ownership";

describe("demonstration ownership", () => {
  it("lets the creator manage their own demo", () => {
    expect(canManageDemonstration("user-a", "user-a")).toBe(true);
  });

  it("blocks any other verified account", () => {
    expect(canManageDemonstration("user-a", "user-b")).toBe(false);
  });

  it("keeps legacy demos without an owner frozen for everyone", () => {
    expect(canManageDemonstration(null, "user-a")).toBe(false);
    expect(canManageDemonstration(undefined, "user-a")).toBe(false);
  });

  it("blocks anonymous callers even on owned demos", () => {
    expect(canManageDemonstration("user-a", null)).toBe(false);
    expect(canManageDemonstration("user-a", undefined)).toBe(false);
  });

  it("filters activity rows down to the caller's own demos", () => {
    const rows = [
      { id: "1", owner_id: "user-a" },
      { id: "2", owner_id: "user-b" },
      { id: "3", owner_id: null },
    ];
    expect(filterOwnedDemonstrations(rows, "user-a").map((r) => r.id)).toEqual(["1"]);
    expect(filterOwnedDemonstrations(rows, "user-b").map((r) => r.id)).toEqual(["2"]);
    expect(filterOwnedDemonstrations(rows, "user-c")).toEqual([]);
  });
});
