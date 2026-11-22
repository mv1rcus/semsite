#!/usr/bin/env python3
"""Gera um "pacote de cidade" da Overture Maps para o SemSite.

Uso:  python3 scripts/overture-extract.py '<sul>,<oeste>,<norte>,<leste>' <saida.json>
O bbox pode ser copiado do Nominatim (boundingbox da cidade).
Só entram lugares COM telefone (o pitch do SemSite é por WhatsApp).
Dados: Overture Maps, CDL-Permissive-2.0 (atribuição: Overture Maps Foundation).
"""
import json, sys
import duckdb

RELEASE = "2026-11-18.0"  # https://docs.overturemaps.org/release/latest/

def main() -> None:
    south, west, north, east = (float(x) for x in sys.argv[1].split(","))
    out = sys.argv[2]
    con = duckdb.connect()
    con.execute("INSTALL httpfs; LOAD httpfs;")
    con.execute("SET s3_region='us-west-2';")
    src = f"read_parquet('s3://overturemaps-us-west-2/release/{RELEASE}/theme=places/type=place/*', filename=true, hive_partitioning=1)"
    rows = con.execute(f"""
      SELECT names['primary'] AS name, basic_category AS cat, taxonomy['primary'] AS sub,
             phones[1] AS phone, websites[1] AS site,
             (SELECT s FROM unnest(socials) AS t(s) WHERE s ILIKE '%instagram.com%' LIMIT 1) AS instagram,
             (SELECT s FROM unnest(socials) AS t(s) WHERE s ILIKE '%facebook.com%' LIMIT 1) AS facebook,
             trim(concat_ws(' - ', addresses[1].freeform, addresses[1].locality)) AS addr
      FROM {src}
      WHERE bbox.xmin > {west} AND bbox.xmax < {east} AND bbox.ymin > {south} AND bbox.ymax < {north}
        AND phones IS NOT NULL AND names['primary'] IS NOT NULL
    """).fetchall()
    seen = set()
    places = []
    social_hosts = ("instagram.com", "facebook.com", "fb.com", "wa.me", "whatsapp.com",
                    "linktr.ee", "tiktok.com", "youtube.com", "beacons.ai")
    for name, cat, sub, phone, site, insta, face, addr in rows:
        key = (name.strip().lower(), phone)
        if key in seen:
            continue
        seen.add(key)
        # Rede social/link bio não é site próprio: o pitch do SemSite é para esses.
        if site and any(h in site for h in social_hosts):
            if "instagram.com" in site and not insta:
                insta = site
            if "facebook.com" in site and not face:
                face = site
            site = None
        places.append({"n": name, "cat": cat, "sub": sub, "p": phone, "w": site,
                       "ig": insta, "fb": face, "a": addr or ""})
    json.dump(places, open(out, "w"), ensure_ascii=False, separators=(",", ":"))
    print(f"{len(places)} lugares -> {out}")

if __name__ == "__main__":
    main()
