import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class WeatherApiKeyInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Request', request);
    if (request.url.includes('api.weather')) {
      const apiKey = environment.apiKey;

      const params = request.params.set('key', apiKey);
      request = request.clone({ params });
    }
    return next.handle(request);
  }
}
