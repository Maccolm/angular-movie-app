import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/card-movie/movie-card.component';
import { MovieHeaderComponent } from '../../components/header-movie/header-movie.component';
import { Movie } from '../../models/movie.models';
import { ClearObservable } from '../../directives/clearObservable';
import { Store } from '@ngrx/store';
import { selectMovies } from '../../store/selectors';
import { takeUntil } from 'rxjs';
import { loadMovies } from '../../store/actions';
import { DataViewModule } from 'primeng/dataview';

@Component({
	selector: 'app-movie-now-playing-page',
	standalone: true,
	templateUrl: './now-playing-movie-page.component.html',
	styleUrl: './now-playing-movie-page.component.scss',
	imports: [MovieCardComponent, MovieHeaderComponent, DataViewModule],
})
export class MovieNowPlayingPageComponent extends ClearObservable implements OnInit {
	public nowPlaying: Movie[] = [];

	constructor(private store: Store) {
		super()
	}

	ngOnInit(): void {
		this.store.select(selectMovies).pipe(takeUntil(this.destroy$)).subscribe(movies => {
			this.nowPlaying = movies || [];
		})
	}
	changeOnPage(event: any){
		window.scrollTo({top: 0, behavior: 'smooth'})
		const newPage = event.first + 1
		this.store.dispatch(loadMovies({category: 'popular', page: newPage}))
	}
}
