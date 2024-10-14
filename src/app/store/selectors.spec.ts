import { Movie, TvShow } from '../models/movie.models';
import { selectState, selectMovies, selectFavoriteMovies, selectWatchList, isInFavorite, isInWatchList } from './selectors';
import { MovieState } from './state';

const mockMovies: Movie[] = [
	{ id: 1, title: 'Movie 1', backdrop_path: '', poster_path: '', original_language: 'en', overview: '', popularity: 7.5, release_date: '2023-01-01', vote_average: 8.0, vote_count: 100 },
	{ id: 2, title: 'Movie 2', backdrop_path: '', poster_path: '', original_language: 'en', overview: '', popularity: 6.5, release_date: '2023-01-02', vote_average: 7.5, vote_count: 150 },
 ];
 const mockTvShows: TvShow[]  = [
	{ 	id: 1,
		title: 'Movie 1',
		name: 'Movie 1',
		original_name: 'Movie 1',
		first_air_date:'2023-01-01',
		backdrop_path: '/path/to/backdrop',
		original_language: 'en',
		overview: 'An overview of the movie.',
		popularity: 7.8,
		release_date: '2023-01-01',
		vote_average: 8.2,
		vote_count: 1200,
		poster_path: '/path/to/poster' },
 ]
 
 const initialState: MovieState = {
	movies: mockMovies,
	favoriteMovies: [mockMovies[0]],
	watchList: [mockMovies[1]],
	error: null,
	selectedMovies: null,
	tvShows: mockTvShows
 };

describe('Selectors', () => {

  it('should select the feature state', () => {
    return expect(selectState.projector(initialState)).toEqual(initialState);
  });

  it('should select the movies from the state', () => {
    expect(selectMovies.projector(initialState)).toEqual(initialState.movies);
  });
  it('should select favorite movies from the state', () => {
	const result = selectFavoriteMovies.projector(initialState);
	expect(result).toEqual(initialState.favoriteMovies);
 });

 it('should select watch list from the state', () => {
	const result = selectWatchList.projector(initialState);
	expect(result).toEqual(initialState.watchList);
 });

 it('should check if a movie is in favorite movies', () => {
	const movieId = 1;
	const result = isInFavorite(movieId).projector(initialState.favoriteMovies);
	expect(result).toBe(true);
 });

 it('should check if a movie is not in favorite movies', () => {
	const movieId = 2;
	const result = isInFavorite(movieId).projector(initialState.favoriteMovies);
	expect(result).toBe(false);
 });

 it('should check if a movie is in watch list', () => {
	const movieId = 2;
	const result = isInWatchList(movieId).projector(initialState.watchList);
	expect(result).toBe(true);
 });

 it('should check if a movie is not in watch list', () => {
	const movieId = 1;
	const result = isInWatchList(movieId).projector(initialState.watchList);
	expect(result).toBe(false);
 });
});