import { Injectable, inject, signal } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc'; // 1. Importa el servicio OIDC real
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' // 2. Servicio global (Singleton)
})
export class AuthService {

  private oauthService = inject(OAuthService); // 3. Inyecta el servicio OIDC

  // 4. Un 'signal' reactivo para saber si el usuario está logueado
  public isAuthenticated = signal<boolean>(false);

  constructor() {
    // 5. Escucha eventos OIDC: cuando se recibe un token...
    this.oauthService.events
      .pipe(filter((e) => e.type === 'token_received'))
      .subscribe(() => {
        // 6. ...actualiza la señal 'isAuthenticated'
        this.isAuthenticated.set(this.hasValidToken());
      });
    
    // 7. Comprueba el estado al cargar la app (por si ya había sesión)
    this.isAuthenticated.set(this.hasValidToken());
  }

  // 8. Método para el AuthGuard (lee la señal)
  public isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  // 9. Método para el botón de Login (inicia el flujo OIDC)
  public login(): void {
    this.oauthService.initLoginFlow();
  }

  // 10. Método para el botón de Logout
  public logout(): void {
    this.oauthService.revokeTokenAndLogout(); // Cierra sesión en OIDC
    this.isAuthenticated.set(false); // Actualiza la señal localmente
  }

  // 11. Helper privado para verificar si el token de acceso es válido
  private hasValidToken(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  // 12. (Opcional) Helper para obtener datos del usuario (claims)
  public getClaims(): object | null {
    const claims = this.oauthService.getIdentityClaims();
    return claims ? claims : null;
  }
}