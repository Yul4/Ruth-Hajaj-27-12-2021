import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html'
})
export class FavoritesComponent implements OnInit {

  favorites: any;

  ngOnInit(): void {
    this.favorites = JSON.parse(localStorage.getItem('favorites') as string);
  }

  removeFromFavorites(index: number): void {
    this.favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
}
