import React from "react";

import { QueryProvider } from "../api";
import { ThemeProvider } from "../theme";
import { MainRouter } from "../router";

export const App: React.FC = () => {
  return (
    <QueryProvider>
      <ThemeProvider>
        <MainRouter />
      </ThemeProvider>
    </QueryProvider>
  );
};
