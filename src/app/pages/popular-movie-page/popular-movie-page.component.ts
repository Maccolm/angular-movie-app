import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieCardComponent } from "../../components/card-movie/movie-card.component";
import { MovieHeaderComponent } from "../../components/header-movie/header-movie.component";
import { MovieService } from '../../services/movie.service';
import { Subscription } from 'rxjs';
import { Movie } from '../../models/movie.models';

@Component({
    selector: 'app-movie-popular-page',
    standalone: true,
    templateUrl: './popular-movie-page.component.html',
    styleUrl: './popular-movie-page.component.scss',
    imports: [MovieCardComponent, MovieHeaderComponent],
})
export class MoviePopularPageComponent implements OnInit, OnDestroy {
	popularMovies: Movie[] = [];
	private subscription!: Subscription;

	constructor(private movieService: MovieService) {}

	ngOnInit( ): void {
		this.subscription = this.movieService.getPopularMovies().subscribe(
			movies => {
				this.popularMovies = movies.results
			}
		)
  }
  ngOnDestroy(): void {
	if(this.subscription) {
		this.subscription.unsubscribe()
	}
  }
}

