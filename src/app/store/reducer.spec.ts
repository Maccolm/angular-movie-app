import { MovieReducer, initialState } from './reducer';
import * as MovieActions from './actions';
import { Movie, TvShow } from '../models/movie.models';

describe('MovieReducer', () => {
	const tvShows: TvShow[] = [{
		id: 1,
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
		poster_path: '/path/to/poster'
	}]
  it('should return the initial state', () => {
    const state = MovieReducer(undefined, { type: 'unknown' });
    expect(state).toBe(initialState);
  });

  it('should handle loadMoviesSuccess', () => {
    const movies: Movie[] = [{
		 id: 1,
		 title: 'Movie 1',
		 backdrop_path: '/path/to/backdrop',
		 original_language: 'en',
		 overview: 'An overview of the movie.',
		 popularity: 7.8,
		 release_date: '2023-01-01',
		 vote_average: 8.2,
		 vote_count: 1200,
		 poster_path: '/path/to/poster'
	 }];
    const expectedState = {
      ...initialState,
      movies: movies,
    };

    const state = MovieReducer(initialState, MovieActions.loadMoviesSuccess({ movies }));
    expect(state).toEqual(expectedState);
  });

  it('should handle loadMoviesFailure', () => {
    const error = 'Some error';
    const expectedState = {
      ...initialState,
      movies: null,
      error: error,
    };

    const state = MovieReducer(initialState, MovieActions.loadMoviesFailure({ error }));
    expect(state).toEqual(expectedState);
  });

  it('should handle loadFavoriteMoviesSuccess', () => {
    const favoriteMovies: Movie[] = [{ 
		id: 1,
		title: 'Movie 1',
		backdrop_path: '/path/to/backdrop',
		original_language: 'en',
		overview: 'An overview of the movie.',
		popularity: 7.8,
		release_date: '2023-01-01',
		vote_average: 8.2,
		vote_count: 1200,
		poster_path: '/path/to/poster' }];
    const expectedState = {
      ...initialState,
      favoriteMovies: favoriteMovies,
    };

    const state = MovieReducer(initialState, MovieActions.loadFavoriteMoviesSuccess({ favoriteMovies }));
    expect(state).toEqual(expectedState);
  });

  it('should handle loadFavoriteMoviesFailure', () => {
    const error = 'Some error';
    const expectedState = {
      ...initialState,
      favoriteMovies: null,
      error: error,
    };

    const state = MovieReducer(initialState, MovieActions.loadFavoriteMoviesFailure({ error }));
    expect(state).toEqual(expectedState);
  });

  it('should handle loadWatchListSuccess', () => {
    const watchList = [{
		id: 1,
		title: 'Movie 1',
		backdrop_path: '/path/to/backdrop',
		original_language: 'en',
		overview: 'An overview of the movie.',
		popularity: 7.8,
		release_date: '2023-01-01',
		vote_average: 8.2,
		vote_count: 1200,
		poster_path: '/path/to/poster'
	  }];
    const expectedState = {
      ...initialState,
      watchList: watchList,
    };

    const state = MovieReducer(initialState, MovieActions.loadWatchListSuccess({ watchList }));
    expect(state).toEqual(expectedState);
  });

  it('should handle loadWatchListFailure', () => {
    const error = 'Some error';
    const expectedState = {
      ...initialState,
      watchList: null,
      error: error,
    };

    const state = MovieReducer(initialState, MovieActions.loadWatchListFailure({ error }));
    expect(state).toEqual(expectedState);
  });

  it('should handle setMovieToFavorite', () => {
    const movie: Movie = { 
		id: 1,
		title: 'Movie 1',
		backdrop_path: '/path/to/backdrop',
		original_language: 'en',
		overview: 'An overview of the movie.',
		popularity: 7.8,
		release_date: '2023-01-01',
		vote_average: 8.2,
		vote_count: 1200,
		poster_path: '/path/to/poster'
	  };
    const expectedState = {
      ...initialState,
      favoriteMovies: [movie],
    };

    const state = MovieReducer(initialState, MovieActions.setMovieToFavorite({ movie }));
    expect(state).toEqual(expectedState);
  });

  it('should handle removeMovieFromFavorite', () => {
    const initialFavoriteMovies: Movie[] = [{ 
		id: 1,
		title: 'Movie 1',
		backdrop_path: '/path/to/backdrop',
		original_language: 'en',
		overview: 'An overview of the movie.',
		popularity: 7.8,
		release_date: '2023-01-01',
		vote_average: 8.2,
		vote_count: 1200,
		poster_path: '/path/to/poster'
	  }];
    const initialTestState = {
      ...initialState,
      favoriteMovies: initialFavoriteMovies,
    };
    const expectedState = {
      ...initialState,
      favoriteMovies: [],
    };

    const state = MovieReducer(initialTestState, MovieActions.removeMovieFromFavorite({ movieId: 1 }));
    expect(state).toEqual(expectedState);
  });

  it('should handle setMovieToWatchList', () => {
    const movie: Movie = {
		id: 1,
		title: 'Movie 1',
		backdrop_path: '/path/to/backdrop',
		original_language: 'en',
		overview: 'An overview of the movie.',
		popularity: 7.8,
		release_date: '2023-01-01',
		vote_average: 8.2,
		vote_count: 1200,
		poster_path: '/path/to/poster'
	  };
    const expectedState = {
      ...initialState,
      watchList: [movie],
    };

    const state = MovieReducer(initialState, MovieActions.setMovieToWatchList({ movie }));
    expect(state).toEqual(expectedState);
  });

  it('should handle removeMovieFromWatchList', () => {
    const initialWatchList: Movie[] = [{ 
		id: 1,
		title: 'Movie 1',
		backdrop_path: '/path/to/backdrop',
		original_language: 'en',
		overview: 'An overview of the movie.',
		popularity: 7.8,
		release_date: '2023-01-01',
		vote_average: 8.2,
		vote_count: 1200,
		poster_path: '/path/to/poster'
	  }];
    const initialTestState = {
      ...initialState,
      watchList: initialWatchList,
    };
    const expectedState = {
      ...initialState,
      watchList: [],
    };

    const state = MovieReducer(initialTestState, MovieActions.removeMovieFromWatchList({ movieId: 1 }));
    expect(state).toEqual(expectedState);
  });

  it('should handle loadTvShowSuccess', () => {
	const expectedState = {
		...initialState,
		tvShows: tvShows,
		error: null,
	};
	const state = MovieReducer(initialState, MovieActions.loadTvShowsSuccess({ tvShows }));
	expect(state).toEqual(expectedState);
  })
});
