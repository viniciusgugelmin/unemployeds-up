import axios from "axios";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Course } from "../models/course";

@Injectable({
    providedIn: "root",
})
export class CourseService {
    apiUrl: string;

    constructor() {
        this.apiUrl = environment.apiUrl + "api/course";
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
    async getSubjects(id: number) {
        return await axios.get(`${this.apiUrl}/${id}/subjects`);
    }

    // Put
    async update(course: Course) {
        return await axios.put(`${this.apiUrl}`, course);
    }

    // Post
    async create(course: Course) {
        return await axios.post(`${this.apiUrl}`, course);
    }

    // Delete
    async deleteById(id: number) {
        return await axios.delete(`${this.apiUrl}/${id}/`);
    }

    /// Methods

    validate(checkoutForm: any, helper: any) {
        if (!checkoutForm.value.name) {
            helper.openSnackBar("O nome é obrigatório");
            return false;
        }

        return true;
    }
}
