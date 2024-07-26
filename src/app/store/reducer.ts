import { createReducer, on } from '@ngrx/store'
import * as MovieActions from './actions'
import { initialState } from './state'

export const MovieReducer = createReducer(
	initialState,

	on(MovieActions.loadMoviesSuccess, (state, { movies }) => {
		return {
			...state,
			movies: movies,
		};
	}),
	on(MovieActions.loadMoviesFailure, (state, { error }) => {
		return {
			...state,
			movies: null,
			error: error,
		};
	}),
)