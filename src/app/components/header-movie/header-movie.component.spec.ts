import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieHeaderComponent } from './header-movie.component';
import { Router, RouterModule } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MovieService } from '../../services/movie.service';
import { ConfirmationService } from 'primeng/api';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { ApiMovieModel, Movie } from '../../models/movie.models';
import { selectSearchedMovies, selectSearchQuery } from '../../store/selectors';
import { loadMoviesFromSearch } from '../../store/actions';
import { SearchResultsPageComponent } from '../../pages/search-results-page/search-results-page.component';

class MockAuth {
	isLoggedIn = of(true);
}
describe('MovieHeaderComponent', () => {

	let component: MovieHeaderComponent;
	let fixture: ComponentFixture<MovieHeaderComponent>;
	let store: MockStore;
	let movieService: jest.Mocked<MovieService>;
	let confirmationService: ConfirmationService;
	let router: jest.Mocked<Router>;
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
	const movieServiceMock = {
		searchMovie: jest.fn(),
	};

    await TestBed.configureTestingModule({
      imports: [MovieHeaderComponent, RouterModule.forRoot([]), SearchResultsPageComponent],
		providers: [
			provideMockStore({}),
			{ provide: MovieService, useValue: movieServiceMock },
			{ provide: AuthService, useClass: MockAuth },
			{ provide: Router,
				useValue: {
					 events: of([]),
				},
			},
		 ],
    })
    .compileComponents();
    
	 store = TestBed.inject(Store) as MockStore;
    movieService = TestBed.inject(MovieService) as jest.Mocked<MovieService>;

    fixture = TestBed.createComponent(MovieHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
	 store.overrideSelector(selectSearchedMovies, mockApiData);
        store.overrideSelector(selectSearchQuery, 'Movie');
	});
	
	it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should load search data on initialization', () => {
	component.ngOnInit();
	expect(store.dispatch).toHaveBeenCalledWith(loadMoviesFromSearch({ query: 'Movie', page: 1 }));
	expect(component.searchData).toEqual(mockApiData)
  })
});
