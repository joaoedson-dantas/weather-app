import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { WeatherDatas } from '../../../../models/interfaces/WeatherDatas';
import { Subject, takeUntil } from 'rxjs';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
})
export class WeatherHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  initialCityName = 'São Paulo';
  weatherDatas!: WeatherDatas;
  searchIcon = faMagnifyingGlass;

  constructor(private weatherService: WeatherService) {}


  ngOnInit(): void {
    this.getWeatherData(this.initialCityName);
  }

  getWeatherData(cityName: string): void {
    this.weatherService.getWeatherData(cityName)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      next: (res) => {
        res && (this.weatherDatas = res);
        console.log(this.weatherDatas);
      },
      error: (err) => console.log(err),
    });
  }

  onSubmit(): void {
    this.getWeatherData(this.initialCityName);
    this.initialCityName = '';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

