import { Administrator } from "./../../models/administrator";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-admin-aside",
    templateUrl: "./adminAside.component.html",
})
export class AdminAsideComponent implements OnInit {
    administrator: Administrator = {
        id: 0,
        name: "",
        email: "",
        password: "",
        createdAt: "",
    };

    constructor(public route: Router) {
        this.getAdministrator();
    }

    ngOnInit(): void {}

    getAdministrator(): void {
        this.administrator = JSON.parse(
            localStorage.getItem("up-admin-user") ?? "{}"
        );
    }

    public logout(): void {
        localStorage.removeItem("up-admin-user");
        this.route.navigate(["/admin"]);
    }
}
