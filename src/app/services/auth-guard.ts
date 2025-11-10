import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth'; // 1. Importa NUESTRO AuthService

// 2. Define un Guardia de Ruta funcional
export const authGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService); // 3. Inyecta el servicio de Auth
  const router = inject(Router); // 4. Inyecta el Router

  // 5. Comprueba si el usuario está logueado
  if (authService.isLoggedIn()) {
    return true; // 6. Permitido: El usuario puede pasar.
  } else {
    // 7. Bloqueado: Redirige al home
    return router.createUrlTree(['/']); 
  }
};
