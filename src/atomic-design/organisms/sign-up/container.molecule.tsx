import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import useFetch, { ReqMethods } from "use-http";

import { SignUpFormComponent } from './component.molecule';
import { HTTP_INITIAL_STATE } from '../../../configs'
import { SignUpFormSuccessComponent } from './success';
import { SubmitSignUpFormType, TypeUserSignUpFormFields, TypeUserSignUpRequest, TypeUserSignUpResponse } from './types';


const signUp = async({ http, signUpData }: { http: ReqMethods, signUpData: TypeUserSignUpRequest }) =>
    await http.post(`/users/registration`, signUpData)

const onSubmit = async ({ http, formData, form, signUpResponse, setSignUpState }: SubmitSignUpFormType) => {
    setSignUpState({ ...signUpResponse, loading: true });

    const { confirmPassword, ...signUpData } = formData;
    const response: TypeUserSignUpResponse = await signUp({ http, signUpData });

    if(response.error) {
        setSignUpState({ ...signUpResponse, error: response, loading: false });
        form.setError('form', response);
    } else {
        setSignUpState({ ...signUpResponse, data: response, loading: false });
    }
};

const SignUpFormContainer = () => {
    const form = useForm();
    const http = useFetch();
    const [signUpState, setSignUpState] = useState(HTTP_INITIAL_STATE);
    const handleSubmit = (formData: TypeUserSignUpFormFields) => onSubmit({
        http, formData, form, setSignUpState, signUpResponse: signUpState
    });
    const handleChange = () => form.clearErrors('form');

    return signUpState.data
        ? <SignUpFormSuccessComponent username={signUpState.data.username} />
        : <SignUpFormComponent form={form} onSubmit={handleSubmit} onChange={handleChange} isSubmitting={signUpState.loading} />;
};

export { SignUpFormContainer };
