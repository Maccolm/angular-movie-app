import { Component, OnInit } from '@angular/core';
import { ClearObservable } from '../../directives/clearObservable';
import { MovieService } from '../../services/movie.service';
import { takeUntil } from 'rxjs';
import { Movie } from '../../models/movie.models';
import { MovieCardComponent } from '../../components/card-movie/movie-card.component';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-filtered-movies-page',
  standalone: true,
  imports: [MovieCardComponent],
  templateUrl: './filtered-movies-page.component.html',
  styleUrl: './filtered-movies-page.component.scss'
})
export class FilteredMoviesPageComponent extends ClearObservable implements OnInit{
	movies: Movie[] = [];
	selectedGenres!: number[] | null;
	selectedYear!: number | null;
	constructor(private movieService: MovieService, private filterService: FilterService){
		super();
	}
	ngOnInit(): void {
		this.filterService.$filteredAttributes.pipe(takeUntil(this.destroy$)).subscribe(filters => {
			if(filters){
				if(filters.genres){	
					this.selectedGenres = filters.genres;
				} else {
					const storedGenres = (localStorage.getItem('selectedGenres') || '').split(',').map(Number);
					if(storedGenres){
						this.selectedGenres = storedGenres;
					}
				};
				if(filters.year){
					this.selectedYear = filters.year;
				} else {
					const storedYear = Number(localStorage.getItem('selectedYear'));
					if(storedYear) {
						this.selectedYear = storedYear;
					}
				}
				this.movieService.getFilteredMovies(this.selectedGenres, this.selectedYear).pipe(takeUntil(this.destroy$)).subscribe(movies => {
					this.movies = movies.results;
				})
			}
		})
	}
}
