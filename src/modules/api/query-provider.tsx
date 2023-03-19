import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
      cacheTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
});

type Props = {
  children?: React.ReactNode;
};

export const QueryProvider: React.FC<Props> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {/* <ReactQueryDevtools /> */}
    {children}
  </QueryClientProvider>
);
