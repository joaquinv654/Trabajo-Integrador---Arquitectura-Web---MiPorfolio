import { Routes } from '@angular/router';
import { authGuard } from './services/auth-guard'; // 1. Importa el guardia de ruta

export const routes: Routes = [
    { 
        path: '', // 2. Ruta raíz (Home)
        // 3. Carga diferida (Lazy Loading) del componente Home
        loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent)
    },
    // 4. La ruta /login fue eliminada porque OIDC maneja el login externamente
    { 
        path: 'proyectos', // 5. Ruta de Proyectos
        loadComponent: () => import('./pages/projects/projects').then(m => m.ProjectsComponent),
        
        // 6. ¡Ruta Protegida!
        //    Solo permite activar esta ruta si 'authGuard' devuelve 'true'
        canActivate: [authGuard] 
    },
    { 
        path: '**', // 7. Ruta comodín (Wildcard) para URLs no encontradas
        redirectTo: '', // 8. Redirige al Home
        pathMatch: 'full' 
    }
];
