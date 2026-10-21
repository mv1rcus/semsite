import { describe, expect, it } from "vitest";
import { removeSavedDemos } from "../lib/demo-verification";

describe("local demonstration history removal", () => {
  const links = [{ id: "old", name: "Academia antiga" }, { id: "other", name: "Clínica" }, { id: "recent", name: "Restaurante" }];
  it("removes only individually selected links", () => {
    expect(removeSavedDemos(links, ["old"])).toEqual([links[1], links[2]]);
    expect(links).toHaveLength(3);
  });
  it("removes a selected batch while retaining unselected links", () => {
    expect(removeSavedDemos(links, ["old", "recent"])).toEqual([links[1]]);
  });
  it("keeps history unchanged when nothing is confirmed", () => {
    expect(removeSavedDemos(links, [])).toEqual(links);
  });
});