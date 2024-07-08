import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/card-movie/movie-card.component';
import { MovieHeaderComponent } from '../../components/header-movie/header-movie.component';
import { MovieService } from '../../services/movie.service';
@Component({
  selector: 'app-movie-now-playing-page',
  standalone: true,
  templateUrl: './now-playing-movie-page.component.html',
  styleUrl: './now-playing-movie-page.component.scss',
  imports: [MovieCardComponent, MovieHeaderComponent],
})
export class MovieNowPlayingPageComponent implements OnInit {
  public nowPlaying: any[] = [];
  router: any;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.nowPlaying = this.movieService.getNowPlayingMovies();
  }
}
