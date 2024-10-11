import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieWatchListPageComponent } from './movie-watchlist-page.component';
import { MovieService } from '../../services/movie.service';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { removeMovieFromWatchList } from '../../store/actions';
import { Movie } from '../../models/movie.models';
import { MovieCardComponent } from '../../components/card-movie/movie-card.component';
import { By } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';

describe('MovieWatchListPageComponent', () => {
  let component: MovieWatchListPageComponent;
  let fixture: ComponentFixture<MovieWatchListPageComponent>;
  let store: MockStore;
  let movieService: MovieService;

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

  beforeEach(async () => {
	let mockAuthService = {
		isLoggedIn$: of(true),
	}
    const movieServiceMock = {
      removeFromWatchList: jest.fn().mockReturnValue(of(mockMovies[0])),
    };

    await TestBed.configureTestingModule({
      imports: [
        MovieCardComponent,
        MovieWatchListPageComponent,
      ],
      providers: [
        provideMockStore({}),
        { provide: MovieService, useValue: movieServiceMock },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compileComponents();

    store = TestBed.inject(Store) as MockStore;
    movieService = TestBed.inject(MovieService) as jest.Mocked<MovieService>;

    fixture = TestBed.createComponent(MovieWatchListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display watch list', () => {
    component.watchList = mockMovies;
    fixture.detectChanges();

    const movieCards = fixture.debugElement.queryAll(By.css('app-movie-card'));
    expect(movieCards.length).toBe(mockMovies.length);
  });

  it('should display empty message if no watch list', () => {
    component.watchList = [];
    fixture.detectChanges();

    const emptyMessage = fixture.debugElement.query(By.css('.movie-list'));
    expect(emptyMessage.nativeElement.textContent).toContain(
      component.emptyWatchList
    );
  });

  it('should call removeFromWatchList on deleteFromWatchList', () => {
    const movieToRemove = mockMovies[0];
    const removeFromFavoriteMoviesSpy = jest
      .spyOn(movieService, 'removeFromWatchList')
      .mockReturnValue(of(movieToRemove));
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    component.deleteFromWatchList(movieToRemove);

    expect(removeFromFavoriteMoviesSpy).toHaveBeenCalledWith(movieToRemove);
    expect(dispatchSpy).toHaveBeenCalledWith(
      removeMovieFromWatchList({ movieId: movieToRemove.id })
    );
  });

  it('should remove movie from list after deletion', () => {
    const movieToRemove = mockMovies[0];
    jest
      .spyOn(movieService, 'removeFromWatchList')
      .mockReturnValue(of(movieToRemove));

    component.watchList = mockMovies;
    component.deleteFromWatchList(movieToRemove);
    fixture.detectChanges();

    expect(component.watchList?.length).toBe(0);
    expect(
      component.watchList?.find((movie) => movie.id === movieToRemove.id)
    ).toBeUndefined();
  });
});
