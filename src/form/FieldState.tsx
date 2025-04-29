import { useFormContext, useFormState } from "react-hook-form";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { RerenderCount } from "../RerenderCount";
import type { AppFormFields } from "../types";
import { AppContextForm } from "./AppContextForm";
import { AppFormProvider } from "./AppFormProvider";
import { FormMethods } from "./formMethods";

export const FieldStateBad = () => {
	return (
		<div>
			<Heading>field state bad usage</Heading>
			<AppFormProvider>
				<div className="flex gap-3 flex-col">
					<AppContextForm variant="fieldState" />
					<FormMethods />
					<SubmitButton />
				</div>
			</AppFormProvider>
		</div>
	);
};

export const FieldStateGood = () => {
	return (
		<div>
			<Heading>field state correct usage</Heading>
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

export const FieldState = () => {
	return (
		<div>
			Check rerenders when changing fields with validation (required fields)
			<div className="grid gap-10 grid-cols-2">
				<FieldStateBad />
				<FieldStateGood />
			</div>
		</div>
	);
};

const SubmitButton = () => {
	const { trigger, handleSubmit } = useFormContext<AppFormFields>();

	const { isValid, isDirty } = useFormState<AppFormFields>();

	const onSubmit = handleSubmit((data) => {
		console.log(data);
	});

	const handleClick = () => (isValid ? onSubmit() : trigger());

	return (
		<div>
			<Button onClick={handleClick} disabled={!isDirty} isPrimary>
				{isDirty ? "Submit" : "Fill values"}
			</Button>
			<RerenderCount />
		</div>
	);
};
