import { createFileRoute } from "@tanstack/react-router";

const RouteComponent = () => {
	return <div className="flex flex-col gap-10"></div>;
};

export const Route = createFileRoute("/")({
	component: RouteComponent,
});
