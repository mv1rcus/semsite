import { createFileRoute, Link } from "@tanstack/react-router";

const CONTATO = "contatosemsite@gmail.com";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade | SemSite" },
      { name: "description", content: "Como o SemSite coleta, usa e protege seus dados, e como você exerce seus direitos pela LGPD." },
      { property: "og:title", content: "Política de Privacidade | SemSite" },
    ],
  }),
  component: Privacidade,
});

function H({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-8 text-lg font-bold text-foreground">{children}</h2>;
}

function Privacidade() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-sm leading-relaxed text-muted-foreground sm:px-6">
      <Link to="/" className="font-bold text-foreground hover:underline">← SemSite</Link>
      <h1 className="mt-6 text-3xl font-extrabold text-foreground">Política de Privacidade</h1>
      <p className="mt-2">Última atualização: 25 de novembro de 2026</p>

      <H>1. Quem somos</H>
      <p className="mt-2">O SemSite é uma plataforma para quem vende sites (freelancers e agências). Contato sobre privacidade: <a className="underline" href={`mailto:${CONTATO}`}>{CONTATO}</a>.</p>

      <H>2. Dados que coletamos</H>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        <li><b className="text-foreground">Conta:</b> nome, e-mail e foto da sua conta Google, ao entrar com o Google. Não recebemos sua senha.</li>
        <li><b className="text-foreground">Perfil (opcional):</b> @, nome de exibição, cidade, bio, link, foto e banner. O telefone também é opcional e fica visível só para você.</li>
        <li><b className="text-foreground">Uso da plataforma:</b> demonstrações geradas, mensagens, posts, comentários, curtidas, seguidores e notificações dentro do app.</li>
        <li><b className="text-foreground">Acompanhamento de demos:</b> quando alguém abre um site de demonstração, registramos o dispositivo e o navegador usados, para você saber se o cliente abriu.</li>
        <li><b className="text-foreground">Pagamento:</b> processado pelo Stripe. Não guardamos número de cartão, só identificadores da assinatura, status e período.</li>
        <li><b className="text-foreground">Dados técnicos:</b> informações básicas de navegador, registros de erro e dados salvos no seu navegador (como lista de clientes e lembretes) para o app funcionar.</li>
      </ul>

      <H>3. Dados de negócios de terceiros</H>
      <p className="mt-2">A busca mostra informações de negócios locais (nome, endereço, telefone, categoria) vindas de bases públicas e abertas, como o Overture Maps. Usamos esses dados só para você encontrar e contatar potenciais clientes. Se você é dono de um negócio listado e quer a remoção, escreva para {CONTATO}.</p>

      <H>4. Para que usamos e base legal (LGPD, art. 7º)</H>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        <li>Criar e manter sua conta e prestar o serviço: execução de contrato.</li>
        <li>Processar pagamentos e cumprir obrigações fiscais: execução de contrato e obrigação legal.</li>
        <li>Segurança, prevenção a fraude e melhoria do serviço: legítimo interesse.</li>
        <li>Dados opcionais do perfil: seu consentimento, que você pode retirar a qualquer momento.</li>
      </ul>

      <H>5. Com quem compartilhamos</H>
      <p className="mt-2">Não vendemos seus dados. Compartilhamos só com quem faz o serviço funcionar: Google (login), Lovable e Supabase (hospedagem e banco de dados) e Stripe (pagamentos). Seu @, nome de exibição, foto, banner, bio, cidade, link do perfil, posts e comentários ficam visíveis para outros usuários logados na plataforma, não para o público geral da internet. Seu telefone e e-mail não aparecem para outros usuários. Também podemos compartilhar dados se a lei ou uma ordem judicial exigir.</p>

      <H>6. Transferência internacional</H>
      <p className="mt-2">Esses provedores podem armazenar dados fora do Brasil. Nesses casos, adotamos as garantias previstas na LGPD.</p>

      <H>7. Por quanto tempo guardamos e como excluir sua conta</H>
      <p className="mt-2">Guardamos seus dados enquanto sua conta existir. Você pode excluir sua conta a qualquer momento em Perfil, no botão "Excluir minha conta", ou pedindo por e-mail para {CONTATO}. Ao excluir, apagamos seus dados (perfil, posts, comentários, mensagens, arquivos enviados e registros de assinatura) e cancelamos qualquer assinatura ativa. Você recebe um e-mail avisando que a conta foi excluída. Podemos manter apenas o que a lei nos obriga a guardar, como registros de pagamento no Stripe.</p>

      <H>8. Seus direitos (LGPD, art. 18)</H>
      <p className="mt-2">Você pode pedir: confirmação de que tratamos seus dados, acesso, correção, anonimização ou exclusão (inclusive sozinho, pelo botão "Excluir minha conta" no Perfil), portabilidade, informação sobre compartilhamento e a retirada do consentimento. Escreva para {CONTATO}. Respondemos em até 15 dias. Você também pode reclamar à ANPD (gov.br/anpd).</p>

      <H>9. Segurança</H>
      <p className="mt-2">Usamos conexão criptografada (HTTPS) e controle de acesso por conta. Nenhum sistema é 100% seguro. Se houver um incidente que traga risco a você, avisamos você e a ANPD conforme a lei.</p>

      <H>10. Crianças</H>
      <p className="mt-2">O SemSite é para maiores de 18 anos e não coleta dados de crianças de propósito.</p>

      <H>11. Mudanças</H>
      <p className="mt-2">Podemos atualizar esta política. A data no topo mostra a última versão. Mudanças relevantes serão avisadas no app.</p>
    </main>
  );
}
