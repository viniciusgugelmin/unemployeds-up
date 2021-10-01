import { Component, OnInit } from "@angular/core";
import axios from "axios";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
    title = "Unemployeds";

    // mounted
    ngOnInit(): void {
        this.checkIfExistsAdministrator();
    }

    checkIfExistsAdministrator() {
        axios
            .get(`https://localhost:5001/api/administrator/`)
            .then((response) => {
                if (response.data.length === 0) {
                    this.seedAdministrator();
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    seedAdministrator() {
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
