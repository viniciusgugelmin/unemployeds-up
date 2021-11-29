import { SubjectService } from "./../../services/subject.service";
import { Subject } from "./../../models/subject";
import { CourseService } from "../../services/course.service";
import { Course } from "../../models/course";
import { StudentService } from "../../services/student.service";
import { Student } from "../../models/student";
import { AdministratorLoginService } from "src/app/services/administratorLogin.service";
import { Administrator } from "src/app/models/administrator";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HelperService } from "src/app/services/helper.service";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder } from "@angular/forms";

@Component({
    selector: "app-admin-subject",
    templateUrl: "./adminSubject.component.html",
})
export class AdminSubjectComponent implements OnInit {
    administrator: Administrator = {
        id: 0,
        name: "",
        email: "",
    };
    subject: Subject = {
        id: 0,
        courseId: 0,
        name: "",
        description: "",
    };
    courses: Array<Course> = [];
    loading: boolean = false;
    checkoutForm: any = this.formBuilder.group({
        courseId: 0,
        name: "",
        description: "",
    });
    idParam: number = 0;

    constructor(
        private route: Router,
        private $route: ActivatedRoute,
        private helper: HelperService,
        private service: SubjectService,
        private loginService: AdministratorLoginService,
        private formBuilder: FormBuilder,
        private serviceCourse: CourseService
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
                await this.getSubject();
            })
            .finally(() => {
                this.getCourses();
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

    async getSubject(): Promise<boolean> {
        this.idParam = 0;
        this.$route.params.forEach((p) => {
            if (p.id) {
                this.idParam = p.id;
            }
        });

        if (!this.idParam) {
            this.checkoutForm.setValue({
                courseId: 0,
                name: "",
                description: "",
            });
            return await true;
        }

        return await this.service
            .getById(this.idParam)
            .then((response) => {
                this.subject = response.data;
                this.checkoutForm.setValue({
                    courseId: this.subject.courseId,
                    name: this.subject.name,
                    description: this.subject.description,
                });
                return true;
            })
            .catch((error) => {
                console.log(error.response);
                this.helper.openSnackBar(
                    "Ocorreu um erro ao tentar carregar a disciplina"
                );
                return false;
            });
    }

    goToLogin(): void {
        this.helper.openSnackBar("Você precisa estar logado");
        this.route.navigate(["/admin"]);
    }

    public onSubmit(): void {
        const subjectAux: Subject = {
            id: this.idParam !== 0 ? this.subject.id : this.idParam,
            name: this.checkoutForm.value.name,
            courseId: this.checkoutForm.value.courseId,
            description: this.checkoutForm.value.description,
        };

        let validationOkay = this.service.validate(
            this.checkoutForm,
            this.helper
        );

        if (!validationOkay) {
            return;
        }

        this.service[this.idParam !== 0 ? "update" : "create"](subjectAux)
            .then((response) => {
                this.helper.openSnackBar(
                    `Disciplina ${
                        this.idParam !== 0 ? "atualizado" : "criado"
                    } com sucesso`
                );
                this.route.navigate(["/admin/subjects"]);
                return true;
            })
            .catch((error) => {
                console.log(error.response);
                this.helper.openSnackBar(
                    `Ocorreu um erro ao tentar ${
                        this.idParam !== 0 ? "atualizar" : "criar"
                    } o disciplina`
                );
            });
    }

    async getCourses(): Promise<boolean> {
        return await this.serviceCourse
            .get()
            .then((response) => {
                this.courses = response.data;
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
}
