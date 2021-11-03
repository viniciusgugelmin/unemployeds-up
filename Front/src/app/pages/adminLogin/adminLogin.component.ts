import { Component, OnInit } from "@angular/core";
import { HelperService } from "src/app/services/helper.service";
import { Router } from "@angular/router";
import { AdministratorLoginService } from "src/app/services/administratorLogin.service";

@Component({
    selector: "app-login",
    templateUrl: "./adminLogin.component.html",
})
export class AdminLoginComponent implements OnInit {
    loading: boolean = false;

    constructor(
        private route: Router,
        private helper: HelperService,
        private service: AdministratorLoginService
    ) {}

    ngOnInit(): void {
        if (localStorage.getItem("up-admin-user")) {
            this.goToLogin(true);
        }
    }

    public login(email: string, password: string) {
        this.loading = true;

        if (!email || !password) {
            this.helper.openSnackBar("Preencha todos os campos");
            this.loading = false;
            return;
        }

        this.service
            .login(email, password)
            .then((response) => {
                localStorage.setItem(
                    "up-admin-user",
                    JSON.stringify(response.data)
                );
                this.helper.openSnackBar("Logado com sucesso!");

                this.goToLogin();
            })
            .catch((error) => {
                const errorMessage = error.response.data.detail
                    ? "Preencha todos os campos"
                    : "Usuário não encontrado";

                console.log(error.response);
                this.helper.openSnackBar(errorMessage);
            })
            .finally(() => {
                this.loading = false;
            });
    }

    goToLogin(init: boolean = false) {
        this.route.navigate(["/admin/home"]);
        init ? this.helper.openSnackBar("Usuário já está logado") : false;
    }
}
