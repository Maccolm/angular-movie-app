import { ApiMovieModel, Movie, TvShow } from "../models/movie.models";

export interface MovieState {
	movies: Movie[] | null;
	favoriteMovies: Movie[] | null;
	watchList: Movie[] | null;
	selectedMovies: Movie | null;
	trendingMovies?: ApiMovieModel | null;
	searchedMovies?: ApiMovieModel | null;
	error?: any;
	query?: string | null;
	tvShows: TvShow[] | null;
};
export const initialState: MovieState = {
	movies: null,
	favoriteMovies:  null,
	watchList: null,
	selectedMovies: null,
	trendingMovies: null,
	searchedMovies: null,
	query: null,
	tvShows: null,
};