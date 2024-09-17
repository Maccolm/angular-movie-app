import { Component, OnInit } from '@angular/core';
import { ClearObservable } from '../../directives/clearObservable';
import { Store } from '@ngrx/store';
import { ApiMovieModel, Movie } from '../../models/movie.models';
import { selectSearchedMovies, selectSearchQuery } from '../../store/selectors';
import { takeUntil } from 'rxjs';
import { MovieCardComponent } from "../../components/card-movie/movie-card.component";
import { CommonModule } from '@angular/common';
import { loadMoviesFromSearch } from '../../store/actions';
import { NavigationStart, Router } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-search-results-page',
  standalone: true,
  imports: [MovieCardComponent, MovieCardComponent, CommonModule, SkeletonModule],
  templateUrl: './search-results-page.component.html',
  styleUrl: './search-results-page.component.scss'
})
export class SearchResultsPageComponent extends ClearObservable implements OnInit {
	skeletonCards: number = 6;
	searchData!: ApiMovieModel | null;
	searchQuery!: string;
	moviesFromSearch!: Movie[] | null;
	totalPages!: number | null;
	currentPage!: number;

	constructor(private store: Store, private router: Router){
		super();
	}
	ngOnInit(): void {
		const savedQuery = localStorage.getItem('searchQuery');
		const savedPage = Number(localStorage.getItem('currentPage')) || 1;

		if (savedQuery) {
			this.searchQuery = savedQuery;
			this.currentPage = savedPage;
			this.store.dispatch(loadMoviesFromSearch({ query: this.searchQuery, page: this.currentPage }));
	 	 }

		this.store.select(selectSearchedMovies).pipe(takeUntil(this.destroy$)).subscribe(data => {
			this.searchData = data || null;
			this.moviesFromSearch = data?.results || null;
			this.totalPages = data?.total_pages || 0;
			this.currentPage = data?.page || 0;
		});
		this.store.select(selectSearchQuery).pipe(takeUntil(this.destroy$)).subscribe(query => {
			if (query &&  query !== this.searchQuery) {
				this.searchQuery = query;
				this.currentPage = 1;
				localStorage.setItem('currentPage', this.currentPage.toString());
				localStorage.setItem('searchQuery', this.searchQuery);
				this.store.dispatch(loadMoviesFromSearch({ query: this.searchQuery, page: this.currentPage}));
			}
		});

		this.router.events.pipe(takeUntil(this.destroy$)).subscribe(event => {
			if (event instanceof NavigationStart && event.url !== this.router.url) {
				localStorage.removeItem('searchQuery');
				localStorage.removeItem('currentPage');
			}
		});
	}
	onPageChange(value: number){
		if(this.searchQuery){
			this.currentPage = value;
			localStorage.setItem('currentPage', this.currentPage.toString());
			window.scrollTo({top: 0, behavior: 'smooth'});
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
	getSkeletonArray(): number[]{
		return Array(this.skeletonCards).fill(0);
	}
}

