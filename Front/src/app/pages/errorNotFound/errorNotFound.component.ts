import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-error-not-found",
    templateUrl: "./errorNotFound.component.html",
})
export class ErrorNotFoundComponent implements OnInit, OnDestroy {
    constructor(public route: Router) {
        document.body.classList.add("up-error__body");
    }

    ngOnInit(): void {}

    ngOnDestroy(): void {
        document.body.classList.remove("up-error__body");
    }

    public logout(): void {
        localStorage.removeItem("up-admin-user");
        this.route.navigate(["/admin"]);
    }
}
