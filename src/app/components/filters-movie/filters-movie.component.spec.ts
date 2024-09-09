import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersMovieComponent } from './filters-movie.component';

describe('FiltersMovieComponent', () => {
  let component: FiltersMovieComponent;
  let fixture: ComponentFixture<FiltersMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltersMovieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FiltersMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
