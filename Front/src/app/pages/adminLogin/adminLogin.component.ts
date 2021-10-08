import { Component, OnInit } from "@angular/core";
import { HelperService } from "src/app/services/helper.service";
import { Router } from "@angular/router";
import { AdministratorLoginService } from "src/app/services/administratorLogin.service";

@Component({
    selector: "app-login",
    templateUrl: "./adminLogin.component.html",
})
export class AdminLoginComponent implements OnInit {
    constructor(
        private route: Router,
        private helper: HelperService,
        private service: AdministratorLoginService
    ) {}

    ngOnInit(): void {
        if (localStorage.getItem("up-user")) {
            //this.route.navigate(["/admin/home"]);
        }
    }

    public login(email: string, password: string) {
        this.service
            .login(email, password)
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
