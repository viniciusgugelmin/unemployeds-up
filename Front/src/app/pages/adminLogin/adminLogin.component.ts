import { Component, OnInit } from "@angular/core";
import axios from "axios";

@Component({
    selector: "app-login",
    templateUrl: "./adminLogin.component.html",
})
export class AdminLoginComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {
        seedAdministrator();

        function seedAdministrator() {
            axios
                .post(`https://localhost:5001/api/administrator/`, {
                    Name: "Lorem Ipsum",
                    Email: "test@gmail.com",
                    Password: "123456",
                })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
}
