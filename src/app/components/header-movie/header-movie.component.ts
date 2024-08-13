import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { HttpClient } from '@angular/common/http';
import { ClearObservable } from '../../directives/clearObservable';
import { debounceTime, of, switchMap, tap } from 'rxjs';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.models';
import { CommonModule } from '@angular/common';
import { ExtractYearFromDatePipe } from '../../pipes/extract-year-from-date.pipe';
import { Router } from '@angular/router';
import { query } from '@angular/animations';

@Component({
	selector: 'app-movie-header',
	standalone: true,
	imports: [
		RouterLink,
		InputTextModule,
		FloatLabelModule,
		FormsModule,
		OverlayPanelModule,
		ReactiveFormsModule,
		ButtonModule,
		CommonModule,
		ExtractYearFromDatePipe
	],
	templateUrl: './header-movie.component.html',
	styleUrl: './header-movie.component.scss',
})
export class MovieHeaderComponent extends ClearObservable implements OnInit {
	searchControl = new FormControl();
	isLoading: boolean = false;
	@ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
	@ViewChild('op') overlayPanel!: OverlayPanel;
	moviesFromSearch: Movie[] = [];
	numberMoviesFromSearch!: number;
	isFindMovie: boolean = true;
	moviesNotFound: string = "We couldn't find anything. You may need to change your search query!";

	constructor(private http: HttpClient, private movieService: MovieService, private router: Router) {
		super();
	}
	ngOnInit() {
		this.searchControl.valueChanges.pipe(
			tap(() => {
				this.isLoading = true;
			}),
			debounceTime(300),
			switchMap((query) =>
				this.movieService.searchMovie(query),
			)).subscribe((movies) => {
				if (movies) {
					this.isLoading = false;
					this.moviesFromSearch = movies.results;
					this.numberMoviesFromSearch = movies.total_results;
					this.isFindMovie = movies.total_results > 0;
				}
			});
	}
	openOverplay(event: Event) {
		this.overlayPanel.toggle(event);
		setTimeout(() => {
			this.searchInput.nativeElement.focus();
		}, 0);
	}
	getMovieRating(rating: number): string {
		if (rating < 5) {
			return 'low-rating'
		} else if (rating >= 5 && rating <= 7) {
			return 'medium-rating'
		} else {
			return 'high-rating'
		}
	}
	navigateWithData(movieId: number, event: Event) {
		const id = movieId;
		this.router.navigate(['/movie', id]);
		setTimeout(() => {
			this.overlayPanel.toggle(event);
		}, 300);
	}
}
