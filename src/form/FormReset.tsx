import {
	createFormControl,
	useForm,
	useFormContext,
	useFormState,
} from "react-hook-form";
import { Heading } from "../components/Heading";
import type { AppFormFields } from "../types";
import { AppContextForm } from "./AppContextForm";
import { AppFormProvider } from "./AppFormProvider";
import {
	NameFieldWithControl,
	NameRequiredFieldWithControl,
	SurnameFieldWithControl,
	SurnameRequiredFieldWithControl,
} from "./fields";
import { FormMethods } from "./formMethods";
import { SubmitButton } from "./SubmitButton";
import { Button } from "../components/Button";
import { RerenderCount } from "../RerenderCount";
import { useEffect } from "react";

export const FormReset = () => {
	return (
		<div>
			Check rerenders when reseting form
			<div className="grid gap-2 grid-cols-2">
				<FormResetContext />
				<FormResetControlForm />
			</div>
		</div>
	);
};

export const FormResetContext = () => {
	return (
		<div>
			<Heading>context form</Heading>
			<AppFormProvider>
				<div className="flex gap-3 flex-col">
					<AppContextForm variant="memoized" />
					<FormMethods>
						<ResetMultipleContext />
					</FormMethods>
					<SubmitButton />
				</div>
			</AppFormProvider>
		</div>
	);
};

const appForm = createFormControl<AppFormFields>({
	mode: "onChange",
});

const AppForm = () => {
	useForm<AppFormFields>({
		formControl: appForm.formControl,
		defaultValues: {
			name: "",
			surname: "",
			nameRequired: "",
			surnameRequired: "",
		},
	});

	useEffect(() => {
		return () => appForm.reset();
	}, []);
	return false;
};

export const FormResetControlForm = () => {
	return (
		<div>
			<AppForm />
			<Heading>control form</Heading>
			<AppFormProvider>
				<div className="flex gap-3 flex-col">
					<div className="grid gap-2 grid-cols-2">
						<NameField />
						<NameRequiredField />
						<SurnameField />
						<SurnameRequiredField />
					</div>
					<FormControlMethods />
					<SubmitButtonControl />
				</div>
			</AppFormProvider>
		</div>
	);
};

const NameField = () => {
	const { control } = appForm;
	return <NameFieldWithControl control={control} variant="memoized" />;
};

const SurnameField = () => {
	const { control } = appForm;
	return <SurnameFieldWithControl control={control} variant="memoized" />;
};

const NameRequiredField = () => {
	const { control } = appForm;
	return <NameRequiredFieldWithControl control={control} variant="memoized" />;
};

const SurnameRequiredField = () => {
	const { control } = appForm;
	return (
		<SurnameRequiredFieldWithControl control={control} variant="memoized" />
	);
};

export const SubmitButtonControl = () => {
	const { trigger, handleSubmit } = appForm;

	const { isValid, isDirty } = useFormState<AppFormFields>({
		control: appForm.control,
	});

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

type CommonProps = {
	name: keyof AppFormFields;
};

type SetProps = CommonProps & {
	value: string;
};

export const SetFormContextName = ({ name, value }: SetProps) => {
	const { setValue } = appForm;

	return (
		<div>
			<Button onClick={() => setValue(name, value)}>Set {name}</Button>
			<RerenderCount />
		</div>
	);
};

export const ResetContextName = ({ name }: CommonProps) => {
	const { resetField } = appForm;

	return (
		<div>
			<Button onClick={() => resetField(name)}>Reset {name}</Button>
			<RerenderCount />
		</div>
	);
};

export const TriggerContextName = ({ name }: CommonProps) => {
	const { trigger } = appForm;

	return (
		<div>
			<Button onClick={() => trigger(name)}>Trigger {name}</Button>
			<RerenderCount />
		</div>
	);
};

export const SetAndTriggerContext = ({ name, value }: SetProps) => {
	const { setValue, trigger } = appForm;

	return (
		<div>
			<Button
				onClick={() => {
					setValue(name, value);
					trigger(name);
				}}
			>
				Set and trigger {name}
			</Button>
			<RerenderCount />
		</div>
	);
};

export const ResetMultipleContext = () => {
	const { reset } = useFormContext();

	return (
		<div>
			<Button
				onClick={() => {
					reset({
						name: "",
						surname: "",
					});
				}}
			>
				Reset name and surname
			</Button>
			<RerenderCount />
		</div>
	);
};

export const ResetMultiple = () => {
	const { reset } = appForm;

	return (
		<div>
			<Button
				onClick={() => {
					reset({
						name: "",
						surname: "",
					});
				}}
			>
				Reset name and surname
			</Button>
			<RerenderCount />
		</div>
	);
};

export const FormControlMethods = () => {
	const name: keyof AppFormFields = "name";
	const nameRequired: keyof AppFormFields = "nameRequired";
	const value = "John";

	return (
		<div className="flex gap-2 flex-col">
			<SetFormContextName name={name} value={value} />
			<ResetContextName name={name} />
			<TriggerContextName name={name} />
			<SetAndTriggerContext name={name} value={value} />
			<SetFormContextName name={nameRequired} value={value} />
			<ResetContextName name={nameRequired} />
			<TriggerContextName name={nameRequired} />
			<SetAndTriggerContext name={nameRequired} value={value} />
			<ResetMultiple />
		</div>
	);
};
