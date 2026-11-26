// Integridade da vitrine: cada modelo live deve aparecer exatamente UMA vez em cada ponto
// da fiação e ter seus arquivos gerados. Rode depois de cada rebase, ANTES de publicar:
//   node scripts/check-vitrine.mjs
import fs from "node:fs";

const fail = [];
const ok = (m) => console.log("  ok", m);
const bad = (m) => { fail.push(m); console.log("  FALHA", m); };

const read = (p) => fs.readFileSync(p, "utf8");
const count = (hay, needle) => hay.split(needle).length - 1;

// 1. IDs live
const pm = read("src/lib/premium-models.ts");
const liveBlock = pm.match(/LIVE_PREMIUM = \[(.*?)\]/s);
if (!liveBlock) { bad("LIVE_PREMIUM não encontrado em premium-models.ts"); process.exit(1); }
const ids = [...liveBlock[1].matchAll(/"([a-z0-9-]+)"/g)].map((m) => m[1]);
console.log(`Checando ${ids.length} modelos live`);
if (new Set(ids).size !== ids.length) bad("ID duplicado dentro de LIVE_PREMIUM");

const route = read("src/routes/vitrine.$id.tsx");
const build = read("scripts/build-standalone.mjs");

// 2. uma declaração MODELS só (o duplicado de const quebrou o build uma vez)
const modelsDecls = count(build, "const MODELS");
if (modelsDecls !== 1) bad(`build-standalone.mjs tem ${modelsDecls} declarações "const MODELS" (esperado 1)`);

// 3. entrada ALL_PREMIUM (card da vitrine)
for (const id of ids) {
  const card = count(pm, `{ id: "${id}"`);
  if (card !== 1) bad(`premium-models.ts: card { id: "${id}" aparece ${card}x (esperado 1)`);

  const chain = count(route, `premium?.id === "${id}"`);
  if (chain !== 1) bad(`vitrine.$id.tsx: cadeia premium?.id === "${id}" aparece ${chain}x (esperado 1)`);

  const inModels = count(build, `"${id}":`);
  if (inModels !== 1) bad(`build-standalone.mjs: MODELS["${id}"] aparece ${inModels}x (esperado 1)`);

  // o html do modelo vive cifrado na branch `assets` (fora do worker)
  const blobUrl = `https://raw.githubusercontent.com/mv1rcus/semsite/assets/${id}.bin`;
  try {
    const r = await fetch(blobUrl, { method: "HEAD" });
    const len = Number(r.headers.get("content-length") || 0);
    if (!r.ok) bad(`${blobUrl} responde ${r.status} (rode node scripts/build-standalone.mjs, pack-assets e push-assets)`);
    else if (len < 5000) bad(`${blobUrl} tem só ${len} bytes`);
  } catch (e) { bad(`${blobUrl}: falha de rede (${e.message})`); }

  const cover = `public/cover-locked-${id}.jpg`;
  if (!fs.existsSync(cover)) bad(`${cover} não existe`);
}

// 4. nenhum .html pode voltar para src/lib/standalone-html (estoura o limite do worker)
const strayHtml = fs.existsSync("src/lib/standalone-html") ? fs.readdirSync("src/lib/standalone-html").filter((f) => f.endsWith(".html")) : [];
if (strayHtml.length) bad(`src/lib/standalone-html não pode ter .html (limite do worker): ${strayHtml.join(", ")}. O build-standalone grava em standalone/html e o push-assets sobe cifrado.`);

if (fail.length) {
  console.error(`\n${fail.length} problema(s) de fiação. NÃO publique até resolver.`);
  process.exit(1);
}
console.log(`${ids.length}/${ids.length} modelos íntegros. Pode publicar.`);
