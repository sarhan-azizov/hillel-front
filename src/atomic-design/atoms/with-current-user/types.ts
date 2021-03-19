export type UserType = {
    username?: string;
    role?: string;
}

export type CurrentUserContextType = {
    changeContext(user: UserType): void;
    user: UserType;
}