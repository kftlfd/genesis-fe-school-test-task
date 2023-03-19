import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import React from "react";

const theme = createTheme();

type Props = {
  children?: React.ReactNode;
};

export const ThemeProvider: React.FC<Props> = ({ children }) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </MuiThemeProvider>
);
