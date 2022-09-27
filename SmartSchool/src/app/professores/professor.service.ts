import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Professor } from '../models/Professor';

@Injectable({
  providedIn: 'root'
})
export class ProfessoresService {

  private urlProfessor = `${environment.baseUrl}/api/professor`;

  constructor(private http: HttpClient) { }

  getAllProfessores(): Observable<Professor[]>{
    return this.http.get<Professor[]>(`${this.urlProfessor}/`);
  }

  getProfessorById(id: number): Observable<Professor> {
    return this.http.get<Professor>(`${this.urlProfessor}/${id}`);
  }

  post(professor: Professor) {
    return this.http.post(`${this.urlProfessor}`, professor);
  }

  put(id: number, professor: Professor) {
    return this.http.put(`${this.urlProfessor}/${id}`, professor);
  }

  delete(id: number) {
    return this.http.delete(`${this.urlProfessor}/${id}`);
  }
}
