import { describe, expect, it } from "vitest";
import { demonstrationPhoto } from "@/lib/demo-photos";
import { demoCatalog } from "@/lib/demo-catalog";
import driving from "@/assets/demo-driving.jpg";
import photographer from "@/assets/demo-photographer.jpg";
import florist from "@/assets/demo-florist.jpg";
import waxing from "@/assets/demo-waxing.jpg";
import drywall from "@/assets/demo-drywall.jpg";
import languageSchool from "@/assets/demo-language-school.jpg";
import courses from "@/assets/demo-courses.jpg";
import auto from "@/assets/demo-auto.jpg";
import services from "@/assets/demo-services.jpg";

describe("demonstrationPhoto", () => {
  it("dá foto de auto escola, não de oficina", () => {
    expect(demonstrationPhoto("Auto escola")).toBe(driving);
    expect(demonstrationPhoto("Auto escola")).not.toBe(auto);
  });
  it("dá foto própria para fotógrafo, floricultura, depilação, gesseiro e escolas", () => {
    expect(demonstrationPhoto("Fotógrafo")).toBe(photographer);
    expect(demonstrationPhoto("Floricultura")).toBe(florist);
    expect(demonstrationPhoto("Depilação")).toBe(waxing);
    expect(demonstrationPhoto("Gesseiro")).toBe(drywall);
    expect(demonstrationPhoto("Escola de idiomas")).toBe(languageSchool);
    expect(demonstrationPhoto("Escola e cursos")).toBe(courses);
  });
  it("não troca ramo de escola de idiomas pela foto de escola comum", () => {
    expect(demonstrationPhoto("Escola de idiomas")).not.toBe(courses);
  });
  it("mantém as fotos que já estavam certas", () => {
    expect(demonstrationPhoto("Lava jato")).toBe(demonstrationPhoto("Lava jato"));
    expect(demonstrationPhoto("Lava jato")).not.toBe(services);
    expect(demonstrationPhoto("Barbearia")).not.toBe(services);
  });
});

describe("demoCatalog", () => {
  it("dá catálogo de gesseiro em vez do catálogo genérico", () => {
    expect(demoCatalog("Gesseiro", "services").items[0]?.title).toBe("Forro de gesso");
  });
});
