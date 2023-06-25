import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { IonicModule } from '@ionic/angular';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      declarations: [CardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the weather location name', () => {
    const locationName = 'Sorocaba';

    component.weather = {
      query: {
        location: { name: locationName },
        current: {
          wind_kph: 0,
          precip_mm: 0,
          pressure_in: 0,
          temp_c: 0,
          condition: { icon: '', text: '' },
        },
      },
    };
    fixture.detectChanges();

    const locationElement: HTMLElement =
      fixture.nativeElement.querySelector('.card__title');

    expect(locationElement.textContent).toContain(locationName);
  });

  it('should call deleteWeather method when delete button is clicked', () => {
    component.deleteWeather = jasmine.createSpy('deleteWeather');

    const locationName = 'Sorocaba';
    component.weather = {
      query: {
        location: { name: locationName },
        current: {
          wind_kph: 0,
          precip_mm: 0,
          pressure_in: 0,
          temp_c: 0,
          condition: { icon: '', text: '' },
        },
      },
    };
    fixture.detectChanges();

    const deleteButton: HTMLButtonElement =
      fixture.nativeElement.querySelector('ion-button');

    deleteButton.click();

    expect(component.deleteWeather).toHaveBeenCalledWith(locationName);
  });
});
