import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// 1. Importa los componentes del "marco"
import { HeaderComponent } from './components/header/header';
import { FooterComponent } from './components/footer/footer';


@Component({
  selector: 'app-root', // 2. Selector (usado en index.html)
  standalone: true, 
  imports: [
    RouterOutlet, // 3. El contenedor para las páginas (Home, Projects)
    HeaderComponent, // 4. El Header
    FooterComponent // 5. El Footer
  ],
  templateUrl: './app.component.html', // 6. Plantilla HTML asociada
  styleUrl: './app.css' // 7. Hoja de estilos asociada
})
export class AppComponent {
  title = 'mi-portafolio'; // 8. Propiedad del componente (ya no se usa en el HTML)
}