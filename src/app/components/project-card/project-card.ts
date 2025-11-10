import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../../services/data'; // 1. Importa la interface del Proyecto

@Component({
  selector: 'app-project-card', // 2. Selector <app-project-card>
  standalone: true,
  imports: [],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css'
})
export class ProjectCardComponent {

  // 3. @Input(): Recibe datos del componente Padre (ProjectsComponent)
  @Input() project!: Project;

  // 4. @Output(): Emite un evento hacia el componente Padre
  @Output() projectSelected = new EventEmitter<Project>();

  // 5. Esta función se llama al hacer clic en la tarjeta
  onCardClick() {
    // 6. Emite el evento 'projectSelected' con los datos de este proyecto
    this.projectSelected.emit(this.project);
  }
}
