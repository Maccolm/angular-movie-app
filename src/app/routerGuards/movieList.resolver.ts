import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadFavoriteMovies, loadMovies, loadWatchList } from '../store/actions';

@Injectable({
  providedIn: 'root',
})
export class movieListResolver implements Resolve<boolean> {
  constructor(private store: Store ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
	  const category = route.routeConfig?.path;
		if(category) {
			this.store.dispatch(loadMovies({category}))
		}
		this.store.dispatch(loadFavoriteMovies())
		this.store.dispatch(loadWatchList())
		return true;
  }
}
