import axios from "axios";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Administrator } from "../models/administrator";

@Injectable({
    providedIn: "root",
})
export class AdministratorService {
    apiUrl: string;

    constructor() {
        this.apiUrl = environment.apiUrl + "api/administrator";
    }

    // Get
    async get() {
        return await axios.get(`${this.apiUrl}`);
    }

    // Get
    async getById(id: number) {
        return await axios.get(`${this.apiUrl}/${id}/`);
    }

    // Put
    async update(administrator: Administrator) {
        return await axios.put(`${this.apiUrl}`, administrator);
    }

    // Post
    async create(administrator: Administrator) {
        return await axios.post(`${this.apiUrl}`, administrator);
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

        if (!checkoutForm.value.email) {
            helper.openSnackBar("O email é obrigatório");
            return false;
        }

        if (!helper.isEmail(checkoutForm.value.email)) {
            helper.openSnackBar("O email é inválido");
            return false;
        }

        if (checkoutForm.value.changePassword && !checkoutForm.value.password) {
            helper.openSnackBar("A senha é obrigatória");
            return false;
        }

        if (
            checkoutForm.value.changePassword &&
            checkoutForm.value.password !== checkoutForm.value.confirmPassword
        ) {
            helper.openSnackBar("As senhas não conferem");
            return false;
        }

        return true;
    }
}
