import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { routerParams } from "../../consts";
import { SplashScreen } from "../components/splash-screen";
import { CheckAuth } from "../auth";

const Login = React.lazy(() => import("../auth/routes/login"));
const Error = React.lazy(() => import("../components/error-page"));
const CoursesList = React.lazy(() => import("../courses/routes/couse-list"));
const CourseView = React.lazy(() => import("../courses/routes/course-view"));
import LessonView from "../courses/routes/lesson-view";

export const MainRouter: React.FC = () => (
  <BrowserRouter>
    <Suspense fallback={<SplashScreen />}>
      <Routes>
        <Route path="/" element={<Navigate to="/courses/" />} />
        <Route path="/login" element={<Login />} />

        <Route
          path={"/courses/"}
          element={<CheckAuth children={<CoursesList />} />}
        />

        <Route
          path={`/courses/:${routerParams.courses.courseId}`}
          element={<CheckAuth children={<CourseView />} />}
        >
          <Route
            path={`lessons/:${routerParams.courses.lessonId}`}
            element={<LessonView />}
          />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);
