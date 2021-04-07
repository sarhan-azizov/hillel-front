import * as JWT from "jsonwebtoken";
import cookie from "js-cookie";

import { UserType } from "../atomic-design";

export const getUserFromToken = ({ token }: { token: string }): any => {
    const bearerToken = token.replace('Bearer ', '')

    return JWT.decode(bearerToken);
}

export const getTokenFromCookie = () => cookie.get('Authorization') || '';

export const removeTokenFromCookie = () => cookie.remove('Authorization');

export const getUserFromCookie = (user: UserType): any => {
    const token = getTokenFromCookie();

    return token ? getUserFromToken({ token }) : user;
};