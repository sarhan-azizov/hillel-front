import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import useFetch from "use-http";
import { Redirect } from "react-router-dom";

import { ROUTES } from "../../../configs";
import { CurrentUserContext, CurrentUserContextType } from "../../atoms/with-current-user";
import { getUserFromToken } from '../../../helpers';
import { SignInFormComponent } from './component.molecule';
import { UserCredentialsType } from './types';

const onSubmit = async (http: any, currentUserCtx: CurrentUserContextType, data: UserCredentialsType, form: any) => {
    const params = decodeURIComponent(`username=${data.login}&password=${data.password}`);
    const response = await http.get(`/users/authorization?${params}`);

    if(!response.error) {
        currentUserCtx.changeContext(getUserFromToken(response));
    } else {
        form.setError('form', response);
    }
};

const SignInFormContainer = () => {
    const form = useForm();
    const http = useFetch();
    const currentUserCtx: CurrentUserContextType = useContext(CurrentUserContext);
    const handleSubmit = (formData: UserCredentialsType) => onSubmit(http, currentUserCtx, formData, form);
    const handleChange = () => form.clearErrors('form');

    return currentUserCtx.user.username
        ? <Redirect to={ROUTES.HOME} />
        : <SignInFormComponent form={form} onSubmit={handleSubmit} onChange={handleChange} />;
};

export { SignInFormContainer };
