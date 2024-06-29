import { Component } from '@angular/core';
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { MovieHeaderComponent } from "../../components/movie-header/movie-header.component";
import { MovieService } from '../../services/movie.service';
@Component({
    selector: 'app-movie-top-rate-page',
    standalone: true,
    templateUrl: './movie-top-rate-page.component.html',
    styleUrl: './movie-top-rate-page.component.scss',
    imports: [MovieCardComponent, MovieHeaderComponent]
})
export class MovieTopRatePageComponent {
 public topRated: any[] = []

	constructor(private movieService: MovieService) {}

	ngOnInit(): void {
		this.topRated = this.movieService.getTopRateMovies();
  }

}

