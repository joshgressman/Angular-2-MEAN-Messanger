//These are nested routes for the auth component
import { Routes, RouterModule } from "@angular/router";
import { SignupComponent } from "./signup.component";
import { SigninComponent } from "./signin.component";
import { LogoutComponent } from "./logout.component";

export const AUTH_ROUTES: Routes = [
  {path: '', redirectTo: 'signup', pathMatch: 'full'},
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'logout', component: LogoutComponent}

];

//**** the export const AUTH_ROUTES are being exported to the main router as
//Child routes to the auth route
