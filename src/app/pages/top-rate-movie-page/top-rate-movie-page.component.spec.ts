import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieTopRatePageComponent } from './top-rate-movie-page.component';

describe('MovieTopRatePageComponent', () => {
  let component: MovieTopRatePageComponent;
  let fixture: ComponentFixture<MovieTopRatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieTopRatePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieTopRatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
