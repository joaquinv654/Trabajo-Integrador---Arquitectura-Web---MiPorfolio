import { Component, inject } from '@angular/core';
import { DataService, Profile } from '../../services/data'; // <-- 1. Importa el servicio y la interface
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common'; // <-- 2. Importa AsyncPipe

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AsyncPipe // <-- 3. Añade AsyncPipe a los imports
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {

  // 4. Inyecta el servicio
  private dataService = inject(DataService);

  // 5. Crea una variable "Observable" para el perfil.
  // El $ al final es una convención para indicar que es un Observable.
  public profile$: Observable<Profile>;

  constructor() {
    // 6. Llama al método del servicio para obtener los datos
    this.profile$ = this.dataService.getProfile();
  }
}
