import React from "react";
import { AxiosError } from "axios";

type Props = {
  error: unknown;
};

export const ApiError: React.FC<Props> = ({ error }) => {
  if (!error) {
    return null;
  }

  if (!(error instanceof AxiosError)) {
    return <h4>Unknown error</h4>;
  }

  const responseMessage = error.response?.data?.message;

  const errorMsg = error.message;

  return <h4>Error: {responseMessage || errorMsg}</h4>;
};
