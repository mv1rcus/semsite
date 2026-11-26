import type { SupabaseClient } from "@supabase/supabase-js";

/** Mesma checagem de servidor usada em demonstracoes: so conta com selo Verificado passa. */
export async function assertVerified(supabase: SupabaseClient, feature: string) {
  const { data, error } = await supabase.rpc("am_i_verified");
  if (error || !data) throw new Error(`${feature} é exclusivo para contas verificadas.`);
}
