import { useFormContext } from "react-hook-form";
import { Heading } from "../components/Heading";
import { useFormWatch } from "../hooks/useFormWatch";
import { RerenderCount } from "../RerenderCount";
import type { AppFormFields } from "../types";
import { AppContextForm } from "./AppContextForm";
import { AppFormProvider } from "./AppFormProvider";
import { FormMethods } from "./formMethods";
import { SubmitButton } from "./SubmitButton";

export const FormWatchBad = () => {
	return (
		<div>
			<Heading>form watch bad usage</Heading>
			<AppFormProvider>
				<div className="flex gap-3 flex-col">
					<AppContextForm />
					<FormMethods />
					<div className="grid gap-2 grid-cols-2">
						<WatchedNameBad />
						<WatchedNameRequiredBad />
					</div>
					<SubmitButton />
				</div>
			</AppFormProvider>
		</div>
	);
};

const WatchedNameBad = () => {
	const { watch } = useFormContext<AppFormFields>();
	const name = watch("name");

	return (
		<div>
			<p>Watched name: {name}</p>
			<RerenderCount />
		</div>
	);
};

const WatchedNameRequiredBad = () => {
	const { watch } = useFormContext<AppFormFields>();
	const nameRequired = watch("nameRequired");

	return (
		<div>
			<p>Watched nameRequired: {nameRequired}</p>
			<RerenderCount />
		</div>
	);
};

export const FormWatchGood = () => {
	return (
		<div>
			<Heading>form watch correct usage</Heading>
			<AppFormProvider>
				<div className="flex gap-3 flex-col">
					<AppContextForm />
					<FormMethods />
					<div className="grid gap-2 grid-cols-2">
						<WatchedNameGood />
						<WatchedNameRequiredGood />
					</div>
					<SubmitButton />
				</div>
			</AppFormProvider>
		</div>
	);
};

export const FormWatch = () => {
	return (
		<div>
			Check rerenders when watched field changes
			<div className="grid gap-10 grid-cols-2">
				<FormWatchBad />
				<FormWatchGood />
			</div>
		</div>
	);
};

const WatchedNameGood = () => {
	const name = useFormWatch<AppFormFields, "name">({
		name: "name",
	});

	return (
		<div>
			<p>Watched name: {name}</p>
			<RerenderCount />
		</div>
	);
};

const WatchedNameRequiredGood = () => {
	const nameRequired = useFormWatch<AppFormFields, "nameRequired">({
		name: "nameRequired",
	});

	return (
		<div>
			<p>Watched nameRequired: {nameRequired}</p>
			<RerenderCount />
		</div>
	);
};
