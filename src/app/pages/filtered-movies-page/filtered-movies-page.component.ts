import { Component, OnInit } from '@angular/core';
import { ClearObservable } from '../../directives/clearObservable';
import { MovieService } from '../../services/movie.service';
import { takeUntil } from 'rxjs';
import { Movie } from '../../models/movie.models';
import { MovieCardComponent } from '../../components/card-movie/movie-card.component';
import { FilterService } from '../../services/filter.service';
import { NavigationStart, Router } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-filtered-movies-page',
  standalone: true,
  imports: [MovieCardComponent, SkeletonModule],
  templateUrl: './filtered-movies-page.component.html',
  styleUrl: './filtered-movies-page.component.scss'
})
export class FilteredMoviesPageComponent extends ClearObservable implements OnInit{
	skeletonCards: number = 6;
	movies: Movie[] = [];
	selectedGenres!: number[] | null;
	selectedYear!: number | null;
	currentPage!: number;
	totalPages!: number | undefined;
	totalResults!: number | undefined;
	constructor(private movieService: MovieService, private filterService: FilterService, private router: Router){
		super();
	}
	ngOnInit(): void {
		const savedPage = Number(localStorage.getItem('currentFilterPage')) || 1;

		this.filterService.$filteredAttributes.pipe(takeUntil(this.destroy$)).subscribe(filters => {
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
			if(filters.page){
				this.currentPage = filters.page;
				localStorage.setItem('currentFilterPage', filters.page.toString());
			} else {
				this.currentPage = savedPage;
			}
			this.movieService.getFilteredMovies(this.selectedGenres, this.selectedYear, this.currentPage).pipe(takeUntil(this.destroy$)).subscribe(movies => {
				this.movies = movies.results;
				this.totalPages = movies.total_pages;
				this.totalResults = movies.total_results;
			})
		})
		this.router.events.pipe(takeUntil(this.destroy$)).subscribe(event => {
			if (event instanceof NavigationStart && event.url !== this.router.url) {
				localStorage.removeItem('selectedGenres');
				localStorage.removeItem('selectedYear');
				localStorage.removeItem('currentFilterPage');
			}
		});
	}
	onPageChange(page: number) {
		this.currentPage = page;
		localStorage.setItem('currentFilterPage', page.toString());
		this.filterService.setFilters({genres: this.selectedGenres, year: this.selectedYear, page: this.currentPage});
		window.scrollTo({top: 0, behavior: 'smooth'});
	}
	getVisiblePages(): number[] {
		const pages: number[] = [];
		const maxVisiblePages = 3;
		
		if (this.totalPages) {
			pages.push(1);
			if (this.currentPage > maxVisiblePages + 1) {
				pages.push(-1);
			}

			const startPage = Math.max(2, this.currentPage - 2);
			const endPage = Math.min(this.totalPages - 1, this.currentPage + maxVisiblePages - 1);

			for (let i = startPage; i <= endPage; i++) {
				pages.push(i);
			}

			if (this.currentPage < this.totalPages - maxVisiblePages) {
				pages.push(-1);
			}
			pages.push(this.totalPages);
		}
		return pages;
	}
	getPages(totalPages: number): number[] {
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	}
	getSkeletonArray(): number[]{
		return Array(this.skeletonCards).fill(0);
	}
}
