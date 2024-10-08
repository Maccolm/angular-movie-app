import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchResultsPageComponent } from './search-results-page.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MovieService } from '../../services/movie.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { ApiMovieModel, Movie } from '../../models/movie.models';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from '../../components/card-movie/movie-card.component';
import { SkeletonModule } from 'primeng/skeleton';
import { of } from 'rxjs';
import { selectSearchedMovies, selectSearchQuery } from '../../store/selectors';
import { loadMoviesFromSearch } from '../../store/actions';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

class MockAuth {
	isLoggedIn$ = of(true);
}
describe('SearchResultsPageComponent', () => {
  let component: SearchResultsPageComponent;
  let fixture: ComponentFixture<SearchResultsPageComponent>;
  let store: MockStore;
  let movieService: jest.Mocked<MovieService>;
  let confirmationService: ConfirmationService;
  let router: jest.Mocked<Router>;

  const storeMock = {
	dispatch: jest.fn(),
	select: jest.fn(() => of(mockApiData))
  };
  const mockMovies: Movie[] = [
	  {
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
	  },
 ];
  const mockApiData: ApiMovieModel = {
	  results: mockMovies,
	  total_pages: 5,
	  page: 1,
  }
  beforeEach(async () => {
	movieService = {
		getMoviesByCategory: jest.fn().mockReturnValue(of({ results: mockMovies })),
		removeFromFavoriteMovies: jest.fn(),
		searchMovie: jest.fn(),
	} as unknown as jest.Mocked<MovieService>;
    await TestBed.configureTestingModule({
      imports: [
			CommonModule,
			MovieCardComponent,
			SkeletonModule,
			SearchResultsPageComponent,
			HttpClientModule
		],
		providers: [
			provideMockStore({}),
			{ provide: MovieService, useValue: movieService },
			{ provide: AuthService, useClass: MockAuth },
			{
				provide: Router,
				useValue: {
					events: of([]),
				},
			},
		],
    })
    .compileComponents();
	 store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(SearchResultsPageComponent);
	 store.overrideSelector(selectSearchedMovies, mockApiData);
	 store.overrideSelector(selectSearchQuery, 'Movie');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should load search data on initialization', () => {
	const dispatchSpy = jest.spyOn(store, 'dispatch');
	component.ngOnInit();
	expect(dispatchSpy).toHaveBeenCalledWith(loadMoviesFromSearch({ query: 'Movie', page: 1 }));
	expect(component.searchData).toEqual(mockApiData);
	expect(component.moviesFromSearch).toEqual(mockApiData.results);
	expect(component.totalPages).toBe(mockApiData.total_pages);
  });
  it('should handle search query changes', () => {
	const dispatchSpy = jest.spyOn(store, 'dispatch');
	store.overrideSelector(selectSearchQuery, 'New Movie');
	component.ngOnInit();
	expect(dispatchSpy).toHaveBeenCalledWith(loadMoviesFromSearch({ query: 'New Movie', page: 1 }));
	expect(localStorage.getItem('searchQuery')).toBe('New Movie');
	expect(component.searchQuery).toBe('New Movie');
	expect(component.currentPage).toBe(1);
  });
  it('should change pages and dispatch action', () => {
	const dispatchSpy = jest.spyOn(store, 'dispatch');
	component.searchQuery = 'Movie';
	component.onPageChange(2);

	expect(dispatchSpy).toHaveBeenCalledWith(loadMoviesFromSearch({ query: 'Movie', page: 2 }));
	expect(localStorage.getItem('currentPage')).toBe('2');
	expect(component.currentPage).toBe(2);
});

it('should return visible pages for pagination', () => {
	component.totalPages = 10;
	component.currentPage = 5;
	const visiblePages = component.getVisiblePages();
	expect(visiblePages).toEqual([1, -1, 3, 4, 5, 6, 7, -1, 10]);
});
it('should generate skeleton array', () => {
	const skeletonArray = component.getSkeletonArray();
	expect(skeletonArray.length).toBe(component.skeletonCards);
});
});
