import React, { useContext, useEffect, useState } from "react";
import useFetch from "use-http";

import { UsersListComponent } from './user-list.component';
import { CurrentUserContext, CurrentUserContextType } from "../../atoms";
import { UserRolesContext } from "../../atoms/with-user-roles";

const userParser = ({ _id, ...user }:any) => ({
    ...user,
    createdAt: new Date(user.createdAt).toLocaleDateString(),
    updatedAt: new Date(user.updatedAt).toLocaleDateString(),
    activated: `${user.activated}`
});

const fetchUsersList = async (http:any, setUsers:any, pagination: any, filters:any) => {
    let url = `/users?page=${pagination.page + 1}&size=${pagination.perPage}`;

    if(filters.activated !== 'null') {
        url += `&activated=${filters.activated}`;
    }

    const usersResponse = await http.get(url);

    usersResponse.result = usersResponse.result.map(userParser)

    setUsers(usersResponse);
}

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
    const userRolesCtx = useContext(UserRolesContext);
    const [pagination, setPagination] = useState({ page: 0, perPage: 10 });
    const [filters, setFilters] = useState({ activated: 'null' });
    const [users, setUsers] = useState({ result: [] });
    const currentUserCtx: CurrentUserContextType = useContext(CurrentUserContext);

    const handleChange = (e: any, page: number) => {
        setPagination({
            ...pagination,
            page: Number(page)
        });
    };

    const handleChangeRowsPerPage = (e:any) => {
        setPagination({
            ...pagination,
            page: 0,
            perPage: Number(e.target.value)
        });
    };

    const handleFilter = (e:any) => {
        setFilters({
            ...filters,
            activated: e.target.value
        });
    };

    const handleChangeUser = (e:any): void => {
        const username = e.target.dataset.userId;
        const field = e.target.dataset.field;
        const newValue = e.target.value;

        updateUser(http, username, field, newValue, setUsers, users);
    };

    useEffect(() => { fetchUsersList(http, setUsers, pagination, filters); }, [pagination, filters]);

    return (
        <UsersListComponent
            data={users}
            pagination={pagination}
            filters={filters}
            userRoles={userRolesCtx}
            onChange={handleChange}
            onFilter={handleFilter}
            onChangeUser={handleChangeUser}
            isAdmin={currentUserCtx?.user.role[0]?.name === 'admin'}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    )
}