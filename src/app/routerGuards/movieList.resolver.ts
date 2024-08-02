import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Movie } from '../models/movie.models';
import { Observable, of, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectMovies } from '../store/selectors';
import { loadMovies } from '../store/actions';

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
		return true;
  }
}
