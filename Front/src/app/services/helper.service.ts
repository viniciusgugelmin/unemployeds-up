import { MatSnackBar } from "@angular/material/snack-bar";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class HelperService {
    constructor(private snackBar: MatSnackBar) {}

    openSnackBar(message: string, timeout: number = 5) {
        this.snackBar.open(message);

        setTimeout(() => {
            this.snackBar.dismiss();
        }, timeout * 1000);
    }

    isEmail(email: any) {
        const re =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    isEmpty(value: any) {
        return value === undefined || value === null || value === "";
    }

    isEmptyArray(value: any) {
        return value === undefined || value === null || value.length === 0;
    }

    isEmptyObject(value: any) {
        return (
            value === undefined ||
            value === null ||
            Object.keys(value).length === 0
        );
    }
}
