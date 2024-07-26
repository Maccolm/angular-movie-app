import { createAction, props } from "@ngrx/store";
import { Movie } from "../models/movie.models";

export const loadMovies = createAction('[Movie] Load Movies');

export const loadMoviesSuccess = createAction('[Movie] Load Movies Success',
	props<{ movies: Movie[] | null }>()
);

export const loadMoviesFailure = createAction('[Movie] Load Movies Failure',
	props<{ error: any }>()
);