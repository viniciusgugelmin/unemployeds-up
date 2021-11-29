import { AdminStudentComponent } from "./pages/adminStudent/adminStudent.component";
import { AdminSubjectsComponent } from "./pages/adminSubjects/adminSubjects.component";
import { AdminCoursesComponent } from "./pages/adminCourses/adminCourses.component";
import { AdminUsersComponent } from "./pages/adminUsers/adminUsers.component";
import { ErrorNotFoundComponent } from "./pages/errorNotFound/errorNotFound.component";
import { AdminHomeComponent } from "./pages/adminHome/adminHome.component";
import { LoginComponent } from "./pages/login/login.component";
import { AdminLoginComponent } from "./pages/adminLogin/adminLogin.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminUserComponent } from "./pages/adminUser/adminUser.component";
import { AdminStudentsComponent } from "./pages/adminStudents/adminStudents.component";
import { AdminCourseComponent } from "./pages/adminCourse/adminCourse.component";
import { AdminSubjectComponent } from "./pages/adminSubject/adminSubject.component";

const routes: Routes = [
    { path: "", component: LoginComponent },
    { path: "admin", component: AdminLoginComponent },
    { path: "admin/home", component: AdminHomeComponent },
    { path: "admin/users", component: AdminUsersComponent },
    { path: "admin/user", component: AdminUserComponent },
    { path: "admin/user/:id", component: AdminUserComponent },
    { path: "admin/students", component: AdminStudentsComponent },
    { path: "admin/courses", component: AdminCoursesComponent },
    { path: "admin/course", component: AdminCourseComponent },
    { path: "admin/course/:id", component: AdminCourseComponent },
    { path: "admin/student", component: AdminStudentComponent },
    { path: "admin/student/:id", component: AdminStudentComponent },
    { path: "admin/subjects", component: AdminSubjectsComponent },
    { path: "admin/subject", component: AdminSubjectComponent },
    { path: "admin/subject/:id", component: AdminSubjectComponent },
    { path: "**", component: ErrorNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
