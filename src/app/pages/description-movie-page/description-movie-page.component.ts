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

@Component({
	selector: 'app-movie-description-page',
	standalone: true,
	imports: [CardModule, NumberDurationFormatPipe, BudgetNumberFormatPipe, DividerModule, ButtonModule],
	templateUrl: './description-movie-page.component.html',
	styleUrl: './description-movie-page.component.scss',
})
export class MovieDescriptionComponent extends ClearObservable implements OnInit {
	@Input() data: any;
	@Input() isInWatchList: boolean = false;
	@Input() isInFavorite: boolean = false;

	public movie: any;
	public displayDialog: boolean = false;
	public IMAGINE_PATH: string = 'https://image.tmdb.org/t/p/w500/';
	public originalLanguages!: string;
	public genres!: string;
	public countries!: string;
	public companies!: string[];
	loadingFavorites: Boolean = false;
	loadingWatchList: Boolean = false;

	constructor(private movieService: MovieService, private route: ActivatedRoute, private store: Store) {
		super()
	}

	ngOnInit(): void {
		this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
			const movieId = +params.get('id')!;
			if (movieId) {
				this.movieService.getMovieById(movieId).pipe(takeUntil(this.destroy$)).subscribe(movie => {
					this.movie = movie;
					this.originalLanguages = this.movie.spoken_languages.map((language: { english_name: string; }) => language.english_name).join(', ');
					this.genres = this.movie.genres.map((genre: { name: string; }) => genre.name).join(', ');
					this.countries = this.movie.production_countries.map((country: { name: string; }) => country.name).join(', ');

					this.store.select(isInFavorite(movieId)).pipe(takeUntil(this.destroy$)).subscribe(isFavorite => {
						this.isInFavorite = isFavorite;
					})
					this.store.select(isInWatchList(movieId)).pipe(takeUntil(this.destroy$)).subscribe(isWatchList => {
						this.isInWatchList = isWatchList;
					})
				})
			}
		});
	}
	addToFavorites() {
		this.loadingFavorites = true;
		this.movieService.setToFavoriteMovies(this.movie).pipe(takeUntil(this.destroy$)).subscribe((response) => {
			if(response) {
				console.log('added to fv', response);
				this.isInFavorite = true;
				this.loadingFavorites = false;
			}
		});
	}
	addToWatchList() {
		this.loadingWatchList = true;
		this.movieService.setToWatchList(this.movie).pipe(takeUntil(this.destroy$)).subscribe((response) => {
			if(response) {
				console.log('added to fv', response);
				this.isInWatchList = true;
				this.loadingWatchList = false;
			}
		});
	}
}
