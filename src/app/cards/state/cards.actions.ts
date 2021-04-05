import { Action } from '@ngrx/store';
import {Card} from '../card.model';

export enum CardActionTypes {
  LOAD_CARDS = '[Card] Load Cards',
  LOAD_CARDS_SUCCESS = '[Card] Load Cards Success',
  LOAD_CARDS_FAIL = '[Card] Load Cards Fail',
  LOAD_MORE_PAGE = '[Card] Load more page value',
  FILTER_CARDS = '[Card] Filter Cards',
}

export class LoadCards implements Action {
  readonly type = CardActionTypes.LOAD_CARDS;
  constructor(public payload) {}
}

export class FilterCards implements Action {
  readonly type = CardActionTypes.FILTER_CARDS;
  constructor(public payload) {}
}

export class LoadMorePage implements Action {
  readonly type = CardActionTypes.LOAD_MORE_PAGE;
}

export class LoadCardsSuccess implements Action {
  readonly type = CardActionTypes.LOAD_CARDS_SUCCESS;

  constructor(public payload: Card[]) {}
}

export class LoadCardsFail implements Action {
  readonly type = CardActionTypes.LOAD_CARDS_FAIL;

  constructor(public payload: string) {}
}


export type CardsActions =
  | LoadCards
  | LoadCardsSuccess
  | LoadCardsFail
  | LoadMorePage
  | FilterCards;
