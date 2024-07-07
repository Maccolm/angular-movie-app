import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { MovieHeaderComponent } from "../../components/movie-header/movie-header.component";
import { MovieService } from '../../services/movie.service';

@Component({
    selector: 'app-movie-popular-page',
    standalone: true,
    templateUrl: './movie-popular-page.component.html',
    styleUrl: './movie-popular-page.component.scss',
    imports: [MovieCardComponent, MovieHeaderComponent],
})
export class MoviePopularPageComponent implements OnInit {
	popularMovies: any = [];

	constructor(private movieService: MovieService) {}

	ngOnInit( ): void {
		this.popularMovies = this.movieService.getPopularMovies();
  }
}

