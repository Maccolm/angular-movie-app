import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from "../../components/card-movie/movie-card.component";
import { MovieService } from '../../services/movie.service';

@Component({
    selector: 'app-movie-favorite-list-page',
    standalone: true,
    templateUrl: './favorite-list-movie-page.component.html',
    styleUrl: './favorite-list-movie-page.component.scss',
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