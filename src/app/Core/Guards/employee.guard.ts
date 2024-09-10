import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

export const employeeGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('userToken');
  const _Router = inject (Router);
  let _AuthService = inject(AuthService);

  if (token !== null && _AuthService.userRole === 'Employee') { 
    return true
  } else{
    _Router.navigate(['/dashboard']);
    return false
  }
};
