import { Student } from "./../../models/student";
import { AdministratorLoginService } from "src/app/services/administratorLogin.service";
import { Administrator } from "src/app/models/administrator";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HelperService } from "src/app/services/helper.service";
import { StudentService } from "src/app/services/student.service";
@Component({
    selector: "app-admin-students",
    templateUrl: "./adminStudents.component.html",
})
export class AdminStudentsComponent implements OnInit {
    administrator: Administrator = {
        id: 0,
        name: "",
        email: "",
        password: "",
        createdAt: "",
    };
    /*
    student: Student = {
        id: 0,
        courseId: 0,
        name: "",
        gender: true,
        birthade: "",
        zipcode: 0,
        complement: "",
        password: "",
        createdAt: "",
    };
    */
    students: Array<Student> = [];
    loading: boolean = false;

    constructor(
        private route: Router,
        private helper: HelperService,
        private service: StudentService,
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
                await this.getStudents();
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

    async getStudents(): Promise<boolean> {
        return await this.service
            .get()
            .then((response) => {
                this.students = response.data;
                return true;
            })
            .catch((error) => {
                console.log(error.response);
                this.helper.openSnackBar(
                    "Ocorreu um erro ao tentar carregar os estudantes"
                );
                return false;
            });
    }

    goToLogin(): void {
        this.helper.openSnackBar("Você precisa estar logado");
        this.route.navigate(["/admin"]);
    }

    delete(id: number): void {
        if (!confirm("Deseja realmente excluir este estudante?")) return;

        this.service
            .deleteById(id)
            .then((response) => {
                this.helper.openSnackBar("Estudante deletado");
                this.runPromises();
            })
            .catch((error) => {
                console.log(error.response);
                this.helper.openSnackBar(
                    "Ocorreu um erro ao tentar deletar o estudante"
                );
            });
    }
}
