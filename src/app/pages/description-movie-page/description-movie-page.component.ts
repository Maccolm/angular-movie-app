import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { CardModule } from 'primeng/card';
import { ActivatedRoute } from '@angular/router';
import { NumberDurationFormatPipe } from "../../pipes/numberDurationFormat/number-duration-format.pipe";
import { BudgetNumberFormatPipe } from '../../pipes/budgetNumberFormat/budget-number-format.pipe';
import { DividerModule } from 'primeng/divider';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-description-page',
  standalone: true,
  imports: [CardModule, NumberDurationFormatPipe, BudgetNumberFormatPipe, DividerModule],
  templateUrl: './description-movie-page.component.html',
  styleUrl: './description-movie-page.component.scss',
})
export class MovieDescriptionComponent implements OnInit, OnDestroy {
  @Input() data: any;
  @Input() isInWatchList: boolean = false;
  @Input() isInFavorite: boolean = false;

  public movie: any;
  public displayDialog: boolean = false;
  public IMAGINE_PATH: string = 'https://image.tmdb.org/t/p/w500/';
  public originalLanguages!: string;
  public genres!: string;
  public countries!: string;
  public companies!: string[];

  private subscriptions: Subscription = new Subscription()

  constructor(private movieService: MovieService,  private route: ActivatedRoute) {}

  ngOnInit(): void {
		const paramsSub = this.route.paramMap.subscribe((params) => {
		const movieId = +params.get('id')!; 
		if (movieId) {
			const descriptionMovieSub = this.movieService.getMovieById(movieId).subscribe(movie =>{
				this.movie = movie;
				this.originalLanguages = this.movie.spoken_languages.map((language: { english_name: string; }) => language.english_name).join(', ');
				this.genres = this.movie.genres.map((genre: { name: string; }) => genre.name).join(', ');
				this.countries = this.movie.production_countries.map((country: { name: string; }) => country.name).join(', ');
			
				this.subscriptions.add(descriptionMovieSub)
			})
		}
	});

	this.subscriptions.add(paramsSub);
  }
  ngOnDestroy() {
	this.subscriptions.unsubscribe();
  }
  
  addToFavorites() {
    this.movieService.setToFavoriteMovies(this.movie);
    this.isInFavorite = true;
  }
  addToWatchList() {
    this.movieService.setToWatchList(this.movie);
    this.isInWatchList = true;
  }
}
