export const api = {
  host: "http://api.wisey.app/api",
  version: "v1",
  urls: {
    getAuthToken: "auth/anonymous?platform=subscriptions",
    getCourses: "core/preview-courses",
    getCourseById: (courseId: string) => `core/preview-courses/${courseId}`,
  },
};

export const routerParams = {
  courses: {
    courseId: "courseId",
    lessonId: "lessonId",
  },
};

export const routerUrls = {
  courses: {
    courses: "/courses/",
    course: (courseId: string) => `/courses/${courseId}/`,
    lesson: (courseId: string, lessonId: string) =>
      `/courses/${courseId}/lessons/${lessonId}/`,
  },
  auth: {
    login: (next?: string, error?: string) =>
      `/login${next ? `?next=${next}` : ""}${error ? `&error=${error}` : ""}`,
  },
};

export const queryKeys = {
  auth: {
    token: "authToken",
  },
  courses: {
    previews: "coursePreviews",
    course: "course",
  },
};

export const lsKeys = {
  authToken: "authToken",
  coursesPage: "coursesPage",
  videoProgress: (videoId: string) => `videoProgress:${videoId}`,
};
