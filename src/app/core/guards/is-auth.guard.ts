import { CanMatchFn } from '@angular/router';

export const isAuthGuard: CanMatchFn = (route, segments) => {
  return true;
};
