import * as JWT from "jsonwebtoken";
import cookie from "js-cookie";

import { UserType } from "../atomic-design/atoms/with-current-user/types";

export const getUserFromToken = ({ token }: { token: string }): any => {
    const bearerToken = token.replace('Bearer ', '')

    return JWT.decode(bearerToken);
}

export const getUserFromCookie = (user: UserType): any => {
    const token = cookie.get('Authorization') || '';

    return token ? getUserFromToken({ token }) : user;
};