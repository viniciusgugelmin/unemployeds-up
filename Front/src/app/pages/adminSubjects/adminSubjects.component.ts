import { SubjectService } from "src/app/services/subject.service";
import { Subject } from "./../../models/subject";
import { AdministratorLoginService } from "src/app/services/administratorLogin.service";
import { Administrator } from "src/app/models/administrator";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HelperService } from "src/app/services/helper.service";
@Component({
    selector: "app-admin-subjects",
    templateUrl: "./adminSubjects.component.html",
})
export class AdminSubjectsComponent implements OnInit {
    administrator: Administrator = {
        id: 0,
        name: "",
        email: "",
        password: "",
        createdAt: "",
    };
    subjects: Array<Subject> = [];
    loading: boolean = false;

    constructor(
        private route: Router,
        private helper: HelperService,
        private service: SubjectService,
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
                await this.getSubjects();
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

    async getSubjects(): Promise<boolean> {
        return await this.service
            .get()
            .then((response) => {
                this.subjects = response.data;
                return true;
            })
            .catch((error) => {
                console.log(error.response);
                this.helper.openSnackBar(
                    "Ocorreu um erro ao tentar carregar as disciplinas"
                );
                return false;
            });
    }

    goToLogin(): void {
        this.helper.openSnackBar("Você precisa estar logado");
        this.route.navigate(["/admin"]);
    }

    delete(id: number): void {
        if (!confirm("Deseja realmente excluir esta disciplina?")) return;

        this.service
            .deleteById(id)
            .then((response) => {
                this.helper.openSnackBar("Disciplina deletada");
                this.runPromises();
            })
            .catch((error) => {
                console.log(error.response);
                this.helper.openSnackBar(
                    "Ocorreu um erro ao tentar deletar a disciplina"
                );
            });
    }
}
