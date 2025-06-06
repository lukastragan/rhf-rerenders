import { useFormContext } from "react-hook-form";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { RerenderCount } from "../RerenderCount";
import type { AppFormFields } from "../types";
import { AppContextForm } from "./AppContextForm";
import { AppFormProvider } from "./AppFormProvider";
import { FormMethods } from "./formMethods";
import { SubmitButton } from "./SubmitButton";

export const FormStateBad = () => {
	return (
		<div>
			<Heading>form state bad usage</Heading>
			<AppFormProvider>
				<div className="flex gap-3 flex-col">
					<AppContextForm />
					<FormMethods />
					<SubmitButtonBad />
				</div>
			</AppFormProvider>
		</div>
	);
};

const SubmitButtonBad = () => {
	const { formState, handleSubmit, trigger } = useFormContext<AppFormFields>();

	const onSubmit = handleSubmit((data) => {
		console.log(data);
	});

	const { isValid, isDirty } = formState;

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

export const FormStateGood = () => {
	return (
		<div>
			<Heading>form state correct usage</Heading>
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

export const FormState = () => {
	return (
		<div>
			Check rerenders when form state changes (isDirty, isValid..)
			<div className="grid gap-2 grid-cols-2">
				<FormStateBad />
				<FormStateGood />
			</div>
		</div>
	);
};
