import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilteredMoviesPageComponent } from './filtered-movies-page.component';
import { of, Subject } from 'rxjs';
import { MovieCardComponent } from '../../components/card-movie/movie-card.component';
import { SkeletonModule } from 'primeng/skeleton';
import { MovieService } from '../../services/movie.service';
import { FilterService } from '../../services/filter.service';
import { NavigationStart, Router } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../../services/auth.service';

class MockAuth {
	isLoggedIn$ = of(false);
}
describe('FilteredMoviesPageComponent', () => {
  let component: FilteredMoviesPageComponent;
  let fixture: ComponentFixture<FilteredMoviesPageComponent>;
  let movieServiceMock: any;
  let filterServiceMock: any;
  let routerMock = {
	events: new Subject(),
	url: '/filtered'
  };
  const mockMoviesResponse = {
	results: [{ id: 1, title: 'Movie 1' }, { id: 2, title: 'Movie 2' }],
	total_pages: 5,
	total_results: 100
  }

  beforeEach(async () => {
	movieServiceMock = {
		getFilteredMovies: jest.fn().mockReturnValue(of(mockMoviesResponse))
	};
	filterServiceMock = {
		$filteredAttributes: new Subject(),
		setFilters: jest.fn()
	};

    await TestBed.configureTestingModule({
      imports: [FilteredMoviesPageComponent, SkeletonModule, MovieCardComponent,  HttpClientTestingModule],
		providers: [
			{ provide: MovieService, useValue: movieServiceMock },
			{ provide: FilterService, useValue: filterServiceMock },
			{ provide: Router, useValue: routerMock },
			{ provide: AuthService, useClass: MockAuth },
			provideMockStore({})
		]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilteredMoviesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  afterEach(() => {
	localStorage.clear();
  });
  it('should create', () => {
	expect(component).toBeTruthy();
  });
  it('should load movies on initialization with saved filters', () => {
	localStorage.setItem('selectedGenres', '1,2');
	localStorage.setItem('selectedYear', '2022');
	localStorage.setItem('currentFilterPage', '2');
	filterServiceMock.$filteredAttributes.next({
		genres:[1, 2],
			year: 2022,
			page: 2
	});
	expect(movieServiceMock.getFilteredMovies).toHaveBeenCalledWith([1, 2], 2022, 2);
	expect(component.movies.length).toBe(2);
	expect(component.movies[0].title).toBe('Movie 1');
	expect(component.totalPages).toBe(5);
	expect(component.totalResults).toBe(100);
  });
  it('should update filters and fetch new movies on filter change', () => {
	filterServiceMock.$filteredAttributes.next({
		genres: [3],
		year: 2021,
		page: 1
	});
	fixture.detectChanges();
	expect(movieServiceMock.getFilteredMovies).toHaveBeenCalledWith([3], 2021, 1);
	expect(component.movies.length).toBe(2);
  });
  it('should dispatch filter changes whew the page changes', () => {
	component.onPageChange(3);
	expect(component.currentPage).toBe(3);
	expect(localStorage.getItem('currentFilterPage')).toBe('3');
	expect(filterServiceMock.setFilters).toHaveBeenCalledWith({ genres: component.selectedGenres, year: component.selectedYear, page: 3 });
  });
  it('should remove filter data from localStorage on navigation', () => {
	component.ngOnInit();
	routerMock.events.next(new NavigationStart(1, '/another-route'));

	expect(localStorage.getItem('selectedGenres')).toBeNull();
	expect(localStorage.getItem('currentFilterPage')).toBeNull();
	expect(localStorage.getItem('currentFilterPage')).toBeNull();
  });
  it('should calculate visible pages correctly', () => {
	component.totalPages = 10;
	component.currentPage = 5;
	const visiblePages = component.getVisiblePages();
	expect(visiblePages).toEqual([1, -1, 3, 4, 5, 6, 7, -1, 10]);
  });
  it('should clean up subscriptions on destroy', () => {
	const spy = jest.spyOn(component.destroy$, 'next');
	component.ngOnDestroy();
	expect(spy).toHaveBeenCalledWith(true);
  });
});
