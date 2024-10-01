import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieDescriptionComponent } from './description-movie-page.component';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';
import { isInFavorite, isInWatchList } from '../../store/selectors';
import { DetailsMovie } from '../../models/movie.models';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { AuthService } from '../../services/auth.service';
import { ConfirmationService } from 'primeng/api';

class ResizeObserver {
	constructor() {}
	observe() {}
	unobserve() {}
	disconnect() {}
 }
 
 declare const global: any;
 global.ResizeObserver = ResizeObserver;

const mockMovie: DetailsMovie = {
  id: 1,
  title: 'Mock Movie',
  spoken_languages: [
    {
      english_name: 'English',
      iso_639_1: '',
      name: '',
    },
  ],
  genres: [
    {
      name: 'Action',
      id: 0,
    },
  ],
  production_countries: [
    {
      name: 'USA',
      iso_3166_1: '',
    },
  ],
  production_companies: [
    {
      name: 'Company A',
      id: 0,
      logo_path: '',
      origin_country: '',
    },
  ],
  budget: 0,
  origin_country: [],
  backdrop_path: '',
  original_language: '',
  overview: '',
  popularity: 0,
  poster_path: '',
  release_date: '',
  vote_average: 7.5,
};
class MockAuth {
	isLoggedIn$ = of(true);
}
class MockConfirmationService {
	confirm = jest.fn();
}
const mockReviews = {
	results: [
	  {
		 author: 'Author 1',
		 author_details: {
			name: 'John Doe',
			username: 'johndoe',
			avatar_path: '/path-to-avatar.jpg', 
			rating: 5,
		 },
		 content: 'Great movie!',
		 created_at: '2023-01-01',
		 id: '1',
		 updated_at: '2023-01-02',
		 url: 'https://some-review-url.com',
	  },
	  {
		 author: 'Author 2',
		 author_details: {
			name: 'Jane Doe',
			username: 'janedoe',
			avatar_path: null,
			rating: 4,
		 },
		 content: 'Not bad',
		 created_at: '2023-01-01',
		 id: '2',
		 updated_at: '2023-01-02',
		 url: 'https://some-review-url.com',
	  }
	],
	page: 1
 };
describe('MovieDescriptionComponent', () => {
  let component: MovieDescriptionComponent;
  let fixture: ComponentFixture<MovieDescriptionComponent>;
  let movieService: MovieService;
  let confirmationService: ConfirmationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MovieDescriptionComponent,
      ],
      providers: [
        {
          provide: MovieService,
          useValue: {
            getMovieById: jest.fn().mockReturnValue(of(mockMovie)),
            setToFavoriteMovies: jest.fn().mockReturnValue(of(true)),
            setToWatchList: jest.fn().mockReturnValue(of(true)),
				getMovieMedia: jest.fn().mockReturnValue(of({ backdrops: [{ file_path: '/test.jpg' }] })),
				getVideosById: jest.fn().mockReturnValue(of({ results: [{ key: 'video1' }, { key: 'video2' }] })),
				getReviewsOnMovie: jest.fn().mockReturnValue(of(mockReviews)),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: () => '1',
            }),
          },
        },
        provideMockStore({
          selectors: [
            { selector: isInFavorite(1), value: false },
            { selector: isInWatchList(1), value: false },
          ],
        }),
		  { provide: AuthService, useClass: MockAuth },
		  { provide: ConfirmationService, useClass: MockConfirmationService },
      ],
		schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDescriptionComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService);
	 confirmationService = TestBed.inject(ConfirmationService);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch movie data on initialization', () => {
    expect(movieService.getMovieById).toHaveBeenCalledWith(1);
    expect(component.movie).toEqual(mockMovie);
    expect(component.originalLanguages).toEqual('English');
    expect(component.genres).toEqual('Action');
    expect(component.countries).toEqual('USA');
  });

  it('should update isInFavorite and isInWatchList based on store selectors', () => {
    expect(component.isInFavorite).toBe(false);
    expect(component.isInWatchList).toBe(false);
  });

  it('should add movie to favorites when user is logged in', () => {
    component.addToFavorites(new MouseEvent('click'));
    expect(movieService.setToFavoriteMovies).toHaveBeenCalledWith(mockMovie);
    fixture.detectChanges();
	 expect(component.isInFavorite).toBe(true);
  });

  it('should show confirmation dialog if user is not logged in when trying to add to favorites', () => {
    const authService = TestBed.inject(AuthService) as MockAuth;
	 authService.isLoggedIn$ = of(false);
    fixture.detectChanges();
	 component.addToFavorites(new MouseEvent('click'));
	 expect(confirmationService.confirm).not.toHaveBeenCalled();
  });
  it('should add movie to watchlist when user is logged in', () => {
	component.addToWatchList(new MouseEvent('click'));
	expect(movieService.setToWatchList).toHaveBeenCalledWith(mockMovie);
	fixture.detectChanges();
	expect(component.isInWatchList).toBe(true);
  });
  it('should show confirmation dialog if user is not logged in when trying to add to watchlist', () => {
	const authService = TestBed.inject(AuthService) as MockAuth;
	authService.isLoggedIn$ = of(false);
	fixture.detectChanges();
	component.addToWatchList(new MouseEvent('click'));
	expect(confirmationService.confirm).not.toHaveBeenCalled();
  });
  it('should calculate the correct rating percentage', () => {
	component.initRating(mockMovie.vote_average);
	expect(component.ratingPercentage).toBe(75);
  })
});
