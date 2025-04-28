import { type ComponentType, memo, type PropsWithoutRef } from "react";
import type {
	FieldValues,
	FieldPath,
	Control,
	UseFormGetValues,
	PathValue,
} from "react-hook-form";
import { useFormContext, useWatch } from "react-hook-form";

export type FormWatchControlValues<TFieldValues extends FieldValues> =
	| {
			control: Control<TFieldValues>;
			getValues: UseFormGetValues<TFieldValues>;
	  }
	| {
			control?: undefined;
			getValues?: undefined;
	  };

export type UseFormWatchParams<
	TFieldValues extends FieldValues,
	TFieldName extends FieldPath<TFieldValues>,
> = FormWatchControlValues<TFieldValues> & {
	name: TFieldName;
};

export const useFormWatch = <
	TFieldValues extends FieldValues,
	TFieldName extends FieldPath<TFieldValues>,
>({
	name,
	control: controlProp,
	getValues: getValuesProp,
}: UseFormWatchParams<TFieldValues, TFieldName>) => {
	const { control, getValues } = useFormContext<TFieldValues>() ?? {
		control: controlProp,
		getValues: getValuesProp,
	};

	// subscribe
	useWatch<TFieldValues, TFieldName>({
		name,
		control,
		exact: true,
	});

	// get latest value, see "rules" {@link https://react-hook-form.com/docs/usewatch}
	return getValues(name);
};

export type WatchedFieldType<
	TFieldValues extends FieldValues,
	TFieldName extends FieldPath<TFieldValues>,
> = {
	watchedFieldValue: PathValue<TFieldValues, TFieldName>;
};

export const withFormWatch =
	<
		TFieldValues extends FieldValues,
		TFieldName extends FieldPath<TFieldValues>,
	>(
		watchParams: UseFormWatchParams<TFieldValues, TFieldName>,
		componentName: string,
	) =>
	<
		TProps extends Record<string, unknown> &
			WatchedFieldType<TFieldValues, TFieldName>,
	>(
		Component: ComponentType<TProps>,
	) => {
		const MemoedComponent = memo(Component);
		MemoedComponent.displayName = componentName;

		const WatchedComponent: ComponentType<Omit<TProps, "watchedFieldValue">> = (
			props,
		) => {
			const watchedFieldValue = useFormWatch<TFieldValues, TFieldName>(
				watchParams,
			);

			const resultProps = {
				...props,
				watchedFieldValue,
			} as PropsWithoutRef<TProps>;

			return <MemoedComponent {...resultProps} />;
		};

		WatchedComponent.displayName = `Watched(${componentName})`;
		return WatchedComponent;
	};
