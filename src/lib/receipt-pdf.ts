export type ReceiptData = {
  client: string; doc: string; phone: string; business: string;
  total: number; mode: "vista" | "metade"; pix: string; seller: string;
};

export const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

/** Valores de pagamento: à vista = 100% agora; 50/50 = metade de entrada e metade na entrega. */
export function paymentSplit(total: number, mode: ReceiptData["mode"]) {
  if (mode === "vista") return { now: total, later: 0 };
  const now = Math.round(total * 50) / 100;
  return { now, later: Math.round((total - now) * 100) / 100 };
}

export async function downloadReceiptPdf(d: ReceiptData) {
  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({ unit: "mm", format: "a4" });
  const W = 210, M = 18;
  let y = 0;
  const crimson: [number, number, number] = [225, 29, 72];
  const ink: [number, number, number] = [31, 41, 55];

  pdf.setFillColor(...crimson); pdf.rect(0, 0, W, 30, "F");
  pdf.setTextColor(255, 255, 255); pdf.setFont("helvetica", "bold"); pdf.setFontSize(18);
  pdf.text("RECIBO & ORDEM DE SERVIÇO", M, 15);
  pdf.setFont("helvetica", "normal"); pdf.setFontSize(10);
  pdf.text(`SemSite Desenvolvimento  •  Emitido em ${new Date().toLocaleDateString("pt-BR")}`, M, 23);
  y = 42;

  const section = (t: string) => {
    pdf.setTextColor(...crimson); pdf.setFont("helvetica", "bold"); pdf.setFontSize(12);
    pdf.text(t, M, y); y += 2; pdf.setDrawColor(...crimson); pdf.line(M, y, W - M, y); y += 6;
    pdf.setTextColor(...ink); pdf.setFont("helvetica", "normal"); pdf.setFontSize(10);
  };
  const line = (t: string, bold = false) => {
    pdf.setFont("helvetica", bold ? "bold" : "normal");
    const parts = pdf.splitTextToSize(t, W - 2 * M);
    pdf.text(parts, M, y); y += parts.length * 5 + 1;
  };

  section("1. Dados do cliente");
  line(`Cliente: ${d.client || "-"}`);
  if (d.doc) line(`CPF/CNPJ: ${d.doc}`);
  if (d.phone) line(`Telefone: ${d.phone}`);
  line(`Empresa: ${d.business || "-"}`);
  y += 3;

  section("2. Serviço contratado");
  ["Site profissional adaptado para celular e computador", "Botão direto para o WhatsApp", "Localização no Google Maps", "Catálogo de produtos/serviços", "Até 2 rodadas de ajustes"].forEach(i => line(`•  ${i}`));
  y += 1;
  pdf.setFillColor(253, 230, 138); pdf.roundedRect(M, y - 4, W - 2 * M, 17, 2, 2, "F");
  line("Bônus incluso: 1º ano de domínio oficial (.com.br) grátis", true);
  line("O registro do endereço no primeiro ano é por nossa conta (já incluso no valor). A partir do 2º ano, a renovação (~R$ 40/ano) fica com o cliente.");
  y += 4;

  section("3. Condições financeiras");
  const s = paymentSplit(d.total, d.mode);
  line(`Valor total: ${brl(d.total)}`, true);
  if (d.mode === "vista") line(`Forma: à vista (100% no Pix) — pago: ${brl(s.now)}`);
  else { line(`Entrada (50%): ${brl(s.now)} — paga na contratação`); line(`Restante (50%): ${brl(s.later)} — na entrega do site`); }
  if (d.pix) line(`Chave Pix: ${d.pix}`);
  line("Prazo de entrega: até 7 dias úteis após a confirmação do pagamento.");
  y += 3;

  section("4. Termos gerais");
  ["O prazo começa a contar após o envio de fotos, textos e informações pelo cliente.", "Ajustes além das 2 rodadas inclusas serão orçados à parte.", "Valores pagos não são reembolsáveis após o início do desenvolvimento."].forEach((t, i) => line(`${i + 1}. ${t}`));

  // Carimbo
  y += 6;
  const stamp = d.mode === "vista" ? "QUITADO VIA PIX" : "ENTRADA CONFIRMADA";
  pdf.setDrawColor(22, 163, 74); pdf.setTextColor(22, 163, 74); pdf.setLineWidth(0.8);
  pdf.roundedRect(W - M - 70, y, 70, 14, 2, 2); pdf.setFont("helvetica", "bold"); pdf.setFontSize(13);
  pdf.text(stamp, W - M - 35, y + 9, { align: "center" });
  pdf.setLineWidth(0.2);

  // Assinaturas
  y = 262; pdf.setDrawColor(...ink); pdf.setTextColor(...ink); pdf.setFont("helvetica", "normal"); pdf.setFontSize(10);
  pdf.line(M, y, M + 75, y); pdf.line(W - M - 75, y, W - M, y);
  pdf.text(d.seller || "Desenvolvedor", M + 37.5, y + 5, { align: "center" });
  pdf.text(d.client || "Cliente", W - M - 37.5, y + 5, { align: "center" });
  pdf.setFontSize(8); pdf.text("Desenvolvedor", M + 37.5, y + 9, { align: "center" }); pdf.text("Cliente", W - M - 37.5, y + 9, { align: "center" });

  const slug = (d.business || d.client || "cliente").normalize("NFD").replace(/[^\w]+/g, "-").toLowerCase();
  pdf.save(`recibo-${slug}.pdf`);
}
