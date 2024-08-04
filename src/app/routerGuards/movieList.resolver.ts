import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Movie } from '../models/movie.models';
import { Observable, of, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectMovies } from '../store/selectors';
import { loadFavoriteMovies, loadMovies, loadWatchList } from '../store/actions';

@Injectable({
  providedIn: 'root',
})
export class movieListResolver implements Resolve<boolean> {
 private fv: Movie[] = [];
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
