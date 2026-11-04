import { describe, expect, it } from "vitest";
import { matchesAccount } from "@/lib/account-search";

const account = { email: "marcus@example.com", username: "mvthebest", display_name: "Márcus Barbosa" };

describe("private account search", () => {
  it("matches usernames with @", () => {
    expect(matchesAccount(account, "@MVTHEBEST")).toBe(true);
    expect(matchesAccount(account, "@outra")).toBe(false);
  });
  it("matches partial emails", () => {
    expect(matchesAccount(account, "EXAMPLE.COM")).toBe(true);
    expect(matchesAccount(account, "other@example.com")).toBe(false);
  });
  it("matches names regardless of accents", () => {
    expect(matchesAccount(account, "marcus barbosa")).toBe(true);
    expect(matchesAccount(account, "Vanessa")).toBe(false);
  });
  it("keeps all accounts for an empty search and handles missing fields", () => {
    expect(matchesAccount(account, "  ")).toBe(true);
    expect(matchesAccount({ email: null, username: null, display_name: null }, "marcus")).toBe(false);
  });
});