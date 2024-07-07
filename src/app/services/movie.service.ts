import { Injectable } from '@angular/core';
import { nowPlayingMovies, popularMovies, topRatedMovies, upcomingMovies } from '../../../mock-data';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

	favoriteMovies: any[] = [];
	watchList: any[] = [];

	constructor() { }
  
	getPopularMovies(){
		return popularMovies;
	}
	getUpcomingMovies() {
		return upcomingMovies;
	}
	getNowPlayingMovies(){
		return nowPlayingMovies;
	}
	getTopRateMovies(){
		return topRatedMovies;
	}

	getFavoriteMovies(){
		return this.favoriteMovies;
	}
	getWatchList(){
		return this.watchList;
	}
	setFavoriteMovies(movie: any){
		const isInFavorite = this.favoriteMovies.find(m => m === movie)
		if (!isInFavorite) {
			this.favoriteMovies.push(movie)
		} else{
			console.log('it is already in favorite');
		}
	}
	setWatchList(movie: any){
		const isInWatchList = this.watchList.find(m => m === movie)
		if (!isInWatchList) {
			this.watchList.push(movie)
		} else {
			console.log('already in watchList');
			
		}
	}
	isInFavoriteList(movie: any): boolean{
		return this.favoriteMovies.includes(movie)
	}
	isInWatchList(movie: any): boolean {
		return this.watchList.includes(movie)
	}

	deleteFromWatchList(movie: any){
		const index = this.watchList.findIndex(m => m === movie)
		this.watchList.splice(index, 1)
	}
	deleteFromFavorites(movie: any) {
		const index = this.favoriteMovies.findIndex(m => movie === m)
		this.favoriteMovies.splice(index, 1)
	}
	 getMovieById(id: number) {
    return this.getPopularMovies().find(m => m.id === id) ||
           this.getUpcomingMovies().find(m => m.id === id) ||
           this.getNowPlayingMovies().find(m => m.id === id) ||
           this.getTopRateMovies().find(m => m.id === id);
  }
}
