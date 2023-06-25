import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { forkJoin, switchMap } from 'rxjs';
import { WeatherQuery } from 'src/app/interfaces/weather';
import { Cities } from '../../interfaces/city';
import { WeatherService } from '../../services/weather/weather.service';
import { CityService } from '../../services/city/city.service';
import {
  IonRefresher,
  RefresherEventDetail,
  ToastController,
} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  weathers: WeatherQuery[] = [];
  isLoading = true;

  constructor(
    private http: HttpClient,
    private weatherService: WeatherService,
    private cityService: CityService,
    private toastController: ToastController
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
