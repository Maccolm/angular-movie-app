import { createReducer, on } from '@ngrx/store'
import { initialState } from './state'
import { loadFavoriteMoviesFailure, loadFavoriteMoviesSuccess, loadMoviesFailure, loadMoviesSuccess, loadWatchListFailure, loadWatchListSuccess } from './actions';

export const MovieReducer = createReducer(
	initialState,

	on(loadMoviesSuccess, (state, { movies }) => {
		return {
			...state,
			movies: movies,
		};
	}),
	on(loadMoviesFailure, (state, { error }) => {
		return {
			...state,
			movies: null,
			error: error,
		};
	}),

	on(loadFavoriteMoviesSuccess, (state, { favoriteMovies }) => {
		return {
			...state,
			favoriteMovies: favoriteMovies
		};
	}),

	on(loadFavoriteMoviesFailure, (state, { error }) => {
		return {
			...state,
			favoriteMovies: null,
			error: error,
		}
	}),

	on(loadWatchListSuccess, (state, { watchList }) => {
		return {
			...state,
			watchList: watchList,
		}
	}),
	on(loadWatchListFailure, (state, { error }) => {
		return {
			...state,
			watchList: null,
			error: error,
		}
	})
)
