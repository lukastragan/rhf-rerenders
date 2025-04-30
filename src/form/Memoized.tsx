import { Heading } from "../components/Heading";
import { AppContextForm } from "./AppContextForm";
import { AppFormProvider } from "./AppFormProvider";
import { FormMethods } from "./formMethods";
import { SubmitButton } from "./SubmitButton";

export const NonMemoizedForm = () => {
	return (
		<div>
			<Heading>non-memoized fields</Heading>
			<AppFormProvider>
				<div className="flex gap-3 flex-col">
					<AppContextForm />
					<FormMethods />
					<SubmitButton />
				</div>
			</AppFormProvider>
		</div>
	);
};

export const MemoizedForm = () => {
	return (
		<div>
			<Heading>memoized field</Heading>
			<AppFormProvider>
				<div className="flex gap-3 flex-col">
					<AppContextForm variant="memoized" />
					<FormMethods />
					<SubmitButton />
				</div>
			</AppFormProvider>
		</div>
	);
};

export const Memoized = () => {
	return (
		<div>
			Try trigger functions
			<div className="grid gap-10 grid-cols-2">
				<NonMemoizedForm />
				<MemoizedForm />
			</div>
		</div>
	);
};
