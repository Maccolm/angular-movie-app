import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieCardComponent } from "../../components/card-movie/movie-card.component";
import { MovieHeaderComponent } from "../../components/header-movie/header-movie.component";
import { MovieService } from '../../services/movie.service';
import { Subscription, takeUntil } from 'rxjs';
import { Movie } from '../../models/movie.models';
import { ClearObservable } from '../../directives/clearObservable';

@Component({
	selector: 'app-movie-popular-page',
	standalone: true,
	templateUrl: './popular-movie-page.component.html',
	styleUrl: './popular-movie-page.component.scss',
	imports: [MovieCardComponent, MovieHeaderComponent],
})
export class MoviePopularPageComponent extends ClearObservable implements OnInit {
	popularMovies: Movie[] = [];

	constructor(private movieService: MovieService) {
		super();
	}

	ngOnInit(): void {
		this.movieService.getPopularMovies().pipe(takeUntil(this.destroy$)).subscribe(
			movies => {
				this.popularMovies = movies.results
			}
		)
	}
}

