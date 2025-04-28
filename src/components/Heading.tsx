import type { PropsWithChildren } from "react";

export const Heading = ({ children }: PropsWithChildren) => {
	return <h2 className="font-bold text-lg">{children}</h2>;
};
