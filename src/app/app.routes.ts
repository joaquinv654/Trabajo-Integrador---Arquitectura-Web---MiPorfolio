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
        path: 'proyectos', // 5. Ruta de Proyectos (La lista)
        loadComponent: () => import('./pages/projects/projects').then(m => m.ProjectsComponent),
        
        // 6. ¡Ruta Protegida!
        //    Solo permite activar esta ruta si 'authGuard' devuelve 'true'
        canActivate: [authGuard] 
    },
    // --- ¡PASO 1: AÑADIR ESTA NUEVA RUTA AQUÍ! ---
    {
        path: 'proyectos/:id', // 7. Esta es la nueva ruta con un parámetro dinámico ':id'
        loadComponent: () => import('./pages/project-detail/project-detail.component').then(m => m.ProjectDetailComponent),
        canActivate: [authGuard] // 8. Esta ruta también debe estar protegida
    },
    // ---
    { 
        path: '**', // 9. Ruta comodín (Wildcard) para URLs no encontradas
        redirectTo: '', // 10. Redirige al Home
        pathMatch: 'full' 
    }
];
