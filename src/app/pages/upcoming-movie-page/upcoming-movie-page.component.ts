import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieCardComponent } from "../../components/card-movie/movie-card.component";
import { MovieHeaderComponent } from "../../components/header-movie/header-movie.component";
import { MovieService } from '../../services/movie.service';
import { Subscription, takeUntil } from 'rxjs';
import { ClearObservable } from '../../directives/clearObservable';

@Component({
  selector: 'app-movie-upcoming-page',
  standalone: true,
  templateUrl: './upcoming-movie-page.component.html',
  styleUrl: './upcoming-movie-page.component.scss',
  imports: [MovieCardComponent, MovieHeaderComponent],
})
export class MovieUpcomingPageComponent extends ClearObservable implements OnInit {
  public upcoming: any[] = [];

  constructor(private movieService: MovieService) {
	super();
  }
  ngOnInit(): void {
   this.movieService.getMoviesByCategory('upcoming').pipe(takeUntil(this.destroy$)).subscribe((movies) => {
		this.upcoming = movies.results;
	});
  }
 
}
