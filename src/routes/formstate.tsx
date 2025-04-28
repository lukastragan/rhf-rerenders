import { createFileRoute } from "@tanstack/react-router";
import { FormState } from "../FormState/FormState";

export const Route = createFileRoute("/formstate")({
	component: FormState,
});
