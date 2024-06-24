import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieFavoriteListPageComponent } from './movie-favorite-list-page.component';

describe('MovieFavoriteListPageComponent', () => {
  let component: MovieFavoriteListPageComponent;
  let fixture: ComponentFixture<MovieFavoriteListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieFavoriteListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieFavoriteListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
