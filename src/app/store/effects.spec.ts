import { TestBed } from '@angular/core/testing';
import { of, ReplaySubject, throwError } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { MovieService } from '../services/movie.service';
import * as actions from './actions';
import { MovieEffects } from './effects'; 
import { ApiMovieModel, Movie } from '../models/movie.models';
import { popularMovies } from '../../../mock-data';

describe('MovieEffects', () => {
  let effects: MovieEffects;
  let actions$: ReplaySubject<any>;
  let movieService: MovieService;

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
	 
    actions$.next(actions.loadMovies({category: 'action'}));
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
  });
});