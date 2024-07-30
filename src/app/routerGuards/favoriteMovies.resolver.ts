import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Movie } from '../models/movie.models';
import { MovieService } from '../services/movie.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class favoriteMoviesResolver implements Resolve<Movie[]> {
 private fv: Movie[] = [];
  constructor(private movieService: MovieService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Movie[]> {
	  return this.movieService.getFavoriteMovies().pipe(
		  tap((movies) => {
			  this.fv = movies;
		  })
	  );
  }
}
