import axios from "axios";
import { Component, OnInit } from "@angular/core";
import { HelperService } from "src/app/services/helper.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-login",
    templateUrl: "./adminLogin.component.html",
})
export class AdminLoginComponent implements OnInit {
    constructor(private route: Router, private helper: HelperService) {}

    ngOnInit(): void {
        if (localStorage.getItem("up-user")) {
            //this.route.navigate(["/admin/home"]);
        }
    }

    public login(email: string, password: string) {
        axios
            .post(`https://localhost:5001/api/administrator/login/`, {
                Email: email,
                Password: password,
            })
            .then((response) => {
                localStorage.setItem("up-user", JSON.stringify(response.data));
                this.helper.openSnackBar("Login successful");

                //this.route.navigate(["/admin/home"]);
            })
            .catch((error) => {
                console.log(error.response);
                this.helper.openSnackBar("Error, check the console!");
            });
    }
}
