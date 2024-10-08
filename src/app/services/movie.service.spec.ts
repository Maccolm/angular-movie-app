import { TestBed, getTestBed } from '@angular/core/testing';
import { MovieService } from './movie.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiMovieModel, DetailsMovie, Movie, ReviewsApi } from '../models/movie.models';
import { popularMovies } from '../../../mock-data';
import { AuthService } from './auth.service';

describe('MovieService', () => {
  let service: MovieService;
  let httpTestingController: HttpTestingController;
  let injector: TestBed;
  const mockAccountId = 12345;
  const mockSessionId = 'session123';
  const authServiceMock = {
	getPublicAccountId: jest.fn().mockReturnValue(mockAccountId),
	getSessionId: jest.fn().mockReturnValue(mockSessionId),
 };
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
  const mockMoviesApi: ApiMovieModel = {
	page: 1,
	results: popularMovies,
	total_pages: 1,
	total_results: 1,
 };
 const mockReviewApi: ReviewsApi = {
	id: 1,
	page: 1,
	results: [
	  {
		 author: 'John Doe',
		 author_details: {
			name: 'John Doe',
			username: 'johndoe',
			avatar_path: '/somepath.jpg',
			rating: 8, 
		 },
		 content: 'This is a review content',
		 created_at: '2023-09-20T12:34:56.000Z',
		 id: '12345',
		 updated_at: '2023-09-21T12:34:56.000Z',
		 url: 'https://example.com/review/12345',
	  },
	],
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
	 service['accountId'] = mockAccountId;
	 service['sessionId'] = mockSessionId;
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return movies by category', () => {
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
  it('should return trending movies', () => {	
	service.getTrendingMovies().subscribe((data) => {
		expect(data).toEqual(mockMoviesApi);
	});

	const req = httpTestingController.expectOne(
		(request) =>
			request.url.includes(service['apiKey'])
	);
	expect(req.request.method).toBe('GET');
	req.flush(mockMoviesApi);
  });
  
  it('should return movies from the search', () => {
	const query = 'query';
	const page = 1;
	service.searchMovie(query, page).subscribe((data) => {
		expect(data).toEqual(mockMoviesApi);
	});
	const req = httpTestingController.expectOne(
		(request) => 
			request.url.includes(query) &&
			request.url.includes(page.toString()) &&
			request.url.includes(service['apiKey'])
	);
	expect(req.request.method).toBe('GET');
	req.flush(mockMoviesApi);
  });

  it('should return sorted movies by category', () => {
	const method = 'popularity';
	const page = 1;
	service.sortMoviesBy(method, page).subscribe((data) => {
		expect(data).toEqual(mockMoviesApi);
	});
	const req = httpTestingController.expectOne(
		(request) => 
			request.url.includes(method) &&
			request.url.includes(page.toString()) &&
			request.url.includes(service['apiKey'])
	);
	expect(req.request.method).toBe('GET');
	req.flush(mockMoviesApi);
  });

  it('should return media by movie id', () => {
	const id = 1;
	service.getMovieMedia(id).subscribe((data) => {
		expect(data).toEqual(mockMoviesApi);
	});
	const req = httpTestingController.expectOne(
		(request) => 
			request.url.includes(id.toString()) &&
			request.url.includes(service['apiKey'])
	);
	expect(req.request.method).toBe('GET');
	req.flush(mockMoviesApi);
  });

  it('should return videos by movie id', () => {
	const id = 1;
	service.getVideosById(id).subscribe((data) => {
		expect(data).toEqual(mockMoviesApi);
	});
	const req = httpTestingController.expectOne(
		(request) => 
			request.url.includes(id.toString()) &&
			request.url.includes(service['apiKey'])
	);
	expect(req.request.method).toBe('GET');
	req.flush(mockMoviesApi);
  });

  it('should return similar movies by movie id', () => {
	const id = 1;
	service.getSimilarMovies(id).subscribe((data) => {
		expect(data).toEqual(mockMoviesApi);
	});
	const req = httpTestingController.expectOne(
		(request) => 
			request.url.includes(id.toString()) &&
			request.url.includes(service['apiKey'])
	);
	expect(req.request.method).toBe('GET');
	req.flush(mockMoviesApi);
  });

  it('should return reviews by movie id', () => {
	const id = 1;
	const page = 1;
	service.getReviewsOnMovie(id, page).subscribe((data) => {
		expect(data).toEqual(mockReviewApi);
	});
	const req = httpTestingController.expectOne(
		(request) => 
			request.url.includes(id.toString()) &&
			request.url.includes(service['apiKey'])
	);
	expect(req.request.method).toBe('GET');
	req.flush(mockReviewApi);
  });
  
  it('should return filtered movies', () => {
	const genres = [22,28];
	const year = 2024;
	const page = 1;
	service.getFilteredMovies(genres, year, page).subscribe((data) => {
		expect(data).toEqual(mockMoviesApi);
	});
	const apiGenres = genres.join('%2C');
	const req = httpTestingController.expectOne(
		(request) => 
			request.url.includes(apiGenres) &&
			request.url.includes(year.toString()) &&
			request.url.includes(page.toString())
	);
	expect(req.request.method).toBe('GET');
	req.flush(mockMoviesApi);
  });
//favorite list functions===========================================
  it('should return favorites movies', () => {
	service.getFavoriteMovies().subscribe((movies) => {
		expect(movies).toEqual(mockMovies);
	});
	const req = httpTestingController.expectOne(
		(request) => 
			request.url.includes(mockAccountId.toString()) &&
			request.url.includes(service['apiKey']) &&
			request.url.includes(mockSessionId)
	);
	expect(req.request.method).toBe('GET');
	req.flush({ results: mockMovies });
  });

  it('should set movie to favorites', () => {
	service.setToFavoriteMovies(mockMovie).subscribe((response) => {
		expect(response).toEqual(mockMovie);
	});
	const req = httpTestingController.expectOne(
		(request) =>
			request.url.includes(mockAccountId.toString()) &&
			request.url.includes(service['apiKey']) &&
			request.url.includes(mockSessionId)
	);
	expect(req.request.method).toBe('POST');
	expect(req.request.body).toEqual({
		media_type: 'movie',
		media_id: mockMovie.id,
		favorite: true,
	});
	req.flush(mockMovie);
  });

  it('should remove movie from favorite list', () => {
	service.removeFromFavoriteMovies(mockMovie).subscribe((response) => {
		expect(response).toEqual(mockMovie);
	});
	const req = httpTestingController.expectOne(
		(request) => 
			request.url.includes(mockAccountId.toString()) &&
			request.url.includes(service['apiKey']) &&
			request.url.includes(mockSessionId)
	);
	expect(req.request.method).toBe('POST');
	expect(req.request.body).toEqual({
		media_type: 'movie',
		media_id: mockMovie.id,
		favorite: false,
	});
	req.flush(mockMovie);
  });
//watchList functions==================================================
	it('should return watch list movies', () => {
	service.getWatchList().subscribe((movies) => {
		expect(movies).toEqual(mockMovies);
	});
	const req = httpTestingController.expectOne(
		(request) => 
			request.url.includes(mockAccountId.toString()) &&
			request.url.includes(service['apiKey']) &&
			request.url.includes(mockSessionId)
	);
	expect(req.request.method).toBe('GET');
	req.flush({ results: mockMovies });
	});

	it('should set movie to watch list', () => {
	service.setToWatchList(mockMovie).subscribe((response) => {
		expect(response).toEqual(mockMovie);
	});
	const req = httpTestingController.expectOne(
		(request) =>
			request.url.includes(mockAccountId.toString()) &&
			request.url.includes(service['apiKey']) &&
			request.url.includes(mockSessionId)
	);
	expect(req.request.method).toBe('POST');
	expect(req.request.body).toEqual({
		media_type: 'movie',
		media_id: mockMovie.id,
		watchlist: true,
	});
	req.flush(mockMovie);
	});
	
	it('should remove movie from watch list', () => {
		service.removeFromWatchList(mockMovie).subscribe((response) => {
			expect(response).toEqual(mockMovie);
		});
		const req = httpTestingController.expectOne(
			(request) => 
				request.url.includes(mockAccountId.toString()) &&
				request.url.includes(service['apiKey']) &&
				request.url.includes(mockSessionId)
		);
		expect(req.request.method).toBe('POST');
		expect(req.request.body).toEqual({
			media_type: 'movie',
			media_id: mockMovie.id,
			watchlist: false,
		});
		req.flush(mockMovie);
	  });
});
