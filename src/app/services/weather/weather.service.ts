import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherBulk } from '../../interfaces/weather';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private baseUrl = 'http://api.weatherapi.com/v1';

  constructor(private http: HttpClient) {}

  findBy(cities: string[]): Observable<WeatherBulk> {
    const url = `${this.baseUrl}/current.json?q=bulk`;

    const data = this.buildRawData(cities);

    return this.http.post<WeatherBulk>(url, data);
  }

  private buildRawData(cities: string[]) {
    return { locations: cities.map(city => ({ q: city })) };
  }
}
