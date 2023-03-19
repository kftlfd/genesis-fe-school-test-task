import React from "react";
import { useParams, Link, Outlet } from "react-router-dom";
import { Container } from "@mui/material";

import type { Params, CourseViewOutletContext } from "../types";
import { routerUrls } from "../../../consts";
import { ApiError } from "../../components/api-error";
import { LoadingSpinner } from "../../components/loading";
import { useCourseQuery } from "../queries";
import { LessonPreview } from "../lesson/lesson-preview.component";
import { CourseInfo } from "./course-info.component";

export const CourseView: React.FC = () => {
  const { courseId } = useParams<Params>();
  const { data: course, error, isFetching } = useCourseQuery(courseId!);

  const sortedLessons = React.useMemo(
    () => course?.lessons?.sort((a, b) => a.order - b.order) || [],
    [course]
  );

  const outletContext: CourseViewOutletContext = {
    courseId: courseId || "",
    lessons: sortedLessons,
  };

  React.useEffect(() => {
    document.title = course?.title || "Course";
  }, [course]);

  return (
    <Container maxWidth="lg" sx={{ paddingBlock: "3rem" }}>
      <Link to={routerUrls.courses.courses}>Back to courses list</Link>

      <ApiError error={error} />

      {isFetching && <LoadingSpinner />}

      {course && (
        <>
          <h1>{course.title}</h1>

          <CourseInfo course={course} />

          <h2>Lessons</h2>

          <div>
            {sortedLessons.map((lesson) => (
              <LessonPreview
                key={lesson.id}
                lesson={lesson}
                courseId={course.id}
              />
            ))}
          </div>

          <Outlet context={outletContext} />
        </>
      )}
    </Container>
  );
};
