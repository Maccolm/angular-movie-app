import { Component, Input } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { CardModule } from 'primeng/card';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-movie-description-page',
  standalone: true,
  imports: [CardModule],
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

  constructor(private movieService: MovieService,  private route: ActivatedRoute) {}

  ngOnInit(): void {
		this.route.paramMap.subscribe((params) => {
		const movieId = +params.get('id')!; 
		if (movieId) {
			this.loadMovie(movieId);
		}
		console.log(movieId);
		
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
  loadMovie(id: number): void{
	this.movie = this.movieService.getMovieById(id)
  }
 
}
