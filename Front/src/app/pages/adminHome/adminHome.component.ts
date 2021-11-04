import { CourseService } from "src/app/services/course.service";
import { StudentService } from "src/app/services/student.service";
import { AdministratorLoginService } from "src/app/services/administratorLogin.service";
import { Administrator } from "src/app/models/administrator";
import { AdministratorService } from "src/app/services/administrator.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HelperService } from "src/app/services/helper.service";
import { SubjectService } from "src/app/services/subject.service";

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
    items: Array<any> = [
        {
            title: "Administradores",
            icon: "admin_panel_settings",
            var: 0,
        },
        {
            title: "Estudantes",
            icon: "person",
            var: 0,
        },
        {
            title: "Cursos",
            icon: "school",
            var: 0,
        },
        {
            title: "Disciplinas",
            icon: "book",
            var: 0,
        },
    ];
    loading: boolean = false;

    constructor(
        private route: Router,
        private helper: HelperService,
        private service: AdministratorService,
        private loginService: AdministratorLoginService,
        private studentService: StudentService,
        private courseService: CourseService,
        private subjectService: SubjectService
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
                await this.getStudents();
                await this.getCourses();
                await this.getSubjets();
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

    async getAdminstrators(): Promise<boolean> {
        return await this.service
            .get()
            .then((response) => {
                this.items.map((item) => {
                    if (item.title === "Administradores") {
                        item.var = response.data;
                    }
                });
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

    async getStudents(): Promise<boolean> {
        return await this.studentService
            .get()
            .then((response) => {
                this.items.map((item) => {
                    if (item.title === "Estudantes") {
                        item.var = response.data;
                    }
                });
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

    async getCourses(): Promise<boolean> {
        return await this.courseService
            .get()
            .then((response) => {
                this.items.map((item) => {
                    if (item.title === "Cursos") {
                        item.var = response.data;
                    }
                });
                return true;
            })
            .catch((error) => {
                console.log(error.response);
                this.helper.openSnackBar(
                    "Ocorreu um erro ao tentar carregar os cursos"
                );
                return false;
            });
    }

    async getSubjets(): Promise<boolean> {
        return await this.subjectService
            .get()
            .then((response) => {
                this.items.map((item) => {
                    if (item.title === "Disciplinas") {
                        item.var = response.data;
                    }
                });
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
}
