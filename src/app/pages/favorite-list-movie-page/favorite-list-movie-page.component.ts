import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from "../../components/card-movie/movie-card.component";
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.models';
import { takeUntil } from 'rxjs';
import { ClearObservable } from '../../directives/clearObservable';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectFavoriteMovies } from '../../store/selectors';

@Component({
	selector: 'app-movie-favorite-list-page',
	standalone: true,
	templateUrl: './favorite-list-movie-page.component.html',
	styleUrl: './favorite-list-movie-page.component.scss',
	imports: [MovieCardComponent]
})
export class MovieFavoriteListPageComponent extends ClearObservable implements OnInit {
	favoriteMovies: Movie[] | null = [];
	public emptyFavoriteList: string = 'Your list is empty. Add some movies to favorite...';

	constructor(private movieService: MovieService, private store: Store) {
		super();
	}

	ngOnInit(): void {
		this.store.select(selectFavoriteMovies).pipe(takeUntil(this.destroy$)).subscribe(movies => {
			this.favoriteMovies = movies;
		})
	}
	deleteFromFavorites(movie: Movie) {
		this.movieService.removeFromFavoriteMovies(movie).pipe(takeUntil(this.destroy$)).subscribe((response) => {
			if (response && this.favoriteMovies) {
				this.favoriteMovies = this.favoriteMovies.filter(favMovie => favMovie.id !== movie.id);
			}
		})
	}
}