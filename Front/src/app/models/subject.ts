import { Course } from "./course";

export interface Subject {
    id: number;
    courseId: number;
    name: string;
    description: string;
    createdAt?: string;

    course?: Course;
}
