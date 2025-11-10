import { Component, inject } from '@angular/core';
import { DataService, Contact } from '../../services/data'; // 1. Importa el servicio y la interface
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common'; // 2. Importa AsyncPipe

@Component({
  selector: 'app-footer', // 3. Selector <app-footer>
  standalone: true,
  imports: [
    AsyncPipe // 4. Necesario para el pipe '| async'
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class FooterComponent {

  private dataService = inject(DataService); // 5. Inyecta el servicio de datos

  // 6. Declara el Observable para los datos de contacto
  public contact$: Observable<Contact>;

  constructor() {
    // 7. Obtiene los datos del servicio (probablemente de la caché de shareReplay)
    this.contact$ = this.dataService.getContact();
  }
}