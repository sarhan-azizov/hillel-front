import React from "react";
import { useParams } from "react-router-dom";

import { BoardTemplate } from '../templates';
import { CreateLessonForm } from "../../organisms";

const CreateLessonPage = () => {
    let params: any = useParams();

    return (
      <BoardTemplate title={params.lessonId ? 'Update Lesson' : 'Create Lesson'}>
          <CreateLessonForm lessonId={params.lessonId} />
      </BoardTemplate>
    );
};

export { CreateLessonPage };
