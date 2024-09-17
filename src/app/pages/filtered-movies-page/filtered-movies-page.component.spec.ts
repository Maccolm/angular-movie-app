import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredMoviesPageComponent } from './filtered-movies-page.component';

describe('FilteredMoviesPageComponent', () => {
  let component: FilteredMoviesPageComponent;
  let fixture: ComponentFixture<FilteredMoviesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilteredMoviesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilteredMoviesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
