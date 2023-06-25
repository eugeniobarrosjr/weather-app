import {
  ComponentFixture,
  TestBed,
  async,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { IonicModule, ToastController } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomePage } from './home.page';
import { WeatherService } from '../../services/weather/weather.service';
import { WeatherBulk } from 'src/app/interfaces/weather';
import { of, throwError } from 'rxjs';
import { CityService } from 'src/app/services/city/city.service';
import { Cities, City } from 'src/app/interfaces/city';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let weatherService: WeatherService;
  let cityService: CityService;
  let toastController: ToastController;
  const mockWeathers: WeatherBulk = {
    bulk: [
      {
        query: {
          location: {
            name: 'Sorocaba',
          },
          current: {
            temp_c: 22.1,
            condition: {
              text: 'Sol',
              icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
            },
            wind_kph: 3.6,
            pressure_in: 30.16,
            precip_mm: 0,
          },
        },
      },
      {
        query: {
          location: {
            name: 'Curitiba',
          },
          current: {
            temp_c: 22.1,
            condition: {
              text: 'Sol',
              icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
            },
            wind_kph: 3.6,
            pressure_in: 30.16,
            precip_mm: 0,
          },
        },
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot(), HttpClientTestingModule],
      providers: [WeatherService, CityService, ToastController],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    weatherService = TestBed.inject(WeatherService);
    cityService = TestBed.inject(CityService);
    toastController = TestBed.inject(ToastController);
  });

  it('should create the home page', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchCitiesAndWeathers on initialization', () => {
    spyOn(component, 'fetchCitiesAndWeathers');
    fixture.detectChanges();

    expect(component.fetchCitiesAndWeathers).toHaveBeenCalled();
  });

  it('should fetch cities and weathers on initialization', fakeAsync(() => {
    spyOn(cityService, 'index').and.returnValue(
      of({
        cities: [
          { id: 1, name: 'Sorocaba' },
          { id: 2, name: 'Curitiba' },
        ],
      })
    );
    spyOn(weatherService, 'findBy').and.returnValue(of(mockWeathers));
    expect(component.isLoading).toBe(true);

    fixture.detectChanges();
    tick();

    expect(component.isLoading).toBe(false);
    expect(component.weathers).toEqual(mockWeathers.bulk);
  }));

  it('should handle error when fetching cities and weathers', fakeAsync(() => {
    spyOn(cityService, 'index').and.returnValue(
      throwError('Error fetching cities')
    );
    spyOn(weatherService, 'findBy').and.returnValue(of(mockWeathers));
    spyOn(component, 'presentToast');

    expect(component.isLoading).toBe(true);

    fixture.detectChanges();

    tick();

    expect(component.isLoading).toBe(false);
    expect(component.presentToast).toHaveBeenCalledWith(
      'Ocorreu um erro ao buscar os dados',
      'danger'
    );
    expect(component.weathers).toEqual([]);
  }));

  it('should present toast with correct parameters', async () => {
    const toastSpy = spyOn(toastController, 'create').and.returnValue(
      Promise.resolve({ present: () => {} } as any)
    );
    const message = 'Test message';
    const type = 'success';

    await component.presentToast(message, type);

    expect(toastSpy).toHaveBeenCalledWith({
      message,
      duration: 1500,
      position: 'bottom',
      color: type,
    });
  });
});
