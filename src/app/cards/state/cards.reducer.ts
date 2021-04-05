import * as cardsActions from './cards.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../state/app-state';
import {Card} from '../card.model';

export interface CardsState {
  entities: Card[];
  allEntities: Card[];
  filterSearch: string;
  error: string;
  page: number;
}

export interface AppState extends fromRoot.AppState {
  cards: CardsState;
}

export const defaultCard: CardsState = {
  entities: [],
  allEntities: [],
  filterSearch: '',
  page: 0,
  error: ''
};

export const initialState = defaultCard;

export function cardsReducer(
  state = initialState,
  action: cardsActions.CardsActions
): CardsState {
  switch (action.type) {
    case cardsActions.CardActionTypes.LOAD_CARDS_SUCCESS: {
      const allValues = [...state.allEntities, ...action.payload];
      const fValues = [...allValues.filter(value => value.name.includes(state.filterSearch))];
      return {
        ...state,
        entities: fValues,
        allEntities: allValues
      };
    }
    case cardsActions.CardActionTypes.LOAD_MORE_PAGE: {
      return {
        ...state,
        page: state.page + 1
      };
    }

    case cardsActions.CardActionTypes.FILTER_CARDS: {
      const fValues = [...state.allEntities.filter(value => value.name.toLowerCase().includes(action.payload.filterSearch.toLowerCase()))];
      return {
        ...state,
        filterSearch: action.payload.filterSearch,
        entities: fValues
      };
    }
    case cardsActions.CardActionTypes.LOAD_CARDS_FAIL: {
      return {
        ...state,
        entities: [],
        error: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

const getCardFeatureState = createFeatureSelector<CardsState>(
  'cards'
);

export const getCards = createSelector(
  getCardFeatureState,
  (state: CardsState) => state.entities
);

export const getAllCards = createSelector(
  getCardFeatureState,
  (state: CardsState) => state.allEntities
);


export const getPage = createSelector(
  getCardFeatureState,
  (state: CardsState) => state.page
);

export const getSearch = createSelector(
  getCardFeatureState,
  (state: CardsState) => state.filterSearch
);



export const getError = createSelector(
  getCardFeatureState,
  (state: CardsState) => state.error
);
