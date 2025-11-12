// Este archivo se usará para PRODUCCIÓN (ng build)
export const environment = {
  production: true,
  auth: {
    // --- ¡IMPORTANTE! ---
    // DEBES REEMPLAZAR ESTOS VALORES
    // 'issuer' debe ser la URL PÚBLICA de tu servidor WSO2
    // 'clientId' debe ser el Client ID de WSO2 para producción
    issuer: 'URL_PUBLICA_DE_TU_WSO2', 
    clientId: 'CLIENT_ID_DE_PRODUCCION' 
  }
};