import { Subject } from "./subject";

export interface Course {
    id: number;
    name: string;
    description: string;
    createdAt?: string;

    subject?: Array<Subject>;
}
