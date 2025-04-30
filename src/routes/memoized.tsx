import { createFileRoute } from "@tanstack/react-router";
import { Memoized } from "../form/Memoized";

export const Route = createFileRoute("/memoized")({
	component: Memoized,
});
