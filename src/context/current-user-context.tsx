import React, { createContext, useState, useContext } from 'react';
import cookie from 'js-cookie';
import * as JWT from 'jsonwebtoken';

export type User = {
    username?: string;
    role?: string;
}

export type CurrentUserContextType = {
    changeContext(user: User): void;
    user: any;
}

export const CurrentUserContext: React.Context<CurrentUserContextType> = createContext({
    changeContext: (user: User): void => {},
    user: {}
});

export const getUserFromToken = ({ token }: { token: string }): any => {
    const bearerToken = token.replace('Bearer ', '')

    return JWT.decode(bearerToken);
}

export const getCurrentUserFromCookie = (user: User): any => {
    const token = cookie.get('Authorization') || '';

    return token ? getUserFromToken({ token }) : user;
};

export const WithCurrentUser = (props: any) => {
    const userContext:CurrentUserContextType = useContext(CurrentUserContext);
    const [userCtx, setUserCtx] = useState({
        changeContext: (user: User): void => {
            setUserCtx({ ...userCtx, user });
        },
        user: getCurrentUserFromCookie(userContext.user)
    });

    console.log(userCtx);

    return (
        <CurrentUserContext.Provider value={userCtx}>
            {props.children}
        </CurrentUserContext.Provider>
    );
}