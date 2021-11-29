import { Course } from "./course";

export interface Student {
    id: number;
    courseId: number;
    name: string;
    gender: boolean;
    genderName?: string;
    birthdate: string;
    zipCode: string;
    number: string;
    complement: string;
    password?: string;
    createdAt?: string;

    course?: Course;
}
