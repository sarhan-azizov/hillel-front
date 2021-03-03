import React, { useState, useContext } from 'react';

import { UserType, CurrentUserContextType } from './types';
import { getUserFromCookie } from '../../../helpers'
import { CurrentUserContext } from './current-user.context';

export const WithCurrentUser = (props: any) => {
    const userContext:CurrentUserContextType = useContext(CurrentUserContext);
    const [userCtx, setUserCtx] = useState({
        changeContext: (user: UserType): void => {
            setUserCtx({ ...userCtx, user });
        },
        user: getUserFromCookie(userContext.user)
    });

    return (
        <CurrentUserContext.Provider value={userCtx}>
            {props.children}
        </CurrentUserContext.Provider>
    );
}