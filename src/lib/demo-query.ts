import { queryOptions } from "@tanstack/react-query";
import { getDemonstration } from "./demonstrations.functions";

export const demoQuery = (id: string) => queryOptions({ queryKey: ["demonstration", id], queryFn: () => getDemonstration({ data: { id } }) });