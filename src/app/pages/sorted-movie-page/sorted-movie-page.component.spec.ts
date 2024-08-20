import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortedMoviePageComponent } from './sorted-movie-page.component';

describe('SortedMoviePageComponent', () => {
  let component: SortedMoviePageComponent;
  let fixture: ComponentFixture<SortedMoviePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortedMoviePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SortedMoviePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
