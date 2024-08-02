import { createReducer, on } from '@ngrx/store'
import { initialState } from './state'
import { loadMoviesFailure, loadMoviesSuccess } from './actions';

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
)