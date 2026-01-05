import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Name, AddNameRequest } from '../models/name.model';

@Injectable()
export class NameService {
  private apiUrl = 'http://localhost:5000/api/names';

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
