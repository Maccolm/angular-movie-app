import { Component, OnInit } from '@angular/core';
import { ClearObservable } from '../../directives/clearObservable';
import { MovieService } from '../../services/movie.service';
import { takeUntil } from 'rxjs';
import { Movie } from '../../models/movie.models';
import { MovieCardComponent } from '../../components/card-movie/movie-card.component';

@Component({
  selector: 'app-filtered-movies-page',
  standalone: true,
  imports: [MovieCardComponent],
  templateUrl: './filtered-movies-page.component.html',
  styleUrl: './filtered-movies-page.component.scss'
})
export class FilteredMoviesPageComponent extends ClearObservable implements OnInit{
	movies: Movie[] = [];
	constructor(private movieService: MovieService){
		super();
	}
	ngOnInit(): void {
		const selectedGenres = (localStorage.getItem('selectedGenres') || '').split(',').map(Number);
		const selectedYear = Number(localStorage.getItem('selectedYear'));
		console.log(selectedGenres);
		
		
		this.movieService.getFilteredMovies(selectedGenres, selectedYear).pipe(takeUntil(this.destroy$)).subscribe(movies => {
			this.movies = movies.results;
		})
	}
}
