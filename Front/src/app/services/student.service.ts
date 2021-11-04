import axios from "axios";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Student } from "../models/student";

@Injectable({
    providedIn: "root",
})
export class StudentService {
    apiUrl: string;

    constructor() {
        this.apiUrl = environment.apiUrl + "api/student";
    }

    // Get
    async get() {
        return await axios.get(`${this.apiUrl}`);
    }

    // Get
    async getById(id: number) {
        return await axios.get(`${this.apiUrl}/${id}/`);
    }

    // Get
    async getSkills(id: number) {
        return await axios.get(`${this.apiUrl}/${id}/student-skills`);
    }

    // Get
    async getVacancies(id: number) {
        return await axios.get(`${this.apiUrl}/${id}/student-vacancies`);
    }

    // Put
    async update(student: Student) {
        return await axios.put(`${this.apiUrl}`, student);
    }

    // Post
    async create(student: Student) {
        return await axios.post(`${this.apiUrl}`, student);
    }

    // Delete
    async deleteById(id: number) {
        return await axios.delete(`${this.apiUrl}/${id}/`);
    }
}
