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
}
