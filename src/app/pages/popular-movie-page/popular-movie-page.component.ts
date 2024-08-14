import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from "../../components/card-movie/movie-card.component";
import { MovieHeaderComponent } from "../../components/header-movie/header-movie.component";
import { takeUntil } from 'rxjs';
import { Movie } from '../../models/movie.models';
import { ClearObservable } from '../../directives/clearObservable';
import { Store } from '@ngrx/store';
import { selectMovies } from '../../store/selectors';
import { DataViewModule } from 'primeng/dataview';
import { loadMovies } from '../../store/actions';

@Component({
	selector: 'app-movie-popular-page',
	standalone: true,
	templateUrl: './popular-movie-page.component.html',
	styleUrl: './popular-movie-page.component.scss',
	imports: [MovieCardComponent, MovieHeaderComponent, DataViewModule],
})
export class MoviePopularPageComponent extends ClearObservable implements OnInit {
	popularMovies: Movie[] = [];
	constructor(private store: Store) {
		super();
	}

	ngOnInit(): void {
		this.store.select(selectMovies).pipe(takeUntil(this.destroy$)).subscribe(movies => {
			this.popularMovies = movies || [];
		})
	}
	changeOnPage(event: any) {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		const newPage = event.first + 1;
		this.store.dispatch(loadMovies({ category: 'popular', page: newPage }));
	}
}

