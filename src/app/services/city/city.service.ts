import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cities, City } from '../../interfaces/city';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  constructor(private http: HttpClient) {}

  index(): Observable<Cities> {
    return this.http.get<Cities>('/api/city');
  }

  create(name: string): Observable<City> {
    return this.http.post<City>('/api/city', {
      name,
    });
  }
}
