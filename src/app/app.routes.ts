import { Routes } from '@angular/router';
// 1. Importamos el guardia de ruta
// (Asegúrate de que la ruta sea correcta, como la que corregimos antes)
import { authGuard } from './services/auth-guard'; 

export const routes: Routes = [
    { 
        path: '',
        // (Usando Lazy Loading como lo configuramos)
        loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent)
    },
    // 2. ¡LA RUTA '/login' HA SIDO ELIMINADA DE AQUÍ!
    //    Ya no la necesitamos.
    { 
        path: 'proyectos',
        loadComponent: () => import('./pages/projects/projects').then(m => m.ProjectsComponent),
        // 3. Sigue protegida por el guardia (que ahora usará OIDC)
        canActivate: [authGuard] 
    },
    { 
        path: '**', 
        redirectTo: '', 
        pathMatch: 'full' 
    }
];
