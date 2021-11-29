import { CourseService } from "src/app/services/course.service";
import { Course } from "./../../models/course";
import { AdministratorLoginService } from "src/app/services/administratorLogin.service";
import { Administrator } from "src/app/models/administrator";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HelperService } from "src/app/services/helper.service";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder } from "@angular/forms";

@Component({
    selector: "app-admin-course",
    templateUrl: "./adminCourse.component.html",
})
export class AdminCourseComponent implements OnInit {
    administrator: Administrator = {
        id: 0,
        name: "",
        email: "",
    };
    course: Course = {
        id: 0,
        name: "",
        description: "",
    };
    loading: boolean = false;
    checkoutForm = this.formBuilder.group({
        name: "",
        description: "",
    });
    idParam: number = 0;

    constructor(
        private route: Router,
        private $route: ActivatedRoute,
        private helper: HelperService,
        private service: CourseService,
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
                await this.getCourse();
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

    async getCourse(): Promise<boolean> {
        this.idParam = 0;
        this.$route.params.forEach((p) => {
            if (p.id) {
                this.idParam = p.id;
            }
        });

        if (!this.idParam) {
            this.checkoutForm.setValue({
                name: "",
                description: "",
            });
            return await true;
        }

        return await this.service
            .getById(this.idParam)
            .then((response) => {
                this.course = response.data;
                this.checkoutForm.setValue({
                    name: this.course.name,
                    description: this.course.description,
                });
                return true;
            })
            .catch((error) => {
                console.log(error.response);
                this.helper.openSnackBar(
                    "Ocorreu um erro ao tentar carregar o curso"
                );
                return false;
            });
    }

    goToLogin(): void {
        this.helper.openSnackBar("Você precisa estar logado");
        this.route.navigate(["/admin"]);
    }

    public onSubmit(): void {
        const courseAux: Course = {
            id: this.idParam !== 0 ? this.course.id : this.idParam,
            name: this.checkoutForm.value.name,
            description: this.checkoutForm.value.description,
        };

        let validationOkay = this.service.validate(
            this.checkoutForm,
            this.helper
        );

        if (!validationOkay) {
            return;
        }

        this.service[this.idParam !== 0 ? "update" : "create"](courseAux)
            .then((response) => {
                this.helper.openSnackBar(
                    `Curso ${
                        this.idParam !== 0 ? "atualizado" : "criado"
                    } com sucesso`
                );
                this.route.navigate(["/admin/courses"]);
                return true;
            })
            .catch((error) => {
                console.log(error.response);
                this.helper.openSnackBar(
                    `Ocorreu um erro ao tentar ${
                        this.idParam !== 0 ? "atualizar" : "criar"
                    } o curso`
                );
            });
    }
}
