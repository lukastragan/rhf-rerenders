import { useFormContext } from "react-hook-form";
import { Button } from "../components/Button";
import { RerenderCount } from "../RerenderCount";
import type { AppFormFields } from "../types";

type CommonProps = {
	name: keyof AppFormFields;
};

export const SetFormContextName = ({
	name,
	value,
}: CommonProps & { value: string }) => {
	const { setValue } = useFormContext<AppFormFields>();

	return (
		<div>
			<Button onClick={() => setValue(name, value)}>Set {name}</Button>
			<RerenderCount />
		</div>
	);
};

export const ResetContextName = ({ name }: CommonProps) => {
	const { resetField } = useFormContext<AppFormFields>();

	return (
		<div>
			<Button onClick={() => resetField(name)}>Reset {name}</Button>
			<RerenderCount />
		</div>
	);
};

export const TriggerContextName = ({ name }: CommonProps) => {
	const { trigger } = useFormContext<AppFormFields>();

	return (
		<div>
			<Button onClick={() => trigger(name)}>Trigger {name}</Button>
			<RerenderCount />
		</div>
	);
};

export const FormMethods = () => {
	const name: keyof AppFormFields = "name";
	const nameRequired: keyof AppFormFields = "nameRequired";

	return (
		<div className="flex gap-2 flex-col">
			<SetFormContextName name={name} value="John" />
			<ResetContextName name={name} />
			<TriggerContextName name={name} />
			<SetFormContextName name={nameRequired} value="John" />
			<ResetContextName name={nameRequired} />
			<TriggerContextName name={nameRequired} />
		</div>
	);
};
