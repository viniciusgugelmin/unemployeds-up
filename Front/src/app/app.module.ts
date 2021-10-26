import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MaterialModule } from "./modules/material.module";
import { AppRoutingModule } from "./app-routing.module";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./pages/login/login.component";
import { AdminLoginComponent } from "./pages/adminLogin/adminLogin.component";
import { AdminHomeComponent } from "./adminHome/adminHome.component";
import { ErrorNotFoundComponent } from "./errorNotFound/errorNotFound.component";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        AdminLoginComponent,
        AdminHomeComponent,
        ErrorNotFoundComponent,
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
