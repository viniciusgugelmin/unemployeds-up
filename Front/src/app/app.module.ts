import { AdminCoursesComponent } from "./pages/adminCourses/adminCourses.component";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MaterialModule } from "./modules/material.module";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./pages/login/login.component";
import { AdminLoginComponent } from "./pages/adminLogin/adminLogin.component";
import { AdminHomeComponent } from "./pages/adminHome/adminHome.component";
import { ErrorNotFoundComponent } from "./pages/errorNotFound/errorNotFound.component";
import { AdminAsideComponent } from "./components/adminAside/adminAside.component";
import { AdminUsersComponent } from "./pages/adminUsers/adminUsers.component";
import { AdminUserComponent } from "./pages/adminUser/adminUser.component";
import { AdminStudentsComponent } from "./pages/adminStudents/adminStudents.component";
import { AdminSubjectsComponent } from "./pages/adminSubjects/adminSubjects.component";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        AdminLoginComponent,
        AdminHomeComponent,
        ErrorNotFoundComponent,
        AdminAsideComponent,
        AdminUsersComponent,
        AdminUserComponent,
        AdminStudentsComponent,
        AdminCoursesComponent,
        AdminSubjectsComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor() {}
}
