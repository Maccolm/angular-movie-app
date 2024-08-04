import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/card-movie/movie-card.component';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.models';
import { takeUntil } from 'rxjs';
import { ClearObservable } from '../../directives/clearObservable';
import { Store } from '@ngrx/store';
import { selectWatchList } from '../../store/selectors';

@Component({
  selector: 'app-movie-watchlist-page',
  standalone: true,
  templateUrl: './movie-watchList-page.component.html',
  styleUrl: './movie-watchList-page.component.scss',
  imports: [MovieCardComponent],
})
export class MovieWatchListPageComponent extends ClearObservable implements OnInit  {
  watchList: Movie[] | null = [];
  
  public emptyWatchList: string = 'Your list is empty. Add some movies to watch list...';

  constructor(private movieService: MovieService, private store: Store) {
	super()
  }

  ngOnInit() {
	this.store.select(selectWatchList).pipe(takeUntil(this.destroy$)).subscribe(movies => {
		this.watchList = movies;
	})	
}
  deleteFromWatchList(movie: Movie) {
    this.movieService.deleteFromWatchList(movie).pipe(takeUntil(this.destroy$)).subscribe((response) => {
		if(response && this.watchList){
			this.watchList = this.watchList.filter(m => m.id !== movie.id)
		}
	 });
  }
}
