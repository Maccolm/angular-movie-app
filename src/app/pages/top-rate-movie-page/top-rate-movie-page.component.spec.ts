import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MovieTopRatePageComponent } from './top-rate-movie-page.component';
import { selectMovies } from '../../store/selectors';
import { popularMovies } from '../../../../mock-data';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { loadMovies } from '../../store/actions';

class MockAuth {
	isLoggedIn$ = of(false);
}
describe('MovieTopRatePageComponent', () => {
  let component: MovieTopRatePageComponent;
  let fixture: ComponentFixture<MovieTopRatePageComponent>;
  let store: MockStore;
  const initialState = { movies: [] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState }),
			{ provide: AuthService, useClass: MockAuth }
		],
      imports: [
        HttpClientTestingModule,
        MovieTopRatePageComponent,
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(MovieTopRatePageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select movies from store and assign to top rated', () => {
    const mockMovies = popularMovies;

    store.overrideSelector(selectMovies, mockMovies);
    store.refreshState();

    fixture.detectChanges();

    expect(component.topRated).toEqual(mockMovies);
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
	expect(spyDispatch).toHaveBeenCalledWith(loadMovies({ category: 'top_rated', page: 3 }));
	expect(spyScroll).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
