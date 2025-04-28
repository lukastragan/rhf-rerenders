import { forwardRef, type ButtonHTMLAttributes } from "react";

export const Button = forwardRef<
	HTMLButtonElement,
	ButtonHTMLAttributes<HTMLButtonElement> & {
		isPrimary?: boolean;
	}
>(({ className, isPrimary, ...props }, ref) => {
	return (
		<button
			className={`px-2 py-1 w-full rounded-md disabled:opacity-50 cursor-pointer disabled:cursor-default ${isPrimary ? "bg-black text-white" : "bg-gray-100 border border-gray-300 text-black"} ${className}`}
			ref={ref}
			{...props}
		/>
	);
});
