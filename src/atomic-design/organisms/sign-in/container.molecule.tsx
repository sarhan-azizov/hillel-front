import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import useFetch, { ReqMethods } from "use-http";
import { useHistory } from 'react-router-dom';

import { CurrentUserContext, CurrentUserContextType } from "../../atoms/with-current-user";
import { getUserFromToken } from '../../../helpers';
import { SignInFormComponent } from './component.molecule';
import { SubmitSignInFormType, TypeUserSignInFormFields } from './types';
import { ROUTES } from "../../../configs";


const authorize = async({ http, formData }: { http: ReqMethods, formData: TypeUserSignInFormFields }) => {
    const params = decodeURIComponent(`username=${formData.login}&password=${formData.password}`);

    return await http.get(`/auth?${params}`);
}

const onSubmit = async ({ http, currentUserCtx, history, formData, form }: SubmitSignInFormType) => {
    const signInResponse = await authorize({ http, formData });

    if(!signInResponse.error) {
        currentUserCtx.changeContext(getUserFromToken(signInResponse));
        history.push(ROUTES.HOME);
    } else {
        form.setError('form', signInResponse);
    }
};

const SignInFormContainer = () => {
    const form = useForm();
    const http = useFetch();
    const history = useHistory();
    const currentUserCtx: CurrentUserContextType = useContext(CurrentUserContext);
    const handleSubmit = (formData: TypeUserSignInFormFields) => onSubmit({
        http, currentUserCtx, history, formData, form
    });
    const handleChange = () => form.clearErrors('form');

    return <SignInFormComponent form={form} onSubmit={handleSubmit} onChange={handleChange} isSubmitting={http.loading} />;
};

export { SignInFormContainer };
