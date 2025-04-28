import { useFormContext, useFormState } from "react-hook-form";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { AppContextForm } from "../form/AppContextForm";
import { AppFormProvider } from "../form/AppFormProvider";
import { RerenderCount } from "../RerenderCount";
import type { AppFormFields } from "../types";

export const FormStateBad = () => {
	return (
		<div>
			<Heading>form state bad usage</Heading>
			<AppFormProvider>
				<div className="flex gap-3 flex-col">
					<AppContextForm />
					<FormStateSet />
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

	const handleClick = () => (formState.isValid ? onSubmit() : trigger());

	return (
		<div>
			<Button onClick={handleClick} disabled={!formState.isDirty} isPrimary>
				{formState.isDirty ? "Submit" : "Fill values"}
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
					<FormStateSet />
					<SubmitButtonGood />
				</div>
			</AppFormProvider>
		</div>
	);
};

const SubmitButtonGood = () => {
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

export const FormState = () => {
	return (
		<div className="flex gap-10">
			<FormStateBad />
			<FormStateGood />
		</div>
	);
};

const FormStateSet = () => {
	const { setValue } = useFormContext<AppFormFields>();

	return (
		<div>
			<Button onClick={() => setValue("name", "John")}>Set name</Button>
			<RerenderCount />
		</div>
	);
};
