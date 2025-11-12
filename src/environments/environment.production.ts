// Este archivo se usará para PRODUCCIÓN (ng build)
export const environment = {
  production: true,
  auth: {
    // --- ¡IMPORTANTE! ---
    // DEBES REEMPLAZAR ESTOS VALORES DESPUÉS, PERO POR AHORA USA LOS DE TU SERVIDOR LOCAL
    // para que la app al menos compile con una URL válida.
    // MÁS ADELANTE, pondrás aquí la URL PÚBLICA de tu WSO2.
    issuer: 'https://localhost:9443/oauth2/token', 

    // DEBES REEMPLAZAR ESTO LUEGO con el Client ID de producción que crearás en WSO2.
    clientId: 'CLIENT_ID_DE_PRODUCCION' 
  }
};