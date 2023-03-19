import React from "react";
import { AxiosError } from "axios";
import { Navigate } from "react-router-dom";

import { lsKeys, routerUrls } from "../../consts";
import { SplashScreen } from "../components/splash-screen";
import { useAuthQuery } from "./queries";

type Props = {
  children?: React.ReactNode;
};

export const CheckAuth: React.FC<Props> = ({ children }) => {
  const { data: token, error, isFetching } = useAuthQuery();

  React.useEffect(() => {
    if (!token) return;
    window.localStorage.setItem(lsKeys.authToken, token);
  }, [token]);

  const errorMsg =
    error instanceof AxiosError
      ? error.response?.data?.message || error.message
      : undefined;

  return isFetching ? (
    <SplashScreen message="Authenticating" />
  ) : !token ? (
    <Navigate to={routerUrls.auth.login(window.location.pathname, errorMsg)} />
  ) : (
    <>{children}</>
  );
};
