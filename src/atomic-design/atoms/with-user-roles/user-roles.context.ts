import { createContext } from "react";

import { TypeUserRole } from "./types";

export const UserRolesContext = createContext<TypeUserRole[]>([]);