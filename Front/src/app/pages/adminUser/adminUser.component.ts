import { AdministratorLoginService } from "src/app/services/administratorLogin.service";
import { Administrator } from "src/app/models/administrator";
import { AdministratorService } from "src/app/services/administrator.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HelperService } from "src/app/services/helper.service";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder } from "@angular/forms";

@Component({
    selector: "app-admin-user",
    templateUrl: "./adminUser.component.html",
})
export class AdminUserComponent implements OnInit {
    administrator: Administrator = {
        id: 0,
        name: "",
        email: "",
        password: "",
        createdAt: "",
    };
    loading: boolean = false;
    checkoutForm = this.formBuilder.group({
        name: "",
        email: "",
        changePassword: false,
        password: "",
        confirmPassword: "",
    });
    idParam: number = 0;

    constructor(
        private route: Router,
        private $route: ActivatedRoute,
        private helper: HelperService,
        private service: AdministratorService,
        private loginService: AdministratorLoginService,
        private formBuilder: FormBuilder
    ) {
        this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    ngOnInit(): void {
        if (!localStorage.getItem("up-admin-user")) {
            this.goToLogin();
            return;
        }

        this.runPromises();
    }

    runPromises(): void {
        const promiseUserIsCached = async (): Promise<boolean> => {
            return await this.checkIfAdministratorIsCached();
        };

        const promiseUserExists = async (): Promise<boolean> => {
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
                await this.getAdminstrator();
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
            this.helper.openSnackBar("Usuário não autenticado");
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
                this.helper.openSnackBar("Usuário não autenticado");
                this.goToLogin();
                return false;
            });
    }

    async getAdminstrator(): Promise<boolean> {
        let isTheSameAdministrator = false;
        this.idParam = 0;
        this.$route.params.forEach((p) => {
            if (p.id && p.id == this.administrator.id) {
                isTheSameAdministrator = true;
            }

            if (p.id) {
                this.idParam = p.id;
            }
        });

        if (isTheSameAdministrator) {
            this.checkoutForm.setValue({
                name: this.administrator.name,
                email: this.administrator.email,
                changePassword: false,
                password: "",
                confirmPassword: "",
            });
            return await true;
        }

        if (!this.idParam) {
            this.checkoutForm.setValue({
                name: "",
                email: "",
                changePassword: true,
                password: "",
                confirmPassword: "",
            });
            return await true;
        }

        return await this.service
            .getById(this.idParam)
            .then((response) => {
                this.administrator = response.data;
                this.checkoutForm.setValue({
                    name: this.administrator.name,
                    email: this.administrator.email,
                    changePassword: false,
                    password: "",
                    confirmPassword: "",
                });
                return true;
            })
            .catch((error) => {
                console.log(error.response);
                this.helper.openSnackBar(
                    "Ocorreu um erro ao tentar carregar o administrador"
                );
                return false;
            });
    }

    goToLogin(): void {
        this.helper.openSnackBar("Você precisa estar logado");
        this.route.navigate(["/admin"]);
    }

    public onSubmit(): void {
        const administratorAux: Administrator = {
            id: this.idParam !== 0 ? this.administrator.id : this.idParam,
            name: this.checkoutForm.value.name,
            email: this.checkoutForm.value.email,
            password:
                this.idParam !== 0
                    ? this.checkoutForm.value.changePassword
                        ? this.checkoutForm.value.password
                        : this.administrator.password
                    : this.checkoutForm.value.password,
        };

        let validationOkay = this.service.validate(
            this.checkoutForm,
            this.helper
        );

        if (!validationOkay) {
            return;
        }

        this.service[this.idParam !== 0 ? "update" : "create"](administratorAux)
            .then((response) => {
                this.helper.openSnackBar(
                    `Administrador ${
                        this.idParam !== 0 ? "atualizado" : "criado"
                    } com sucesso`
                );
                this.route.navigate(["/admin/users"]);
                return true;
            })
            .catch((error) => {
                console.log(error.response);
                this.helper.openSnackBar(
                    `Ocorreu um erro ao tentar ${
                        this.idParam !== 0 ? "atualizar" : "criar"
                    } o administrador`
                );
            });
    }
}
