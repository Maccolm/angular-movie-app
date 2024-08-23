import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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


@Component({
	selector: 'app-login-registration',
	standalone: true,
	imports: [ButtonModule, DialogModule, ReactiveFormsModule, ToastModule],
	templateUrl: './login-registration.component.html',
	styleUrl: './login-registration.component.scss',
	providers: [MessageService, DialogService]
})
export class LoginRegistrationComponent extends ClearObservable implements OnInit {
	@Input() isRegisterButton: boolean = true;
	visible: boolean = false;
	errorMessage: string = '';
	logInForm: FormGroup = new FormGroup({});
	loading: boolean = false;
	isLoggedIn: boolean = false;

	constructor(private authService: AuthService, private store: Store, private messageService: MessageService) { 
		super();
	}

	ngOnInit(): void {
		this.authService.isLoggedIn$.pipe(takeUntil(this.destroy$)).subscribe(isLoggedIn => {
			this.isLoggedIn = isLoggedIn;
		})
		this.logInForm = new FormGroup({
			email: new FormControl('VitaliiShapovalov', [Validators.required]),
			password: new FormControl('cN.hwyTvag3s.8m', Validators.required)
		})
	}
	onSubmitLogIn() {
		if (this.logInForm.valid) {
			this.loading = true;
			const enteredEmail = this.logInForm.value['email'];
			const enteredPassword = this.logInForm.value['password'];

			window.localStorage.setItem('login', enteredEmail);
			window.localStorage.setItem('password', enteredPassword);

			this.authService.authenticateAndGetAccountId(enteredEmail, enteredPassword).subscribe({
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
		} else {
			this.errorMessage = 'Please fill in all required fields.'
		}
	}
	showForm() {
		this.visible = true;
	}
	logOut(){
		this.authService.logOut();
		this.messageService.add({ severity: 'info', summary: 'Logout Successful', detail: 'You have successfully logged out.', life: 3000 });
	}
}
