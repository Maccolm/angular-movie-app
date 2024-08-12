import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  loadFavoriteMovies,
  loadFavoriteMoviesFailure,
  loadFavoriteMoviesSuccess,
  loadMovies,
  loadMoviesFailure,
  loadMoviesSuccess,
  loadWatchList,
  loadWatchListFailure,
  loadWatchListSuccess,
} from './actions';
import { MovieService } from '../services/movie.service';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class MovieEffects {
  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMovies),
      mergeMap((action) => {
        const { category, page } = action;
        return this.movieService.getMoviesByCategory(category, page).pipe(
          map((movies) => {
            return loadMoviesSuccess({
              movies: movies.results,
            });
          }),
          catchError((error) => {
            return of(
              loadMoviesFailure({
                error,
              })
            );
          })
        );
      })
    )
  );

  loadFavoriteMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFavoriteMovies),
      mergeMap(() => {
        return this.movieService.getFavoriteMovies().pipe(
          map((favoriteMovies) =>
            loadFavoriteMoviesSuccess({ favoriteMovies })
          ),
          catchError((error) => of(loadFavoriteMoviesFailure({ error })))
        );
      })
    )
  );

  loadWatchList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadWatchList),
      mergeMap(() => {
        return this.movieService.getWatchList().pipe(
          map((watchList) => loadWatchListSuccess({ watchList })),
          catchError((error) => of(loadWatchListFailure({ error })))
        );
      })
    )
  );

  constructor(private actions$: Actions, private movieService: MovieService) {}
}
