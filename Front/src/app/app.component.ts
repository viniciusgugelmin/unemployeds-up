import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: [],
})
export class AppComponent implements OnInit {
    title = "Unemployeds";

    ngOnInit(): void {
        console.log("Hello world!");
    }
}
