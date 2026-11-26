import { createFileRoute } from "@tanstack/react-router";
import { BurgerFold } from "@/components/models/BurgerFold";
export const Route = createFileRoute("/lab/burger")({ component: BurgerFold });
