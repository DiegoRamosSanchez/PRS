import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FamilyDTO } from '../familia/familiaDto';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {
  private apiUrl = 'https://bookish-pancake-wrg97j967xjpf5g69-8080.app.github.dev/api/families';

  constructor(private http: HttpClient) { }

  // Obtener familias activas
  getFamiliesActive(sortBy: string = 'id'): Observable<FamilyDTO[]> {
    return this.http.get<any>(`${this.apiUrl}/active`).pipe(
      map(response => Array.isArray(response) ? response : response.body || [])
    );
  }

  // Obtener familias inactivas
  getFamiliesInactive(sortBy: string = 'id'): Observable<FamilyDTO[]> {
    return this.http.get<any>(`${this.apiUrl}/inactive`).pipe(
      map(response => Array.isArray(response) ? response : response.body || [])
    );
  }

  // Obtener familia por ID
  getFamilyById(id: number): Observable<FamilyDTO> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.body || response)
    );
  }

  // Crear nueva familia
  createFamily(family: FamilyDTO): Observable<FamilyDTO> {
    return this.http.post<any>(this.apiUrl, family).pipe(
      map(response => response.body || response)
    );
  }

  // Actualizar familia
  updateFamily(id: number, family: FamilyDTO): Observable<FamilyDTO> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, family).pipe(
      map(response => response.body || response)
    );
  }

  // Eliminar familia
  deleteFamily(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/delete/${id}`, {}).pipe(
      map(() => {})
    );
  }

  // Activar familia
  activeFamily(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/active/${id}`, {}).pipe(
      map(() => {})
    );
  }

}
