import beauty from "@/assets/demo-beauty.jpg";
import health from "@/assets/demo-health.jpg";
import food from "@/assets/demo-food.jpg";
import services from "@/assets/demo-services.jpg";
import gym from "@/assets/demo-gym.jpg";
import law from "@/assets/demo-law.jpg";
import pet from "@/assets/demo-pet.jpg";
import auto from "@/assets/demo-auto.jpg";
import dentist from "@/assets/demo-dentist.jpg";
import pilates from "@/assets/demo-pilates.jpg";
import manicure from "@/assets/demo-manicure.jpg";
import electrician from "@/assets/demo-electrician.jpg";
import carpenter from "@/assets/demo-carpenter.jpg";
import accounting from "@/assets/demo-accounting.jpg";
import realestate from "@/assets/demo-realestate.jpg";
import bakery from "@/assets/demo-bakery.jpg";
import carwash from "@/assets/demo-carwash.jpg";
import psychology from "@/assets/demo-psychology.jpg";
import pharmacy from "@/assets/demo-pharmacy.jpg";
import physio from "@/assets/demo-physio.jpg";
import plumber from "@/assets/demo-plumber.jpg";
import repair from "@/assets/demo-repair.jpg";
import tailor from "@/assets/demo-tailor.jpg";
import coffee from "@/assets/demo-coffee.jpg";
import icecream from "@/assets/demo-icecream.jpg";
import lab from "@/assets/demo-lab.jpg";
import nutrition from "@/assets/demo-nutrition.jpg";
import tattoo from "@/assets/demo-tattoo.jpg";
import glass from "@/assets/demo-glass.jpg";
import metal from "@/assets/demo-metal.jpg";
import construction from "@/assets/demo-construction.jpg";
import print from "@/assets/demo-print.jpg";
import dogtraining from "@/assets/demo-dogtraining.jpg";
import barber from "@/assets/demo-barber.jpg";
import pizzeria from "@/assets/demo-pizzeria.jpg";
import burgerShop from "@/assets/demo-burger.jpg";
import tires from "@/assets/demo-tires.jpg";
import { demoSector } from "./demonstrations";

const covers = { beauty, health, food, services, gym, law, pet, auto };
const specificPhotos: [RegExp, string][] = [
  [/barb/, barber],
  [/pizz/, pizzeria],
  [/hamb|burger|lanch/, burgerShop],
  [/borrach|pneu/, tires],
  [/dent|odonto/, dentist],
  [/pilates/, pilates],
  [/manicure|unha|sobrancelha/, manicure],
  [/auto eletr/, auto],
  [/eletric/, electrician],
  [/marcen|carpint/, carpenter],
  [/contab/, accounting],
  [/imob|corretor/, realestate],
  [/padar|panific/, bakery],
  [/lava jato|lavagem|lavacar/, carwash],
  [/psic/, psychology],
  [/farmac|drogaria/, pharmacy],
  [/fisioter|reabilita/, physio],
  [/encan|hidraulic/, plumber],
  [/assistencia tecnica|conserto|eletron/, repair],
  [/costur|alfaiat/, tailor],
  [/cafeter|cafe/, coffee],
  [/sorvet|acai/, icecream],
  [/laborat/, lab],
  [/nutric/, nutrition],
  [/tatu|tattoo/, tattoo],
  [/vidrac|vidro/, glass],
  [/serralh/, metal],
  [/material.*constr|materiais.*constr/, construction],
  [/grafica|impress|copiador|xerox/, print],
  [/advoca|juridic/, law],
  [/academ|crossfit/, gym],
  [/pet|veterin/, pet],
  [/marmit|espetinh|restaur|buffet/, food],
  [/oficina|mecanic|funilar|moto/, auto],
  [/confeit|doce|bolo/, bakery],
  [/climatiz|gesso|pintor/, construction],
  [/otica/, health],
  [/adestra/, dogtraining],
];

/** Visual overrides only: existing catalog, draft and saved records stay unchanged. */
export function demonstrationPhoto(category: string): string {
  const normalized = category.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  return specificPhotos.find(([pattern]) => pattern.test(normalized))?.[1] ?? covers[demoSector(category)];
}