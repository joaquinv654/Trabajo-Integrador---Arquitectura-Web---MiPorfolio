import { Component, Input, Output, EventEmitter } from '@angular/core'; // <-- 1. Importa Input
import { Project } from '../../services/data'; // <-- 2. Importa la interface 'Project'

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css'
})
export class ProjectCardComponent {

  // 3. Define el Input. 
  // 'project' es el nombre de la propiedad.
  // El '!' le dice a TypeScript: "confía en mí, el Padre siempre me dará esto".
  @Input() project!: Project;
  @Output() projectSelected = new EventEmitter<Project>()
  onCardClick() {
    // 4. Emite el evento "hacia arriba" al Padre, enviando este proyecto.
    this.projectSelected.emit(this.project);
  }
}
