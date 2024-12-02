import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FamilyDTO } from '../familia/familiaDto';
@Injectable({
  providedIn: 'root'
})
export class FamilyService {
  private apiUrl = 'http://localhost:8080/api/families';

  constructor(private http: HttpClient) { }

  getFamiliesActive(): Observable<FamilyDTO[]> {
    return this.http.get<any>(`${this.apiUrl}/active`).pipe(
      map(response => {
        if (Array.isArray(response)) {
          return response;
        }
        return response.body || [];
      })
    );
  }

  getFamiliesInactive(): Observable<FamilyDTO[]> {
    return this.http.get<any>(`${this.apiUrl}/inactive`).pipe(
      map(response => Array.isArray(response) ? response : (response.body || []))
    );
  }

  getFamilyById(id: number): Observable<FamilyDTO> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.body || response)
    );
  }

  createFamily(family: FamilyDTO): Observable<FamilyDTO> {
    return this.http.post<any>(this.apiUrl, family).pipe(
      map(response => response.body || response)
    );
  }

  updateFamily(id: number, family: FamilyDTO): Observable<FamilyDTO> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, family).pipe(
      map(response => response.body || response)
    );
  }
}