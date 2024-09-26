import { ComponentFixture, TestBed } from '@angular/core/testing';
import { popularMovies } from '../../../../mock-data';
import { SortedMoviePageComponent } from './sorted-movie-page.component';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

class MockAuth {
  isLoggedIn$ = of(false);
}

describe('SortedMoviePageComponent', () => {
  let component: SortedMoviePageComponent;
  let fixture: ComponentFixture<SortedMoviePageComponent>;
  const mockMovies = { results: popularMovies };
  let mockMovieService: any;
  let store: MockStore;

  beforeEach(async () => {
    mockMovieService = {
      sortMoviesBy: jest.fn().mockReturnValue(of(mockMovies)),
    };

    await TestBed.configureTestingModule({
      providers: [
        MockProvider(MovieService, {
          sortMoviesBy: jest.fn().mockReturnValue(of(mockMovies)),
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: (key: string) => 'popularity' }),
          },
        },
        provideMockStore(),
        { provide: AuthService, useClass: MockAuth },
        { provide: MovieService, useValue: mockMovieService },
      ],
      imports: [SortedMoviePageComponent, HttpClientModule],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(SortedMoviePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch sorted movies on initialization based on route param', () => {
    fixture.detectChanges();
    expect(mockMovieService.sortMoviesBy).toHaveBeenCalledWith('popularity');
    expect(component.movies.length).toBe(8);
    expect(component.movies[0].title).toBe('Inside Out 2');
  });

  it('should change the page and fetch new sorted movies', () => {
    const event = { first: 2 };
    component.changeOnPage(event);
    expect(mockMovieService.sortMoviesBy).toHaveBeenCalledWith('popularity', 3);
    expect(component.movies[0].title).toBe('Inside Out 2');
  });

  it('should clean up subscriptions on destroy', () => {
    const spy = jest.spyOn(component.destroy$, 'next');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalledWith(true);
  });
});
