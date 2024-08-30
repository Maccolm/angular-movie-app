import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieDescriptionComponent } from './description-movie-page.component';
import { MovieService } from '../../services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { provideMockStore } from '@ngrx/store/testing';
import { isInFavorite, isInWatchList } from '../../store/selectors';
import { DetailsMovie } from '../../models/movie.models';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';

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
  vote_average: 0,
};

describe('MovieDescriptionComponent', () => {
  let component: MovieDescriptionComponent;
  let fixture: ComponentFixture<MovieDescriptionComponent>;
  let movieService: MovieService;

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
      ],
		schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDescriptionComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService);

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
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.isInFavorite).toBe(false);
    expect(component.isInWatchList).toBe(false);
  });

//   it('should add movie to favorites', () => {
//     component.addToFavorites();
//     expect(movieService.setToFavoriteMovies).toHaveBeenCalledWith(mockMovie);
//     fixture.detectChanges();
//   });

//   it('should add movie to watchlist', () => {
//     component.addToWatchList();
//     expect(movieService.setToWatchList).toHaveBeenCalledWith(mockMovie);
//     fixture.detectChanges();
//   });
});
