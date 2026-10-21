import { describe, expect, it } from "vitest";
import { goalProgress, parseGoal } from "@/lib/sales-goal";
describe("Monthly sales goal", () => {
  it("accepts whole goals between 1 and 999", () => {
    expect(parseGoal("5")).toBe(5);
    expect(parseGoal(12)).toBe(12);
    expect(parseGoal("0")).toBe(0);
    expect(parseGoal("-2")).toBe(0);
    expect(parseGoal("1000")).toBe(0);
    expect(parseGoal("2.5")).toBe(0);
    expect(parseGoal("abc")).toBe(0);
    expect(parseGoal(null)).toBe(0);
  });
  it("tracks progress toward the goal", () => {
    expect(goalProgress(4, 1)).toEqual({ percent: 25, remaining: 3, reached: false });
    expect(goalProgress(1, 1)).toEqual({ percent: 100, remaining: 0, reached: true });
    expect(goalProgress(2, 5)).toEqual({ percent: 100, remaining: 0, reached: true });
  });
  it("stays neutral without a goal", () => {
    expect(goalProgress(0, 5)).toEqual({ percent: 0, remaining: 0, reached: false });
  });
});
