import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { ClearObservable } from '../../directives/clearObservable';
import { BehaviorSubject, debounceTime, Observable, of, switchMap, takeUntil, tap } from 'rxjs';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.models';
import { CommonModule } from '@angular/common';
import { ExtractYearFromDatePipe } from '../../pipes/extractYearFromDatePipe/extract-year-from-date.pipe';
import { Router } from '@angular/router';
import { clearMoviesState, loadMoviesFromSearch } from '../../store/actions';
import { Store } from '@ngrx/store';
import { LoginRegistrationComponent } from '../login-registration/login-registration.component';
import { AuthService } from '../../services/auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@Component({
	selector: 'app-movie-header',
	standalone: true,
	imports: [
		RouterLink,
		InputTextModule,
		FloatLabelModule,
		FormsModule,
		OverlayPanelModule,
		ReactiveFormsModule,
		ButtonModule,
		CommonModule,
		ExtractYearFromDatePipe,
		LoginRegistrationComponent,
		ToastModule,
		ConfirmPopupModule,
	],
	templateUrl: './header-movie.component.html',
	styleUrl: './header-movie.component.scss',
	providers: [ConfirmationService, MessageService]
})
export class MovieHeaderComponent extends ClearObservable implements OnInit {
	searchControl = new FormControl();
	isLoading: boolean = false;
	@ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
	@ViewChild('op') overlayPanel!: OverlayPanel;
	moviesFromSearch: Movie[] = [];
	numberMoviesFromSearch!: number;
	isFindMovie: boolean = true;
	moviesNotFound: string = "We couldn't find anything. You may need to change your search query!";
	isLoggedIn: boolean = false;
	loginFormSubject = new BehaviorSubject<boolean>(false);
	showLoginForm$ = this.loginFormSubject as Observable<boolean>;

	constructor(private authService: AuthService, private movieService: MovieService, private router: Router, private store: Store, private confirmationService: ConfirmationService, private messageService: MessageService) {
		super();
	}
	ngOnInit() {
		this.searchControl.valueChanges.pipe(
			tap(() => {
				this.isLoading = true;
			}),
			debounceTime(300),
			switchMap((query) =>
				this.movieService.searchMovie(query),
			)).pipe(takeUntil(this.destroy$)).subscribe((movies) => {
				if(movies) {
					this.isLoading = false;
					this.moviesFromSearch = movies.results;
					if(movies.total_results){
						this.numberMoviesFromSearch = movies.total_results;
						this.isFindMovie = movies.total_results > 0;
					}
				}
			});
			this.authService.isLoggedIn$.pipe(takeUntil(this.destroy$)).subscribe(isLoggedIn => {
				this.isLoggedIn = isLoggedIn;
			})
	}
	openOverplay(event: Event) {
		this.overlayPanel.toggle(event);
		setTimeout(() => {
			this.searchInput.nativeElement.focus();
		}, 0);
	}
	getMovieRating(rating: number): string {
		if (rating < 5) {
			return 'low-rating'
		} else if (rating >= 5 && rating <= 7) {
			return 'medium-rating'
		} else {
			return 'high-rating'
		}
	}
	navigateWithData(movieId: number, event: Event) {
		const id = movieId;
		this.router.navigate(['/movie', id]);
		setTimeout(() => {
			this.overlayPanel.toggle(event);
		}, 300);
	}
	navigateWithAllSearchResults(query: string){
		if(query && query.trim().length > 0){
			this.store.dispatch(clearMoviesState());
			this.store.dispatch(loadMoviesFromSearch({query: query.trim()}));
			this.router.navigate(['search_results']);
			this.overlayPanel.hide();
		}
	}
	onEnterPress(event: KeyboardEvent){
		if(this.searchControl.value?.trim().length > 0){
			this.navigateWithAllSearchResults(this.searchControl.value)
		} else {
			event.preventDefault();
		}
	}
	tryAccessWithoutAuthorization(event: Event){
		if(!this.isLoggedIn){
			this.confirmationService.confirm({
				target: event.target as EventTarget,
				message: 'You need to be logged in to access this area. Do you want to login?',
				icon: 'pi pi-exclamation-triangle',
				rejectIcon:'pi pi-times mr-1',
				rejectLabel: 'Cancel',
				rejectButtonStyleClass: 'p-button-outlined p-button-sm',
				acceptButtonStyleClass: 'p-button-sm',
				accept: () => {
					this.loginFormSubject.next(true);
				},
				reject: () => {
				}
			})
		}
		this.loginFormSubject.next(false);
	}
	showForm() {
		this.loginFormSubject.next(true);
	}
	logOut(event: Event){	
		this.confirmationService.confirm({
			target: event.target as EventTarget,
			message: 'Do you want to log out?',
			icon: 'pi pi-question pi-question-custom',
			rejectIcon:'pi pi-times mr-1',
			rejectLabel: 'Cancel',
			rejectButtonStyleClass: 'p-button-outlined p-button-sm',
			acceptButtonStyleClass: 'p-button-sm',
			accept: () => {
				this.loginFormSubject.next(true);
				this.authService.logOut();
				this.messageService.add({ severity: 'info', summary: 'Logout Successful', detail: 'You have successfully logged out.', life: 3000 });
				this.loginFormSubject.next(false);
			},
			reject: () => {
			}
		})
	}
}
