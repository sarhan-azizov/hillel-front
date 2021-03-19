import { ReqMethods } from "use-http";

import { CurrentUserContextType } from "../../atoms/with-current-user";
import { History } from "history";

export type TypeUserSignInFormFields = {
    login: string;
    password:string;
}

export type SubmitSignInFormType = {
    http: ReqMethods;
    currentUserCtx: CurrentUserContextType;
    history: History;
    formData: TypeUserSignInFormFields;
    form: any;
}

export type TypeSignInComponentAPI = {
    form: any;
    onSubmit(formData: TypeUserSignInFormFields): void;
    onChange(): void;
    isSubmitting: boolean;
}