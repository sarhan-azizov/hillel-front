import { ReqMethods } from "use-http";
import { HTTP_RESPONSE } from "../../../configs";

export type TypeLessonRequest = {
    name: string;
    description: string;
    activated: boolean;
}

export type TypeLessonResponse = TypeLessonRequest & {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}

export type TypeHTTPLessonResponse = HTTP_RESPONSE & {
    data: TypeLessonResponse
}

export type TypeSubmitLessonForm = {
    http: ReqMethods;
    formData: TypeLessonRequest;
    form: any;
    setLesson(response: HTTP_RESPONSE): void
    lessonResponse: HTTP_RESPONSE
}

export type TypeLessonComponentAPI = {
    form: any;
    onSubmit(formData: TypeLessonRequest): void;
    onChange(): void;
    isSubmitting: boolean;
}