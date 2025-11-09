import { Component, signal, inject } from '@angular/core'; // <-- 1. Añade 'inject'
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // <-- 2. Importa Router
import { AuthService } from '../../services/auth'; // <-- 3. Importa AuthService

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule 
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  // Las señales para los campos del formulario
  username = signal('');
  email = signal('');

  // 4. Inyecta los servicios
  private authService = inject(AuthService);
  private router = inject(Router);

  // El método que se llama al enviar el formulario
  handleSubmit() {
    // Muestra el mensaje en consola
    console.log(`Hola ${this.email()} ${this.username()} Login exitoso`);
    
    // Imprime el objeto con los datos
    console.log({
      username: this.username(),
      email: this.email()
    });

    // 5. ¡AQUÍ ESTÁ EL CAMBIO!
    // Llama al servicio para "loguear" al usuario
    this.authService.login();

    // 6. (Opcional) Redirige al usuario a la página de proyectos
    // que acaba de desbloquear.
    this.router.navigate(['/proyectos']);

    // Limpia los campos
    this.username.set('');
    this.email.set('');
  }
}