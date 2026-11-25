import { createFileRoute, Link } from "@tanstack/react-router";

const CONTATO = "semsiteapp@gmail.com";

export const Route = createFileRoute("/termos")({
  head: () => ({
    meta: [
      { title: "Termos de Uso | SemSite" },
      { name: "description", content: "As regras para usar o SemSite: conta, selo Verificado, pagamentos, conteúdo e responsabilidades." },
      { property: "og:title", content: "Termos de Uso | SemSite" },
    ],
  }),
  component: Termos,
});

function H({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-8 text-lg font-bold text-foreground">{children}</h2>;
}

function Termos() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-sm leading-relaxed text-muted-foreground sm:px-6">
      <Link to="/" className="font-bold text-foreground hover:underline">← SemSite</Link>
      <h1 className="mt-6 text-3xl font-extrabold text-foreground">Termos de Uso</h1>
      <p className="mt-2">Última atualização: 25 de novembro de 2026</p>
      <p className="mt-4">Ao criar uma conta ou usar o SemSite, você concorda com estes termos. Se não concordar, não use a plataforma. Leia também a <Link to="/privacidade" className="underline">Política de Privacidade</Link>.</p>

      <H>1. O que é o SemSite</H>
      <p className="mt-2">O SemSite é uma plataforma para quem vende sites (freelancers e agências). Ela ajuda você a encontrar negócios locais que ainda não têm site, gerar demonstrações, preparar mensagens de contato, acompanhar clientes e gerar cobranças por Pix. O SemSite é uma ferramenta: não intermedeia a venda entre você e seus clientes.</p>

      <H>2. Quem pode usar</H>
      <p className="mt-2">Você precisa ter 18 anos ou mais e poder assumir obrigações legais. O acesso é feito com a sua conta Google. Você é responsável por tudo o que acontece na sua conta e deve manter o acesso à conta Google em segurança.</p>

      <H>3. Sua conta e seu perfil</H>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        <li>Use informações verdadeiras e não finja ser outra pessoa ou empresa.</li>
        <li>O @, nome, foto, banner, bio, cidade, link, posts e comentários ficam visíveis para outros usuários logados, como explica a Política de Privacidade.</li>
        <li>Podemos suspender ou excluir contas que violem estes termos, com aviso quando for possível.</li>
        <li>Você pode excluir sua conta quando quiser em Perfil, no botão "Excluir minha conta".</li>
      </ul>

      <H>4. Selo Verificado, planos e pagamento</H>
      <p className="mt-2">Parte dos recursos exige o selo Verificado. Os planos e preços atuais aparecem na página do Verificado e na página inicial, hoje R$ 8,99 por 1 mês ou R$ 69,90 por 1 ano. Podemos alterar preços e planos, e a mudança vale para as próximas compras, nunca para um período já pago.</p>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        <li><b className="text-foreground">Pagamento único por período:</b> você paga o período escolhido (30 dias ou 1 ano) e não há débito automático. Quando o período termina, o selo sai sozinho e nada é cobrado. Para continuar, é só pagar de novo.</li>
        <li><b className="text-foreground">Como pagar:</b> o pagamento é processado pelo Stripe, com Pix, débito, crédito, Apple Pay ou Google Pay, conforme a opção mostrada no momento da compra. Não guardamos número de cartão.</li>
        <li><b className="text-foreground">Ativação:</b> o selo entra assim que o pagamento é confirmado. Se o pagamento falhar, nada é cobrado e você pode tentar de novo.</li>
        <li><b className="text-foreground">Reembolso:</b> você pode pedir o reembolso em até 7 dias depois da compra, conforme o art. 49 do Código de Defesa do Consumidor. Se você ainda não usou o selo (nenhuma demonstração criada nem busca paga), o botão "Pedir reembolso" na página do Verificado devolve o valor na hora, uma vez por conta. Se você já usou, escreva para {CONTATO} e a gente analisa o seu caso. Ao ser reembolsado, o selo daquele período é removido.</li>
        <li><b className="text-foreground">Selo de teste:</b> podemos liberar o selo gratuitamente por um tempo. Ao fim do prazo, ele sai sozinho, sem cobrança.</li>
      </ul>

      <H>5. Como você deve usar a plataforma</H>
      <p className="mt-2">Você concorda em não:</p>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        <li>enviar spam, mensagens enganosas, golpes ou qualquer coisa ilegal usando as mensagens e os contatos que encontrar;</li>
        <li>publicar conteúdo ofensivo, discriminatório, sexual, violento ou que viole direitos de outras pessoas;</li>
        <li>tentar acessar contas, dados ou áreas que não são suas, burlar limites e proteções ou sobrecarregar o serviço;</li>
        <li>copiar a plataforma em massa com robôs ou revender o acesso ao SemSite;</li>
        <li>usar a plataforma para criar demonstrações que se passem por um negócio de verdade sem deixar claro que são apenas uma ideia de site.</li>
      </ul>

      <H>6. Demonstrações e dados de negócios</H>
      <p className="mt-2">As demonstrações são exemplos ilustrativos gerados a partir de dados públicos do negócio (como nome, endereço e telefone). Não representam o negócio nem têm vínculo com ele. As informações de negócios vêm de bases abertas, como o Overture Maps, e podem estar desatualizadas ou incorretas: confira antes de contatar. Quando alguém abre um link de demonstração, registramos o dispositivo e o navegador para você acompanhar. Dono de negócio que queira remoção pode escrever para {CONTATO}.</p>

      <H>7. Contato com clientes e responsabilidade do vendedor</H>
      <p className="mt-2">Quem contata o cliente e fecha o negócio é você. O SemSite só prepara mensagens, contratos, recibos e cobranças por Pix, e não envia nada por você. Você responde pelo que oferecer, pelo que combinar, pela entrega do serviço, pelo conteúdo dos modelos que usar e pelo cumprimento das leis aplicáveis, incluindo a LGPD e as regras de proteção ao consumidor. Os modelos de mensagem, recibo e contrato são exemplos e não substituem orientação jurídica.</p>
      <p className="mt-2">As cobranças por Pix geradas no app usam a chave que você informa e são feitas direto entre você e o seu cliente. O SemSite não recebe, não guarda e não garante esse dinheiro, e não cobra taxa sobre ele.</p>

      <H>8. Seu conteúdo</H>
      <p className="mt-2">O que você publica continua sendo seu. Para o serviço funcionar, você nos dá a licença de armazenar, exibir e distribuir esse conteúdo dentro da plataforma, enquanto ele estiver nela. Você garante que tem o direito de publicá-lo. Podemos remover conteúdo que viole estes termos ou a lei.</p>

      <H>9. Nossa propriedade</H>
      <p className="mt-2">O SemSite, o nome, a marca, o visual e o código são nossos ou de quem nos licencia. Estes termos não dão a você nenhum direito sobre eles além de usar a plataforma como ela é oferecida.</p>

      <H>10. Disponibilidade e limites de responsabilidade</H>
      <p className="mt-2">Fazemos o possível para manter a plataforma no ar, mas ela é oferecida "como está", sem garantia de funcionamento sem interrupção ou sem erros, e sem promessa de que você vai fechar vendas ou ter um resultado específico. Na medida permitida pela lei, não respondemos por lucros cessantes, perda de clientes ou danos indiretos, nem por falhas de serviços de terceiros (Google, Stripe, hospedagem, WhatsApp, entre outros). Nada aqui limita direitos que a lei garante a você como consumidor.</p>

      <H>11. Mudanças nos termos e no serviço</H>
      <p className="mt-2">Podemos atualizar estes termos e mudar ou encerrar recursos. A data no topo mostra a última versão. Em mudanças relevantes, avisamos no app. Continuar usando o SemSite depois do aviso significa que você aceita a nova versão.</p>

      <H>12. Lei aplicável e contato</H>
      <p className="mt-2">Estes termos seguem as leis do Brasil. Dúvidas, pedidos de reembolso ou denúncias: <a className="underline" href={`mailto:${CONTATO}`}>{CONTATO}</a>.</p>
    </main>
  );
}
