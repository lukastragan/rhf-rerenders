import { useFormContext } from "react-hook-form";
import {
	NameFieldWithControl,
	SurnameFieldWithControl,
	NameRequiredFieldWithControl,
	SurnameRequiredFieldWithControl,
} from "./fields";
import type { AppFormFields } from "../types";

export const AppContextForm = () => {
	return (
		<div className="grid gap-2 grid-cols-2">
			<NameField />
			<NameRequiredField />
			<SurnameField />
			<SurnameRequiredField />
		</div>
	);
};

const NameField = () => {
	const { control } = useFormContext<AppFormFields>();
	return <NameFieldWithControl control={control} />;
};

const SurnameField = () => {
	const { control } = useFormContext<AppFormFields>();
	return <SurnameFieldWithControl control={control} />;
};

const NameRequiredField = () => {
	const { control } = useFormContext<AppFormFields>();
	return <NameRequiredFieldWithControl control={control} />;
};

const SurnameRequiredField = () => {
	const { control } = useFormContext<AppFormFields>();
	return <SurnameRequiredFieldWithControl control={control} />;
};
