import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberDurationFormatPipe } from '../../pipes/numberDurationFormat/number-duration-format.pipe';
import { CardModule } from 'primeng/card';
import { LimitedSymbolsPipe } from '../../pipes/limitedSymbols/limited-symbols.pipe';
import { ButtonModule } from 'primeng/button';
import { MovieService } from '../../services/movie.service';
import { Router } from '@angular/router';

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
export class MovieCardComponent implements OnInit {
  @Input() data: any;

  public isInFavorite: boolean = false;
  public isInWatchList: boolean = false;
  public movie: any;
  public displayDialog: boolean = false;
  public IMAGINE_PATH: string = 'https://image.tmdb.org/t/p/w500/';

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.movie = this.data;
    this.isInFavorite = this.movieService.isInFavoriteList(this.movie);
    this.isInWatchList = this.movieService.isInWatchList(this.movie);
  }
  addToFavorites() {
    this.movieService.setToFavoriteMovies(this.movie);
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
}
