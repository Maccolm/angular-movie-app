import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { loadFavoriteMovies, loadWatchList } from '../../store/actions';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DialogService } from 'primeng/dynamicdialog';
import { ClearObservable } from '../../directives/clearObservable';
import { takeUntil } from 'rxjs';
import { MovieHeaderComponent } from '../header-movie/header-movie.component';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';


@Component({
	selector: 'app-login-registration',
	standalone: true,
	imports: [ButtonModule, DialogModule, ReactiveFormsModule, ToastModule, PasswordModule, DividerModule, CommonModule],
	templateUrl: './login-registration.component.html',
	styleUrl: './login-registration.component.scss',
	providers: [MessageService, DialogService]
})
export class LoginRegistrationComponent extends ClearObservable implements OnInit {
	googleIconPath: string = '../../assets/img/google-icon.jpg'; 
	visible: boolean = false;
	isRegistrationVisible = false;
	errorMessage: string = '';
	logInForm: FormGroup = new FormGroup({});
	registrationForm: FormGroup = new FormGroup({});
	loading: boolean = false;
	registerLoading: boolean = false;
	isLoggedIn: boolean = false;
	isInputFocused: boolean = false;
	@ViewChild('passwordInput', { static: false }) passwordInput!: ElementRef;

	constructor(
		private authService: AuthService, 
		private store: Store, 
		private messageService: MessageService, 
		private headerComponent: MovieHeaderComponent) { 
		super();
	}

	ngOnInit(): void {
		this.authService.isLoggedIn$.pipe(takeUntil(this.destroy$)).subscribe(isLoggedIn => {
			this.isLoggedIn = isLoggedIn;
		});
		this.logInForm = new FormGroup({
			email: new FormControl('', [Validators.required]),
			password: new FormControl('', Validators.required)
		});
		this.registrationForm = new FormGroup({
			email: new FormControl('', [Validators.required, Validators.email]),
			name: new FormControl('', 
				[
					Validators.required,
					Validators.minLength(2),
					Validators.maxLength(50),
					Validators.pattern(/^[a-zA-Z\s]*$/)
				]),
			password: new FormControl('', [Validators.required, this.passwordStrengthValidator]),
			confirmPassword: new FormControl('', Validators.required)
		},{validators: this.passwordMatchValidator})
		this.headerComponent.showLoginForm$.pipe(takeUntil(this.destroy$)).subscribe(show => {
			this.visible = show;
		});
		
	}
	onSubmitLogIn() {
		if (this.logInForm.valid) {
			this.loading = true;
			const enteredEmail = this.logInForm.value['email'];
			const enteredPassword = this.logInForm.value['password'];

			window.localStorage.setItem('login', enteredEmail);
			window.localStorage.setItem('password', enteredPassword);
			this.authService.login(enteredEmail, enteredPassword).then(() => {
				this.authService.authenticateAndGetAccountId().pipe(takeUntil(this.destroy$)).subscribe({
					next: ({ accountId, sessionId }) => {
						console.log('Login successful:', { accountId, sessionId });
						this.authService.setAccountId(accountId);
						this.authService.setSessionId(sessionId);
						this.store.dispatch(loadFavoriteMovies());
						this.store.dispatch(loadWatchList());
						this.errorMessage = '';
						this.loading = false;
						setTimeout(()=>{
							this.visible = false;
						},500)
						this.messageService.add({ severity: 'success',summary: 'Login Successful', detail: 'You have successfully logged in', life: 3000 });
					},
					error: (error) => {
						console.error('Login failed:', error);
						this.errorMessage = 'Invalid email or password. Please try again.';
						this.loading = false;
						this.messageService.add({ severity: 'error', summary: 'Login Failed', detail: 'Invalid email or password. Please try again.', life: 3000 });
					}
				});
			}).catch(() => {
				this.errorMessage = 'Please fill in all required fields.'
				this.loading = false;
            this.messageService.add({ severity: 'error', summary: 'Login Failed', detail: 'Invalid email or password. Please try again.', life: 3000 });
			})
		} else {
			this.errorMessage = 'Please fill in all required fields.'
		}
	}
	showRegistrationForm(){
		this.visible = false;
		this.isRegistrationVisible = true;
	}
	showLogInForm(){
		this.visible = true;
		this.isRegistrationVisible = false;
	}
	onSubmitRegistration(){
		if(this.registrationForm.valid) {
			const enteredEmail = this.registrationForm.value['email'];
			const enteredPassword = this.registrationForm.value['password'];
			this.registerLoading = true;
			this.authService.register(enteredEmail, enteredPassword).then(() =>{
				this.registerLoading = false;
				this.messageService.add({ severity: 'success', summary: 'Registration Successful', detail: 'You have successfully registered', life: 3000 });
				this.showLogInForm();
			}).catch(error => {
				this.registerLoading = false;
				this.errorMessage = `Registration failed: ${error.message}`
				if(error.code = 'auth/email-already-in-use') {
					this.errorMessage = 'This email address already exists. Please use another email address'
				}
			})
		}
	}
	passwordStrengthValidator(control: FormGroup): ValidationErrors | null{
		const value = control.value || '';
		const hasUpperCase = /[A-Z]+/.test(value);
		const hasLowerCase = /[a-z]+/.test(value);
		const hasNumeric = /[0-9]+/.test(value);
		const minlength = 8;

		const errors: ValidationErrors = {};

		if(value.length < minlength){
			errors['minlength'] = true;
		}
		if(!hasUpperCase) {
			errors['hasUpperCase'] = true;
		}
		if(!hasLowerCase) {
			errors['hasLowerCase'] = true;
		}
		if(!hasNumeric) {
			errors['hasNumeric'] = true;
		}
		return Object.keys(errors).length > 0 ? errors : null;
	}
	passwordMatchValidator(control: AbstractControl): ValidationErrors | null{
		const password = control.get('password')?.value;
		const confirmPassword = control.get('confirmPassword')?.value;

		return password === confirmPassword ? null : {'mismatch': true}
	}
	logInWithGoogle(){
		this.authService.loginWithGoogle().then(() =>{
			this.visible = false;this.authService.authenticateAndGetAccountId().pipe(takeUntil(this.destroy$)).subscribe({
				next: ({ accountId, sessionId }) => {
					console.log('Login successful:', { accountId, sessionId });
					this.authService.setAccountId(accountId);
					this.authService.setSessionId(sessionId);
					this.store.dispatch(loadFavoriteMovies());
					this.store.dispatch(loadWatchList());
					this.errorMessage = '';
					this.loading = false;
					setTimeout(()=>{
						this.visible = false;
					},500)
					this.messageService.add({ severity: 'success',summary: 'Login Successful', detail: 'You have successfully logged in', life: 3000 });
				},
				error: (error) => {
					console.error('Login failed:', error);
					this.errorMessage = 'Invalid email or password. Please try again.';
					this.loading = false;
					this.messageService.add({ severity: 'error', summary: 'Login Failed', detail: 'Invalid email or password. Please try again.', life: 3000 });
				}
			});
		}).catch((error)=>{
			console.error('Error to log in', error)
			this.messageService.add({ severity: 'error', summary: 'Login Failed', detail: 'There was an error to log in.', life: 3000 });
		})
	}
}
