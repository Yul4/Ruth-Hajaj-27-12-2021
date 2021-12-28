import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { CityModel } from 'src/app/_shared/models/city.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

   readonly baseUrl = 'https://dataservice.accuweather.com/';

  readonly apiKey = 'AeKm4zF6812QJElkpsRvhvqtnDrLM601';

  constructor(private http: HttpClient) {}

  getCities(keyword: string): Observable<CityModel[]> {
    const url = `${this.baseUrl}locations/v1/cities/autocomplete?apikey=${this.apiKey}&q=${keyword}&language=en`;
    return this.http.get(url)
      .pipe(map((response: any) => response as CityModel[]),
        catchError((e: any) => {
          return throwError(e);
        }));
  }

  getCityWeather(cityKey: string): Promise<any> {
    const url = `${this.baseUrl}currentconditions/v1/${cityKey}?apikey=${this.apiKey}&language=en&details=false`;
    return this.http.get(url)
      .toPromise()
      .then(response => response)
      .catch(() => false);
  }

  dailyForecasts(cityKey: string): Promise<any> {
    const url = `${this.baseUrl}forecasts/v1/daily/5day/${cityKey}?apikey=${this.apiKey}&language=en&details=false&metric=true`;
    return this.http.get(url)
      .toPromise()
      .then(response => response)
      .catch(() => false);
  }
}
