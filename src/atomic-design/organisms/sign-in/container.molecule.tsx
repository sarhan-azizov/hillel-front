import React, { useContext, useState } from 'react';
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

const onSubmit = async ({ http, currentUserCtx, history, formData, form, setLoading }: SubmitSignInFormType) => {
    setLoading(true);

    const signInResponse = await authorize({ http, formData });

    setLoading(false);

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
    const [loading, setLoading ] = useState(false);
    const currentUserCtx: CurrentUserContextType = useContext(CurrentUserContext);
    const handleSubmit = (formData: TypeUserSignInFormFields) => onSubmit({
        http, currentUserCtx, history, formData, form, setLoading
    });
    const handleChange = () => form.clearErrors('form');

    return <SignInFormComponent form={form} onSubmit={handleSubmit} onChange={handleChange} isSubmitting={loading} />;
};

export { SignInFormContainer };
