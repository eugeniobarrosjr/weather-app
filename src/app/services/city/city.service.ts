import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../../interfaces/city';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  constructor(private http: HttpClient) {}

  index(): Observable<City[]> {
    return this.http.get<City[]>('/api/city');
  }

  create(name: string): Observable<City> {
    return this.http.post<City>('/api/city', {
      name,
    });
  }
}
