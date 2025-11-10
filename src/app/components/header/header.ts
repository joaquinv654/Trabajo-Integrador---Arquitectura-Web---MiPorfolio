import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common'; // 1. Importa CommonModule para usar @if

@Component({
  selector: 'app-header', // 2. Selector <app-header>
  standalone: true,
  imports: [
    RouterLink, // 3. Necesario para [routerLink]
    CommonModule // 4. Necesario para @if
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {
  
  private authService = inject(AuthService); // 5. Inyecta el servicio de Auth
  private router = inject(Router); // 6. Inyecta el Router

  // 7. 'isLoggedIn' es una referencia directa a la señal del servicio
  public isLoggedIn = this.authService.isAuthenticated;

  // 8. Señal local para manejar el menú hamburguesa
  public isMenuOpen = signal(false);

  // 9. Llama al servicio de login
  login() {
    this.authService.login();
    this.closeMenu();
  }

  // 10. Llama al servicio de logout y navega al home
  logout() {
    this.authService.logout();
    this.closeMenu(); 
    this.router.navigate(['/']); 
  }

  // 11. Invierte el valor de la señal del menú
  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  // 12. Cierra el menú
  closeMenu() {
    this.isMenuOpen.set(false);
  }
}