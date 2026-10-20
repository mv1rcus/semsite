import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_maps";

export type Lead = {
  id: string;
  name: string;
  address: string;
  phone: string | null;
  intlPhone: string | null;
  rating: number | null;
  reviews: number | null;
  category: string | null;
  mapsUrl: string | null;
};

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
  .inputValidator((d) =>
    z
      .object({
        category: z.string().trim().min(2).max(80),
        city: z.string().trim().min(2).max(80),
        pageToken: z.string().max(1000).optional(),
      })
      .parse(d),
  )
  .handler(async ({ data }) => {
    const lovableKey = process.env["LOVABLE_API_KEY"];
    const mapsKey = process.env["GOOGLE_MAPS_API_KEY"];
    if (!lovableKey || !mapsKey) throw new Error("Google Maps não está configurado.");

    const res = await fetch(`${GATEWAY_URL}/places/v1/places:searchText`, {
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
    if (!res.ok) {
      const body = await res.text();
      console.error(`Places failed [${res.status}]: ${body}`);
      throw new Error(`Erro na busca (${res.status}): ${body.slice(0, 200)}`);
    }
    const json = (await res.json()) as { places?: Place[]; nextPageToken?: string };
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
    return { leads, scanned: places.length, nextPageToken: json.nextPageToken ?? null };
  });
