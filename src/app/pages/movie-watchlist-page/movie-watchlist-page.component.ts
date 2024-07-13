import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/card-movie/movie-card.component';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-watchList-page',
  standalone: true,
  templateUrl: './movie-watchList-page.component.html',
  styleUrl: './movie-watchList-page.component.scss',
  imports: [MovieCardComponent],
})
export class MovieWatchListPageComponent implements OnInit, OnDestroy {
  watchList: Movie[] = [];
  private subscription!: Subscription;
  public emptyWatchList: string = 'Your list is empty. Add some movies to watch list...';

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.subscription = this.movieService.getWatchList().subscribe(movies =>{
		this.watchList = movies;
	 })
  }
  ngOnDestroy(): void {
	if(this.subscription){
		this.subscription.unsubscribe()
	}
  }
  deleteFromWatchList(movie: Movie) {
    this.movieService.deleteFromWatchList(movie);
  }
}
