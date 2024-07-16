import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberDurationFormatPipe } from '../../pipes/numberDurationFormat/number-duration-format.pipe';
import { CardModule } from 'primeng/card';
import { LimitedSymbolsPipe } from '../../pipes/limitedSymbols/limited-symbols.pipe';
import { ButtonModule } from 'primeng/button';
import { MovieService } from '../../services/movie.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [
    CommonModule,
    NumberDurationFormatPipe,
    CardModule,
    LimitedSymbolsPipe,
    ButtonModule,
  ],
  templateUrl: './card-movie.component.html',
  styleUrl: './card-movie.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class MovieCardComponent implements OnInit, OnDestroy {
  @Input() data: any;

  public isInFavorite: boolean = false;
  public isInWatchList: boolean = false;
  public movie: any;
  public displayDialog: boolean = false;
  public IMAGINE_PATH: string = 'https://image.tmdb.org/t/p/w500/';

  private subscriptions: Subscription = new Subscription;
  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.movie = this.data;
	 //запутаний шлях отримання значення isInFavorite, але так воно завантажується динамічно після завантаження сторінки і карток і самі фільми завантажуються швидко
	 this.subscriptions.add(
		this.movieService.favoritesMovies$.subscribe(favorites => {
			this.isInFavorite = this.movieService.isInFavoriteList(this.movie);
		})
	 )
    this.isInWatchList = this.movieService.isInWatchList(this.movie);
  }
  addToFavorites() {
    this.movieService.setToFavoriteMovies(this.movie).subscribe(
		response => {
			console.log('added to fv', response);
			
		}
	 );
    this.isInFavorite = true;
  }
  addToWatchList() {
    this.movieService.setToWatchList(this.movie);
    this.isInWatchList = true;
  }
  navigateWithData() {
    const id = this.movie.id;
    this.router.navigate(['/movie', id]);
  }
  ngOnDestroy(): void {
	this.subscriptions.unsubscribe()
  }
}

