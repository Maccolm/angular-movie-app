import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieCardComponent } from "../../components/card-movie/movie-card.component";
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.models';
import { takeUntil } from 'rxjs';
import { ClearObservable } from '../../directives/clearObservable';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-movie-favorite-list-page',
    standalone: true,
    templateUrl: './favorite-list-movie-page.component.html',
    styleUrl: './favorite-list-movie-page.component.scss',
    imports: [MovieCardComponent]
})
export class MovieFavoriteListPageComponent extends ClearObservable implements OnInit{
	favoriteMovies: Movie[] = [];
	public emptyFavoriteList: string = 'Your list is empty. Add some movies to favorite...';
	
	constructor(private movieService: MovieService, private route: ActivatedRoute) {
		super();
	}

	ngOnInit(): void {
		this.route.data.pipe(takeUntil(this.destroy$)).subscribe(data => {
			this.favoriteMovies = data['favoriteMovies'];
			this.favoriteMovies.forEach(movie => {
				this.movieService.setToFavoriteMoviesSubject(movie)
			})
		});
	}
	updateFavoriteMovies(){
		this.movieService.getFavoriteMovies().pipe(takeUntil(this.destroy$)).subscribe(movies => {
			this.favoriteMovies = movies;
		});
	}
	deleteFromFavorites(movie: Movie) {
		this.movieService.removeFromFavoriteMovies(movie).pipe(takeUntil(this.destroy$)).subscribe(() => {
			this.updateFavoriteMovies();
		})
	 }
}