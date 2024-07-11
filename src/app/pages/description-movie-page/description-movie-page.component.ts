import { Component, Input } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { CardModule } from 'primeng/card';
import { ActivatedRoute } from '@angular/router';
import { NumberDurationFormatPipe } from "../../pipes/numberDurationFormat/number-duration-format.pipe";
import { BudgetNumberFormatPipe } from '../../pipes/budgetNumberFormat/budget-number-format.pipe';


@Component({
  selector: 'app-movie-description-page',
  standalone: true,
  imports: [CardModule, NumberDurationFormatPipe, BudgetNumberFormatPipe],
  templateUrl: './description-movie-page.component.html',
  styleUrl: './description-movie-page.component.scss',
})
export class MovieDescriptionComponent {
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

  constructor(private movieService: MovieService,  private route: ActivatedRoute) {}

  ngOnInit(): void {
		this.route.paramMap.subscribe((params) => {
		const movieId = +params.get('id')!; 
		if (movieId) {
			this.movieService.getMovieById(movieId).subscribe(movie =>{
				this.movie = movie;
				this.originalLanguages = this.movie.spoken_languages.map((language: { english_name: string; }) => language.english_name).join(', ');
				this.genres = this.movie.genres.map((genre: { name: string; }) => genre.name).join(', ');
				this.countries = this.movie.production_countries.map((country: { name: string; }) => country.name).join(', ');
				console.log(this.movie);
			})
		}
		
	});
  }
  
  addToFavorites() {
    this.movieService.setFavoriteMovies(this.movie);
    this.isInFavorite = true;
  }
  addToWatchList() {
    this.movieService.setWatchList(this.movie);
    this.isInWatchList = true;
  }

 
}
