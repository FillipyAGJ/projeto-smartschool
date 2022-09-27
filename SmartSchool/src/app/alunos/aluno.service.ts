import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aluno } from '../models/Aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  private urlAluno = `${environment.baseUrl}/api/aluno`;

  constructor(private http: HttpClient) { }

  getAllAlunos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(`${this.urlAluno}/`);
  }

  getAlunoById(id: number): Observable<Aluno> {
    return this.http.get<Aluno>(`${this.urlAluno}/${id}`);
  }

  post(aluno: Aluno) {
    return this.http.post(`${this.urlAluno}`, aluno)
  }

  put(id: number, aluno: Aluno) {
    return this.http.put(`${this.urlAluno}/${id}`, aluno)
  }

  delete(id: number) {
    return this.http.delete(`${this.urlAluno}/${id}`)
  }
}
