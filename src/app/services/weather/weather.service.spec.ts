import { WeatherService } from './weather.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { WeatherBulk } from '../../interfaces/weather';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService],
    });

    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch weather for multiple cities', () => {
    const cities = ['Sorocaba', 'Curitiba'];
    const mockWeatherData: WeatherBulk = {
      bulk: [
        {
          query: {
            location: {
              name: 'Sorocaba',
            },
            current: {
              condition: {
                icon: '//cdn.weatherapi.com/weather/64x64/night/113.png',
                text: 'Clear',
              },
              precip_mm: 0.0,
              pressure_in: 30.11,
              temp_c: 19.5,
              wind_kph: 2.9,
            },
          },
        },
        {
          query: {
            location: {
              name: 'Sorocaba',
            },
            current: {
              condition: {
                icon: '//cdn.weatherapi.com/weather/64x64/night/113.png',
                text: 'Clear',
              },
              precip_mm: 0.0,
              pressure_in: 30.11,
              temp_c: 19.5,
              wind_kph: 2.9,
            },
          },
        },
      ],
    };

    service.findBy(cities).subscribe(weatherData => {
      expect(weatherData).toEqual(mockWeatherData);
    });

    const req = httpMock.expectOne(request => {
      return (
        request.method === 'POST' &&
        request.url === 'http://api.weatherapi.com/v1/current.json?q=bulk' &&
        JSON.stringify(request.body.locations) ===
          JSON.stringify(cities.map(city => ({ q: city })))
      );
    });

    req.flush(mockWeatherData);
  });
});
