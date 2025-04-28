import { createFileRoute } from "@tanstack/react-router";
import { FormWatch } from "../form/FormWatch";

export const Route = createFileRoute("/formwatch")({
	component: FormWatch,
});
