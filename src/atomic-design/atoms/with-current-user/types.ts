export type UserType = {
    username?: string;
    role?: any;
}

export type CurrentUserContextType = {
    changeContext(user: UserType): void;
    user: UserType;
}