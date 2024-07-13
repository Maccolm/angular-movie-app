import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieCardComponent } from "../../components/card-movie/movie-card.component";
import { MovieHeaderComponent } from "../../components/header-movie/header-movie.component";
import { MovieService } from '../../services/movie.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-upcoming-page',
  standalone: true,
  templateUrl: './upcoming-movie-page.component.html',
  styleUrl: './upcoming-movie-page.component.scss',
  imports: [MovieCardComponent, MovieHeaderComponent],
})
export class MovieUpcomingPageComponent implements OnInit, OnDestroy {
  public upcoming: any[] = [];
	private subscription!: Subscription;

  constructor(private movieService: MovieService) {}
  ngOnInit(): void {
   this.subscription = this.movieService.getUpcomingMovies().subscribe((movies) => {
		this.upcoming = movies.results;
	});
  }
  ngOnDestroy(): void {
	if(this.subscription) {
		this.subscription.unsubscribe()
	}
  }
}
