import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/card-movie/movie-card.component';
import { MovieHeaderComponent } from '../../components/header-movie/header-movie.component';
import {  takeUntil } from 'rxjs';
import { ClearObservable } from '../../directives/clearObservable';
import { Store } from '@ngrx/store';
import { selectMovies } from '../../store/selectors';
import { Movie } from '../../models/movie.models';
import { loadMovies } from '../../store/actions';
import { DataViewModule } from 'primeng/dataview';

@Component({
	selector: 'app-movie-top-rate-page',
	standalone: true,
	templateUrl: './top-rate-movie-page.component.html',
	styleUrl: './top-rate-movie-page.component.scss',
	imports: [MovieCardComponent, MovieHeaderComponent, DataViewModule],
})
export class MovieTopRatePageComponent extends ClearObservable implements OnInit {
	public topRated: Movie[] = [];

	constructor(private store: Store) {
		super();
	}

	ngOnInit(): void {
		this.store.select(selectMovies).pipe(takeUntil(this.destroy$)).subscribe(movies => {
			this.topRated = movies || [];
		})
	}
	changeOnPage(event: any){
		window.scrollTo({top: 0, behavior: 'smooth'})
		const newPage = event.first + 1
		this.store.dispatch(loadMovies({category: 'popular', page: newPage}))
	}
}
