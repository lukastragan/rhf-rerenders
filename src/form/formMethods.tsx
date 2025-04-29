import { useFormContext } from "react-hook-form";
import { Button } from "../components/Button";
import { RerenderCount } from "../RerenderCount";
import type { AppFormFields } from "../types";

type CommonProps = {
	name: keyof AppFormFields;
};

type SetProps = CommonProps & {
	value: string;
};

export const SetFormContextName = ({ name, value }: SetProps) => {
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

export const SetAndTriggerContext = ({ name, value }: SetProps) => {
	const { setValue, trigger } = useFormContext<AppFormFields>();

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

export const FormMethods = () => {
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
		</div>
	);
};
