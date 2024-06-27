import { Component } from '@angular/core';
import { nowPlayingMovies } from '../../../../mock-data';
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { MovieHeaderComponent } from "../../components/movie-header/movie-header.component";
@Component({
    selector: 'app-movie-now-playing-page',
    standalone: true,
    templateUrl: './movie-now-playing-page.component.html',
    styleUrl: './movie-now-playing-page.component.scss',
    imports: [MovieCardComponent, MovieHeaderComponent]
})
export class MovieNowPlayingPageComponent {
	public movies = nowPlayingMovies
	public favoriteMoviesIds: { id: string, type: string }[] = []
	public watchLaterMoviesListIds: { id: string, type: string }[] = [];

	router: any;

	ngOnInit(): void {
   
  }
 handleAddFavorite(movieId: string, type: string){
	const index = this.favoriteMoviesIds.findIndex(movie => movie.id === movieId && movie.type === type)
	if(index === -1) {
		this.favoriteMoviesIds.push({ id: movieId, type: type })
	} else {
		this.favoriteMoviesIds.splice(index, 1)	
	}
	console.log( 'favorites movies', this.favoriteMoviesIds);
  }
  handleAddWatchList(movieId: string, type: string){
	const index = this.watchLaterMoviesListIds.findIndex(movie => movie.id === movieId && movie.type === type)
	if(index === -1) {
		this.watchLaterMoviesListIds.push({ id: movieId, type: type })
	} else {
		this.watchLaterMoviesListIds.splice(index, 1)	
	}
	console.log('watch movies ids', this.watchLaterMoviesListIds);
  }

	isInFavorite(movieId: any, type: string): boolean {
		return this.favoriteMoviesIds.some(movie => movie.id === movieId && movie.type === type)
	}
	isInWatchList(movieId: any, type: string): boolean {
		return this.watchLaterMoviesListIds.some(movie => movie.id === movieId && movie.type === type)
	}
	deleteFromFavorite(movieId: string, type: string) {
		const index = this.favoriteMoviesIds.findIndex(movie => movie.id === movieId && movie.type === type)
		if(index !== -1) {
			this.favoriteMoviesIds.splice(index, 1)
		}
			console.log( 'favorites movies', this.favoriteMoviesIds);

	}
	deleteFromWatchList(movieId: string, type: string) {
		const index = this.watchLaterMoviesListIds.findIndex(movie => movie.id === movieId && movie.type === type)
		if(index !== -1) {
			this.watchLaterMoviesListIds.splice(index, 1)
		}
	}

	navigateWithData(data: {id: string, type: string }[], favorite: boolean) {
		const dataString = JSON.stringify(data);
		const path = favorite ? 'favorites' : 'watch-list';
		this.router.navigate([path], { queryParams: { data: dataString } })
		
	}
	get favoriteMoviesIdsForHeader(): string[] {
		return this.favoriteMoviesIds.map(m => m.id);
	}

	get watchLaterMoviesListIdsForHeader(): string[] {
		return this.watchLaterMoviesListIds.map(m => m.id);
	}
}