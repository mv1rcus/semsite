import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

/** UX only — the server re-checks verified status for searches and demonstrations. */
export function useVerified() {
  const [state, setState] = useState<{ loading: boolean; verified: boolean }>({ loading: true, verified: false });
  useEffect(() => {
    let alive = true;
    supabase.rpc("am_i_verified").then(({ data }) => { if (alive) setState({ loading: false, verified: !!data }); });
    return () => { alive = false; };
  }, []);
  return state;
}
