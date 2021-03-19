import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import useFetch from "use-http";
import { useHistory } from "react-router-dom";

import { removeTokenFromCookie } from '../../../helpers';
import { ChangePasswordComponent } from './component.molecule';
import { TypeSubmitChangePasswordForm, TypeUserChangePasswordFormFields } from './types';
import { CurrentUserContext, CurrentUserContextType } from '../../atoms';
import { ROUTES } from "../../../configs";


const onSubmit = async ({ http, formData, form, history }: TypeSubmitChangePasswordForm) => {
    const changePasswordResponse = await http.patch(`/users/change-password`, {
        password: formData.password
    });

    if(!changePasswordResponse.error) {
        removeTokenFromCookie();
        history.push(ROUTES.SIGN_IN);
    } else {
        form.setError('form', changePasswordResponse);
    }
};

const ChangePasswordFormContainer = () => {
    const form = useForm();
    const http = useFetch();
    const history = useHistory();
    const currentUserCtx: CurrentUserContextType = useContext(CurrentUserContext);
    const handleSubmit = (formData: TypeUserChangePasswordFormFields) => onSubmit({
        http, formData, history, form,
    });
    const handleChange = () => form.clearErrors('form');

    return <ChangePasswordComponent
        form={form}
        initialValue={currentUserCtx.user}
        onSubmit={handleSubmit}
        onChange={handleChange}
        isSubmitting={http.loading}
    />;
};

export { ChangePasswordFormContainer };
