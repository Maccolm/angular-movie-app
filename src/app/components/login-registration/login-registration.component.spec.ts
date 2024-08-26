import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginRegistrationComponent } from './login-registration.component';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MovieHeaderComponent } from '../header-movie/header-movie.component';
import { Store } from '@ngrx/store';
import { DialogService } from 'primeng/dynamicdialog';
import { loadFavoriteMovies, loadWatchList } from '../../store/actions';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginRegistrationComponent', () => {
  let component: LoginRegistrationComponent;
  let fixture: ComponentFixture<LoginRegistrationComponent>;
  let mockAuthService: any;
  let mockStore: any;
  let mockMessageService: any;
  let mockHeaderComponent: any;

  beforeEach(async () => {
	mockAuthService = {
		authenticateAndGetAccountId: jest.fn(),
		setAccountId: jest.fn(),
		setSessionId: jest.fn(),
		isLoggedIn$: of(false)
	};
	mockStore = {
		dispatch: jest.fn()
	};
	mockMessageService = {
		add: jest.fn()
	};
	mockHeaderComponent = {
		showLoginForm$: of(true)
	};

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, BrowserAnimationsModule],
		providers: [
			{provide: AuthService, useValue: mockAuthService},
			{provide: Store, useValue: mockStore},
			{provide: MovieHeaderComponent, useValue: mockHeaderComponent},
			DialogService
		]
    }).compileComponents();
    
    fixture = TestBed.createComponent(LoginRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
	expect(component.visible).toBe(true);
	expect(component.errorMessage).toBe('');
	expect(component.logInForm).toBeDefined();
	expect(component.loading).toBe(false);
	expect(component.isLoggedIn).toBe(false);
  });
  
  it('should handle successful login,', () => {
	const mockResponse = { accountId: '123', sessionId: 'abc' };
	mockAuthService.authenticateAndGetAccountId.mockReturnValue(of(mockResponse));

	component.logInForm.setValue({ email: 'testUser', password: 'testPassword' });
	component.onSubmitLogIn();

	expect(component.loading).toBe(false);
	expect(mockAuthService.authenticateAndGetAccountId).toHaveBeenCalledWith('testUser', 'testPassword');
	expect(mockStore.dispatch).toHaveBeenCalledWith(loadFavoriteMovies());
	expect(mockStore.dispatch).toHaveBeenCalledWith(loadWatchList());
	expect(component.errorMessage).toBe('');
  });

  it('should handle login failure', () => {
	const mockError = new Error('Invalid credentials');
	mockAuthService.authenticateAndGetAccountId.mockReturnValue(throwError(() => mockError));
	component.logInForm.setValue({ email: 'testUser', password: 'testPassword' });
	component.onSubmitLogIn();

	expect(component.errorMessage).toBe('Invalid email or password. Please try again.')
  });
});
