import { ApplicationConfig, APP_INITIALIZER, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // 1. Proveedor para peticiones HTTP
import { provideOAuthClient, OAuthService, AuthConfig } from 'angular-oauth2-oidc'; // 2. Proveedores OIDC

import { routes } from './app.routes'; // 3. Importa tus rutas

// 4. Configuración de OIDC (WSO2)
// RECOMENDACIÓN: Mover estos valores a /src/environments/environment.ts
export const authConfig: AuthConfig = {
  issuer: 'https://localhost:9443/oauth2/token', // 5. URL del Emisor WSO2
  redirectUri: window.location.origin, // 6. URL de retorno (tu app)
  clientId: 'nU1AXNhUH4lDMx9ktBn8kyfuqHoa', // 7. Client ID de WSO2
  responseType: 'code', // 8. Flujo de Código de Autorización
  scope: 'openid profile email internal_login', // 9. Datos que pides al usuario
  strictDiscoveryDocumentValidation: false, // 10. Necesario para WSO2 local (certificados autofirmados)
};

// 11. Función de inicialización
//     Se ejecuta ANTES de que Angular arranque
function initializeOAuth(oauthService: OAuthService): () => Promise<void> {
  return () => {
    oauthService.configure(authConfig); // 12. Configura el servicio
    
    // 13. Carga la config del servidor OIDC e intenta loguearse
    //     (si venimos de una redirección con un código)
    return oauthService.loadDiscoveryDocumentAndTryLogin()
      .then(() => {
        // 14. Corrección: El .then() asegura que la función devuelva Promise<void>
      });
  };
}

// 15. Configuración principal de la aplicación
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), // 16. Registra las rutas
    provideHttpClient(), // 17. Registra el HttpClient (necesario para OIDC)
    provideOAuthClient(), // 18. Registra el OAuthService

    // 19. Define el "token" APP_INITIALIZER para ejecutar nuestra función
    //     de arranque 'initializeOAuth' antes de que la app se inicie.
    {
      provide: APP_INITIALIZER,
      useFactory: initializeOAuth,
      deps: [OAuthService], // 20. Inyecta el OAuthService en nuestra función
      multi: true
    }
  ]
};