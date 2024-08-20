import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberDurationFormatPipe } from '../../pipes/numberDurationFormat/number-duration-format.pipe';
import { CardModule } from 'primeng/card';
import { LimitedSymbolsPipe } from '../../pipes/limitedSymbols/limited-symbols.pipe';
import { ButtonModule } from 'primeng/button';
import { MovieService } from '../../services/movie.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { ClearObservable } from '../../directives/clearObservable';
import { Store } from '@ngrx/store';
import { isInFavorite, isInWatchList } from '../../store/selectors';
import { setMovieToFavorite, setMovieToWatchList } from '../../store/actions';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
	selector: 'app-movie-card',
	standalone: true,
	imports: [
		CommonModule,
		NumberDurationFormatPipe,
		CardModule,
		LimitedSymbolsPipe,
		ButtonModule,
		SkeletonModule
	],
	templateUrl: './card-movie.component.html',
	styleUrl: './card-movie.component.scss',
	encapsulation: ViewEncapsulation.None,
})
export class MovieCardComponent extends ClearObservable implements OnInit {
	@Input() data: any;

	public isInFavorite: boolean = false;
	public isInWatchList: boolean = false;
	public movie: any;
	public displayDialog: boolean = false;
	public IMAGINE_PATH: string = 'https://image.tmdb.org/t/p/w500/';
	loadingFavorites: Boolean = false;
	loadingWatchList: Boolean = false;
	ratingPercentage: number = 0;
	ratingStars: number[] = [1,2,3,4,5]
	dataLoaded: boolean = false;

	constructor(private movieService: MovieService, private router: Router, private store: Store) {
		super();
	}

	ngOnInit(): void {
		
		this.movie = this.data;
		this.store.select(isInFavorite(this.movie.id)).pipe(takeUntil(this.destroy$)).subscribe(isFavorite => {
			this.isInFavorite = isFavorite;
		});
		this.store.select(isInWatchList(this.movie.id)).pipe(takeUntil(this.destroy$)).subscribe(isWatchList => {
			this.isInWatchList = isWatchList;
		})
		this.initRating(this.movie.vote_average);
		if(this.movie){
			this.dataLoaded = true;
		}
	}
	addToFavorites() {
		this.loadingFavorites = true;
		this.movieService.setToFavoriteMovies(this.movie).pipe(takeUntil(this.destroy$)).subscribe((response) => {
			if(response) {
				console.log('added to fv', response);
				this.isInFavorite = true;
				this.store.dispatch(setMovieToFavorite({movie: this.movie}));
				this.loadingFavorites = false;
			}
		});
	}
	addToWatchList() {
		this.loadingWatchList = true;
		this.movieService.setToWatchList(this.movie).pipe(takeUntil(this.destroy$)).subscribe((response) => {
			if(response) {
				console.log('added to watchList', response);
				this.store.dispatch(setMovieToWatchList({ movie: this.movie }));
				this.isInWatchList = true;
				this.loadingWatchList = false; 
			}
		});
	}
	navigateWithData() {
		const id = this.movie.id;
		this.router.navigate(['/movie', id]);
	}
	initRating(rating: number){
		this.ratingPercentage = rating / 0.1;
	}
}

