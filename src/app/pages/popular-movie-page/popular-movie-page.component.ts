import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from "../../components/card-movie/movie-card.component";
import { MovieHeaderComponent } from "../../components/header-movie/header-movie.component";
import { MovieService } from '../../services/movie.service';
import { takeUntil } from 'rxjs';
import { Movie } from '../../models/movie.models';
import { ClearObservable } from '../../directives/clearObservable';
import { loadMovies } from '../../store/actions';
import { Store } from '@ngrx/store';
import { selectMovies } from '../../store/selectors';

@Component({
	selector: 'app-movie-popular-page',
	standalone: true,
	templateUrl: './popular-movie-page.component.html',
	styleUrl: './popular-movie-page.component.scss',
	imports: [MovieCardComponent, MovieHeaderComponent],
})
export class MoviePopularPageComponent extends ClearObservable implements OnInit {
	popularMovies: Movie[] | null = [];

	constructor(private movieService: MovieService, private store: Store) {
		super();
	}

	ngOnInit(): void {
		this.store.dispatch(loadMovies({category: 'popular'}));

		this.store.select(selectMovies).pipe(takeUntil(this.destroy$)).subscribe(movies => {
			this.popularMovies = movies;
		})
	}
}

