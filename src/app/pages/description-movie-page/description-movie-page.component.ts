import { Component, Input, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { ActivatedRoute } from '@angular/router';
import { NumberDurationFormatPipe } from "../../pipes/numberDurationFormat/number-duration-format.pipe";
import { BudgetNumberFormatPipe } from '../../pipes/budgetNumberFormat/budget-number-format.pipe';
import { takeUntil } from 'rxjs';
import { ClearObservable } from '../../directives/clearObservable';
import { Store } from '@ngrx/store';
import { isInFavorite, isInWatchList } from '../../store/selectors';
import { setMovieToFavorite, setMovieToWatchList } from '../../store/actions';
import { CarouselModule } from 'primeng/carousel';
import { CarouselComponent } from "../../components/carousel/carousel.component";
import { AuthService } from '../../services/auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@Component({
	selector: 'app-movie-description-page',
	standalone: true,
	imports: [CardModule, NumberDurationFormatPipe, BudgetNumberFormatPipe, DividerModule, ButtonModule, CarouselModule, CarouselComponent, ToastModule, ConfirmPopupModule,],
	templateUrl: './description-movie-page.component.html',
	styleUrl: './description-movie-page.component.scss',
	providers: [ConfirmationService, MessageService]
})
export class MovieDescriptionComponent extends ClearObservable implements OnInit {
	@Input() data: any;
	@Input() isInWatchList: boolean = false;
	@Input() isInFavorite: boolean = false;

	public movie: any;
	public movieId!: number;
	public displayDialog: boolean = false;
	public IMAGINE_PATH: string = 'https://image.tmdb.org/t/p/w500/';
	public originalLanguages!: string;
	public genres!: string;
	public countries!: string;
	public companies!: string[];
	public website!: string;
	public isLoggedIn: boolean = false;
	loadingFavorites: Boolean = false;
	loadingWatchList: Boolean = false;
	ratingPercentage: number = 0;
	ratingStars: number[] = [1,2,3,4,5,6,7,8,9,10];

	constructor(
		private movieService: MovieService, 
		private route: ActivatedRoute,
		private store: Store,
		private authService: AuthService,
		private confirmationService: ConfirmationService) {
		super();
	}

	ngOnInit(): void {
		this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
			 this.movieId = +params.get('id')!;
			if (this.movieId) {
				this.movieService.getMovieById(this.movieId).pipe(takeUntil(this.destroy$)).subscribe(movie => {
					this.movie = movie;
					this.originalLanguages = this.movie.spoken_languages.map((language: { english_name: string; }) => language.english_name).join(', ');
					this.genres = this.movie.genres.map((genre: { name: string; }) => genre.name).join(', ');
					this.countries = this.movie.production_countries.map((country: { name: string; }) => country.name).join(', ');
					this.website = this.movie.homepage;
					this.initRating(movie.vote_average);

					this.store.select(isInFavorite(this.movieId)).pipe(takeUntil(this.destroy$)).subscribe(isFavorite => {
						this.isInFavorite = isFavorite;
					})
					this.store.select(isInWatchList(this.movieId)).pipe(takeUntil(this.destroy$)).subscribe(isWatchList => {
						this.isInWatchList = isWatchList;
					})
				})
			}
		});
		this.authService.isLoggedIn$.pipe(takeUntil(this.destroy$)).subscribe(isLoggedIn => {
			this.isLoggedIn = isLoggedIn;
		})
	}
	addToFavorites(event: Event) {
		if(this.isLoggedIn){
			this.loadingFavorites = true;
			this.movieService.setToFavoriteMovies(this.movie).pipe(takeUntil(this.destroy$)).subscribe((response) => {
				if(response) {
					console.log('added to fv', response);
					this.isInFavorite = true;
					this.store.dispatch(setMovieToFavorite({movie: this.movie}));
					this.loadingFavorites = false;
				}
			});
		} else {			
			this.confirmationService.confirm({
				target: event.target as EventTarget,
				message:'You have to be logged in to access this area',
				icon: 'pi pi-exclamation-triangle',
				rejectIcon: 'pi pi-times',
				rejectLabel: 'Cancel',
				rejectButtonStyleClass: 'p-button-outlined p-button-sm',
				acceptButtonStyleClass: 'p-button-sm',
				accept: () => {
					console.log('accepted');
				},
				reject: () => {
					console.log('rejected');
				}
			})
		}
	}
	addToWatchList(event: Event) {
		if(this.isLoggedIn){
			this.loadingWatchList = true;
			this.movieService.setToWatchList(this.movie).pipe(takeUntil(this.destroy$)).subscribe((response) => {
				if(response) {
					console.log('added to watchList', response);
					this.store.dispatch(setMovieToWatchList({ movie: this.movie }));
					this.isInWatchList = true;
					this.loadingWatchList = false; 
				}
			});
		} else {
			this.confirmationService.confirm({
				target: event.target as EventTarget,
				message:'You have to be logged in to access this area',
				icon: 'pi pi-exclamation-triangle',
				rejectIcon: 'pi pi-times',
				rejectLabel: 'Cancel',
				rejectButtonStyleClass: 'p-button-outlined p-button-sm',
				acceptButtonStyleClass: 'p-button-sm',
				accept: () => {
					console.log('accepted');
				},
				reject: () => {
					console.log('rejected');
				}
			})
		}
	}
	initRating(rating: number){
		this.ratingPercentage = rating / 0.1;
	}
}
