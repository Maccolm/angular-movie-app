import { Component, OnInit } from '@angular/core';
import { ClearObservable } from '../../directives/clearObservable';
import { Store } from '@ngrx/store';
import { ApiMovieModel, Movie } from '../../models/movie.models';
import { selectSearchedMovies, selectSearchQuery } from '../../store/selectors';
import { takeUntil } from 'rxjs';
import { MovieCardComponent } from "../../components/card-movie/movie-card.component";
import { CommonModule } from '@angular/common';
import { loadMoviesFromSearch } from '../../store/actions';

@Component({
  selector: 'app-search-results-page',
  standalone: true,
  imports: [MovieCardComponent, MovieCardComponent, CommonModule],
  templateUrl: './search-results-page.component.html',
  styleUrl: './search-results-page.component.scss'
})
export class SearchResultsPageComponent extends ClearObservable implements OnInit {
	searchData!: ApiMovieModel | null;
	searchQuery!: string;
	moviesFromSearch!: Movie[] | null;
	totalPages!: number | null;
	currentPage!: number;

	constructor(private store: Store){
		super();
	}
	ngOnInit(): void {
		this.store.select(selectSearchedMovies).pipe(takeUntil(this.destroy$)).subscribe(data => {
			this.searchData = data || null;
			this.moviesFromSearch = data?.results || null;
			this.totalPages = data?.total_pages || 0;
			this.currentPage = data?.page || 0;
		})
		this.store.select(selectSearchQuery).pipe(takeUntil(this.destroy$)).subscribe(query => {
			this.searchQuery = query || '';
		})
	}
	onPageChange(value: number){
		if(this.searchQuery){
			this.store.dispatch(loadMoviesFromSearch({ query: this.searchQuery, page: value }));
		}
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
}
