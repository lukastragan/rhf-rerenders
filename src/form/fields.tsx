import React, {
	useCallback,
	type ComponentType,
	type FocusEventHandler,
} from "react";
import {
	useController,
	type Control,
	type ControllerFieldState,
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
	fieldState?: ControllerFieldState;
};

const fieldStateHandler = (fieldState: ControllerFieldState) => {
	// We had something like this is our codebase, so that it is recommended to not use it
	return { ...fieldState };
};

export const Input = ({
	errorMessage,
	invalid,
	name,
	label,
	value,
	onChange,
	onBlur,
	inputRef,
	fieldState,
}: InputProps) => {
	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			onChange(e.target.value);
		},
		[onChange],
	);

	if (fieldState) {
		fieldStateHandler(fieldState);
	}

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

type ControlledInputBaseProps = {
	name: keyof AppFormFields;
	rules?: Omit<
		RegisterOptions<AppFormFields>,
		"valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
	>;

	label: string;
	control: Control<AppFormFields>;
};

export type ControlledVariant = "default" | "fieldState";

type ControlledInputProps = ControlledInputBaseProps & {
	variant?: ControlledVariant;
};

const ControlledInput = ({
	variant = "default",
	...props
}: ControlledInputProps) => {
	const componentMap: Record<
		ControlledVariant,
		ComponentType<ControlledInputBaseProps>
	> = {
		default: ControlledDefaultInput,
		fieldState: ControlledAllFieldStateInput,
	};

	const Component = componentMap[variant];

	return <Component {...props} />;
};

const ControlledDefaultInput = ({
	control,
	name,
	label,
	rules,
}: ControlledInputBaseProps) => {
	const { field, fieldState } = useController<AppFormFields>({
		name,
		control,
		rules,
	});
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

const ControlledAllFieldStateInput = ({
	control,
	name,
	label,
	rules,
}: ControlledInputBaseProps) => {
	const { field, fieldState } = useController<AppFormFields>({
		name,
		control,
		rules,
	});
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
			fieldState={fieldState}
		/>
	);
};

type FieldWithControlProps = {
	control: Control<AppFormFields>;
	variant?: ControlledVariant;
};

export const NameFieldWithControl = ({
	control,
	variant,
}: FieldWithControlProps) => {
	return (
		<ControlledInput
			control={control}
			name="name"
			label="Name"
			variant={variant}
		/>
	);
};

export const SurnameFieldWithControl = ({
	control,
	variant,
}: FieldWithControlProps) => {
	return (
		<ControlledInput
			control={control}
			name="surname"
			label="Surname"
			variant={variant}
		/>
	);
};

export const NameRequiredFieldWithControl = ({
	control,
	variant,
}: FieldWithControlProps) => {
	return (
		<ControlledInput
			control={control}
			name="nameRequired"
			label="Name required"
			variant={variant}
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
	variant,
}: FieldWithControlProps) => {
	return (
		<ControlledInput
			control={control}
			name="surnameRequired"
			label="Surname required"
			variant={variant}
			rules={{
				required: {
					value: true,
					message: "Surname is required",
				},
			}}
		/>
	);
};
