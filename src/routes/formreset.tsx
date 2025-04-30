import { createFileRoute } from "@tanstack/react-router";
import { FormReset } from "../form/FormReset";

export const Route = createFileRoute("/formreset")({
	component: FormReset,
});
