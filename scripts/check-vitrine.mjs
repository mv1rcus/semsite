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
const loaders = read("src/lib/vitrine.functions.ts");

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

  const inLoaders = count(loaders, `"${id}":`);
  if (inLoaders !== 1) bad(`vitrine.functions.ts: loader "${id}" aparece ${inLoaders}x (esperado 1)`);

  const html = `src/lib/standalone-html/${id}.html`;
  if (!fs.existsSync(html)) bad(`${html} não existe (rode node scripts/build-standalone.mjs)`);
  else if (fs.statSync(html).size < 20000) bad(`${html} tem só ${fs.statSync(html).size} bytes — placeholder não substituído?`);

  const cover = `public/cover-locked-${id}.jpg`;
  if (!fs.existsSync(cover)) bad(`${cover} não existe`);
}

// 4. HTMLs e loaders órfãos (entrada sem modelo live)
const orphanLoaders = [...loaders.matchAll(/"([a-z0-9-]+)": \(\) => import\("\.\/standalone-html\//g)]
  .map((m) => m[1]).filter((id) => !ids.includes(id));
if (orphanLoaders.length) bad(`loaders órfãos (não estão em LIVE_PREMIUM): ${orphanLoaders.join(", ")}`);

if (fail.length) {
  console.error(`\n${fail.length} problema(s) de fiação. NÃO publique até resolver.`);
  process.exit(1);
}
console.log(`${ids.length}/${ids.length} modelos íntegros. Pode publicar.`);
