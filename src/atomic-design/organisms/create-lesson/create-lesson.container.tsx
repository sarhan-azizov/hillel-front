import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import useFetch, { ReqMethods } from "use-http";
import { Redirect } from "react-router-dom";

import { CreateLessonFormComponent } from './create-lesson.component';
import { HTTP_INITIAL_STATE, ROUTES } from '../../../configs';
import { TypeLessonRequest, TypeHTTPLessonResponse } from './types';

const createLesson = async({ http, formData }: { http: ReqMethods, formData: TypeLessonRequest }): Promise<TypeHTTPLessonResponse> =>
    await http.post(`/lessons`, formData)

const updateLesson = async({ http, formData, lessonId }: any): Promise<TypeHTTPLessonResponse> =>
    await http.patch(`/lessons/${lessonId}`, formData)

const fetchLesson = async({ http, lessonId, form, lessonResponse, setLesson }: any): Promise<void> => {
    setLesson({ ...lessonResponse, loading: true });

    const response = await http.get(`/lessons/${lessonId}`);

    form.reset(response)

    if(response.error) {
        setLesson({ ...lessonResponse, error: response, loading: false });
        form.setError('form', response);
    } else {
        setLesson({ ...lessonResponse, data: response, loading: false });
    }
}

const onSubmit = async ({ http, formData, form, setLesson, lessonResponse, lessonId, setSubmitted }: any) => {
    setLesson({ ...lessonResponse, loading: true });

    const response = lessonId
        ? await updateLesson({ http, formData, lessonId })
        : await createLesson({ http, formData })

    if(response.error) {
        setLesson({ ...lessonResponse, error: response, loading: false });
        form.setError('form', response);
    } else {
        setLesson({ ...lessonResponse, data: response, loading: false });
        setSubmitted(true)
    }
};

export const CreateLessonFormContainer = (props: any) => {
    const form = useForm({ defaultValues: { activated: true } });
    const http = useFetch();
    const [lessonResponse, setLesson] = useState(HTTP_INITIAL_STATE);
    const [submitted, setSubmitted] = useState(false);
    const handleSubmit = (formData: TypeLessonRequest) => onSubmit({
        http, formData, form, setLesson, lessonResponse, lessonId: props.lessonId, setSubmitted
    });
    const handleChange = () => { /*form.clearErrors('form')*/};

    useEffect(() => {
        if (props.lessonId) {
            fetchLesson({ http, lessonId: props.lessonId, form, lessonResponse, setLesson });
        }
    }, []);


    return submitted
        ? <Redirect to={ROUTES.LESSONS} />
        : <CreateLessonFormComponent form={form} isEdit={props.lessonId} onSubmit={handleSubmit} onChange={handleChange} isSubmitting={lessonResponse.loading} />;
};