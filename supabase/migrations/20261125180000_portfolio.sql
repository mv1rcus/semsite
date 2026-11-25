-- Portfólio público: cada usuário escolhe quais demos aparecem na sua página /portfolio/<username>.
-- Padrão desligado: nenhuma demo entra no portfólio sem o dono marcar.
-- ATENÇÃO: rodar manualmente no SQL editor do Lovable Cloud (as migrações não rodam sozinhas).
ALTER TABLE public.site_demonstrations ADD COLUMN IF NOT EXISTS show_in_portfolio boolean NOT NULL DEFAULT false;
