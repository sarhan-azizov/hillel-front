import { ReqMethods } from "use-http";
import { UserType } from "../../atoms/with-current-user";
import { History } from "history";

export type TypeUserChangePasswordFormFields = {
    password: string;
    confirmPassword: string;
}

export type TypeSubmitChangePasswordForm = {
    http: ReqMethods;
    formData: TypeUserChangePasswordFormFields;
    history: History;
    form: any;
}

export type TypeChangePasswordComponentProps = {
    form: any;
    initialValue: UserType,
    onSubmit(formData: TypeUserChangePasswordFormFields): void;
    onChange(): void;
    isSubmitting: boolean;
}