import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Name, AddNameRequest } from '../models/name.model';
import { environment } from '../../environments/environment';

@Injectable()
export class NameService {
  private get apiUrl(): string {
    return `${environment.backendUrl}/api/names`;
  }

  constructor(private http: HttpClient) { }

  getAllNames(): Observable<Name[]> {
    return this.http.get<Name[]>(this.apiUrl);
  }

  addName(request: AddNameRequest): Observable<Name> {
    return this.http.post<Name>(this.apiUrl, request);
  }

  drawRandom(): Observable<Name> {
    return this.http.get<Name>(`${this.apiUrl}/random`);
  }

  deleteName(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  deleteAllNames(): Observable<void> {
    return this.http.delete<void>(this.apiUrl);
  }
}
