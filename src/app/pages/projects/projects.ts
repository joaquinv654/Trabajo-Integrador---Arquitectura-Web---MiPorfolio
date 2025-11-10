import { Component, inject } from '@angular/core';
import { DataService, Project } from '../../services/data'; // 1. Importa servicio e interface
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common'; // 2. Importa AsyncPipe
import { ProjectCardComponent } from '../../components/project-card/project-card'; // 3. Importa el componente hijo

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    AsyncPipe, // 4. Necesario para @if
    ProjectCardComponent // 5. Incluye el componente hijo
  ],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class ProjectsComponent {

  private dataService = inject(DataService); // 6. Inyecta el servicio de datos

  // 7. Declara el Observable para el *array* de proyectos
  public projects$: Observable<Project[]>; 

  constructor() {
    // 8. Obtiene el array de proyectos del servicio
    this.projects$ = this.dataService.getProjects();
  }

  // 9. Esta función se activa por el (projectSelected) del componente hijo
  handleProjectSelected(selectedProject: Project) {
    // 10. Por ahora, solo muéstralo en consola
    //     (Aquí podrías abrir un modal o navegar a una ruta de detalle)
    console.log('Proyecto seleccionado por el hijo:', selectedProject.title);
  }
}