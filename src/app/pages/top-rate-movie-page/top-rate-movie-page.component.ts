import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/card-movie/movie-card.component';
import { MovieHeaderComponent } from '../../components/header-movie/header-movie.component';
import { MovieService } from '../../services/movie.service';
import { Subscription, takeUntil } from 'rxjs';
import { ClearObservable } from '../../directives/clearObservable';
@Component({
	selector: 'app-movie-top-rate-page',
	standalone: true,
	templateUrl: './top-rate-movie-page.component.html',
	styleUrl: './top-rate-movie-page.component.scss',
	imports: [MovieCardComponent, MovieHeaderComponent],
})
export class MovieTopRatePageComponent extends ClearObservable implements OnInit {
	public topRated: any[] = [];

	constructor(private movieService: MovieService) {
		super();
	}

	ngOnInit(): void {
		this.movieService.getMoviesByCategory('top_rated').pipe(takeUntil(this.destroy$)).subscribe((movies) => {
			this.topRated = movies.results;
		});
	}
}
