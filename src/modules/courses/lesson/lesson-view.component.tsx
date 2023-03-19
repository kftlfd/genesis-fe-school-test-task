import React from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import { Container, Card, IconButton, styled } from "@mui/material";
import { Close } from "@mui/icons-material";

import type { Params, CourseViewOutletContext } from "../types";
import { routerUrls } from "../../../consts";
import { Video } from "../../components/video";

export const LessonView: React.FC = () => {
  const { lessonId } = useParams<Params>();
  const { courseId, lessons } = useOutletContext<CourseViewOutletContext>();
  const navigate = useNavigate();

  const lesson = React.useMemo(
    () => lessons.find((l) => l.id === lessonId),
    [lessonId, lessons]
  );

  const isLocked = lesson?.status === "locked";

  const goBack = () => navigate(routerUrls.courses.course(courseId));

  return (
    <Backdrop onClick={goBack}>
      <Container maxWidth="md" onClick={(e) => e.stopPropagation()}>
        <LessonContainer>
          <Header>
            <h2>
              {lesson ? `${lesson.order}. ${lesson.title}` : "Lesson not found"}
            </h2>

            <IconButton onClick={goBack}>
              <Close />
            </IconButton>
          </Header>

          {lesson &&
            (isLocked ? (
              <div>Lesson is locked</div>
            ) : (
              lesson.link && (
                <Video
                  src={lesson.link}
                  poster={`${lesson.previewImageLink}/lesson-${lesson.order}.webp`}
                  controls
                  keyboardConrols
                  aspectRatio="16/9"
                  saveProgress
                />
              )
            ))}
        </LessonContainer>
      </Container>
    </Backdrop>
  );
};

const Backdrop = styled("div")({
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.6)",
  overflowY: "scroll",
});

const LessonContainer = styled(Card)({
  padding: "2rem",
  marginBlock: "1rem",
});

const Header = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
});
