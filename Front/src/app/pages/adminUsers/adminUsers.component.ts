import { AdministratorLoginService } from "src/app/services/administratorLogin.service";
import { Administrator } from "src/app/models/administrator";
import { AdministratorService } from "src/app/services/administrator.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HelperService } from "src/app/services/helper.service";
@Component({
    selector: "app-admin-users",
    templateUrl: "./adminUsers.component.html",
})
export class AdminUsersComponent implements OnInit {
    administrator: Administrator = {
        id: 0,
        name: "",
        email: "",
        password: "",
        createdAt: "",
    };
    administrators: Array<Administrator> = [];
    loading: boolean = false;

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
            //console.log("promiseUserIsCached");
            return await this.checkIfAdministratorIsCached();
        };

        const promiseUserExists = async (): Promise<boolean> => {
            //console.log("promiseUserExists");
            return await this.checkAdminUserExists();
        };

        this.loading = true;

        promiseUserIsCached()
            .then((response) => {
                if (!response) throw Error;
            })
            .then(async () => {
                if (await !promiseUserExists()) throw Error;
            })
            .then(async () => {
                await this.getAdminstrators();
            })
            .finally(() => {
                this.loading = false;
            });
    }

    checkIfAdministratorIsCached(): boolean {
        this.administrator = JSON.parse(
            localStorage.getItem("up-admin-user") ?? "{}"
        );

        if (!this.administrator.email || !this.administrator.password) {
            localStorage.removeItem("up-admin-user");
            this.helper.openSnackBar("Usu??rio n??o autenticado");
            this.goToLogin();
            return false;
        }

        return true;
    }

    async checkAdminUserExists(): Promise<boolean> {
        return await this.loginService
            .login(this.administrator.email, this.administrator.password ?? "")
            .then((response) => {
                localStorage.setItem(
                    "up-admin-user",
                    JSON.stringify(response.data)
                );

                this.administrator = response.data;
                return true;
            })
            .catch((error) => {
                console.log(error.response);
                localStorage.removeItem("up-admin-user");
                this.helper.openSnackBar("Usu??rio n??o autenticado");
                this.goToLogin();
                return false;
            });
    }

    async getAdminstrators(): Promise<boolean> {
        return await this.service
            .get()
            .then((response) => {
                this.administrators = response.data;
                return true;
            })
            .catch((error) => {
                console.log(error.response);
                this.helper.openSnackBar(
                    "Ocorreu um erro ao tentar carregar os administradores"
                );
                return false;
            });
    }

    goToLogin(): void {
        this.helper.openSnackBar("Voc?? precisa estar logado");
        this.route.navigate(["/admin"]);
    }

    delete(id: number): void {
        if (id === this.administrator.id) {
            this.helper.openSnackBar("Voc?? n??o pode deletar voc?? mesmo");
            return;
        }

        if (!confirm("Deseja realmente excluir este administrador?")) return;

        this.service
            .deleteById(id)
            .then((response) => {
                this.helper.openSnackBar("Administrador deletado");
                this.runPromises();
            })
            .catch((error) => {
                console.log(error.response);
                this.helper.openSnackBar(
                    "Ocorreu um erro ao tentar deletar o administrador"
                );
            });
    }
}
