import { Component, inject } from '@angular/core';
import { DataService, Profile } from '../../services/data'; // 1. Importa el servicio y la interface
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common'; // 2. Importa AsyncPipe

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AsyncPipe // 3. Necesario para el pipe '| async'
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {

  private dataService = inject(DataService); // 4. Inyecta el servicio de datos

  // 5. Declara el Observable para el perfil
  public profile$: Observable<Profile>;

  constructor() {
    // 6. Obtiene los datos del servicio
    this.profile$ = this.dataService.getProfile();
  }
}
