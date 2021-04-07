import React, { useContext, useEffect, useState } from "react";
import useFetch from "use-http";

import { UsersListComponent } from './user-list.component';
import { CurrentUserContext, CurrentUserContextType } from "../../atoms";

const userParser = ({ password, ...user }:any) => ({
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

const activeUser = async (http:any, username:string, activated:string, setUsers:any, users:any) => {
    const updatedUser = await http.patch(`/users/${username}`, {
        activated: activated === "true"
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

    const handleActivate = (e:any): void => {
        activeUser(http, e.target.dataset.userId, e.target.value, setUsers, users);
    };

    useEffect(() => { fetchUsersList(http, setUsers, pagination, filters); }, [pagination, filters]);

    const data = React.useMemo(() => users,[users]);

    return (
        <UsersListComponent
            data={data}
            pagination={pagination}
            filters={filters}
            onChange={handleChange}
            onFilter={handleFilter}
            onActive={handleActivate}
            isAdmin={currentUserCtx?.user.role === 'admin'}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    )
}