import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import useFetch, { ReqMethods } from "use-http";
import { Redirect } from "react-router-dom";

import { CreateLessonFormComponent } from './create-lesson.component';
import { HTTP_INITIAL_STATE, ROUTES } from '../../../configs';
import { TypeSubmitLessonForm, TypeLessonRequest, TypeHTTPLessonResponse } from './types';

const createLesson = async({ http, formData }: { http: ReqMethods, formData: TypeLessonRequest }): Promise<TypeHTTPLessonResponse> =>
    await http.post(`/lessons`, formData)

const onSubmit = async ({ http, formData, form, setLesson, lessonResponse }: TypeSubmitLessonForm) => {
    setLesson({ ...lessonResponse, loading: true });

    const response = await createLesson({ http, formData });

    if(response.error) {
        setLesson({ ...lessonResponse, error: response, loading: false });
        form.setError('form', response);
    } else {
        setLesson({ ...lessonResponse, data: response, loading: false });
    }
};

export const CreateLessonFormContainer = () => {
    const form = useForm();
    const http = useFetch();
    const [lessonResponse, setLesson] = useState(HTTP_INITIAL_STATE);
    const handleSubmit = (formData: TypeLessonRequest) => onSubmit({
        http, formData, form, setLesson, lessonResponse
    });
    const handleChange = () => form.clearErrors('form');

    return lessonResponse.data
        ? <Redirect to={ROUTES.LESSONS} />
        : <CreateLessonFormComponent form={form} onSubmit={handleSubmit} onChange={handleChange} isSubmitting={lessonResponse.loading} />;
};