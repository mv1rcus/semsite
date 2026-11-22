import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { searchInputSchema, rankProspects, type Lead } from "./leads";
export type { Lead } from "./leads";
import { mapsErrorMessage } from "./search-errors";
import { matchesSearch } from "./business-niche";
import { searchOsmLeads } from "./osm-leads";

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
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => searchInputSchema.parse(d))
  .handler(async ({ data, context }) => {
    // Non-verified users get 5 new searches per day; extra pages of the same search are free.
    let searchesLeft = -1;
    if (!data.pageToken) {
      const { data: left, error } = await context.supabase.rpc("consume_search");
      if (error) throw new Error(error.message.includes("search_limit_reached") ? "Você usou suas 5 buscas de hoje. Assine o Verificado para buscar sem limite." : "Não foi possível conferir seu limite de buscas.");
      searchesLeft = Number(left);
    }
    // Fonte alternativa gratuita: OpenStreetMap (Overpass). Sem Google e sem Lovable.
    // O caminho do Google abaixo continua intacto e é o padrão.
    if (data.provider === "osm") {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      // Fonte principal: base local da Overture Maps (instantânea, cobertura ampla).
      // Cidade sem pacote importado cai no Overpass (caminho antigo, mais lento).
      const { searchOvertureLeads } = await import("./overture-leads");
      const overture = await searchOvertureLeads(data.category, data.city, supabaseAdmin);
      if (overture) {
        return { leads: rankProspects(overture.leads), scanned: overture.scanned, nextPageToken: null, searchesLeft };
      }
      let result;
      try {
        result = await searchOsmLeads(data.category, data.city, supabaseAdmin);
      } catch (e) {
        const message = e instanceof Error ? e.message : "";
        if (message.startsWith("Não encontrei essa cidade")) throw new Error(message);
        console.error(`Overpass failed: ${message}`);
        throw new Error("O OpenStreetMap está instável agora. Tente novamente em instantes ou use a busca do Google.");
      }
      return { leads: rankProspects(result.leads), scanned: result.scanned, nextPageToken: null, searchesLeft };
    }
    // Outside Lovable hosting (e.g. Vercel) the gateway credentials don't exist,
    // so a self-owned Google key (GOOGLE_PLACES_API_KEY) calls Google directly.
    const ownKey = process.env["GOOGLE_PLACES_API_KEY"];
    const lovableKey = process.env["LOVABLE_API_KEY"];
    const mapsKey = process.env["GOOGLE_MAPS_API_KEY"];
    if (!ownKey && (!lovableKey || !mapsKey)) throw new Error("O Google Maps não está configurado neste servidor. Adicione a variável GOOGLE_PLACES_API_KEY com sua chave do Google.");
    const url = ownKey ? "https://places.googleapis.com/v1/places:searchText" : `${GATEWAY_URL}/places/v1/places:searchText`;
    const authHeaders: Record<string, string> = ownKey
      ? { "X-Goog-Api-Key": ownKey }
      : { Authorization: `Bearer ${lovableKey}`, "X-Connection-Api-Key": mapsKey! };

    let res: Response;
    try {
      res = await fetch(url, {
        signal: AbortSignal.timeout(25000),
        method: "POST",
        headers: {
          ...authHeaders,
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
      .filter((p) => matchesSearch(p.displayName?.text ?? "", p.primaryTypeDisplayName?.text, data.category))
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
    return { leads: rankProspects(leads), scanned: places.length, nextPageToken: json.nextPageToken ?? null, searchesLeft };
  });
