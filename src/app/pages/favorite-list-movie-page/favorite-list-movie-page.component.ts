import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieCardComponent } from "../../components/card-movie/movie-card.component";
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.models';
import { Subscription, takeUntil } from 'rxjs';
import { ClearObservable } from '../../directives/clearObservable';

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
	
	constructor(private movieService: MovieService) {
		super();
	}

	ngOnInit(): void {
		this.loadFavoriteMovies()
	}
	loadFavoriteMovies(){
		this.movieService.getFavoriteMovies().pipe(takeUntil(this.destroy$)).subscribe(movies => {
			this.favoriteMovies = movies;
		})
	}
	//в мене автоматично не змінювалися фільми, тільки при оновленні сторінки. Вже не знаю як зробити, щоб воно прибирало видалені фільми окрім цього
	deleteFromFavorites(movie: Movie) {
		this.movieService.removeFromFavoriteMovies(movie).pipe(takeUntil(this.destroy$)).subscribe(() => {
			this.loadFavoriteMovies();
		})
	 }
}