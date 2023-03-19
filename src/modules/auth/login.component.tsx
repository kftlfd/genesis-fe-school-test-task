import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Container } from "@mui/material";

export const Login: React.FC = () => {
  const [searchParams] = useSearchParams();

  React.useEffect(() => {
    document.title = "Login";
  }, []);

  const next = searchParams.get("next") || "/";
  const errorMsg = searchParams.get("error");

  return (
    <Container maxWidth="md">
      {errorMsg && <h2>{errorMsg}</h2>}

      <h1>Login</h1>

      <Link to={next}>Retry</Link>
    </Container>
  );
};
