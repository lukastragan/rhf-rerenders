import { createFormControl, useForm, useFormState } from "react-hook-form";
import {
	NameFieldWithControl,
	NameRequiredFieldWithControl,
	SurnameFieldWithControl,
	SurnameRequiredFieldWithControl,
} from "./form/fields";
import { withFormWatch } from "./hooks/useFormWatch";
import type { RerenderCount } from "./RerenderCount";
import type { AppFormFields } from "./types";

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
	return false;
};

export const CreateControlForm = () => {
	return (
		<>
			<AppForm />
			<div className="flex flex-col gap-2">
				<NameField />
				<SurnameField />
				<NameRequiredField />
				<SurnameRequiredField />
				<Consumer />
				<TriggerValidation />
				<WatchedNameField test={2} />
			</div>
		</>
	);
};

const NameField = () => {
	const { control } = appForm;
	return <NameFieldWithControl control={control} />;
};

const SurnameField = () => {
	const { control } = appForm;
	return <SurnameFieldWithControl control={control} />;
};

const NameRequiredField = () => {
	const { control } = appForm;
	return <NameRequiredFieldWithControl control={control} />;
};

const SurnameRequiredField = () => {
	const { control } = appForm;
	return <SurnameRequiredFieldWithControl control={control} />;
};

const Consumer = () => {
	const { isDirty, isValid, isValidating } = useFormState<AppFormFields>({
		control: appForm.control,
	});
	return (
		<>
			<button className="border">
				Press me {isDirty} {isValid} {isValidating}
			</button>
			<RerenderCount />
		</>
	);
};

const TriggerValidation = () => {
	const { trigger, resetField } = appForm;
	return (
		<>
			<button className="border" onClick={() => trigger("surnameRequired")}>
				Trigger
			</button>
			<button className="border" onClick={() => resetField("surnameRequired")}>
				Reset
			</button>
			<RerenderCount />
		</>
	);
};

const GenericTest = ({
	watchedFieldValue,
}: {
	watchedFieldValue: string;
	test: number;
}) => {
	return (
		<div>
			{watchedFieldValue}
			<RerenderCount />
		</div>
	);
};

const WatchedNameField = withFormWatch<AppFormFields, "name">(
	{
		name: "name",
		control: appForm.control,
		getValues: appForm.getValues,
	},
	"NameComp",
)(GenericTest);
