import { Injectable, inject, signal } from '@angular/core';
// 1. Importa el servicio real de la librería
import { OAuthService } from 'angular-oauth2-oidc';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // 2. Inyecta el servicio real de OIDC
  private oauthService = inject(OAuthService);

  // 3. (Opcional) Podemos crear una señal que reaccione 
  //    a los eventos de autenticación
  public isAuthenticated = signal<boolean>(false);

  constructor() {
    // 4. Escucha eventos de la librería OIDC
    //    Cuando el "discovery document" y el login se completan...
    this.oauthService.events
      .pipe(filter((e) => e.type === 'token_received'))
      .subscribe(() => {
        // ...actualiza nuestra señal de logueado
        this.isAuthenticated.set(this.hasValidToken());
      });
    
    // 5. Carga inicial (por si ya estamos logueados al recargar)
    this.isAuthenticated.set(this.hasValidToken());
  }

  // 6. El método 'isLoggedIn' (que usa tu AuthGuard) 
  //    ahora revisa el token real
  public isLoggedIn(): boolean {
    return this.hasValidToken();
  }

  // 7. El método 'login' (que usará tu Header) 
  //    ahora inicia el flujo de redirección a WSO2
  public login(): void {
    this.oauthService.initLoginFlow();
  }

  // 8. El método 'logout' (que usa tu Header) 
  //    ahora cierra la sesión de WSO2
  public logout(): void {
    this.oauthService.revokeTokenAndLogout();
    this.isAuthenticated.set(false);
  }

  // 9. Un helper privado para verificar el token
  private hasValidToken(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  // (Opcional) Obtener los "claims" o datos del usuario
  public getClaims(): object | null {
    const claims = this.oauthService.getIdentityClaims();
    if (claims) {
      return claims;
    }
    return null;
  }
}