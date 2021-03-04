import { ReqMethods } from "use-http";
import { HTTP_RESPONSE } from "../../../configs";

export type TypeUserSignUpRequest = {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export type TypeUserSignUpFormFields = TypeUserSignUpRequest & { confirmPassword: string };

export type TypeUserSignUpResponse = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    activated: boolean;
    createdAt: Date;
    updatedAt: Date;
} & { error: string }

export type SubmitSignUpFormType = {
    http: ReqMethods;
    formData: TypeUserSignUpFormFields;
    form: any;
    setSignUpState(response: HTTP_RESPONSE): void
    signUpResponse: HTTP_RESPONSE
}

export type TypeSignUpComponentAPI = {
    form: any;
    onSubmit(formData: TypeUserSignUpFormFields): void;
    onChange(): void;
    isSubmitting: boolean;
}