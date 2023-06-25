import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
      imports: [ReactiveFormsModule, IonicModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should build the form with required validation', () => {
    const form = component.form;
    const nameControl = form.controls['name'];

    expect(form.valid).toBeFalse();

    nameControl.setValue('');
    expect(nameControl.valid).toBeFalse();

    nameControl.setValue('A');
    expect(nameControl.valid).toBeFalse();

    nameControl.setValue('Sorocaba');
    expect(nameControl.valid).toBeTrue();
    expect(form.valid).toBeTrue();
  });

  it('should call create method when form is submitted', () => {
    component.create = jasmine.createSpy('create');

    const cityName = 'Sorocaba';
    const nameControl = component.form.controls['name'];
    nameControl.setValue(cityName);

    component.submitForm();

    expect(component.create).toHaveBeenCalledWith(cityName);
  });
});
