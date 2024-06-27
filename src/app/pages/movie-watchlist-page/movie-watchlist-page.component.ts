import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { popularMovies } from '../../../../mock-data';
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";

@Component({
    selector: 'app-movie-watchlist-page',
    standalone: true,
    templateUrl: './movie-watchlist-page.component.html',
    styleUrl: './movie-watchlist-page.component.scss',
    imports: [MovieCardComponent]
})
export class MovieWatchlistPageComponent {
 watchLaterMovies: any[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const dataString = params['data'];
      const watchLaterIds = dataString ? JSON.parse(dataString) : [];
      this.watchLaterMovies = popularMovies.filter(movie => watchLaterIds.includes(movie.id));
    });
  }
}
