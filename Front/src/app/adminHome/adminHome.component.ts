import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HelperService } from "../services/helper.service";

@Component({
    selector: "app-admin-home",
    templateUrl: "./adminHome.component.html",
})
export class AdminHomeComponent implements OnInit {
    constructor(private route: Router, private helper: HelperService) {}

    ngOnInit(): void {
        if (!localStorage.getItem("up-user")) {
            this.goToLogin();
        }
    }

    goToLogin() {
        this.helper.openSnackBar("You must be logged");
        this.route.navigate(["admin"]);
    }
}
