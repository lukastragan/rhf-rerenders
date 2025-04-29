import { createFileRoute } from "@tanstack/react-router";
import { FieldState } from "../form/FieldState";

export const Route = createFileRoute("/fieldstate")({
	component: FieldState,
});
