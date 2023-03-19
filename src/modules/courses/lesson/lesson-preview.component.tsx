import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardActionArea, styled } from "@mui/material";
import { Lock } from "@mui/icons-material";

import type { Lesson } from "../types";
import { routerUrls } from "../../../consts";
import { formatTimeFromSeconds } from "../utils";

type Props = {
  lesson: Lesson;
  courseId: string;
};

export const LessonPreview: React.FC<Props> = ({ lesson, courseId }) => {
  const navigate = useNavigate();

  const goToLesson = () =>
    navigate(routerUrls.courses.lesson(courseId, lesson.id));

  const locked = lesson.status === "locked";

  const title = `${lesson.order}. ${lesson.title}`;

  const videoDuration =
    lesson.type === "video"
      ? ` (${formatTimeFromSeconds(lesson.duration)})`
      : "";

  const fullTitle = `${title}${videoDuration}`;

  return (
    <LessonCard>
      <ActionArea disabled={locked} onClick={goToLesson}>
        <div>{fullTitle}</div>

        {locked && <Lock />}
      </ActionArea>
    </LessonCard>
  );
};

const LessonCard = styled(Card)({
  marginBlock: "1rem",
});

const ActionArea = styled(CardActionArea)(
  ({ disabled, theme: { spacing } }) => ({
    padding: spacing(2),
    display: "flex",
    justifyContent: "space-between",
    opacity: disabled ? 0.5 : 1,
  })
);
