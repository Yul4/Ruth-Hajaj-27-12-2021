import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

import { WeatherService } from 'src/app/_shared/services/http/weather.service';

import { CityModel } from 'src/app/_shared/models/city.model';
import { CityWeatherModel } from 'src/app/_shared/models/city-weather.model';
import { DailyForecastsModel } from 'src/app/_shared/models/daily-forecasts.model';

@Component({
  selector: 'app-home-list',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})
export class HomeComponent implements OnInit {

  @ViewChild('citySearchInput', { static: true }) citySearchInput: ElementRef;

  isSearching: boolean;

  selectedCityWeather: CityWeatherModel;

  selectedCity: CityModel;

  cities: CityModel[];

  dailyForecasts: DailyForecastsModel;

  constructor(private route: ActivatedRoute,
              private weatherService: WeatherService) {

    this.isSearching = false;
  }

  ngOnInit(): void {
    fromEvent(this.citySearchInput.nativeElement, 'keyup').pipe(map((event: any) => {
        return event.target.value;
      }),
      filter(res => res.length >= 2),
      debounceTime(700),
      distinctUntilChanged()).subscribe((keyword: string) => {
        this.searchCities(keyword);
      });
  }

  searchCities(keyword: string): void {
    this.isSearching = true;

    this.weatherService.getCities(keyword).subscribe((res) => {
      this.isSearching = false;
      this.cities = res;
    }, () => {
      this.isSearching = false;
      window.alert('Server error. Please try again');
    });
  }

  getCityWeather(city: CityModel): void {
    this.weatherService.getCityWeather(city.Key).then(response => {
      if (response) {
        this.selectedCityWeather = response[0];
        this.selectedCity = city;
        this.cities = [];
        this.weatherService.dailyForecasts(city.Key).then(res => {
          this.dailyForecasts = res;
        });
      } else {
        window.alert('Server error. Please try again');
      }
    });
  }

  addFavorite(): void {
    let favorites = JSON.parse(localStorage.getItem('favorites') as string);
    if (favorites) {
      const favoriteIndex = favorites.indexOf(fav => fav.Key === this.selectedCityWeather.Key);
      const alreadyFavorite = favoriteIndex !== -1;
      if (alreadyFavorite) {
        window.alert('Item has already been added to your favorites list.');
        return;
      }
    } else {
      favorites = [];
    }

    this.selectedCity.isFavorite = true;

    Object.assign(this.selectedCityWeather, { Name: this.selectedCity.LocalizedName });
    favorites.push(this.selectedCityWeather);

    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}
