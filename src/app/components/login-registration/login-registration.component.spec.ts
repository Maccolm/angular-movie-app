import { TestBed } from '@angular/core/testing';
import { LoginRegistrationComponent } from './login-registration.component';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MovieHeaderComponent } from '../header-movie/header-movie.component';
import { Store } from '@ngrx/store';
import { DialogService } from 'primeng/dynamicdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';

describe('LoginRegistrationComponent', () => {
  let component: LoginRegistrationComponent;
  let mockAuthService: any;
  let mockStore: any;
  let mockMessageService: any;
  let mockHeaderComponent: any;
  let authService: any;
  let fixture: any;

  beforeEach(async () => {
	mockAuthService = {
		authenticateAndGetAccountId: jest.fn(),
		setAccountId: jest.fn(),
		setSessionId: jest.fn(),
		login: jest.fn(),
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
      imports: [ReactiveFormsModule, BrowserAnimationsModule, LoginRegistrationComponent],
		providers: [
			{provide: AuthService, useValue: mockAuthService},
			{provide: Store, useValue: mockStore},
			{provide: MovieHeaderComponent, useValue: mockHeaderComponent},
			{provide: MessageService, useValue: mockMessageService},
			DialogService
		]
    }).compileComponents();
    
    fixture = TestBed.createComponent(LoginRegistrationComponent);
    component = fixture.componentInstance;
	 authService = TestBed.inject(AuthService);
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
  
  it('should not proceed with login if form is invalid', () => {
	jest.spyOn(authService, 'login');
	component.logInForm.setValue({ email: '', password: '' });
	component.onSubmitLogIn();

	expect(authService.login).not.toHaveBeenCalled();
	expect(component.errorMessage).toBe('Please fill in all required fields.');
  });

  it('should handle successful login', async () => {
	jest.spyOn(authService, 'login').mockResolvedValue(Promise.resolve());
	jest.spyOn(authService, 'authenticateAndGetAccountId').mockReturnValue(of({ accountId: '123', sessionId: 'abc' }));
	component.logInForm.setValue({ email: 'test@example.com', password: 'password123' });

 	await component.onSubmitLogIn();

	expect(authService.login).toHaveBeenCalled();
	expect(authService.authenticateAndGetAccountId).toHaveBeenCalled();
  });

  it('should handle login failure from authenticateAndGetAccountId', async () => {
	jest.spyOn(authService, 'login').mockResolvedValue(Promise.resolve());
	jest.spyOn(authService, 'authenticateAndGetAccountId').mockReturnValue(throwError(() => new Error('Invalid email or password. Please try again.')));

	component.logInForm.setValue({ email: 'test@example.com', password: 'password123' });

	await component.onSubmitLogIn();

	expect(authService.login).toHaveBeenCalled();
	expect(authService.authenticateAndGetAccountId).toHaveBeenCalled();
	expect(component.errorMessage).toBe('Invalid email or password. Please try again.');
  });

  it('should handle login promise rejection', async () => {
	jest.spyOn(authService, 'login').mockRejectedValue(new Error('Login Failed'));
	component.logInForm.setValue({ email: 'test@example.com', password: 'password123' });

	await component.onSubmitLogIn();

	expect(authService.login).toHaveBeenCalled();
	expect(component.errorMessage).toBe('Invalid email or password. Please try again.');
  });
  it('should handle successful registration', () => {
	const mockRegisterResponse = Promise.resolve();
	mockAuthService.register = jest.fn().mockReturnValue(mockRegisterResponse);

	component.registrationForm.setValue({
		email: 'test@example.com',
		name: 'Test User',
		password: 'TestPassword123',
		confirmPassword: 'TestPassword123'
	});
	component.onSubmitRegistration();
	expect(mockAuthService.register).toHaveBeenCalledWith('test@example.com', 'TestPassword123');
  });

  it('should handle registration failure if email already exists', async () => {
	const mockError = { code: 'auth/email-already-in-use', message: 'This email is already used.'};
	mockAuthService.register = jest.fn().mockRejectedValue(mockError);

	component.registrationForm.setValue({
		email: 'test@example.com',
		name: 'Test User',
		password: 'TestPassword123',
		confirmPassword: 'TestPassword123'
	});
	await component.onSubmitRegistration();
	expect(component.registerErrorMessage).toBe('This email address already exists. Please use another email address');
  });
});
