import { Component, Input, OnInit } from '@angular/core';
import { WeatherQuery } from '../../interfaces/weather';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() weather: WeatherQuery;
  @Input() deleteWeather: (city: string) => void;

  constructor() {}

  ngOnInit() {}
}
