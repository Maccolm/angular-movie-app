import { TestBed, getTestBed } from '@angular/core/testing';
import { MovieService } from './movie.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiMovieModel, DetailsMovie, Movie } from '../models/movie.models';
import { popularMovies } from '../../../mock-data';
import { AuthService } from './auth.service';

describe('MovieService', () => {
  let service: MovieService;
  let httpTestingController: HttpTestingController;
  let injector: TestBed;
  const mockMovies: Movie[] = popularMovies;
  const mockMovie: Movie = {
    id: 1,
    title: 'Movie 1',
    backdrop_path: '/path/to/backdrop',
    original_language: 'en',
    overview: 'An overview of the movie.',
    popularity: 7.8,
    release_date: '2023-01-01',
    vote_average: 8.2,
    vote_count: 1200,
    poster_path: '/path/to/poster',
  };
  const mockMovieDetails: DetailsMovie = {
    id: 1,
    title: 'Test Movie',
    overview: 'Test Overview',
    genres: [],
    release_date: '2022-01-01',
    runtime: 120,
    vote_average: 8,
    vote_count: 1000,
    budget: 0,
    origin_country: [],
    backdrop_path: '',
    original_language: '',
    popularity: 0,
    poster_path: '',
  };
  const authServiceMock = {
	 getPublicAccountId: jest.fn(),
	 getSessionId: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MovieService,
		  { provide: AuthService, useValue: authServiceMock },
      ],
    });

    injector = getTestBed();

    service = injector.inject(MovieService);
    httpTestingController = injector.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return movies by category', () => {
    const mockMoviesApi: ApiMovieModel = {
      page: 1,
      results: popularMovies,
    };

    service.getMoviesByCategory('action').subscribe((data) => {
      expect(data).toEqual(mockMoviesApi);
    });

    const req = httpTestingController.expectOne(
      (request) =>
        request.url.includes('1') && request.url.includes(service['apiKey'])
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockMoviesApi);
  });

  it('should return movie details by id', () => {
    service.getMovieById(1).subscribe((data) => {
      expect(data).toEqual(mockMovieDetails);
    });

    const req = httpTestingController.expectOne(
      (request) =>
        request.url.includes(`${mockMovieDetails.id}`) &&
        request.url.includes(service['apiKey'])
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockMovieDetails);
  });
});
