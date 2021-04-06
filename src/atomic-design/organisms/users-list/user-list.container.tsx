import React, { useContext, useEffect, useState } from "react";
import useFetch from "use-http";

import { UsersListComponent } from './user-list.component';
import { CurrentUserContext, CurrentUserContextType } from "../../atoms";

const fetchUsersList = async (http:any, setUsers:any, pagination: any, filters:any) => {
    let url = `/users?page=${pagination.page + 1}&size=${pagination.perPage}`;

    if(filters.activated !== 'null') {
        url += `&activated=${filters.activated}`;
    }

    const usersResponse = await http.get(url);

    usersResponse.result = usersResponse.result.map(({ password, ...item }:any ) => ({
        ...item,
        createdAt: new Date(item.createdAt).toLocaleDateString(),
        updatedAt: new Date(item.updatedAt).toLocaleDateString(),
        activated: `${item.activated}`
    }))

    setUsers(usersResponse);
}

const activeUser = async (http:any, username:string, activated:string, setUsers:any, users:any) => {
    await http.patch(`/users/${username}`, {
        activated: activated === "true"
    });

    setUsers({
        ...users,
        result: users.result.map((user: any) => {
            if (user.username !== username) {
                return user;
            }

            return { ...user, activated }
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

    const handleActivate = (e:any) => {
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