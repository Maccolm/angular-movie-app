import { Component, OnInit } from '@angular/core';
import { popularMovies } from '../../../../mock-data';
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { Router } from '@angular/router';
import { MovieHeaderComponent } from "../../components/movie-header/movie-header.component";

@Component({
    selector: 'app-movie-popular-page',
    standalone: true,
    templateUrl: './movie-popular-page.component.html',
    styleUrl: './movie-popular-page.component.scss',
    imports: [MovieCardComponent, MovieHeaderComponent],
    template: '<button (click)="navigateWithData()"> Go to page 2 </button>'
})
export class MoviePopularPageComponent implements OnInit {
	watchLaterIds: string[] = []
	favoriteMoviesIds: string[] = []

	public movies = popularMovies 
	public watchLaterMoviesListIds: string[] = [];

	ngOnInit(): void {
   
  }
isInFavorite(movie: any): boolean {
		return this.favoriteMoviesIds.some((item) => item=== movie)
	}
	isInWatchList(movie: any): boolean {
		return this.watchLaterMoviesListIds.some((item) => item === movie)
	}
}

