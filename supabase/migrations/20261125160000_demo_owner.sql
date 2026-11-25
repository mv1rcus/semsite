-- Dono de cada demonstração (quem criou, logado). Só o dono altera a validade e vê a atividade
-- (contador de aberturas, aparelho, horário), com filtro por owner_id no servidor.
-- Demos já existentes ficam com owner_id NULL: ninguém as altera até o dono ser registrado
-- manualmente (não tentamos adivinhar de quem são).
ALTER TABLE public.site_demonstrations ADD COLUMN IF NOT EXISTS owner_id uuid REFERENCES auth.users (id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS site_demonstrations_owner_idx ON public.site_demonstrations (owner_id);
