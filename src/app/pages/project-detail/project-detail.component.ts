import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router'; // 1. Importa ActivatedRoute para leer la URL
import { DataService, Project } from '../../services/data'; // 2. Importa el servicio y la interface
import { Observable, switchMap } from 'rxjs'; // 3. Importa 'switchMap' para manejar el observable de la ruta
import { AsyncPipe, CommonModule } from '@angular/common'; // 4. Importa pipes y directivas comunes

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [
    AsyncPipe,
    CommonModule, // 5. Necesario para @if
    RouterLink  // 6. Necesario para [routerLink]
  ],
  templateUrl: './project-detail.component.html', // 7. Apunta al nuevo HTML
  styleUrl: './project-detail.component.css' // 8. Apunta al nuevo CSS
})
export class ProjectDetailComponent {
  
  // 9. Declara el Observable para el proyecto individual
  public project$: Observable<Project | undefined>;

  constructor() {
    const route = inject(ActivatedRoute); // 10. Inyecta el servicio de rutas activas
    const dataService = inject(DataService); // 11. Inyecta el servicio de datos

    // 12. Encadena los Observables:
    this.project$ = route.params.pipe( // 13. Escucha cambios en los parámetros de la URL (ej. :id)
      switchMap(params => { // 14. Cuando hay un nuevo param, hace una nueva petición
        const id = +params['id']; // 15. Obtiene el 'id' de la URL y lo convierte a número
        return dataService.getProjectById(id); // 16. Llama al servicio con ese ID
      })
    );
  }
}