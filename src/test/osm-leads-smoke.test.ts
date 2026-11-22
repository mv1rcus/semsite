import { describe, it, expect } from "vitest";
import { buildOverpassQueries } from "../lib/osm-leads";

const b = { south: -22, west: -43.7, north: -21.5, east: -43.1 };

describe("buildOverpassQueries", () => {
  it("categoria mapeada: principal só com tags, fallback por nome separado", () => {
    const { primary, fallback } = buildOverpassQueries("barbearia", b);
    expect(primary).toContain('nw["shop"~"^(barber|hairdresser)$"]');
    expect(primary).not.toContain('"name"~');
    expect(fallback).toContain('nw["name"~"barbearia",i]["shop"]');
    expect(fallback).toContain('nw["name"~"barbearia",i]["amenity"]');
  });
  it("categoria não mapeada: nome vira a consulta principal, sem fallback", () => {
    const { primary, fallback } = buildOverpassQueries("loja de queijos", b);
    expect(primary).toContain('"name"~"loja de queijos"');
    expect(fallback).toBeNull();
  });
});
