import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/card-movie/movie-card.component';
import { MovieHeaderComponent } from '../../components/header-movie/header-movie.component';
import { Movie } from '../../models/movie.models';
import { ClearObservable } from '../../directives/clearObservable';
import { Store } from '@ngrx/store';
import { selectMovies } from '../../store/selectors';
import { takeUntil } from 'rxjs';
@Component({
	selector: 'app-movie-now-playing-page',
	standalone: true,
	templateUrl: './now-playing-movie-page.component.html',
	styleUrl: './now-playing-movie-page.component.scss',
	imports: [MovieCardComponent, MovieHeaderComponent],
})
export class MovieNowPlayingPageComponent extends ClearObservable implements OnInit {
	public nowPlaying: Movie[] | null = [];

	constructor(private store: Store) {
		super()
	}

	ngOnInit(): void {
		this.store.select(selectMovies).pipe(takeUntil(this.destroy$)).subscribe(movies => {
			this.nowPlaying = movies;
		})
	}
}
