import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MaterialModule } from "./modules/material.module";
import { AppRoutingModule } from "./app-routing.module";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./pages/login/login.component";
import { AdminLoginComponent } from "./pages/adminLogin/adminLogin.component";
import { AdminHomeComponent } from "./pages/adminHome/adminHome.component";
import { ErrorNotFoundComponent } from "./pages/errorNotFound/errorNotFound.component";
import { AdminAsideComponent } from "./components/adminAside/adminAside.component";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        AdminLoginComponent,
        AdminHomeComponent,
        ErrorNotFoundComponent,
        AdminAsideComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor() {}
}
