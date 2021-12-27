import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CityModel } from 'src/app/_shared/models/city.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

   readonly apiUrl = 'https://dataservice.accuweather.com/';

  readonly apiKey = '7weH8BqSuNb12BYCVyFf0j3SBk1Q5kn7';

  constructor(private http: HttpClient) {}

  getCities(keyword: string): Promise<CityModel[] | null> {
    const url = `${this.apiUrl}locations/v1/cities/autocomplete?apikey=${this.apiKey}&q=${keyword}&language=en`;
    return this.http.get(url)
      .toPromise()
      .then(response => response as CityModel[])
      .catch(() => null);
  }

  getCityWeather(cityKey: string): Promise<any> {
    const url = `${this.apiUrl}currentconditions/v1/${cityKey}?apikey=${this.apiKey}&language=en&details=false`;
    return this.http.get(url)
      .toPromise()
      .then(response => response)
      .catch(() => false);
  }

  dailyForecasts(cityKey: string): Promise<any> {
    const url = `${this.apiUrl}forecasts/v1/daily/5day/${cityKey}?apikey=${this.apiKey}&language=en&details=false&metric=true`;
    return this.http.get(url)
      .toPromise()
      .then(response => response)
      .catch(() => false);
  }
}
