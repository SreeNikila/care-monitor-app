import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, EMPTY } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { DataService, ListItem } from '../services/data.service';

export interface ListingState {
  items: ListItem[];
  loading: boolean;
  error: string | null;
}

const initialState: ListingState = {
  items: [],
  loading: false,
  error: null
};

@Injectable()
export class ListingStore extends ComponentStore<ListingState> {

  constructor(private dataService: DataService) {
    super(initialState);
  }

  readonly items$ = this.select(state => state.items);
  readonly loading$ = this.select(state => state.loading);
  readonly error$ = this.select(state => state.error);

  readonly vm$ = this.select({
    items: this.items$,
    loading: this.loading$,
    error: this.error$
  });

  readonly setLoading = this.updater((state, loading: boolean) => ({
    ...state,
    loading
  }));

  readonly setItems = this.updater((state, items: ListItem[]) => ({
    ...state,
    items,
    loading: false,
    error: null
  }));

  readonly setError = this.updater((state, error: string) => ({
    ...state,
    error,
    loading: false
  }));

  readonly removeItem = this.updater((state, itemId: number) => ({
    ...state,
    items: state.items.filter(item => item.id !== itemId)
  }));

  readonly addItem = this.updater((state, item: ListItem) => ({
    ...state,
    items: [...state.items, item]
  }));

  readonly updateItem = this.updater((state, updatedItem: ListItem) => ({
    ...state,
    items: state.items.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    )
  }));

  readonly loadItems = this.effect((trigger$: Observable<void>) =>
    trigger$.pipe(
      tap(() => this.setLoading(true)),
      switchMap(() =>
        this.dataService.getItems().pipe(
          tap(items => this.setItems(items)),
          catchError(error => {
            this.setError('Failed to load items');
            return EMPTY;
          })
        )
      )
    )
  );

  readonly deleteItem = this.effect((itemId$: Observable<number>) =>
    itemId$.pipe(
      switchMap(itemId =>
        this.dataService.deleteItem(itemId).pipe(
          tap(success => {
            if (success) {
              this.removeItem(itemId);
            } else {
              this.setError('Failed to delete item');
            }
          }),
          catchError(error => {
            this.setError('Failed to delete item');
            return EMPTY;
          })
        )
      )
    )
  );
}
