import { ApplicationConfig, APP_INITIALIZER, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

// 1. Importa los proveedores de HTTP y OIDC
import { provideHttpClient } from '@angular/common/http';
import { provideOAuthClient, OAuthService, AuthConfig } from 'angular-oauth2-oidc';

import { routes } from './app.routes';

// 2. Esta es la configuración de OIDC para WSO2 (basada en tu guía)
export const authConfig: AuthConfig = {
  
  // 3. ¡REEMPLAZA ESTA URL! 
  // (Debe ser la URL del 'Issuer' de tu panel de WSO2)
  // (Tu guía de práctica usa 'https://localhost:9443/oauth2/token', ¡verifica la tuya!)
  issuer: 'https://localhost:9443/oauth2/token', 

  // 4. Esta es la URL a la que WSO2 te redirigirá después del login
  redirectUri: window.location.origin, // (Esto será 'http://localhost:4200')

  // 5. ¡REEMPLAZA ESTE ID! 
  // (Debe ser el 'Client-id' de la pestaña 'Protocolo' de WSO2)
  clientId: 'My00NTmNyd53gRnQp8R7E_Tmbega', 

  // 6. Valores estándar de la guía
  responseType: 'code',
  scope: 'openid profile email internal_login',
  
  // 7. (Página 13) ¡Muy importante para WSO2 local!
  strictDiscoveryDocumentValidation: false,
};

// 8. Esta función se ejecuta ANTES de que Angular arranque
// Carga la configuración de WSO2 e intenta loguear si ya hay un token en la URL
function initializeOAuth(oauthService: OAuthService): () => Promise<void> {
  return () => {
    oauthService.configure(authConfig);
    
    // 9. ¡AQUÍ ESTÁ LA CORRECCIÓN!
    // Envolvemos la función en un .then() para que 
    // la promesa devuelva 'void' en lugar de 'boolean'.
    return oauthService.loadDiscoveryDocumentAndTryLogin()
      .then(() => {
        // (Opcional: puedes añadir lógica aquí si es necesario después de cargar)
      });
  };
}

// 10. Esta es la configuración principal de tu aplicación
export const appConfig: ApplicationConfig = {
  providers: [
    // (Tus proveedores existentes)
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    // 11. Añadimos los nuevos proveedores
    provideHttpClient(), // Necesario para la librería OIDC
    provideOAuthClient(), // Provee el OAuthService

    // 12. Este es el "arranque"
    // Le dice a Angular que ejecute 'initializeOAuth' ANTES de iniciar la app
    {
      provide: APP_INITIALIZER,
      useFactory: initializeOAuth,
      deps: [OAuthService],
      multi: true
    }
  ]
};