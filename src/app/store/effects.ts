	import { Actions, createEffect, ofType } from '@ngrx/effects';
    import { Injectable } from '@angular/core';
    import { loadMovies, loadMoviesFailure, loadMoviesSuccess } from './actions';
	 import { MovieService } from '../services/movie.service';
    import { catchError, map, mergeMap } from 'rxjs/operators';
    import { of } from 'rxjs';
    
	 @Injectable()
	 export class MovieEffects {
		loadMovies$ = createEffect(() =>
		  this.actions$.pipe(
			 ofType(loadMovies),
			 mergeMap((action) => {
				const { category } = action;
				return this.movieService.getMoviesByCategory(category).pipe(
				  map(movies => {
					 return loadMoviesSuccess({
						movies: movies.results,
					 });
				  }),
				  catchError(error => {
					 return of(
						loadMoviesFailure({
						  error,
						})
					 );
				  })
				)
			 })
		  )
		);
	 
		constructor(
		  private actions$: Actions,
		  private movieService: MovieService
		) {}
	 }
	 