import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/card-movie/movie-card.component';
import { MovieHeaderComponent } from '../../components/header-movie/header-movie.component';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.models';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-movie-now-playing-page',
  standalone: true,
  templateUrl: './now-playing-movie-page.component.html',
  styleUrl: './now-playing-movie-page.component.scss',
  imports: [MovieCardComponent, MovieHeaderComponent],
})
export class MovieNowPlayingPageComponent implements OnInit, OnDestroy {
  public nowPlaying: Movie[] = [];
  private subscription!: Subscription;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
   this.subscription = this.movieService.getNowPlayingMovies().subscribe((movies) => {
      this.nowPlaying = movies.results;
    });
  }
  ngOnDestroy(){
	if (this.subscription){
		this.subscription.unsubscribe()
	}
  }
}
