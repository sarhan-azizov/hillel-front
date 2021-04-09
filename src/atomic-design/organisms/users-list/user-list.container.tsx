import React, { useContext, useEffect, useState } from "react";
import useFetch from "use-http";
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';

import { queryParams } from '../../../helpers';

import { UsersListComponent } from './user-list.component';
import { CurrentUserContext, CurrentUserContextType } from "../../atoms";
import { UserRolesContext } from "../../atoms/with-user-roles";

const userParser = ({ _id, ...user }:any) => ({
    ...user,
    role: user.role.length ? user.role[0].name : "null",
    createdAt: new Date(user.createdAt).toLocaleDateString(),
    updatedAt: new Date(user.updatedAt).toLocaleDateString(),
    activated: `${user.activated}`
});

const fetchUsersList = async (http:any, setUsers:any, filterParams:any) => {
    let url = `/users?page=${filterParams.page}&size=${filterParams.size}`;

    if(filterParams.activated !== 'null') {
        url += `&activated=${filterParams.activated}`;
    }

    const usersResponse = await http.get(url);

    usersResponse.result = usersResponse.result.map(userParser);

    setUsers(usersResponse);
}

const getFilterParams = (query: any) => ({
    page: query.get('page') || 1,
    size: query.get('size') || 10,
    activated: query.get('activated') || 'null',
});

const updateUser = async (http:any, username:string, field:string, value: string, setUsers:any, users:any) => {
    const val = field === 'activated' ? value === 'true' : value;

    const updatedUser = await http.patch(`/users/${username}`, {
        [field]: val
    });

    setUsers({
        ...users,
        result: users.result.map((user: any) => {
            if (user.username !== username) {
                return user;
            }

            return userParser(updatedUser)
        })
    })
}

export const UsersListContainer = () => {
    const http = useFetch();
    const query = queryParams(useLocation().search);
    const history = useHistory();
    const userRolesCtx = useContext(UserRolesContext);
    const [users, setUsers] = useState({ result: [] });
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

    const handleChangeUser = (e:any): void => {
        const username = e.target.dataset.userId;
        const field = e.target.dataset.field;
        const newValue = e.target.value;

        updateUser(http, username, field, newValue, setUsers, users);
    };

    const filterParams = getFilterParams(query);

    useEffect(() => {
        fetchUsersList(http, setUsers, filterParams);

        const unregisterHistoryListener = history.listen((listener) => {
            const query = queryParams(listener.search);
            fetchUsersList(http, setUsers, getFilterParams(query));
        });

        return () => {
            unregisterHistoryListener();
        }
    }, []);

    return (
        <UsersListComponent
            data={users}
            filterParams={filterParams}
            userRoles={userRolesCtx}
            onChange={handleChange}
            onFilter={handleFilter}
            onChangeUser={handleChangeUser}
            isAdmin={currentUserCtx?.user.role[0]?.name === 'admin'}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    )
}