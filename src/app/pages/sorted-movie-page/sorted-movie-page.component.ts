import { Component, OnInit } from '@angular/core';
import { ClearObservable } from '../../directives/clearObservable';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';
import { MovieService } from '../../services/movie.service';
import { MovieCardComponent } from "../../components/card-movie/movie-card.component";
import { DataViewModule } from 'primeng/dataview';
import { Movie } from '../../models/movie.models';

@Component({
  selector: 'app-sorted-movie-page',
  standalone: true,
  imports: [MovieCardComponent, DataViewModule],
  templateUrl: './sorted-movie-page.component.html',
  styleUrl: './sorted-movie-page.component.scss'
})
export class SortedMoviePageComponent extends ClearObservable implements OnInit{
	public movies: Movie[] = [];
	public method: string | null = '';
	constructor(private route: ActivatedRoute, private movieService: MovieService){
		super()
	}
	ngOnInit(): void {
		this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) =>{
			this.method = params.get('data');
			if (this.method){
				this.movieService.sortMoviesBy(this.method).pipe(takeUntil(this.destroy$)).subscribe(movies => {
					this.movies = movies.results
				})
			}
		})
	}
	changeOnPage(event: any) {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		const newPage = event.first + 1;
		if(this.method)
		this.movieService.sortMoviesBy(this.method, newPage).pipe(takeUntil(this.destroy$)).subscribe(movies => {
			this.movies = movies.results;
		})
	}
}
