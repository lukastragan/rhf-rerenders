import { memo, useCallback, type FocusEventHandler } from "react";
import {
	useController,
	type Control,
	type RegisterOptions,
} from "react-hook-form";
import { RerenderCount } from "../RerenderCount";
import type { AppFormFields } from "../types";

type InputProps = {
	inputRef: React.Ref<HTMLInputElement>;
	name: string;
	label: string;
	value: string;
	invalid: boolean;
	errorMessage: string | undefined;
	onChange: (value: string) => void;
	onBlur?: FocusEventHandler<HTMLInputElement>;
};
const Input = ({
	errorMessage,
	invalid,
	name,
	label,
	value,
	onChange,
	onBlur,
	inputRef,
}: InputProps) => {
	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			onChange(e.target.value);
		},
		[onChange],
	);

	const shouldIndicateError = invalid || errorMessage;

	return (
		<div className="flex flex-col gap-1 border border-gray-200 p-2 rounded-md">
			<label className="font-semibold text-sm" htmlFor={name}>
				{label}
			</label>
			<input
				className={`border ${shouldIndicateError ? "border-gray-300" : "border-gray-300"} rounded-md px-2 py-1  text-s`}
				id={name}
				name={name}
				value={value || ""}
				onChange={handleChange}
				onBlur={onBlur}
				ref={inputRef}
				data-1p-ignore
			/>
			{errorMessage && (
				<span className="text-red-600 text-sm">{errorMessage}</span>
			)}
			<RerenderCount />
		</div>
	);
};

type ControlledInputProps = {
	name: keyof AppFormFields;
	rules?: Omit<
		RegisterOptions<AppFormFields>,
		"valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
	>;

	label: string;
	control: Control<AppFormFields>;
};

const ControlledInput = ({
	control,
	name,
	label,
	rules,
}: ControlledInputProps) => {
	const { field, fieldState } = useController({ name, control, rules });
	const errorMessage = fieldState.error?.message;

	return (
		<Input
			errorMessage={errorMessage}
			invalid={fieldState.invalid}
			label={label}
			name={name}
			onChange={field.onChange}
			value={field.value}
			onBlur={field.onBlur}
			inputRef={field.ref}
		/>
	);
};

// --- Components Accepting 'control' Prop ---

interface FieldWithControlProps {
	control: Control<AppFormFields>;
}

export const NameFieldWithControl = ({ control }: FieldWithControlProps) => {
	return <ControlledInput control={control} name="name" label="Name" />;
};

export const SurnameFieldWithControl = ({ control }: FieldWithControlProps) => {
	return <ControlledInput control={control} name="surname" label="Surname" />;
};

export const NameRequiredFieldWithControl = ({
	control,
}: FieldWithControlProps) => {
	return (
		<ControlledInput
			control={control}
			name="nameRequired"
			label="Name required"
			rules={{
				required: {
					value: true,
					message: "Name is required",
				},
			}}
		/>
	);
};

export const SurnameRequiredFieldWithControl = ({
	control,
}: FieldWithControlProps) => {
	return (
		<ControlledInput
			control={control}
			name="surnameRequired"
			label="Surname required"
			rules={{
				required: {
					value: true,
					message: "Surname is required",
				},
			}}
		/>
	);
};
