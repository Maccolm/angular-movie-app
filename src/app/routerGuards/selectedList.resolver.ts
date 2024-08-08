import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadFavoriteMovies, loadWatchList } from '../store/actions';

@Injectable({
  providedIn: 'root',
})
export class selectedListResolver implements Resolve<boolean> {
  constructor(private store: Store ) {}

  resolve() {
		this.store.dispatch(loadFavoriteMovies());
		this.store.dispatch(loadWatchList());
		return true;
  }
}
