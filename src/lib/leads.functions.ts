import { createServerFn } from "@tanstack/react-start";
import { searchInputSchema, rankProspects, type Lead } from "./leads";
export type { Lead } from "./leads";
import { mapsErrorMessage } from "./search-errors";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_maps";

type Place = {
  id: string;
  displayName?: { text: string };
  formattedAddress?: string;
  nationalPhoneNumber?: string;
  internationalPhoneNumber?: string;
  websiteUri?: string;
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  primaryTypeDisplayName?: { text: string };
  businessStatus?: string;
};

export const searchLeads = createServerFn({ method: "POST" })
  .inputValidator((d) => searchInputSchema.parse(d))
  .handler(async ({ data }) => {
    const lovableKey = process.env["LOVABLE_API_KEY"];
    const mapsKey = process.env["GOOGLE_MAPS_API_KEY"];
    if (!lovableKey || !mapsKey) throw new Error("Google Maps não está configurado.");

    let res: Response;
    try {
      res = await fetch(`${GATEWAY_URL}/places/v1/places:searchText`, {
        signal: AbortSignal.timeout(25000),
        method: "POST",
        headers: {
          Authorization: `Bearer ${lovableKey}`,
          "X-Connection-Api-Key": mapsKey,
          "Content-Type": "application/json",
          "X-Goog-FieldMask":
            "places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.internationalPhoneNumber,places.websiteUri,places.rating,places.userRatingCount,places.googleMapsUri,places.primaryTypeDisplayName,places.businessStatus,nextPageToken",
        },
        body: JSON.stringify({
          textQuery: `${data.category} em ${data.city}`,
          languageCode: "pt-BR",
          regionCode: "BR",
          pageSize: 20,
          ...(data.pageToken ? { pageToken: data.pageToken } : {}),
        }),
      });
    } catch (e) {
      const timeout = e instanceof Error && (e.name === "TimeoutError" || e.name === "AbortError");
      throw new Error(timeout ? "O Google Maps demorou demais para responder. Tente novamente." : "Não foi possível conectar ao Google Maps. Tente novamente em instantes.");
    }
    if (!res.ok) {
      const body = await res.text();
      console.error(`Places failed [${res.status}]: ${body}`);
      throw new Error(mapsErrorMessage(res.status, body, Boolean(data.pageToken)));
    }
    let json: { places?: Place[]; nextPageToken?: string };
    try { json = await res.json(); } catch { throw new Error("O Google Maps enviou uma resposta inválida. Tente novamente."); }
    const places = json.places ?? [];
    const leads: Lead[] = places
      .filter((p) => !p.websiteUri && p.businessStatus !== "CLOSED_PERMANENTLY")
      .map((p) => ({
        id: p.id,
        name: p.displayName?.text ?? "Sem nome",
        address: p.formattedAddress ?? "",
        phone: p.nationalPhoneNumber ?? null,
        intlPhone: p.internationalPhoneNumber ?? null,
        rating: p.rating ?? null,
        reviews: p.userRatingCount ?? null,
        category: p.primaryTypeDisplayName?.text ?? null,
        mapsUrl: p.googleMapsUri ?? null,
      }));
    return { leads: rankProspects(leads), scanned: places.length, nextPageToken: json.nextPageToken ?? null };
  });
