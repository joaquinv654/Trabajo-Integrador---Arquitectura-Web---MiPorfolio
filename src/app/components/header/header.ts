import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- 1. ¡ASEGÚRATE DE IMPORTAR ESTO!

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule // <-- 2. ¡ASEGÚRATE DE AÑADIR ESTO AQUÍ!
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {
  
  private authService = inject(AuthService);
  private router = inject(Router);

  // 3. Apuntamos a la nueva señal 'isAuthenticated' del servicio
  public isLoggedIn = this.authService.isAuthenticated;

  public isMenuOpen = signal(false);

  // 4. ¡NUEVO! Este método es llamado por el botón de Login
  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
    this.isMenuOpen.set(false); 
    this.router.navigate(['/']); 
  }

  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }
}