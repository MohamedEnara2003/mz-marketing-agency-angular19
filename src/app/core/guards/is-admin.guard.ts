import { CanMatchFn } from '@angular/router';
import { AuthenticationService } from '../../features/auth/service/authentication.service';
import { inject } from '@angular/core';


export const isAdminGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthenticationService);
  const userId = authService.CurrentUser()?.user_id;
 
  return true
};
