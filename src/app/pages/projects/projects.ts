import { Component, inject } from '@angular/core';
import { DataService, Project } from '../../services/data'; // <-- 1. Importa el servicio y la interface Project
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common'; // <-- 2. Importa AsyncPipe
import { ProjectCardComponent } from '../../components/project-card/project-card';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    AsyncPipe, // <-- 3. Añade AsyncPipe
    ProjectCardComponent
  ],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class ProjectsComponent {

  private dataService = inject(DataService);

  // 4. Crea el Observable para la LISTA de proyectos
  public projects$: Observable<Project[]>; // (Ya no necesitas '| null')

  constructor() {
    // 5. Llama al método getProjects() del servicio
    this.projects$ = this.dataService.getProjects();
  }

  handleProjectSelected(selectedProject: Project) {
    // 2. Por ahora, solo muéstralo en consola
    console.log('¡Evento recibido por el Padre!', selectedProject.title);
  }
}