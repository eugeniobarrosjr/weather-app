import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherBulk } from '../../interfaces/weather';
import { City } from '../../interfaces/city';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private baseUrl = 'http://api.weatherapi.com/v1';

  constructor(private http: HttpClient) {}

  findBy(cities: City[]): Observable<WeatherBulk> {
    const url = `${this.baseUrl}/current.json?q=bulk&lang=pt`;

    const data = this.buildRawData(cities);

    return this.http.post<WeatherBulk>(url, data);
  }

  private buildRawData(cities: City[]) {
    return { locations: cities.map(city => ({ q: city.name })) };
  }
}
