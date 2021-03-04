import { CurrentUserContextType } from "../../atoms/with-current-user";
import { TypeHttpGet } from "../../../configs";

export type TypeUserSignInFormFields = {
    login: string;
    password:string;
}

export type SubmitSignInFormType = {
    get: TypeHttpGet;
    currentUserCtx: CurrentUserContextType;
    formData: TypeUserSignInFormFields;
    form: any;
    setLoading(loading: boolean): void
}

export type TypeSignInComponentAPI = {
    form: any;
    onSubmit(formData: TypeUserSignInFormFields): void;
    onChange(): void;
    isSubmitting: boolean;
}