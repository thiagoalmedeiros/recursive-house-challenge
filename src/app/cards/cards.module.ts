import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { cardsReducer } from './state/cards.reducer';
import { CardEffect } from './state/cards.effects';

import { CardsComponent } from './cards/cards.component';
import { CardsListComponent } from './cards-list/cards-list.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';




const cardRoutes: Routes = [{ path: '', component: CardsComponent }];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(cardRoutes),
    StoreModule.forFeature('cards', cardsReducer),
    EffectsModule.forFeature([CardEffect]),
    InfiniteScrollModule
  ],
  declarations: [
    CardsComponent,
    CardsListComponent
  ]
})
export class CardsModule {}
