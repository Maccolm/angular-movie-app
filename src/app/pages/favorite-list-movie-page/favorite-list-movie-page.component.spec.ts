import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieFavoriteListPageComponent } from './favorite-list-movie-page.component';
import { MovieService } from '../../services/movie.service';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { removeMovieFromFavorite } from '../../store/actions';
import { Movie } from '../../models/movie.models';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from '../../components/card-movie/movie-card.component';
import { ButtonModule } from 'primeng/button';
import { By } from '@angular/platform-browser';

describe('MovieFavoriteListPageComponent', () => {
  let component: MovieFavoriteListPageComponent;
  let fixture: ComponentFixture<MovieFavoriteListPageComponent>;
  let store: MockStore;
  let movieService: jest.Mocked<MovieService>;

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
    const movieServiceMock = {
      removeFromFavoriteMovies: jest.fn().mockReturnValue(of(mockMovies[0])),
    };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MovieCardComponent,
        ButtonModule,
        MovieFavoriteListPageComponent,
      ],
      providers: [
        provideMockStore({}),
        { provide: MovieService, useValue: movieServiceMock },
      ],
    }).compileComponents();

    store = TestBed.inject(Store) as MockStore;
    movieService = TestBed.inject(MovieService) as jest.Mocked<MovieService>;

    fixture = TestBed.createComponent(MovieFavoriteListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display favorite movies', () => {
    component.favoriteMovies = mockMovies;
    fixture.detectChanges();

    const movieCards = fixture.debugElement.queryAll(By.css('app-movie-card'));
    expect(movieCards.length).toBe(mockMovies.length);
  });

  it('should display empty message if no favorite movies', () => {
    component.favoriteMovies = [];
    fixture.detectChanges();

    const emptyMessage = fixture.debugElement.query(By.css('.movie-list'));
    expect(emptyMessage.nativeElement.textContent).toContain(
      component.emptyFavoriteList
    );
  });

  it('should call removeFromFavoriteMovies on deleteFromFavorites', () => {
    const movieToRemove = mockMovies[0];
    const removeFromFavoriteMoviesSpy = jest
      .spyOn(movieService, 'removeFromFavoriteMovies')
      .mockReturnValue(of(movieToRemove));
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    component.deleteFromFavorites(movieToRemove);

    expect(removeFromFavoriteMoviesSpy).toHaveBeenCalledWith(movieToRemove);
    expect(dispatchSpy).toHaveBeenCalledWith(
      removeMovieFromFavorite({ movieId: movieToRemove.id })
    );
  });

  it('should remove movie from list after deletion', () => {
    const movieToRemove = mockMovies[0];
    jest
      .spyOn(movieService, 'removeFromFavoriteMovies')
      .mockReturnValue(of(movieToRemove));

    component.favoriteMovies = mockMovies;
    component.deleteFromFavorites(movieToRemove);
    fixture.detectChanges();

    expect(component.favoriteMovies?.length).toBe(0);
    expect(
      component.favoriteMovies?.find((movie) => movie.id === movieToRemove.id)
    ).toBeUndefined();
  });
});
