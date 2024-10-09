import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarouselMovieListComponent } from './carousel-movie-list.component';
import { Router } from '@angular/router';
import { Movie } from '../../models/movie.models';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CarouselMovieListComponent', () => {
  let component: CarouselMovieListComponent;
  let fixture: ComponentFixture<CarouselMovieListComponent>;
  let router: Router;

  beforeEach(async () => {
	router = {
		navigate: jest.fn()
	} as unknown as Router;
    await TestBed.configureTestingModule({
      imports: [CarouselMovieListComponent],
		providers: [{ provide: Router, useValue: router }]
    }).compileComponents();
    
    fixture = TestBed.createComponent(CarouselMovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(() => {
	jest.clearAllMocks();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize responsive options on ngOnInit', () => {
	component.ngOnInit();
	expect(component.responsiveOptions).toBeDefined();
  });
  it('should navigate to movie details when navigateWithData is called', () => {
	const movieId = 123;
	component.navigateWithData(movieId);
	expect(router.navigate).toHaveBeenCalledWith(['/movie', movieId])
  });
  it('should render movies in the carousel', () => {
	const mockMovies = [
      { id: 1, title: 'Movie 1', backdrop_path: '/path1.jpg' },
      { id: 2, title: 'Movie 2', backdrop_path: '/path2.jpg' },
    ] as Movie[];

    component.movies = mockMovies;
    fixture.detectChanges();

    const movieElements: DebugElement[] = fixture.debugElement.queryAll(By.css('.trending__item'));
    expect(movieElements.length).toBe(mockMovies.length);

    const firstMovieTitle = movieElements[0].nativeElement.querySelector('.trending__title').textContent;
    expect(firstMovieTitle).toContain('Movie 1');
  });
  it('should scroll to top and navigate when a movie is clicked', () => {
	jest.spyOn(window, 'scrollTo');
	
	const movieId = 1;
	component.navigateWithData(movieId);

	expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
	expect(router.navigate).toHaveBeenCalledWith(['/movie', movieId]);
 });
});
