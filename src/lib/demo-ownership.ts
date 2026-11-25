/** Dono das demonstrações: regras puras, sem acesso a banco. */

/**
 * Só o dono (quem criou, logado) gerencia uma demonstração.
 * Demos antigas sem dono (owner_id NULL) ficam congeladas: ninguém muda a
 * validade nem vê a atividade até um responsável registrar o dono no banco.
 */
export function canManageDemonstration(ownerId: string | null | undefined, userId: string | null | undefined) {
  return !!ownerId && !!userId && ownerId === userId;
}

/** Defesa em profundidade: além do filtro por dono no banco, descarta qualquer linha que não seja do usuário. */
export function filterOwnedDemonstrations<T extends { owner_id?: string | null }>(rows: T[], userId: string) {
  return rows.filter((row) => canManageDemonstration(row.owner_id, userId));
}
