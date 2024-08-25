import { ApiMovieModel, Movie } from "../models/movie.models";

export interface MovieState {
	movies: Movie[] | null;
	favoriteMovies: Movie[] | null;
	watchList: Movie[] | null;
	selectedMovies: Movie | null;
	trendingMovies?: ApiMovieModel | null;
	searchedMovies?: ApiMovieModel | null;
	error?: any;
	query?: string | null;
};
export const initialState: MovieState = {
	movies: null,
	favoriteMovies:  null,
	watchList: null,
	selectedMovies: null,
	trendingMovies: null,
	searchedMovies: null,
	query: null,
};