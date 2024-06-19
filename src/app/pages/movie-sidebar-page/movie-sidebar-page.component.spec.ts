import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSidebarPageComponent } from './movie-sidebar-page.component';

describe('MovieSidebarPageComponent', () => {
  let component: MovieSidebarPageComponent;
  let fixture: ComponentFixture<MovieSidebarPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieSidebarPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieSidebarPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
