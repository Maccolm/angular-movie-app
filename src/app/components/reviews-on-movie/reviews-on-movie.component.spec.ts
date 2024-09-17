import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsOnMovieComponent } from './reviews-on-movie.component';

describe('ReviewsOnMovieComponent', () => {
  let component: ReviewsOnMovieComponent;
  let fixture: ComponentFixture<ReviewsOnMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewsOnMovieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewsOnMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
