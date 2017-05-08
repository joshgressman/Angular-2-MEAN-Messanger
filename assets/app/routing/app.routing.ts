import { Routes, RouterModule} from "@angular/router";
import { MessagesComponent} from "../messages/messages.component";
import { AuthenticationComponent } from "../auth/authentication.component";
import { AUTH_ROUTES } from "../auth/auth.routes";

const APP_ROUTES: Routes = [
   {path: '', redirectTo: '/messages', pathMatch:'full'},
   {path: 'messages', component: MessagesComponent},
   {path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES } //child routes from the auth.routes.ts
];

export const routing = RouterModule.forRoot(APP_ROUTES);
