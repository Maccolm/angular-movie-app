import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselMovieListComponent } from './carousel-movie-list.component';

describe('CarouselMovieListComponent', () => {
  let component: CarouselMovieListComponent;
  let fixture: ComponentFixture<CarouselMovieListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselMovieListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarouselMovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
