import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  loadFavoriteMovies,
  loadFavoriteMoviesFailure,
  loadFavoriteMoviesSuccess,
  loadMovies,
  loadMoviesFailure,
  loadMoviesFromSearch,
  loadMoviesFromSearchSuccess,
  loadMoviesSuccess,
  loadTrendingMovies,
  loadTrendingMoviesFailure,
  loadTrendingMoviesSuccess,
  loadTvShows,
  loadTvShowsFailure,
  loadTvShowsSuccess,
  loadWatchList,
  loadWatchListFailure,
  loadWatchListSuccess,
} from './actions';
import { MovieService } from '../services/movie.service';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
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

  loadMoviesFromSearch$ = createEffect(() => this.actions$.pipe(
	ofType(loadMoviesFromSearch),
	switchMap((action) => {
		const { query, page } = action;
		return this.movieService.searchMovie( query, page ).pipe(
			map(searchedMovies => loadMoviesFromSearchSuccess({searchedMovies, query})),
			catchError(error => of(loadMoviesFailure({ error })))
		)
	})
  ));

  loadTrendingMovies$ = createEffect(() => this.actions$.pipe(
	ofType(loadTrendingMovies),
	switchMap(() =>{
		return this.movieService.getTrendingMovies().pipe(
			map((trendingMovies) => loadTrendingMoviesSuccess({ trendingMovies })),
			catchError((error) => of(loadTrendingMoviesFailure({ error })))
		)
	})
  ));

  loadTvShows$ = createEffect(() => this.actions$.pipe(
	ofType(loadTvShows),
	switchMap((action) => {
		const { category, page } = action;
		return this.movieService.getTvShowsByCategory(category, page).pipe(
			map((tvShows) => {
				return loadTvShowsSuccess({
					tvShows: tvShows.results,
				})
			}),
			catchError((error) => of(loadTvShowsFailure({ error })))
		)
	})
  ))

  constructor(private actions$: Actions, private movieService: MovieService) {}
}
