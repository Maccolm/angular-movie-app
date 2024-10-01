import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewsOnMovieComponent } from './reviews-on-movie.component';
import { MovieService } from '../../services/movie.service';
import { of } from 'rxjs';
import { Reviews } from '../../models/movie.models';
import { NO_ERRORS_SCHEMA } from '@angular/core';


const mockReviews: Reviews[] = [
  {
    author: 'John Doe',
    author_details: {
      name: 'John Doe',
      username: 'johndoe',
      avatar_path: '/avatar.jpg',
      rating: 4
    },
    content: 'Great movie!',
    created_at: '2024-01-01',
    id: '1',
    updated_at: '2024-01-01',
    url: 'https://example.com/review/1'
  }
];

class MockMovieService {
  getReviewsOnMovie = jest.fn().mockReturnValue(of({ results: mockReviews, page: 1 }));
}

describe('ReviewsOnMovieComponent', () => {
  let component: ReviewsOnMovieComponent;
  let fixture: ComponentFixture<ReviewsOnMovieComponent>;
  let movieService: MovieService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewsOnMovieComponent], 
      providers: [{ provide: MovieService, useClass: MockMovieService }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewsOnMovieComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadReviews on initialization', () => {
    component.movieId = 1;
    fixture.detectChanges(); 

    expect(movieService.getReviewsOnMovie).toHaveBeenCalledWith(1, undefined);
    expect(component.reviews).toEqual(mockReviews);
  });

  it('should load reviews when movieId changes', () => {
    component.movieId = 2;
    component.ngOnChanges({
      movieId: {
        currentValue: 2,
        previousValue: 1,
        firstChange: false,
        isFirstChange: () => false
      }
    });

    expect(movieService.getReviewsOnMovie).toHaveBeenCalledWith(2, undefined);
  });

  it('should toggle expanded state for reviews', () => {
    component.expanded = [false];
    component.toggleExpand(0);
    expect(component.expanded[0]).toBe(true);
  });
});
