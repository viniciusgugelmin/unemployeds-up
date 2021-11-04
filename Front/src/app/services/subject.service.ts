import { Subject } from "./../models/subject";
import axios from "axios";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class SubjectService {
    apiUrl: string;

    constructor() {
        this.apiUrl = environment.apiUrl + "api/subject";
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
        return await axios.get(`${this.apiUrl}/${id}/subject-skills`);
    }

    // Put
    async update(subject: Subject) {
        return await axios.put(`${this.apiUrl}`, subject);
    }

    // Post
    async create(subject: Subject) {
        return await axios.post(`${this.apiUrl}`, subject);
    }

    // Delete
    async deleteById(id: number) {
        return await axios.delete(`${this.apiUrl}/${id}/`);
    }
}
