import { AdministratorService } from "./../../services/administrator.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HelperService } from "../../services/helper.service";

@Component({
    selector: "app-admin-home",
    templateUrl: "./adminHome.component.html",
})
export class AdminHomeComponent implements OnInit {
    totalAdministrators: number = 0;

    constructor(
        private route: Router,
        private helper: HelperService,
        private service: AdministratorService
    ) {}

    ngOnInit(): void {
        if (!localStorage.getItem("up-user")) {
            this.goToLogin();
            return;
        }

        this.getUsers();
    }

    goToLogin() {
        this.helper.openSnackBar("You must be logged");
        this.route.navigate(["/admin"]);
    }

    getUsers() {
        this.service.get().then((response) => {
            this.totalAdministrators = response.data.length;
        });
    }
}
