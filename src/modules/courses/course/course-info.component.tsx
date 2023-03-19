import React from "react";
import { styled } from "@mui/material";

import type { Course } from "../types";
import { Video } from "../../components/video";

type Props = {
  course: Course;
};

export const CourseInfo: React.FC<Props> = ({ course }) => {
  const skills = course.meta.skills;
  const videoLink = course.meta.courseVideoPreview?.link;

  return (
    <CourseInfoContainer>
      <CourseDescriptionContainer>
        <p>{course.description}</p>

        <p>
          <strong>Lessons:</strong> {course.lessons.length}
        </p>

        <p>
          <strong>Status:</strong> {course.status}
        </p>

        <p>
          <strong>Launch date:</strong>{" "}
          {new Date(course.launchDate).toDateString()}
        </p>

        {skills && (
          <>
            <p>
              <strong>Skills:</strong>
            </p>

            <ul>
              {skills.map((skill, index) => (
                <li key={`$${index}-${skill}`}>{skill}</li>
              ))}
            </ul>
          </>
        )}

        <p>
          <strong>Rating:</strong> {course.rating}
        </p>

        {course.tags && (
          <TagsBox>
            <strong>Tags:</strong>

            {course.tags.map((tag, index) => (
              <Tag key={`${index}-${tag}`}>{tag}</Tag>
            ))}
          </TagsBox>
        )}
      </CourseDescriptionContainer>

      {videoLink && (
        <Video
          src={videoLink}
          poster={course.previewImageLink + "/cover.webp"}
          aspectRatio="16/9"
          controls
          keyboardConrols
          saveProgress
        />
      )}
    </CourseInfoContainer>
  );
};

const CourseInfoContainer = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  rowGap: "1rem",
  columnGap: "2rem",

  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "3fr 2fr",
  },
}));

const CourseDescriptionContainer = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    order: 2,
  },
}));

const TagsBox = styled("div")({
  display: "flex",
  gap: "0.4rem",
  flexWrap: "wrap",
});

const Tag = styled("span")({
  display: "inline-block",
  padding: "0.2rem 0.4rem",
  border: "1px solid lightblue",
  borderRadius: "4px",
  backgroundColor: "aliceblue",
  fontSize: "0.9rem",
});
