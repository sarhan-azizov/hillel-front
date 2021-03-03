import React, { createContext } from "react";

import { CurrentUserContextType, UserType } from "./types";

export const CurrentUserContext: React.Context<CurrentUserContextType> = createContext({
    changeContext: (user: UserType): void => {},
    user: {}
});