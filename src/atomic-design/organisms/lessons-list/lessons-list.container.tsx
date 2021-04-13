import React, { useContext, useEffect, useState } from "react";
import useFetch from "use-http";
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';

import { queryParams } from '../../../helpers';

import { LessonsListComponent } from './lessons-list.component';
import { CurrentUserContext, CurrentUserContextType } from "../../atoms";

const dataParser = (data:any) => ({
    ...data,
    createdAt: new Date(data.createdAt).toLocaleDateString(),
    updatedAt: new Date(data.updatedAt).toLocaleDateString(),
    activated: `${data.activated}`
});

const fetchlessonsList = async (http:any, setLessons:any, filterParams:any) => {
    let url = `/lessons?page=${filterParams.page}&size=${filterParams.size}`;

    if(filterParams.activated !== 'null') {
        url += `&activated=${filterParams.activated}`;
    }

    const lesssonsResponse = await http.get(url);

    lesssonsResponse.result = lesssonsResponse.result.map(dataParser);

    setLessons(lesssonsResponse);
}

const getFilterParams = (query: any) => ({
    page: query.get('page') || 1,
    size: query.get('size') || 10,
    activated: query.get('activated') || 'null',
});

const updateLesson = async (http:any, id:string, field:string, value: string, setLessons:any, lessons:any) => {
    const val = field === 'activated' ? value === 'true' : value;

    const updatedLesson = await http.patch(`/lessons/${id}`, {
        [field]: val
    });

    setLessons({
        ...lessons,
        result: lessons.result.map((lesson: any) => {
            if (lesson._id !== id) {
                return lesson;
            }

            return dataParser(updatedLesson)
        })
    })
}

const deleteLesson = async (http:any, id:string) => {
    await http.delete(`/lessons/${id}`);
}

export const LessonsListContainer = () => {
    const http = useFetch();
    const query = queryParams(useLocation().search);
    const history = useHistory();
    const [lessons, setLessons] = useState({ result: [] });
    const currentUserCtx: CurrentUserContextType = useContext(CurrentUserContext);

    const handleChange = (e: any, page: number) => {
        query.set('page', String(page));

        history.push({ search: query.toString() });
    };

    const handleChangeRowsPerPage = (e:any) => {
        query.set('page', String(1));
        query.set('size', e.target.value);

        history.push({ search: query.toString() });
    };

    const handleFilter = (e:any) => {
        query.set('page', String(1));
        query.set('activated', e.target.value);
        history.push({ search: query.toString() });
    };

    const handleEditLesson = async (e: any) => {
        const lessonId = e.currentTarget.dataset.lessonId;

        history.push(`${history.location.pathname}/${lessonId}`);
    }

    const handleChangeLesson = (e:any): void => {
        const lessonId = e.target.dataset.lessonId;
        const field = e.target.dataset.field;
        const newValue = e.target.value;

        updateLesson(http, lessonId, field, newValue, setLessons, lessons);
    };

    const filterParams = getFilterParams(query);

    const handleDeleteLesson = async (e: any) => {
        const id = e.currentTarget.dataset.lessonId;
        const filterParams = getFilterParams(query);
        await deleteLesson(http, id);

        fetchlessonsList(http, setLessons, filterParams);
    }

    useEffect(() => {
        fetchlessonsList(http, setLessons, filterParams);

        const unregisterHistoryListener = history.listen((listener) => {
            const query = queryParams(listener.search);

            if(listener.search) {
                fetchlessonsList(http, setLessons, getFilterParams(query));
            }
        });

        return () => {
            unregisterHistoryListener();
        }
    }, []);

    const canEdit = ['admin', 'mentor'].includes(currentUserCtx?.user.role[0]?.name)

    return (
        <LessonsListComponent
            data={lessons}
            filterParams={filterParams}
            onChange={handleChange}
            onFilter={handleFilter}
            onEdit={handleEditLesson}
            onDelete={handleDeleteLesson}
            onChangeLesson={handleChangeLesson}
            canEdit={canEdit}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    )
}