import React, { useState, useContext } from 'react';
import { useForm } from "react-hook-form";
import useFetch from "use-http";

import { removeTokenFromCookie } from '../../../helpers';
import { ChangePasswordComponent } from './component.molecule';
import { SubmitChangePasswordFormType, TypeUserChangePasswordFormFields } from './types';
import { CurrentUserContext, CurrentUserContextType } from '../../atoms';


const onSubmit = async ({ http, formData, form, setLoading }: SubmitChangePasswordFormType) => {
    setLoading(true);

    const changePasswordResponse = await http.patch(`/users/change-password`, {
        password: formData.password
    });

    setLoading(false);

    if(!changePasswordResponse.error) {
        removeTokenFromCookie();
        window.location.reload();
    } else {
        form.setError('form', changePasswordResponse);
    }
};

const ChangePasswordFormContainer = () => {
    const form = useForm();
    const http = useFetch();
    const [loading, setLoading ] = useState(false);
    const currentUserCtx: CurrentUserContextType = useContext(CurrentUserContext);
    const handleSubmit = (formData: TypeUserChangePasswordFormFields) => onSubmit({
        http, formData, form, setLoading
    });
    const handleChange = () => form.clearErrors('form');
    console.log(form)
    return <ChangePasswordComponent
        form={form}
        initialValue={currentUserCtx.user}
        onSubmit={handleSubmit}
        onChange={handleChange}
        isSubmitting={loading}
    />;
};

export { ChangePasswordFormContainer };
