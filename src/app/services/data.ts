import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// 1. Importa 'map' y 'shareReplay' de RxJS
import { Observable, map, shareReplay } from 'rxjs'; 

// 2. Define las "interfaces" para tipar tus datos
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

// 3. Define la forma completa del archivo JSON
interface AppData {
  profile: Profile;
  projects: Project[];
  contact: Contact;
}

@Injectable({
  providedIn: 'root' // Servicio global (Singleton)
})
export class DataService {

  private http = inject(HttpClient); // Inyecta el cliente HTTP
  private dataUrl = 'assets/data.json'; // Ruta a tu archivo JSON

  // 4. Observable "padre" que cachea la llamada HTTP a data.json
  private allData$: Observable<AppData> = this.http.get<AppData>(this.dataUrl).pipe(
    shareReplay(1) // 5. Cachea la respuesta y la comparte con todos los suscriptores
  );

  /** Petición GET 1: Obtener solo el perfil */
  getProfile(): Observable<Profile> {
    return this.allData$.pipe(
      map(data => data.profile) // 6. Extrae 'profile' de los datos cacheados
    );
  }

  /** Petición GET 2: Obtener solo los proyectos */
  getProjects(): Observable<Project[]> {
    return this.allData$.pipe(
      map(data => data.projects) // 7. Extrae 'projects' de los datos cacheados
    );
  }

  /** Petición GET 3: Obtener solo el contacto */
  getContact(): Observable<Contact> {
    return this.allData$.pipe(
      map(data => data.contact) // 8. Extrae 'contact' de los datos cacheados
    );
  }
  
  // --- ¡ESTE ES EL MÉTODO NUEVO QUE ARREGLA EL ERROR! ---
  /** Petición GET 4: Obtener un solo proyecto por su ID */
  getProjectById(id: number): Observable<Project | undefined> {
    // 9. Usa el observable cacheado 'allData$'
    return this.allData$.pipe(
      // 10. Extrae solo el array de proyectos
      map(data => data.projects),
      // 11. Usa el 'map' de RxJS para transformar el array...
      // 12. ...usando el '.find()' de JavaScript para encontrar el proyecto
      map(projects => projects.find(p => p.id === id))
    );
  }
}
