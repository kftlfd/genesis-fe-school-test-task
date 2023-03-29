import React from "react";
import { useSearchParams } from "react-router-dom";
import { Container, Pagination, styled } from "@mui/material";

import { ApiError } from "../../components/api-error";
import { LoadingSpinner } from "../../components/loading";
import { config } from "../conf";
import { useCoursesListQuery } from "../queries";
import { CoursePreview } from "./course-preview.component";

const { COURSES_ON_PAGE } = config;

export const CoursesList: React.FC = () => {
  const { data: courses, error, isFetching } = useCoursesListQuery();

  const [searchParams, setSearchParams] = useSearchParams();

  const coursesRef = React.useRef<HTMLDivElement | null>(null);

  const [page, setPage] = React.useState(() => {
    const inURL = Number(searchParams.get("page"));
    return !isNaN(inURL) && inURL > 0 ? inURL : 1;
  });

  const goToPage = (newPage: number) => {
    setPage(newPage);
    coursesRef.current?.scrollIntoView({ behavior: "smooth" });
    setSearchParams({ page: `${newPage}` });
  };

  const coursesPage = React.useMemo(() => {
    if (!courses) return [];
    const start = (page - 1) * COURSES_ON_PAGE;
    const end = start + COURSES_ON_PAGE;
    return courses.slice(start, end);
  }, [courses, page]);

  React.useEffect(() => {
    document.title = "Courses";
  }, []);

  return (
    <PageContainer maxWidth="lg">
      <h1>Courses</h1>

      <ApiError error={error} />

      {isFetching && <LoadingSpinner />}

      {courses && (
        <>
          <CoursesContainer ref={coursesRef}>
            {coursesPage.map((course) => (
              <CoursePreview key={course.id} course={course} />
            ))}
          </CoursesContainer>

          <StyledPagination
            page={page}
            count={Math.ceil(courses.length / COURSES_ON_PAGE)}
            onChange={(_, newPage) => goToPage(newPage)}
          />
        </>
      )}
    </PageContainer>
  );
};

const PageContainer = styled(Container)(({ theme: { spacing } }) => ({
  paddingBlock: spacing(6),
}));

const CoursesContainer = styled("div")(({ theme: { spacing } }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  alignItems: "start",
  columnGap: spacing(2),
  rowGap: spacing(3),
  paddingBlock: spacing(4),
}));

const StyledPagination = styled(Pagination)(({ theme: { spacing } }) => ({
  marginTop: spacing(4),
  display: "flex",
  justifyContent: "center",
}));
