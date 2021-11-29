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

    /// Methods

    validate(checkoutForm: any, helper: any) {
        if (!checkoutForm.value.name) {
            helper.openSnackBar("O nome é obrigatório");
            return false;
        }

        if (checkoutForm.value.courseId === 0) {
            helper.openSnackBar("O curso é obrigatório");
            return false;
        }

        if (!checkoutForm.value.birthdate) {
            helper.openSnackBar("A data de aniversário é obrigatório");
            return false;
        }

        if (
            !checkoutForm.value.zipCode ||
            checkoutForm.value.zipCode.toString().length !== 8
        ) {
            helper.openSnackBar("O CEP é obrigatório");
            return false;
        }

        if (!checkoutForm.value.number) {
            helper.openSnackBar("O número é obrigatório");
            return false;
        }

        if (!checkoutForm.value.complement) {
            helper.openSnackBar("A rua é obrigatória");
            return false;
        }

        return true;
    }
}
