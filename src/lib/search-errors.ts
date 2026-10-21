// Friendly pt-BR messages for client search failures (Google Maps and network).
export function mapsErrorMessage(status: number, body: string, hadPageToken: boolean): string {
  if (status === 401) return "A conexão com o Google Maps expirou ou é inválida. Reconecte o Google Maps nas configurações do projeto.";
  if (status === 403) {
    if (body.includes("API_KEY_SERVICE_BLOCKED")) return "A chave do Google Maps não permite pesquisar locais (Places API). Libere essa permissão no Google Cloud.";
    if (body.includes("API_KEY_HTTP_REFERRER_BLOCKED")) return "A chave do Google Maps está restrita a sites e bloqueia a busca. Ajuste as restrições da chave no Google Cloud.";
    return "O Google Maps recusou a pesquisa. Confira a conexão e as permissões do serviço.";
  }
  if (status === 429) return "Limite diário de pesquisas do Google Maps atingido. Tente novamente mais tarde.";
  if (status === 400 && hadPageToken) return "Esta pesquisa expirou. Clique em Buscar para começar novamente.";
  if (status === 400) return "O Google Maps não entendeu a pesquisa. Revise o tipo de negócio e a cidade.";
  if (status >= 500) return "O Google Maps está instável agora. Tente novamente em instantes.";
  return "Não foi possível consultar o Google Maps agora. Tente novamente em instantes.";
}

export function clientSearchError(error: unknown): string {
  const message = error instanceof Error ? error.message : "";
  if (!message || message.startsWith("[") || message.startsWith("{")) return "Não foi possível pesquisar. Confira a cidade e o tipo de negócio e tente novamente.";
  if (/failed to fetch|networkerror|load failed/i.test(message)) return "Sem conexão com a internet. Verifique sua rede e tente novamente.";
  return message;
}
