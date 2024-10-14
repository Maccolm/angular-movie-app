import { TestBed } from '@angular/core/testing';
import { of, ReplaySubject, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { MovieService } from '../services/movie.service';
import * as actions from './actions';
import { MovieEffects } from './effects'; 
import { ApiMovieModel, mockApiTvShowModel, Movie, TvShow } from '../models/movie.models';
import { popularMovies } from '../../../mock-data';

describe('MovieEffects', () => {
  let effects: MovieEffects;
  let actions$: ReplaySubject<any>;
  let movieService: MovieService;
  const mockApiMovies: ApiMovieModel = {
	page: 1,
	total_pages: 1,
	results: popularMovies,
	total_results: popularMovies.length
  };
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
 ];
  const mockApiTvShowModel: mockApiTvShowModel = {
	page: 1,
	total_pages: 1,
	results: mockTvShows,
	total_results: mockTvShows.length
  };
 
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MovieEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        {
          provide: MovieService,
          useValue: {
            getMoviesByCategory: jest.fn(),
            getFavoriteMovies: jest.fn(),
            getWatchList: jest.fn(),
				searchMovie: jest.fn(),
				getTrendingMovies: jest.fn()
          }
        }
      ]
    });

    effects = TestBed.inject(MovieEffects);
    movieService = TestBed.inject(MovieService);
    actions$ = new ReplaySubject(1);
  });

  it('should return loadMoviesSuccess on success', (done) => {
    const mockMovies: Movie[] = popularMovies;
	 const mockApiMovieModel: ApiMovieModel = {
      page: 1,
      results: mockMovies,
    };
	 
    actions$.next(actions.loadMovies({category: 'action', page: 1}));
	 jest.spyOn(movieService, 'getMoviesByCategory').mockReturnValue(of(mockApiMovieModel));

    effects.loadMovies$.subscribe(result => {
      expect(result).toEqual(actions.loadMoviesSuccess({ movies: mockMovies }));
      done();
    });
  });

  it('should return loadMoviesFailure on error', (done) => {
    const action = actions.loadMovies({ category: 'action' });
    const error = new Error('Failed to load movies');
  
    actions$.next(action);
	 jest.spyOn(movieService, 'getMoviesByCategory').mockReturnValue(throwError(() => error));


    effects.loadMovies$.subscribe(result => {
      expect(result).toEqual(actions.loadMoviesFailure({ error }));
      done();
    });
  });
  describe('FavoriteList', () => {
	it('should return loadFavoriteMoviesSuccess on success', (done) => {
		const mockFavoriteMovies: Movie[] = popularMovies;

		actions$.next(actions.loadFavoriteMovies());
		jest.spyOn(movieService, 'getFavoriteMovies').mockReturnValue(of(mockFavoriteMovies));

		effects.loadFavoriteMovies$.subscribe(result => {
			expect(result).toEqual(actions.loadFavoriteMoviesSuccess({ favoriteMovies: mockFavoriteMovies}));
			done();
		})
	});
	it('should return loadFavoriteMoviesFailure on error', (done) => {
	 const error = new Error('Failed to load favorite movies');
	 actions$.next(actions.loadFavoriteMovies());
	 jest.spyOn(movieService, 'getFavoriteMovies').mockReturnValue(throwError(() => error));
 
	 effects.loadFavoriteMovies$.subscribe(result => {
		 expect(result).toEqual(actions.loadFavoriteMoviesFailure({ error }));
		 done();
	 });
	});
  });
  describe('WatchList', () => {
	it('should return loadWatchListSuccess on success', (done) => {
		const mockWatchList: Movie[] = popularMovies;

		actions$.next(actions.loadWatchList());
		jest.spyOn(movieService, 'getWatchList').mockReturnValue(of(mockWatchList));

		effects.loadWatchList$.subscribe(result => {
			expect(result).toEqual(actions.loadWatchListSuccess({ watchList: mockWatchList}));
			done();
		})
	});
	it('should return loadWatchListFailure on error', (done) => {
		const error = new Error('Failed to load watchlist');
		actions$.next(actions.loadWatchList());
		jest.spyOn(movieService, 'getWatchList').mockReturnValue(throwError(() => error));
		effects.loadWatchList$.subscribe(result => {
			expect(result).toEqual(actions.loadWatchListFailure({ error }));
			done();
		});
	});
  });
  describe('SearchMovies', () => {
	it('should return loadMoviesFromSearchSuccess on successful search', (done) => {
		const mockSearchResults: ApiMovieModel = mockApiMovies;
		const query = 'Test';
		actions$.next(actions.loadMoviesFromSearch({ query, page: 1 }));
		jest.spyOn(movieService, 'searchMovie').mockReturnValue(of(mockSearchResults));
		effects.loadMoviesFromSearch$.subscribe(results => {
			expect(results).toEqual(actions.loadMoviesFromSearchSuccess({ searchedMovies: mockSearchResults, query }));
			done();
		});
	});
	it('should return loadMoviesFailure on search error', (done) => {
		const query = 'Test';
		const error = new Error('Failed to search movies');
		actions$.next(actions.loadMoviesFromSearch({query, page: 1}));
		jest.spyOn(movieService, 'searchMovie').mockReturnValue(throwError(() => error));
		effects.loadMoviesFromSearch$.subscribe(result => {
			expect(result).toEqual(actions.loadMoviesFailure({ error }));
			done();
		});
	});
  });
  describe('TrendingMovies', () => {
	it('should return loadTrendingMoviesSuccess on success', (done) => {
		const mockTrendingMovies: ApiMovieModel = mockApiMovies;
		actions$.next(actions.loadTrendingMovies());
		jest.spyOn(movieService, 'getTrendingMovies').mockReturnValue(of(mockTrendingMovies));
		effects.loadTrendingMovies$.subscribe(result => {
			expect(result).toEqual(actions.loadTrendingMoviesSuccess({ trendingMovies: mockTrendingMovies }));
			done();
		});
	});
	it('should return loadTrendingMoviesFailure on error', (done) => {
		const error = new Error('Failed to load trending movies');
		actions$.next(actions.loadTrendingMovies());
		jest.spyOn(movieService, 'getTrendingMovies').mockReturnValue(throwError(() => error));
		effects.loadTrendingMovies$.subscribe(result => {
			expect(result).toEqual(actions.loadTrendingMoviesFailure({ error }));
			done();
		});
	});
  });
  it('should return loadTvShow on success', (done) => {	
	actions$.next(actions.loadMovies({category: 'action', page: 1}));
	jest.spyOn(movieService, 'getMoviesByCategory').mockReturnValue(of(mockApiTvShowModel));

	effects.loadTvShows$.subscribe(result => {
	  expect(result).toEqual(actions.loadTvShowsSuccess({ tvShows: mockTvShows }));
	  done();
	});
 });
});