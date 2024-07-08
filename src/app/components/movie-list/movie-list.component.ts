import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MovieCardComponent } from '../card-movie/movie-card.component';
import { nowPlayingMovies } from '../../../../mock-data'
@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent {

	public emptyFavoriteList: string = 'Your list is empty. Add some movies to favorite...';
	public emptyWatchList: string = 'Your list is empty. Add some movies to watch list...';

	favoriteList: any[] = [];
	watchList: any[] =[];
	movies = nowPlayingMovies
	

	handleAddFavorite(movie: any) {
		const index = this.favoriteList.findIndex((item) => item.id === movie.id)
		if(index === -1) {
			this.favoriteList.push(movie)
		} else {
			this.favoriteList.splice(index, 1)
		}
		console.log(this.movies);
	}
	handleAddWatchList(movie: any) {
		const index = this.watchList.findIndex((item) => item.id === movie.id)
		if(index === -1){
			this.watchList.push(movie)
		} else {
			this.watchList.splice(index, 1)
		}
	}
	isInFavorite(movie: any): boolean {
		return this.favoriteList.some((item) => item.id === movie.id)
	}
	isInWatchList(movie: any): boolean {
		return this.watchList.some((item) => item.id === movie.id)
	}
	deleteFromFavorite(index: number) {
		this.favoriteList.splice(index, 1)
	}
	deleteFromWatchList(index: number) {
		this.watchList.splice(index, 1)
	}
}
