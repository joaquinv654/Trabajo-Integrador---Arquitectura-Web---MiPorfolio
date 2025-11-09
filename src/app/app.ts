import { Component } from '@angular/core'; // El import de 'signal' no lo usaremos aquí.
import { RouterOutlet } from '@angular/router';

// 1. IMPORTA TUS COMPONENTES
import { HeaderComponent } from './components/header/header';
import { FooterComponent } from './components/footer/footer';


@Component({
  selector: 'app-root',
  standalone: true, // Esto es importante
  imports: [
    RouterOutlet,
    HeaderComponent, // 2. AÑADE EL HEADER AQUÍ
    FooterComponent  // 3. AÑADE EL FOOTER AQUÍ
  ],
  templateUrl: './app.component.html', // 4. CORRIGE EL NOMBRE DEL ARCHIVO HTML
  styleUrl: './app.css' // 5. (Este es el nombre de estilos estándar)
})
export class AppComponent { // 6. (Este es el nombre de clase estándar)
  title = 'mi-portafolio';
}