import { AdministratorLoginService } from "src/app/services/administratorLogin.service";
import { Administrator } from "src/app/models/administrator";
import { AdministratorService } from "src/app/services/administrator.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HelperService } from "src/app/services/helper.service";

@Component({
    selector: "app-admin-home",
    templateUrl: "./adminHome.component.html",
})
export class AdminHomeComponent implements OnInit {
    administrator: Administrator = {
        id: 0,
        name: "",
        email: "",
        password: "",
        createdAt: "",
    };
    totalAdministrators: number = 0;

    constructor(
        private route: Router,
        private helper: HelperService,
        private service: AdministratorService,
        private loginService: AdministratorLoginService
    ) {}

    ngOnInit(): void {
        if (!localStorage.getItem("up-admin-user")) {
            this.goToLogin();
            return;
        }

        this.runPromises();
    }

    runPromises(): void {
        const promiseUserIsCached = async (): Promise<boolean> => {
            console.log("promiseUserIsCached");
            return await this.checkIfAdministratorIsCached();
        };

        const promiseUserExists = async (): Promise<boolean> => {
            console.log("promiseUserExists");
            return await this.checkAdminUserExists();
        };

        const promiseGetUsers = async (): Promise<boolean> => {
            console.log("promiseGetUsers");
            return await this.getUsers();
        };

        promiseUserIsCached()
            .then((response) => {
                if (!response) throw Error;
            })
            .then(async () => {
                if (await !promiseUserExists()) throw Error;
            })
            .then(async () => {
                promiseGetUsers();
            });
    }

    checkIfAdministratorIsCached(): boolean {
        this.administrator = JSON.parse(
            localStorage.getItem("up-admin-user") ?? "{}"
        );

        if (!this.administrator.email || !this.administrator.password) {
            this.helper.openSnackBar("Usuário não autenticado");
            this.goToLogin();
            return false;
        }

        return true;
    }

    async checkAdminUserExists(): Promise<boolean> {
        return await this.loginService
            .login(this.administrator.email, this.administrator.password)
            .then((response) => {
                localStorage.setItem(
                    "up-admin-user",
                    JSON.stringify(response.data)
                );

                return true;
            })
            .catch((error) => {
                console.log(error.response);
                this.helper.openSnackBar("Usuário não autenticado");
                this.goToLogin();
                return false;
            });
    }

    async getUsers(): Promise<boolean> {
        return await this.service
            .get()
            .then((response) => {
                this.totalAdministrators = response.data.length;
                return true;
            })
            .catch((error) => {
                console.log(error.response);
                this.helper.openSnackBar(
                    "Ocorreu um erro ao tentar carregar os adminsitradores"
                );
                return false;
            });
    }

    goToLogin(): void {
        this.helper.openSnackBar("Você precisa estar logado");
        this.route.navigate(["/admin"]);
    }
}
