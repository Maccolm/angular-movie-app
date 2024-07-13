import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../components/card-movie/movie-card.component';
import { MovieHeaderComponent } from '../../components/header-movie/header-movie.component';
import { MovieService } from '../../services/movie.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-movie-top-rate-page',
  standalone: true,
  templateUrl: './top-rate-movie-page.component.html',
  styleUrl: './top-rate-movie-page.component.scss',
  imports: [MovieCardComponent, MovieHeaderComponent],
})
export class MovieTopRatePageComponent implements OnInit, OnDestroy {
  public topRated: any[] = [];
  private subscription!: Subscription;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.subscription = this.movieService.getTopRateMovies().subscribe((movies) => {
        this.topRated = movies.results;
      });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
		this.subscription.unsubscribe()
    }
  }
}
