import { ReqMethods } from "use-http";

import { CurrentUserContextType } from "../../atoms/with-current-user";

export type TypeUserSignInFormFields = {
    login: string;
    password:string;
}

export type SubmitSignInFormType = {
    http: ReqMethods;
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