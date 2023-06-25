import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Cities, City } from '../../interfaces/city';
import { CityService } from './city.service';

describe('CityService', () => {
  let service: CityService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CityService],
    });

    service = TestBed.inject(CityService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch cities successfully', () => {
    const mockCities: City[] = [
      { id: 1, name: 'Sorocaba' },
      { id: 2, name: 'Curitiba' },
      { id: 3, name: 'Alphaville' },
    ];

    service.index().subscribe((response: Cities) => {
      expect(response.cities).toEqual(mockCities);
    });

    const req = httpMock.expectOne('/api/cities');
    expect(req.request.method).toBe('GET');
    req.flush({ cities: mockCities });
  });

  it('should create a city successfully', () => {
    const mockCity = {
      id: 4,
      name: 'New York',
    };

    service.create('New York').subscribe((city: City) => {
      expect(city).toEqual(mockCity);
    });

    const req = httpMock.expectOne('/api/cities');
    expect(req.request.method).toBe('POST');
    req.flush(mockCity);
  });

  it('should delete a city successfully', () => {
    service.delete('Sorocaba').subscribe(response => {
      expect(response).toEqual({ ok: true });
    });

    const req = httpMock.expectOne('/api/cities/Sorocaba');
    expect(req.request.method).toBe('DELETE');
    req.flush({ ok: true });
  });
});
