export const GOAL_KEY = "monthly-sales-goal-v1";
export const MAX_GOAL = 999;

export function parseGoal(raw: string | number | null): number {
  const value = typeof raw === "number" ? raw : Number(raw);
  return Number.isInteger(value) && value > 0 && value <= MAX_GOAL ? value : 0;
}

export function goalProgress(goal: number, closed: number) {
  const safeGoal = parseGoal(goal);
  if (!safeGoal) return { percent: 0, remaining: 0, reached: false };
  const percent = Math.min(100, Math.floor((closed / safeGoal) * 100));
  return { percent, remaining: Math.max(0, safeGoal - closed), reached: closed >= safeGoal };
}
