import { useFormContext } from "react-hook-form";
import {
	NameFieldWithControl,
	SurnameFieldWithControl,
	NameRequiredFieldWithControl,
	SurnameRequiredFieldWithControl,
	type ControlledVariant,
} from "./fields";
import type { AppFormFields } from "../types";

type AppContextFormProps = {
	variant?: ControlledVariant;
};
export const AppContextForm = ({ variant }: AppContextFormProps) => {
	return (
		<div className="grid gap-2 grid-cols-2">
			<NameField variant={variant} />
			<NameRequiredField variant={variant} />
			<SurnameField variant={variant} />
			<SurnameRequiredField variant={variant} />
		</div>
	);
};

type FieldProps = {
	variant?: ControlledVariant;
};

const NameField = ({ variant }: FieldProps) => {
	const { control } = useFormContext<AppFormFields>();
	return <NameFieldWithControl control={control} variant={variant} />;
};

const SurnameField = ({ variant }: FieldProps) => {
	const { control } = useFormContext<AppFormFields>();
	return <SurnameFieldWithControl control={control} variant={variant} />;
};

const NameRequiredField = ({ variant }: FieldProps) => {
	const { control } = useFormContext<AppFormFields>();
	return <NameRequiredFieldWithControl control={control} variant={variant} />;
};

const SurnameRequiredField = ({ variant }: FieldProps) => {
	const { control } = useFormContext<AppFormFields>();
	return (
		<SurnameRequiredFieldWithControl control={control} variant={variant} />
	);
};
