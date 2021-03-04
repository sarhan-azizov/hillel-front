import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import useFetch from "use-http";
import { Redirect } from "react-router-dom";

import { TypeHttpGet, ROUTES } from "../../../configs";
import { CurrentUserContext, CurrentUserContextType } from "../../atoms/with-current-user";
import { getUserFromToken } from '../../../helpers';
import { SignInFormComponent } from './component.molecule';
import { SubmitSignInFormType, TypeUserSignInFormFields } from './types';


const authorize = async({ get, formData }: { get: TypeHttpGet, formData: TypeUserSignInFormFields }) => {
    const params = decodeURIComponent(`username=${formData.login}&password=${formData.password}`);

    return await get(`/users/authorization?${params}`);
}

const onSubmit = async ({ get, currentUserCtx, formData, form, setLoading }: SubmitSignInFormType) => {
    setLoading(true);

    const signInResponse = await authorize({ get, formData });

    setLoading(false);

    if(!signInResponse.error) {
        currentUserCtx.changeContext(getUserFromToken(signInResponse));
    } else {
        form.setError('form', signInResponse);
    }
};

const SignInFormContainer = () => {
    const form = useForm();
    const { get } = useFetch();
    const [loading, setLoading ] = useState(false);
    const currentUserCtx: CurrentUserContextType = useContext(CurrentUserContext);
    const handleSubmit = (formData: TypeUserSignInFormFields) => onSubmit({
        get, currentUserCtx, formData, form, setLoading
    });
    const handleChange = () => form.clearErrors('form');

    return currentUserCtx.user.username
        ? <Redirect to={ROUTES.HOME} />
        : <SignInFormComponent form={form} onSubmit={handleSubmit} onChange={handleChange} isSubmitting={loading} />;
};

export { SignInFormContainer };
