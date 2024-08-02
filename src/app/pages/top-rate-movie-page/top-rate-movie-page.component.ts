import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/card-movie/movie-card.component';
import { MovieHeaderComponent } from '../../components/header-movie/header-movie.component';
import { MovieService } from '../../services/movie.service';
import { Subscription, takeUntil } from 'rxjs';
import { ClearObservable } from '../../directives/clearObservable';
import { Store } from '@ngrx/store';
import { selectMovies } from '../../store/selectors';
@Component({
	selector: 'app-movie-top-rate-page',
	standalone: true,
	templateUrl: './top-rate-movie-page.component.html',
	styleUrl: './top-rate-movie-page.component.scss',
	imports: [MovieCardComponent, MovieHeaderComponent],
})
export class MovieTopRatePageComponent extends ClearObservable implements OnInit {
	public topRated: any[] | null = [];

	constructor(private store: Store) {
		super();
	}

	ngOnInit(): void {
		this.store.select(selectMovies).pipe(takeUntil(this.destroy$)).subscribe(movies => {
			this.topRated = movies;
		})
	}
}
