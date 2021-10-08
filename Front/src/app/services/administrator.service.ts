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
}
