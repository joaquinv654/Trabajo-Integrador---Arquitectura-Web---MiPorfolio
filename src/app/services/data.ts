import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // <-- 1. Importamos Observable
import { map } from 'rxjs/operators'; // <-- 2. Importamos 'map' para transformar datos

// 3. (Requisito "tipos de datos") 
// Definimos la "forma" de nuestros datos con 'interfaces' de TypeScript.
// Esto ayuda a que el código sea más seguro y fácil de escribir.
export interface Profile {
  name: string;
  title: string;
  bio: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
}

export interface Contact {
  email: string;
  linkedin: string;
}

// 4. Esta es la "forma" completa de nuestro data.json
interface AppData {
  profile: Profile;
  projects: Project[];
  contact: Contact;
}

@Injectable({
  providedIn: 'root'
})
export class DataService { // (O DataService, asegúrate de que el nombre de la clase coincida)

  // 5. Inyectamos el HttpClient para poder hacer peticiones web
  private http = inject(HttpClient);

  // 6. Definimos la ruta a nuestro backend
  private dataUrl = 'assets/data.json';

  // 7. Esta es la forma moderna de implementar el requisito
  // de "3 peticiones GET"  usando un solo archivo.
  // Creamos 3 métodos que devuelven "Observables".

  /** Petición GET 1: Obtener solo el perfil */
  getProfile(): Observable<Profile> {
    return this.http.get<AppData>(this.dataUrl).pipe(
      map(data => data.profile) // Usamos 'map' para extraer solo el perfil
    );
  }

  /** Petición GET 2: Obtener solo los proyectos */
  getProjects(): Observable<Project[]> {
    return this.http.get<AppData>(this.dataUrl).pipe(
      map(data => data.projects) // Usamos 'map' para extraer solo los proyectos
    );
  }

  /** Petición GET 3: Obtener solo el contacto */
  getContact(): Observable<Contact> {
    return this.http.get<AppData>(this.dataUrl).pipe(
      map(data => data.contact) // Usamos 'map' para extraer solo el contacto
    );
  }
}
