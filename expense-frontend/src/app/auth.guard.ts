import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

// Firebase session load hone ke baad hi protected expenses route access deta hai.
export const authGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  await auth.ready;
  return auth.user() ? true : router.createUrlTree(['/login']);
};
