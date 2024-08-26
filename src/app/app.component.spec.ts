import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { Store, StoreModule } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { loadFavoriteMovies, loadTrendingMovies, loadWatchList } from './store/actions';
import { MovieService } from './services/movie.service';

const mockAuthService = {
  authenticateAndGetAccountId: jest.fn(),
  setAccountId: jest.fn(),
  setSessionId: jest.fn(),
};

const mockStore = {
  dispatch: jest.fn(),
};

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        AppComponent,
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Store, useValue: mockStore },
        MovieService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

 it('should dispatch loadTrendingMovies on init', () => {
	 component.ngOnInit();
	 expect(mockStore.dispatch).toHaveBeenCalledWith(loadTrendingMovies());	 
	});

  it('should call authenticateAndGetAccountId and dispatch loadFavorites and watchlist on successful login', () => {
	 Object.defineProperty(window, 'localStorage', {
		value: {
			getItem: jest.fn((key) => {
				if (key === 'login') return 'testLogin';
				if (key === 'password') return 'testPassword';
				return null;
			}),
			setItem: jest.fn(),
			clear: jest.fn(),
		},
		writable: true,
	 })
	
	 const mockAccountData = { accountId: '123', sessionId: 'abc' };
	 (mockAuthService.authenticateAndGetAccountId as jest.Mock).mockReturnValue(of(mockAccountData));

	 component.ngOnInit();

    expect(mockAuthService.authenticateAndGetAccountId).toHaveBeenCalledWith('testLogin', 'testPassword');
    expect(mockAuthService.setAccountId).toHaveBeenCalledWith('123');
    expect(mockAuthService.setSessionId).toHaveBeenCalledWith('abc');
    expect(mockStore.dispatch).toHaveBeenCalledWith(loadFavoriteMovies());
    expect(mockStore.dispatch).toHaveBeenCalledWith(loadWatchList());
  });

  it('should handle authentication failure', () => {
	Object.defineProperty(window, 'localStorage', {
		value: {
			getItem: jest.fn((key) => {
				if (key === 'login') return 'testLogin';
				if (key === 'password') return 'testPassword';
				return null;
			}),
			setItem: jest.fn(),
			clear: jest.fn(),
		},
		writable: true,
	 })
    const error = new Error('Authentication failed');
    (mockAuthService.authenticateAndGetAccountId as jest.Mock).mockReturnValue(
      throwError(() => error)
    );
    console.error = jest.fn();
    component.ngOnInit();

    expect(mockAuthService.authenticateAndGetAccountId).toHaveBeenCalledWith('testLogin', 'testPassword');
    expect(console.error).toHaveBeenCalledWith('Authentication failed:', error);
    expect(mockStore.dispatch).toHaveBeenCalledWith(loadFavoriteMovies());
    expect(mockStore.dispatch).toHaveBeenCalledWith(loadWatchList());
  });
});
