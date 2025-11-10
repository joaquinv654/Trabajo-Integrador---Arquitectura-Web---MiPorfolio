import { Component, inject } from '@angular/core';
import { DataService, Project } from '../../services/data'; // 1. Importa servicio e interface
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common'; // 2. Importa AsyncPipe
import { ProjectCardComponent } from '../../components/project-card/project-card'; // 3. Importa el componente hijo
import { Router } from '@angular/router'; // 4. --- ¡PASO 4: IMPORTA EL ROUTER! ---

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    AsyncPipe, // 5. Necesario para @if
    ProjectCardComponent // 6. Incluye el componente hijo
  ],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class ProjectsComponent {

  private dataService = inject(DataService); // 7. Inyecta el servicio de datos
  private router = inject(Router); // 8. --- ¡PASO 4: INYECTA EL ROUTER! ---
  public projects$: Observable<Project[]>; // 9. Declara el Observable

  constructor() {
    this.projects$ = this.dataService.getProjects(); // 10. Obtiene los proyectos
  }

  // 11. --- ¡PASO 4: LÓGICA ACTUALIZADA! ---
  // Esta función se activa por el (projectSelected) del componente hijo
  handleProjectSelected(selectedProject: Project) {
    // 12. Ya no usa console.log
    // console.log('Proyecto seleccionado:', selectedProject.title);
    
    // 13. Navega a la nueva ruta de detalle, pasando el ID del proyecto
    //     ej: /proyectos/1
    this.router.navigate(['/proyectos', selectedProject.id]);
  }
}