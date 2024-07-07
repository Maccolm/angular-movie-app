import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { MovieService } from '../../services/movie.service';

@Component({
    selector: 'app-movie-favorite-list-page',
    standalone: true,
    templateUrl: './movie-favorite-list-page.component.html',
    styleUrl: './movie-favorite-list-page.component.scss',
    imports: [MovieCardComponent]
})
export class MovieFavoriteListPageComponent  implements OnInit{
	favoriteMovies: any[] = [];
	public emptyFavoriteList: string = 'Your list is empty. Add some movies to favorite...';
	
	constructor(private movieService: MovieService) {}

	ngOnInit(): void {
		this.favoriteMovies = this.movieService.getFavoriteMovies();
	}
	deleteFromFavorites(movie: any) {
		this.movieService.deleteFromFavorites(movie)
	}
}