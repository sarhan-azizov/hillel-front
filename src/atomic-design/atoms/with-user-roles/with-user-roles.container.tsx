import React, { useState, useContext, useEffect } from 'react';

import { TypeUserRole } from './types';
import { UserRolesContext } from './user-roles.context';
import { useFetch } from "use-http";

const fetchUserRoles = async (http:any) => {
    return http.get('/user-roles');
}

export const WithUserRoles = (props: any) => {
    const userRolesContext:TypeUserRole[] = useContext(UserRolesContext);
    const [userRolesCtx, setUserRolesCtx] = useState(userRolesContext);
    const http = useFetch();

    useEffect(() => {
        if (!userRolesCtx.length) {
            fetchUserRoles(http).then(userRoles => {
                setUserRolesCtx(userRoles);
            })
        }
    }, []);

    return (
        <UserRolesContext.Provider value={userRolesCtx}>
            {props.children}
        </UserRolesContext.Provider>
    );
}