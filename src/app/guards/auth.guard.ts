import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getCurrentToken()

  if (token) {
    return true;
  } else {
    router.navigate(['/auth']);
    return false;
  }
};
