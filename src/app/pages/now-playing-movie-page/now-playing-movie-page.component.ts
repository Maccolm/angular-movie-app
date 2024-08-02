import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/card-movie/movie-card.component';
import { MovieHeaderComponent } from '../../components/header-movie/header-movie.component';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.models';
import { Subscription, takeUntil } from 'rxjs';
import { ClearObservable } from '../../directives/clearObservable';
@Component({
	selector: 'app-movie-now-playing-page',
	standalone: true,
	templateUrl: './now-playing-movie-page.component.html',
	styleUrl: './now-playing-movie-page.component.scss',
	imports: [MovieCardComponent, MovieHeaderComponent],
})
export class MovieNowPlayingPageComponent extends ClearObservable implements OnInit {
	public nowPlaying: Movie[] = [];

	constructor(private movieService: MovieService) {
		super()
	}

	ngOnInit(): void {
		this.movieService.getMoviesByCategory('now_playing').pipe(takeUntil(this.destroy$)).subscribe((movies) => {
			this.nowPlaying = movies.results;
		});
	}

}
