import { BoardTemplate } from '../templates';
import React from "react";
import { LessonsList } from "../../organisms";

const LessonsPage = () => {
  return (
      <BoardTemplate title="Lessons">
        <LessonsList />
      </BoardTemplate>
  );
};

export { LessonsPage };
