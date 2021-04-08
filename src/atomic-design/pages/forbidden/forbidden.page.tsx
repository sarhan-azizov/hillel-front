import { BoardTemplate } from '../templates';
import React from "react";

const ForbiddenPage = () => {
  return (
      <BoardTemplate title="Forbidden">
          Your user doesn't have appropriate permission
      </BoardTemplate>
  );
};

export { ForbiddenPage };
