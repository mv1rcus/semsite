/** Pix estático (BR Code / EMV) gerado no navegador com a chave do próprio vendedor. Sem gateway, sem custo. */
export type PixKeyType = "cpf" | "cnpj" | "phone" | "email" | "random";
export const PIX_KEY_TYPES: { value: PixKeyType; label: string; hint: string }[] = [
  { value: "cpf", label: "CPF", hint: "000.000.000-00" },
  { value: "cnpj", label: "CNPJ", hint: "00.000.000/0000-00" },
  { value: "phone", label: "Celular", hint: "(32) 90000-0000" },
  { value: "email", label: "E-mail", hint: "voce@email.com" },
  { value: "random", label: "Chave aleatória", hint: "123e4567-e89b-12d3-a456-426614174000" },
];

export type PixInput = { keyType: PixKeyType; key: string; name: string; city: string; amount?: number | null };

function digits(v: string) { return v.replace(/\D/g, ""); }

function cpfValid(cpf: string) {
  if (!/^\d{11}$/.test(cpf) || /^(\d)\1{10}$/.test(cpf)) return false;
  for (const n of [9, 10]) {
    let sum = 0;
    for (let i = 0; i < n; i++) sum += Number(cpf[i]) * (n + 1 - i);
    if (((sum * 10) % 11) % 10 !== Number(cpf[n])) return false;
  }
  return true;
}
function cnpjValid(cnpj: string) {
  if (!/^\d{14}$/.test(cnpj) || /^(\d)\1{13}$/.test(cnpj)) return false;
  for (const n of [12, 13]) {
    let sum = 0, weight = n - 7;
    for (let i = 0; i < n; i++) { sum += Number(cnpj[i]) * weight; weight = weight === 2 ? 9 : weight - 1; }
    const check = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (check !== Number(cnpj[n])) return false;
  }
  return true;
}

/** Devolve a chave no formato exigido pelo Pix, ou null se for inválida para o tipo escolhido. */
export function normalizePixKey(type: PixKeyType, raw: string): string | null {
  const value = raw.trim();
  if (type === "cpf") { const d = digits(value); return cpfValid(d) ? d : null; }
  if (type === "cnpj") { const d = digits(value); return cnpjValid(d) ? d : null; }
  if (type === "phone") {
    const d = digits(value);
    const national = d.startsWith("55") && d.length >= 12 ? d.slice(2) : d;
    return /^[1-9]{2}9?\d{8}$/.test(national) && (national.length === 10 || national[2] === "9") ? `+55${national}` : null;
  }
  if (type === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 77 ? value.toLowerCase() : null;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value) ? value.toLowerCase() : null;
}

/** Nome e cidade do recebedor: sem acentos, maiúsculas, só caracteres aceitos pelos bancos. */
export function pixText(value: string, max: number) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().replace(/[^A-Z0-9 ]/g, " ").replace(/\s+/g, " ").trim().slice(0, max).trim();
}

function field(id: string, value: string) { return `${id}${String(value.length).padStart(2, "0")}${value}`; }

/** CRC16-CCITT (poly 0x1021, init 0xFFFF), exigido no fim do BR Code. */
export function crc16(text: string) {
  let crc = 0xffff;
  for (let i = 0; i < text.length; i++) {
    crc ^= text.charCodeAt(i) << 8;
    for (let b = 0; b < 8; b++) crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

export type PixResult = { ok: true; payload: string } | { ok: false; error: string };

/** Monta o "copia e cola". Sem valor, o pagador digita quanto quer pagar. */
export function buildPixPayload(input: PixInput): PixResult {
  const key = normalizePixKey(input.keyType, input.key);
  if (!key) return { ok: false, error: "A chave Pix não confere com o tipo escolhido." };
  const name = pixText(input.name, 25);
  const city = pixText(input.city, 15);
  if (!name) return { ok: false, error: "Informe o nome do recebedor." };
  if (!city) return { ok: false, error: "Informe a cidade do recebedor." };
  let amount = "";
  if (input.amount !== null && input.amount !== undefined) {
    if (!Number.isFinite(input.amount) || input.amount <= 0 || input.amount > 999999.99) return { ok: false, error: "Valor inválido." };
    amount = input.amount.toFixed(2);
  }
  const body = field("00", "01") + field("01", "11")
    + field("26", field("00", "br.gov.bcb.pix") + field("01", key))
    + field("52", "0000") + field("53", "986") + (amount ? field("54", amount) : "")
    + field("58", "BR") + field("59", name) + field("60", city)
    + field("62", field("05", "***")) + "6304";
  return { ok: true, payload: body + crc16(body) };
}

export function parseAmount(text: string): number | null | "invalid" {
  const t = text.trim();
  if (!t) return null;
  const n = Number(t.replace(/\./g, "").replace(",", "."));
  return Number.isFinite(n) && n > 0 ? Math.round(n * 100) / 100 : "invalid";
}

export const PIX_SELLER_KEY = "semsite-pix-seller-v1";
