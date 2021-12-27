import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { FavoritesComponent } from './favorites.component';
import { MatIconModule } from '@angular/material/icon';


const routes: Routes = [
  { path: '', component: FavoritesComponent }
];

@NgModule({
  declarations: [FavoritesComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatIconModule
    ]
})
export class FavoritesModule { }
