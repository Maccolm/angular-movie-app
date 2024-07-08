import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from "../../components/card-movie/movie-card.component";
import { upcomingMovies } from '../../../../mock-data';
import { MovieHeaderComponent } from "../../components/header-movie/header-movie.component";
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-upcoming-page',
  standalone: true,
  templateUrl: './upcoming-movie-page.component.html',
  styleUrl: './upcoming-movie-page.component.scss',
  imports: [MovieCardComponent, MovieHeaderComponent],
})
export class MovieUpcomingPageComponent implements OnInit {
  public upcoming: any[] = [];

  constructor(private movieService: MovieService) {}
  ngOnInit(): void {
    this.upcoming = this.movieService.getUpcomingMovies();
  }
}
