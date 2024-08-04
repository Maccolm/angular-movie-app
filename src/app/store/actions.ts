import { createAction, props } from "@ngrx/store";
import { Movie } from "../models/movie.models";

export const loadMovies = createAction('[Movie] Load Movies',
	props<{ category: string }>()
);

export const loadMoviesSuccess = createAction('[Movie] Load Movies Success',
	props<{ movies: Movie[] | null }>()
);

export const loadMoviesFailure = createAction('[Movie] Load Movies Failure',
	props<{ error: any }>()
);

export const loadFavoriteMovies = createAction('[Movie] Load Favorite Movies');

export const loadFavoriteMoviesSuccess = createAction('[Movie] Load Favorite Movies Success',
	props<{ favoriteMovies: Movie[] | null }>()
);
export const loadFavoriteMoviesFailure = createAction('[Movie] Load Favorite Movies Failure',
	props<{ error: any }>()
)

export const loadWatchList = createAction('[Movie] Load Watch List');

export const loadWatchListSuccess = createAction('[Movie] Load Watch List Success',
	props<{ watchList: Movie[] | null }>()
);
export const loadWatchListFailure = createAction('[Movie] Load Watch List Failure',
	props<{ error: any }>()
)