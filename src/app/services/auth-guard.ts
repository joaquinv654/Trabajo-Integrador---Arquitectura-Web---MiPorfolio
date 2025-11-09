import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
// 1. ¡Importa NUESTRO AuthService en su lugar!
// (La librería OIDC ya no se importa aquí)
import { AuthService } from './auth'; 

export const authGuard: CanActivateFn = (route, state) => {
  
  // 2. Inyecta nuestro AuthService y el Router
  const authService = inject(AuthService);
  const router = inject(Router);

  // 3. Llama a nuestro método síncrono isLoggedIn()
  //    Este método es el que SÍ revisa el token instantáneamente.
  if (authService.isLoggedIn()) {
    return true; // ¡Permitido! El usuario puede pasar.
  } else {
    // 4. ¡Bloqueado! Redirige al home 
    //    (donde el header mostrará "Login")
    return router.createUrlTree(['/']); 
  }
};
