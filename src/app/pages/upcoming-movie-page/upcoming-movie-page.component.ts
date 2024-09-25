import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from "../../components/card-movie/movie-card.component";
import { MovieHeaderComponent } from "../../components/header-movie/header-movie.component";
import { takeUntil } from 'rxjs';
import { ClearObservable } from '../../directives/clearObservable';
import { Store } from '@ngrx/store';
import { selectMovies } from '../../store/selectors';
import { loadMovies } from '../../store/actions';
import { DataViewModule } from 'primeng/dataview';
import { Movie } from '../../models/movie.models';


@Component({
	selector: 'app-movie-upcoming-page',
	standalone: true,
	templateUrl: './upcoming-movie-page.component.html',
	styleUrl: './upcoming-movie-page.component.scss',
	imports: [MovieCardComponent, MovieHeaderComponent, DataViewModule],
})
export class MovieUpcomingPageComponent extends ClearObservable implements OnInit {
	public upcoming: Movie[] = [];

	constructor(private store: Store) {
		super();
	}
	ngOnInit(): void {
		this.store.select(selectMovies).pipe(takeUntil(this.destroy$)).subscribe(movies => {
			this.upcoming = movies || [];
		})
	}
	changeOnPage(event: any) {
		window.scrollTo({ top: 0, behavior: 'smooth' })
		const newPage = event.first + 1
		this.store.dispatch(loadMovies({ category: 'popular', page: newPage }))
	}
}
