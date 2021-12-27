import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { WeatherService } from 'src/app/_shared/services/http/weather.service';
import { NotificationService } from 'src/app/_shared/services/generic/notification.service';

import { CityModel } from 'src/app/_shared/models/city.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})
export class HomeComponent {

  selectedCityWeather: any;

  selectedCity: any;

  cities: any;

  dailyForecasts: any;

  cartProducts: CityModel[] = [];

  constructor(private route: ActivatedRoute,
              private weatherService: WeatherService,
              private notifications: NotificationService) {}

  search(keyword: string): void {
    this.weatherService.getCities(keyword).then(response => {
      if (response) {
        this.cities = response;
      } else {
        // this.notifications.serverError();
      }
    });
  }

  getCityWeather(city: CityModel): void {
    this.weatherService.getCityWeather(city.Key).then(response => {
      this.selectedCityWeather = response[0];
      this.selectedCity = city;
      this.cities = [];
      this.weatherService.dailyForecasts(city.Key).then(res => {
        this.dailyForecasts = res;
      });
    });
  }

  addFavorite(): void {
    let favorites = JSON.parse(localStorage.getItem('favorites') as string);
    if (favorites) {
      const index = favorites.indexOf((fav: { Key: string | undefined; }) => fav.Key === this.selectedCityWeather.Key);
      if (index !== -1) {
        return;
      }
    } else {
      favorites = [];
    }

    this.selectedCity.isFavorite = true;

    Object.assign(this.selectedCityWeather, { name: this.selectedCity.LocalizedName });
    favorites.push(this.selectedCityWeather);

    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}
