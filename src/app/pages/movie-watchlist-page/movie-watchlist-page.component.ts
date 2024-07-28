import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/card-movie/movie-card.component';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.models';
import { Subscription, takeUntil } from 'rxjs';
import { ClearObservable } from '../../directives/clearObservable';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-watchList-page',
  standalone: true,
  templateUrl: './movie-watchList-page.component.html',
  styleUrl: './movie-watchList-page.component.scss',
  imports: [MovieCardComponent],
})
export class MovieWatchListPageComponent extends ClearObservable implements OnInit  {
  watchList: Movie[] = [];
  
  public emptyWatchList: string = 'Your list is empty. Add some movies to watch list...';

  constructor(private movieService: MovieService, private route: ActivatedRoute) {
	super()
  }

  ngOnInit() {
	this.route.data.pipe(takeUntil(this.destroy$)).subscribe(data =>{
		this.watchList = data['watchList'];
		this.watchList.forEach(movie => {this.movieService.setToWatchListSubject$(movie)})
	})
	
}
	updateWatchList(){
	 this.movieService.getWatchList().pipe(takeUntil(this.destroy$)).subscribe(movies =>{
		 this.watchList = movies;
	  })
 	}
  deleteFromWatchList(movie: Movie) {
    this.movieService.deleteFromWatchList(movie).pipe(takeUntil(this.destroy$)).subscribe(() => {
		this.updateWatchList();
	 });
  }
}
