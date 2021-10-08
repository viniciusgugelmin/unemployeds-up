import axios from "axios";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root",
})
export class AdministratorLoginService {
    apiUrl: string;

    constructor() {
        this.apiUrl = environment.apiUrl + "api/administrator/login";
    }

    // Post
    async login(email: string, password: string) {
        return await axios.post(`${this.apiUrl}`, {
            Email: email,
            Password: password,
        });
    }
}
