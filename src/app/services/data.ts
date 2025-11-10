import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// 1. Importa 'shareReplay' y 'map' de RxJS
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

  // 4. --- ¡MEJORA APLICADA! ---
  //    Crea un Observable "padre" que hace la llamada HTTP UNA SOLA VEZ.
  private allData$: Observable<AppData> = this.http.get<AppData>(this.dataUrl).pipe(
    // 5. 'shareReplay(1)' cachea la última respuesta (1) y la comparte
    //    con todos los suscriptores. Evita llamadas HTTP duplicadas.
    shareReplay(1)
  );

  /** Petición GET 1: Obtener solo el perfil */
  getProfile(): Observable<Profile> {
    // 6. Se suscribe al observable cacheado y extrae 'profile'
    return this.allData$.pipe(
      map(data => data.profile)
    );
  }

  /** Petición GET 2: Obtener solo los proyectos */
  getProjects(): Observable<Project[]> {
    // 7. Se suscribe al observable cacheado y extrae 'projects'
    return this.allData$.pipe(
      map(data => data.projects)
    );
  }

  /** Petición GET 3: Obtener solo el contacto */
  getContact(): Observable<Contact> {
    // 8. Se suscribe al observable cacheado y extrae 'contact'
    return this.allData$.pipe(
      map(data => data.contact)
    );
  }
}
