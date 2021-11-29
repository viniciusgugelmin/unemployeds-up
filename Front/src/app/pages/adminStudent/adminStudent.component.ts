import { CourseService } from "./../../services/course.service";
import { Course } from "./../../models/course";
import { StudentService } from "./../../services/student.service";
import { Student } from "./../../models/student";
import { AdministratorLoginService } from "src/app/services/administratorLogin.service";
import { Administrator } from "src/app/models/administrator";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HelperService } from "src/app/services/helper.service";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder } from "@angular/forms";

@Component({
    selector: "app-admin-student",
    templateUrl: "./adminStudent.component.html",
})
export class AdminStudentComponent implements OnInit {
    administrator: Administrator = {
        id: 0,
        name: "",
        email: "",
    };
    student: Student = {
        id: 0,
        courseId: 0,
        name: "",
        gender: false,
        genderName: "",
        number: "",
        birthdate: "",
        zipCode: "",
        complement: "",
        password: "",
    };
    courses: Array<Course> = [];
    loading: boolean = false;
    checkoutForm: any = this.formBuilder.group({
        courseId: 0,
        name: "",
        gender: "true",
        genderName: "",
        birthdate: "",
        zipCode: "",
        number: "",
        complement: "",
        changePassword: true,
        password: "",
        confirmPassword: "",
    });
    idParam: number = 0;

    constructor(
        private route: Router,
        private $route: ActivatedRoute,
        private helper: HelperService,
        private service: StudentService,
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
                await this.getStudent();
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

    async getStudent(): Promise<boolean> {
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
                gender: "false",
                genderName: "",
                birthade: "",
                zipCode: "",
                number: "",
                complement: "",
                changePassword: true,
                password: "",
                confirmPassword: "",
            });
            return await true;
        }

        return await this.service
            .getById(this.idParam)
            .then((response) => {
                this.student = response.data;
                this.checkoutForm.setValue({
                    courseId: this.student.courseId,
                    name: this.student.name,
                    gender: this.student.gender.toString(),
                    genderName: this.student.gender ? "M" : "F",
                    birthdate: this.student.birthdate,
                    zipCode: this.student.zipCode,
                    number: this.student.number,
                    complement: this.student.complement,
                    changePassword: false,
                    password: "",
                    confirmPassword: "",
                });
                return true;
            })
            .catch((error) => {
                console.log(error.response);
                this.helper.openSnackBar(
                    "Ocorreu um erro ao tentar carregar o estudante"
                );
                return false;
            });
    }

    goToLogin(): void {
        this.helper.openSnackBar("Você precisa estar logado");
        this.route.navigate(["/admin"]);
    }

    public onSubmit(): void {
        const studentAux: Student = {
            id: this.idParam !== 0 ? this.student.id : this.idParam,
            name: this.checkoutForm.value.name,
            courseId: this.checkoutForm.value.courseId,
            gender: this.checkoutForm.value.gender === "true" ? true : false,
            genderName: this.checkoutForm.value.gender ? "M" : "F",
            birthdate: this.checkoutForm.value.birthdate,
            number: this.checkoutForm.value.number,
            zipCode: this.checkoutForm.value.zipCode,
            complement: this.checkoutForm.value.complement,
            password:
                this.idParam !== 0
                    ? this.checkoutForm.value.changePassword
                        ? this.checkoutForm.value.password
                        : this.student.password
                    : this.checkoutForm.value.password,
        };

        let validationOkay = this.service.validate(
            this.checkoutForm,
            this.helper
        );

        if (!validationOkay) {
            return;
        }

        this.service[this.idParam !== 0 ? "update" : "create"](studentAux)
            .then((response) => {
                this.helper.openSnackBar(
                    `Estudante ${
                        this.idParam !== 0 ? "atualizado" : "criado"
                    } com sucesso`
                );
                this.route.navigate(["/admin/students"]);
                return true;
            })
            .catch((error) => {
                console.log(error.response);
                this.helper.openSnackBar(
                    `Ocorreu um erro ao tentar ${
                        this.idParam !== 0 ? "atualizar" : "criar"
                    } o estudante`
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

    public onBirthdateChange(event: any): void {
        this.checkoutForm
            .get("birthdate")
            .setValue(event.value.replace(/[^\d.-]/g, ""));

        if (event.value === "") {
            this.checkoutForm.get("birthdate").setValue("");
            return;
        }

        if (event.value.length > 10) {
            this.checkoutForm
                .get("birthdate")
                .setValue(
                    this.checkoutForm.get("birthdate").value.substring(0, 10)
                );
            return;
        }

        if (event.value.length === 2 || event.value.length === 5) {
            this.checkoutForm
                .get("birthdate")
                .setValue(this.checkoutForm.get("birthdate").value + "-");
            return;
        }

        if (
            event.value[0] === "-" ||
            event.value[1] === "-" ||
            event.value[3] === "-" ||
            event.value[4] === "-" ||
            event.value[6] === "-" ||
            event.value[7] === "-" ||
            event.value[8] === "-" ||
            event.value[9] === "-"
        ) {
            this.checkoutForm.get("birthdate").setValue("");
            return;
        }
    }
}
