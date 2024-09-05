import { Component, Input, NgModule, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ClearObservable } from '../../directives/clearObservable';
import { MovieService } from '../../services/movie.service';
import { Reviews } from '../../models/movie.models';
import { takeUntil } from 'rxjs';
import { AvatarModule } from 'primeng/avatar';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { TransformDatePipe } from '../../pipes/transformDate/transform-date.pipe';

@Component({
  selector: 'app-reviews-on-movie',
  standalone: true,
  imports: [AvatarModule, RatingModule, FormsModule, TransformDatePipe],
  templateUrl: './reviews-on-movie.component.html',
  styleUrl: './reviews-on-movie.component.scss'
})
export class ReviewsOnMovieComponent extends ClearObservable implements OnInit, OnChanges {
	@Input() movieId!: number;
	public reviews: Reviews[] = [];
	public page!: number;
	public img_path: string = 'https://image.tmdb.org/t/p/w500/';
	constructor(private movieService: MovieService){
		super();
	}
	ngOnInit(): void {
		this.loadReviews(this.movieId)
	}
	ngOnChanges(changes: SimpleChanges): void {
		if(changes['movieId'] && !changes['movieId'].isFirstChange()){
			this.loadReviews(this.movieId);
		}
	}
	loadReviews(movieId: number, page?: number){
		this.movieService.getReviewsOnMovie(movieId, page).pipe(takeUntil(this.destroy$)).subscribe(reviews =>{
			this.reviews = reviews.results;
			this.page = reviews.page;
		})
	}
}
