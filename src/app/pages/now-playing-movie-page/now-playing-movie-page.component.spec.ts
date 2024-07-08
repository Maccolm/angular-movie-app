import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieNowPlayingPageComponent } from './now-playing-movie-page.component';

describe('MovieNowPlayingPageComponent', () => {
  let component: MovieNowPlayingPageComponent;
  let fixture: ComponentFixture<MovieNowPlayingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieNowPlayingPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieNowPlayingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
