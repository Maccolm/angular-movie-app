import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { MovieHeaderComponent } from '../../components/movie-header/movie-header.component';
import { MovieService } from '../../services/movie.service';
@Component({
  selector: 'app-movie-now-playing-page',
  standalone: true,
  templateUrl: './movie-now-playing-page.component.html',
  styleUrl: './movie-now-playing-page.component.scss',
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
