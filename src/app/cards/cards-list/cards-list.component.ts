import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as cardsActions from '../state/cards.actions';
import * as fromCard from '../state/cards.reducer';
import {Card} from '../card.model';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.css']
})
export class CardsListComponent implements OnInit {
  cards$: Observable<Card[]>;
  allCards$: Observable<Card[]>;
  error$: Observable<string>;
  search$: Observable<string>;

  constructor(private store: Store<fromCard.AppState>) {}

  ngOnInit() {
    this.store.dispatch(new cardsActions.LoadMorePage());
    this.cards$ = this.store.pipe(select(fromCard.getCards));
    this.allCards$ = this.store.pipe(select(fromCard.getAllCards));
    this.error$ = this.store.pipe(select(fromCard.getError));
    this.search$ = this.store.pipe(select(fromCard.getSearch));

    this.store.pipe(select(fromCard.getPage)).subscribe((value: number) => {
      this.store.dispatch(new cardsActions.LoadCards({page: value}));
    });
  }

  onScroll() {
    this.store.dispatch(new cardsActions.LoadMorePage());
  }

  onChange(value: string) {
    this.store.dispatch(new cardsActions.FilterCards({filterSearch: value}));
  }
}
