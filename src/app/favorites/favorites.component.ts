import { Component, OnInit } from '@angular/core';

import { CityWeatherModel } from 'src/app/_shared/models/city-weather.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.styl']
})
export class FavoritesComponent implements OnInit {

  favorites: CityWeatherModel[];

  ngOnInit(): void {
    this.favorites = JSON.parse(localStorage.getItem('favorites') as string);
  }

  removeFromFavorites(index: number): void {
    this.favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
}
