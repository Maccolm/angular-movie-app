	import { Actions, createEffect, ofType } from '@ngrx/effects';
    import { Injectable } from '@angular/core';
    import { loadMovies, loadMoviesFailure, loadMoviesSuccess } from './actions';
	 import { MovieService } from '../services/movie.service';
    import { catchError, map, mergeMap } from 'rxjs/operators';
    import { of } from 'rxjs';
    
    @Injectable()
    export class ProspectEffects {
    
      loadMovies$ = createEffect(() =>
			this.actions$.pipe(
				ofType(loadMovies),
				mergeMap(() =>{
					return this.movieService.getPopularMovies().pipe(
						map(movies => 
							loadMoviesSuccess({
								movies: movies.results,
							})
						),
						catchError(error =>
							of(
								loadMoviesFailure({
									error,
								})
							)
						)
					)
				})
			)
		)
    constructor(
        private actions$: Actions,
        private movieService: MovieService
        ) {}
    }