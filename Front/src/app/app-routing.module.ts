import { AdminUsersComponent } from "./pages/adminUsers/adminUsers.component";
import { ErrorNotFoundComponent } from "./pages/errorNotFound/errorNotFound.component";
import { AdminHomeComponent } from "./pages/adminHome/adminHome.component";
import { LoginComponent } from "./pages/login/login.component";
import { AdminLoginComponent } from "./pages/adminLogin/adminLogin.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminUserComponent } from "./pages/adminUser/adminUser.component";

const routes: Routes = [
    { path: "", component: LoginComponent },
    { path: "admin", component: AdminLoginComponent },
    { path: "admin/home", component: AdminHomeComponent },
    { path: "admin/users", component: AdminUsersComponent },
    { path: "admin/user", component: AdminUserComponent },
    { path: "admin/user/:id", component: AdminUserComponent },
    { path: "**", component: ErrorNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
