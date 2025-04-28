import { createFileRoute } from "@tanstack/react-router";
import { FormState } from "../form/FormState";

export const Route = createFileRoute("/formstate")({
	component: FormState,
});
