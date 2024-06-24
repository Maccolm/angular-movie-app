import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieWatchlistPageComponent } from './movie-watchlist-page.component';

describe('MovieWatchlistPageComponent', () => {
  let component: MovieWatchlistPageComponent;
  let fixture: ComponentFixture<MovieWatchlistPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieWatchlistPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieWatchlistPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
