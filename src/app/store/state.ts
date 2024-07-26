import { Movie } from "../models/movie.models";

export interface MovieState {
	movies: Movie[] | null;
	favoriteMovies: Movie[] | null;
	watchList: Movie[] | null;
	selectedMovies: Movie | null;
};
export const initialState: MovieState = {
	movies: null,
	favoriteMovies:  null,
	watchList: null,
	selectedMovies: null
};