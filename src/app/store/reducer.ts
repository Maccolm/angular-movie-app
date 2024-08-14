import { createReducer, on } from '@ngrx/store'
import { initialState } from './state'
import { clearMoviesState, loadFavoriteMoviesFailure, loadFavoriteMoviesSuccess, loadMoviesFailure, loadMoviesFromSearchSuccess, loadMoviesSuccess, loadWatchListFailure, loadWatchListSuccess, removeMovieFromFavorite, removeMovieFromWatchList, setMovieToFavorite, setMovieToWatchList } from './actions';

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
	}),
	on(setMovieToFavorite, (state, { movie }) => {
		return {
			...state,
			favoriteMovies: state.favoriteMovies ? [...state.favoriteMovies, movie] : [movie]
		}
	}),
	on(removeMovieFromFavorite, (state, { movieId }) => {
		return {
			...state,
			favoriteMovies: state.favoriteMovies ? [...state.favoriteMovies.filter(movie => movie.id !== movieId)] : []
		}
	}),

	on(setMovieToWatchList, (state, { movie }) => {
		return {
			...state,
			watchList: state.watchList ? [...state.watchList, movie] : [movie]
		}
	}),
	on(removeMovieFromWatchList, (state, { movieId }) => {
		return {
			...state,
			watchList: state.watchList ? [...state.watchList.filter(movie => movie.id !== movieId)] : []
		}
	}),

	on(loadMoviesFromSearchSuccess, (state, { searchedMovies, query }) => {
		return {
			...state,
			searchedMovies: searchedMovies,
			query: query,
		};
	}),
	on(clearMoviesState, state =>  ({
		...state,
		movies: null,
		query: ''
	}))
)

export { initialState };
