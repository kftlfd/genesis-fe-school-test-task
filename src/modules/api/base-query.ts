import axios from "axios";

import { api, lsKeys } from "../../consts";

const getFullUrl = (url: string) => `${api.host}/${api.version}/${url}`;

const getAuthHeader = () => {
  const token = window.localStorage.getItem(lsKeys.authToken);
  return { Authorization: `Bearer ${token}` };
};

type Args = {
  url: string;
  method?: string;
  body?: object;
};

export const baseQuery = async <ResponseType = unknown>({
  url,
  method = "GET",
  body,
}: Args) => {
  const res = await axios<ResponseType>({
    url: getFullUrl(url),
    method,
    data: body,
    headers: getAuthHeader(),
  });
  return res.data;
};
