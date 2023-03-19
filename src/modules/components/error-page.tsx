import React from "react";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";

const ErrorPage: React.FC = () => {
  React.useEffect(() => {
    document.title = "Error";
  }, []);

  return (
    <Container maxWidth="md">
      <h1>Page not found</h1>

      <Link to={"/"}>Home</Link>
    </Container>
  );
};

export default ErrorPage;
