import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { forkJoin, switchMap } from 'rxjs';
import { WeatherQuery } from 'src/app/interfaces/weather';
import { WeatherService } from '../../services/weather/weather.service';
import { CityService } from '../../services/city/city.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  weathers: WeatherQuery[] = [];
  isLoading = true;
  isModalOpen = false;

  constructor(
    private http: HttpClient,
    private weatherService: WeatherService,
    private cityService: CityService,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.fetchCitiesAndWeathers();
  }

  fetchCitiesAndWeathers(event?: any) {
    this.cityService
      .index()
      .pipe(
        switchMap(response =>
          forkJoin(this.weatherService.findBy(response.cities))
        )
      )
      .subscribe(
        ([response]) => {
          this.isLoading = false;
          event?.target?.complete();
          return (this.weathers = response.bulk);
        },
        error => {
          this.isLoading = false;
          this.presentToast('Ocorreu um erro ao buscar os dados', 'danger');
        }
      );
  }

  delete = (city: string): void => {
    this.cityService.delete(city).subscribe(() => {
      this.weathers = this.weathers.filter(
        weather => weather.query.location.name !== city
      );
    });
  };

  create = (city: string): void => {
    this.cityService.create(city).subscribe(
      () => {
        this.fetchCitiesAndWeathers();
        this.setOpenModal(false);
        this.presentToast('Salvo com sucesso!', 'success');
      },
      error =>
        this.presentToast(
          'Ocorreu um erro ou a cidade já está cadastrada',
          'danger'
        )
    );
  };

  setOpenModal = (isOpen: boolean): void => {
    this.isModalOpen = isOpen;
  };

  async presentToast(message: string, type: 'danger' | 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position: 'bottom',
      color: type,
    });

    await toast.present();
  }
}
