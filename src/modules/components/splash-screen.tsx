import React from "react";
import { CircularProgress, styled } from "@mui/material";

type Props = {
  message?: string;
};

export const SplashScreen: React.FC<Props> = ({ message }) => (
  <Wrapper>
    <CenteredDiv>
      <CircularProgress size={"10vh"} />

      {message && <Message>{message}</Message>}
    </CenteredDiv>
  </Wrapper>
);

const Wrapper = styled("div")({
  position: "absolute",
  inset: 0,
  display: "grid",
  placeContent: "center",
});

const CenteredDiv = styled("div")({
  position: "relative",
});

const Message = styled("div")({
  position: "absolute",
  top: "110%",
  left: "50%",
  transform: "translateX(-50%)",
});
