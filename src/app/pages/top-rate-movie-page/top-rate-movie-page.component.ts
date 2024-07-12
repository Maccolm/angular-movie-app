import { Component } from '@angular/core';
import { MovieCardComponent } from "../../components/card-movie/movie-card.component";
import { MovieHeaderComponent } from "../../components/header-movie/header-movie.component";
import { MovieService } from '../../services/movie.service';
@Component({
  selector: 'app-movie-top-rate-page',
  standalone: true,
  templateUrl: './top-rate-movie-page.component.html',
  styleUrl: './top-rate-movie-page.component.scss',
  imports: [MovieCardComponent, MovieHeaderComponent],
})
export class MovieTopRatePageComponent {
  public topRated: any[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
   	this.movieService.getTopRateMovies().subscribe((movies) => {
      this.topRated = movies.results
    });
  }
}

