import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import * as cardActions from './cards.actions';
import {CardService} from '../card.service';
import {Card} from '../card.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CardEffect {
  constructor(
    private actions$: Actions,
    private cardService: CardService
  ) {}

  @Effect()
  loadCards$: Observable<Action> = this.actions$.pipe(
    ofType<cardActions.LoadCards>(
      cardActions.CardActionTypes.LOAD_CARDS
    ),
    mergeMap((action: cardActions.LoadCards) =>
      this.cardService.getCards(action.payload.page).pipe(
        map(
          (cards: Card[]) =>
            new cardActions.LoadCardsSuccess(cards)
        ),
        catchError(err => of(new cardActions.LoadCardsFail(err)))
      )
    )
  );
}
