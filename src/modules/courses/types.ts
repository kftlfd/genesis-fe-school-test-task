import { routerParams } from "../../consts";

export type Params = typeof routerParams.courses;

export type CourseViewOutletContext = {
  courseId: string;
  lessons: Lesson[];
};

export interface Course {
  id: string;
  title: string;
  tags: string[];
  launchDate: string;
  status: string;
  description: string;
  duration: number;
  previewImageLink: string;
  rating: number;
  meta: CourseMeta;
  lessons: Lesson[];
  containsLockedLessons: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  duration: number;
  order: number;
  type: string;
  status: string;
  link?: string;
  previewImageLink: string;
  meta?: any;
}

type CourseMeta = {
  slug: string;
  skills?: string[];
  courseVideoPreview?: CourseVideoPreview;
};

interface CourseVideoPreview {
  link: string;
  duration: number;
  previewImageLink: string;
}

export interface CoursePreview {
  id: string;
  title: string;
  tags: string[];
  launchDate: string;
  status: string;
  description: string;
  duration: number;
  lessonsCount: number;
  containsLockedLessons: boolean;
  previewImageLink: string;
  rating: number;
  meta: CoursePreviewMeta;
}

type CoursePreviewMeta = {
  slug: string;
  skills?: string[];
  courseVideoPreview?: CourseVideoPreview;
};

interface CourseVideoPreview {
  link: string;
  duration: number;
  previewImageLink: string;
}
