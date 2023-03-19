import React from "react";
import Hls from "hls.js";
import { IconButton, Tooltip, styled } from "@mui/material";
import { PictureInPictureAlt, Info } from "@mui/icons-material";

import { lsKeys } from "../../consts";

const controlKeys = {
  speedUp: "k",
  slowDown: "j",
};

const keyboardControlsTooltip = (
  <>
    <div>Available keyboard controls:</div>
    <ul style={{ margin: 0, paddingLeft: "1rem" }}>
      <li>{controlKeys.slowDown} — slow down</li>
      <li>{controlKeys.speedUp} — speed up</li>
    </ul>
  </>
);

type Props = {
  src: string;
  aspectRatio?: string;
  keyboardConrols?: boolean;
  saveProgress?: boolean;
  height?: number | string;
  width?: number | string;
  controls?: boolean;
  poster?: string;
  muted?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
};

export const Video: React.FC<Props> = ({
  src,
  keyboardConrols,
  saveProgress,
  ...videoProps
}) => {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  React.useEffect(() => {
    const vidEl = videoRef.current;

    if (!vidEl || !Hls.isSupported()) {
      return;
    }

    const hls = new Hls();
    hls.loadSource(src);
    hls.attachMedia(vidEl);
    hls.on(Hls.Events.ERROR, (err, data) => {
      console.error({ err, data });
    });
  }, []);

  React.useEffect(() => {
    const vidEl = videoRef.current;

    if (!vidEl || !saveProgress) {
      return;
    }

    const savedTime = Number(
      window.localStorage.getItem(lsKeys.videoProgress(src))
    );
    const timeToSet = !isNaN(savedTime) ? savedTime : 0;
    vidEl.currentTime = timeToSet;

    const saveCurrProgress = () => {
      window.localStorage.setItem(
        lsKeys.videoProgress(src),
        `${vidEl.currentTime}`
      );
    };

    vidEl.addEventListener("timeupdate", saveCurrProgress);

    return () => vidEl.removeEventListener("timeupdate", saveCurrProgress);
  }, []);

  React.useEffect(() => {
    const vidEl = videoRef.current;

    if (!vidEl || !keyboardConrols) {
      return;
    }

    const speedControls = (e: KeyboardEvent) => {
      if (e.key === controlKeys.slowDown) {
        vidEl.playbackRate -= 0.2;
      } else if (e.key === controlKeys.speedUp) {
        vidEl.playbackRate += 0.2;
      }
    };

    document.addEventListener("keydown", speedControls);

    return () => document.removeEventListener("keydown", speedControls);
  }, []);

  const handlePiP = () => {
    const vidEl = videoRef.current;

    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
    } else if (vidEl && document.pictureInPictureEnabled) {
      vidEl.requestPictureInPicture();
    }
  };

  const showButtons = keyboardConrols || document.pictureInPictureEnabled;

  return (
    <VideoContainer>
      <StyledVideo ref={videoRef} {...videoProps} />

      <ButtonsContainer show={showButtons}>
        {keyboardConrols && (
          <Tooltip title={keyboardControlsTooltip}>
            <IconButton>
              <Info />
            </IconButton>
          </Tooltip>
        )}
        {document.pictureInPictureEnabled && (
          <IconButton onClick={handlePiP}>
            <PictureInPictureAlt />
          </IconButton>
        )}
      </ButtonsContainer>
    </VideoContainer>
  );
};

const VideoContainer = styled("div")({
  position: "relative",
});

type StyledVideoProps = { aspectRatio?: string };
const StyledVideo = styled("video", {
  shouldForwardProp: (prop) => prop !== "aspectRatio",
})<StyledVideoProps>(({ aspectRatio }) => ({
  display: "block",
  width: "100%",
  ...(aspectRatio && { aspectRatio }),
}));

type ButtonsContainerProps = { show?: boolean };
const ButtonsContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "show",
})<ButtonsContainerProps>(({ show, theme: { spacing, palette } }) => ({
  display: show ? "flex" : "none",
  position: "absolute",
  top: spacing(0.5),
  right: spacing(0.5),
  backgroundColor: palette.background.default,
  borderRadius: spacing(0.5),
  padding: spacing(0.5),
  gap: spacing(0.5),
  opacity: 0,
  transition: "opacity 0.2s ease",

  "div:hover > &": {
    opacity: 1,
  },
}));
