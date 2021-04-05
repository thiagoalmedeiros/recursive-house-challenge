import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Card } from './card.model';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private cardsUrl = 'https://api.elderscrollslegends.io/v1/cards';

  constructor(private http: HttpClient) {}

  getCards(page: any ): Observable<Card[]> {
    return this.http.get<any>( `${this.cardsUrl}?page=${page}`).pipe(
      map(response => {
        return response.cards;
      }),
      catchError(() => {
        return [];
      })
    );
  }
}
