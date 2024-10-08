import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { MovieHeaderComponent } from './header-movie.component';
import { Router, RouterModule } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MovieService } from '../../services/movie.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { ApiMovieModel, Movie } from '../../models/movie.models';
import { selectSearchedMovies, selectSearchQuery } from '../../store/selectors';
import { loadMoviesFromSearch, clearMoviesState } from '../../store/actions';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

class MockAuth {
  isLoggedIn$ = of(true);
  logOut = jest.fn();
}
@Component({ template: '' }) 
class DummyComponent {}

describe('MovieHeaderComponent', () => {
  let component: MovieHeaderComponent;
  let fixture: ComponentFixture<MovieHeaderComponent>;
  let store: MockStore;
  let movieService: jest.Mocked<MovieService>;
  let router: jest.Mocked<Router>;
  const confirmationServiceMock = {
	confirm: jest.fn(),
 };
  let messageService: jest.Mocked<MessageService>;

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
  };

  beforeEach(async () => {
    router = { navigate: jest.fn() } as any;
    messageService = { add: jest.fn() } as any;
    movieService = {
      searchMovie: jest.fn().mockReturnValue(of(mockApiData)),
    } as any;

    await TestBed.configureTestingModule({
      imports: [MovieHeaderComponent,  RouterTestingModule.withRoutes([
			{ path: 'search_results', component: DummyComponent }, 
			{ path: 'movie/:id', component: DummyComponent },
		 ]),
		 ReactiveFormsModule,
		],
      providers: [
        provideMockStore(),
        { provide: MovieService, useValue: movieService },
        { provide: AuthService, useClass: MockAuth },
        { provide: ConfirmationService, useValue: confirmationServiceMock },
        { provide: MessageService, useValue: messageService },
      ],
    }).compileComponents();

    store = TestBed.inject(Store) as MockStore;
    store.overrideSelector(selectSearchedMovies, mockApiData);
    store.overrideSelector(selectSearchQuery, 'Movie');

    // Mock for dispatch
    jest.spyOn(store, 'dispatch');

    fixture = TestBed.createComponent(MovieHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search for movies when input changes', () => {
	jest.useFakeTimers();
    component.searchControl.setValue('test');
	 jest.advanceTimersByTime(300);
    fixture.detectChanges();

    expect(movieService.searchMovie).toHaveBeenCalledWith('test');
    expect(component.moviesFromSearch).toEqual(mockMovies);
	 jest.useRealTimers();
  });

  it('should handle no search results', fakeAsync(() => {
	jest.useFakeTimers();
	component.searchControl.setValue('non-existent movie');
	fixture.detectChanges();
	jest.advanceTimersByTime(300);
	movieService.searchMovie.mockReturnValue(of({ results: [], total_results: 0, page: 1 }));
	fixture.detectChanges();
	const listItem = fixture.nativeElement.querySelector('.search__item');
	expect(listItem).toBeNull;
	jest.useRealTimers();
  }));
});
