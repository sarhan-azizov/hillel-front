import { ReqMethods } from "use-http";
import { UserType } from "../../atoms/with-current-user";

export type TypeUserChangePasswordFormFields = {
    password: string;
    confirmPassword: string;
}

export type SubmitChangePasswordFormType = {
    http: ReqMethods;
    formData: TypeUserChangePasswordFormFields;
    form: any;
    setLoading(loading: boolean): void
}

export type TypeChangePasswordComponentAPI = {
    form: any;
    initialValue: UserType,
    onSubmit(formData: TypeUserChangePasswordFormFields): void;
    onChange(): void;
    isSubmitting: boolean;
}