import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { WeatherDatas } from '../../../../models/interfaces/WeatherDatas';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
})
export class WeatherHomeComponent implements OnInit {
  initialCityName = 'São Paulo';
  weatherDatas!: WeatherDatas;

  constructor(private weatherService: WeatherService) {}
  ngOnInit(): void {
    this.getWeatherData(this.initialCityName);
  }

  getWeatherData(cityName: string): void {
    this.weatherService.getWeatherData(cityName).subscribe({
      next: (res) => {
        res && (this.weatherDatas = res);
        console.log(this.weatherDatas);
      },
      error: (err) => console.log(err),
    });
  }
}
