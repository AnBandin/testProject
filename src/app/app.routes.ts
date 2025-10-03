import {Routes} from '@angular/router';
import {AuthPageComponent} from "./pages/auth-page/auth-page.component";
import {NotFoundPageComponent} from "./pages/not-found-page/not-found-page.component";

export const routes: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: 'auth', component: AuthPageComponent},
  {path: '**', component: NotFoundPageComponent},
];
