import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieCardComponent } from "../../components/card-movie/movie-card.component";
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.models';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-movie-favorite-list-page',
    standalone: true,
    templateUrl: './favorite-list-movie-page.component.html',
    styleUrl: './favorite-list-movie-page.component.scss',
    imports: [MovieCardComponent]
})
export class MovieFavoriteListPageComponent  implements OnInit, OnDestroy{
	private subscription!: Subscription;
	favoriteMovies: Movie[] = [];
	public emptyFavoriteList: string = 'Your list is empty. Add some movies to favorite...';
	
	constructor(private movieService: MovieService) {}

	ngOnInit(): void {
		this.subscription = this.movieService.getFavoriteMovies().subscribe(movies => {
			this.favoriteMovies = movies;
		},
		error => {
			console.error('Failed to load favorite movies:', error);
		 });
	}
	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
	deleteFromFavorites(movie: Movie) {
		this.subscription.add(
			this.movieService.removeFromFavoriteMovies(movie).subscribe(response => {
				console.log('removed from favorites', response);
				this.favoriteMovies = this.favoriteMovies.filter(m => m.id !== movie.id);
			},
			error => console.error('Failed to remove movie from favorites:', error)
		)
	)
	}
}