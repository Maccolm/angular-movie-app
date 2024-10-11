import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieCardComponent } from './movie-card.component';
import { MovieService } from '../../services/movie.service';
import { Router } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { setMovieToFavorite, setMovieToWatchList } from '../../store/actions';
import { isInFavorite, isInWatchList } from '../../store/selectors';
import { Movie } from '../../models/movie.models';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../../services/auth.service';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

class MockAuth {
	isLoggedIn$ = of(true);
}
describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;
  let movieService: jest.Mocked<MovieService>;
  let store: MockStore;
  let router: jest.Mocked<Router>;

  const mockMovie: Movie = {
	  id: 1,
	  title: 'Mock Movie',
	  backdrop_path: '',
	  original_language: '',
	  overview: '',
	  popularity: 0,
	  poster_path: '',
	  release_date: '',
	  vote_average: 0
  };

  beforeEach(async () => {
    movieService = {
      setToFavoriteMovies: jest.fn().mockReturnValue(of(true)),
      setToWatchList: jest.fn().mockReturnValue(of(true)),
    } as any;

    router = {
      navigate: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
		imports: [
			MovieCardComponent, HttpClientTestingModule, BrowserAnimationsModule, NoopAnimationsModule
			],
      providers: [
        { provide: MovieService, useValue: movieService },
        { provide: Router, useValue: router },
        { provide: AuthService, useClass: MockAuth },
        provideMockStore({
          selectors: [
            { selector: isInFavorite(mockMovie.id), value: false },
            { selector: isInWatchList(mockMovie.id), value: false }
          ]
        })
      ],
		schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    component.data = mockMovie;
    store = TestBed.inject(MockStore);

	 jest.spyOn(store, 'dispatch');

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should check if the movie is in favorites and watch list on init', () => {
    component.ngOnInit();

    expect(component.isInFavorite).toBe(false);
    expect(component.isInWatchList).toBe(false);
  });

  it('should add movie to favorites', () => {
    component.addToFavorites();
    expect(movieService.setToFavoriteMovies).toHaveBeenCalledWith(mockMovie);

    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalledWith(setMovieToFavorite({ movie: mockMovie }));
  });

  it('should add movie to watch list', () => {
    component.addToWatchList();
    expect(movieService.setToWatchList).toHaveBeenCalledWith(mockMovie);

    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalledWith(setMovieToWatchList({ movie: mockMovie }));
  });

  it('should navigate to movie details page on navigateWithData', () => {
    component.navigateWithData();

    expect(router.navigate).toHaveBeenCalledWith(['/movie', mockMovie.id]);
  });79
});
