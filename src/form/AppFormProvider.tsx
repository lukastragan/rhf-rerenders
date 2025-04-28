import type { PropsWithChildren } from "react";
import { useForm, FormProvider } from "react-hook-form";
import type { AppFormFields } from "../types";

export const AppFormProvider = ({ children }: PropsWithChildren) => {
	const methods = useForm<AppFormFields>({
		defaultValues: {
			name: "",
			surname: "",
			nameRequired: "",
			surnameRequired: "",
		},
		mode: "onChange",
	});
	return <FormProvider {...methods}>{children}</FormProvider>;
};
