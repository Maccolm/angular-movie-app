import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MoviePopularPageComponent } from './popular-movie-page.component';
import { selectMovies } from '../../store/selectors';
import { popularMovies } from '../../../../mock-data';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { loadMovies } from '../../store/actions';

describe('MovieUpcomingPageComponent', () => {
  let component: MoviePopularPageComponent;
  let fixture: ComponentFixture<MoviePopularPageComponent>;
  let store: MockStore;
  const initialState = { movies: [] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
      imports: [
        HttpClientTestingModule,
        MoviePopularPageComponent,
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(MoviePopularPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select movies from store and assign to popular', () => {
    const mockMovies = popularMovies;

    store.overrideSelector(selectMovies, mockMovies);
    store.refreshState();

    fixture.detectChanges();

    expect(component.popularMovies).toEqual(mockMovies);
  });

  it('should clean up subscriptions on destroy', () => {
    const spy = jest.spyOn(component.destroy$, 'next');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalledWith(true);
  });
  it('should dispatch loadMovies with correct page on page change', () => {
	const mockEvent = { first: 2 };
	const spyDispatch = jest.spyOn(store, 'dispatch');
	const spyScroll = jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
	component.changeOnPage(mockEvent);
	expect(spyDispatch).toHaveBeenCalledWith(loadMovies({ category: 'popular', page: 3 }));
	expect(spyScroll).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
