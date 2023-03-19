import { useQuery } from "@tanstack/react-query";

import type { CoursePreview, Course } from "./types";
import { api, queryKeys } from "../../consts";
import { baseQuery } from "../api/base-query";

type CoursesData = {
  courses: CoursePreview[];
};

export const useCoursesListQuery = () =>
  useQuery({
    queryKey: [queryKeys.courses.previews],
    queryFn: () => baseQuery<CoursesData>({ url: api.urls.getCourses }),
    select: (data) => data.courses,
  });

export const useCourseQuery = (courseId: string) =>
  useQuery({
    queryKey: [queryKeys.courses.course, courseId],
    queryFn: () => baseQuery<Course>({ url: api.urls.getCourseById(courseId) }),
  });
