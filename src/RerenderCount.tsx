import { useRef } from "react";

export const RerenderCount = () => {
	const count = useRef(0);
	return (
		<div className="bg-gray-50 border border-gray-200 p-0.5 rounded-md text-sm">
			Rerender count: {++count.current}
		</div>
	);
};
