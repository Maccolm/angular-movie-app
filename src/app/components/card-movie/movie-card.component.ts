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

@Component({
	selector: 'app-movie-card',
	standalone: true,
	imports: [
		CommonModule,
		NumberDurationFormatPipe,
		CardModule,
		LimitedSymbolsPipe,
		ButtonModule,
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

	constructor(private movieService: MovieService, private router: Router) {
		super()
	}

	ngOnInit(): void {
		this.movie = this.data;
		this.movieService.favoriteMovies$.pipe(takeUntil(this.destroy$)).subscribe(favorites => {
			this.isInFavorite = Boolean(favorites.find(m => m.id === this.movie.id))
		});
		this.movieService.watchList$.pipe(takeUntil(this.destroy$)).subscribe(watchList => {
			this.isInWatchList = Boolean(watchList.find(m => m.id === this.movie.id))
		});
	}
	addToFavorites() {
		this.movieService.setToFavoriteMovies(this.movie).pipe(takeUntil(this.destroy$)).subscribe((response) => {
      console.log('added to fv', response);
      this.isInFavorite = true;
		this.movieService.setToFavoriteMoviesSubject(this.movie)
    });
	}
	addToWatchList() {
		this.movieService.setToWatchList(this.movie).pipe(takeUntil(this.destroy$)).subscribe((response) => {
      console.log('added to watchList', response);
      this.isInWatchList = true;
		this.movieService.setToWatchListSubject$(this.movie)
    });
	}
	navigateWithData() {
		const id = this.movie.id;
		this.router.navigate(['/movie', id]);
	}
}

