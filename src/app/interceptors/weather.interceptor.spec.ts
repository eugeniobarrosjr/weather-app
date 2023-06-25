import { WeatherApiKeyInterceptor } from './weather.interceptor';
import { inject, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

describe('WeatherApiKeyInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: WeatherApiKeyInterceptor,
          multi: true,
        },
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should add API key to requests with "api.weather" in URL', inject(
    [HttpClient, HttpTestingController],
    (http: HttpClient, controller: HttpTestingController) => {
      const apiKey: string = 'fake-api-key';
      const url: string = 'http://api.weatherapi.com/v1/current.json';

      http.get(url).subscribe(response => {
        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne(request => {
        return (
          request.url === url &&
          request.params.has('key') &&
          request.params.get('key') === apiKey
        );
      });

      req.flush({});
    }
  ));

  it('should not add API key to requests without "api.weather" URL', () => {
    const mockRequestUrl = 'http://example.com';

    httpClient.get(mockRequestUrl).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const httpRequest = httpMock.expectOne(mockRequestUrl);
    expect(httpRequest.request.params.get('key')).toBeNull();

    httpRequest.flush({});
  });
});
