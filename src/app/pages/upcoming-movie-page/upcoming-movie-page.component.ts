import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from "../../components/card-movie/movie-card.component";
import { MovieHeaderComponent } from "../../components/header-movie/header-movie.component";
import { takeUntil } from 'rxjs';
import { ClearObservable } from '../../directives/clearObservable';
import { Store } from '@ngrx/store';
import { selectMovies } from '../../store/selectors';

@Component({
  selector: 'app-movie-upcoming-page',
  standalone: true,
  templateUrl: './upcoming-movie-page.component.html',
  styleUrl: './upcoming-movie-page.component.scss',
  imports: [MovieCardComponent, MovieHeaderComponent],
})
export class MovieUpcomingPageComponent extends ClearObservable implements OnInit {
  public upcoming: any[] | null = [];

  constructor(private store: Store) {
	super();
  }
  ngOnInit(): void {
	this.store.select(selectMovies).pipe(takeUntil(this.destroy$)).subscribe(movies => {
		this.upcoming = movies;
	})
  }
}
