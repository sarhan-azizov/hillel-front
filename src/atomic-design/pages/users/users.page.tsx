import { BoardTemplate } from '../templates';
import React from "react";
import { UsersList } from "../../organisms";

const UsersPage = () => {
  return (
      <BoardTemplate title="Users">
        <UsersList />
      </BoardTemplate>
  );
};

export { UsersPage };
