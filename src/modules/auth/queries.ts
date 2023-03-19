import { useQuery } from "@tanstack/react-query";

import type { AuthData } from "./types";
import { api, queryKeys } from "../../consts";
import { baseQuery } from "../api/base-query";

export const useAuthQuery = () =>
  useQuery({
    queryKey: [queryKeys.auth.token],
    queryFn: () => baseQuery<AuthData>({ url: api.urls.getAuthToken }),
    select: (data) => data.token,
  });
