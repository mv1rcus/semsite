// Cifra (gzip + AES-256-GCM) os htmls standalone para a branch `assets`. A chave vem de MODEL_BLOB_KEY_FILE (arquivo) ou MODEL_BLOB_KEY.
// Formato do blob: iv(12) | ciphertext+tag. Chave AES = SHA-256 da senha (UTF-8).
import fs from "node:fs";
import zlib from "node:zlib";
import crypto from "node:crypto";
const secret = (process.env.MODEL_BLOB_KEY_FILE ? fs.readFileSync(process.env.MODEL_BLOB_KEY_FILE, "utf8") : process.env.MODEL_BLOB_KEY || "").trim();
if (secret.length < 32) throw new Error("MODEL_BLOB_KEY ausente");
const key = crypto.createHash("sha256").update(secret, "utf8").digest();
export function encryptHtml(html) {
  const iv = crypto.randomBytes(12);
  const c = crypto.createCipheriv("aes-256-gcm", key, iv);
  const enc = Buffer.concat([c.update(zlib.gzipSync(Buffer.from(html, "utf8"), { level: 9 })), c.final(), c.getAuthTag()]);
  return Buffer.concat([iv, enc]);
}
const [src, out] = [process.argv[2] || "src/lib/standalone-html", process.argv[3] || "/tmp/assets-out"];
fs.mkdirSync(out, { recursive: true });
for (const f of fs.readdirSync(src).filter((f) => f.endsWith(".html"))) {
  fs.writeFileSync(`${out}/${f.replace(/\.html$/, "")}.bin`, encryptHtml(fs.readFileSync(`${src}/${f}`, "utf8")));
}
console.log("ok", fs.readdirSync(out).length);
