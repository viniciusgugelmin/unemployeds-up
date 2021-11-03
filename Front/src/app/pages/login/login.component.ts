import { HelperService } from "src/app/services/helper.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
    constructor(private route: Router, private helper: HelperService) {}

    ngOnInit(): void {
        // TODO replace when finish student login
        this.redirectToAdmin();
    }

    redirectToAdmin() {
        this.route.navigate(["/admin"]);
        this.helper.openSnackBar(
            "Login para estudantes ainda não está funcionando!"
        );
    }
}
