import { BoardTemplate } from '../templates';
import React from "react";
import { UsersList } from "../../organisms";
import { WithUserRoles } from "../../atoms/with-user-roles";

const UsersPage = () => {
  return (
      <BoardTemplate title="Users">
          <WithUserRoles>
              <UsersList />
          </WithUserRoles>
      </BoardTemplate>
  );
};

export { UsersPage };
