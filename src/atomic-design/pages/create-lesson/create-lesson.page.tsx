import { BoardTemplate } from '../templates';
import React from "react";
import { CreateLessonForm } from "../../organisms";

const CreateLessonPage = () => {
  return (
      <BoardTemplate title="Create Lesson">
          <CreateLessonForm />
      </BoardTemplate>
  );
};

export { CreateLessonPage };
