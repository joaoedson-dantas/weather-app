import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = '05548647f85f0cb5cd6f7ea9a3c917d1';

  constructor(private http: HttpClient) {}

  getWeatherData(cityName: string): Observable<any> {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pt_br&appid=${this.apiKey}`,
      {}
    );
  }
}


