import { createAction, props } from "@ngrx/store";
import { ApiMovieModel, Movie } from "../models/movie.models";

export const loadMovies = createAction('[Movie] Load Movies',
	props<{ category: string, page?: number; }>()
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

export const setMovieToFavorite = createAction('[Movie] Set Movie To Favorite',
	props<{ movie: Movie }>()
)
export const removeMovieFromFavorite = createAction('[Movie] Remove Movie From Favorite',
	props<{ movieId: number }>()
)

export const setMovieToWatchList = createAction('[Movie] Set Movie To Watch List',
	props<{ movie: Movie }>()
) 
export const removeMovieFromWatchList = createAction('[Movie] Remove Movie From Watch List',
	props<{ movieId: number }>()
)

export const loadMoviesFromSearch = createAction('[Search] Load Movies', 
	props<{ query: string, page?: number }>()
)
export const loadMoviesFromSearchFailure = createAction('[Search] Load Movies Failure',
	props<{ error: any }>()
)
export const loadMoviesFromSearchSuccess = createAction('[Search] Load Movies Success',
	props<{ searchedMovies: ApiMovieModel, query: string }>()
)
export const clearMoviesState = createAction('[Movies] Clear Movies State');

export const loadTrendingMovies = createAction('[Movie] Load Trending Movies')
export const loadTrendingMoviesSuccess = createAction('[Movie] Load Trending Movies Success',
	props<{ trendingMovies: ApiMovieModel }>()
)
export const loadTrendingMoviesFailure = createAction('[Movie] Load Trending Movies Failure',
	props<{ error: any }>()
)