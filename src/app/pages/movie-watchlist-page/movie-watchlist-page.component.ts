import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/card-movie/movie-card.component';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.models';
import { takeUntil } from 'rxjs';
import { ClearObservable } from '../../directives/clearObservable';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-watchlist-page',
  standalone: true,
  templateUrl: './movie-watchList-page.component.html',
  styleUrl: './movie-watchList-page.component.scss',
  imports: [MovieCardComponent],
})
export class MovieWatchListPageComponent extends ClearObservable implements OnInit  {
  watchList: Movie[] = [];
  
  public emptyWatchList: string = 'Your list is empty. Add some movies to watch list...';

  constructor(private movieService: MovieService) {
	super()
  }

  ngOnInit() {
	this.movieService.watchList$.pipe(takeUntil(this.destroy$)).subscribe(data =>{
		this.watchList = data;
	})
	
}
  deleteFromWatchList(movie: Movie) {
    this.movieService.deleteFromWatchList(movie).pipe(takeUntil(this.destroy$)).subscribe((response) => {
		if(response){
			this.watchList = this.watchList.filter(m => m.id !== movie.id)
			this.movieService.updateWatchListSubject(this.watchList)
		}
	 });
  }
}
