import { ErrorNotFoundComponent } from "./pages/errorNotFound/errorNotFound.component";
import { AdminHomeComponent } from "./pages/adminHome/adminHome.component";
import { LoginComponent } from "./pages/login/login.component";
import { AdminLoginComponent } from "./pages/adminLogin/adminLogin.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    { path: "", component: LoginComponent },
    { path: "admin", component: AdminLoginComponent },
    { path: "admin/home", component: AdminHomeComponent },
    { path: "**", component: ErrorNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
