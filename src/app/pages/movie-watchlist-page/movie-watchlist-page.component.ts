import { Component } from '@angular/core';
import { MovieCardComponent } from "../../components/card-movie/movie-card.component";
import { MovieService } from '../../services/movie.service';

@Component({
    selector: 'app-movie-watchlist-page',
    standalone: true,
    templateUrl: './movie-watchlist-page.component.html',
    styleUrl: './movie-watchlist-page.component.scss',
    imports: [MovieCardComponent]
})
export class MovieWatchlistPageComponent {
 watchList: any[] = [];
 public emptyWatchList: string = 'Your list is empty. Add some movies to watch list...';


  constructor(private movieService: MovieService) {}

  ngOnInit() {
	this.watchList = this.movieService.getWatchList()
  }
  deleteFromWatchList(movie: any){
	this.movieService.deleteFromWatchList(movie)
  }
}
