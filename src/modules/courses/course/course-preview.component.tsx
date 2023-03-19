import React from "react";
import { Link } from "react-router-dom";
import { Card, CardMedia, CardContent } from "@mui/material";

import type { CoursePreview as CoursePreviewType } from "../types";
import { routerUrls } from "../../../consts";
import { Video } from "../../components/video";

type Props = {
  course: CoursePreviewType;
};

export const CoursePreview: React.FC<Props> = ({ course }) => {
  const [isHovering, setIsHovering] = React.useState(false);
  const videoLink = course.meta.courseVideoPreview?.link;
  const previewImageUrl = `${course.previewImageLink}/cover.webp`;
  const skills = course.meta.skills || [];

  return (
    <Card
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isHovering && videoLink ? (
        <Video
          src={videoLink}
          poster={previewImageUrl}
          aspectRatio={"16/9"}
          autoPlay
          muted
          loop
        />
      ) : (
        <CardMedia
          image={previewImageUrl}
          title={course.title}
          sx={{ aspectRatio: "16/9" }}
        />
      )}

      <CardContent>
        <Link to={routerUrls.courses.course(course.id)}>
          <strong>{course.title}</strong>
        </Link>

        <p>Lessons: {course.lessonsCount}</p>

        {skills.length > 0 && (
          <>
            <p>Skills:</p>

            <ul>
              {skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </>
        )}

        <p>Rating: {course.rating}</p>
      </CardContent>
    </Card>
  );
};
