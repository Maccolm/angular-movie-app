import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { popularMovies, nowPlayingMovies, topRatedMovies, upcomingMovies} from '../../../../mock-data';
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";

@Component({
    selector: 'app-movie-favorite-list-page',
    standalone: true,
    templateUrl: './movie-favorite-list-page.component.html',
    styleUrl: './movie-favorite-list-page.component.scss',
    imports: [MovieCardComponent]
})
export class MovieFavoriteListPageComponent  implements OnInit{
	favoriteMovies: any[] = [];

	constructor(private route: ActivatedRoute) {}

	ngOnInit(): void {
	 this.route.queryParams.subscribe(params => {
      const dataString = params['data'];
      const watchLaterIds = dataString ? JSON.parse(dataString) : [];
      this.favoriteMovies = popularMovies.filter(movie => watchLaterIds.includes(movie.id));
    });
	}
}