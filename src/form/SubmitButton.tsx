import { useFormContext, useFormState } from "react-hook-form";
import { Button } from "../components/Button";
import { RerenderCount } from "../RerenderCount";
import type { AppFormFields } from "../types";

export const SubmitButton = () => {
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
