import { ApplicationConfig, APP_INITIALIZER, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideOAuthClient, OAuthService, AuthConfig } from 'angular-oauth2-oidc';

import { routes } from './app.routes';
// --- ¡PASO 1: IMPORTA EL ENTORNO! ---
import { environment } from '../environments/environment';

// Configuración de OIDC (WSO2)
export const authConfig: AuthConfig = {
  // --- ¡PASO 2: USA LAS VARIABLES DE ENTORNO! ---
  issuer: environment.auth.issuer,
  redirectUri: window.location.origin, // Esto sigue igual
  clientId: environment.auth.clientId,
  // ----------------------------------------------
  responseType: 'code',
  scope: 'openid profile email internal_login',
  strictDiscoveryDocumentValidation: false,
};

// Función de inicialización (sin cambios)
function initializeOAuth(oauthService: OAuthService): () => Promise<void> {
  return () => {
    oauthService.configure(authConfig);
    
    return oauthService.loadDiscoveryDocumentAndTryLogin()
      .then(() => {
        // Corrección: Asegura que devuelva Promise<void>
      });
  };
}

// Configuración principal (sin cambios)
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideOAuthClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeOAuth,
      deps: [OAuthService],
      multi: true
    }
  ]
};
