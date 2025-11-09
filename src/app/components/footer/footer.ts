import { Component, inject } from '@angular/core';
import { DataService, Contact } from '../../services/data'; // <-- 1. Importa el servicio y la interface Contact
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common'; // <-- 2. Importa AsyncPipe

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    AsyncPipe // <-- 3. Añade AsyncPipe
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class FooterComponent {

  // 4. Inyecta el servicio
  private dataService = inject(DataService);

  // 5. Crea el Observable para los datos de contacto
  public contact$: Observable<Contact>;

  constructor() {
    // 6. Llama al método getContact() del servicio
    this.contact$ = this.dataService.getContact();
  }
}